import { IndividualKnowledgeRuleSet } from "../../../../../../types/realtor";

export const BUY_RESIDENTIAL_KNOWLEDGE: Record<
  string,
  IndividualKnowledgeRuleSet
> = {
  TX: {
    version: "1.0",
    requiredForms: [
      { formType: "IABS", placement: "deal-wide" },
      { formType: "Third_party_financing", placement: "deal-wide" },
      { formType: "residential_lease_agreement", placement: "deal-wide" },
      {
        formType: "landlord_floodplain_notice",
        placement: "property-specific",
        form_stage: "discovery",
      },
    ],
    suggestions: [
      {
        message: "Advise the buyer to obtain a professional home inspection.",
        showTo: "ai",
      },
      {
        message:
          "Consider purchasing a residential service contract (home warranty).",
        showTo: "user",
      },
    ],
    partyIntakeSchemas: {
      buyer1_schema: [
        {
          mapping: [],
          unique_id: "buyer1_full_name",
          display_attributes: {
            block: "Personal Information",
            order: 1,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Full Legal Name",
            placeholder: "Enter full legal name as it appears on ID",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_email",
          display_attributes: {
            block: "Contact Information",
            order: 2,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Email Address",
            placeholder: "Enter email address",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_phone",
          display_attributes: {
            block: "Contact Information",
            order: 3,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Phone Number",
            placeholder: "Enter phone number",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_address",
          display_attributes: {
            block: "Contact Information",
            order: 4,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Current Address",
            placeholder: "Enter current mailing address",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_ssn",
          display_attributes: {
            block: "Financial Information",
            order: 5,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Social Security Number",
            placeholder: "XXX-XX-XXXX",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_employment_status",
          display_attributes: {
            block: "Financial Information",
            order: 6,
            value: { type: "manual" },
            input_type: "radio",
            display_name: "Employment Status",
            display_radio_options: [
              "Employed",
              "Self-employed",
              "Unemployed",
              "Retired",
            ],
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_annual_income",
          display_attributes: {
            block: "Financial Information",
            order: 7,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Annual Income",
            placeholder: "Enter annual income in USD",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_preapproved",
          display_attributes: {
            block: "Financial Information",
            order: 8,
            value: { type: "manual" },
            input_type: "radio",
            display_name: "Pre-approved for Mortgage",
            display_radio_options: ["Yes", "No"],
            isRequired: true,
          },
        },
      ],
      buyer2_schema: [
        {
          mapping: [],
          unique_id: "buyer2_full_name",
          display_attributes: {
            block: "Personal Information",
            order: 1,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Full Legal Name",
            placeholder: "Enter full legal name as it appears on ID",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "buyer2_email",
          display_attributes: {
            block: "Contact Information",
            order: 2,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Email Address",
            placeholder: "Enter email address",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "buyer2_phone",
          display_attributes: {
            block: "Contact Information",
            order: 3,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Phone Number",
            placeholder: "Enter phone number",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "buyer2_ssn",
          display_attributes: {
            block: "Financial Information",
            order: 4,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Social Security Number",
            placeholder: "XXX-XX-XXXX",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "buyer2_employment_status",
          display_attributes: {
            block: "Financial Information",
            order: 5,
            value: { type: "manual" },
            input_type: "radio",
            display_name: "Employment Status",
            display_radio_options: [
              "Employed",
              "Self-employed",
              "Unemployed",
              "Retired",
            ],
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "buyer2_annual_income",
          display_attributes: {
            block: "Financial Information",
            order: 6,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Annual Income",
            placeholder: "Enter annual income in USD",
            isRequired: false,
          },
        },
      ],
    },
    availableForms: {
      deal_wide: [
        { formType: "IABS" },
        { formType: "Third_party_financing" },
        { formType: "residential_lease" },
        { formType: "Animal_Agreement" },
        { formType: "residential_lease_extension" },
      ],
      property_specific: [
        { formType: "IABS", preferredStage: "discovery" },
        {
          formType: "landlord_floodplain_notice",
          preferredStage: "discovery",
        },
        { formType: "Animal_Agreement", preferredStage: "discovery" },
      ],
    },
    stages: [
      { name: "discovery", color: "#3B82F6", order: 0 },
      { name: "finalizing", color: "#F59E0B", order: 1 },
      { name: "closing", color: "#10B981", order: 2 },
    ],
  },
};
