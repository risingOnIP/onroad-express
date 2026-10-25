import { Schema } from "../../../../types/realtor";

export const IABS_SCHEMA: Schema = [
 {
   unique_id: "iabs_info",
  display_attributes: {
    display_name: "Information About Brokerage Services (IABS)",
    description: "This form provides important information about brokerage services and must be provided to prospective buyers, tenants, sellers and landlords at the first substantive communication about a specific property. This disclosure helps clients understand the various service relationships available in real estate transactions.",
    order: 1,
    input_type: "info",
    block_style: {
      title: "Information About Brokerage Services",
      description: "Important disclosure requirements for real estate transactions",
      icon: "Info",
      color_theme: "blue"
    },
    value: { type: "manual" },
    width: 12,
  },
},

  {
    unique_id: "broker_firm_name",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "broker_firm_name",
      },
    ],
    display_attributes: {
      placeholder: "ABC Real Estate Brokerage",
      display_name: "Broker Firm Name",
      description: "The legal name of the real estate brokerage firm as registered with the state licensing authority",
      order: 2,
      input_type: "text",
      block: "Broker Firm Information",
      block_style: {
        title: "Broker Firm Information",
        description: "Primary brokerage firm details and licensing information",
        icon: "Home",
        color_theme: "blue"
      },
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true,
    },
  },
  {
    unique_id: "broker_firm_license_number",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "broker_firm_license_number",
      },
    ],
    display_attributes: {
      placeholder: "12345678",
      display_name: "Broker Firm License Number",
      description: "State-issued license number for the brokerage firm \n",
      order: 3,
      input_type: "text",
      block: "Broker Firm Information",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true,
    },
  },
  {
    unique_id: "broker_firm_email",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "broker_firm_email",
      },
    ],
    display_attributes: {
      placeholder: "info@brokeragefirm.com",
      display_name: "Broker Firm Email",
      description: "Primary contact email for the brokerage firm",
      order: 4,
      input_type: "text",
      block: "Broker Firm Information",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true,
    },
  },
  {
    unique_id: "broker_firm_phone",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "broker_firm_phone",
      },
    ],
    display_attributes: {
      placeholder: "(555) 123-4567",
      display_name: "Broker Firm Phone",
      description: "Main business phone number with area code",
      
      order: 5,
      input_type: "text",
      block: "Broker Firm Information",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true,
    },
  },
  {
    unique_id: "designated_firm_broker",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "designated_firm_broker",
      },
    ],
    display_attributes: {
      placeholder: "Jane Smith",
      display_name: "Designated Firm Broker",
      description: "The licensed broker designated to supervise the brokerage firm's operations",
      
      order: 6,
      input_type: "text",
      block: "Designated Firm Broker",
      block_style: {
        title: "Designated Firm Broker",
        description: "Licensed broker responsible for supervising brokerage operations",
        icon: "Users",
        color_theme: "green"
      },
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true,
      breakBefore: true,
    },
  },
  {
    unique_id: "designated_firm_broker_license_number",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "designated_firm_broker_license_number",
      },
    ],
    display_attributes: {
      placeholder: "87654321",
      display_name: "License Number",
      description: "Individual broker license number issued by the state",
      
      order: 7,
      input_type: "text",
      block: "Designated Firm Broker",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true,
    },
  },
  {
    unique_id: "designated_firm_broker_email",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "designated_firm_broker_email",
      },
    ],
    display_attributes: {
      placeholder: "jane.smith@brokeragefirm.com",
      display_name: "Email Address",
      description: "Direct contact email for the designated broker",
      
      order: 8,
      input_type: "text",
      block: "Designated Firm Broker",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true
    },
  },
  {
    unique_id: "designated_firm_broker_phone",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "designated_firm_broker_phone",
      },
    ],
    display_attributes: {
      placeholder: "(555) 987-6543",
      display_name: "Phone Number",
      description: "Direct phone contact for the designated broker",
      
      order: 9,
      input_type: "text",
      block: "Designated Firm Broker",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true
    },
  },
  {
    unique_id: "sales_supervisor_name",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "sales_supervisor_name",
      },
    ],
    display_attributes: {
      placeholder: "Bob Wilson",
      display_name: "Sales Supervisor Name",
      description: "Licensed supervisor overseeing sales activities (if applicable)",
      
      order: 10,
      input_type: "text",
      block: "Sales Supervisor",
      block_style: {
        title: "Sales Supervisor",
        description: "Licensed supervisor for sales activities (when applicable)",
        icon: "CreditCard",
        color_theme: "purple"
      },
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: false,
      breakBefore: true,
    },
  },
  {
    unique_id: "sales_supervisor_license_number",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "sales_supervisor_license_number",
      },
    ],
    display_attributes: {
      placeholder: "23456789",
      display_name: "License Number",
      description: "State-issued license number for the sales supervisor",
      
      order: 11,
      input_type: "text",
      block: "Sales Supervisor",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true
    },
  },
  {
    unique_id: "sales_supervisor_email",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "sales_supervisor_email",
      },
    ],
    display_attributes: {
      placeholder: "bob.wilson@brokeragefirm.com",
      display_name: "Email Address",
      description: "Contact email for the sales supervisor",
      
      order: 12,
      input_type: "text",
      block: "Sales Supervisor",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true
    },
  },
  {
    unique_id: "sales_supervisor_phone",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "sales_supervisor_phone",
      },
    ],
    display_attributes: {
      placeholder: "(555) 555-5555",
      display_name: "Phone Number",
      description: "Direct contact number for the sales supervisor",
      
      order: 13,
      input_type: "text",
      block: "Sales Supervisor",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true
    },
  },
  {
    unique_id: "sales_agent_name",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "sales_agent_name",
      },
    ],
    display_attributes: {
      placeholder: "Mary Johnson",
      display_name: "Sales Agent Name",
      description: "Licensed agent handling this transaction",
      
      order: 14,
      input_type: "text",
      block: "Sales Agent",
      block_style: {
        title: "Sales Agent",
        description: "Licensed agent information for this transaction",
        icon: "Users",
        color_theme: "orange"
      },
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true,
      breakBefore: true,
    },
  },
  {
    unique_id: "sales_agent_license_number",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "sales_agent_license_number",
      },
    ],
    display_attributes: {
      placeholder: "34567890",
      display_name: "License Number",
      description: "State-issued license number for the sales agent",
      
      order: 15,
      input_type: "text",
      block: "Sales Agent",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true
    },
  },
  {
    unique_id: "sales_agent_email",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "sales_agent_email",
      },
    ],
    display_attributes: {
      placeholder: "mary.johnson@brokeragefirm.com",
      display_name: "Email Address",
      description: "Primary contact email for the sales agent",
      
      order: 16,
      input_type: "text",
      block: "Sales Agent",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true
    },
  },
  {
    unique_id: "sales_agent_phone",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "sales_agent_phone",
      },
    ],
    display_attributes: {
      placeholder: "(555) 123-9876",
      display_name: "Phone Number",
      description: "Direct contact number for the sales agent",
      
      order: 17,
      input_type: "text",
      block: "Sales Agent",
      value: { type: "manual" },
      width: 6,
      isCached: true,
      isRequired: true
    },
  },
  {
    unique_id: "signature_info",
    display_attributes: {
      display_name: "Required Signatures and Acknowledgment",
      description: "All parties to the transaction must initial below to acknowledge receipt of the Information About Brokerage Services. This confirms that the required disclosure has been provided and understood by all parties involved in the real estate transaction.",
      order: 18,
      input_type: "info",
      block: "Acknowledgment & Signatures",
      block_style: {
        title: "Acknowledgment & Signatures",
        description: "Required acknowledgment of brokerage service information receipt",
        icon: "FileText",
        color_theme: "gray"
      },
      value: { type: "manual" },
      width: 12,
      breakBefore: true,
    },
  },
  
  {
    unique_id: "buyer1_initials",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "buyer1_initials",
        linked_dates: [
          {
            dateFieldName: "date",
          },
        ],
      },
    ],
    display_attributes: {
      placeholder: "JD",
      display_name: "Buyer/Tenant 1 Initials",
      description: "Primary buyer or tenant must initial to acknowledge receipt of this disclosure",
      
      block: "Acknowledgment & Signatures",
      order: 19,
      input_type: "signature",
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
                hardCodedValue: "buyer",
              },
            ],
          },
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
    },
  },
  {
    unique_id: "buyer2_initials",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "buyer2_initials",
        linked_dates: [
          {
            dateFieldName: "date",
          },
        ],
      },
    ],
    display_attributes: {
      placeholder: "MS",
      display_name: "Buyer/Tenant 2 Initials",
      description: "Second buyer or tenant must initial (if applicable to this transaction)",
      
      block: "Acknowledgment & Signatures",
      order: 20,
      input_type: "signature",
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
                hardCodedValue: "buyer",
              },
            ],
          },
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
  {
    unique_id: "seller1_initials",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "seller1_initials",
        linked_dates: [
          {
            dateFieldName: "date",
          },
        ],
      },
    ],
    display_attributes: {
      placeholder: "RW",
      display_name: "Seller/Landlord 1 Initials",
      description: "Primary seller or landlord must initial to acknowledge receipt of this disclosure",
      
      block: "Acknowledgment & Signatures",
      order: 21,
      input_type: "signature",
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
                hardCodedValue: "seller",
              },
            ],
          },
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
    },
  },
  {
    unique_id: "seller2_initials",
    pdf_attributes: [
      {
        formType: "IABS",
        formfield: "seller2_initials",
        linked_dates: [
          {
            dateFieldName: "date",
          },
        ],
      },
    ],
    display_attributes: {
      placeholder: "KW",
      display_name: "Seller/Landlord 2 Initials",
      description: "Second seller or landlord must initial (if applicable to this transaction)",
      
      block: "Acknowledgment & Signatures",
      order: 22,
      input_type: "signature",
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
                hardCodedValue: "seller",
              },
            ],
          },

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
    unique_id: "date",
    pdf_attributes: [{ formType: "IABS", formfield: "date" }],
    display_attributes: {
      placeholder: "MM/DD/YYYY",
      display_name: "Date",
      description: "Date when this disclosure was provided (auto-filled when signatures are completed)",
      block: "Acknowledgment & Signatures",
      order: 23,
      input_type: "text",
      value: { type: "manual" },
      width: 3,
      visibleIf: [
        {
          unique_id: "buyer1_initials",
          operation: "==",
          valueChecked: "",
        },
        {
          unique_id: "buyer2_initials",
          operation: "==",
          valueChecked: "",
        },
        {
          unique_id: "seller1_initials",
          operation: "==",
          valueChecked: "",
        },
        {
          unique_id: "seller2_initials",
          operation: "==",
          valueChecked: "",
        },
      ],
    },
  },
];
