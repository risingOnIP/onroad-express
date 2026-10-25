import { SchemaItem } from "../../../../types/realtor";

export const addendumSaleOfOtherPropertyByBuyerSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "subject_property_address",
    pdf_attributes: [{
      formType: "addendum_sale_of_other_property_by_buyer",
      formfield: "addendum_sale_of_other_property_by_buyer_textfield_1"
    }],
    display_attributes: {
      display_name: "Subject Property Address",
      input_type: "text",
      description: "Address of the property covered by this contract",
      order: 1,

      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Details about the subject property",
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

  // Contingency Information Block
  {
    unique_id: "buyer_other_property_address",
    pdf_attributes: [{
      formType: "addendum_sale_of_other_property_by_buyer",
      formfield: "addendum_sale_of_other_property_by_buyer_textfield_2"
    }],
    display_attributes: {
      display_name: "Buyer's Other Property Address",
      input_type: "text",
      description: "Address of the property buyer must sell",
      order: 2,

      block: "contingency_information",
      block_style: {
        title: "Contingency Information",
        description: "Details about the property sale contingency",
        icon: "file-text",
        color_theme: "purple"
      },
      placeholder: "456 Other Street, City, State ZIP",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "contingency_date",
    pdf_attributes: [{
      formType: "addendum_sale_of_other_property_by_buyer",
      formfield: "addendum_sale_of_other_property_by_buyer_textfield_3"
    }],
    display_attributes: {
      display_name: "Contingency Date",
      input_type: "text",
      description: "Date by which buyer must receive proceeds from sale",
      order: 3,

      block: "contingency_information",
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
    unique_id: "contingency_year",
    pdf_attributes: [{
      formType: "addendum_sale_of_other_property_by_buyer",
      formfield: "addendum_sale_of_other_property_by_buyer_textfield_4"
    }],
    display_attributes: {
      display_name: "Contingency Year",
      input_type: "text",
      description: "Year of the contingency date",
      order: 4,

      block: "contingency_information",
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
      },
      isRequired: true
    }
  },

  // Financial Terms Block
  {
    unique_id: "waiver_deadline_days",
    pdf_attributes: [{
      formType: "addendum_sale_of_other_property_by_buyer",
      formfield: "addendum_sale_of_other_property_by_buyer_textfield_5"
    }],
    display_attributes: {
      display_name: "Days After Effective Date for Waiver",
      input_type: "text",
      description: "Number of days after effective date that buyer must waive contingency",
      order: 5,

      block: "financial_terms",
      block_style: {
        title: "Financial Terms",
        description: "Financial requirements for waiving contingency",
        icon: "dollar-sign",
        color_theme: "orange"
      },
      placeholder: "5",
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
      },
      isRequired: true
    }
  },
  {
    unique_id: "additional_earnest_money_amount",
    pdf_attributes: [{
      formType: "addendum_sale_of_other_property_by_buyer",
      formfield: "addendum_sale_of_other_property_by_buyer_textfield_6"
    }],
    display_attributes: {
      display_name: "Additional Earnest Money Amount",
      input_type: "text",
      description: "Additional earnest money required if buyer waives contingency",
      order: 6,

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
      },
      isRequired: true
    }
  },

  // Signatures Block
  {
    unique_id: "buyer_signature",
    pdf_attributes: [{
      formType: "addendum_sale_of_other_property_by_buyer",
      formfield: "addendum_sale_of_other_property_by_buyer_textfield_7",
      linked_dates: [{
        dateFieldName: "addendum_sale_of_other_property_by_buyer_textfield_8"
      }]
    }],
    display_attributes: {
      display_name: "Buyer Signature",
      input_type: "signature",
      description: "Signature of buyer",
      order: 7,

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
    unique_id: "seller_signature",
    pdf_attributes: [{
      formType: "addendum_sale_of_other_property_by_buyer",
      formfield: "addendum_sale_of_other_property_by_buyer_textfield_9",
      linked_dates: [{
        dateFieldName: "addendum_sale_of_other_property_by_buyer_textfield_10"
      }]
    }],
    display_attributes: {
      display_name: "Seller Signature",
      input_type: "signature",
      description: "Signature of seller",
      order: 8,

      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  }
];