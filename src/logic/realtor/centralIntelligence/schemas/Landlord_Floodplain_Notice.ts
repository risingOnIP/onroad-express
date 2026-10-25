import { Schema } from "../../../../types/realtor";

export const LANDLORD_FLOODPLAIN_NOTICE_SCHEMA: Schema = [
  {
    unique_id: "property_adress",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "property_adress",
      },
    ],
    display_attributes: {
      placeholder: "123 Main Street",
      display_name: "Property Address",
      description:
        "Complete address of the property covered by this floodplain notice",
      order: 1,
      input_type: "text",
      block: "Property Information",
      block_style: {
        title: "Property Information",
        description: "Basic property details for floodplain disclosure",
        icon: "Home",
        color_theme: "blue",
      },
      value: {
        type: "resolved",
        supabase: [
          {
            table: "deals",
            column: "dealName",
            eqBy: [
              {
                columnName: "id",
                variable: "dealId",
              },
            ],
          },
        ],
      },
      width: 12,
      isRequired: true,
      breakBefore: true,
    },
  },

  {
    unique_id: "agreement_a",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "agreement_a",
        linked_form_fields_radio: [
          { radioField: "yes", displayName: "Yes" },
          { radioField: "no", displayName: "No" },
        ],
      },
    ],
    display_attributes: {
      display_name: "Is the property located in a 100 year floodplain?",
      description:
        "Indicate whether this property is located within a designated 100-year floodplain area",
      order: 2,
      input_type: "radio",
      block: "Floodplain Disclosure",
      block_style: {
        title: "Floodplain Disclosure",
        description: "Required disclosures regarding flood risk and history",
        icon: "AlertCircle",
        color_theme: "orange",
      },
      value: { type: "manual" },
      width: 6,
      isRequired: true,
      breakBefore: true,
    },
  },

  {
    unique_id: "agreement_b",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "agreement_b",
        linked_form_fields_radio: [
          { radioField: "yes", displayName: "Yes" },
          { radioField: "no", displayName: "No" },
        ],
      },
    ],
    display_attributes: {
      display_name:
        "Has the property flooded at least once in the last 5 years?",
      description:
        "Disclosure of any flooding incidents that have occurred at this property within the past five years",
      order: 3,
      input_type: "radio",
      block: "Floodplain Disclosure",
      value: { type: "manual" },
      width: 6,
      isRequired: true,
    },
  },

  {
    unique_id: "landlord1_signature",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "landlord1_signature",
        linked_dates: [
          {
            dateFieldName: "landlord1_signed_date",
          },
        ],
      },
    ],
    display_attributes: {
      placeholder: "Enter landlord1",
      display_name: "Landlord 1 Signature",
      description:
        "Primary landlord signature acknowledging the floodplain disclosure",
      order: 4,
      input_type: "signature",
      block: "Landlord Signatures",
      block_style: {
        title: "Landlord Signatures",
        description:
          "Required landlord acknowledgments of floodplain disclosure",
        icon: "Users",
        color_theme: "green",
      },
      value: {
        type: "resolved",
        output: "SignatureInput__signer",
        supabase: [
          {
            table: "deals_parties",
            column: "party_email",
            eqBy: [
              {
                columnName: "deal_id",
                variable: "dealId",
              },
              {
                columnName: "partyNumber",
                hardCodedValue: "1",
              },
              {
                columnName: "party_role",
                hardCodedValue: "landlord",
              },
            ],
          },
        ],
      },
      width: 6,
      isRequired: true,
      breakBefore: true,
    },
  },

  {
    unique_id: "landlord1_signed_date",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "landlord1_signed_date",
      },
    ],
    display_attributes: {
      placeholder: "MM/DD/YYYY",
      display_name: "Landlord 1 Signed Date",
      description: "Date when landlord 1 signed the floodplain notice",
      order: 5,
      input_type: "text",
      block: "Landlord Signatures",
      value: { type: "manual" },
      width: 6,
      isHidden: true,
    },
  },

  {
    unique_id: "landlord2",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "landlord2",
        linked_dates: [
          {
            dateFieldName: "landlord2_signed_date",
          },
        ],
      },
    ],
    display_attributes: {
      display_name: "Landlord 2 Signature",
      description:
        "Second landlord signature (if applicable) acknowledging the floodplain disclosure",
      order: 6,
      input_type: "signature",
      block: "Landlord Signatures",
      value: {
        type: "resolved",
        output: "SignatureInput__signer",
        supabase: [
          {
            table: "deals_parties",
            column: "party_email",
            eqBy: [
              {
                columnName: "deal_id",
                variable: "dealId",
              },
              {
                columnName: "partyNumber",
                hardCodedValue: "2",
              },
              {
                columnName: "party_role",
                hardCodedValue: "landlord",
              },
            ],
          },
        ],
      },
      width: 6,
    },
  },

  {
    unique_id: "landlord2_signed_date",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "landlord2_signed_date",
      },
    ],
    display_attributes: {
      placeholder: "MM/DD/YYYY",
      display_name: "Landlord 2 Signed Date",
      description: "Date when landlord 2 signed the floodplain notice",
      order: 7,
      input_type: "text",
      block: "Landlord Signatures",
      value: { type: "manual" },
      width: 6,
      isHidden: true,
    },
  },

  {
    unique_id: "tenant1_signature",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "tenant1_signature",
        linked_dates: [
          {
            dateFieldName: "tenant1_signed_date",
          },
        ],
      },
    ],
    display_attributes: {
      display_name: "Tenant 1 Signature",
      description:
        "Primary tenant signature acknowledging receipt of floodplain disclosure",
      order: 8,
      input_type: "signature",
      block: "Tenant Signatures",
      block_style: {
        title: "Tenant Signatures",
        description:
          "Required tenant acknowledgments of floodplain disclosure receipt",
        icon: "Users",
        color_theme: "purple",
      },
      value: {
        type: "resolved",
        output: "SignatureInput__signer",
        supabase: [
          {
            table: "deals_parties",
            column: "party_email",
            eqBy: [
              {
                columnName: "deal_id",
                variable: "dealId",
              },
              {
                columnName: "partyNumber",
                hardCodedValue: "1",
              },
              {
                columnName: "party_role",
                hardCodedValue: "tenant",
              },
            ],
          },
        ],
      },
      width: 6,
      breakBefore: true,
    },
  },

  {
    unique_id: "tenant1_signed_date",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "tenant1_signed_date",
      },
    ],
    display_attributes: {
      display_name: "Tenant 1 Signed Date",
      description: "Date when tenant 1 signed the floodplain notice",
      order: 9,
      input_type: "text",
      block: "Tenant Signatures",
      value: { type: "manual" },
      width: 6,
      isHidden: true,
    },
  },

  {
    unique_id: "tenant2_signature",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "tenant2_signature",
        linked_dates: [
          {
            dateFieldName: "tenant2_signed_date",
          },
        ],
      },
    ],
    display_attributes: {
      display_name: "Tenant 2 Signature",
      description:
        "Second tenant signature (if applicable) acknowledging receipt of floodplain disclosure",
      order: 10,
      input_type: "signature",
      block: "Tenant Signatures",
      value: {
        type: "resolved",
        output: "SignatureInput__signer",
        supabase: [
          {
            table: "deals_parties",
            column: "party_email",
            eqBy: [
              {
                columnName: "deal_id",
                variable: "dealId",
              },
              {
                columnName: "partyNumber",
                hardCodedValue: "2",
              },
              {
                columnName: "party_role",
                hardCodedValue: "tenant",
              },
            ],
          },
        ],
      },
      width: 6,
      
    },
  },
//pushing
  {
    unique_id: "tenant2_signed_date",
    pdf_attributes: [
      {
        formType: "landlord_floodplain_notice",
        formfield: "tenant2_signed_date",
      },
    ],
    display_attributes: {
      placeholder: "MM/DD/YYYY",
      display_name: "Tenant 2 Signed Date",
      description: "Date when tenant 2 signed the floodplain notice",
      order: 11,
      input_type: "text",
      block: "Tenant Signatures",
      value: { type: "manual" },
      width: 6,
      isHidden: true,
    },
  },
];
