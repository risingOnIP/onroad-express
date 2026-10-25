import { SchemaItem } from "../../../../types/realtor";

export const addendumRegardingLeadBasedPaintSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Enter the full address of the property",
      order: 1,

      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Details about the property subject to lead-based paint disclosure",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "property_address_line_2",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_2"
    }],
    display_attributes: {
      display_name: "Property Address (continued)",
      input_type: "text",
      description: "Additional address information if needed",
      order: 2,

      block: "property_information",
      placeholder: "City, State ZIP",
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Lead-Based Paint Disclosure Block
  {
    unique_id: "landlord_knows_lead_hazards",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_checkbox_1"
    }],
    display_attributes: {
      display_name: "Landlord's Knowledge of Lead-Based Paint",
      input_type: "checkbox",
      description: "Select one option regarding knowledge of lead-based paint hazards",
      order: 3,

      block: "lead_paint_disclosure",
      block_style: {
        title: "Lead-Based Paint Disclosure",
        description: "Landlord's disclosure of knowledge about lead-based paint and hazards",
        icon: "alert-triangle",
        color_theme: "orange"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Landlord knows of lead-based paint and/or lead-based paint hazards in the Property",
            databaseStored: "KNOWS_HAZARDS",
            linkedFields: ["lead_hazards_description"]
          }
        ],
        maxSelected: 1
      },
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "landlord_no_knowledge_lead_hazards",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_checkbox_2"
    }],
    display_attributes: {
      display_name: "No Knowledge of Lead-Based Paint",
      input_type: "checkbox",
      order: 4,

      block: "lead_paint_disclosure",
      checkbox_options: {
        options: [
          {
            display_name: "Landlord has no knowledge of lead-based paint and/or lead-based paint hazards in the Property",
            databaseStored: "NO_KNOWLEDGE"
          }
        ],
        maxSelected: 1
      },
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "lead_hazards_description",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_3",
      linked_form_fields_text: ["addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_4"]
    }],
    display_attributes: {
      display_name: "Description of Lead-Based Paint Hazards",
      input_type: "text-area",
      description: "Describe the known lead-based paint hazards",
      order: 5,

      block: "lead_paint_disclosure",
      placeholder: "List all known lead-based paint hazards...",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "landlord_knows_lead_hazards",
        operation: "contains",
        valueChecked: "KNOWS_HAZARDS"
      }]
    }
  },

  // Records and Reports Block
  {
    unique_id: "landlord_has_records",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_checkbox_3"
    }],
    display_attributes: {
      display_name: "Records and Reports Available",
      input_type: "checkbox",
      description: "Select if records are available",
      order: 6,

      block: "records_reports",
      block_style: {
        title: "Records and Reports",
        description: "Availability of lead-based paint records and reports",
        icon: "file-text",
        color_theme: "purple"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Landlord has provided all available records and reports pertaining to lead-based paint hazards",
            databaseStored: "HAS_RECORDS",
            linkedFields: ["records_description"]
          }
        ],
        maxSelected: 1
      },
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "landlord_no_records",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_checkbox_4"
    }],
    display_attributes: {
      display_name: "No Records Available",
      input_type: "checkbox",
      order: 7,

      block: "records_reports",
      checkbox_options: {
        options: [
          {
            display_name: "Landlord has no records or reports pertaining to lead-based paint in the Property",
            databaseStored: "NO_RECORDS"
          }
        ],
        maxSelected: 1
      },
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "records_description",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_5",
      linked_form_fields_text: ["addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_6"]
    }],
    display_attributes: {
      display_name: "Description of Records and Reports",
      input_type: "text-area",
      description: "List all available records and reports",
      order: 8,

      block: "records_reports",
      placeholder: "List all available records and reports...",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "landlord_has_records",
        operation: "contains",
        valueChecked: "HAS_RECORDS"
      }]
    }
  },

  // Tenant Acknowledgment Block
  {
    unique_id: "tenant_received_information_initial",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_7"
    }],
    display_attributes: {
      display_name: "Tenant Initial - Received Information",
      input_type: "signature",
      description: "Tenant initials acknowledging receipt of all information listed in Paragraph B",
      order: 9,

      block: "tenant_acknowledgment",
      block_style: {
        title: "Tenant Acknowledgment",
        description: "Tenant's acknowledgment of receipt of lead-based paint information",
        icon: "check-square",
        color_theme: "green"
      },
      width: 3,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },
  {
    unique_id: "tenant_received_pamphlet_initial",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_8"
    }],
    display_attributes: {
      display_name: "Tenant Initial - Received Pamphlet",
      input_type: "signature",
      description: "Tenant initials acknowledging receipt of 'Protect Your Family from Lead in Your Home' pamphlet",
      order: 10,

      block: "tenant_acknowledgment",
      width: 3,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },

  // Signature Block - First Row
  {
    unique_id: "landlord_signature_1",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_9",
      linked_dates: [{
        dateFieldName: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_10"
      }]
    }],
    display_attributes: {
      display_name: "Landlord Signature",
      input_type: "signature",
      order: 11,

      block: "signatures",
      block_style: {
        title: "Signatures",
        description: "All parties must sign to certify accuracy of information",
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
    unique_id: "tenant_signature_1",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_11",
      linked_dates: [{
        dateFieldName: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_12"
      }]
    }],
    display_attributes: {
      display_name: "Tenant Signature",
      input_type: "signature",
      order: 12,

      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },

  // Signature Block - Second Row
  {
    unique_id: "landlord_signature_2",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_13",
      linked_dates: [{
        dateFieldName: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_14"
      }]
    }],
    display_attributes: {
      display_name: "Landlord Signature",
      input_type: "signature",
      order: 13,

      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },
  {
    unique_id: "tenant_signature_2",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_15",
      linked_dates: [{
        dateFieldName: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_16"
      }]
    }],
    display_attributes: {
      display_name: "Tenant Signature",
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

  // Signature Block - Third Row
  {
    unique_id: "landlord_signature_3",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_17",
      linked_dates: [{
        dateFieldName: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_18"
      }]
    }],
    display_attributes: {
      display_name: "Landlord Signature",
      input_type: "signature",
      order: 15,

      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },
  {
    unique_id: "tenant_signature_3",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_19",
      linked_dates: [{
        dateFieldName: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_20"
      }]
    }],
    display_attributes: {
      display_name: "Tenant Signature",
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

  // Agent/Broker Signature Block
  {
    unique_id: "listing_agent_signature",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_21",
      linked_dates: [{
        dateFieldName: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_22"
      }]
    }],
    display_attributes: {
      display_name: "Listing Broker/Agent or Property Manager Signature",
      input_type: "signature",
      order: 17,

      block: "agent_signatures",
      block_style: {
        title: "Agent/Broker Signatures",
        description: "Real estate professional signatures",
        icon: "briefcase",
        color_theme: "purple"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      breakBefore: true
    }
  },
  {
    unique_id: "other_agent_signature",
    pdf_attributes: [{
      formType: "addendum_regarding_lead_based_paint",
      formfield: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_23",
      linked_dates: [{
        dateFieldName: "addendum_regarding_lead_based_paint___1003_ts03237_unlocked_textfield_24"
      }]
    }],
    display_attributes: {
      display_name: "Other Broker/Agent Signature",
      input_type: "signature",
      order: 18,

      block: "agent_signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  }
];