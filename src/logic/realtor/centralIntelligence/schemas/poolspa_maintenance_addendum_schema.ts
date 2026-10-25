import { SchemaItem } from "../../../../types/realtor";

export const poolspaMaintenanceAddendumSchema: SchemaItem[] = [
  {
    unique_id: "property_address",
    pdf_attributes: [
      {
        formType: "poolspa_maintenance_addendum",
        formfield: "poolspa_maintenance_addendum_textfield_1"
      },
      {
        formType: "poolspa_maintenance_addendum",
        formfield: "poolspa_maintenance_addendum_textfield_2"
      }
    ],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Address of the property with pool/spa",
      order: 1,

      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Property details for pool/spa maintenance",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, City, ST 12345",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // Pool/Spa Maintenance Responsibilities Block
  {
    unique_id: "landlord_responsible_maintenance",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_checkbox_1"
    }],
    display_attributes: {
      display_name: "Landlord Responsible for Maintenance",
      input_type: "checkbox",
      description: "Check if Landlord is responsible for pool/spa maintenance",
      order: 2,

      block: "maintenance_responsibilities",
      block_style: {
        title: "Maintenance Responsibilities",
        description: "Specify who is responsible for pool/spa maintenance",
        icon: "tool",
        color_theme: "green"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Landlord is responsible",
            databaseStored: "LANDLORD_RESPONSIBLE"
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
    unique_id: "tenant_responsible_maintenance",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_checkbox_2"
    }],
    display_attributes: {
      display_name: "Tenant Responsible for Maintenance",
      input_type: "checkbox",
      description: "Check if Tenant is responsible for pool/spa maintenance at Tenant's expense",
      order: 3,

      block: "maintenance_responsibilities",
      checkbox_options: {
        options: [
          {
            display_name: "Tenant is responsible at Tenant's expense",
            databaseStored: "TENANT_RESPONSIBLE"
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
    unique_id: "tenant_contract_maintenance",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_checkbox_3"
    }],
    display_attributes: {
      display_name: "Tenant Contract Maintenance",
      input_type: "checkbox",
      description: "Check if Tenant will contract with a maintenance service",
      order: 4,

      block: "maintenance_responsibilities",
      checkbox_options: {
        options: [
          {
            display_name: "Tenant will contract maintenance",
            databaseStored: "TENANT_CONTRACT",
            linkedFields: ["maintenance_contractor_scheduled"]
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
    unique_id: "maintenance_contractor_scheduled",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_checkbox_6"
    }],
    display_attributes: {
      display_name: "Scheduled Maintenance",
      input_type: "checkbox",
      description: "Regular scheduled maintenance",
      order: 5,

      block: "maintenance_responsibilities",
      checkbox_options: {
        options: [
          {
            display_name: "Scheduled maintenance",
            databaseStored: "SCHEDULED"
          }
        ],
        maxSelected: 1
      },
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "tenant_contract_maintenance",
        operation: "contains",
        valueChecked: "TENANT_CONTRACT"
      }]
    }
  },

  {
    unique_id: "maintenance_contractor_name",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_3"
    }],
    display_attributes: {
      display_name: "Maintenance Contractor Name",
      input_type: "text",
      description: "Name of the pool/spa maintenance contractor",
      order: 6,

      block: "maintenance_responsibilities",
      placeholder: "Pool Maintenance Company Name",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "tenant_contract_maintenance",
        operation: "contains",
        valueChecked: "TENANT_CONTRACT"
      }]
    }
  },

  {
    unique_id: "contractor_regularly_provides",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_checkbox_5"
    }],
    display_attributes: {
      display_name: "Contractor Regularly Provides Service",
      input_type: "checkbox",
      description: "Contractor who regularly provides such service",
      order: 7,

      block: "maintenance_responsibilities",
      checkbox_options: {
        options: [
          {
            display_name: "Contractor who regularly provides service",
            databaseStored: "REGULAR_CONTRACTOR"
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "tenant_contract_maintenance",
        operation: "contains",
        valueChecked: "TENANT_CONTRACT"
      }]
    }
  },

  {
    unique_id: "other_party_responsible",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_checkbox_4"
    }],
    display_attributes: {
      display_name: "Other Party Responsible",
      input_type: "checkbox",
      description: "Check if other party is responsible for maintenance",
      order: 8,

      block: "maintenance_responsibilities",
      checkbox_options: {
        options: [
          {
            display_name: "Other party responsible",
            databaseStored: "OTHER_RESPONSIBLE",
            linkedFields: ["other_party_details"]
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
    unique_id: "other_party_details",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_4"
    }],
    display_attributes: {
      display_name: "Other Party Details",
      input_type: "text-area",
      description: "Specify other party responsible for maintenance",
      order: 9,

      block: "maintenance_responsibilities",
      placeholder: "Enter details about other party responsible for maintenance",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "other_party_responsible",
        operation: "contains",
        valueChecked: "OTHER_RESPONSIBLE"
      }]
    }
  },

  // Signatures Block
  {
    unique_id: "landlord_signature",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_5",
      linked_dates: [{
        dateFieldName: "poolspa_maintenance_addendum_textfield_6"
      }]
    }],
    display_attributes: {
      display_name: "Landlord Signature",
      input_type: "signature",
      description: "Landlord's signature",
      order: 10,

      block: "signatures",
      block_style: {
        title: "Signatures",
        description: "All parties must sign and date",
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
    unique_id: "tenant_1_signature",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_7",
      linked_dates: [{
        dateFieldName: "poolspa_maintenance_addendum_textfield_8"
      }]
    }],
    display_attributes: {
      display_name: "Tenant 1 Signature",
      input_type: "signature",
      description: "First tenant's signature",
      order: 11,

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
    unique_id: "landlord_2_signature",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_9",
      linked_dates: [{
        dateFieldName: "poolspa_maintenance_addendum_textfield_10"
      }]
    }],
    display_attributes: {
      display_name: "Landlord 2 Signature",
      input_type: "signature",
      description: "Second landlord's signature (if applicable)",
      order: 12,

      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  {
    unique_id: "tenant_2_signature",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_11",
      linked_dates: [{
        dateFieldName: "poolspa_maintenance_addendum_textfield_12"
      }]
    }],
    display_attributes: {
      display_name: "Tenant 2 Signature",
      input_type: "signature",
      description: "Second tenant's signature (if applicable)",
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
    unique_id: "tenant_3_signature",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_13",
      linked_dates: [{
        dateFieldName: "poolspa_maintenance_addendum_textfield_14"
      }]
    }],
    display_attributes: {
      display_name: "Tenant 3 Signature",
      input_type: "signature",
      description: "Third tenant's signature (if applicable)",
      order: 14,

      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  {
    unique_id: "tenant_4_signature",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_15",
      linked_dates: [{
        dateFieldName: "poolspa_maintenance_addendum_textfield_16"
      }]
    }],
    display_attributes: {
      display_name: "Tenant 4 Signature",
      input_type: "signature",
      description: "Fourth tenant's signature (if applicable)",
      order: 15,

      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  // Property Management Section
  {
    unique_id: "property_manager_name",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_17"
    }],
    display_attributes: {
      display_name: "Property Manager Name",
      input_type: "text",
      description: "Name of property manager (if signed under property management agreement)",
      order: 16,

      block: "property_management",
      block_style: {
        title: "Property Management",
        description: "Property management information (if applicable)",
        icon: "briefcase",
        color_theme: "purple"
      },
      placeholder: "Property Manager Name",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "property_manager_printed_name",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_18"
    }],
    display_attributes: {
      display_name: "Property Manager Printed Name",
      input_type: "text",
      description: "Printed name of property manager",
      order: 17,

      block: "property_management",
      placeholder: "Printed Name",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "property_management_firm",
    pdf_attributes: [{
      formType: "poolspa_maintenance_addendum",
      formfield: "poolspa_maintenance_addendum_textfield_19"
    }],
    display_attributes: {
      display_name: "Property Management Firm",
      input_type: "text",
      description: "Name of property management firm",
      order: 18,

      block: "property_management",
      placeholder: "Firm Name",
      width: 12,
      value: {
        type: "manual"
      }
    }
  }
];