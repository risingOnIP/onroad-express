import { IndividualKnowledgeRuleSet } from "../../../../../../types/realtor";

export const RENT_RESIDENTIAL_KNOWLEDGE: Record<
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
    conditionalForms: [
      {
        if: {
          unique_id: "property_in_100_year_floodplain",
          rule: "==",
          value: "true",
        },
        then: { formTypes: ["landlord_floodplain_notice"] },
      },
      {
        if: { unique_id: "pets_allowed", rule: "==", value: "true" },
        then: { formTypes: ["Animal_Agreement"] },
      },
    ],
    suggestions: [
      {
        message:
          "Strongly consider purchasing renter's insurance to protect your personal belongings.",
        showTo: "user",
      },
      {
        message:
          "Document the property's condition with photos upon move-in to ensure the return of your security deposit.",
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
          unique_id: "tenant1_current_address",
          display_attributes: {
            block: "Contact Information",
            order: 4,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Current Address",
            placeholder: "Enter current address",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "tenant1_ssn",
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
          unique_id: "tenant1_employment_status",
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
              "Student",
              "Retired",
            ],
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "tenant1_monthly_income",
          display_attributes: {
            block: "Financial Information",
            order: 7,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Monthly Income",
            placeholder: "Enter monthly income in USD",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "tenant1_emergency_contact",
          display_attributes: {
            block: "Emergency Information",
            order: 8,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Emergency Contact",
            placeholder: "Enter emergency contact name and phone",
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
        {
          mapping: [],
          unique_id: "tenant2_ssn",
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
