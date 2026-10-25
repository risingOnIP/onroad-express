import { IndividualKnowledgeRuleSet } from "../../../../../../types/realtor";

export const SELL_IMPROVED_LAND_KNOWLEDGE: Record<
  string,
  IndividualKnowledgeRuleSet
> = {
  TX: {
    version: "1.0",
    requiredForms: [
      {
        formType: "IABS",
        placement: "deal-wide",
        form_stage: "listing_prep",
      },
    ],
    suggestions: [
      {
        message:
          "Advise seller to gather all documentation related to the improvements, such as permits and warranties.",
        showTo: "ai",
      },
    ],
    partyIntakeSchemas: {
      seller1_schema: [
        {
          mapping: [],
          unique_id: "seller1_full_name",
          display_attributes: {
            block: "Personal Information",
            order: 1,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Full Legal Name",
            placeholder: "Enter full legal name as it appears on deed",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "seller1_email",
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
          unique_id: "seller1_phone",
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
          unique_id: "seller1_address",
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
          unique_id: "seller1_property_ownership",
          display_attributes: {
            block: "Property Information",
            order: 5,
            value: { type: "manual" },
            input_type: "radio",
            display_name: "Property Ownership",
            display_radio_options: [
              "Sole Owner",
              "Joint Tenant",
              "Tenant in Common",
            ],
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "seller1_deed_available",
          display_attributes: {
            block: "Property Information",
            order: 6,
            value: { type: "manual" },
            input_type: "radio",
            display_name: "Deed Available",
            display_radio_options: ["Yes", "No"],
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "seller1_improvements_details",
          display_attributes: {
            block: "Property Information",
            order: 7,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Improvements Details",
            placeholder: "Describe existing buildings, structures, etc.",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "seller1_permits_available",
          display_attributes: {
            block: "Property Information",
            order: 8,
            value: { type: "manual" },
            input_type: "radio",
            display_name: "Building Permits Available",
            display_radio_options: ["Yes", "No"],
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "seller1_zoning_info",
          display_attributes: {
            block: "Property Information",
            order: 9,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Zoning Information",
            placeholder: "Current zoning designation",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "seller1_mortgage_balance",
          display_attributes: {
            block: "Financial Information",
            order: 10,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Remaining Mortgage Balance",
            placeholder: "Enter remaining mortgage balance",
            isRequired: true,
          },
        },
      ],
      seller2_schema: [
        {
          mapping: [],
          unique_id: "seller2_full_name",
          display_attributes: {
            block: "Personal Information",
            order: 1,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Full Legal Name",
            placeholder: "Enter full legal name as it appears on deed",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "seller2_email",
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
          unique_id: "seller2_phone",
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
      ],
    },
    availableForms: {
      deal_wide: [
        { formType: "IABS", preferredStage: "listing_prep" },
        {
          formType: "Third_party_financing",
          preferredStage: "listing_prep",
        },
        {
          formType: "landlord_floodplain_notice",
          preferredStage: "listing_prep",
        },
      ],
    },
    stages: [
      { name: "listing_prep", color: "#8B5CF6", order: 0 },
      { name: "active_listing", color: "#3B82F6", order: 1 },
      { name: "negotiation", color: "#F59E0B", order: 2 },
      { name: "closing", color: "#10B981", order: 3 },
    ],
  },
};
