import { IndividualKnowledgeRuleSet } from "../../../../../../types/realtor";
import { LANDLORD_INTAKE_FORM } from "../../../../centralIntelligence/defaultResidentialLeaseLandlordIntake";

export const LEASE_RESIDENTIAL_KNOWLEDGE: Record<
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
      {
        formType: "residential_lease_agreement",
        placement: "deal-wide",
        form_stage: "listing",
      },
    ],
    availableForms: {
      deal_wide: [
        { formType: "IABS", preferredStage: "listing" },
        {
          formType: "landlord_floodplain_notice",
          preferredStage: "listing",
        },
        { formType: "Animal_Agreement", preferredStage: "listing" },

        {
          formType: "residential_lease_agreement",
          preferredStage: "listing",
        },
        {
          formType: "residential_lease_extension",
          preferredStage: "listing",
        },
        {
          formType: "early_termination_of_residential_lease",
          preferredStage: "listing",
        },
        {
          formType:
            "residential_buyer_tenant_representation_agreement_long_form",
          preferredStage: "listing",
        },
        {
          formType: "residential_exclusive_right_to_lease",
          preferredStage: "listing",
        },
      ],
    },
    stages: [
      { name: "listing", color: "#8B5CF6", order: 0 },
      { name: "tenant_review", color: "#3B82F6", order: 1 },
      { name: "lease_negotiation", color: "#F59E0B", order: 2 },
      { name: "execution", color: "#10B981", order: 3 },
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
          "Perform a comprehensive background and credit check on all prospective tenants.",
        showTo: "user",
      },
      {
        message:
          "Confirm all smoke detectors are functional before the tenant moves in.",
        showTo: "ai",
      },
    ],
    partyIntakeSchemas: {
      seller1_schema: LANDLORD_INTAKE_FORM,
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
  },
};
