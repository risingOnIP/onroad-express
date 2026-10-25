import { IndividualKnowledgeRuleSet } from "../../../../../../types/realtor";

export const RENT_UNIMPROVED_LAND_KNOWLEDGE: Record<
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
        form_stage: "application",
      },
      {
        formType: "Animal_Agreement",
        placement: "property-specific",
        form_stage: "application",
      },
    ],
    suggestions: [
      {
        message:
          "Clarify terms of land use, restrictions, and any included access rights in the rental agreement.",
        showTo: "user",
      },
    ],
    partyIntakeSchemas: {
      buyer1_schema: [
        {
          mapping: [],
          unique_id: "tenant1_full_name",
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
          unique_id: "tenant1_email",
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
          unique_id: "tenant1_phone",
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
          unique_id: "tenant1_address",
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
          unique_id: "tenant1_intended_use",
          display_attributes: {
            block: "Land Information",
            order: 5,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Intended Use of Land",
            placeholder: "Farming, recreation, storage, etc.",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "tenant1_lease_term",
          display_attributes: {
            block: "Lease Information",
            order: 6,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Desired Lease Term",
            placeholder: "Length of lease (months/years)",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "tenant1_references",
          display_attributes: {
            block: "Financial Information",
            order: 7,
            value: { type: "manual" },
            input_type: "text",
            display_name: "References",
            placeholder: "Previous landlord or character references",
            isRequired: true,
          },
        },
      ],
      buyer2_schema: [
        {
          mapping: [],
          unique_id: "tenant2_full_name",
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
          unique_id: "tenant2_email",
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
          unique_id: "tenant2_phone",
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
      deal_wide: [{ formType: "IABS" }, { formType: "Third_party_financing" }],
      property_specific: [
        {
          formType: "landlord_floodplain_notice",
          preferredStage: "application",
        },
        { formType: "Animal_Agreement", preferredStage: "application" },
      ],
    },
    stages: [
      { name: "application", color: "#8B5CF6", order: 0 },
      { name: "screening", color: "#3B82F6", order: 1 },
      { name: "lease_signing", color: "#F59E0B", order: 2 },
      { name: "move_in", color: "#10B981", order: 3 },
    ],
  },
};
