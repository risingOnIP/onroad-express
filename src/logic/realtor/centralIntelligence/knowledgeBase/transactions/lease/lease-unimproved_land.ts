import { IndividualKnowledgeRuleSet } from "../../../../../../types/realtor";

export const LEASE_UNIMPROVED_LAND_KNOWLEDGE: Record<
  string,
  IndividualKnowledgeRuleSet
> = {
  TX: {
    version: "1.0",
    requiredForms: [
      { formType: "IABS", placement: "deal-wide", form_stage: "listing" },
      {
        formType: "landlord_floodplain_notice",
        placement: "deal-wide",
        form_stage: "listing",
      },
      {
        formType: "Animal_Agreement",
        placement: "deal-wide",
        form_stage: "listing",
      },
    ],
    suggestions: [
      {
        message:
          "Ensure lease terms for unimproved land cover liability, permitted activities, and restoration requirements upon lease termination.",
        showTo: "ai",
      },
    ],
    partyIntakeSchemas: {
      seller1_schema: [
        {
          mapping: [],
          unique_id: "landlord1_full_name",
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
          unique_id: "landlord1_email",
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
          unique_id: "landlord1_phone",
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
          unique_id: "landlord1_address",
          display_attributes: {
            block: "Contact Information",
            order: 4,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Mailing Address",
            placeholder: "Enter mailing address",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_land_use_restrictions",
          display_attributes: {
            block: "Property Information",
            order: 5,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Land Use Restrictions",
            placeholder: "Specify permitted activities and restrictions",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_liability_terms",
          display_attributes: {
            block: "Property Information",
            order: 6,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Liability Terms",
            placeholder: "Specify liability and insurance requirements",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_lease_amount",
          display_attributes: {
            block: "Financial Information",
            order: 7,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Lease Amount",
            placeholder: "Enter lease amount per period",
            isRequired: true,
          },
        },
      ],
      seller2_schema: [
        {
          mapping: [],
          unique_id: "landlord2_full_name",
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
          unique_id: "landlord2_email",
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
          unique_id: "landlord2_phone",
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
        { formType: "IABS", preferredStage: "listing" },
        { formType: "Third_party_financing", preferredStage: "listing" },
        {
          formType: "landlord_floodplain_notice",
          preferredStage: "listing",
        },
      ],
      property_specific: [
        { formType: "Animal_Agreement", preferredStage: "application" },
      ],
    },
    stages: [
      { name: "listing", color: "#8B5CF6", order: 0 },
      { name: "tenant_review", color: "#3B82F6", order: 1 },
      { name: "lease_negotiation", color: "#F59E0B", order: 2 },
      { name: "execution", color: "#10B981", order: 3 },
    ],
  },
};
