import { SchemaItem } from "../../../../types/realtor";

export const buyersTemporaryResidentialLeaseSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "property_address",
    pdf_attributes: [
      {
        formType: "buyers_temporary_residential_lease",
        formfield: "buyer's_temporary_residential_lease_textfield_3"
      },
      {
        formType: "buyers_temporary_residential_lease",
        formfield: "buyer's_temporary_residential_lease_textfield_22"
      }
    ],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Full address of the property being leased",
      order: 1,

      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Details about the leased property",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, City, State ZIP",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "property_address_continued",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_4"
    }],
    display_attributes: {
      display_name: "Property Address (continued)",
      input_type: "text",
      order: 2,
      block: "property_information",
      placeholder: "Additional address details if needed",
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Parties Block
  {
    unique_id: "landlord_name",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_1"
    }],
    display_attributes: {
      display_name: "Landlord Name",
      input_type: "text",
      description: "Full legal name of the landlord",
      order: 3,

      block: "parties",
      block_style: {
        title: "Parties to the Lease",
        description: "Landlord and tenant information",
        icon: "users",
        color_theme: "green"
      },
      placeholder: "John Doe",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "tenant_name",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_2"
    }],
    display_attributes: {
      display_name: "Tenant Name",
      input_type: "text",
      description: "Full legal name of the tenant",
      order: 4,

      block: "parties",
      placeholder: "Jane Smith",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // Lease Terms Block
  {
    unique_id: "lease_commencement_date",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_6"
    }],
    display_attributes: {
      display_name: "Lease Commencement Date",
      input_type: "text",
      description: "Date when the lease term begins",
      order: 5,

      block: "lease_terms",
      block_style: {
        title: "Lease Terms",
        description: "Term and rental information",
        icon: "calendar",
        color_theme: "purple"
      },
      placeholder: "MM/DD/YYYY",
      width: 6,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      isRequired: true
    }
  },
  {
    unique_id: "lease_term_days",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_5"
    }],
    display_attributes: {
      display_name: "Lease Term (Days)",
      input_type: "text",
      description: "Number of days for the lease term",
      order: 6,

      block: "lease_terms",
      placeholder: "30",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a whole number"
        }]
      },
      special_input: {
        text: { number: true }
      },
      isRequired: true
    }
  },
  {
    unique_id: "total_rental_amount",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_7"
    }],
    display_attributes: {
      display_name: "Total Rental Amount",
      input_type: "text",
      description: "Total rent for the entire lease term",
      order: 7,

      block: "lease_terms",
      placeholder: "$2,500.00",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      isRequired: true
    }
  },

  // Financial Block
  {
    unique_id: "security_deposit",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_8"
    }],
    display_attributes: {
      display_name: "Security Deposit",
      input_type: "text",
      description: "Security deposit amount",
      order: 8,

      block: "financial_details",
      block_style: {
        title: "Financial Details",
        description: "Deposit and payment information",
        icon: "dollar-sign",
        color_theme: "orange"
      },
      placeholder: "$1,000.00",
      width: 4,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      isRequired: true
    }
  },
  {
    unique_id: "tenant_hold_amount",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_23"
    }],
    display_attributes: {
      display_name: "Daily Hold-Over Rate",
      input_type: "text",
      description: "Daily rate if tenant holds over after termination",
      order: 9,

      block: "financial_details",
      placeholder: "$100.00",
      width: 4,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      }
    }
  },

  // Utilities Block
  {
    unique_id: "tenant_utilities",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_9"
    }],
    display_attributes: {
      display_name: "Utilities Paid by Tenant",
      input_type: "text",
      description: "List utilities tenant is responsible for",
      order: 10,

      block: "utilities_and_maintenance",
      block_style: {
        title: "Utilities & Maintenance",
        description: "Utility responsibilities and property maintenance",
        icon: "zap",
        color_theme: "blue"
      },
      placeholder: "Electric, Gas, Water",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "landlord_utilities",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_10"
    }],
    display_attributes: {
      display_name: "Utilities Paid by Landlord",
      input_type: "text",
      description: "List utilities landlord is responsible for",
      order: 11,

      block: "utilities_and_maintenance",
      placeholder: "Trash, HOA fees",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "allowed_pets",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_11"
    }],
    display_attributes: {
      display_name: "Allowed Pets",
      input_type: "text",
      description: "Description of pets allowed on property",
      order: 12,

      block: "utilities_and_maintenance",
      placeholder: "None / 1 small dog under 25 lbs",
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Special Provisions Block
  {
    unique_id: "special_provisions_1",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_12",
      linked_form_fields_text: [
        "buyer's_temporary_residential_lease_textfield_13",
        "buyer's_temporary_residential_lease_textfield_14",
        "buyer's_temporary_residential_lease_textfield_15",
        "buyer's_temporary_residential_lease_textfield_16",
        "buyer's_temporary_residential_lease_textfield_17",
        "buyer's_temporary_residential_lease_textfield_18",
        "buyer's_temporary_residential_lease_textfield_19"
      ]
    }],
    display_attributes: {
      display_name: "Special Provisions",
      input_type: "text-area",
      description: "Additional terms and conditions",
      order: 13,

      block: "special_provisions",
      block_style: {
        title: "Special Provisions",
        description: "Additional terms and conditions",
        icon: "file-text",
        color_theme: "gray"
      },
      placeholder: "Enter any special provisions or additional terms...",
      width: 12,
      value: {
        type: "manual"
      },
    }
  },

  // Contact Information Block - Landlord
  {
    unique_id: "landlord_contact_name",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_24"
    }],
    display_attributes: {
      display_name: "Landlord Contact Name",
      input_type: "text",
      order: 14,
      block: "landlord_contact",
      block_style: {
        title: "Landlord Contact Information",
        description: "How to reach the landlord",
        icon: "phone",
        color_theme: "green"
      },
      placeholder: "John Doe",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "landlord_address_1",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_26",
      linked_form_fields_text: ["buyer's_temporary_residential_lease_textfield_28"]
    }],
    display_attributes: {
      display_name: "Landlord Address",
      input_type: "text",
      order: 15,
      block: "landlord_contact",
      placeholder: "123 Main Street, City, State ZIP",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "landlord_phone",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_30"
    }],
    display_attributes: {
      display_name: "Phone",
      input_type: "text",
      order: 16,
      block: "landlord_contact",
      placeholder: "(555) 123-4567",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      }
    }
  },
  {
    unique_id: "landlord_phone_2",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_31"
    }],
    display_attributes: {
      display_name: "Phone 2",
      input_type: "text",
      order: 17,
      block: "landlord_contact",
      placeholder: "(555) 987-6543",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      }
    }
  },
  {
    unique_id: "landlord_fax",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_34"
    }],
    display_attributes: {
      display_name: "Facsimile",
      input_type: "text",
      order: 18,
      block: "landlord_contact",
      placeholder: "(555) 123-4568",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      }
    }
  },
  {
    unique_id: "landlord_fax_2",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_35"
    }],
    display_attributes: {
      display_name: "Facsimile 2",
      input_type: "text",
      order: 19,
      block: "landlord_contact",
      placeholder: "(555) 987-6544",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      }
    }
  },
  {
    unique_id: "landlord_email",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_38"
    }],
    display_attributes: {
      display_name: "Email",
      input_type: "text",
      order: 20,
      block: "landlord_contact",
      placeholder: "landlord@email.com",
      width: 6,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Must be a valid email address"
        }]
      },
      special_input: {
        text: {}
      }
    }
  },

  // Contact Information Block - Tenant
  {
    unique_id: "tenant_contact_name",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_25"
    }],
    display_attributes: {
      display_name: "Tenant Contact Name",
      input_type: "text",
      order: 21,
      block: "tenant_contact",
      block_style: {
        title: "Tenant Contact Information",
        description: "How to reach the tenant",
        icon: "phone",
        color_theme: "green"
      },
      placeholder: "Jane Smith",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "tenant_address_1",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_27",
      linked_form_fields_text: ["buyer's_temporary_residential_lease_textfield_29"]
    }],
    display_attributes: {
      display_name: "Tenant Address",
      input_type: "text",
      order: 22,
      block: "tenant_contact",
      placeholder: "456 Oak Avenue, City, State ZIP",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "tenant_phone",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_32"
    }],
    display_attributes: {
      display_name: "Phone",
      input_type: "text",
      order: 23,
      block: "tenant_contact",
      placeholder: "(555) 234-5678",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      }
    }
  },
  {
    unique_id: "tenant_phone_2",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_33"
    }],
    display_attributes: {
      display_name: "Phone 2",
      input_type: "text",
      order: 24,
      block: "tenant_contact",
      placeholder: "(555) 876-5432",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      }
    }
  },
  {
    unique_id: "tenant_fax",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_36"
    }],
    display_attributes: {
      display_name: "Facsimile",
      input_type: "text",
      order: 25,
      block: "tenant_contact",
      placeholder: "(555) 234-5679",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      }
    }
  },
  {
    unique_id: "tenant_fax_2",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_37"
    }],
    display_attributes: {
      display_name: "Facsimile 2",
      input_type: "text",
      order: 26,
      block: "tenant_contact",
      placeholder: "(555) 876-5433",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      }
    }
  },
  {
    unique_id: "tenant_email",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_39"
    }],
    display_attributes: {
      display_name: "Email",
      input_type: "text",
      order: 27,
      block: "tenant_contact",
      placeholder: "tenant@email.com",
      width: 6,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Must be a valid email address"
        }]
      },
      special_input: {
        text: {}
      }
    }
  },

  // Signatures Block
  {
    unique_id: "landlord_signature",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_40",
      linked_dates: [{
        dateFieldName: "buyer's_temporary_residential_lease_textfield_20"
      }]
    }],
    display_attributes: {
      display_name: "Landlord Signature",
      input_type: "signature",
      order: 28,
      block: "signatures",
      block_style: {
        title: "Signatures",
        description: "Legal signatures for this lease agreement",
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
    unique_id: "tenant_signature",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_41",
      linked_dates: [{
        dateFieldName: "buyer's_temporary_residential_lease_textfield_21"
      }]
    }],
    display_attributes: {
      display_name: "Tenant Signature",
      input_type: "signature",
      order: 29,
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
    unique_id: "landlord_signature_2",
    pdf_attributes: [{
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_42"
    }],
    display_attributes: {
      display_name: "Landlord Signature 2",
      input_type: "signature",
      order: 30,
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
      formType: "buyers_temporary_residential_lease",
      formfield: "buyer's_temporary_residential_lease_textfield_43"
    }],
    display_attributes: {
      display_name: "Tenant Signature 2",
      input_type: "signature",
      order: 31,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  }
];