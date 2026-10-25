import { SchemaItem } from "../../../../types/realtor";

export const residentialCondominiumContractResaleSchema: SchemaItem[] = [
  // Header - Contract Title and Property Address
  {
    unique_id: "property_header_address",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_5"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Full address of the condominium property",
      order: 1,

      block: "Property Information",
      block_style: {
        title: "Property Information",
        description: "Details about the condominium unit",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, Unit 101",
      width: 8,
      value: {
        type: "manual"
      }
    }
  },

  // Party Information
  {
    unique_id: "seller_name",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_1"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_2"
    }],
    display_attributes: {
      display_name: "Seller Name(s)",
      input_type: "text",
      description: "Full legal name(s) of the seller(s)",
      order: 2,

      block: "Party Information",
      block_style: {
        title: "Party Information",
        description: "Buyer and Seller details",
        icon: "users",
        color_theme: "green"
      },
      placeholder: "John and Jane Doe",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "buyer_name",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_16"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_22"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_23"
    }],
    display_attributes: {
      display_name: "Buyer Name(s)",
      input_type: "text",
      description: "Full legal name(s) of the buyer(s)",
      order: 3,

      block: "Party Information",
      placeholder: "Robert and Mary Smith",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  // Property Details
  {
    unique_id: "unit_number",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_3"
    }],
    display_attributes: {
      display_name: "Unit Number",
      input_type: "text",
      description: "Condominium unit number",
      order: 4,

      block: "Property Information",
      placeholder: "101",
      width: 3,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "building_name",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_4"
    }],
    display_attributes: {
      display_name: "Building Name/Number",
      input_type: "text",
      description: "Name or number of the building",
      order: 5,

      block: "Property Information",
      placeholder: "Building A",
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "condominium_project_name",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_9"
    }],
    display_attributes: {
      display_name: "Condominium Project Name",
      input_type: "text",
      description: "Name of the condominium project",
      order: 6,

      block: "Property Information",
      placeholder: "Sunset Heights Condominiums",
      width: 5,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "property_city",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_6"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_7"
    }],
    display_attributes: {
      display_name: "City",
      input_type: "text",
      order: 7,

      block: "Property Information",
      placeholder: "Austin",
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "property_county",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_8"
    }],
    display_attributes: {
      display_name: "County",
      input_type: "text",
      order: 8,

      block: "Property Information",
      placeholder: "Travis",
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "condominium_address",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_10"
    }],
    display_attributes: {
      display_name: "Condominium Project Address",
      input_type: "text",
      description: "Street address of the condominium project",
      order: 9,

      block: "Property Information",
      placeholder: "123 Main Street",
      width: 8,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "parking_areas",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_11"
    }],
    display_attributes: {
      display_name: "Parking Areas",
      input_type: "text",
      description: "Parking areas assigned to the unit",
      order: 10,

      block: "Property Information",
      placeholder: "Space #25 and #26",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "storage_areas",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_12"
    }],
    display_attributes: {
      display_name: "Storage Areas",
      input_type: "text",
      description: "Storage areas assigned to the unit",
      order: 11,

      block: "Property Information",
      placeholder: "Storage Unit #101",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  // Condominium Documents
  {
    unique_id: "condominium_documents_delivery",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_1", "residential_condominium_contract_resale_checkbox_2"],
      linked_form_fields_radio: [
        { radioField: "residential_condominium_contract_resale_checkbox_1", displayName: "Buyer has received Documents" },
        { radioField: "residential_condominium_contract_resale_checkbox_2", displayName: "Buyer has not received Documents" }
      ]
    }],
    display_attributes: {
      display_name: "Condominium Documents Status",
      input_type: "radio",
      description: "Has buyer received a copy of the Condominium Documents?",
      order: 12,

      block: "Condominium Documents",
      block_style: {
        title: "Condominium Documents & Certificate",
        description: "Required condominium documentation",
        icon: "file-text",
        color_theme: "purple"
      },
      display_radio_options: ["Buyer has received Documents", "Buyer has not received Documents"],
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "resale_certificate_status",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_3", "residential_condominium_contract_resale_checkbox_4"],
      linked_form_fields_radio: [
        { radioField: "residential_condominium_contract_resale_checkbox_3", displayName: "Buyer has received Certificate" },
        { radioField: "residential_condominium_contract_resale_checkbox_4", displayName: "Buyer has not received Certificate" }
      ]
    }],
    display_attributes: {
      display_name: "Resale Certificate Status",
      input_type: "radio",
      description: "Has buyer received the Condominium Resale Certificate?",
      order: 13,

      block: "Condominium Documents",
      display_radio_options: ["Buyer has received Certificate", "Buyer has not received Certificate"],
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "documents_delivery_days",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_13"
    }],
    display_attributes: {
      display_name: "Documents Delivery Days",
      input_type: "text",
      description: "Number of days for seller to deliver documents",
      order: 14,

      block: "Condominium Documents",
      placeholder: "3",
      width: 3,
      visibleIf: [{
        unique_id: "condominium_documents_delivery",
        operation: "==",
        valueChecked: "Buyer has not received Documents"
      }],
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "certificate_delivery_days",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_14"
    }],
    display_attributes: {
      display_name: "Certificate Delivery Days",
      input_type: "text",
      description: "Number of days for seller to deliver certificate",
      order: 15,

      block: "Condominium Documents",
      placeholder: "3",
      width: 3,
      visibleIf: [{
        unique_id: "resale_certificate_status",
        operation: "==",
        valueChecked: "Buyer has not received Certificate"
      }],
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      value: {
        type: "manual"
      }
    }
  },

  // Financial Information
  {
    unique_id: "sales_price",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_24"
    }],
    display_attributes: {
      display_name: "Sales Price",
      input_type: "text",
      description: "Total sales price of the property",
      order: 16,

      block: "Financial Details",
      block_style: {
        title: "Financial Details",
        description: "Purchase price and payment information",
        icon: "dollar-sign",
        color_theme: "orange"
      },
      placeholder: "$250,000.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "cash_portion",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_25"
    }],
    display_attributes: {
      display_name: "Cash Portion of Sales Price",
      input_type: "text",
      description: "Amount to be paid in cash at closing",
      order: 17,

      block: "Financial Details",
      placeholder: "$50,000.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "financed_portion",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "4.B.residential_condominium_contract_resale_textfield_26"
    }],
    display_attributes: {
      display_name: "Sum of All Financing",
      input_type: "text",
      description: "Total amount being financed",
      order: 18,

      block: "Financial Details",
      placeholder: "$200,000.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  // Financing Options
  {
    unique_id: "financing_type",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "financing_type",
      linked_form_fields_checkbox: [
        { fromDatabase: "THIRD_PARTY", pdfAttribute: "residential_condominium_contract_resale_checkbox_8" },
        { fromDatabase: "LOAN_ASSUMPTION", pdfAttribute: "residential_condominium_contract_resale_checkbox_6" },
        { fromDatabase: "SELLER_FINANCING", pdfAttribute: "residential_condominium_contract_resale_checkbox_7" }
      ]
    }],
    display_attributes: {
      display_name: "Financing Type",
      input_type: "checkbox",
      description: "Select all applicable financing types",
      order: 19,

      block: "Financial Details",
      checkbox_options: {
        options: [
          { display_name: "Third Party Financing", databaseStored: "THIRD_PARTY" },
          { display_name: "Loan Assumption", databaseStored: "LOAN_ASSUMPTION" },
          { display_name: "Seller Financing", databaseStored: "SELLER_FINANCING" }
        ]
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Earnest Money
  {
    unique_id: "earnest_money_amount",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_15"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_18"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_21"
    }],
    display_attributes: {
      display_name: "Earnest Money",
      input_type: "text",
      description: "Amount of earnest money deposit",
      order: 20,

      block: "Financial Details",
      placeholder: "$5,000.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "additional_earnest_money",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_19"
    }],
    display_attributes: {
      display_name: "Additional Earnest Money",
      input_type: "text",
      description: "Additional earnest money to be deposited",
      order: 21,

      block: "Financial Details",
      placeholder: "$2,000.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "earnest_money_days",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_20"
    }],
    display_attributes: {
      display_name: "Days to Deposit Additional Earnest Money",
      input_type: "text",
      description: "Number of days after effective date to deposit additional earnest money",
      order: 22,

      block: "Financial Details",
      placeholder: "10",
      width: 4,
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "earnest_money_checkbox",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_checkbox_5"
    }],
    display_attributes: {
      display_name: "Earnest Money Notice",
      input_type: "checkbox",
      description: "Buyer acknowledges earnest money notice",
      order: 23,

      block: "Financial Details",
      checkbox_options: {
        options: [
          { display_name: "Buyer acknowledges receipt of earnest money notice", databaseStored: "ACKNOWLEDGED" }
        ]
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_agent",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_17"
    }],
    display_attributes: {
      display_name: "Escrow Agent",
      input_type: "text",
      description: "Name of escrow agent holding earnest money",
      order: 24,

      block: "Financial Details",
      placeholder: "ABC Title Company",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  // Title Policy and Survey
  {
    unique_id: "title_company",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_27"
    }],
    display_attributes: {
      display_name: "Title Company",
      input_type: "text",
      description: "Name of title company issuing title policy",
      order: 25,

      block: "Title and Survey",
      block_style: {
        title: "Title Policy and Survey",
        description: "Title insurance and survey information",
        icon: "shield",
        color_theme: "purple"
      },
      placeholder: "XYZ Title Company",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "title_policy_expense",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_9", "residential_condominium_contract_resale_checkbox_10"],
      linked_form_fields_radio: [
        { radioField: "residential_condominium_contract_resale_checkbox_9", displayName: "Seller's Expense" },
        { radioField: "residential_condominium_contract_resale_checkbox_10", displayName: "Buyer's Expense" }
      ]
    }],
    display_attributes: {
      display_name: "Title Policy Expense",
      input_type: "radio",
      description: "Who pays for the title policy?",
      order: 26,

      block: "Title and Survey",
      display_radio_options: ["Seller's Expense", "Buyer's Expense"],
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  // Closing Information
  {
    unique_id: "closing_date",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_28"
    }],
    display_attributes: {
      display_name: "Closing Date",
      input_type: "text",
      description: "Date of closing",
      order: 27,

      block: "Closing Information",
      block_style: {
        title: "Closing Information",
        description: "Closing date and location details",
        icon: "calendar",
        color_theme: "blue"
      },
      placeholder: "01/15/2024",
      width: 4,
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "possession_date",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_29"
    }],
    display_attributes: {
      display_name: "Possession Date",
      input_type: "text",
      description: "Date buyer takes possession",
      order: 28,

      block: "Closing Information",
      placeholder: "01/15/2024",
      width: 4,
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "possession_time",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_30"
    }],
    display_attributes: {
      display_name: "Possession Time",
      input_type: "text",
      description: "Time of possession",
      order: 29,

      block: "Closing Information",
      placeholder: "5:00 PM",
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  // Special Provisions
  {
    unique_id: "special_provisions",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_31",
      linked_form_fields_text: [
        "residential_condominium_contract_resale_textfield_32",
        "residential_condominium_contract_resale_textfield_33",
        "residential_condominium_contract_resale_textfield_34"
      ]
    }],
    display_attributes: {
      display_name: "Special Provisions",
      input_type: "text-area",
      description: "Additional terms and conditions agreed upon by both parties",
      order: 30,

      block: "Special Provisions",
      block_style: {
        title: "Special Provisions",
        description: "Additional terms and conditions",
        icon: "file-plus",
        color_theme: "purple"
      },
      placeholder: "Enter any special provisions here...",
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Lead-Based Paint Disclosure
  {
    unique_id: "lead_paint_disclosure",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_11", "residential_condominium_contract_resale_checkbox_12"],
      linked_form_fields_radio: [
        { radioField: "residential_condominium_contract_resale_checkbox_11", displayName: "Buyer has received Notice" },
        { radioField: "residential_condominium_contract_resale_checkbox_12", displayName: "Buyer has not received Notice" }
      ]
    }],
    display_attributes: {
      display_name: "Lead-Based Paint Disclosure",
      input_type: "radio",
      description: "For properties built before 1978",
      order: 31,

      block: "Property Disclosures",
      block_style: {
        title: "Property Disclosures",
        description: "Required property condition disclosures",
        icon: "alert-triangle",
        color_theme: "orange"
      },
      display_radio_options: ["Buyer has received Notice", "Buyer has not received Notice"],
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "lead_paint_waiver",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_checkbox_13"
    }],
    display_attributes: {
      display_name: "Lead Paint Assessment Waiver",
      input_type: "checkbox",
      description: "Buyer waives right to terminate based on lead assessment",
      order: 32,

      block: "Property Disclosures",
      checkbox_options: {
        options: [
          { display_name: "Buyer waives the right to terminate based on lead assessment", databaseStored: "WAIVED" }
        ]
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Property Condition
  {
    unique_id: "property_condition_acceptance",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_14", "residential_condominium_contract_resale_checkbox_15"],
      linked_form_fields_radio: [
        { radioField: "residential_condominium_contract_resale_checkbox_14", displayName: "Buyer accepts property As Is" },
        { radioField: "residential_condominium_contract_resale_checkbox_15", displayName: "Specific repairs required" }
      ]
    }],
    display_attributes: {
      display_name: "Property Condition",
      input_type: "radio",
      description: "Property condition acceptance terms",
      order: 33,

      block: "Property Disclosures",
      display_radio_options: ["Buyer accepts property As Is", "Specific repairs required"],
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "required_repairs",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_35",
      linked_form_fields_text: [
        "residential_condominium_contract_resale_textfield_36",
        "residential_condominium_contract_resale_textfield_37"
      ]
    }],
    display_attributes: {
      display_name: "Required Repairs",
      input_type: "text-area",
      description: "List specific repairs seller must complete",
      order: 34,

      block: "Property Disclosures",
      placeholder: "Describe required repairs...",
      width: 12,
      visibleIf: [{
        unique_id: "property_condition_acceptance",
        operation: "==",
        valueChecked: "Specific repairs required"
      }],
     
      value: {
        type: "manual"
      }
    }
  },

  // Seller's Expenses
  {
    unique_id: "sellers_expenses_limit",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_38"
    }],
    display_attributes: {
      display_name: "Seller's Expense Limit",
      input_type: "text",
      description: "Maximum amount seller will pay for repairs",
      order: 35,

      block: "Seller's Obligations",
      block_style: {
        title: "Seller's Obligations",
        description: "Seller's responsibilities and expense limits",
        icon: "user-check",
        color_theme: "green"
      },
      placeholder: "$1,500.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "treatment_completion_days",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_39"
    }],
    display_attributes: {
      display_name: "Days to Complete Treatment",
      input_type: "text",
      description: "Days prior to closing to complete wood destroying insect treatment",
      order: 36,

      block: "Seller's Obligations",
      placeholder: "5",
      width: 3,
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      value: {
        type: "manual"
      }
    }
  },

  // Private Transfer Fee
  {
    unique_id: "private_transfer_fee",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_16", "residential_condominium_contract_resale_checkbox_17"],
      linked_form_fields_radio: [
        { radioField: "residential_condominium_contract_resale_checkbox_16", displayName: "Seller's obligation" },
        { radioField: "residential_condominium_contract_resale_checkbox_17", displayName: "Buyer's obligation" }
      ]
    }],
    display_attributes: {
      display_name: "Private Transfer Fee",
      input_type: "radio",
      description: "Who pays private transfer fees?",
      order: 37,

      block: "Fees and Assessments",
      block_style: {
        title: "Fees and Assessments",
        description: "Transfer fees and condominium assessments",
        icon: "credit-card",
        color_theme: "orange"
      },
      display_radio_options: ["Seller's obligation", "Buyer's obligation"],
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Condominium Fees
  {
    unique_id: "regular_assessments_prorated",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_checkbox_18"
    }],
    display_attributes: {
      display_name: "Regular Assessments",
      input_type: "checkbox",
      description: "Regular periodic assessments",
      order: 38,

      block: "Fees and Assessments",
      checkbox_options: {
        options: [
          { display_name: "Regular assessments will be prorated through closing", databaseStored: "PRORATED" }
        ]
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "special_assessment_payment",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_19"],
      linked_form_fields_checkbox: [
        { fromDatabase: "AMOUNT", pdfAttribute: "residential_condominium_contract_resale_checkbox_18" },
        { fromDatabase: "PERCENTAGE", pdfAttribute: "residential_condominium_contract_resale_checkbox_19" }
      ]
    }],
    display_attributes: {
      display_name: "Special Assessment Payment",
      input_type: "checkbox",
      description: "How will buyer pay special assessments?",
      order: 39,

      block: "Fees and Assessments",
      checkbox_options: {
        options: [
          { 
            display_name: "Amount not to exceed", 
            databaseStored: "AMOUNT",
            linkedFields: ["special_assessment_amount"]
          },
          { 
            display_name: "Percentage of Sales Price", 
            databaseStored: "PERCENTAGE",
            linkedFields: ["special_assessment_percentage"]
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
    unique_id: "special_assessment_amount",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_40"
    }],
    display_attributes: {
      display_name: "Special Assessment Amount Limit",
      input_type: "text",
      description: "Maximum amount buyer will pay for special assessments",
      order: 40,

      block: "Fees and Assessments",
      placeholder: "$500.00",
      width: 4,
      visibleIf: [{
        unique_id: "special_assessment_payment",
        operation: "contains",
        valueChecked: "AMOUNT"
      }],
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "special_assessment_percentage",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_41"
    }],
    display_attributes: {
      display_name: "Special Assessment Percentage",
      input_type: "text",
      description: "Percentage of sales price for special assessments",
      order: 41,

      block: "Fees and Assessments",
      placeholder: "1%",
      width: 4,
      visibleIf: [{
        unique_id: "special_assessment_payment",
        operation: "contains",
        valueChecked: "PERCENTAGE"
      }],
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  // Residential Service Contracts
  {
    unique_id: "residential_service_contract",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_39", "residential_condominium_contract_resale_checkbox_40"],
      linked_form_fields_radio: [
        { radioField: "residential_condominium_contract_resale_checkbox_39", displayName: "Buyer waives purchase" },
        { radioField: "residential_condominium_contract_resale_checkbox_40", displayName: "Seller shall provide" }
      ]
    }],
    display_attributes: {
      display_name: "Residential Service Contract",
      input_type: "radio",
      description: "Home warranty contract",
      order: 42,

      block: "Additional Terms",
      block_style: {
        title: "Additional Terms",
        description: "Service contracts, brokers fees, and other terms",
        icon: "file-text",
        color_theme: "gray"
      },
      display_radio_options: ["Buyer waives purchase", "Seller shall provide"],
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "service_contract_amount",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_126"
    }],
    display_attributes: {
      display_name: "Service Contract Amount",
      input_type: "text",
      description: "Cost of residential service contract",
      order: 43,

      block: "Additional Terms",
      placeholder: "$500.00",
      width: 4,
      visibleIf: [{
        unique_id: "residential_service_contract",
        operation: "==",
        valueChecked: "Seller shall provide"
      }],
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  // Brokers' Fees
  {
    unique_id: "listing_broker_fee_percentage",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_127"
    }],
    display_attributes: {
      display_name: "Listing Broker Fee Percentage",
      input_type: "text",
      description: "Percentage of sales price for listing broker",
      order: 44,

      block: "Broker Information",
      block_style: {
        title: "Broker Information",
        description: "Real estate broker details and fees",
        icon: "briefcase",
        color_theme: "purple"
      },
      placeholder: "3%",
      width: 3,
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_broker_fee_percentage",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_128"
    }],
    display_attributes: {
      display_name: "Other Broker Fee Percentage",
      input_type: "text",
      description: "Percentage of sales price for other broker",
      order: 45,

      block: "Broker Information",
      placeholder: "3%",
      width: 3,
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_broker_name",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_129"
    }],
    display_attributes: {
      display_name: "Listing Broker",
      input_type: "text",
      description: "Name of listing broker",
      order: 46,

      block: "Broker Information",
      placeholder: "ABC Realty",
      width: 6,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_broker_name",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_130"
    }],
    display_attributes: {
      display_name: "Other Broker",
      input_type: "text",
      description: "Name of other broker",
      order: 47,

      block: "Broker Information",
      placeholder: "XYZ Realty",
      width: 6,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_associate_name",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_131"
    }],
    display_attributes: {
      display_name: "Listing Associate",
      input_type: "text",
      description: "Name of listing sales associate",
      order: 48,

      block: "Broker Information",
      placeholder: "John Smith",
      width: 6,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_associate_name",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_132"
    }],
    display_attributes: {
      display_name: "Other Associate",
      input_type: "text",
      description: "Name of other sales associate",
      order: 49,

      block: "Broker Information",
      placeholder: "Jane Doe",
      width: 6,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  // Broker Contact Information
  {
    unique_id: "listing_broker_license",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_133"
    }],
    display_attributes: {
      display_name: "Listing Broker License #",
      input_type: "text",
      description: "Listing broker's license number",
      order: 50,

      block: "Broker Information",
      placeholder: "123456",
      width: 3,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_associate_license",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_134"
    }],
    display_attributes: {
      display_name: "Listing Associate License #",
      input_type: "text",
      description: "Listing associate's license number",
      order: 51,

      block: "Broker Information",
      placeholder: "789012",
      width: 3,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_broker_license",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_135"
    }],
    display_attributes: {
      display_name: "Other Broker License #",
      input_type: "text",
      description: "Other broker's license number",
      order: 52,

      block: "Broker Information",
      placeholder: "345678",
      width: 3,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_associate_license",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_136"
    }],
    display_attributes: {
      display_name: "Other Associate License #",
      input_type: "text",
      description: "Other associate's license number",
      order: 53,

      block: "Broker Information",
      placeholder: "901234",
      width: 3,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_broker_phone",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_137"
    }],
    display_attributes: {
      display_name: "Listing Broker Phone",
      input_type: "text",
      description: "Phone number for listing broker",
      order: 54,

      block: "Broker Information",
      placeholder: "(555) 123-4567",
      width: 3,
      isCached: true,
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_broker_fax",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_138"
    }],
    display_attributes: {
      display_name: "Listing Broker Fax",
      input_type: "text",
      description: "Fax number for listing broker",
      order: 55,

      block: "Broker Information",
      placeholder: "(555) 123-4568",
      width: 3,
      isCached: true,
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_broker_phone",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_139"
    }],
    display_attributes: {
      display_name: "Other Broker Phone",
      input_type: "text",
      description: "Phone number for other broker",
      order: 56,

      block: "Broker Information",
      placeholder: "(555) 987-6543",
      width: 3,
      isCached: true,
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_broker_fax",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_140"
    }],
    display_attributes: {
      display_name: "Other Broker Fax",
      input_type: "text",
      description: "Fax number for other broker",
      order: 57,

      block: "Broker Information",
      placeholder: "(555) 987-6544",
      width: 3,
      isCached: true,
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_associate_email",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_153"
    }],
    display_attributes: {
      display_name: "Listing Associate Email",
      input_type: "text",
      description: "Email address for listing associate",
      order: 58,

      block: "Broker Information",
      placeholder: "agent@realty.com",
      width: 6,
      isCached: true,
      validation: {
        loopback: [{
          regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Must be a valid email address"
        }]
      },
      // special_input: {
      //   text: { email: true }
      // },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_associate_email",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_154"
    }],
    display_attributes: {
      display_name: "Other Associate Email",
      input_type: "text",
      description: "Email address for other associate",
      order: 59,

      block: "Broker Information",
      placeholder: "agent@realty.com",
      width: 6,
      isCached: true,
      validation: {
        loopback: [{
          regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Must be a valid email address"
        }]
      },
      // special_input: {
      //   text: { email: true }
      // },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_broker_address",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_155"
    }],
    display_attributes: {
      display_name: "Listing Broker Address",
      input_type: "text",
      description: "Address of listing broker",
      order: 60,

      block: "Broker Information",
      placeholder: "123 Business St, Suite 100",
      width: 6,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_broker_city",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_156"
    }],
    display_attributes: {
      display_name: "Listing Broker City",
      input_type: "text",
      order: 61,

      block: "Broker Information",
      placeholder: "Austin",
      width: 3,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_broker_state",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_157"
    }],
    display_attributes: {
      display_name: "State",
      input_type: "text",
      order: 62,

      block: "Broker Information",
      placeholder: "TX",
      width: 2,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "listing_broker_zip",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_158"
    }],
    display_attributes: {
      display_name: "ZIP",
      input_type: "text",
      order: 63,

      block: "Broker Information",
      placeholder: "78701",
      width: 3,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_broker_address",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_159"
    }],
    display_attributes: {
      display_name: "Other Broker Address",
      input_type: "text",
      description: "Address of other broker",
      order: 64,

      block: "Broker Information",
      placeholder: "456 Commerce Blvd",
      width: 6,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_broker_city",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_160"
    }],
    display_attributes: {
      display_name: "Other Broker City",
      input_type: "text",
      order: 65,

      block: "Broker Information",
      placeholder: "Houston",
      width: 3,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_broker_state",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_161"
    }],
    display_attributes: {
      display_name: "State",
      input_type: "text",
      order: 66,

      block: "Broker Information",
      placeholder: "TX",
      width: 2,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_broker_zip",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_162"
    }],
    display_attributes: {
      display_name: "ZIP",
      input_type: "text",
      order: 67,

      block: "Broker Information",
      placeholder: "77001",
      width: 3,
      isCached: true,
      value: {
        type: "manual"
      }
    }
  },

  // Option Fee Information
  {
    unique_id: "option_money",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_163"
    }],
    display_attributes: {
      display_name: "Option Money",
      input_type: "text",
      description: "Amount paid for option period",
      order: 68,

      block: "Option Period",
      block_style: {
        title: "Option Period",
        description: "Option fee and termination period",
        icon: "clock",
        color_theme: "purple"
      },
      placeholder: "$100.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "option_period_days",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_164"
    }],
    display_attributes: {
      display_name: "Option Period Days",
      input_type: "text",
      description: "Number of days for option period",
      order: 69,

      block: "Option Period",
      placeholder: "10",
      width: 3,
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "option_period_ends",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_165"
    }],
    display_attributes: {
      display_name: "Option Period Ends",
      input_type: "text",
      description: "Date and time option period ends",
      order: 70,

      block: "Option Period",
      placeholder: "01/25/2024 at 5:00 PM",
      width: 5,
      value: {
        type: "manual"
      }
    }
  },

  // Addenda
  {
    unique_id: "addenda_list",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "addenda",
      linked_form_fields_checkbox: [
        { fromDatabase: "THIRD_PARTY_FINANCING", pdfAttribute: "residential_condominium_contract_resale_checkbox_20" },
        { fromDatabase: "LOAN_ASSUMPTION", pdfAttribute: "residential_condominium_contract_resale_checkbox_21" },
        { fromDatabase: "SELLER_FINANCING", pdfAttribute: "residential_condominium_contract_resale_checkbox_22" },
        { fromDatabase: "BACK_UP_CONTRACT", pdfAttribute: "residential_condominium_contract_resale_checkbox_23" },
        { fromDatabase: "COASTAL_AREA", pdfAttribute: "residential_condominium_contract_resale_checkbox_24" },
        { fromDatabase: "ENVIRONMENTAL_ASSESSMENT", pdfAttribute: "residential_condominium_contract_resale_checkbox_25" },
        { fromDatabase: "SELLER_DISCLOSURE", pdfAttribute: "residential_condominium_contract_resale_checkbox_26" },
        { fromDatabase: "BUYER_TEMP_LEASE", pdfAttribute: "residential_condominium_contract_resale_checkbox_27" },
        { fromDatabase: "SELLER_TEMP_LEASE", pdfAttribute: "residential_condominium_contract_resale_checkbox_28" },
        { fromDatabase: "SHORT_SALE", pdfAttribute: "residential_condominium_contract_resale_checkbox_29" },
        { fromDatabase: "APPRAISAL_WAIVER", pdfAttribute: "residential_condominium_contract_resale_checkbox_30" },
        { fromDatabase: "LEAD_PAINT", pdfAttribute: "residential_condominium_contract_resale_checkbox_31" },
        { fromDatabase: "PROPERTY_SUBJECT_TO", pdfAttribute: "residential_condominium_contract_resale_checkbox_32" },
        { fromDatabase: "SALE_OF_OTHER_PROPERTY", pdfAttribute: "residential_condominium_contract_resale_checkbox_33" },
        { fromDatabase: "OIL_GAS_MINERALS", pdfAttribute: "residential_condominium_contract_resale_checkbox_34" },
        { fromDatabase: "PROPANE_GAS", pdfAttribute: "Addendum for Property in a Propane Gas.residential_condominium_contract_resale_checkbox_35" },
        { fromDatabase: "OTHER", pdfAttribute: "Other list.residential_condominium_contract_resale_checkbox_36" }
      ]
    }],
    display_attributes: {
      display_name: "Addenda to Contract",
      input_type: "checkbox",
      description: "Select all addenda that are part of this contract",
      order: 71,

      block: "Contract Addenda",
      block_style: {
        title: "Contract Addenda",
        description: "Additional documents attached to this contract",
        icon: "paperclip",
        color_theme: "gray"
      },
      checkbox_options: {
        options: [
          { display_name: "Third Party Financing Addendum", databaseStored: "THIRD_PARTY_FINANCING" },
          { display_name: "Loan Assumption Addendum", databaseStored: "LOAN_ASSUMPTION" },
          { display_name: "Seller Financing Addendum", databaseStored: "SELLER_FINANCING" },
          { display_name: "Addendum for Back-Up Contract", databaseStored: "BACK_UP_CONTRACT" },
          { display_name: "Addendum for Property in Coastal Area", databaseStored: "COASTAL_AREA" },
          { display_name: "Environmental Assessment Addendum", databaseStored: "ENVIRONMENTAL_ASSESSMENT" },
          { display_name: "Seller's Disclosure Notice", databaseStored: "SELLER_DISCLOSURE" },
          { display_name: "Buyer's Temporary Residential Lease", databaseStored: "BUYER_TEMP_LEASE" },
          { display_name: "Seller's Temporary Residential Lease", databaseStored: "SELLER_TEMP_LEASE" },
          { display_name: "Short Sale Addendum", databaseStored: "SHORT_SALE" },
          { display_name: "Waiver of Buyer's Right to Terminate", databaseStored: "APPRAISAL_WAIVER" },
          { display_name: "Addendum for Property Subject to Mandatory Membership", databaseStored: "PROPERTY_SUBJECT_TO" },
          { display_name: "Addendum for Sale of Other Property by Buyer", databaseStored: "SALE_OF_OTHER_PROPERTY" },
          { display_name: "Addendum for Reservation of Oil, Gas, and Other Minerals", databaseStored: "OIL_GAS_MINERALS" },
          { display_name: "Addendum for Property in a Propane Gas System Service Area", databaseStored: "PROPANE_GAS" },
          { display_name: "Other", databaseStored: "OTHER", linkedFields: ["other_addenda_list"] }
        ]
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "other_addenda_list",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_96",
      linked_form_fields_text: ["residential_condominium_contract_resale_textfield_97"]
    }],
    display_attributes: {
      display_name: "Other Addenda",
      input_type: "text-area",
      description: "List other addenda attached to this contract",
      order: 72,

      block: "Contract Addenda",
      placeholder: "List any other addenda...",
      width: 12,
      visibleIf: [{
        unique_id: "addenda_list",
        operation: "contains",
        valueChecked: "OTHER"
      }],
      value: {
        type: "manual"
      }
    }
  },

  // Mediation
  {
    unique_id: "mediation_election",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_41", "residential_condominium_contract_resale_checkbox_42"],
      linked_form_fields_radio: [
        { radioField: "residential_condominium_contract_resale_checkbox_41", displayName: "Parties agree to mediation" },
        { radioField: "residential_condominium_contract_resale_checkbox_42", displayName: "Parties do not agree to mediation" }
      ]
    }],
    display_attributes: {
      display_name: "Mediation Election",
      input_type: "radio",
      description: "Agreement to mediate disputes",
      order: 73,

      block: "Dispute Resolution",
      block_style: {
        title: "Dispute Resolution",
        description: "Mediation and attorney's fees",
        icon: "balance-scale",
        color_theme: "blue"
      },
      display_radio_options: ["Parties agree to mediation", "Parties do not agree to mediation"],
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Attorney's Fees
  {
    unique_id: "prevailing_party_fees",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: ["residential_condominium_contract_resale_checkbox_43", "residential_condominium_contract_resale_checkbox_44"],
      linked_form_fields_radio: [
        { radioField: "residential_condominium_contract_resale_checkbox_43", displayName: "Prevailing party may recover attorney's fees" },
        { radioField: "residential_condominium_contract_resale_checkbox_44", displayName: "Each party bears own attorney's fees" }
      ]
    }],
    display_attributes: {
      display_name: "Attorney's Fees",
      input_type: "radio",
      description: "Recovery of attorney's fees in legal proceedings",
      order: 74,

      block: "Dispute Resolution",
      display_radio_options: ["Prevailing party may recover attorney's fees", "Each party bears own attorney's fees"],
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Escrow Information
  {
    unique_id: "escrow_agent_info",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_166"
    }],
    display_attributes: {
      display_name: "Escrow Agent Name",
      input_type: "text",
      description: "Name of escrow/closing agent",
      order: 75,

      block: "Escrow Information",
      block_style: {
        title: "Escrow/Closing Information",
        description: "Escrow agent and closing details",
        icon: "building",
        color_theme: "purple"
      },
      placeholder: "ABC Title Company",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_agent_address",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_167"
    }],
    display_attributes: {
      display_name: "Escrow Agent Address",
      input_type: "text",
      order: 76,

      block: "Escrow Information",
      placeholder: "123 Title Street",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_agent_city",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_168"
    }],
    display_attributes: {
      display_name: "City",
      input_type: "text",
      order: 77,

      block: "Escrow Information",
      placeholder: "Austin",
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_agent_state",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_169"
    }],
    display_attributes: {
      display_name: "State",
      input_type: "text",
      order: 78,

      block: "Escrow Information",
      placeholder: "TX",
      width: 2,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_agent_zip",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_170"
    }],
    display_attributes: {
      display_name: "ZIP",
      input_type: "text",
      order: 79,

      block: "Escrow Information",
      placeholder: "78701",
      width: 3,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_agent_phone",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_171"
    }],
    display_attributes: {
      display_name: "Phone",
      input_type: "text",
      order: 80,

      block: "Escrow Information",
      placeholder: "(555) 123-4567",
      width: 3,
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_agent_fax",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_172"
    }],
    display_attributes: {
      display_name: "Fax",
      input_type: "text",
      order: 81,

      block: "Escrow Information",
      placeholder: "(555) 123-4568",
      width: 3,
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_agent_email",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_173"
    }],
    display_attributes: {
      display_name: "Email",
      input_type: "text",
      order: 82,

      block: "Escrow Information",
      placeholder: "escrow@titlecompany.com",
      width: 6,
      validation: {
        loopback: [{
          regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Must be a valid email address"
        }]
      },
      // special_input: {
      //   text: { email: true }
      // },
      value: {
        type: "manual"
      }
    }
  },

  // Effective Date
  {
    unique_id: "effective_date",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_174"
    }],
    display_attributes: {
      display_name: "Effective Date",
      input_type: "text",
      description: "Date contract becomes effective (filled by escrow agent)",
      order: 83,

      block: "Contract Execution",
      block_style: {
        title: "Contract Execution",
        description: "Signatures and effective date",
        icon: "pen-tool",
        color_theme: "gray"
      },
      placeholder: "01/10/2024",
      width: 4,
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  // Buyer Signatures
  {
    unique_id: "buyer_1_signature",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_175",
      linked_dates: [{ dateFieldName: "residential_condominium_contract_resale_textfield_176" }]
    }],
    display_attributes: {
      display_name: "Buyer 1 Signature",
      input_type: "signature",
      order: 84,

      block: "Buyer Signatures",
      block_style: {
        title: "Buyer Signatures",
        description: "All buyers must sign",
        icon: "pen-tool",
        color_theme: "green"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  {
    unique_id: "buyer_1_signature_date",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_176"
    }],
    display_attributes: {
      display_name: "Date",
      input_type: "text",
      order: 85,

      block: "Buyer Signatures",
      placeholder: "Auto-filled when signed",
      width: 3,
      value: {
        type: "manual"
      },
      isHidden: true
    }
  },

  {
    unique_id: "buyer_2_signature",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_177",
      linked_dates: [{ dateFieldName: "residential_condominium_contract_resale_textfield_178" }]
    }],
    display_attributes: {
      display_name: "Buyer 2 Signature",
      input_type: "signature",
      order: 86,

      block: "Buyer Signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  {
    unique_id: "buyer_2_signature_date",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_178"
    }],
    display_attributes: {
      display_name: "Date",
      input_type: "text",
      order: 87,

      block: "Buyer Signatures",
      placeholder: "Auto-filled when signed",
      width: 3,
      value: {
        type: "manual"
      },
      isHidden: true
    }
  },

  // Seller Signatures
  {
    unique_id: "seller_1_signature",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_179",
      linked_dates: [{ dateFieldName: "residential_condominium_contract_resale_textfield_180" }]
    }],
    display_attributes: {
      display_name: "Seller 1 Signature",
      input_type: "signature",
      order: 88,

      block: "Seller Signatures",
      block_style: {
        title: "Seller Signatures",
        description: "All sellers must sign",
        icon: "pen-tool",
        color_theme: "blue"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  {
    unique_id: "seller_1_signature_date",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_180"
    }],
    display_attributes: {
      display_name: "Date",
      input_type: "text",
      order: 89,

      block: "Seller Signatures",
      placeholder: "Auto-filled when signed",
      width: 3,
      value: {
        type: "manual"
      },
      isHidden: true
    }
  },

  {
    unique_id: "seller_2_signature",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_181",
      linked_dates: [{ dateFieldName: "residential_condominium_contract_resale_textfield_182" }]
    }],
    display_attributes: {
      display_name: "Seller 2 Signature",
      input_type: "signature",
      order: 90,

      block: "Seller Signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  {
    unique_id: "seller_2_signature_date",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_182"
    }],
    display_attributes: {
      display_name: "Date",
      input_type: "text",
      order: 91,

      block: "Seller Signatures",
      placeholder: "Auto-filled when signed",
      width: 3,
      value: {
        type: "manual"
      },
      isHidden: true
    }
  },

  // Page Initials
  {
    unique_id: "buyer_initials_signature",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "Initials pg.residential_condominium_contract_resale_textfield_98"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "Initials pg.residential_condominium_contract_resale_textfield_99"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "Initials pg.residential_condominium_contract_resale_textfield_100"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "Initlals pg.residential_condominium_contract_resale_textfield_101"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_102"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_103"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_104"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_105"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_106"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_107"
    }],
    display_attributes: {
      display_name: "Buyer Initials & Signature",
      input_type: "signature",
      description: "Buyer initials for all pages",
      order: 92,

      block: "Page Initials",
      block_style: {
        title: "Page Initials",
        description: "Initial each page of the contract",
        icon: "check-square",
        color_theme: "gray"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
    }
  },

  {
    unique_id: "seller_initials_signature",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_108"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_109"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_110"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_111"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_112"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_113"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_114"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_115"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_116"
    }, {
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_117"
    }],
    display_attributes: {
      display_name: "Seller Initials & Signature",
      input_type: "signature",
      description: "Seller initials for all pages",
      order: 93,

      block: "Page Initials",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
    }
  },

  // Receipt Fields
  {
    unique_id: "contract_receipt_date",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_183"
    }],
    display_attributes: {
      display_name: "Contract Receipt Date",
      input_type: "text",
      description: "Date contract and earnest money received",
      order: 94,

      block: "Contract Receipt",
      block_style: {
        title: "Contract Receipt",
        description: "Acknowledgment of contract and earnest money receipt",
        icon: "inbox",
        color_theme: "purple"
      },
      placeholder: "01/10/2024",
      width: 4,
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_officer_signature",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_184",
      linked_dates: [{ dateFieldName: "residential_condominium_contract_resale_textfield_185" }]
    }],
    display_attributes: {
      display_name: "Escrow Officer Signature",
      input_type: "signature",
      description: "Signature of escrow officer acknowledging receipt",
      order: 95,

      block: "Contract Receipt",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  {
    unique_id: "escrow_officer_date",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_185"
    }],
    display_attributes: {
      display_name: "Date",
      input_type: "text",
      order: 96,

      block: "Contract Receipt",
      placeholder: "Auto-filled when signed",
      width: 3,
      value: {
        type: "manual"
      },
      isHidden: true
    }
  },

  {
    unique_id: "escrow_officer_email_address",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_186"
    }],
    display_attributes: {
      display_name: "Escrow Officer Email",
      input_type: "text",
      order: 97,

      block: "Contract Receipt",
      placeholder: "escrow@company.com",
      width: 6,
      validation: {
        loopback: [{
          regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Must be a valid email address"
        }]
      },
      // special_input: {
      //   text: { email: true }
      // },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_officer_phone_number",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_187"
    }],
    display_attributes: {
      display_name: "Escrow Officer Phone",
      input_type: "text",
      order: 98,

      block: "Contract Receipt",
      placeholder: "(555) 123-4567",
      width: 3,
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "escrow_officer_fax_number",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_188"
    }],
    display_attributes: {
      display_name: "Escrow Officer Fax",
      input_type: "text",
      order: 99,

      block: "Contract Receipt",
      placeholder: "(555) 123-4568",
      width: 3,
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  // Additional Agreement Fields
  {
    unique_id: "additional_agreement_1",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_189",
      linked_form_fields_text: ["residential_condominium_contract_resale_textfield_190"]
    }],
    display_attributes: {
      display_name: "Additional Agreement Terms",
      input_type: "text-area",
      description: "Additional terms agreed upon by both parties",
      order: 100,

      block: "Additional Agreements",
      block_style: {
        title: "Additional Agreements",
        description: "Supplementary terms and agreements",
        icon: "file-plus",
        color_theme: "purple"
      },
      placeholder: "Enter additional agreement terms...",
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Remaining fields that need specific context analysis
  {
    unique_id: "hoa_fees",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_42"
    }],
    display_attributes: {
      display_name: "HOA Fees",
      input_type: "text",
      description: "Homeowners association fees",
      order: 101,

      block: "Fees and Assessments",
      placeholder: "$200.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "hoa_transfer_fees",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_43"
    }],
    display_attributes: {
      display_name: "HOA Transfer Fees",
      input_type: "text",
      description: "HOA transfer or capital contribution fees",
      order: 102,

      block: "Fees and Assessments",
      placeholder: "$150.00",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  // Information fields from remaining textfields
  {
    unique_id: "property_tax_id",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_44"
    }],
    display_attributes: {
      display_name: "Property Tax ID",
      input_type: "text",
      description: "Tax parcel identification number",
      order: 103,

      block: "Property Information",
      placeholder: "R123456",
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "mls_number",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_45"
    }],
    display_attributes: {
      display_name: "MLS Number",
      input_type: "text",
      description: "Multiple Listing Service number",
      order: 104,

      block: "Property Information",
      placeholder: "MLS123456",
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  // Additional text fields that may be for various purposes
  {
    unique_id: "additional_info_1",
    pdf_attributes: [{
      formType: "residential_condominium_contract_resale",
      formfield: "residential_condominium_contract_resale_textfield_46",
      linked_form_fields_text: [
        "residential_condominium_contract_resale_textfield_47",
        "residential_condominium_contract_resale_textfield_48",
        "residential_condominium_contract_resale_textfield_49",
        "residential_condominium_contract_resale_textfield_50"
      ]
    }],
    display_attributes: {
      display_name: "Additional Information",
      input_type: "text-area",
      description: "Any additional information or notes",
      order: 105,

      block: "Additional Information",
      block_style: {
        title: "Additional Information",
        description: "Other relevant details",
        icon: "info",
        color_theme: "gray"
      },
      placeholder: "Enter any additional information...",
      width: 12,
      value: {
        type: "manual"
      }
    }
  }
];