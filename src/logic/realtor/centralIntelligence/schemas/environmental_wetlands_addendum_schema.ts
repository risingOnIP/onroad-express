import { SchemaItem } from "../../../../types/realtor";

export const environmentalWetlandsAddendumSchema: SchemaItem[] = [
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "environmental_wetlands_addendum",
      formfield: "environmental_wetlands_addendum_textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Enter the complete property address",
      order: 1,

      block: "Property Information",
      block_style: {
        title: "Property Details",
        description: "Information about the property being assessed",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, City, State 12345",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "assessment_type",
    pdf_attributes: [{
      formType: "environmental_wetlands_addendum",
      formfield: "assessment_options",
      linked_form_fields_checkbox: [
        { fromDatabase: "ENVIRONMENTAL", pdfAttribute: "environmental_wetlands_addendum_checkbox_1" },
        { fromDatabase: "SPECIES", pdfAttribute: "environmental_wetlands_addendum_checkbox_2" },
        { fromDatabase: "WETLANDS", pdfAttribute: "environmental_wetlands_addendum_checkbox_3" }
      ]
    }],
    display_attributes: {
      display_name: "Assessment Type",
      input_type: "checkbox",
      description: "Select the type(s) of assessment to be conducted",
      order: 2,

      block: "Assessment Options",
      block_style: {
        title: "Environmental Assessment Options",
        description: "Choose which assessments will be performed",
        icon: "file-text",
        color_theme: "green"
      },
      checkbox_options: {
        options: [
          { 
            display_name: "Environmental Assessment", 
            databaseStored: "ENVIRONMENTAL",
            linkedFields: []
          },
          { 
            display_name: "Threatened or Endangered Species", 
            databaseStored: "SPECIES",
            linkedFields: []
          },
          { 
            display_name: "Wetlands", 
            databaseStored: "WETLANDS",
            linkedFields: []
          }
        ],
        minSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "assessment_period_days",
    pdf_attributes: [{
      formType: "environmental_wetlands_addendum",
      formfield: "environmental_wetlands_addendum_textfield_2"
    }],
    display_attributes: {
      display_name: "Assessment Period (Days)",
      input_type: "text",
      description: "Number of days for assessment completion",
      order: 3,

      block: "Assessment Options",
      placeholder: "30",
      width: 4,
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a valid number"
        }]
      },
      special_input: {
        text: { number: true }
      },
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "buyer_signature",
    pdf_attributes: [{
      formType: "environmental_wetlands_addendum",
      formfield: "environmental_wetlands_addendum_textfield_3",
      linked_dates: [{ 
        dateFieldName: "environmental_wetlands_addendum_textfield_5" 
      }]
    }],
    display_attributes: {
      display_name: "Buyer Signature",
      input_type: "signature",
      description: "Buyer's acknowledgment of environmental assessment terms",
      order: 4,

      block: "Signatures",
      block_style: {
        title: "Agreement Signatures",
        description: "All parties must sign to acknowledge the assessment terms",
        icon: "pen-tool",
        color_theme: "gray"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true,
      breakBefore: true
    }
  },
  {
    unique_id: "seller_signature",
    pdf_attributes: [{
      formType: "environmental_wetlands_addendum",
      formfield: "environmental_wetlands_addendum_textfield_4",
      linked_dates: [{ 
        dateFieldName: "environmental_wetlands_addendum_textfield_6" 
      }]
    }],
    display_attributes: {
      display_name: "Seller Signature",
      input_type: "signature",
      description: "Seller's acknowledgment of environmental assessment terms",
      order: 5,

      block: "Signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  }
];