import { SchemaItem } from "../../../../types/realtor";

export const addendumSection1031ExchangeSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "addendum_section_1031_exchange",
      formfield: "addendum_section_1031_exchange_textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Street address and city of the property",
      order: 1,

      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Property subject to 1031 exchange",
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

  // Exchange Party Selection Block
  {
    unique_id: "exchange_party",
    pdf_attributes: [{
      formType: "addendum_section_1031_exchange",
      formfield: "exchange_party",
      linked_form_fields_checkbox: [
        { fromDatabase: "SELLER", pdfAttribute: "addendum_section_1031_exchange_checkbox_1" },
        { fromDatabase: "BUYER", pdfAttribute: "addendum_section_1031_exchange_checkbox_2" }
      ]
    }],
    display_attributes: {
      display_name: "Exchange Party",
      input_type: "checkbox",
      description: "Select which party intends to use this property for a 1031 exchange",
      order: 2,

      block: "exchange_details",
      block_style: {
        title: "1031 Exchange Details",
        description: "Specify the party conducting the exchange",
        icon: "refresh-cw",
        color_theme: "green"
      },
      checkbox_options: {
        options: [
          { 
            display_name: "Seller", 
            databaseStored: "SELLER"
          },
          { 
            display_name: "Buyer", 
            databaseStored: "BUYER"
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
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // Signatures Block - Buyer 1
  {
    unique_id: "buyer_1_signature",
    pdf_attributes: [{
      formType: "addendum_section_1031_exchange",
      formfield: "addendum_section_1031_exchange_textfield_2",
      linked_dates: [{ dateFieldName: "addendum_section_1031_exchange_textfield_4" }]
    }],
    display_attributes: {
      display_name: "Buyer 1 Signature",
      input_type: "signature",
      description: "Signature of first buyer",
      order: 3,

      block: "signatures",
      block_style: {
        title: "Signatures",
        description: "All parties must sign this addendum",
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
    unique_id: "buyer_2_signature",
    pdf_attributes: [{
      formType: "addendum_section_1031_exchange",
      formfield: "addendum_section_1031_exchange_textfield_3",
      linked_dates: [{ dateFieldName: "addendum_section_1031_exchange_textfield_5" }]
    }],
    display_attributes: {
      display_name: "Buyer 2 Signature",
      input_type: "signature",
      description: "Signature of second buyer (if applicable)",
      order: 4,

      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },

  // Date fields are automatically populated via linked_dates, so we don't need separate schema items for them
  // The date fields (textfield_4 and textfield_5) will be filled automatically when signatures are captured
];