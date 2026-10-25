import { SchemaItem } from "../../../../types/realtor";

export const appraisalTerminationSchema: SchemaItem[] = [
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "appraisal_termination",
      formfield: "addendum_appraisal_termination_textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Enter the complete street address and city of the property",
      order: 1,

      block: "Property Information",
      block_style: {
        title: "Property Information",
        description: "Property subject to this appraisal termination addendum",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, Austin",
      width: 9,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "appraisal_termination_option",
    pdf_attributes: [{
      formType: "appraisal_termination",
      formfield: "appraisal_termination_option",
      linked_form_fields_checkbox: [
        { fromDatabase: "WAIVER", pdfAttribute: "addendum_appraisal_termination_checkbox_1" },
        { fromDatabase: "PARTIAL_WAIVER", pdfAttribute: "addendum_appraisal_termination_checkbox_2" },
        { fromDatabase: "ADDITIONAL_TERMINATION", pdfAttribute: "addendum_appraisal_termination_checkbox_3" }
      ]
    }],
    display_attributes: {
      display_name: "Appraisal Termination Option",
      input_type: "checkbox",
      description: "Select the applicable appraisal termination option",
      order: 2,
      block: "Appraisal Options",
      block_style: {
        title: "Appraisal Termination Options",
        description: "Choose how appraisal affects buyer's termination rights",
        icon: "file-text",
        color_theme: "orange"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Waiver - Buyer waives right to terminate under Paragraph 2B",
            databaseStored: "WAIVER"
          },
          {
            display_name: "Partial Waiver - Buyer waives if appraisal meets specified threshold",
            databaseStored: "PARTIAL_WAIVER",
            linkedFields: ["partial_waiver_threshold"]
          },
          {
            display_name: "Additional Termination Rights - Buyer may terminate within specified period",
            databaseStored: "ADDITIONAL_TERMINATION",
            linkedFields: ["additional_termination_days", "additional_termination_threshold"]
          }
        ],
        maxSelected: 1,
        minSelected: 1
      },
      special_input: {
        checkbox: {
          asRadio: true
        }
      },
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "partial_waiver_threshold",
    pdf_attributes: [{
      formType: "appraisal_termination",
      formfield: "addendum_appraisal_termination_textfield_2"
    }],
    display_attributes: {
      display_name: "Partial Waiver Appraisal Threshold",
      input_type: "text",
      description: "Minimum appraisal value for partial waiver to apply",
      order: 3,
      block: "Appraisal Options",
      placeholder: "$0.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: {
          currency: true
        }
      },
      visibleIf: [{
        unique_id: "appraisal_termination_option",
        operation: "contains",
        valueChecked: "PARTIAL_WAIVER"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "additional_termination_days",
    pdf_attributes: [{
      formType: "appraisal_termination",
      formfield: "addendum_appraisal_termination_textfield_3"
    }],
    display_attributes: {
      display_name: "Additional Termination Period (Days)",
      input_type: "text",
      description: "Number of days after effective date for additional termination rights",
      order: 4,
      block: "Appraisal Options",
      placeholder: "10",
      width: 3,
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a whole number"
        }]
      },
      special_input: {
        text: {
          number: true
        }
      },
      visibleIf: [{
        unique_id: "appraisal_termination_option",
        operation: "contains",
        valueChecked: "ADDITIONAL_TERMINATION"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "additional_termination_threshold",
    pdf_attributes: [{
      formType: "appraisal_termination",
      formfield: "addendum_appraisal_termination_textfield_4"
    }],
    display_attributes: {
      display_name: "Termination Appraisal Threshold",
      input_type: "text",
      description: "Appraisal must be less than this amount for buyer to terminate",
      order: 5,
      block: "Appraisal Options",
      placeholder: "$0.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: {
          currency: true
        }
      },
      visibleIf: [{
        unique_id: "appraisal_termination_option",
        operation: "contains",
        valueChecked: "ADDITIONAL_TERMINATION"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "buyer_1_signature",
    pdf_attributes: [{
      formType: "appraisal_termination",
      formfield: "addendum_appraisal_termination_textfield_5"
    }],
    display_attributes: {
      display_name: "Buyer 1 Signature",
      input_type: "signature",
      description: "Signature of the first buyer",
      order: 6,
      block: "Buyer Signatures",
      block_style: {
        title: "Buyer Signatures",
        description: "All buyers must sign this addendum",
        icon: "pen-tool",
        color_theme: "gray"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },
  {
    unique_id: "buyer_2_signature",
    pdf_attributes: [{
      formType: "appraisal_termination",
      formfield: "addendum_appraisal_termination_textfield_6"
    }],
    display_attributes: {
      display_name: "Buyer 2 Signature",
      input_type: "signature",
      description: "Signature of the second buyer (if applicable)",
      order: 7,
      block: "Buyer Signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },
  {
    unique_id: "seller_1_signature",
    pdf_attributes: [{
      formType: "appraisal_termination",
      formfield: "addendum_appraisal_termination_textfield_7"
    }],
    display_attributes: {
      display_name: "Seller 1 Signature",
      input_type: "signature",
      description: "Signature of the first seller",
      order: 8,
      block: "Seller Signatures",
      block_style: {
        title: "Seller Signatures",
        description: "All sellers must sign this addendum",
        icon: "pen-tool",
        color_theme: "gray"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },
  {
    unique_id: "seller_2_signature",
    pdf_attributes: [{
      formType: "appraisal_termination",
      formfield: "addendum_appraisal_termination_textfield_8"
    }],
    display_attributes: {
      display_name: "Seller 2 Signature",
      input_type: "signature",
      description: "Signature of the second seller (if applicable)",
      order: 9,
      block: "Seller Signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  }
];