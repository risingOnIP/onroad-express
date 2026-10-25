import { IndividualKnowledgeRuleSet } from "../../../../../../types/realtor";

export const LEASE_COMMERCIAL_KNOWLEDGE: Record<
  string,
  IndividualKnowledgeRuleSet
> = {
  TX: {
    version: "1.0",
    requiredForms: [
      {
        formType: "IABS",
        placement: "deal-wide",
        form_stage: "initial_review",
      },
      {
        formType: "landlord_floodplain_notice",
        placement: "deal-wide",
        form_stage: "initial_review",
      },
      {
        formType: "Animal_Agreement",
        placement: "deal-wide",
        form_stage: "initial_review",
      },
    ],
    suggestions: [
      {
        message:
          "Clearly define the terms for Common Area Maintenance (CAM) charges in the lease agreement.",
        showTo: "ai",
      },
    ],
    partyIntakeSchemas: {
      seller1_schema: [
        {
          mapping: [],
          unique_id: "landlord1_business_name",
          display_attributes: {
            block: "Business Information",
            order: 1,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Business Name",
            placeholder: "Enter legal business name",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_business_type",
          display_attributes: {
            block: "Business Information",
            order: 2,
            value: { type: "manual" },
            input_type: "radio",
            display_name: "Business Type",
            display_radio_options: [
              "Corporation",
              "LLC",
              "Partnership",
              "Sole Proprietorship",
            ],
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_tax_id",
          display_attributes: {
            block: "Business Information",
            order: 3,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Tax ID/EIN",
            placeholder: "XX-XXXXXXX",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_authorized_representative",
          display_attributes: {
            block: "Contact Information",
            order: 4,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Authorized Representative",
            placeholder: "Full name of authorized signatory",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_email",
          display_attributes: {
            block: "Contact Information",
            order: 5,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Business Email",
            placeholder: "Enter business email address",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_phone",
          display_attributes: {
            block: "Contact Information",
            order: 6,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Business Phone",
            placeholder: "Enter business phone number",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_address",
          display_attributes: {
            block: "Contact Information",
            order: 7,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Business Address",
            placeholder: "Enter business mailing address",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_property_management",
          display_attributes: {
            block: "Property Information",
            order: 8,
            value: { type: "manual" },
            input_type: "radio",
            display_name: "Property Management",
            display_radio_options: [
              "Self-managed",
              "Property Manager",
              "Management Company",
            ],
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_base_rent",
          display_attributes: {
            block: "Financial Information",
            order: 9,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Base Rent Amount",
            placeholder: "Enter monthly base rent amount",
            isRequired: true,
          },
        },
        {
          mapping: [],
          unique_id: "landlord1_cam_charges",
          display_attributes: {
            block: "Financial Information",
            order: 10,
            value: { type: "manual" },
            input_type: "text",
            display_name: "CAM Charges",
            placeholder: "Common Area Maintenance charges",
            isRequired: true,
          },
        },
      ],
      seller2_schema: [
        {
          mapping: [],
          unique_id: "landlord2_business_name",
          display_attributes: {
            block: "Business Information",
            order: 1,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Business Name",
            placeholder: "Enter legal business name",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "landlord2_authorized_representative",
          display_attributes: {
            block: "Contact Information",
            order: 2,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Authorized Representative",
            placeholder: "Full name of authorized signatory",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "landlord2_email",
          display_attributes: {
            block: "Contact Information",
            order: 3,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Business Email",
            placeholder: "Enter business email address",
            isRequired: false,
          },
        },
        {
          mapping: [],
          unique_id: "landlord2_phone",
          display_attributes: {
            block: "Contact Information",
            order: 4,
            value: { type: "manual" },
            input_type: "text",
            display_name: "Business Phone",
            placeholder: "Enter business phone number",
            isRequired: false,
          },
        },
      ],
    },
    availableForms: {
      deal_wide: [
        { formType: "IABS", preferredStage: "initial_review" },
        {
          formType: "Third_party_financing",
          preferredStage: "initial_review",
        },
        {
          formType: "landlord_floodplain_notice",
          preferredStage: "initial_review",
        },
      ],
      property_specific: [
        { formType: "Animal_Agreement", preferredStage: "application" },
      ],
    },
    stages: [
      { name: "initial_review", color: "#8B5CF6", order: 0 },
      { name: "negotiation", color: "#F59E0B", order: 1 },
      { name: "execution", color: "#10B981", order: 2 },
    ],
  },
};
