import { SchemaItem } from "../../../../types/realtor";

export const unimprovedPropertyContractSchema: SchemaItem[] = [
  // ===== PARTIES SECTION =====
  {
    unique_id: "buyer_name",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_1"
    }],
    display_attributes: {
      display_name: "Buyer Name",
      input_type: "text",
      order: 1,
      block: "parties_information",
      block_style: {
        title: "Parties Information",
        description: "Buyer and seller details",
        icon: "user",
        color_theme: "green"
      },
      width: 6,
      placeholder: "John and Jane Doe",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "seller_name",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_2"
    }],
    display_attributes: {
      display_name: "Seller Name",
      input_type: "text",
      order: 2,
      block: "parties_information",
      width: 6,
      placeholder: "Property Owner LLC",
      value: { type: "manual" }
    }
  },

  // ===== PROPERTY INFORMATION =====
  {
    unique_id: "lot_number",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_3"
    }],
    display_attributes: {
      display_name: "Lot Number",
      input_type: "text",
      order: 3,
      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Details about the unimproved property",
        icon: "home",
        color_theme: "blue"
      },
      width: 3,
      placeholder: "15",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "block_number",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_4"
    }],
    display_attributes: {
      display_name: "Block Number",
      input_type: "text",
      order: 4,
      block: "property_information",
      width: 3,
      placeholder: "7",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "addition_name",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_5"
    }],
    display_attributes: {
      display_name: "Addition",
      input_type: "text",
      order: 5,
      block: "property_information",
      width: 6,
      placeholder: "Sunset Hills Addition",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "property_city",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_6"
    }],
    display_attributes: {
      display_name: "City",
      input_type: "text",
      order: 6,
      block: "property_information",
      width: 4,
      placeholder: "Austin",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "property_county",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_7"
    }],
    display_attributes: {
      display_name: "County",
      input_type: "text",
      order: 7,
      block: "property_information",
      width: 4,
      placeholder: "Travis",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_8"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      order: 8,
      block: "property_information",
      width: 8,
      placeholder: "123 Main Street, Austin, TX 78701",
      value: { type: "manual" }
    }
  },

  // ===== SALES PRICE AND FINANCING =====
  {
    unique_id: "cash_portion",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_9"
    }],
    display_attributes: {
      display_name: "Cash Portion of Sales Price",
      input_type: "text",
      order: 9,
      block: "sales_price_financing",
      block_style: {
        title: "Sales Price and Financing",
        description: "Purchase price and financing details",
        icon: "dollar-sign",
        color_theme: "orange"
      },
      width: 4,
      placeholder: "$0.00",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "financing_type",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_checkbox_1",
      linked_form_fields_checkbox: [
        { fromDatabase: "THIRD_PARTY", pdfAttribute: "unimproved_property_contract_checkbox_1" },
        { fromDatabase: "LOAN_ASSUMPTION", pdfAttribute: "unimproved_property_contract_checkbox_2" },
        { fromDatabase: "SELLER_FINANCING", pdfAttribute: "unimproved_property_contract_checkbox_3" }
      ]
    }],
    display_attributes: {
      display_name: "Financing Type",
      input_type: "checkbox",
      order: 10,
      block: "sales_price_financing",
      width: 8,
      checkbox_options: {
        options: [
          { display_name: "Third Party Financing", databaseStored: "THIRD_PARTY" },
          { display_name: "Loan Assumption", databaseStored: "LOAN_ASSUMPTION" },
          { display_name: "Seller Financing", databaseStored: "SELLER_FINANCING" }
        ]
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "financing_amount",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_10"
    }],
    display_attributes: {
      display_name: "Financing Amount",
      input_type: "text",
      order: 11,
      block: "sales_price_financing",
      width: 4,
      placeholder: "$0.00",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "sales_price",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_11"
    }],
    display_attributes: {
      display_name: "Sales Price (Total)",
      input_type: "text",
      order: 12,
      block: "sales_price_financing",
      width: 4,
      placeholder: "$0.00",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "price_adjustment_survey",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: ["unimproved_property_contract_checkbox_4", "unimproved_property_contract_checkbox_5"]
    }],
    display_attributes: {
      display_name: "Sales Price Adjustment Based on Survey",
      input_type: "radio",
      order: 13,
      block: "sales_price_financing",
      width: 6,
      display_radio_options: ["Will be adjusted", "Will not be adjusted"],
      value: { type: "manual" }
    }
  },
  {
    unique_id: "survey_acreage_variance",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_12"
    }],
    display_attributes: {
      display_name: "Acreage Variance Threshold",
      input_type: "text",
      order: 14,
      block: "sales_price_financing",
      width: 3,
      placeholder: "5%",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "price_per_acre",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_14"
    }],
    display_attributes: {
      display_name: "Price Per Acre",
      input_type: "text",
      order: 15,
      block: "sales_price_financing",
      width: 3,
      placeholder: "$10,000",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: { type: "manual" }
    }
  },

  // ===== EARNEST MONEY & OPTION =====
  {
    unique_id: "earnest_money_amount",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_17"
    }],
    display_attributes: {
      display_name: "Earnest Money Amount",
      input_type: "text",
      order: 16,
      block: "earnest_money_option",
      block_style: {
        title: "Earnest Money & Option Fee",
        description: "Deposits and option period details",
        icon: "file-text",
        color_theme: "purple"
      },
      width: 4,
      placeholder: "$5,000.00",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "escrow_agent_name",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_18"
    }],
    display_attributes: {
      display_name: "Escrow Agent",
      input_type: "text",
      order: 17,
      block: "earnest_money_option",
      width: 6,
      placeholder: "ABC Title Company",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "escrow_agent_address",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_19"
    }],
    display_attributes: {
      display_name: "Escrow Agent Address",
      input_type: "text",
      order: 18,
      block: "earnest_money_option",
      width: 8,
      placeholder: "456 Title Street, Austin, TX 78701",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "option_fee_amount",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_20"
    }],
    display_attributes: {
      display_name: "Option Fee",
      input_type: "text",
      order: 19,
      block: "earnest_money_option",
      width: 4,
      placeholder: "$500.00",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "additional_earnest_money",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_21"
    }],
    display_attributes: {
      display_name: "Additional Earnest Money",
      input_type: "text",
      order: 20,
      block: "earnest_money_option",
      width: 4,
      placeholder: "$0.00",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "additional_earnest_money_days",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_22"
    }],
    display_attributes: {
      display_name: "Days to Deliver Additional Earnest Money",
      input_type: "text",
      order: 21,
      block: "earnest_money_option",
      width: 3,
      placeholder: "10",
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      special_input: {
        text: { number: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "option_period_days",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_24"
    }],
    display_attributes: {
      display_name: "Option Period (Days)",
      input_type: "text",
      order: 22,
      block: "earnest_money_option",
      width: 3,
      placeholder: "10",
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      special_input: {
        text: { number: true }
      },
      value: { type: "manual" }
    }
  },

  // ===== TITLE POLICY & SURVEY =====
  {
    unique_id: "title_company_name",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_27"
    }],
    display_attributes: {
      display_name: "Title Company",
      input_type: "text",
      order: 23,
      block: "title_survey",
      block_style: {
        title: "Title Policy & Survey",
        description: "Title insurance and survey requirements",
        icon: "shield",
        color_theme: "blue"
      },
      width: 6,
      placeholder: "Texas Title Company",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "title_commitment_days",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_28"
    }],
    display_attributes: {
      display_name: "Days to Deliver Title Commitment",
      input_type: "text",
      order: 24,
      block: "title_survey",
      width: 3,
      placeholder: "20",
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      special_input: {
        text: { number: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "survey_days",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_30"
    }],
    display_attributes: {
      display_name: "Days to Deliver Survey",
      input_type: "text",
      order: 25,
      block: "title_survey",
      width: 3,
      placeholder: "10",
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      special_input: {
        text: { number: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "survey_expense_paid_by",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: ["unimproved_property_contract_checkbox_13", "unimproved_property_contract_checkbox_14"]
    }],
    display_attributes: {
      display_name: "Survey Expense Paid By",
      input_type: "radio",
      order: 26,
      block: "title_survey",
      width: 6,
      display_radio_options: ["Seller", "Buyer"],
      value: { type: "manual" }
    }
  },

  // ===== PROPERTY CONDITION =====
  {
    unique_id: "property_inspections",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_checkbox_15",
      linked_form_fields_checkbox: [
        { fromDatabase: "ENVIRONMENTAL_ASSESSMENT", pdfAttribute: "unimproved_property_contract_checkbox_15" },
        { fromDatabase: "SOIL_TEST", pdfAttribute: "unimproved_property_contract_checkbox_16" },
        { fromDatabase: "PERCOLATION_TEST", pdfAttribute: "unimproved_property_contract_checkbox_17" },
        { fromDatabase: "UTILITIES_AVAILABILITY", pdfAttribute: "unimproved_property_contract_checkbox_18" },
        { fromDatabase: "OTHER_INSPECTIONS", pdfAttribute: "unimproved_property_contract_checkbox_19" }
      ]
    }],
    display_attributes: {
      display_name: "Property Inspections",
      input_type: "checkbox",
      order: 27,
      block: "property_condition",
      block_style: {
        title: "Property Condition & Inspections",
        description: "Property assessments and environmental matters",
        icon: "check-square",
        color_theme: "green"
      },
      width: 12,
      checkbox_options: {
        options: [
          { display_name: "Environmental Assessment", databaseStored: "ENVIRONMENTAL_ASSESSMENT" },
          { display_name: "Soil Test", databaseStored: "SOIL_TEST" },
          { display_name: "Percolation Test", databaseStored: "PERCOLATION_TEST" },
          { display_name: "Utilities Availability", databaseStored: "UTILITIES_AVAILABILITY" },
          { display_name: "Other Inspections", databaseStored: "OTHER_INSPECTIONS", linkedFields: ["other_inspections_description"] }
        ]
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "other_inspections_description",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_30"
    }],
    display_attributes: {
      display_name: "Other Inspections Description",
      input_type: "text",
      order: 28,
      block: "property_condition",
      width: 8,
      placeholder: "Describe other inspections...",
      visibleIf: [{
        unique_id: "property_inspections",
        operation: "contains",
        valueChecked: "OTHER_INSPECTIONS"
      }],
      value: { type: "manual" }
    }
  },
  {
    unique_id: "inspection_period_days",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_31"
    }],
    display_attributes: {
      display_name: "Inspection Period (Days)",
      input_type: "text",
      order: 29,
      block: "property_condition",
      width: 3,
      placeholder: "10",
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      special_input: {
        text: { number: true }
      },
      value: { type: "manual" }
    }
  },

  // ===== MINERAL RIGHTS =====
  {
    unique_id: "mineral_rights_reserved",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: ["unimproved_property_contract_checkbox_9", "unimproved_property_contract_checkbox_10"]
    }],
    display_attributes: {
      display_name: "Seller Party to Natural Resource Lease",
      input_type: "radio",
      order: 30,
      block: "mineral_rights",
      block_style: {
        title: "Mineral Rights & Natural Resources",
        description: "Oil, gas, and mineral rights information",
        icon: "layers",
        color_theme: "orange"
      },
      width: 6,
      display_radio_options: ["Yes", "No"],
      value: { type: "manual" }
    }
  },
  {
    unique_id: "natural_resource_lease_days",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_15"
    }],
    display_attributes: {
      display_name: "Days to Deliver Natural Resource Leases",
      input_type: "text",
      order: 31,
      block: "mineral_rights",
      width: 3,
      placeholder: "10",
      visibleIf: [{
        unique_id: "mineral_rights_reserved",
        operation: "==",
        valueChecked: "Yes"
      }],
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      special_input: {
        text: { number: true }
      },
      value: { type: "manual" }
    }
  },

  // ===== CLOSING INFORMATION =====
  {
    unique_id: "closing_date",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_38"
    }],
    display_attributes: {
      display_name: "Closing Date",
      input_type: "text",
      order: 32,
      block: "closing_information",
      block_style: {
        title: "Closing Information",
        description: "Closing date and location details",
        icon: "calendar",
        color_theme: "purple"
      },
      width: 4,
      placeholder: "MM/DD/YYYY",
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "closing_location",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_39"
    }],
    display_attributes: {
      display_name: "Closing Location",
      input_type: "text",
      order: 33,
      block: "closing_information",
      width: 8,
      placeholder: "Title company office address",
      value: { type: "manual" }
    }
  },

  // ===== POSSESSION =====
  {
    unique_id: "possession_date",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: ["unimproved_property_contract_checkbox_23", "unimproved_property_contract_checkbox_24", "unimproved_property_contract_checkbox_25"]
    }],
    display_attributes: {
      display_name: "Possession",
      input_type: "radio",
      order: 34,
      block: "possession",
      block_style: {
        title: "Possession",
        description: "When buyer takes possession",
        icon: "key",
        color_theme: "green"
      },
      width: 8,
      display_radio_options: ["Upon closing and funding", "According to temporary lease", "Other (specify)"],
      value: { type: "manual" }
    }
  },
  {
    unique_id: "possession_other_date",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_40"
    }],
    display_attributes: {
      display_name: "Other Possession Date",
      input_type: "text",
      order: 35,
      block: "possession",
      width: 4,
      placeholder: "MM/DD/YYYY",
      visibleIf: [{
        unique_id: "possession_date",
        operation: "==",
        valueChecked: "Other (specify)"
      }],
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: { type: "manual" }
    }
  },

  // ===== SPECIAL PROVISIONS =====
  {
    unique_id: "special_provisions",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_45",
      linked_form_fields_text: [
        "unimproved_property_contract_textfield_46",
        "unimproved_property_contract_textfield_47"
      ]
    }],
    display_attributes: {
      display_name: "Special Provisions",
      input_type: "text-area",
      order: 36,
      block: "special_provisions",
      block_style: {
        title: "Special Provisions",
        description: "Additional terms and conditions",
        icon: "file-text",
        color_theme: "gray"
      },
      width: 12,
      placeholder: "Enter any special provisions or additional agreements...",
      value: { type: "manual" }
    }
  },

  // ===== FARM AND RANCH =====
  {
    unique_id: "rollback_taxes_paid_by",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: ["unimproved_property_contract_checkbox_28", "unimproved_property_contract_checkbox_29"]
    }],
    display_attributes: {
      display_name: "Rollback Taxes Paid By",
      input_type: "radio",
      order: 37,
      block: "farm_ranch",
      block_style: {
        title: "Farm & Ranch",
        description: "Agricultural and rollback tax provisions",
        icon: "sun",
        color_theme: "green"
      },
      width: 6,
      display_radio_options: ["Seller", "Buyer"],
      value: { type: "manual" }
    }
  },
  {
    unique_id: "property_in_agricultural_district",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: ["Texas Agricultural Development District For additional information contact the Texas.unimproved_property_contract_checkbox_24", "unimproved_property_contract_checkbox_25"]
    }],
    display_attributes: {
      display_name: "Property in Texas Agricultural Development District",
      input_type: "radio",
      order: 38,
      block: "farm_ranch",
      width: 6,
      display_radio_options: ["Yes", "No"],
      value: { type: "manual" }
    }
  },

  // ===== ENVIRONMENTAL MATTERS =====
  {
    unique_id: "environmental_hazards_known",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: ["unimproved_property_contract_checkbox_33", "unimproved_property_contract_checkbox_34"]
    }],
    display_attributes: {
      display_name: "Seller Aware of Environmental Hazards",
      input_type: "radio",
      order: 39,
      block: "environmental",
      block_style: {
        title: "Environmental Matters",
        description: "Environmental hazards and restrictions",
        icon: "alert-triangle",
        color_theme: "orange"
      },
      width: 6,
      display_radio_options: ["Yes", "No"],
      value: { type: "manual" }
    }
  },
  {
    unique_id: "environmental_hazards_description",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_50"
    }],
    display_attributes: {
      display_name: "Environmental Hazards Description",
      input_type: "text-area",
      order: 40,
      block: "environmental",
      width: 12,
      placeholder: "Describe any known environmental hazards...",
      visibleIf: [{
        unique_id: "environmental_hazards_known",
        operation: "==",
        valueChecked: "Yes"
      }],
      value: { type: "manual" }
    }
  },

  // ===== SELLER DISCLOSURES =====
  {
    unique_id: "seller_disclosure_notice",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: ["unimproved_property_contract_checkbox_47", "unimproved_property_contract_checkbox_48"]
    }],
    display_attributes: {
      display_name: "Seller's Disclosure Notice Required",
      input_type: "radio",
      order: 41,
      block: "seller_disclosures",
      block_style: {
        title: "Seller Disclosures",
        description: "Required disclosures and notices",
        icon: "info",
        color_theme: "blue"
      },
      width: 6,
      display_radio_options: ["Yes", "No"],
      value: { type: "manual" }
    }
  },

  // ===== ADDENDA =====
  {
    unique_id: "addenda_attached",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_checkbox_49",
      linked_form_fields_checkbox: [
        { fromDatabase: "ADDENDUM_CONCERNING_ROW", pdfAttribute: "unimproved_property_contract_checkbox_49" },
        { fromDatabase: "ENVIRONMENTAL_ASSESSMENT", pdfAttribute: "unimproved_property_contract_checkbox_50" },
        { fromDatabase: "PROPERTY_IN_PROPANE_AREA", pdfAttribute: "unimproved_property_contract_checkbox_51" },
        { fromDatabase: "SELLER_FINANCING", pdfAttribute: "unimproved_property_contract_checkbox_52" },
        { fromDatabase: "THIRD_PARTY_FINANCING", pdfAttribute: "unimproved_property_contract_checkbox_53" },
        { fromDatabase: "LOAN_ASSUMPTION", pdfAttribute: "unimproved_property_contract_checkbox_54" },
        { fromDatabase: "PROPERTY_OWNERS_ASSOCIATION", pdfAttribute: "unimproved_property_contract_checkbox_55" },
        { fromDatabase: "OTHER_ADDENDA", pdfAttribute: "unimproved_property_contract_checkbox_56" }
      ]
    }],
    display_attributes: {
      display_name: "Addenda",
      input_type: "checkbox",
      order: 42,
      block: "addenda",
      block_style: {
        title: "Addenda",
        description: "Additional agreements and addenda",
        icon: "paperclip",
        color_theme: "purple"
      },
      width: 12,
      checkbox_options: {
        options: [
          { display_name: "Addendum Concerning Right of Way", databaseStored: "ADDENDUM_CONCERNING_ROW" },
          { display_name: "Environmental Assessment Addendum", databaseStored: "ENVIRONMENTAL_ASSESSMENT" },
          { display_name: "Property Located in Propane Gas Area", databaseStored: "PROPERTY_IN_PROPANE_AREA" },
          { display_name: "Seller Financing Addendum", databaseStored: "SELLER_FINANCING" },
          { display_name: "Third Party Financing Addendum", databaseStored: "THIRD_PARTY_FINANCING" },
          { display_name: "Loan Assumption Addendum", databaseStored: "LOAN_ASSUMPTION" },
          { display_name: "Property Owners Association Addendum", databaseStored: "PROPERTY_OWNERS_ASSOCIATION" },
          { display_name: "Other", databaseStored: "OTHER_ADDENDA", linkedFields: ["other_addenda_description"] }
        ]
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "other_addenda_description",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_90"
    }],
    display_attributes: {
      display_name: "Other Addenda",
      input_type: "text",
      order: 43,
      block: "addenda",
      width: 8,
      placeholder: "List other addenda...",
      visibleIf: [{
        unique_id: "addenda_attached",
        operation: "contains",
        valueChecked: "OTHER_ADDENDA"
      }],
      value: { type: "manual" }
    }
  },

  // ===== AGREEMENT OF PARTIES =====
  {
    unique_id: "effective_date",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_64"
    }],
    display_attributes: {
      display_name: "Effective Date",
      input_type: "text",
      order: 44,
      block: "agreement_parties",
      block_style: {
        title: "Agreement of Parties",
        description: "Execution and effective date",
        icon: "check-circle",
        color_theme: "green"
      },
      width: 4,
      placeholder: "MM/DD/YYYY",
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: { type: "manual" }
    }
  },

  // ===== EXECUTION SIGNATURES =====
  {
    unique_id: "buyer_1_signature",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_65",
      linked_dates: [{ dateFieldName: "unimproved_property_contract_textfield_66" }]
    }],
    display_attributes: {
      display_name: "Buyer 1 Signature",
      input_type: "signature",
      order: 45,
      block: "execution_signatures",
      block_style: {
        title: "Execution",
        description: "Signatures and dates",
        icon: "pen-tool",
        color_theme: "gray"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },
  {
    unique_id: "buyer_2_signature",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_67",
      linked_dates: [{ dateFieldName: "unimproved_property_contract_textfield_68" }]
    }],
    display_attributes: {
      display_name: "Buyer 2 Signature",
      input_type: "signature",
      order: 46,
      block: "execution_signatures",
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
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_69",
      linked_dates: [{ dateFieldName: "unimproved_property_contract_textfield_70" }]
    }],
    display_attributes: {
      display_name: "Seller 1 Signature",
      input_type: "signature",
      order: 47,
      block: "execution_signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },
  {
    unique_id: "seller_2_signature",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_71",
      linked_dates: [{ dateFieldName: "unimproved_property_contract_textfield_72" }]
    }],
    display_attributes: {
      display_name: "Seller 2 Signature",
      input_type: "signature",
      order: 48,
      block: "execution_signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  // ===== CONTRACT AND EARNEST MONEY RECEIPT =====
  {
    unique_id: "contract_receipt_date",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_74"
    }],
    display_attributes: {
      display_name: "Contract Receipt Date",
      input_type: "text",
      order: 49,
      block: "contract_earnest_money_receipt",
      block_style: {
        title: "Contract and Earnest Money Receipt",
        description: "Receipt acknowledgment by escrow agent",
        icon: "file-check",
        color_theme: "blue"
      },
      width: 4,
      placeholder: "MM/DD/YYYY",
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "escrow_agent_signature",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_75"
    }],
    display_attributes: {
      display_name: "Escrow Agent Signature",
      input_type: "signature",
      order: 50,
      block: "contract_earnest_money_receipt",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },
  {
    unique_id: "escrow_received_by",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_76"
    }],
    display_attributes: {
      display_name: "Received By",
      input_type: "text",
      order: 51,
      block: "contract_earnest_money_receipt",
      width: 6,
      placeholder: "Name of person receiving",
      value: { type: "manual" }
    }
  },
  {
    unique_id: "escrow_agent_email",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_77"
    }],
    display_attributes: {
      display_name: "Escrow Agent Email",
      input_type: "text",
      order: 52,
      block: "contract_earnest_money_receipt",
      width: 4,
      placeholder: "escrow@titlecompany.com",
      validation: {
        loopback: [{
          regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Must be a valid email address"
        }]
      },
      // special_input: {
      //   text: {  email: true }
      // },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "escrow_agent_phone",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_78"
    }],
    display_attributes: {
      display_name: "Escrow Agent Phone",
      input_type: "text",
      order: 53,
      block: "contract_earnest_money_receipt",
      width: 4,
      placeholder: "(555) 123-4567",
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "escrow_agent_fax",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_79"
    }],
    display_attributes: {
      display_name: "Escrow Agent Fax",
      input_type: "text",
      order: 54,
      block: "contract_earnest_money_receipt",
      width: 4,
      placeholder: "(555) 123-4568",
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      value: { type: "manual" }
    }
  },

  // ===== BROKER INFORMATION =====
  {
    unique_id: "listing_broker_name",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_84"
    }],
    display_attributes: {
      display_name: "Listing Broker",
      input_type: "text",
      order: 55,
      block: "broker_information",
      block_style: {
        title: "Broker Information",
        description: "Real estate broker and agent details",
        icon: "briefcase",
        color_theme: "purple"
      },
      width: 6,
      placeholder: "ABC Realty",
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "listing_broker_license",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_85"
    }],
    display_attributes: {
      display_name: "Listing Broker License No",
      input_type: "text",
      order: 56,
      block: "broker_information",
      width: 3,
      placeholder: "123456",
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "listing_agent_name",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_86"
    }],
    display_attributes: {
      display_name: "Listing Agent",
      input_type: "text",
      order: 57,
      block: "broker_information",
      width: 6,
      placeholder: "John Doe",
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "listing_agent_license",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_87"
    }],
    display_attributes: {
      display_name: "Listing Agent License No",
      input_type: "text",
      order: 58,
      block: "broker_information",
      width: 3,
      placeholder: "654321",
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "listing_broker_phone",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_88"
    }],
    display_attributes: {
      display_name: "Listing Broker Phone",
      input_type: "text",
      order: 59,
      block: "broker_information",
      width: 4,
      placeholder: "(555) 123-4567",
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "listing_broker_email",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_89"
    }],
    display_attributes: {
      display_name: "Listing Broker Email",
      input_type: "text",
      order: 60,
      block: "broker_information",
      width: 4,
      placeholder: "broker@realty.com",
      validation: {
        loopback: [{
          regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Must be a valid email address"
        }]
      },
      special_input: {
        text: {}
      },
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "listing_broker_fax",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_90"
    }],
    display_attributes: {
      display_name: "Listing Broker Fax",
      input_type: "text",
      order: 61,
      block: "broker_information",
      width: 4,
      placeholder: "(555) 123-4568",
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "buying_broker_name",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_91"
    }],
    display_attributes: {
      display_name: "Other Broker",
      input_type: "text",
      order: 62,
      block: "broker_information",
      width: 6,
      placeholder: "XYZ Realty",
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "buying_broker_license",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_92"
    }],
    display_attributes: {
      display_name: "Other Broker License No",
      input_type: "text",
      order: 63,
      block: "broker_information",
      width: 3,
      placeholder: "789012",
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "buying_agent_name",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_93"
    }],
    display_attributes: {
      display_name: "Other Agent",
      input_type: "text",
      order: 64,
      block: "broker_information",
      width: 6,
      placeholder: "Jane Smith",
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "buying_agent_license",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_94"
    }],
    display_attributes: {
      display_name: "Other Agent License No",
      input_type: "text",
      order: 65,
      block: "broker_information",
      width: 3,
      placeholder: "210987",
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "buying_broker_phone",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_95"
    }],
    display_attributes: {
      display_name: "Other Broker Phone",
      input_type: "text",
      order: 66,
      block: "broker_information",
      width: 4,
      placeholder: "(555) 987-6543",
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid phone number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "buying_broker_email",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_96"
    }],
    display_attributes: {
      display_name: "Other Broker Email",
      input_type: "text",
      order: 67,
      block: "broker_information",
      width: 4,
      placeholder: "other@realty.com",
      validation: {
        loopback: [{
          regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Must be a valid email address"
        }]
      },
      special_input: {
        text: {}
      },
      isCached: true,
      value: { type: "manual" }
    }
  },
  {
    unique_id: "buying_broker_fax",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_97"
    }],
    display_attributes: {
      display_name: "Other Broker Fax",
      input_type: "text",
      order: 68,
      block: "broker_information",
      width: 4,
      placeholder: "(555) 987-6544",
      validation: {
        loopback: [{
          regex: "^[-()\\s\\d]{10,}$",
          message: "Must be a valid fax number"
        }]
      },
      special_input: {
        text: { phone: true }
      },
      isCached: true,
      value: { type: "manual" }
    }
  },

  // ===== OPTION FEE RECEIPT =====
  {
    unique_id: "option_fee_receipt_date",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_110"
    }],
    display_attributes: {
      display_name: "Option Fee Receipt Date",
      input_type: "text",
      order: 69,
      block: "option_fee_receipt",
      block_style: {
        title: "Option Fee Receipt",
        description: "Receipt for option fee payment",
        icon: "dollar-sign",
        color_theme: "orange"
      },
      width: 4,
      placeholder: "MM/DD/YYYY",
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: { type: "manual" }
    }
  },
  {
    unique_id: "option_fee_receipt_signature",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_111"
    }],
    display_attributes: {
      display_name: "Seller/Listing Broker Signature",
      input_type: "signature",
      order: 70,
      block: "option_fee_receipt",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  // ===== FINAL ACCEPTANCE =====
  {
    unique_id: "final_acceptance_date",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_113"
    }],
    display_attributes: {
      display_name: "Final Acceptance Date",
      input_type: "text",
      order: 71,
      block: "final_acceptance",
      block_style: {
        title: "Final Acceptance",
        description: "Contract acceptance confirmation",
        icon: "check-circle",
        color_theme: "green"
      },
      width: 4,
      placeholder: "MM/DD/YYYY",
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: { type: "manual" }
    }
  },

  // ===== INITIALS =====
  {
    unique_id: "buyer_initials_all_pages",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: [
        "unimproved_property_contract_textfield_25",
        "unimproved_property_contract_textfield_36",
        "unimproved_property_contract_textfield_42",
        "unimproved_property_contract_textfield_52",
        "unimproved_property_contract_textfield_59"
      ]
    }],
    display_attributes: {
      display_name: "Buyer Initials (All Pages)",
      input_type: "signature",
      order: 72,
      block: "page_initials",
      block_style: {
        title: "Page Initials",
        description: "Initial each page of the contract",
        icon: "edit",
        color_theme: "gray"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },
  {
    unique_id: "seller_initials_all_pages",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: [
        "unimproved_property_contract_textfield_26",
        "unimproved_property_contract_textfield_37",
        "unimproved_property_contract_textfield_43",
        "unimproved_property_contract_textfield_53",
        "unimproved_property_contract_textfield_60"
      ]
    }],
    display_attributes: {
      display_name: "Seller Initials (All Pages)",
      input_type: "signature",
      order: 73,
      block: "page_initials",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  // ===== ADDITIONAL EARNEST MONEY RECEIPTS =====
  {
    unique_id: "additional_earnest_money_receipt_1",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_171",
      linked_form_fields_text: [
        "unimproved_property_contract_textfield_172",
        "unimproved_property_contract_textfield_173",
        "unimproved_property_contract_textfield_174",
        "unimproved_property_contract_textfield_175",
        "unimproved_property_contract_textfield_176",
        "unimproved_property_contract_textfield_177",
        "unimproved_property_contract_textfield_178"
      ]
    }],
    display_attributes: {
      display_name: "Additional Earnest Money Receipt #1",
      input_type: "text-area",
      order: 74,
      block: "additional_earnest_money",
      block_style: {
        title: "Additional Earnest Money Receipts",
        description: "Receipt for additional earnest money deposits",
        icon: "clipboard",
        color_theme: "blue"
      },
      width: 12,
      placeholder: "Receipt details...",

      value: { type: "manual" }
    }
  },
  {
    unique_id: "additional_earnest_money_receipt_2",
    pdf_attributes: [{
      formType: "unimproved_property_contract",
      formfield: "unimproved_property_contract_textfield_193",
      linked_form_fields_text: [
        "unimproved_property_contract_textfield_194",
        "unimproved_property_contract_textfield_195",
        "unimproved_property_contract_textfield_196",
        "unimproved_property_contract_textfield_197",
        "unimproved_property_contract_textfield_198",
        "unimproved_property_contract_textfield_199",
        "unimproved_property_contract_textfield_200"
      ]
    }],
    display_attributes: {
      display_name: "Additional Earnest Money Receipt #2",
      input_type: "text-area",
      order: 75,
      block: "additional_earnest_money",
      width: 12,
      placeholder: "Receipt details...",
      value: { type: "manual" }
    }
  }
];