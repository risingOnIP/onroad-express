import {
  PartyIntakeSchema,
  PartyIntakeTemplate,
  Schema,
  SchemaItem,
} from "../../types/realtor";
import { createClient } from "@supabase/supabase-js";
import { KNOWLEDGE_BASE } from "./centralIntelligence/centralIntelligence";

type SchemaType =
  | "buyer1_schema"
  | "buyer2_schema"
  | "seller1_schema"
  | "seller2_schema";

export async function updateClientIntakeTemplate(
  templateId: string,
  newSchema: Schema,
  userId: string,
  supabaseClient: ReturnType<typeof createClient>,
  schemaType: SchemaType = "buyer1_schema"
) {
  // First check if the template exists for this user
  const { data: existingTemplate } = await supabaseClient
    .from("party_intake_templates")
    .select("id")
    .eq("user_id", userId)
    .eq("id", templateId)
    .maybeSingle();

  if (!existingTemplate) {
    console.log(
      `Cannot update: Template ${templateId} not found for user ${userId}`
    );
    throw new Error(`Template ${templateId} not found for current user`);
  }

  const { data: partyIntakeTemplate, error: partyIntakeTemplateError } =
    await supabaseClient
      .from("party_intake_templates")
      .update({ [schemaType]: newSchema })
      .eq("user_id", userId)
      .eq("id", templateId)
      .select()
      .single();

  if (partyIntakeTemplateError) {
    console.error(
      "Error updating party intake template:",
      partyIntakeTemplateError
    );
    throw partyIntakeTemplateError;
  }

  return partyIntakeTemplate;
}

export async function getClientIntakeTemplateSchema(
  templateId: string,
  userId: string,
  supabaseClient: ReturnType<typeof createClient>,
  schemaType: SchemaType
) {
  console.log(
    "getClientIntakeTemplateSchema was called, this is the template ID: ",
    templateId
  );
  console.log("this is the user id: ", userId);
  console.log("this is the schema type: ", schemaType);

  const { data: partyIntakeTemplate, error: partyIntakeTemplateError } =
    await supabaseClient
      .from("party_intake_templates")
      .select(schemaType)
      .eq("user_id", userId)
      .eq("id", templateId)
      .maybeSingle();

  if (partyIntakeTemplateError) {
    console.error(
      "Error getting party intake template schema:",
      partyIntakeTemplateError
    );
    throw partyIntakeTemplateError;
  }

  // Check if no template was found
  if (!partyIntakeTemplate) {
    console.log(`No template found with ID ${templateId} for user ${userId}`);
    // Check if template exists for any user
    const { data: templateExists } = await supabaseClient
      .from("party_intake_templates")
      .select("user_id")
      .eq("id", templateId)
      .maybeSingle();

    if (templateExists) {
      console.log(
        `Template ${templateId} exists but belongs to user ${templateExists.user_id}, not ${userId}`
      );
      throw new Error(`Template ${templateId} not found for current user`);
    } else {
      console.log(`Template ${templateId} does not exist in the database`);
      throw new Error(`Template ${templateId} does not exist`);
    }
  }

  const schemaData = (partyIntakeTemplate as any)?.[schemaType];

  if (schemaData === null) {
    console.log(
      `Template ${templateId} exists but has null ${schemaType}, returning empty array`
    );
    return [] as PartyIntakeSchema;
  }

  console.log(
    "I got through the getClientIntakeTemplateSchema function:",
    schemaData
  );

  return schemaData as PartyIntakeSchema;
}

export async function saveClientIntakeTemplateSchema(
  toSaveSchema: PartyIntakeSchema,
  schemaType: SchemaType,
  clientIntakeId: string,
  supabase: ReturnType<typeof createClient>
) {
  const { data: newSavedSchema, error } = (await supabase
    .from("party_intake_templates")
    .update({
      [schemaType]: toSaveSchema,
    })
    .eq("id", clientIntakeId)
    .select()
    .single()) as { data: PartyIntakeSchema; error: any };

  if (error) {
    console.error("Error saving party intake schema:", error);
    throw error;
  }

  return newSavedSchema as PartyIntakeSchema;
}

export async function updateSchemaItem(
  templateId: string,
  schemaItem: SchemaItem,
  userId: string,
  supabaseClient: ReturnType<typeof createClient>,
  schemaType: SchemaType = "buyer1_schema"
) {
  const formSchema: SchemaItem[] = await getClientIntakeTemplateSchema(
    templateId,
    userId,
    supabaseClient,
    schemaType
  );

  // Find and merge the schema item with matching order
  const updatedFormSchema = formSchema.map((item) => {
    if (item.display_attributes.order === schemaItem.display_attributes.order) {
      return { ...item, ...schemaItem };
    }
    return item;
  });

  console.log(" this is the updated form schema: ", updatedFormSchema);

  if (
    !updatedFormSchema.some(
      (item) =>
        item.display_attributes.order === schemaItem.display_attributes.order
    )
  ) {
    throw new Error("No schema item found with matching order");
  }

  const { data: updatedSchemaItem, error: updatedSchemaItemError } =
    await supabaseClient!
      .from("party_intake_templates")
      .update({ [schemaType]: updatedFormSchema })
      .eq("user_id", userId)
      .eq("id", templateId)
      .select()
      .single();

  if (updatedSchemaItemError) {
    console.error("error in updateSchemaItem function during update");
    throw updatedSchemaItemError;
  }

  return updatedSchemaItem;
}

export async function addSchemaItemToTemplate(
  templateId: string,
  schemaItem: SchemaItem,
  userId: string,
  supabaseClient: ReturnType<typeof createClient>,
  schemaType: SchemaType = "buyer1_schema"
) {
  console.log(
    "added schema item to party form was called, this is the schema item: ",
    schemaItem
  );

  const formSchema: SchemaItem[] = await getClientIntakeTemplateSchema(
    templateId,
    userId,
    supabaseClient,
    schemaType
  );
  // Sort by current order to process correctly
  console.log("This is formSchema: ", formSchema);

  // Declare sortedSchema here
  let sortedSchema: SchemaItem[] = [];

  if (formSchema) {
    // Assign the sorted array
    sortedSchema = [...formSchema].sort(
      (a, b) =>
        (a.display_attributes.order ?? 0) - (b.display_attributes.order ?? 0)
    );
  }

  const blockName = schemaItem.display_attributes.block?.trim();
  let insertionPointOrder = 0;

  if (sortedSchema.length > 0) {
    const itemsInBlock = sortedSchema.filter(
      (item) =>
        (item.display_attributes.block?.trim() || null) === (blockName || null)
    );
    const itemsWithoutBlock = sortedSchema.filter(
      (item) => !item.display_attributes.block?.trim()
    );
    const blockExists = itemsInBlock.length > 0;
    const noBlockItemsExist = itemsWithoutBlock.length > 0;
    const globalMaxOrder = sortedSchema.reduce(
      (max, item) => Math.max(max, item.display_attributes.order ?? 0),
      0
    );

    if (blockName) {
      if (blockExists) {
        // Find max order within the existing block
        insertionPointOrder = itemsInBlock.reduce(
          (max, item) => Math.max(max, item.display_attributes.order ?? 0),
          0
        );
      } else {
        // New block, insert after all existing items
        insertionPointOrder = globalMaxOrder;
      }
    } else {
      // Item has no block
      if (noBlockItemsExist) {
        // Find max order among items with no block
        insertionPointOrder = itemsWithoutBlock.reduce(
          (max, item) => Math.max(max, item.display_attributes.order ?? 0),
          0
        );
      } else {
        // First item with no block, but other items might exist
        // Place it after all items that *do* have blocks, if any, otherwise at the start
        const itemsWithBlocks = sortedSchema.filter((item) =>
          item.display_attributes.block?.trim()
        );
        if (itemsWithBlocks.length > 0) {
          insertionPointOrder = itemsWithBlocks.reduce(
            (max, item) => Math.max(max, item.display_attributes.order ?? 0),
            0
          );
        } else {
          insertionPointOrder = 0; // Absolute first item
        }
      }
    }
  }

  const newItemOrder = insertionPointOrder + 1;

  console.log(
    `Determined insertion point order: ${insertionPointOrder}, New item order: ${newItemOrder}`
  );

  // Create the updated schema, incrementing orders >= newItemOrder
  const updatedFormSchema = sortedSchema.map((item) => {
    if ((item.display_attributes.order ?? 0) >= newItemOrder) {
      return {
        ...item,
        display_attributes: {
          ...item.display_attributes,
          order: (item.display_attributes.order ?? 0) + 1,
        },
      };
    }
    return item;
  });

  // Add the new item with its calculated order
  const newSchemaItemWithOrder: SchemaItem = {
    ...schemaItem,
    display_attributes: {
      ...schemaItem.display_attributes,
      order: newItemOrder,
    },
  };
  updatedFormSchema.push(newSchemaItemWithOrder);

  // Sort the final schema by order
  updatedFormSchema.sort(
    (a, b) =>
      (a.display_attributes.order ?? 0) - (b.display_attributes.order ?? 0)
  );

  console.log("this is the new form schema: ", updatedFormSchema);

  const { data: updated_client_form, error: updated_client_form_error } =
    await supabaseClient!
      .from("party_intake_templates")
      .update({ [schemaType]: updatedFormSchema })
      .eq("user_id", userId)
      .eq("id", templateId)
      .select()
      .single();

  if (updated_client_form_error) {
    console.error("error in addSchemaItemToClientForm function during update");
    throw updated_client_form_error;
  }

  return updated_client_form;
}

export async function getPartyIntakeTemplates(
  userId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: partyIntakeTemplates, error: partyIntakeTemplatesError } =
    (await supabaseClient
      .from("party_intake_templates")
      .select("*")
      .eq("user_id", userId)) as unknown as {
      data: PartyIntakeTemplate[];
      error: any;
    };

  if (partyIntakeTemplatesError) {
    console.error("error in getPartyIntakeTemplates function");
    throw partyIntakeTemplatesError;
  }

  return partyIntakeTemplates as unknown as PartyIntakeTemplate[];
}

export async function createDefaultTemplatesForUser(
  userId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const defaultTemplates = [
    {
      name: "buy-residential-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "buy-commercial-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "buy-improved_land-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "buy-unimproved_land-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "sell-residential-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "sell-commercial-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "sell-improved_land-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "sell-unimproved_land-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "rent-residential-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "rent-commercial-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "rent-improved_land-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "rent-unimproved_land-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "lease-residential-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "lease-commercial-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "lease-improved_land-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
    {
      name: "lease-unimproved_land-default",
      user_id: userId,
      buyer1_schema: null,
      buyer2_schema: null,
      seller1_schema: null,
      seller2_schema: null,
    },
  ];

  const { data: createdTemplates, error: createError } = await supabaseClient
    .from("party_intake_templates")
    .insert(defaultTemplates)
    .select();

  if (createError) {
    console.error("Error creating default templates for user:", createError);
    throw createError;
  }

  console.log(
    `Created ${createdTemplates?.length} default templates for user ${userId}`
  );
  return createdTemplates;
}

export async function addClientIntakeTemplate(
  templateName: string,
  userId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const splitTemplate = templateName.split("-");
  const kb =
    KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"].partyIntakeSchemas;

  const { data: newTemplate, error: newTemplateError } = await supabaseClient
    .from("party_intake_templates")
    .insert({
      name: templateName,
      user_id: userId,
      buyer1_schema: kb.buyer1_schema ?? [],
      buyer2_schema: kb.buyer2_schema ?? [],
      seller1_schema: kb.seller1_schema ?? [],
      seller2_schema: kb.seller2_schema ?? [],
    })
    .select()
    .single();

  if (newTemplateError) {
    console.error("Error adding party intake template:", newTemplateError);
    throw newTemplateError;
  }

  return newTemplate;
}

export async function getAllSchemasForTemplate(
  templateId: string,
  userId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log(
    "getAllSchemasForTemplate was called, this is the template ID: ",
    templateId
  );
  console.log("this is the user id: ", userId);

  const { data: partyIntakeTemplate, error: partyIntakeTemplateError } =
    await supabaseClient
      .from("party_intake_templates")
      .select("buyer1_schema, buyer2_schema, seller1_schema, seller2_schema")
      .eq("user_id", userId)
      .eq("id", templateId)
      .maybeSingle();

  if (partyIntakeTemplateError) {
    console.error(
      "Error getting party intake template schemas:",
      partyIntakeTemplateError
    );
    throw partyIntakeTemplateError;
  }

  // Check if no template was found
  if (!partyIntakeTemplate) {
    console.log(`No template found with ID ${templateId} for user ${userId}`);
    // Check if template exists for any user
    const { data: templateExists } = await supabaseClient
      .from("party_intake_templates")
      .select("user_id")
      .eq("id", templateId)
      .maybeSingle();

    if (templateExists) {
      console.log(
        `Template ${templateId} exists but belongs to user ${templateExists.user_id}, not ${userId}`
      );
      throw new Error(`Template ${templateId} not found for current user`);
    } else {
      console.log(`Template ${templateId} does not exist in the database`);
      throw new Error(`Template ${templateId} does not exist`);
    }
  }

  return {
    buyer1_schema: partyIntakeTemplate.buyer1_schema || [],
    buyer2_schema: partyIntakeTemplate.buyer2_schema || [],
    seller1_schema: partyIntakeTemplate.seller1_schema || [],
    seller2_schema: partyIntakeTemplate.seller2_schema || [],
  };
}
