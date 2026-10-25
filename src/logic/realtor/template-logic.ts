import { createClient } from "@supabase/supabase-js";
import {
  FormResponse,
  FullTemplate,
  Stage,
  Template,
  TemplateForm,
} from "../../types/realtor";
import { KNOWLEDGE_BASE } from "./centralIntelligence/centralIntelligence";
import { getCachedData } from "./dealOption-logic";
import { resolveKnowledgeBaseForm } from "./form-logic";

export async function getTemplate(
  template_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: template, error } = await supabaseClient!
    .from("templates")
    .select("*")
    .eq("id", template_id)
    .single();

  if (error) throw error;

  return template as unknown as Template;
}

export async function getFullTemplateByName(
  template_name: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: template, error } = await supabaseClient!
    .from("templates")
    .select("*, template_forms(*)")
    .eq("name", template_name)
    .single();

  if (error) throw error;

  return template as unknown as FullTemplate;
}

export async function getTemplateForms(
  user_id: string,
  template_name: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log("I am in getTemplateForms");
  const { data: template, error } = await supabaseClient!
    .from("templates")
    .select("*, template_forms(*)")
    .eq("name", template_name)
    .eq("template_forms.user_id", user_id)
    .single();

  console.log("template", template);
  const templateForms = template?.template_forms as unknown as TemplateForm[];
  const orderedTemplateForms = templateForms.sort((a, b) => a.order - b.order);
  console.log("orderedTemplateForms", orderedTemplateForms);
  if (error) throw error;

  return orderedTemplateForms;
}

export async function getTemplateFormsByTemplateId(
  template_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: templateForms, error } = await supabaseClient
    .from("template_forms")
    .select("*")
    .eq("template_id", template_id);

  if (error) throw error;

  // Cast to TemplateForm[] and sort by `order`
  const orderedTemplateForms = (
    templateForms as unknown as TemplateForm[]
  ).sort((a, b) => a.order - b.order);

  return orderedTemplateForms;
}

export async function getIndividualTemplateForm(
  user_id: string,
  template_form_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: templateForm, error } = await supabaseClient
    .from("template_forms")
    .select("*")
    .eq("user_id", user_id)
    .eq("id", template_form_id)
    .single();

  if (error) {
    throw error;
  }
  return templateForm as unknown as TemplateForm;
}

export async function getFullTemplateFormByName(
  user_id: string,
  template_name: string,
  form_type: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: template, error } = await supabaseClient
    .from("templates")
    .select("*, template_forms(*)")
    .eq("name", template_name)
    .eq("template_forms.form_type", form_type)
    .eq("template_forms.user_id", user_id)
    .single();

  if (error) throw error;

  return template as unknown as FullTemplate;
}

export async function getTemplateFormResponses(
  template_form_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  try {
    const { data: templateFormResponses, error } = (await supabaseClient
      .from("template_forms")
      .select("form_response")
      .eq("id", template_form_id)
      .single()) as { data: { form_response: FormResponse }; error: any };

    if (error) throw error;

    return templateFormResponses?.form_response ?? {};
  } catch (error) {
    console.error("Error getting template form responses:", error);
    throw error;
  }
}

export async function addFormToTemplate(
  user_id: string,
  formattedTemplateName: string,
  form_type: string,
  deal_wide: boolean,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: templateData, error: templateError } = await supabaseClient
    .from("templates")
    .select("id, name")
    .eq("name", formattedTemplateName)
    .single();

  if (templateError) {
    console.error("Error fetching template:", templateError);
    throw new Error(`Failed to fetch template: ${templateError.message}`);
  }
  if (!templateData) {
    console.error(`No template found with name: ${formattedTemplateName}`);
    throw new Error(`Template "${formattedTemplateName}" does not exist`);
  }

  console.log(" i found the template, it is here: ", templateData);
  //got the template from the template name above

  //inserting into templateForms

  const { data, error } = await supabaseClient
    .from("template_forms")
    .select("order")
    .eq("template_id", (templateData as { id: string }).id)
    .order("order", { ascending: false })
    .limit(1);

  const highestOrder = (data?.[0]?.order as number) ?? 0;

  const { data: newTemplateForm, error: newTemplateFormError } =
    await supabaseClient
      .from("template_forms")
      .insert({
        user_id,
        template_id: templateData.id,
        form_type,
        order: highestOrder,
        deal_wide: deal_wide,
      })
      .select()
      .single();

  if (newTemplateFormError) throw newTemplateFormError;

  return newTemplateForm as unknown as TemplateForm;
}

export async function addFormToTemplateByTemplateId(
  user_id: string,
  template_id: string,
  form_type: string,
  deal_wide: boolean,
  form_stage: string | undefined,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: templateData, error: templateError } = await supabaseClient
    .from("templates")
    .select("id, name")
    .eq("id", template_id)
    .single();

  if (templateError) {
    console.error("Error fetching template:", templateError);
    throw new Error(`Failed to fetch template: ${templateError.message}`);
  }

  if (!templateData) {
    console.error(`No template found with id: ${template_id}`);
    throw new Error(`Template with id "${template_id}" does not exist`);
  }

  const { data, error } = await supabaseClient
    .from("template_forms")
    .select("order")
    .eq("template_id", template_id)
    .order("order", { ascending: false })
    .limit(1);

  const highestOrder = ((data?.[0]?.order as number) ?? 0) + 1;

  const { data: newTemplateForm, error: newTemplateFormError } =
    await supabaseClient
      .from("template_forms")
      .insert({
        user_id,
        template_id: templateData.id,
        form_type,
        order: highestOrder,
        deal_wide: deal_wide,
        form_stage: form_stage,
      })
      .select()
      .single();

  if (newTemplateFormError) throw newTemplateFormError;

  return newTemplateForm as unknown as TemplateForm;
}

export async function updateTemplateFormResponse(
  formId: string,
  itemKey: string,
  newValue: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  // First get the current form_response
  const { data: currentForm, error: fetchError } = await supabaseClient!
    .from("template_forms")
    .select("form_response")
    .eq("id", formId)
    .single();

  if (fetchError) throw fetchError;

  // Safely extract form_response, default to empty object if null
  let responseData = (currentForm.form_response ?? {}) as Record<
    string,
    string
  >;

  // Add or update the value
  if (responseData === null) {
    responseData = {};
  }
  responseData[itemKey] = newValue;

  const { data: form, error: formError } = await supabaseClient!
    .from("template_forms")
    .update({
      form_response: responseData,
    })
    .eq("id", formId)
    .select()
    .single();

  if (formError) throw formError;

  return form;
}

export async function updateTemplateFormStage(
  formId: string,
  newStage: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: form, error: formError } = await supabaseClient!
    .from("template_forms")
    .update({
      form_stage: newStage,
    })
    .eq("id", formId)
    .select()
    .single();

  if (formError) throw formError;

  return form;
}

export async function addTemplate(
  templateName: string,
  user_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: templateData, error: templateError } = (await supabaseClient
    .from("templates")
    .insert({ name: templateName, user_id: user_id })
    .select()
    .single()) as { data: Template; error: any };

  if (templateError) throw templateError;

  const splitName = templateName.split("-");
  const dealSide = splitName[0];
  const propertyType = splitName[1];

  const knowledgeBaseForms =
    KNOWLEDGE_BASE[dealSide]?.[propertyType]?.["TX"]?.requiredForms;

  if (knowledgeBaseForms) {
    const templateFormsInserting = knowledgeBaseForms.map(
      async (kbData, index) => {
        const cachedData = await getCachedData(user_id, supabaseClient);
        const formResponse = await resolveKnowledgeBaseForm(
          kbData.formType,
          {},
          cachedData,
          supabaseClient
        );

        return {
          template_id: templateData.id,
          form_type: kbData.formType,
          order: index + 1,
          form_response: formResponse,
          deal_wide: kbData.placement === "deal-wide",
          form_stage: kbData.form_stage,
        };
      }
    );

    const templateForms = await Promise.all(templateFormsInserting);

    const { error: templateFormsError } = await supabaseClient
      .from("template_forms")
      .insert(templateForms);
    if (templateFormsError) {
      console.error("Error inserting template forms:", templateFormsError);
      throw templateFormsError;
    }
  }
  return templateData as unknown as Template;
}

export async function getTemplates(
  user_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: templates, error: templatesError } = await supabaseClient
    .from("templates")
    .select("*")
    .eq("user_id", user_id);

  if (templatesError) throw templatesError;

  return templates;
}

export async function getStagesById(
  template_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log("TEMPALTEID", template_id);
  const { data: stages, error: stagesError } = (await supabaseClient
    .from("templates")
    .select("name")
    .eq("id", template_id)
    .single()) as { data: { name: string }; error: any };

  const splitName = stages?.name.split("-");

  if (stagesError) throw stagesError;

  return KNOWLEDGE_BASE[splitName[0]][splitName[1]]["TX"].stages as Stage[];
}

export async function deleteTemplateForm(
  template_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: template, error: templateError } = await supabaseClient
    .from("template_forms")
    .delete()
    .eq("id", template_id);

  if (templateError) throw templateError;

  return {
    message: "Template deleted successfully",
    success: true,
  };
}
