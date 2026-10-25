import { SchemaItem } from "../../../../types/realtor";

export const addendumReleaseAssumedVaLoanLiabilitySchema: SchemaItem[] = [
  {
    unique_id: "property_address",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_textfield_1"
      }
    ],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Enter the complete address of the property",
      order: 1,

      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Details about the property covered by this addendum",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, City, State, ZIP",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "release_liability_section",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_checkbox_1"
      }
    ],
    display_attributes: {
      display_name: "Release of Seller's Liability on Loan to be Assumed",
      input_type: "checkbox",
      description: "Check if requesting release of seller's liability",
      order: 2,
      block: "release_options",
      block_style: {
        title: "Release and Restoration Options",
        description: "Select applicable options for VA loan liability release and entitlement restoration",
        icon: "shield",
        color_theme: "green"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Request Release of Liability",
            databaseStored: "RELEASE_LIABILITY",
            linkedFields: ["release_approval_deadline", "release_termination_option"]
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
    unique_id: "release_approval_deadline",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_textfield_2"
      }
    ],
    display_attributes: {
      display_name: "Release Approval Deadline",
      input_type: "text",
      description: "Number of days for VA approval",
      order: 3,
      placeholder: "60",
      width: 4,
      visibleIf: [
        {
          unique_id: "release_liability_section",
          operation: "contains",
          valueChecked: "RELEASE_LIABILITY"
        }
      ],
      validation: {
        loopback: [
          {
            regex: "^\\d+$",
            message: "Must be a valid number of days"
          }
        ]
      },
      special_input: {
        text: {
          number: true
        }
      },
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "release_termination_option",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_checkbox_2",
        linked_form_fields_checkbox: [
          {
            fromDatabase: "TERMINATE_CONTRACT",
            pdfAttribute: "addendum_release_assumed_va_loan_liability_checkbox_2"
          },
          {
            fromDatabase: "NO_DELAY_CLOSING",
            pdfAttribute: "addendum_release_assumed_va_loan_liability_checkbox_3"
          }
        ]
      }
    ],
    display_attributes: {
      display_name: "If Release Not Approved by Closing Date",
      input_type: "checkbox",
      description: "Select one option",
      order: 4,
      visibleIf: [
        {
          unique_id: "release_liability_section",
          operation: "contains",
          valueChecked: "RELEASE_LIABILITY"
        }
      ],
      checkbox_options: {
        options: [
          {
            display_name: "This contract will terminate and the earnest money will be refunded to Buyer",
            databaseStored: "TERMINATE_CONTRACT"
          },
          {
            display_name: "Failure to obtain release approval will not delay closing",
            databaseStored: "NO_DELAY_CLOSING"
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
      }
    }
  },
  {
    unique_id: "restoration_entitlement_section",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_checkbox_4"
      }
    ],
    display_attributes: {
      display_name: "Restoration of Seller's Entitlement for VA Loan",
      input_type: "checkbox",
      description: "Check if requesting restoration of seller's VA entitlement",
      order: 5,
      block: "restoration_options",
      checkbox_options: {
        options: [
          {
            display_name: "Request Restoration of Entitlement",
            databaseStored: "RESTORE_ENTITLEMENT",
            linkedFields: ["restoration_approval_deadline", "restoration_termination_option"]
          }
        ],
        maxSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      },
      breakBefore: true
    }
  },
  {
    unique_id: "restoration_approval_deadline",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_textfield_3"
      }
    ],
    display_attributes: {
      display_name: "Restoration Approval Deadline",
      input_type: "text",
      description: "Number of days for VA approval",
      order: 6,
      placeholder: "60",
      width: 4,
      visibleIf: [
        {
          unique_id: "restoration_entitlement_section",
          operation: "contains",
          valueChecked: "RESTORE_ENTITLEMENT"
        }
      ],
      validation: {
        loopback: [
          {
            regex: "^\\d+$",
            message: "Must be a valid number of days"
          }
        ]
      },
      special_input: {
        text: {
          number: true
        }
      },
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "restoration_termination_option",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_checkbox_5",
        linked_form_fields_checkbox: [
          {
            fromDatabase: "TERMINATE_CONTRACT",
            pdfAttribute: "addendum_release_assumed_va_loan_liability_checkbox_5"
          },
          {
            fromDatabase: "NO_DELAY_CLOSING",
            pdfAttribute: "addendum_release_assumed_va_loan_liability_checkbox_6"
          }
        ]
      }
    ],
    display_attributes: {
      display_name: "If Restoration Not Approved by Closing Date",
      input_type: "checkbox",
      description: "Select one option",
      order: 7,
      visibleIf: [
        {
          unique_id: "restoration_entitlement_section",
          operation: "contains",
          valueChecked: "RESTORE_ENTITLEMENT"
        }
      ],
      checkbox_options: {
        options: [
          {
            display_name: "This contract will terminate and the earnest money will be refunded to Buyer",
            databaseStored: "TERMINATE_CONTRACT"
          },
          {
            display_name: "Failure to obtain restoration approval will not delay closing",
            databaseStored: "NO_DELAY_CLOSING"
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
      }
    }
  },
  {
    unique_id: "buyer_signature",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_textfield_4",
        linked_dates: [
          {
            dateFieldName: "addendum_release_assumed_va_loan_liability_textfield_6"
          }
        ]
      }
    ],
    display_attributes: {
      display_name: "Buyer Signature",
      input_type: "signature",
      order: 8,
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
      isRequired: true,
      breakBefore: true
    }
  },
  {
    unique_id: "buyer_signature_date",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_textfield_6"
      }
    ],
    display_attributes: {
      display_name: "Date",
      input_type: "text",
      order: 9,
      width: 3,
      placeholder: "MM/DD/YYYY",
      validation: {
        loopback: [
          {
            regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            message: "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      },
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "seller_signature",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_textfield_5",
        linked_dates: [
          {
            dateFieldName: "addendum_release_assumed_va_loan_liability_textfield_7"
          }
        ]
      }
    ],
    display_attributes: {
      display_name: "Seller Signature",
      input_type: "signature",
      order: 10,
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },
  {
    unique_id: "seller_signature_date",
    pdf_attributes: [
      {
        formType: "addendum_release_assumed_va_loan_liability",
        formfield: "addendum_release_assumed_va_loan_liability_textfield_7"
      }
    ],
    display_attributes: {
      display_name: "Date",
      input_type: "text",
      order: 11,
      width: 3,
      placeholder: "MM/DD/YYYY",
      validation: {
        loopback: [
          {
            regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            message: "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      },
      value: {
        type: "manual"
      },
      isRequired: true
    }
  }
];