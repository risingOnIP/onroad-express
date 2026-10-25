import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { FormFields } from '../../types/broker';

/**
 * Removes all existing form fields from a PDF by flattening them
 * @param pdfDoc - The PDF document to flatten
 * @returns A new PDF document without form fields
 */
async function flattenPdf(pdfDoc: PDFDocument): Promise<PDFDocument> {
  // First, flatten any existing form fields in the original document
  const originalForm = pdfDoc.getForm();
  const fields = originalForm.getFields();
  
  if (fields.length > 0) {
    // Flatten all existing form fields to convert them to static content
    originalForm.flatten();
  }
  
  // Create a new PDF and copy the flattened pages
  const newPdfDoc = await PDFDocument.create();
  const pages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
  
  pages.forEach((page) => {
    newPdfDoc.addPage(page);
  });
  
  return newPdfDoc;
}

/**
 * Applies form fields to a PDF document (removes existing fields first)
 * @param pdfBytes - The PDF file as a buffer
 * @param fields - Array of field definitions to apply
 * @returns The modified PDF with fillable fields
 */
export async function applyFieldsToPdf(
  pdfBytes: Buffer,
  fields: FormFields
): Promise<Buffer> {
  try {
    // Load the original PDF document
    const originalPdfDoc = await PDFDocument.load(pdfBytes);
    
    // Flatten the PDF to remove any existing fields
    const pdfDoc = await flattenPdf(originalPdfDoc);
    
    const form = pdfDoc.getForm();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    // Track radio groups to avoid duplicates
    const radioGroups = new Map<string, any>();

    for (const fieldInfo of fields) {
      // Skip if page doesn't exist
      if ((fieldInfo.page - 1) >= pages.length) {
        console.warn(`Page ${fieldInfo.page} doesn't exist for field ${fieldInfo.name}`);
        continue;
      }

      const page = pages[(fieldInfo.page - 1)];

      try {
        switch (fieldInfo.type) {
          case 'text': {
            const textField = form.createTextField(fieldInfo.name);
            textField.addToPage(page, {
              x: fieldInfo.x,
              y: fieldInfo.y,
              width: fieldInfo.width,
              height: fieldInfo.height,
              borderWidth: fieldInfo.borderWidth || 1,
              backgroundColor: fieldInfo.backgroundColor
                ? rgb(
                    fieldInfo.backgroundColor.r,
                    fieldInfo.backgroundColor.g,
                    fieldInfo.backgroundColor.b
                  )
                : undefined,
              borderColor: fieldInfo.borderColor
                ? rgb(
                    fieldInfo.borderColor.r,
                    fieldInfo.borderColor.g,
                    fieldInfo.borderColor.b
                  )
                : undefined,
              textColor: fieldInfo.textColor
                ? rgb(fieldInfo.textColor.r, fieldInfo.textColor.g, fieldInfo.textColor.b)
                : rgb(0, 0, 0),
              font: helvetica,
            });

            if (fieldInfo.value && typeof fieldInfo.value === 'string') {
              textField.setText(fieldInfo.value);
            }
            if (fieldInfo.maxLength) textField.setMaxLength(fieldInfo.maxLength);
            if (fieldInfo.isReadOnly) textField.enableReadOnly();
            if (fieldInfo.isRequired) textField.enableRequired();
            if (fieldInfo.multiline) textField.enableMultiline();
            if (fieldInfo.fontSize) textField.setFontSize(fieldInfo.fontSize);
            break;
          }

          case 'checkbox': {
            const checkBox = form.createCheckBox(fieldInfo.name);
            checkBox.addToPage(page, {
              x: fieldInfo.x,
              y: fieldInfo.y,
              width: fieldInfo.width,
              height: fieldInfo.height,
              borderWidth: fieldInfo.borderWidth || 1,
              backgroundColor: fieldInfo.backgroundColor
                ? rgb(
                    fieldInfo.backgroundColor.r,
                    fieldInfo.backgroundColor.g,
                    fieldInfo.backgroundColor.b
                  )
                : undefined,
              borderColor: fieldInfo.borderColor
                ? rgb(
                    fieldInfo.borderColor.r,
                    fieldInfo.borderColor.g,
                    fieldInfo.borderColor.b
                  )
                : undefined,
            });

            if (fieldInfo.value && typeof fieldInfo.value === 'boolean' && fieldInfo.value) {
              checkBox.check();
            }
            if (fieldInfo.isReadOnly) checkBox.enableReadOnly();
            if (fieldInfo.isRequired) checkBox.enableRequired();
            break;
          }

          case 'dropdown': {
            const dropdown = form.createDropdown(fieldInfo.name);
            dropdown.addToPage(page, {
              x: fieldInfo.x,
              y: fieldInfo.y,
              width: fieldInfo.width,
              height: fieldInfo.height,
              borderWidth: fieldInfo.borderWidth || 1,
              backgroundColor: fieldInfo.backgroundColor
                ? rgb(
                    fieldInfo.backgroundColor.r,
                    fieldInfo.backgroundColor.g,
                    fieldInfo.backgroundColor.b
                  )
                : undefined,
              borderColor: fieldInfo.borderColor
                ? rgb(
                    fieldInfo.borderColor.r,
                    fieldInfo.borderColor.g,
                    fieldInfo.borderColor.b
                  )
                : undefined,
              textColor: fieldInfo.textColor
                ? rgb(fieldInfo.textColor.r, fieldInfo.textColor.g, fieldInfo.textColor.b)
                : rgb(0, 0, 0),
              font: helvetica,
            });

            if (fieldInfo.options) {
              dropdown.setOptions(fieldInfo.options);
              if (
                fieldInfo.value &&
                typeof fieldInfo.value === 'string' &&
                fieldInfo.options.includes(fieldInfo.value)
              ) {
                dropdown.select(fieldInfo.value);
              }
            }
            if (fieldInfo.isReadOnly) dropdown.enableReadOnly();
            if (fieldInfo.isRequired) dropdown.enableRequired();
            if (fieldInfo.fontSize) dropdown.setFontSize(fieldInfo.fontSize);
            break;
          }

          case 'radio': {
            // Handle radio buttons as groups
            let radioGroup = radioGroups.get(fieldInfo.name);
            
            if (!radioGroup) {
              radioGroup = form.createRadioGroup(fieldInfo.name);
              radioGroups.set(fieldInfo.name, radioGroup);
            }

            // Add each option as a radio button
            if (fieldInfo.options && fieldInfo.options.length > 0) {
              // For simplicity, we'll add the first option at the specified coordinates
              // In a real scenario, you might need to handle multiple radio button positions
              const optionName = fieldInfo.options[0] || 'option1';
              
              radioGroup.addOptionToPage(optionName, page, {
                x: fieldInfo.x,
                y: fieldInfo.y,
                width: fieldInfo.width,
                height: fieldInfo.height,
                borderWidth: fieldInfo.borderWidth || 1,
                backgroundColor: fieldInfo.backgroundColor
                  ? rgb(
                      fieldInfo.backgroundColor.r,
                      fieldInfo.backgroundColor.g,
                      fieldInfo.backgroundColor.b
                    )
                  : undefined,
                borderColor: fieldInfo.borderColor
                  ? rgb(
                      fieldInfo.borderColor.r,
                      fieldInfo.borderColor.g,
                      fieldInfo.borderColor.b
                    )
                  : undefined,
              });

              if (fieldInfo.value && typeof fieldInfo.value === 'string') {
                radioGroup.select(fieldInfo.value);
              }
            }
            
            if (fieldInfo.isReadOnly) radioGroup.enableReadOnly();
            if (fieldInfo.isRequired) radioGroup.enableRequired();
            break;
          }

          default:
            console.warn(`Unknown field type: ${fieldInfo.type} for field ${fieldInfo.name}`);
        }
      } catch (error) {
        console.error(`Error adding field ${fieldInfo.name}:`, error);
      }
    }

    // Save the PDF with the applied fields
    const modifiedPdfBytes = await pdfDoc.save();
    return Buffer.from(modifiedPdfBytes);
  } catch (error) {
    console.error('Error applying fields to PDF:', error);
    throw error;
  }
}

/**
 * Validates if a PDF already has form fields
 * @param pdfBytes - The PDF file as a buffer
 * @returns True if the PDF has existing form fields
 */
export async function pdfHasExistingFields(pdfBytes: Buffer): Promise<boolean> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    return fields.length > 0;
  } catch (error) {
    console.error('Error checking PDF for existing fields:', error);
    return false;
  }
}