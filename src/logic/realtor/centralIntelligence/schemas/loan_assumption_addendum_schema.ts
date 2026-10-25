import { SchemaItem } from "../../../../types/realtor";

export const loanAssumptionAddendumSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_1"
    }, {
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_18"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Complete address of the property subject to this loan assumption",
      order: 1,
      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Details about the property",
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

  // Buyer Documentation Requirements Block
  {
    unique_id: "documentation_deadline_days",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_2"
    }],
    display_attributes: {
      display_name: "Documentation Deadline (Days)",
      input_type: "text",
      description: "Number of days after effective date to submit documentation",
      order: 2,
      block: "buyer_documentation",
      block_style: {
        title: "Buyer Documentation Requirements",
        description: "Required documentation and timeline",
        icon: "file-text",
        color_theme: "green"
      },
      placeholder: "10",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a valid number"
        }]
      },
      special_input: {
        text: { number: true }
      },
      isRequired: true
    }
  },

  {
    unique_id: "credit_report_required",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_checkbox_1"
    }],
    display_attributes: {
      display_name: "Credit Report",
      input_type: "checkbox",
      order: 3,
      block: "buyer_documentation",
      checkbox_options: {
        options: [{
          display_name: "Credit Report Required",
          databaseStored: "CREDIT_REPORT"
        }]
      },
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "employment_verification_required",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_checkbox_2"
    }],
    display_attributes: {
      display_name: "Employment Verification",
      input_type: "checkbox",
      order: 4,
      block: "buyer_documentation",
      checkbox_options: {
        options: [{
          display_name: "Current Employment Verification",
          databaseStored: "EMPLOYMENT_VERIFICATION"
        }]
      },
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "financial_statement_required",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_checkbox_3"
    }],
    display_attributes: {
      display_name: "Financial Statement",
      input_type: "checkbox",
      order: 5,
      block: "buyer_documentation",
      checkbox_options: {
        options: [{
          display_name: "Financial Statement Required",
          databaseStored: "FINANCIAL_STATEMENT"
        }]
      },
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "funds_verification_required",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_checkbox_5"
    }],
    display_attributes: {
      display_name: "Funds Verification",
      input_type: "checkbox",
      order: 6,
      block: "buyer_documentation",
      checkbox_options: {
        options: [{
          display_name: "Verification of Funds on Deposit",
          databaseStored: "FUNDS_VERIFICATION"
        }]
      },
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "additional_credit_report",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_checkbox_4"
    }],
    display_attributes: {
      display_name: "Additional Documentation",
      input_type: "checkbox",
      order: 7,
      block: "buyer_documentation",
      checkbox_options: {
        options: [{
          display_name: "Additional Credit Report",
          databaseStored: "ADDITIONAL_CREDIT_REPORT"
        }]
      },
      width: 4,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "authorized_recipients",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_3"
    }],
    display_attributes: {
      display_name: "Authorized Recipients",
      input_type: "text",
      description: "Parties authorized to receive credit reports",
      order: 8,
      block: "buyer_documentation",
      placeholder: "Seller and noteholder(s)",
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Loan Assumption Details Block
  {
    unique_id: "first_lien_selected",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_checkbox_6"
    }],
    display_attributes: {
      display_name: "First Lien Loan",
      input_type: "checkbox",
      order: 9,
      block: "loan_details",
      block_style: {
        title: "Loan Assumption Details",
        description: "Details of the loan(s) being assumed",
        icon: "dollar-sign",
        color_theme: "orange"
      },
      checkbox_options: {
        options: [{
          display_name: "First Lien Promissory Note",
          databaseStored: "FIRST_LIEN",
          linkedFields: ["first_lien_payable_to", "first_lien_balance", "first_lien_monthly_payment"]
        }]
      },
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "first_lien_payable_to",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_4"
    }],
    display_attributes: {
      display_name: "First Lien Payable To",
      input_type: "text",
      order: 10,
      block: "loan_details",
      placeholder: "Lender Name",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "first_lien_selected",
        operation: "contains",
        valueChecked: "FIRST_LIEN"
      }]
    }
  },

  {
    unique_id: "first_lien_balance",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_5"
    }],
    display_attributes: {
      display_name: "First Lien Unpaid Balance",
      input_type: "text",
      order: 11,
      block: "loan_details",
      placeholder: "$0.00",
      width: 6,
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
      visibleIf: [{
        unique_id: "first_lien_selected",
        operation: "contains",
        valueChecked: "FIRST_LIEN"
      }]
    }
  },

  {
    unique_id: "first_lien_monthly_payment",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_7"
    }],
    display_attributes: {
      display_name: "First Lien Monthly Payment",
      input_type: "text",
      order: 12,
      block: "loan_details",
      placeholder: "$0.00",
      width: 6,
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
      visibleIf: [{
        unique_id: "first_lien_selected",
        operation: "contains",
        valueChecked: "FIRST_LIEN"
      }]
    }
  },

  {
    unique_id: "first_lien_terms",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_6"
    }],
    display_attributes: {
      display_name: "First Lien Terms",
      input_type: "text",
      description: "Additional terms or notes for first lien",
      order: 13,
      block: "loan_details",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "first_lien_selected",
        operation: "contains",
        valueChecked: "FIRST_LIEN"
      }]
    }
  },

  {
    unique_id: "second_lien_selected",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_checkbox_7"
    }],
    display_attributes: {
      display_name: "Second Lien Loan",
      input_type: "checkbox",
      order: 14,
      block: "loan_details",
      checkbox_options: {
        options: [{
          display_name: "Second Lien Promissory Note",
          databaseStored: "SECOND_LIEN",
          linkedFields: ["second_lien_payable_to", "second_lien_balance", "second_lien_monthly_payment"]
        }]
      },
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  {
    unique_id: "second_lien_payable_to",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_8"
    }],
    display_attributes: {
      display_name: "Second Lien Payable To",
      input_type: "text",
      order: 15,
      block: "loan_details",
      placeholder: "Lender Name",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "second_lien_selected",
        operation: "contains",
        valueChecked: "SECOND_LIEN"
      }]
    }
  },

  {
    unique_id: "second_lien_balance",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_10"
    }],
    display_attributes: {
      display_name: "Second Lien Unpaid Balance",
      input_type: "text",
      order: 16,
      block: "loan_details",
      placeholder: "$0.00",
      width: 6,
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
      visibleIf: [{
        unique_id: "second_lien_selected",
        operation: "contains",
        valueChecked: "SECOND_LIEN"
      }]
    }
  },

  {
    unique_id: "second_lien_monthly_payment",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_11"
    }],
    display_attributes: {
      display_name: "Second Lien Monthly Payment",
      input_type: "text",
      order: 17,
      block: "loan_details",
      placeholder: "$0.00",
      width: 6,
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
      visibleIf: [{
        unique_id: "second_lien_selected",
        operation: "contains",
        valueChecked: "SECOND_LIEN"
      }]
    }
  },

  {
    unique_id: "second_lien_terms",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_9"
    }],
    display_attributes: {
      display_name: "Second Lien Terms",
      input_type: "text",
      description: "Additional terms or notes for second lien",
      order: 18,
      block: "loan_details",
      width: 12,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "second_lien_selected",
        operation: "contains",
        valueChecked: "SECOND_LIEN"
      }]
    }
  },

  // Variance and Adjustment Options
  {
    unique_id: "variance_adjustment_method",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: ["loan_assumption_addendum_checkbox_8", "loan_assumption_addendum_checkbox_9"]
    }],
    display_attributes: {
      display_name: "Variance Adjustment Method",
      input_type: "radio",
      description: "How to handle variance in loan balance",
      order: 19,
      block: "variance_options",
      block_style: {
        title: "Variance and Adjustment Options",
        description: "Options for handling loan balance variations",
        icon: "settings",
        color_theme: "purple"
      },
      display_radio_options: ["Cash Payable at Closing", "Sales Price Adjustment"],
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // Loan Assumption Conditions
  {
    unique_id: "max_assumption_fee_first",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_13"
    }],
    display_attributes: {
      display_name: "Maximum Assumption Fee - First Lien",
      input_type: "text",
      order: 20,
      block: "assumption_conditions",
      block_style: {
        title: "Loan Assumption Conditions",
        description: "Terms and conditions for loan assumption",
        icon: "alert-circle",
        color_theme: "orange"
      },
      placeholder: "$0.00",
      width: 6,
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

  {
    unique_id: "max_assumption_fee_second",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_14"
    }],
    display_attributes: {
      display_name: "Maximum Assumption Fee - Second Lien",
      input_type: "text",
      order: 21,
      block: "assumption_conditions",
      placeholder: "$0.00",
      width: 6,
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

  {
    unique_id: "max_interest_rate_first",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_12"
    }],
    display_attributes: {
      display_name: "Maximum Interest Rate - First Lien",
      input_type: "text",
      order: 22,
      block: "assumption_conditions",
      placeholder: "3.5%",
      width: 6,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      }
    }
  },

  {
    unique_id: "max_interest_rate_second",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_15"
    }],
    display_attributes: {
      display_name: "Maximum Interest Rate - Second Lien",
      input_type: "text",
      order: 23,
      block: "assumption_conditions",
      placeholder: "3.5%",
      width: 6,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      }
    }
  },

  // Signatures Block
  {
    unique_id: "seller_signature_1",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_19",
      linked_dates: [{
        dateFieldName: "loan_assumption_addendum_textfield_16"
      }]
    }],
    display_attributes: {
      display_name: "Seller Signature",
      input_type: "signature",
      order: 24,
      block: "signatures",
      block_style: {
        title: "Signatures",
        description: "Required signatures for this addendum",
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
    unique_id: "seller_signature_2",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_20",
      linked_dates: [{
        dateFieldName: "loan_assumption_addendum_textfield_17"
      }]
    }],
    display_attributes: {
      display_name: "Seller Signature 2",
      input_type: "signature",
      order: 25,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  {
    unique_id: "buyer_signature_1",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_21"
    }],
    display_attributes: {
      display_name: "Buyer Signature",
      input_type: "signature",
      order: 26,
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
    unique_id: "buyer_signature_2",
    pdf_attributes: [{
      formType: "loan_assumption_addendum",
      formfield: "loan_assumption_addendum_textfield_22"
    }],
    display_attributes: {
      display_name: "Buyer Signature 2",
      input_type: "signature",
      order: 27,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  }
];