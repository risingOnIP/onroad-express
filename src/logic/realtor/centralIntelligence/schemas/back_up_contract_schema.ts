import { SchemaItem } from "../../../../types/realtor";

export const backUpContractSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_1"
    }, {
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_13"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Full address of the property",
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

  // Financial Terms Block
  {
    unique_id: "additional_earnest_money",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_2"
    }],
    display_attributes: {
      display_name: "Additional Earnest Money",
      input_type: "text",
      description: "Amount of additional earnest money to be delivered",
      order: 2,

      block: "financial_terms",
      block_style: {
        title: "Financial Terms",
        description: "Financial details of the back-up contract",
        icon: "dollar-sign",
        color_theme: "orange"
      },
      placeholder: "$0.00",
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
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: "earnest_money_delivery_days",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_3"
    }],
    display_attributes: {
      display_name: "Days to Deliver Earnest Money",
      input_type: "text",
      description: "Number of days after effective date to deliver earnest money",
      order: 3,

      block: "financial_terms",
      placeholder: "3",
      width: 4,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a number"
        }]
      },
      special_input: {
        text: {
          number: true
        }
      }
    }
  },
  {
    unique_id: "additional_option_fee",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_4"
    }],
    display_attributes: {
      display_name: "Additional Option Fee",
      input_type: "text",
      description: "Amount of additional option fee",
      order: 4,

      block: "financial_terms",
      placeholder: "$0.00",
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
        text: {
          currency: true
        }
      }
    }
  },

  // Contract Dates Block
  {
    unique_id: "first_contract_date",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_5"
    }],
    display_attributes: {
      display_name: "First Contract Date",
      input_type: "text",
      description: "Date of the first contract",
      order: 5,

      block: "contract_dates",
      block_style: {
        title: "Contract Dates",
        description: "Important dates for the back-up contract",
        icon: "calendar",
        color_theme: "green"
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
        text: {
          date: true
        }
      },
      isRequired: true
    }
  },
  {
    unique_id: "first_contract_year",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_6"
    }],
    display_attributes: {
      display_name: "First Contract Year",
      input_type: "text",
      description: "Year of the first contract",
      order: 6,

      block: "contract_dates",
      placeholder: "20XX",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^20\\d{2}$",
          message: "Must be a valid year (20XX)"
        }]
      },
      special_input: {
        text: {
          number: true
        }
      }
    }
  },
  {
    unique_id: "termination_deadline_date",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_7"
    }],
    display_attributes: {
      display_name: "Termination Deadline",
      input_type: "text",
      description: "Date by which the first contract must terminate",
      order: 7,

      block: "contract_dates",
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
        text: {
          date: true
        }
      },
      isRequired: true
    }
  },
  {
    unique_id: "termination_deadline_year",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_8"
    }],
    display_attributes: {
      display_name: "Termination Deadline Year",
      input_type: "text",
      description: "Year of termination deadline",
      order: 8,

      block: "contract_dates",
      placeholder: "20XX",
      width: 3,
      value: {
        type: "manual"
      },
      validation: {
        loopback: [{
          regex: "^20\\d{2}$",
          message: "Must be a valid year (20XX)"
        }]
      },
      special_input: {
        text: {
          number: true
        }
      }
    }
  },

  // Signatures Block - Page 1
  {
    unique_id: "buyer_initials_signature",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: ["addendum_back_up_contract_textfield_9", "addendum_back_up_contract_textfield_10"]
    }],
    display_attributes: {
      display_name: "Buyer Initials & Signature",
      input_type: "signature",
      description: "Buyer's initials for page 1",
      order: 9,

      block: "signatures_page_1",
      block_style: {
        title: "Page 1 Signatures",
        description: "Initials for identification on page 1",
        icon: "pen-tool",
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
      formType: "back_up_contract",
      formfield: ["addendum_back_up_contract_textfield_11", "addendum_back_up_contract_textfield_12"]
    }],
    display_attributes: {
      display_name: "Seller Initials & Signature",
      input_type: "signature",
      description: "Seller's initials for page 1",
      order: 10,

      block: "signatures_page_1",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
    }
  },

  // Final Signatures Block - Page 2
  {
    unique_id: "buyer_final_signature",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_14"
    }],
    display_attributes: {
      display_name: "Buyer Signature",
      input_type: "signature",
      description: "Buyer's final signature",
      order: 11,

      block: "final_signatures",
      block_style: {
        title: "Final Signatures",
        description: "Complete the back-up contract addendum",
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
    unique_id: "seller_final_signature",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_15"
    }],
    display_attributes: {
      display_name: "Seller Signature",
      input_type: "signature",
      description: "Seller's final signature",
      order: 12,

      block: "final_signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },
  {
    unique_id: "buyer_printed_name",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_16"
    }],
    display_attributes: {
      display_name: "Buyer Printed Name",
      input_type: "text",
      description: "Buyer's printed name",
      order: 13,

      block: "final_signatures",
      placeholder: "John Doe",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "seller_printed_name",
    pdf_attributes: [{
      formType: "back_up_contract",
      formfield: "addendum_back_up_contract_textfield_17"
    }],
    display_attributes: {
      display_name: "Seller Printed Name",
      input_type: "text",
      description: "Seller's printed name",
      order: 14,

      block: "final_signatures",
      placeholder: "Jane Smith",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  }
];