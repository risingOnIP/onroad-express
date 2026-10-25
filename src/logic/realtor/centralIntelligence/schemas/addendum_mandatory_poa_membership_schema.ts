import { SchemaItem } from "../../../../types/realtor";

export const addendumMandatoryPoaMembershipSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "addendum_mandatory_poa_membership",
      formfield: "addendum_mandatory_poa_membership_textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Street address and city of the property",
      order: 1,

      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Property and POA details",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, Anytown, TX",
      width: 9,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "poa_name_and_phone",
    pdf_attributes: [{
      formType: "addendum_mandatory_poa_membership",
      formfield: "addendum_mandatory_poa_membership_textfield_2"
    }],
    display_attributes: {
      display_name: "POA Name and Phone Number",
      input_type: "text",
      description: "Name of Property Owners Association and contact phone",
      order: 2,

      block: "property_information",
      placeholder: "Sunset Hills POA, (555) 123-4567",
      width: 9,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // Subdivision Information Block
  {
    unique_id: "subdivision_info_delivery_option",
    pdf_attributes: [{
      formType: "addendum_mandatory_poa_membership",
      formfield: "subdivision_info_delivery_option",
      linked_form_fields_checkbox: [
        { fromDatabase: "WITHIN_DAYS", pdfAttribute: "addendum_mandatory_poa_membership_checkbox_1" },
        { fromDatabase: "BUYER_OBTAINS", pdfAttribute: "addendum_mandatory_poa_membership_checkbox_2" },
        { fromDatabase: "BUYER_RECEIVED", pdfAttribute: "addendum_mandatory_poa_membership_checkbox_3" },
        { fromDatabase: "NOT_REQUIRED", pdfAttribute: "addendum_mandatory_poa_membership_checkbox_4" }
      ]
    }],
    display_attributes: {
      display_name: "Subdivision Information Delivery",
      input_type: "checkbox",
      description: "Select how subdivision information will be delivered",
      order: 3,
      block: "subdivision_information",
      block_style: {
        title: "Subdivision Information",
        description: "Delivery and requirements for subdivision documentation",
        icon: "file-text",
        color_theme: "green"
      },
      checkbox_options: {
        options: [
          { 
            display_name: "Seller will deliver within specified days", 
            databaseStored: "WITHIN_DAYS",
            linkedFields: ["seller_delivery_days"]
          },
          { 
            display_name: "Buyer will obtain within specified days", 
            databaseStored: "BUYER_OBTAINS",
            linkedFields: ["buyer_obtain_days"]
          },
          { 
            display_name: "Buyer has received and approved", 
            databaseStored: "BUYER_RECEIVED",
            linkedFields: ["buyer_resale_certificate_option"]
          },
          { 
            display_name: "Buyer does not require delivery", 
            databaseStored: "NOT_REQUIRED"
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
      },
      isRequired: true
    }
  },
  {
    unique_id: "seller_delivery_days",
    pdf_attributes: [{
      formType: "addendum_mandatory_poa_membership",
      formfield: "addendum_mandatory_poa_membership_textfield_3"
    }],
    display_attributes: {
      display_name: "Days for Seller Delivery",
      input_type: "text",
      description: "Number of days for seller to deliver subdivision information",
      order: 4,
      block: "subdivision_information",
      visibleIf: [{
        unique_id: "subdivision_info_delivery_option",
        operation: "contains",
        valueChecked: "WITHIN_DAYS"
      }],
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a valid number"
        }]
      },
      special_input: {
        text: {
          number: true
        }
      },
      placeholder: "7",
      width: 3,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "buyer_obtain_days",
    pdf_attributes: [{
      formType: "addendum_mandatory_poa_membership",
      formfield: "addendum_mandatory_poa_membership_textfield_4"
    }],
    display_attributes: {
      display_name: "Days for Buyer to Obtain",
      input_type: "text",
      description: "Number of days for buyer to obtain subdivision information",
      order: 5,
      block: "subdivision_information",
      visibleIf: [{
        unique_id: "subdivision_info_delivery_option",
        operation: "contains",
        valueChecked: "BUYER_OBTAINS"
      }],
      validation: {
        loopback: [{
          regex: "^\\d+$",
          message: "Must be a valid number"
        }]
      },
      special_input: {
        text: {
          number: true
        }
      },
      placeholder: "7",
      width: 3,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "buyer_resale_certificate_option",
    pdf_attributes: [{
      formType: "addendum_mandatory_poa_membership",
      formfield: "buyer_resale_certificate_option",
      linked_form_fields_checkbox: [
        { fromDatabase: "DOES_NOT_REQUIRE", pdfAttribute: "addendum_mandatory_poa_membership_checkbox_5" },
        { fromDatabase: "REQUIRES_UPDATE", pdfAttribute: "addendum_mandatory_poa_membership_checkbox_6" }
      ]
    }],
    display_attributes: {
      display_name: "Resale Certificate Requirement",
      input_type: "checkbox",
      description: "Buyer's requirement for updated resale certificate",
      order: 6,
      block: "subdivision_information",
      visibleIf: [{
        unique_id: "subdivision_info_delivery_option",
        operation: "contains",
        valueChecked: "BUYER_RECEIVED"
      }],
      checkbox_options: {
        options: [
          { 
            display_name: "Does not require updated resale certificate", 
            databaseStored: "DOES_NOT_REQUIRE"
          },
          { 
            display_name: "Requires updated resale certificate", 
            databaseStored: "REQUIRES_UPDATE"
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

  // Payment Responsibility Block
  {
    unique_id: "title_company_payment_responsibility",
    pdf_attributes: [{
      formType: "addendum_mandatory_poa_membership",
      formfield: "title_company_payment_responsibility",
      linked_form_fields_checkbox: [
        { fromDatabase: "SELLER_PAYS", pdfAttribute: "addendum_mandatory_poa_membership_checkbox_7" },
        { fromDatabase: "BUYER_PAYS", pdfAttribute: "addendum_mandatory_poa_membership_checkbox_8" }
      ]
    }],
    display_attributes: {
      display_name: "Title Company Payment Responsibility",
      input_type: "checkbox",
      description: "Who pays for title company information",
      order: 7,
      block: "payment_information",
      block_style: {
        title: "Payment Information",
        description: "Payment responsibilities for POA documentation",
        icon: "dollar-sign",
        color_theme: "orange"
      },
      checkbox_options: {
        options: [
          { 
            display_name: "Seller shall pay", 
            databaseStored: "SELLER_PAYS"
          },
          { 
            display_name: "Buyer shall pay", 
            databaseStored: "BUYER_PAYS"
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

  // Signatures Block
  {
    unique_id: "seller_signature",
    pdf_attributes: [{
      formType: "addendum_mandatory_poa_membership",
      formfield: "addendum_mandatory_poa_membership_textfield_5",
      linked_dates: [{ dateFieldName: "addendum_mandatory_poa_membership_textfield_6" }]
    }],
    display_attributes: {
      display_name: "Seller Signature",
      input_type: "signature",
      order: 8,
      block: "signatures",
      block_style: {
        title: "Signatures",
        description: "Agreement signatures",
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
    unique_id: "buyer_signature",
    pdf_attributes: [{
      formType: "addendum_mandatory_poa_membership",
      formfield: "addendum_mandatory_poa_membership_textfield_7",
      linked_dates: [{ dateFieldName: "addendum_mandatory_poa_membership_textfield_8" }]
    }],
    display_attributes: {
      display_name: "Buyer Signature",
      input_type: "signature",
      order: 9,
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