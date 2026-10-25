import { SchemaItem } from "../../../../types/realtor";

export const coastalAreaPropertySchema: SchemaItem[] = [
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "addendum_coastal_area_property",
      formfield: "addendum_coastal_area_property_textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Enter the complete address of the property subject to this addendum",
      order: 1,

      block: "Property Information",
      block_style: {
        title: "Property Information",
        description: "Details about the coastal area property",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Oceanview Drive, Galveston, TX 77550",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "prior_fill_exceptions",
    pdf_attributes: [{
      formType: "addendum_coastal_area_property",
      formfield: "addendum_coastal_area_property_textfield_2",
      linked_form_fields_text: [
        "addendum_coastal_area_property_textfield_3",
        "addendum_coastal_area_property_textfield_4"
      ]
    }],
    display_attributes: {
      display_name: "Prior Fill Exceptions",
      input_type: "text-area",
      description: "List any known prior fill as it relates to the property (if none, leave blank)",
      order: 2,

      block: "Property Disclosures",
      block_style: {
        title: "Property Disclosures",
        description: "Important disclosures regarding coastal area property",
        icon: "alert-triangle",
        color_theme: "orange"
      },
      placeholder: "Describe any known prior fill or leave blank if none",
      width: 12,
      value: {
        type: "manual"
      },
    }
  },
  {
    unique_id: "buyer_1_signature",
    pdf_attributes: [{
      formType: "addendum_coastal_area_property",
      formfield: "addendum_coastal_area_property_textfield_5",
      linked_dates: [
        { dateFieldName: "addendum_coastal_area_property_textfield_8" }
      ]
    }],
    display_attributes: {
      display_name: "Buyer 1 Signature",
      input_type: "signature",
      description: "Signature of the first buyer",
      order: 3,
      block: "Buyer Signatures",
      block_style: {
        title: "Buyer Signatures",
        description: "All buyers must sign and date this addendum",
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
      formType: "addendum_coastal_area_property",
      formfield: "addendum_coastal_area_property_textfield_6",
      linked_dates: [
        { dateFieldName: "addendum_coastal_area_property_textfield_7" }
      ]
    }],
    display_attributes: {
      display_name: "Buyer 2 Signature",
      input_type: "signature",
      description: "Signature of the second buyer (if applicable)",
      order: 4,
      block: "Buyer Signatures",
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
      formType: "addendum_coastal_area_property",
      formfield: "addendum_coastal_area_property_textfield_6",
      linked_dates: [
        { dateFieldName: "addendum_coastal_area_property_textfield_7" }
      ]
    }],
    display_attributes: {
      display_name: "Seller 1 Signature",
      input_type: "signature",
      description: "Signature of the first seller",
      order: 5,
      block: "Seller Signatures",
      block_style: {
        title: "Seller Signatures",
        description: "All sellers must sign and date this addendum",
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
      formType: "addendum_coastal_area_property",
      formfield: "addendum_coastal_area_property_textfield_5",
      linked_dates: [
        { dateFieldName: "addendum_coastal_area_property_textfield_8" }
      ]
    }],
    display_attributes: {
      display_name: "Seller 2 Signature",
      input_type: "signature",
      description: "Signature of the second seller (if applicable)",
      order: 6,
      block: "Seller Signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },
  {
    unique_id: "coastal_area_notice",
    pdf_attributes: [],
    display_attributes: {
      display_name: "Important Notice",
      input_type: "info",
      description: "State law prohibits the use, encumbrance, construction, or placing of any structure in, on, or over state-owned submerged lands below the applicable tide line, without proper permission. This addendum provides notice to buyers regarding coastal area properties and any known prior fill.",
      order: 7,
      block: "Legal Notice",
      block_style: {
        title: "Legal Notice",
        description: "Important information about coastal area property regulations",
        icon: "info",
        color_theme: "purple"
      },
      width: 12,
      value: {
        type: "manual"
      },
      special_input: {
        info: {
          style: "warning",
          icon: true,
          minimizable: true
        }
      }
    }
  }
];