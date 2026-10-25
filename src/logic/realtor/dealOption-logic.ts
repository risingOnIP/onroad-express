import path from "path";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { getFullTemplateByName } from "./template-logic";
import { getDealById } from "./deal-logic";
import {
  CachedData,
  DealOption,
  DealOptionFormMerged,
  Form,
  FormResponse,
  PDFFormField,
} from "../../types/realtor";
import { insertForm, resolveKnowledgeBaseForm } from "./form-logic";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { Request } from "express";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { KNOWLEDGE_BASE } from "./centralIntelligence/centralIntelligence";

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter to only allow PDFs
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Multer configuration
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export async function getAllDealOptions(
  deal_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: dealOptions, error } = await supabaseClient!
    .from("dealOptions")
    .select()
    .eq("deal_id", deal_id);

  if (error) throw error;

  return dealOptions as unknown as DealOption[];
}

export async function getDealOptionWithForms(
  dealOptionId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: dealOptionAndForms, error } = await supabaseClient!
    .from("dealOptions")
    .select("*, forms(*)")
    .eq("id", dealOptionId);

  if (error) throw error;

  return dealOptionAndForms as unknown as DealOptionFormMerged;
}

export async function getAllDealOptionsWithForms(
  deal_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: dealOptions, error } = await supabaseClient!
    .from("dealOptions")
    .select("*, forms(*)")
    .eq("deal_id", deal_id)
    .order("order", { referencedTable: "forms", ascending: true });

  if (error) throw error;

  return dealOptions;
}

export async function getCachedData(
  user_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: cached_data, error: cachedDataError } = (await supabaseClient
    .from("profiles")
    .select("cached_data")
    .eq("user_id", user_id)
    .single()) as { data: { cached_data: CachedData | null }; error: any };

  if (cachedDataError) throw cachedDataError;

  const cachedData = cached_data.cached_data;
  return cachedData ?? {};
}
export async function insertDealOption(
  address: string,
  deal_id: string,
  supabaseClient: ReturnType<typeof createClient>,
  isSelected?: boolean
) {
  // 1) Fetch the template name and full template
  console.log("Starting insertDealOption function");
  console.log("Parameters:", { address, deal_id, isSelected });

  try {
    console.log("Fetching deal by ID:", deal_id);
    const { template: templateName } = (await getDealById(
      deal_id,
      supabaseClient
    )) as { template: string };
    console.log("Template name retrieved:", templateName);

    const deal = await getDealById(deal_id, supabaseClient);
    const dealSide = deal.dealSide;
    console.log("Deal retrieved:", deal);
    console.log("Deal side:", dealSide);

    // Get the user_id from the deal to ensure consistency
    const user_id = deal.user_id as string;
    console.log("User ID from deal:", user_id);

    // Determine isSelected value
    if (isSelected === undefined) {
      console.log("isSelected is undefined, determining based on dealSide");
      if (dealSide === "sell" || dealSide === "lease") {
        isSelected = true;
        console.log("Set isSelected to true (sell/lease)");
      } else {
        isSelected = false;
        console.log("Set isSelected to false (buy/other)");
      }
    } else {
      console.log("isSelected provided:", isSelected);
    }

    if (templateName.split("-")[2] !== "blank") {
      console.log("Processing non-blank template:", templateName);

      console.log("Fetching full template data...");
      const templateData = await getFullTemplateByName(
        templateName,
        supabaseClient
      );
      console.log("Template data retrieved:", templateData);

      const { template_forms } = templateData;
      console.log("Template forms count:", template_forms?.length || 0);
      console.log("Template forms details:", template_forms);

      // 2) Insert the parent row in dealOptions
      console.log("Inserting deal option into database...");
      const { data: dealOption, error: dealOptionError } = await supabaseClient
        .from("dealOptions")
        .insert({
          address,
          deal_id,
          user_id,
          is_selected: isSelected,
        })
        .select()
        .single();

      if (dealOptionError) {
        console.error("Error inserting deal option:", dealOptionError);
        throw dealOptionError;
      }

      console.log("Deal option inserted successfully:", dealOption);

      // 3) For each template form, insert a row in "forms"
      const filteredTemplateForms = template_forms.filter(
        (form) => form.deal_wide === false
      );
      console.log(
        "Filtered template forms (non-deal-wide):",
        filteredTemplateForms
      );
      console.log("Number of forms to insert:", filteredTemplateForms.length);

      //get cached data
      const cachedData = await getCachedData(user_id, supabaseClient);

      for (let i = 0; i < filteredTemplateForms.length; i++) {
        const tForm = filteredTemplateForms[i];
        console.log(
          `Inserting form ${i + 1}/${filteredTemplateForms.length}:`,
          {
            form_type: tForm.form_type,
            deal_option_id: dealOption.id,
            form_response_keys: Object.keys(tForm.form_response || {}),
          }
        );

        // Insert "forms" row and select the newly created form
        const newForm = await insertForm(
          dealOption.id as unknown as string,
          tForm.form_type,
          tForm.form_response as unknown as FormResponse,
          cachedData,
          supabaseClient,
          "",
          tForm.form_stage
        );
        console.log(`Form ${i + 1} inserted successfully:`, newForm);
      }

      console.log("All forms inserted successfully for non-blank template");
      return dealOption as unknown as DealOption; //parent deal Option
    } else {
      console.log("Processing blank template - no forms to insert");

      console.log("Inserting deal option (blank template) into database...");
      const { data: dealOption, error: dealOptionError } = (await supabaseClient
        .from("dealOptions")
        .insert({
          address,
          deal_id,
          user_id,
          is_selected: isSelected,
        })
        .select()
        .single()) as { data: DealOption; error: any };

      if (dealOptionError) {
        console.error(
          "Error inserting deal option (blank template):",
          dealOptionError
        );
        throw dealOptionError;
      }

      console.log(
        "Deal option (blank template) inserted successfully:",
        dealOption
      );
      console.log("Adding forms according to knowledge base");

      const cachedData = await getCachedData(user_id, supabaseClient);
      const formsToAdd = KNOWLEDGE_BASE[templateName.split("-")[0]][
        templateName.split("-")[1]
      ]["TX"].requiredForms.filter(
        (form) => form.placement === "property-specific"
      );

      const bulkFormsAdd = formsToAdd.map((form, index) => {
        const formResponse = resolveKnowledgeBaseForm(
          form.formType,
          {},
          cachedData,
          supabaseClient,
          {
            dealOptionId: dealOption.id,
            dealId: deal_id,
            userId: user_id,
          }
        );

        return {
          deal_option_id: dealOption.id,
          form_type: form.formType,
          form_response: formResponse,
          form_stage: form.form_stage,
          order: index + 1,
        };
      });
      const { data: knowledgeBaseForms, error: knowledgeBaseFormsError } =
        await supabaseClient.from("forms").insert(bulkFormsAdd).select();

      if (knowledgeBaseFormsError) throw knowledgeBaseFormsError;

      return dealOption as unknown as DealOption; //parent deal Option
    }
  } catch (error) {
    console.error("Fatal error in insertDealOption:", error);
    console.error(
      "Error stack trace:",
      error instanceof Error ? error.stack : "No stack trace available"
    );
    throw error;
  }
}

export async function addFormToDealOption(
  user_id: string,
  dealOptionId: string,
  form_type: string,
  supabaseClient: ReturnType<typeof createClient>,
  form_stage?: string
) {
  console.log("Fetching deal option by ID:", dealOptionId);
  console.log("User ID:", user_id);
  console.log("Form type:", form_type);

  //get template name with dealOptionId

  interface TemplateResponseData {
    template_forms: {
      form_response: any;
    };
  }
  const cachedData = await getCachedData(user_id, supabaseClient);

  // Check if this is a TAR form and if the broker has uploaded a custom version
  let brokerCustomPdfUrl: string | null = null;
  
  // Get form mapping to check if it's a TAR form
  const { getFormMapping } = await import('../../routes/forms/pdf-templates');
  const formMapping = getFormMapping(form_type);
  
  if (formMapping && formMapping.orgCreated === 'TAR') {
    console.log(`Checking for broker-uploaded TAR form: ${form_type}`);
    
    // Get the realtor's broker via tether relationship
    const { data: tether, error: tetherError } = await supabaseClient
      .from('brokerRealtorTether')
      .select('broker_id')
      .eq('realtor_id', user_id)
      .eq('status', 'accepted')
      .single();
    
    if (!tetherError && tether) {
      // Check if broker has uploaded this TAR form
      const { data: brokerForm, error: brokerFormError } = await supabaseClient
        .from('brokerForms')
        .select('broker_custom_pdf')
        .eq('broker_id', tether.broker_id as string)
        .eq('form_type', form_type)
        .eq('org_name', 'TAR')
        .single();
      
      if (!brokerFormError && brokerForm) {
        console.log(`Found broker-uploaded TAR form for ${form_type}`);
        
        // Generate signed URL for the broker's custom PDF
        const { data: signedUrlData, error: signedUrlError } = await supabaseClient
          .storage
          .from('brokerForms')
          .createSignedUrl(brokerForm.broker_custom_pdf as string, 3600); // 1 hour expiry
        
        if (!signedUrlError && signedUrlData) {
          brokerCustomPdfUrl = signedUrlData.signedUrl;
          console.log(`Using broker's custom TAR form for ${form_type}`);
        }
      }
    }
  }

  const { data: dealOptionData, error: dealOptionError } = (await supabaseClient
    .from("dealOptions")
    .select("deals(template)")
    .eq("id", dealOptionId)
    .single()) as { data: { deals: { template: string } }; error: any };

  if (dealOptionError) {
    console.error("Error fetching deal option:", dealOptionError);
    throw dealOptionError;
  }

  const castedDealOption = dealOptionData;
  const templateRetrieved = castedDealOption?.deals?.template;
  console.log(templateRetrieved);

  //get template_form_response from dealOptionID if exists

  let formResponse;
  if (templateRetrieved.split("-")[2] !== "blank") {
    const { data: templateResponseData, error: templateResponseError } =
      await supabaseClient
        .from("templates")
        .select("template_forms(form_response)")
        .eq("name", templateRetrieved)
        .single();

    if (templateResponseError) {
      console.error(
        "Error fetching template form response:",
        templateResponseError
      );
      throw templateResponseError;
    }

    // If a template form exists, extract its form_response; otherwise default to an empty object.
    const castedTemplateResponse =
      templateResponseData as unknown as TemplateResponseData;
    formResponse = castedTemplateResponse?.template_forms?.form_response ?? {};
  } else {
    formResponse = {};
  }

  // 3. Insert the form into the system using the insertForm function.
  const insertedForm = await insertForm(
    dealOptionId,
    form_type,
    formResponse,
    cachedData,
    supabaseClient,
    "",
    form_stage
  );

  return insertedForm;
}

export async function uploadFormToDealOption(
  user_id: string,
  file: Express.Multer.File,
  dealOptionId: string,
  form_type: string = "file_upload",
  supabaseClient: ReturnType<typeof createClient>,
  form_stage?: string
) {
  try {
    const cachedData = await getCachedData(user_id, supabaseClient);
    // Generate unique filename
    const fileName = `${uuidv4()}.pdf`;

    // Create path structure: userId/filename (no folder as requested)
    const filePath = `${user_id}/${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } =
      await supabaseClient.storage
        .from("pdf-uploads")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      throw new Error(`Failed to upload file: ${uploadError.message}`);
    }

    // Insert form record with file reference
    const insertedForm = await insertForm(
      dealOptionId,
      form_type,
      {},
      cachedData,
      supabaseClient,
      filePath,
      form_stage
    );

    return insertedForm;
  } catch (error) {
    console.error("Error in uploadFormToDealOption:", error);
    throw error;
  }
}

export async function getDealOption(
  dealOptionId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: dealOption, error } = await supabaseClient
    .from("dealOptions")
    .select("*")
    .eq("id", dealOptionId)
    .single();

  if (error) throw error;

  return dealOption as unknown as DealOption;
}

// Interfaces for PDF overlay data
export interface TextFieldOverlay {
  x: number;
  y: number;
  text: string;
  fontSize?: number;
  color?: { r: number; g: number; b: number };
}

export interface CheckmarkOverlay {
  x: number;
  y: number;
  checked: boolean;
  size?: number;
  color?: { r: number; g: number; b: number };
}

export interface DateFieldOverlay {
  x: number;
  y: number;
  date: string; // ISO date string or formatted date
  fontSize?: number;
  color?: { r: number; g: number; b: number };
}

export interface SignatureFieldOverlay {
  x: number;
  y: number;
  width?: number; // Field width
  height?: number; // Field height
  text: string;
  fieldName: string; // Unique field name for the signature
  displayName: string; // Display name for UI
  email: string; // Email address for the signer
  actionAs: string; // Action type (e.g., "signer")
  fontSize?: number;
  color?: { r: number; g: number; b: number };
}

export interface PdfOverlayData {
  textFields: TextFieldOverlay[];
  checkmarks: CheckmarkOverlay[];
  dateFields: DateFieldOverlay[];
  signatureFields: SignatureFieldOverlay[]; // Added signature fields
  pageNumber?: number; // Optional: specify which page to overlay on (0-indexed), defaults to 0
}

export async function createPdfWithOverlaysAndUpdateForm(
  user_id: string,
  pdfFile: Express.Multer.File,
  overlayData: PdfOverlayData,
  supabaseClient: ReturnType<typeof createClient>,
  formId: string, // Required: the form ID to update
  formType: string = "pdf_with_overlays"
): Promise<{ pdfId: string; filePath: string; formId: string }> {
  try {
    console.log(
      "[PDF-OVERLAY] Creating PDF with overlays and updating form",
      { formId, formType }
    );

    // First, check if the form has existing pdf_field_metadata
    const { data: existingForm, error: fetchError } = await supabaseClient
      .from("forms")
      .select("pdf_field_metadata")
      .eq("id", formId)
      .single();

    if (fetchError) {
      console.error(
        "[PDF-OVERLAY] Error fetching existing form:",
        fetchError
      );
    } else {
      console.log(
        "[PDF-OVERLAY] Existing form pdf_field_metadata:",
        JSON.stringify(existingForm.pdf_field_metadata, null, 2)
      );
    }

    console.log(
      "[PDF-OVERLAY] Overlay data received:",
      JSON.stringify(overlayData, null, 2)
    );

    // Log array lengths
    console.log("[PDF-OVERLAY] Field counts:", {
      textFields: overlayData.textFields?.length || 0,
      checkmarks: overlayData.checkmarks?.length || 0,
      dateFields: overlayData.dateFields?.length || 0,
      signatureFields: overlayData.signatureFields?.length || 0,
    });

    // Load the existing PDF
    const existingPdfBytes = pdfFile.buffer;
    console.log(
      "[PDF-OVERLAY] Loading PDF, buffer size:",
      existingPdfBytes.length
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Load checkmark PNG image
    let checkmarkImage;
    try {
      const checkmarkPath = path.join(__dirname, "../../assets/checkmark.png");
      const checkmarkImageBytes = fs.readFileSync(checkmarkPath);
      checkmarkImage = await pdfDoc.embedPng(checkmarkImageBytes);
      console.log("[PDF-OVERLAY] Checkmark PNG loaded successfully");
    } catch (error) {
      console.error("[PDF-OVERLAY] Failed to load checkmark PNG:", error);
      // We'll fall back to drawing lines if image loading fails
    }

    // Get the page to modify (default to first page)
    const pageIndex = overlayData.pageNumber || 0;
    const pages = pdfDoc.getPages();
    console.log(
      "[PDF-OVERLAY] PDF has",
      pages.length,
      "pages, targeting page",
      pageIndex
    );

    if (pageIndex >= pages.length) {
      throw new Error(
        `Page ${pageIndex} does not exist in PDF. PDF has ${pages.length} pages.`
      );
    }

    const page = pages[pageIndex];
    const { width, height } = page.getSize();
    console.log("[PDF-OVERLAY] Page dimensions:", { width, height });

    // Embed font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    console.log("[PDF-OVERLAY] Fonts embedded successfully");

    // Add text fields
    console.log(
      "[PDF-OVERLAY] Processing",
      overlayData.textFields.length,
      "text fields"
    );
    for (let i = 0; i < overlayData.textFields.length; i++) {
      const textField = overlayData.textFields[i];
      const fontSize = textField.fontSize || 12;
      const color = textField.color || { r: 0, g: 0, b: 0 };

      // Calculate line metrics for multi-line text
      const lines = textField.text.split("\n");
      const lineCount = lines.length;
      // Use a slightly larger line height to match fabric.js rendering
      // fabric.js uses 1.2 multiplier but also has internal spacing adjustments
      const lineHeight = fontSize * 1.36; // Adjusted to match fabric.js actual rendering

      console.log(`[PDF-OVERLAY] Drawing text field ${i}:`, {
        text: textField.text,
        x: textField.x,
        y: textField.y,
        fontSize,
        color,
        lineCount,
        lineHeight,
      });

      // Draw each line separately
      // The Y coordinate from frontend is at the bottom of the text box (PDF coordinates)
      // For multi-line text, we need to move up to position the first line at the top
      // Calculate total height needed for all lines except the last one
      const totalLinesHeight = (lineCount - 1) * lineHeight;

      // Start Y position should be moved up by the total height of all lines except the last
      const startY = textField.y + totalLinesHeight + 2;
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        // Calculate Y position for this line
        // Start from the adjusted Y and move down for each subsequent line
        const lineY = startY - lineIndex * lineHeight;

        console.log(
          `[PDF-OVERLAY] Drawing line ${lineIndex}: "${line}" at y=${lineY}`
        );

        page.drawText(line, {
          x: textField.x,
          y: lineY,
          size: fontSize,
          font: font,
          color: rgb(color.r, color.g, color.b),
        });
      }

      console.log(`[PDF-OVERLAY] Text field ${i} drawn successfully`);
    }

    // Add checkmarks
    console.log(
      "[PDF-OVERLAY] Processing",
      overlayData.checkmarks.length,
      "checkmarks"
    );
    for (let i = 0; i < overlayData.checkmarks.length; i++) {
      const checkmark = overlayData.checkmarks[i];
      const size = checkmark.size || 12;

      console.log(`[PDF-OVERLAY] Processing checkmark ${i}:`, {
        x: checkmark.x,
        y: checkmark.y,
        checked: checkmark.checked,
        size,
        color: checkmark.color,
      });

      if (checkmark.checked) {
        const checkSize = size;
        const checkX = checkmark.x;
        const checkY = checkmark.y; // Frontend already converts to PDF coordinates

        if (checkmarkImage) {
          // Use the PNG image
          console.log(`[PDF-OVERLAY] Drawing checkmark image at:`, {
            position: { x: checkX, y: checkY },
            size: checkSize,
          });

          // Draw the checkmark image
          // Note: PNG images in pdf-lib cannot be dynamically colored,
          // so the checkmark will always be black
          page.drawImage(checkmarkImage, {
            x: checkX,
            y: checkY,
            width: checkSize,
            height: checkSize,
          });
        } else {
          // Fallback to drawing lines if image loading failed
          const checkColor = checkmark.color
            ? rgb(
                checkmark.color.r / 255,
                checkmark.color.g / 255,
                checkmark.color.b / 255
              )
            : rgb(0, 0.5, 0); // Default green color

          console.log(
            `[PDF-OVERLAY] Drawing checkmark lines (fallback) at:`,
            {
              position: { x: checkX, y: checkY },
              size: checkSize,
              color: checkmark.color,
            }
          );

          const lineThickness = Math.max(2, checkSize / 10);
          const scale = checkSize / 32;

          // Short stroke (downward)
          page.drawLine({
            start: {
              x: checkX + 6 * scale,
              y: checkY + 16 * scale,
            },
            end: {
              x: checkX + 12 * scale,
              y: checkY + 22 * scale,
            },
            thickness: lineThickness,
            color: checkColor,
          });

          // Long stroke (upward)
          page.drawLine({
            start: {
              x: checkX + 12 * scale,
              y: checkY + 22 * scale,
            },
            end: {
              x: checkX + 26 * scale,
              y: checkY + 8 * scale,
            },
            thickness: lineThickness,
            color: checkColor,
          });
        }

        console.log(`[PDF-OVERLAY] Checkmark ${i} drawn successfully`);
      } else {
        console.log(`[PDF-OVERLAY] Skipping checkmark ${i} (not checked)`);
      }
    }

    // Add date fields
    for (const dateField of overlayData.dateFields) {
      const fontSize = dateField.fontSize || 12;
      const color = dateField.color || { r: 0, g: 0, b: 0 };

      // Format date if it's an ISO string
      let formattedDate = dateField.date;
      try {
        const dateObj = new Date(dateField.date);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toLocaleDateString();
        }
      } catch (e) {
        // Use the date as-is if parsing fails
      }

      page.drawText(formattedDate, {
        x: dateField.x,
        y: dateField.y, // Frontend already converts to PDF coordinates
        size: fontSize,
        font: font,
        color: rgb(color.r, color.g, color.b),
      });
    }

    // Add signature fields as fillable text fields
    const signatureFieldMappings: {
      fieldName: string;
      pdfFieldName: string;
    }[] = [];
    if (overlayData.signatureFields.length > 0) {
      const form = pdfDoc.getForm();

      for (const signatureField of overlayData.signatureFields) {
        const fontSize = signatureField.fontSize || 12;

        // Create a unique field name to avoid collisions
        const uniqueFieldName = `${
          signatureField.fieldName
        }_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Store the mapping for schema creation
        signatureFieldMappings.push({
          fieldName: signatureField.fieldName,
          pdfFieldName: uniqueFieldName,
        });

        // Create a fillable text field with the unique field name
        const textField = form.createTextField(uniqueFieldName);

        // Set the field's appearance - transparent and empty
        // Note: pdf-lib expects coordinates in PDF coordinate system (bottom-left origin)
        textField.addToPage(page, {
          x: signatureField.x,
          y: signatureField.y, // Use coordinates as-is since frontend already converts them
          width: signatureField.width || 200, // Use field width if available, fallback to 200
          height: signatureField.height || fontSize + 4, // Use field height if available
          textColor: rgb(0, 0, 0),
          // No background color - completely transparent
          borderWidth: 0, // No border
        });

        // Set font size for the field
        textField.setFontSize(fontSize);

        // Leave the field empty - no default text

        // Make the field required (optional)
        // textField.enableRequired();
      }
    }

    console.log("[PDF-OVERLAY] All overlays applied, serializing PDF...");

    // Serialize the PDF
    const modifiedPdfBytes = await pdfDoc.save();
    console.log(
      "[PDF-OVERLAY] PDF serialized, size:",
      modifiedPdfBytes.length,
      "bytes"
    );

    // Generate unique filename and path
    const pdfId = uuidv4();
    const fileName = `${pdfId}.pdf`;
    const filePath = `${user_id}/modified-pdfs/${fileName}`;
    console.log("[PDF-OVERLAY] Generated file path:", filePath);

    // Upload to Supabase Storage
    console.log("[PDF-OVERLAY] Uploading to Supabase Storage...");
    const { data: uploadData, error: uploadError } =
      await supabaseClient.storage
        .from("pdf-uploads")
        .upload(filePath, modifiedPdfBytes, {
          contentType: "application/pdf",
          upsert: false,
        });

    if (uploadError) {
      console.error("[PDF-OVERLAY] Supabase upload error:", uploadError);
      throw new Error(`Failed to upload modified PDF: ${uploadError.message}`);
    }

    console.log("[PDF-OVERLAY] PDF uploaded successfully to:", filePath);

    // Create custom schema for signature fields
    const customSchema = overlayData.signatureFields.map((sig, index) => {
      // Find the PDF field mapping for this signature field
      const mapping = signatureFieldMappings.find(
        (m) => m.fieldName === sig.fieldName
      );

      return {
        unique_id: sig.fieldName,
        pdf_attributes: [
          {
            formType: formType,
            formfield: mapping?.pdfFieldName || sig.fieldName,
          },
        ],
        display_attributes: {
          display_name: sig.displayName,
          input_type: "signature" as const,
          order: index + 1,
          block: "signatures",
          value: {
            type: "manual" as const,
          },
        },
      };
    });

    // Create form response with signature field mappings
    const formResponse: Record<string, any> = {};
    overlayData.signatureFields.forEach((sig) => {
      console.log("Processing signature field:", {
        fieldName: sig.fieldName,
        email: sig.email,
        actionAs: sig.actionAs,
        text: sig.text,
      });
      formResponse[sig.fieldName] = {
        email: sig.email,
        actionAs: sig.actionAs,
      };
    });

    console.log(
      "Final form response before update:",
      JSON.stringify(formResponse, null, 2)
    );

    // Update the existing form with custom schema and file path
    await updateFormWithCustomSchema(
      formId,
      formResponse,
      supabaseClient,
      filePath,
      customSchema
    );

    return {
      pdfId,
      filePath,
      formId,
    };
  } catch (error) {
    console.error("Error in createPdfWithOverlaysAndUpdateForm:", error);
    throw error;
  }
}

export async function updateFormWithCustomSchema(
  form_id: string,
  form_response: any,
  supabaseClient: ReturnType<typeof createClient>,
  file_upload_pdf: string = "",
  custom_schema: any[] = []
) {
  console.log("[FORM-UPDATE] updating form with custom schema");
  console.log(
    "[FORM-UPDATE] Form response received in updateFormWithCustomSchema:",
    JSON.stringify(form_response, null, 2)
  );
  console.log("[FORM-UPDATE] file_upload_pdf:", file_upload_pdf);
  console.log(
    "[FORM-UPDATE] Will set is_pdf_locked to: false (custom forms should be unlocked)"
  );

  // First, get the existing form to preserve pdf_field_metadata
  const { data: existingForm, error: fetchError } = await supabaseClient
    .from("forms")
    .select("pdf_field_metadata")
    .eq("id", form_id)
    .single();

  if (fetchError) {
    console.error("[FORM-UPDATE] Error fetching existing form:", fetchError);
  } else {
    console.log(
      "[FORM-UPDATE] Existing form pdf_field_metadata (preserving):",
      JSON.stringify(existingForm.pdf_field_metadata, null, 2)
    );
  }

  const { data: form, error: formError } = (await supabaseClient!
    .from("forms")
    .update({
      form_response: form_response,
      file_upload_pdf: file_upload_pdf,
      custom_schema: custom_schema,
      // When converting to custom form, do NOT lock - users need to add custom fields
      is_pdf_locked: false,
      signature_sequence: [],
      // Preserve existing pdf_field_metadata if it exists
      pdf_field_metadata: existingForm?.pdf_field_metadata || null,
    })
    .eq("id", form_id)
    .select()
    .single()) as { data: any; error: any };

  if (formError) {
    console.error("[FORM-UPDATE] Error updating form:", formError);
    throw formError;
  }

  console.log(
    "[FORM-UPDATE] Form updated successfully:",
    JSON.stringify(form, null, 2)
  );
  console.log(
    "[FORM-UPDATE] Form response in updated form:",
    JSON.stringify(form.form_response, null, 2)
  );
  console.log(
    "[FORM-UPDATE] PDF field metadata after update:",
    JSON.stringify(form.pdf_field_metadata, null, 2)
  );

  return form as { id: string } & any;
}

// Keep original function for backward compatibility
export async function createPdfWithOverlays(
  user_id: string,
  pdfFile: Express.Multer.File,
  overlayData: Omit<PdfOverlayData, "signatureFields"> & {
    signatureFields?: SignatureFieldOverlay[];
  },
  supabaseClient: ReturnType<typeof createClient>
): Promise<{ pdfId: string; filePath: string }> {
  const overlayDataWithSignatures: PdfOverlayData = {
    ...overlayData,
    signatureFields: overlayData.signatureFields || [],
  };

  // This function is for backward compatibility - it creates a new form
  // For updating existing forms, use createPdfWithOverlaysAndUpdateForm directly
  throw new Error(
    "This function is deprecated. Use createPdfWithOverlaysAndUpdateForm with a form_id to update existing forms."
  );
}

export async function updateDealOption(
  dealOptionId: string,
  updateData: Partial<DealOption>,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: updatedDealOption, error } = await supabaseClient
    .from("dealOptions")
    .update(updateData)
    .eq("id", dealOptionId)
    .select()
    .single();

  if (error) throw error;

  return updatedDealOption as unknown as DealOption;
}

export async function uploadPropertyImagesToDealOption(
  user_id: string,
  files: Express.Multer.File[],
  dealOptionId: string,
  supabaseClient: ReturnType<typeof createClient>
): Promise<{ imagePaths: string[]; dealOption: DealOption }> {
  try {
    // Get current deal option
    const dealOption = await getDealOption(dealOptionId, supabaseClient);
    const currentImages =
      Array.isArray(dealOption.property_images) &&
      dealOption.property_images.every((item) => typeof item === "string")
        ? (dealOption.property_images as string[])
        : [];

    const uploadedImagePaths: string[] = [];

    // Upload each image
    for (const file of files) {
      // Generate unique filename
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${fileExtension}`;

      // Create path structure: userId/property-images/dealOptionId/filename
      const filePath = `${user_id}/property-images/${dealOptionId}/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage
          .from("property-images")
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }

      uploadedImagePaths.push(filePath);
    }

    // Update deal option with new image paths
    const allImages = [...currentImages, ...uploadedImagePaths];
    const updatedDealOption = await updateDealOption(
      dealOptionId,
      { property_images: allImages as any },
      supabaseClient
    );

    return {
      imagePaths: uploadedImagePaths,
      dealOption: updatedDealOption,
    };
  } catch (error) {
    console.error("Error in uploadPropertyImagesToDealOption:", error);
    throw error;
  }
}

export async function deletePropertyImageFromDealOption(
  imagePath: string,
  dealOptionId: string,
  supabaseClient: ReturnType<typeof createClient>
): Promise<DealOption> {
  try {
    // Get current deal option
    const dealOption = await getDealOption(dealOptionId, supabaseClient);
    const currentImages =
      Array.isArray(dealOption.property_images) &&
      dealOption.property_images.every((item) => typeof item === "string")
        ? (dealOption.property_images as string[])
        : [];

    // Remove the image from storage
    const { error: deleteError } = await supabaseClient.storage
      .from("property-images")
      .remove([imagePath]);

    if (deleteError) {
      console.error("Error deleting image from storage:", deleteError);
      throw new Error(`Failed to delete image: ${deleteError.message}`);
    }

    // Remove the image path from the deal option
    const updatedImages = currentImages.filter(
      (img: string) => img !== imagePath
    );
    const updatedDealOption = await updateDealOption(
      dealOptionId,
      { property_images: updatedImages as any },
      supabaseClient
    );

    return updatedDealOption;
  } catch (error) {
    console.error("Error in deletePropertyImageFromDealOption:", error);
    throw error;
  }
}

export async function getPropertyImageSignedUrls(
  imagePaths: string[],
  supabaseClient: ReturnType<typeof createClient>
): Promise<{ [path: string]: string }> {
  try {
    const signedUrls: { [path: string]: string } = {};

    for (const imagePath of imagePaths) {
      const { data, error } = await supabaseClient.storage
        .from("property-images")
        .createSignedUrl(imagePath, 3600); // 1 hour expiry

      if (error) {
        console.error(`Error creating signed URL for ${imagePath}:`, error);
        continue;
      }

      if (data?.signedUrl) {
        signedUrls[imagePath] = data.signedUrl;
      }
    }

    return signedUrls;
  } catch (error) {
    console.error("Error in getPropertyImageSignedUrls:", error);
    throw error;
  }
}

// Configure multer for image uploads
export const uploadImages = multer({
  storage: multer.memoryStorage(),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    // Allow common image formats
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per image
    files: 10, // Maximum 10 images at once
  },
});

export async function savePdfFieldMetadata(
  formId: string,
  fields: PDFFormField[], // PDFFormField array
  supabaseClient: ReturnType<typeof createClient>
): Promise<{ success: boolean; formId: string }> {
  try {
    console.log("[BACKEND-SAVE] Saving PDF field metadata", {
      formId,
      fieldsCount: fields.length,
    });
    console.log(
      "[BACKEND-SAVE] Fields received from frontend:",
      JSON.stringify(fields, null, 2)
    );

    // Validate fields structure
    fields.forEach((field, index) => {
      console.log(`[BACKEND-SAVE] Field ${index} validation:`, {
        id: field.id,
        type: field.type,
        coordinates: {
          x: field.x,
          y: field.y,
          width: field.width,
          height: field.height,
          page: field.page,
        },
        dataTypes: {
          x: typeof field.x,
          y: typeof field.y,
          width: typeof field.width,
          height: typeof field.height,
          page: typeof field.page,
        },
      });
    });

    // Create the PDF field metadata object
    const pdfFieldMetadata = {
      fields,
      savedAt: new Date().toISOString(),
      version: "1.0",
    };

    console.log(
      "[BACKEND-SAVE] Metadata object being saved:",
      JSON.stringify(pdfFieldMetadata, null, 2)
    );

    // Update the form with the field metadata in a separate column
    const { data: form, error: formError } = await supabaseClient
      .from("forms")
      .update({
        pdf_field_metadata: pdfFieldMetadata,
      })
      .eq("id", formId)
      .select()
      .single();

    if (formError) {
      console.error(
        "[BACKEND-SAVE] Error updating form with field metadata:",
        formError
      );
      throw new Error(`Failed to save field metadata: ${formError.message}`);
    }

    console.log("[BACKEND-SAVE] PDF field metadata saved successfully:", {
      formId,
      fieldsCount: fields.length,
    });
    console.log("[BACKEND-SAVE] Updated form record:", form);

    return {
      success: true,
      formId,
    };
  } catch (error) {
    console.error("[BACKEND-SAVE] Error in savePdfFieldMetadata:", error);
    throw error;
  }
}

export async function loadPdfFieldMetadata(
  formId: string,
  supabaseClient: ReturnType<typeof createClient>
): Promise<any[]> {
  try {
    console.log("[BACKEND-LOAD] Loading PDF field metadata", { formId });

    // Get the form's field metadata from the dedicated column
    const { data: form, error: fetchError } = await supabaseClient
      .from("forms")
      .select("pdf_field_metadata")
      .eq("id", formId)
      .single();

    if (fetchError) {
      console.error("[BACKEND-LOAD] Error fetching form:", fetchError);
      throw new Error(`Failed to fetch form: ${fetchError.message}`);
    }

    console.log("[BACKEND-LOAD] Raw form data from database:", form);

    // Extract field metadata from the dedicated pdf_field_metadata column
    const fieldMetadata = form.pdf_field_metadata as any;

    console.log(
      "[BACKEND-LOAD] Field metadata from database:",
      JSON.stringify(fieldMetadata, null, 2)
    );

    if (!fieldMetadata || !fieldMetadata.fields) {
      console.log(
        "[BACKEND-LOAD] No PDF field metadata found for form:",
        formId
      );
      return [];
    }

    // Validate each field before returning
    fieldMetadata.fields.forEach((field: any, index: number) => {
      console.log(`[BACKEND-LOAD] Field ${index} validation:`, {
        id: field.id,
        type: field.type,
        coordinates: {
          x: field.x,
          y: field.y,
          width: field.width,
          height: field.height,
          page: field.page,
        },
        dataTypes: {
          x: typeof field.x,
          y: typeof field.y,
          width: typeof field.width,
          height: typeof field.height,
          page: typeof field.page,
        },
      });
    });

    console.log("[BACKEND-LOAD] PDF field metadata loaded successfully:", {
      formId,
      fieldsCount: fieldMetadata.fields.length,
      version: fieldMetadata.version,
      savedAt: fieldMetadata.savedAt,
    });

    console.log(
      "[BACKEND-LOAD] Final fields being returned to frontend:",
      JSON.stringify(fieldMetadata.fields, null, 2)
    );

    return fieldMetadata.fields;
  } catch (error) {
    console.error("[BACKEND-LOAD] Error in loadPdfFieldMetadata:", error);
    throw error;
  }
}

export async function deleteDealOption(
  dealOptionId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log(
    "[DELETE DEAL OPTION] Starting deletion for deal option:",
    dealOptionId
  );

  try {
    // First, verify the deal option exists
    const { data: dealOption, error: fetchError } = await supabaseClient
      .from("dealOptions")
      .select("id, address, deal_id")
      .eq("id", dealOptionId)
      .single();

    if (fetchError) {
      console.error(
        "[DELETE DEAL OPTION] Error fetching deal option:",
        fetchError
      );
      throw new Error(`Deal option not found: ${fetchError.message}`);
    }

    if (!dealOption) {
      throw new Error("Deal option not found");
    }

    console.log("[DELETE DEAL OPTION] Found deal option:", dealOption);

    // Delete all forms associated with this deal option
    const { error: formsDeleteError } = await supabaseClient
      .from("forms")
      .delete()
      .eq("deal_option_id", dealOptionId);

    if (formsDeleteError) {
      console.error(
        "[DELETE DEAL OPTION] Error deleting forms:",
        formsDeleteError
      );
      throw new Error(
        `Failed to delete associated forms: ${formsDeleteError.message}`
      );
    }

    console.log("[DELETE DEAL OPTION] Deleted all associated forms");

    // Delete all signature collections associated with forms of this deal option
    // First get the form IDs for this deal option
    const { data: formsForDealOption } = await supabaseClient
      .from("forms")
      .select("id")
      .eq("deal_option_id", dealOptionId);

    if (formsForDealOption && formsForDealOption.length > 0) {
      const formIds = formsForDealOption.map((form) => form.id);
      const { error: signaturesDeleteError } = await supabaseClient
        .from("signature_collections")
        .delete()
        .in("form_id", formIds);

      // Log signature deletion error but don't fail the operation
      if (signaturesDeleteError) {
        console.warn(
          "[DELETE DEAL OPTION] Warning deleting signatures:",
          signaturesDeleteError
        );
      }
    }

    // Delete the deal option itself
    const { data: deletedDealOption, error: deleteError } = await supabaseClient
      .from("dealOptions")
      .delete()
      .eq("id", dealOptionId)
      .select()
      .single();

    if (deleteError) {
      console.error(
        "[DELETE DEAL OPTION] Error deleting deal option:",
        deleteError
      );
      throw new Error(`Failed to delete deal option: ${deleteError.message}`);
    }

    console.log(
      "[DELETE DEAL OPTION] Successfully deleted deal option:",
      deletedDealOption
    );

    return {
      success: true,
      message: "Deal option and all associated data deleted successfully",
      deletedDealOption,
    };
  } catch (error) {
    console.error("[DELETE DEAL OPTION] Deletion failed:", error);
    throw error;
  }
}
