import { IndividualKnowledgeRuleSet } from "../../../../../../types/realtor";

export const BUY_UNIMPROVED_LAND_KNOWLEDGE: Record<
  string,
  IndividualKnowledgeRuleSet
> = {
  TX: {
    version: "1.0",
    requiredForms: [
      { formType: "IABS", placement: "deal-wide" },
      {
        formType: "landlord_floodplain_notice",
        placement: "property-specific",
        form_stage: "prospect",
      },
    ],
    suggestions: [
      {
        message:
          "Verify zoning regulations and availability of utilities (water, sewer, electricity) for the buyer's intended use.",
        showTo: "ai",
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
          unique_id: "buyer1_intended_use",
          display_attributes: {
            block: "Land Information",
            order: 5,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Intended Use of Land",
            placeholder: "Residential development, farming, recreation, etc.",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_zoning_requirements",
          display_attributes: {
            block: "Land Information",
            order: 6,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Zoning Requirements",
            placeholder: "Specific zoning needs or restrictions",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_utilities_needed",
          display_attributes: {
            block: "Land Information",
            order: 7,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Utilities Needed",
            placeholder:
              "List required utilities (Water, Sewer, Electricity, Gas, Internet/Cable)",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_financing_type",
          display_attributes: {
            block: "Financial Information",
            order: 8,
            value: { type: "manual" },
            input_type: "radio",
            display_name: "Financing Type",
            display_radio_options: [
              "Cash",
              "Land Loan",
              "Construction Loan",
              "Other",
            ],
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "buyer1_budget",
          display_attributes: {
            block: "Financial Information",
            order: 9,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Purchase Budget",
            placeholder: "Enter maximum purchase amount",
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
          unique_id: "buyer2_address",
          display_attributes: {
            block: "Contact Information",
            order: 4,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Current Address",
            placeholder: "Enter current mailing address",
            isRequired: false,
          },
        },
      ],
    },
    availableForms: {
      deal_wide: [{ formType: "IABS" }, { formType: "Third_party_financing" }],
      property_specific: [
        {
          formType: "landlord_floodplain_notice",
          preferredStage: "prospect",
        },
      ],
    },
    stages: [
      { name: "prospect", color: "#8B5CF6", order: 0 },
      { name: "offer", color: "#3B82F6", order: 1 },
      { name: "due_diligence", color: "#F59E0B", order: 2 },
      { name: "closing", color: "#10B981", order: 3 },
    ],
  },
};
