import { SchemaItem } from "../../../../types/realtor";

export const leadBasedPaintAddendumSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_2"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Street address and city of the property",
      order: 1,

      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Information about the property subject to this addendum",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, Austin",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // Seller's Disclosure Block
  {
    unique_id: "seller_knowledge_lead_paint",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_checkbox_1"
    }],
    display_attributes: {
      display_name: "Known Lead-Based Paint Present",
      input_type: "checkbox",
      description: "Check if known lead-based paint and/or lead-based paint hazards are present in the property",
      order: 2,
      block: "seller_disclosure",
      block_style: {
        title: "Seller's Disclosure",
        description: "Seller's disclosure regarding lead-based paint",
        icon: "alert-circle",
        color_theme: "orange"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Lead-based paint/hazards are present",
            databaseStored: "LEAD_PRESENT",
            linkedFields: ["lead_paint_explanation"]
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "lead_paint_year",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_1"
    }],
    display_attributes: {
      display_name: "Year Built",
      input_type: "text",
      description: "Year the property was built",
      order: 3,
      block: "seller_disclosure",
      placeholder: "1978",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "seller_knowledge_lead_paint",
        operation: "contains",
        valueChecked: "LEAD_PRESENT"
      }],
      validation: {
        loopback: [{
          regex: "^\\d{4}$",
          message: "Must be a valid 4-digit year"
        }]
      }
    }
  },

  {
    unique_id: "lead_paint_explanation",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_3"
    }],
    display_attributes: {
      display_name: "Lead-Based Paint Explanation",
      input_type: "text-area",
      description: "Explain the presence of lead-based paint and/or hazards",
      order: 4,
      block: "seller_disclosure",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "seller_knowledge_lead_paint",
        operation: "contains",
        valueChecked: "LEAD_PRESENT"
      }],

    }
  },

  {
    unique_id: "seller_no_knowledge",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_checkbox_2"
    }],
    display_attributes: {
      display_name: "No Knowledge of Lead-Based Paint",
      input_type: "checkbox",
      description: "Check if seller has no actual knowledge of lead-based paint and/or hazards",
      order: 5,
      block: "seller_disclosure",
      checkbox_options: {
        options: [
          {
            display_name: "Seller has no knowledge of lead-based paint/hazards",
            databaseStored: "NO_KNOWLEDGE"
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "seller_provided_records",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_checkbox_3"
    }],
    display_attributes: {
      display_name: "Records Provided to Buyer",
      input_type: "checkbox",
      description: "Check if seller has provided all available records and reports to buyer",
      order: 6,
      block: "seller_disclosure",
      checkbox_options: {
        options: [
          {
            display_name: "Seller has provided all available records and reports",
            databaseStored: "RECORDS_PROVIDED",
            linkedFields: ["records_list"]
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "records_list",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_4",
      linked_form_fields_text: ["lead_based_paint_addendum_textfield_5"]
    }],
    display_attributes: {
      display_name: "List of Documents Provided",
      input_type: "text-area",
      description: "List all records and reports provided to buyer",
      order: 7,
      block: "seller_disclosure",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "seller_provided_records",
        operation: "contains",
        valueChecked: "RECORDS_PROVIDED"
      }],

    }
  },

  {
    unique_id: "seller_no_records",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_checkbox_4"
    }],
    display_attributes: {
      display_name: "No Records Available",
      input_type: "checkbox",
      description: "Check if seller has no reports or records pertaining to lead-based paint",
      order: 8,
      block: "seller_disclosure",
      checkbox_options: {
        options: [
          {
            display_name: "Seller has no reports or records",
            databaseStored: "NO_RECORDS"
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Buyer's Rights Block
  {
    unique_id: "buyer_waives_inspection",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_checkbox_5"
    }],
    display_attributes: {
      display_name: "Buyer Waives Inspection",
      input_type: "checkbox",
      description: "Check if buyer waives the opportunity to conduct a risk assessment or inspection",
      order: 9,
      block: "buyer_rights",
      block_style: {
        title: "Buyer's Rights",
        description: "Buyer's rights regarding lead-based paint inspection",
        icon: "shield",
        color_theme: "green"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Buyer waives inspection opportunity",
            databaseStored: "WAIVE_INSPECTION"
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "buyer_will_inspect",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_checkbox_6"
    }],
    display_attributes: {
      display_name: "Buyer Will Inspect",
      input_type: "checkbox",
      description: "Check if buyer will have the property inspected within ten days",
      order: 10,
      block: "buyer_rights",
      checkbox_options: {
        options: [
          {
            display_name: "Buyer will have property inspected within 10 days",
            databaseStored: "WILL_INSPECT"
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Buyer's Acknowledgment Block
  {
    unique_id: "buyer_received_info",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_checkbox_7"
    }],
    display_attributes: {
      display_name: "Buyer Received Information",
      input_type: "checkbox",
      description: "Buyer acknowledges receiving copies of all information listed above",
      order: 11,
      block: "buyer_acknowledgment",
      block_style: {
        title: "Buyer's Acknowledgment",
        description: "Buyer's acknowledgment of receipt of information",
        icon: "check-square",
        color_theme: "green"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Buyer has received copies of all information",
            databaseStored: "INFO_RECEIVED"
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  {
    unique_id: "buyer_received_pamphlet",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_checkbox_8"
    }],
    display_attributes: {
      display_name: "Buyer Received Pamphlet",
      input_type: "checkbox",
      description: "Buyer has received the pamphlet 'Protect Your Family from Lead in Your Home'",
      order: 12,
      block: "buyer_acknowledgment",
      checkbox_options: {
        options: [
          {
            display_name: "Buyer has received the EPA pamphlet",
            databaseStored: "PAMPHLET_RECEIVED"
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // Signatures Block - Buyers
  {
    unique_id: "buyer_1_signature",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_12",
      linked_dates: [{
        dateFieldName: "lead_based_paint_addendum_textfield_13"
      }]
    }],
    display_attributes: {
      display_name: "Buyer 1 Signature",
      input_type: "signature",
      order: 13,
      block: "signatures",
      block_style: {
        title: "Signatures",
        description: "All parties must sign and date this addendum",
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
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_14",
      linked_dates: [{
        dateFieldName: "lead_based_paint_addendum_textfield_16"
      }]
    }],
    display_attributes: {
      display_name: "Buyer 2 Signature",
      input_type: "signature",
      order: 14,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  // Signatures Block - Sellers
  {
    unique_id: "seller_1_signature",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_6",
      linked_dates: [{
        dateFieldName: "lead_based_paint_addendum_textfield_7"
      }]
    }],
    display_attributes: {
      display_name: "Seller 1 Signature",
      input_type: "signature",
      order: 15,
      block: "signatures",
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
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_8",
      linked_dates: [{
        dateFieldName: "lead_based_paint_addendum_textfield_9"
      }]
    }],
    display_attributes: {
      display_name: "Seller 2 Signature",
      input_type: "signature",
      order: 16,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  // Signatures Block - Brokers
  {
    unique_id: "listing_broker_signature",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_10",
      linked_dates: [{
        dateFieldName: "lead_based_paint_addendum_textfield_11"
      }]
    }],
    display_attributes: {
      display_name: "Listing Broker Signature",
      input_type: "signature",
      order: 17,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  {
    unique_id: "other_broker_signature",
    pdf_attributes: [{
      formType: "lead_based_paint_addendum",
      formfield: "lead_based_paint_addendum_textfield_15",
      linked_dates: [{
        dateFieldName: "lead_based_paint_addendum_textfield_17"
      }]
    }],
    display_attributes: {
      display_name: "Other Broker Signature",
      input_type: "signature",
      order: 18,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  }
];