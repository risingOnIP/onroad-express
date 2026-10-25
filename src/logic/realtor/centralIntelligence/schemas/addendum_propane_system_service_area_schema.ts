import { SchemaItem } from "../../../../types/realtor";

export const addendumPropaneSystemServiceAreaSchema: SchemaItem[] = [
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "addendum_propane_system_service_area",
      formfield: "addendum_propane_system_service_area_textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Enter the complete street address and city of the property",
      order: 1,

      block: "Property Information",
      block_style: {
        title: "Property Information",
        description: "Details about the property subject to this addendum",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, Austin",
      width: 9,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "buyer_1_signature",
    pdf_attributes: [{
      formType: "addendum_propane_system_service_area",
      formfield: "addendum_propane_system_service_area_textfield_6",
      linked_dates: [
        { dateFieldName: "addendum_propane_system_service_area_textfield_2" }
      ]
    }],
    display_attributes: {
      display_name: "Buyer 1 Signature",
      input_type: "signature",
      description: "Signature of the first buyer",
      order: 2,
      block: "Signatures",
      block_style: {
        title: "Buyer Signatures",
        description: "All buyers must sign this addendum",
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
      formType: "addendum_propane_system_service_area",
      formfield: "addendum_propane_system_service_area_textfield_7",
      linked_dates: [
        { dateFieldName: "addendum_propane_system_service_area_textfield_4" }
      ]
    }],
    display_attributes: {
      display_name: "Buyer 2 Signature",
      input_type: "signature",
      description: "Signature of the second buyer (if applicable)",
      order: 3,
      block: "Signatures",
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
      formType: "addendum_propane_system_service_area",
      formfield: "addendum_propane_system_service_area_textfield_8",
      linked_dates: [
        { dateFieldName: "addendum_propane_system_service_area_textfield_3" }
      ]
    }],
    display_attributes: {
      display_name: "Seller 1 Signature",
      input_type: "signature",
      description: "Signature of the first seller",
      order: 4,
      block: "Seller Signatures",
      block_style: {
        title: "Seller Signatures",
        description: "All sellers must sign this addendum",
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
    unique_id: "seller_2_signature",
    pdf_attributes: [{
      formType: "addendum_propane_system_service_area",
      formfield: "addendum_propane_system_service_area_textfield_9",
      linked_dates: [
        { dateFieldName: "addendum_propane_system_service_area_textfield_5" }
      ]
    }],
    display_attributes: {
      display_name: "Seller 2 Signature",
      input_type: "signature",
      description: "Signature of the second seller (if applicable)",
      order: 5,
      block: "Seller Signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  }
];