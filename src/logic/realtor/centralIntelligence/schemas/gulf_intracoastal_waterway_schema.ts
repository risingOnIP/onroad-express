import { SchemaItem } from "../../../../types/realtor";

export const gulfIntracoastalWaterwaySchema: SchemaItem[] = [
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "gulf_intracoastal_waterway",
      formfield: "addendum_gulf_intracoastal_waterway__textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Address of the property subject to this addendum",
      order: 1,

      block: "Property Information",
      block_style: {
        title: "Property Information",
        description: "Property subject to Gulf Intracoastal Waterway disclosure",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, City, TX 12345",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "disclosure_notice_info",
    pdf_attributes: [],
    display_attributes: {
      display_name: "Gulf Intracoastal Waterway Disclosure Notice",
      input_type: "info",
      description: "DISCLOSURE NOTICE CONCERNING LEGAL AND ECONOMIC RISKS OF PURCHASING COASTAL REAL PROPERTY NEAR A BEACH\n\nThis addendum is required by Section 61.025 of the Texas Natural Resources Code for properties near the Gulf Intracoastal Waterway. It provides important information about potential risks associated with coastal properties.",
      order: 2,
      block: "Disclosure Information",
      block_style: {
        title: "Important Disclosure",
        description: "Legal notice required by Texas law",
        icon: "alert-triangle",
        color_theme: "orange"
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
  },
  {
    unique_id: "buyer_1_signature",
    pdf_attributes: [{
      formType: "gulf_intracoastal_waterway",
      formfield: "addendum_gulf_intracoastal_waterway__textfield_5"
    }],
    display_attributes: {
      display_name: "Buyer 1 Signature",
      input_type: "signature",
      description: "Signature of the first buyer acknowledging the disclosure",
      order: 3,
      block: "Buyer Acknowledgment",
      block_style: {
        title: "Buyer Signatures",
        description: "All buyers must acknowledge receipt of this disclosure",
        icon: "pen-tool",
        color_theme: "green"
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
      formType: "gulf_intracoastal_waterway",
      formfield: "addendum_gulf_intracoastal_waterway__textfield_2"
    }],
    display_attributes: {
      display_name: "Buyer 2 Signature",
      input_type: "signature",
      description: "Signature of the second buyer acknowledging the disclosure (if applicable)",
      order: 4,
      block: "Buyer Acknowledgment",
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
      formType: "gulf_intracoastal_waterway",
      formfield: "addendum_gulf_intracoastal_waterway__textfield_4"
    }],
    display_attributes: {
      display_name: "Seller 1 Signature",
      input_type: "signature",
      description: "Signature of the first seller providing the disclosure",
      order: 5,
      block: "Seller Acknowledgment",
      block_style: {
        title: "Seller Signatures",
        description: "All sellers must sign to confirm disclosure has been provided",
        icon: "pen-tool",
        color_theme: "purple"
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
      formType: "gulf_intracoastal_waterway",
      formfield: "addendum_gulf_intracoastal_waterway__textfield_3"
    }],
    display_attributes: {
      display_name: "Seller 2 Signature",
      input_type: "signature",
      description: "Signature of the second seller providing the disclosure (if applicable)",
      order: 6,
      block: "Seller Acknowledgment",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  }
];