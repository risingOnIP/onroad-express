import { SchemaItem } from "../../../../types/realtor";

export const THIRD_PARTY_FINANCING_SCHEMA: SchemaItem[] = [
  {
    unique_id: "financing_info_section",
    display_attributes: {
      display_name: "Third-Party Financing Addendum",
      input_type: "info",
      description: "Select your financing type below and complete the required information for your loan application.",
      order: 1,

      width: 12,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "property_address"
    }, {
      formType: "third_party_financing", 
      formfield: "property_address_page_2"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Full address of the property",
      order: 2,

      block: "Property Information",
      block_style: {
        title: "Property Information",
        description: "Property location details",
        icon: "MapPin",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, Austin, TX 78701",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "financing_type_selection",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "financing_type",
      linked_form_fields_checkbox: [
        { fromDatabase: "CONVENTIONAL", pdfAttribute: "financing_option_conventional" },
        { fromDatabase: "TEXAS_VETERANS", pdfAttribute: "financing_option_texas_veterans" },
        { fromDatabase: "FHA_INSURED", pdfAttribute: "financing_option_fha_insured" },
        { fromDatabase: "VA_GUARANTEED", pdfAttribute: "financing_option_va_guaranteed" },
        { fromDatabase: "USDA_GUARANTEED", pdfAttribute: "financing_option_usda_guaranteed" },
        { fromDatabase: "REVERSE_MORTGAGE", pdfAttribute: "financing_option_reverse_mortgage" }
      ]
    }],
    display_attributes: {
      display_name: "Type of Financing",
      input_type: "checkbox",
      description: "Select all financing types you will apply for",
      order: 3,

      block: "Financing Selection",
      block_style: {
        title: "Financing Selection",
        description: "Choose your loan type(s)",
        icon: "CreditCard",
        color_theme: "purple"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Conventional Financing",
            databaseStored: "CONVENTIONAL",
            linkedFields: ["conventional_mortgage_options"]
          },
          {
            display_name: "Texas Veterans Loan",
            databaseStored: "TEXAS_VETERANS",
            linkedFields: ["texas_veterans_loan_amount", "texas_veterans_loan_period_years"]
          },
          {
            display_name: "FHA Insured Financing",
            databaseStored: "FHA_INSURED",
            linkedFields: ["fha_loan_section_number", "fha_loan_principal_amount", "fha_loan_minimum_years", "fha_loan_years_interest_rate", "fha_loan_annual_rate_years", "fha_loan_annual_rate_percentage"]
          },
          {
            display_name: "VA Guaranteed Financing",
            databaseStored: "VA_GUARANTEED",
            linkedFields: ["va_loan_origination_charges_percentage", "va_loan_amortization_years", "va_loan_interest_rate_percentage", "va_loan_funding_fee_years", "va_loan_origination_estimate_percentage", "va_property_value_established"]
          },
          {
            display_name: "USDA Guaranteed Financing",
            databaseStored: "USDA_GUARANTEED",
            linkedFields: ["usda_loan_annual_rate_years", "usda_loan_interest_rate_percentage", "usda_loan_annual_rate_years_alt", "usda_loan_origination_charges_percentage"]
          },
          {
            display_name: "Reverse Mortgage Financing",
            databaseStored: "REVERSE_MORTGAGE",
            linkedFields: ["reverse_mortgage_principal_amount", "reverse_mortgage_funding_fee_years", "reverse_mortgage_annual_rate_percentage", "reverse_mortgage_annual_rate_years", "reverse_mortgage_loan_origination_charges_percentage", "reverse_mortgage_not_fha_option", "reverse_mortgage_waiver_option_will", "reverse_mortgage_interest_rate_percentage", "reverse_mortgage_annual_rate_percentage_alt", "reverse_mortgage_funding_fee_years_alt", "reverse_mortgage_origination_charges_percentage", "reverse_mortgage_annual_rate_years_alt"]
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
    unique_id: "conventional_mortgage_options",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_mortgage_selection",
      linked_form_fields_checkbox: [
        { fromDatabase: "FIRST_MORTGAGE", pdfAttribute: "conventional_first_mortgage_option" },
        { fromDatabase: "SECOND_MORTGAGE", pdfAttribute: "conventional_second_mortgage_option" }
      ]
    }],
    display_attributes: {
      display_name: "Conventional Mortgage Options",
      input_type: "checkbox",
      description: "Select which mortgages you will apply for",
      order: 4,

      block: "Conventional Financing Details",
      block_style: {
        title: "Conventional Financing Details",
        description: "First and second mortgage information",
        icon: "Home",
        color_theme: "blue"
      },
      checkbox_options: {
        options: [
          {
            display_name: "First Mortgage Loan",
            databaseStored: "FIRST_MORTGAGE",
            linkedFields: ["conventional_first_mortgage_years", "conventional_first_mortgage_pmi_years", "conventional_first_mortgage_pmi_percentage", "conventional_first_mortgage_annual_rate_years", "conventional_first_mortgage_origination_charges_percentage"]
          },
          {
            display_name: "Second Mortgage Loan",
            databaseStored: "SECOND_MORTGAGE",
            linkedFields: ["conventional_second_mortgage_principal_amount", "conventional_second_mortgage_pmi_years", "conventional_second_mortgage_pmi_percentage", "conventional_second_mortgage_annual_rate_years", "conventional_second_mortgage_origination_charges_percentage"]
          }
        ]
      },
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "CONVENTIONAL"
        }
      ],
      breakBefore: true
    }
  },
  {
    unique_id: "conventional_first_mortgage_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_first_mortgage_years"
    }],
    display_attributes: {
      display_name: "First Mortgage Loan Amount",
      input_type: "text",
      description: "Principal amount for first mortgage",
      order: 5,

      block: "Conventional Financing Details",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Enter a valid dollar amount"
        }]
      },
      placeholder: "$350,000.00",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "FIRST_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "conventional_first_mortgage_pmi_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_first_mortgage_pmi_years"
    }],
    display_attributes: {
      display_name: "PMI Period (Years)",
      input_type: "text",
      description: "Private Mortgage Insurance - required until 20% equity. Enter years until removal.",
      order: 6,

      block: "Conventional Financing Details",
      placeholder: "5",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "FIRST_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "conventional_first_mortgage_pmi_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_first_mortgage_pmi_percentage"
    }],
    display_attributes: {
      display_name: "PMI Rate (%)",
      input_type: "text",
      description: "Annual Private Mortgage Insurance rate",
      order: 7,

      block: "Conventional Financing Details",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "0.5%",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "FIRST_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "conventional_first_mortgage_annual_rate_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_first_mortgage_annual_rate_years"
    }],
    display_attributes: {
      display_name: "Loan Term (Years)",
      input_type: "text",
      description: "Length of loan",
      order: 8,

      block: "Conventional Financing Details",
      placeholder: "30",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "FIRST_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "conventional_first_mortgage_origination_charges_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_first_mortgage_origination_charges_percentage"
    }],
    display_attributes: {
      display_name: "Origination Fee (%)",
      input_type: "text",
      description: "Lender's fee percentage",
      order: 9,

      block: "Conventional Financing Details",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "1.0%",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "FIRST_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "conventional_second_mortgage_principal_amount",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_second_mortgage_principal_amount"
    }],
    display_attributes: {
      display_name: "Second Mortgage Amount",
      input_type: "text",
      description: "Principal amount for second mortgage",
      order: 11,

      block: "Conventional Financing Details",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Enter a valid dollar amount"
        }]
      },
      placeholder: "$50,000.00",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "SECOND_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "conventional_second_mortgage_pmi_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_second_mortgage_pmi_years"
    }],
    display_attributes: {
      display_name: "Second PMI Period (Years)",
      input_type: "text",
      description: "Private Mortgage Insurance years for second loan",
      order: 12,

      block: "Conventional Financing Details",
      placeholder: "5",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "SECOND_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "conventional_second_mortgage_pmi_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_second_mortgage_pmi_percentage"
    }],
    display_attributes: {
      display_name: "Second PMI Rate (%)",
      input_type: "text",
      description: "Annual Private Mortgage Insurance rate for second loan",
      order: 13,

      block: "Conventional Financing Details",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "0.75%",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "SECOND_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "conventional_second_mortgage_annual_rate_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_second_mortgage_annual_rate_years"
    }],
    display_attributes: {
      display_name: "Second Loan Term (Years)",
      input_type: "text",
      description: "Length of second mortgage",
      order: 14,

      block: "Conventional Financing Details",
      placeholder: "15",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "SECOND_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "conventional_second_mortgage_origination_charges_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "conventional_second_mortgage_origination_charges_percentage"
    }],
    display_attributes: {
      display_name: "Second Origination Fee (%)",
      input_type: "text",
      description: "Lender's fee for second mortgage",
      order: 15,

      block: "Conventional Financing Details",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "1.5%",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "conventional_mortgage_options",
          operation: "contains",
          valueChecked: "SECOND_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "texas_veterans_loan_amount",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "texas_veterans_loan_amount"
    }],
    display_attributes: {
      display_name: "Texas Veterans Loan Amount",
      input_type: "text",
      description: "Total loan amount",
      order: 16,

      block: "Texas Veterans Financing",
      block_style: {
        title: "Texas Veterans Financing",
        description: "Texas Veterans Land Board loan details",
        icon: "Flag",
        color_theme: "purple"
      },
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Enter a valid dollar amount"
        }]
      },
      placeholder: "$200,000.00",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "TEXAS_VETERANS"
        }
      ],
      breakBefore: true
    }
  },
  {
    unique_id: "texas_veterans_loan_period_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "texas_veterans_loan_period_years"
    }],
    display_attributes: {
      display_name: "Loan Term (Years)",
      input_type: "text",
      description: "Repayment period",
      order: 17,

      block: "Texas Veterans Financing",
      placeholder: "30",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "TEXAS_VETERANS"
        }
      ]
    }
  },
  {
    unique_id: "fha_loan_section_number",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "fha_loan_section_number"
    }],
    display_attributes: {
      display_name: "FHA Loan Section",
      input_type: "text",
      description: "FHA program type (e.g., 203(b))",
      order: 18,

      block: "FHA Insured Financing",
      block_style: {
        title: "FHA Insured Financing",
        description: "Federal Housing Administration loan details",
        icon: "FileText",
        color_theme: "green"
      },
      placeholder: "203(b)",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "FHA_INSURED"
        }
      ],
      breakBefore: true
    }
  },
  {
    unique_id: "fha_loan_principal_amount",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "fha_loan_principal_amount"
    }],
    display_attributes: {
      display_name: "FHA Loan Amount",
      input_type: "text",
      description: "Principal loan amount",
      order: 19,

      block: "FHA Insured Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Enter a valid dollar amount"
        }]
      },
      placeholder: "$250,000.00",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "FHA_INSURED"
        }
      ]
    }
  },
  {
    unique_id: "fha_loan_minimum_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "fha_loan_minimum_years"
    }],
    display_attributes: {
      display_name: "Minimum Term (Years)",
      input_type: "text",
      description: "Minimum loan term",
      order: 20,

      block: "FHA Insured Financing",
      placeholder: "30",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "FHA_INSURED"
        }
      ]
    }
  },
  {
    unique_id: "fha_loan_years_interest_rate",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "fha_loan_years_interest_rate"
    }],
    display_attributes: {
      display_name: "Interest Rate Period (Years)",
      input_type: "text",
      description: "Years for fixed rate",
      order: 21,

      block: "FHA Insured Financing",
      placeholder: "30",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "FHA_INSURED"
        }
      ]
    }
  },
  {
    unique_id: "fha_loan_annual_rate_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "fha_loan_annual_rate_years"
    }],
    display_attributes: {
      display_name: "Annual Rate Term (Years)",
      input_type: "text",
      description: "APR calculation period",
      order: 22,

      block: "FHA Insured Financing",
      placeholder: "30",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "FHA_INSURED"
        }
      ]
    }
  },
  {
    unique_id: "fha_loan_annual_rate_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "fha_loan_annual_rate_percentage"
    }],
    display_attributes: {
      display_name: "Annual Interest Rate (%)",
      input_type: "text",
      description: "Annual percentage rate",
      order: 23,

      block: "FHA Insured Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "3.5%",
      width: 3,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "FHA_INSURED"
        }
      ]
    }
  },
  {
    unique_id: "va_loan_origination_charges_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "va_loan_origination_charges_percentage"
    }],
    display_attributes: {
      display_name: "VA Origination Fee (%)",
      input_type: "text",
      description: "Lender's fee (max 1%)",
      order: 24,

      block: "VA Guaranteed Financing",
      block_style: {
        title: "VA Guaranteed Financing",
        description: "Veterans Affairs loan details",
        icon: "Flag",
        color_theme: "purple"
      },
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "1.0%",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "VA_GUARANTEED"
        }
      ],
      breakBefore: true
    }
  },
  {
    unique_id: "va_loan_amortization_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "va_loan_amortization_years"
    }],
    display_attributes: {
      display_name: "Loan Term (Years)",
      input_type: "text",
      description: "Length of VA loan",
      order: 25,

      block: "VA Guaranteed Financing",
      placeholder: "30",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "VA_GUARANTEED"
        }
      ]
    }
  },
  {
    unique_id: "va_loan_interest_rate_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "va_loan_interest_rate_percentage"
    }],
    display_attributes: {
      display_name: "Interest Rate (%)",
      input_type: "text",
      description: "Annual interest rate",
      order: 26,

      block: "VA Guaranteed Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "2.75%",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "VA_GUARANTEED"
        }
      ]
    }
  },
  {
    unique_id: "va_loan_funding_fee_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "va_loan_funding_fee_years"
    }],
    display_attributes: {
      display_name: "Funding Fee Period (Years)",
      input_type: "text",
      description: "Years to amortize VA funding fee",
      order: 27,

      block: "VA Guaranteed Financing",
      placeholder: "30",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "VA_GUARANTEED"
        }
      ]
    }
  },
  {
    unique_id: "va_loan_origination_estimate_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "va_loan_origination_estimate_percentage"
    }],
    display_attributes: {
      display_name: "Estimated Closing Costs (%)",
      input_type: "text",
      description: "Total closing cost estimate",
      order: 28,

      block: "VA Guaranteed Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "1.0%",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "VA_GUARANTEED"
        }
      ]
    }
  },
  {
    unique_id: "va_property_value_established",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "va_property_value_established"
    }],
    display_attributes: {
      display_name: "VA Appraised Value",
      input_type: "text",
      description: "Property value from VA appraisal",
      order: 29,

      block: "VA Guaranteed Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Enter a valid dollar amount"
        }]
      },
      placeholder: "$300,000.00",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "VA_GUARANTEED"
        }
      ]
    }
  },
  {
    unique_id: "usda_loan_annual_rate_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "usda_loan_annual_rate_years"
    }],
    display_attributes: {
      display_name: "USDA Loan Term (Years)",
      input_type: "text",
      description: "Length of loan",
      order: 30,

      block: "USDA Guaranteed Financing",
      block_style: {
        title: "USDA Guaranteed Financing",
        description: "Rural Development loan details",
        icon: "Home",
        color_theme: "green"
      },
      placeholder: "30",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "USDA_GUARANTEED"
        }
      ],
      breakBefore: true
    }
  },
  {
    unique_id: "usda_loan_interest_rate_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "usda_loan_interest_rate_percentage"
    }],
    display_attributes: {
      display_name: "Interest Rate (%)",
      input_type: "text",
      description: "Annual interest rate",
      order: 31,

      block: "USDA Guaranteed Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "2.5%",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "USDA_GUARANTEED"
        }
      ]
    }
  },
  {
    unique_id: "usda_loan_annual_rate_years_alt",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "usda_loan_annual_rate_years_alt"
    }],
    display_attributes: {
      display_name: "Alternative Term (Years)",
      input_type: "text",
      description: "Optional different loan term",
      order: 32,

      block: "USDA Guaranteed Financing",
      placeholder: "15",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "USDA_GUARANTEED"
        }
      ]
    }
  },
  {
    unique_id: "usda_loan_origination_charges_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "usda_loan_origination_charges_percentage"
    }],
    display_attributes: {
      display_name: "USDA Origination Fee (%)",
      input_type: "text",
      description: "Lender's fee percentage",
      order: 33,

      block: "USDA Guaranteed Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "1.0%",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "USDA_GUARANTEED"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_principal_amount",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_principal_amount"
    }],
    display_attributes: {
      display_name: "Reverse Mortgage Amount",
      input_type: "text",
      description: "Principal amount available",
      order: 34,

      block: "Reverse Mortgage Financing",
      block_style: {
        title: "Reverse Mortgage Financing",
        description: "For borrowers 62+ years old",
        icon: "Home",
        color_theme: "orange"
      },
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Enter a valid dollar amount"
        }]
      },
      placeholder: "$150,000.00",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ],
      breakBefore: true
    }
  },
  {
    unique_id: "reverse_mortgage_funding_fee_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_funding_fee_years"
    }],
    display_attributes: {
      display_name: "Funding Fee Period",
      input_type: "text",
      description: "Years or loan lifetime",
      order: 34,

      block: "Reverse Mortgage Financing",
      placeholder: "Life of loan",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_annual_rate_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_annual_rate_percentage"
    }],
    display_attributes: {
      display_name: "Annual Rate (%)",
      input_type: "text",
      description: "Annual percentage rate",
      order: 35,

      block: "Reverse Mortgage Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "4.5%",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ],
      breakBefore: true
    }
  },
  {
    unique_id: "reverse_mortgage_annual_rate_years",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_annual_rate_years"
    }],
    display_attributes: {
      display_name: "Rate Period (Years)",
      input_type: "text",
      description: "Years or loan lifetime",
      order: 36,

      block: "Reverse Mortgage Financing",
      placeholder: "Life of loan",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_loan_origination_charges_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "Text2.reverse_mortgage_loan_origination_charges_percentage"
    }],
    display_attributes: {
      display_name: "Origination Charges (%)",
      input_type: "text",
      description: "Lender's fee percentage",
      order: 37,

      block: "Reverse Mortgage Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "2.0%",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_not_fha_option",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_not_fha_option"
    }],
    display_attributes: {
      display_name: "Non-FHA Reverse Mortgage",
      input_type: "checkbox",
      description: "Check if NOT FHA insured",
      order: 38,

      block: "Reverse Mortgage Financing",
      checkbox_options: {
        options: [
          {
            display_name: "Will NOT be FHA Insured",
            databaseStored: "NOT_FHA_INSURED",
            linkedFields: []
          }
        ],
        maxSelected: 1
      },
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_waiver_option_will",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_waiver_option_will"
    }],
    display_attributes: {
      display_name: "Waiver Option",
      input_type: "checkbox",
      description: "Apply waiver if applicable",
      order: 39,

      block: "Reverse Mortgage Financing",
      checkbox_options: {
        options: [
          {
            display_name: "Apply Waiver Option",
            databaseStored: "WAIVER_APPLIED",
            linkedFields: []
          }
        ],
        maxSelected: 1
      },
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_interest_rate_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_interest_rate_percentage"
    }],
    display_attributes: {
      display_name: "Interest Rate (%)",
      input_type: "text",
      description: "Annual interest rate",
      order: 40,

      block: "Reverse Mortgage Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "4.25%",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_annual_rate_percentage_alt",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_annual_rate_percentage_alt"
    }],
    display_attributes: {
      display_name: "Alternative Annual Rate (%)",
      input_type: "text",
      description: "Optional different rate",
      order: 41,

      block: "Reverse Mortgage Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "4.0%",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_funding_fee_years_alt",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_funding_fee_years_alt"
    }],
    display_attributes: {
      display_name: "Alt Funding Fee Period",
      input_type: "text",
      description: "Alternative fee period",
      order: 42,

      block: "Reverse Mortgage Financing",
      placeholder: "Life of loan",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_origination_charges_percentage",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_origination_charges_percentage"
    }],
    display_attributes: {
      display_name: "Alt Origination Fee (%)",
      input_type: "text",
      description: "Alternative lender fee",
      order: 43,

      block: "Reverse Mortgage Financing",
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "1.75%",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "reverse_mortgage_annual_rate_years_alt",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_annual_rate_years_alt"
    }],
    display_attributes: {
      display_name: "Alt Rate Period (Years)",
      input_type: "text",
      description: "Alternative rate period",
      order: 44,

      block: "Reverse Mortgage Financing",
      placeholder: "Life of loan",
      width: 6,
      value: {
        type: "manual"
      },
      visibleIf: [
        {
          unique_id: "financing_type_selection",
          operation: "contains",
          valueChecked: "REVERSE_MORTGAGE"
        }
      ]
    }
  },
  {
    unique_id: "origination_charge_limit_percent",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "origination_charge_limit_percent"
    }],
    display_attributes: {
      display_name: "Origination Charge Limit (%)",
      input_type: "text",
      description: "Maximum allowed origination fees",
      order: 46,

      block: "Additional Financing Terms",
      block_style: {
        title: "Additional Financing Terms",
        description: "General terms and conditions",
        icon: "FileText",
        color_theme: "gray"
      },
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Enter a valid percentage"
        }]
      },
      placeholder: "2.0%",
      width: 6,
      value: {
        type: "manual"
      },
      breakBefore: true
    }
  },
  {
    unique_id: "buyer_approval_status",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "buyer_approval_status",
      linked_form_fields_checkbox: [
        { fromDatabase: "SUBJECT_TO_APPROVAL", pdfAttribute: "subject_to_buyer_approval" },
        { fromDatabase: "NOT_SUBJECT_TO_APPROVAL", pdfAttribute: "not_subject_to_buyer_approval" }
      ]
    }],
    display_attributes: {
      display_name: "Buyer Approval Status",
      input_type: "checkbox",
      description: "Is this contract subject to buyer approval?",
      order: 47,

      block: "Additional Financing Terms",
      checkbox_options: {
        options: [
          {
            display_name: "Contract IS subject to Buyer obtaining approval",
            databaseStored: "SUBJECT_TO_APPROVAL",
            linkedFields: []
          },
          {
            display_name: "Contract is NOT subject to Buyer obtaining approval",
            databaseStored: "NOT_SUBJECT_TO_APPROVAL",
            linkedFields: []
          }
        ],
        minSelected: 1,
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
    unique_id: "reverse_mortgage_conversion_loan_amount",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "reverse_mortgage_conversion_loan_amount"
    }],
    display_attributes: {
      display_name: "Days to Terminate Contract",
      input_type: "text",
      description: "Days after effective date to terminate if financing not approved",
      order: 48,

      block: "Additional Financing Terms",
      validation: {
        loopback: [{
          regex: "^[\\d]+$",
          message: "Enter number of days"
        }]
      },
      placeholder: "30",
      width: 12,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "buyer1_signatures_and_initials",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "buyer1_initial"
    }, {
      formType: "third_party_financing",
      formfield: "buyer_1_signature"
    }],
    display_attributes: {
      display_name: "Buyer 1 Initials & Signature",
      input_type: "signature",
      description: "Buyer 1 acknowledgment",
      order: 49,

      block: "Signatures and Initials",
      block_style: {
        title: "Signatures and Initials",
        description: "Required signatures",
        icon: "FileText",
        color_theme: "gray"
      },
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true,
      breakBefore: true
    }
  },
  {
    unique_id: "buyer2_signatures_and_initials",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "buyer2_initial"
    }, {
      formType: "third_party_financing",
      formfield: "buyer_2_signature"
    }],
    display_attributes: {
      display_name: "Buyer 2 Initials & Signature",
      input_type: "signature",
      description: "Buyer 2 acknowledgment",
      order: 50,

      block: "Signatures and Initials",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true,
      breakBefore: true
    }
  },
  {
    unique_id: "seller1_signatures_and_initials",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "seller1_initial"
    }, {
      formType: "third_party_financing",
      formfield: "seller_1_signature"
    }],
    display_attributes: {
      display_name: "Seller 1 Initials & Signature",
      input_type: "signature",
      description: "Seller 1 acknowledgment",
      order: 51,

      block: "Signatures and Initials",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true,
      breakBefore: true
    }
  },
  {
    unique_id: "seller2_signatures_and_initials",
    pdf_attributes: [{
      formType: "third_party_financing",
      formfield: "seller2_initial"
    }, {
      formType: "third_party_financing",
      formfield: "seller_2_signature"
    }],
    display_attributes: {
      display_name: "Seller 2 Initials & Signature",
      input_type: "signature",
      description: "Seller 2 acknowledgment",
      order: 52,

      block: "Signatures and Initials",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true,
      breakBefore: true
    }
  },
];