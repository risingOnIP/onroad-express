import { SchemaItem } from "../../../../types/realtor";

export const RESIDENTIAL_BUYER_TENANT_REPRESENTATION_AGREEMENT_LONG_FORM_SCHEMA: SchemaItem[] = [
    {
    unique_id: "buyer_tenant_clarification",
    pdf_attributes: [
      {
        formType: "",
        formfield: ""
      },
    ],
    display_attributes: {
      placeholder: "",
      display_name: "Residential Buyer Tenant Representation Agreement Long Form",
      description: "This is a contract where a buyer or renter agrees to work with one real estate agent to help them find a property to buy or lease. It explains what the agent will do, what the client is responsible for, and how the agent gets paid.",
      order: 1,
      input_type: "info",
    value: { type: "manual" },
      width: 12,
      }
  },

  {
    
    unique_id: "buyer_tenant_clarification",
    pdf_attributes: [
      {
        formType: "",
        formfield: ""
      },
    ],
    display_attributes: {
      placeholder: "",
      display_name: "",
      description: "The 'Client' in this agreement refers to the Buyer or Tenant",
      order: 2,
      input_type: "info",
      "block": "Parties Involved",
      "block_style": {
        "title": "Parties Involved",
        "description": "Enter the details for the client and the broker.",
        "icon": "Users",
        "color_theme": "purple"
      },
    value: { type: "manual" },
      width: 12,
      }
  },
    {
      "unique_id": "client_name",
      "display_attributes": {
        "display_name": "Client Name(s)",
        "input_type": "text",
        "description": "Full legal name of the client.",
        "order": 3,
        "block": "Parties Involved",
        "block_style": {
          "title": "Parties Involved",
          "description": "Enter the details for the client and the broker.",
          "icon": "Users",
          "color_theme": "blue"
        },
        "placeholder": "John Winston Smith",
        "width": 12,
        "isRequired": true,
        "value": {
          "type": "reserved",
          "reserved": "tenant_name_csv"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_name_1",
          "linked_form_fields_text": [
            "client_name_1", "client_name_cont_2"
          ]
        }
      ]
    },
    {
      "unique_id": "client_address",
      "display_attributes": {
        "display_name": "Client Address",
        "input_type": "text",
        "description": "Street address for the client.",
        "order": 4,
        "block": "Parties Involved",
        "placeholder": "123 Main St",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_address_street"
        }
      ]
    },
    {
      "unique_id": "client_city",
      "display_attributes": {
        "display_name": "Client's City, State, and Zipcode",
        "input_type": "text",
        "description": "City, State, and Zip code of residence for the client.",
        "order": 5,
        "block": "Parties Involved",
        "placeholder": "Dallas, Texas, 72312",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_address_city_state_zip"
        }
      ]
    },
    {
      "unique_id": "client_phone",
      "display_attributes": {
        "display_name": "Client Phone",
        "input_type": "text",
        "description": "Client's primary phone number.",
        "order": 6,
        "block": "Parties Involved",
        "placeholder": "(555) 555-5555",
        "width": 4,
        "isRequired": false,
        "value": {
          "type": "reserved",
          "reserved": "buyer/tenant_phone_number"
        
          
         // "attribute": {
         // "key": "client_phone",
          //"operation": (value: string | string[]) => value as string,
          //"reverseOperation": (value: string | string[]) => value as string
        //}
      },
    },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_phone_number"
        }
      ]
    },
    {
      "unique_id": "client_email",
      "display_attributes": {
        "display_name": "Client Email",
        "input_type": "text",
        "description": "Primary email for the client.",
        "order": 7,
        "block": "Parties Involved",
        "placeholder": "client@email.com",
        "width": 4,
        "isRequired": false,
        "value": {
          "type": "resolved",
          "output": "string",
          "supabase": [
            {
              "table": "deals_parties",
              "column": "party_email",
              "eqBy": [
                {
                  "columnName": "deal_id",
                  "variable": "dealId"
                },
                {
                  "columnName": "partyNumber",
                  "hardCodedValue": "1"
                },
                {
                  "columnName": "party_role",
                  "hardCodedValue": "tenant"
                }
              ]
            }
          ]
        },
        },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_email"
        }
      ]
    },
    {
      "unique_id": "field_1753917180701_6t0ce7ah6",
      "display_attributes": {
        "display_name": "Client Fax",
        "input_type": "text",
        "description": "Primary fax for the client.",
        "order": 8,
        "block": "Parties Involved",
        "placeholder": "212-9876543",
        "width": 4,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_fax"
        }
      ]
    },
    {
      "unique_id": "field_1753912928540_zvnqu8j91",
      "display_attributes": {
        "display_name": "Broker name",
        "input_type": "text",
        "order": 9,
        "width": 6,
        "isCached": true,
        "value": {
          "type": "manual"
        },
        "block": "Parties Involved",
        "description": "Full legal name of the broker.",
        "placeholder": "John Win Smith"
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_name_2"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_printed_name"
        }
      ]
    },
    {
      "unique_id": "broker_name",
      "display_attributes": {
        "display_name": "Broker Firm Name",
        "input_type": "text",
        "description": "Brokerage firm's full name.",
        "order": 10,
        "block": "Parties Involved",
        "placeholder": "Enter Brokerage Firm's Name",
        "width": 6,
        "isRequired": true,
        "isCached": true,
        "value": {
          "type": "manual"
        },
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_name_1"
        }
      ]
    },
    {
      "unique_id": "broker_address",
      "display_attributes": {
        "display_name": "Broker Address",
        "input_type": "text",
        "description": "Street address for the brokerage firm.",
        "order": 11,
        "block": "Parties Involved",
        "placeholder": "456 Broker Ave",
        "width": 6,
        "isRequired": true,
        "isCached": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_address_street"
        }
      ]
    },
    {
      "unique_id": "broker_city",
      "display_attributes": {
        "display_name": "Brokerage Firm's City, State, and Zip Code",
        "input_type": "text",
        "description": "City, State, and Zip code of the brokerage firm",
        "order": 12,
        "block": "Parties Involved",
        "placeholder": "Austin, Texas, 12345",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_address_city_state_zip"
        }
      ]
    },
    {
      "unique_id": "broker_phone",
      "display_attributes": {
        "display_name": "Broker Phone",
        "input_type": "text",
        "description": "Primary phone number for the broker.",
        "order": 13,
        "block": "Parties Involved",
        "placeholder": "(555) 555-5556",
        "width": 4,
        "isRequired": false,
        "value": {
          "type": "manual"
        },
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_phone_number"
        }
      ]
    },
    {
      "unique_id": "field_1753917728914_0xcfca2si",
      "display_attributes": {
        "display_name": "Broker Email",
        "input_type": "text",
        "description": "Primary email for the broker.",
        "order": 14,
        "block": "Parties Involved",
        "placeholder": "broker@email.com",
        "width": 4,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_email"
        }
      ]
    },
    {
      "unique_id": "broker_email",
      "display_attributes": {
        "display_name": "Broker Fax",
        "input_type": "text",
        "description": "Primary fax for the broker.",
        "order": 15,
        "block": "Parties Involved",
        "placeholder": "212-9876543",
        "width": 4,
        "isRequired": false,
        "value": {
          "type": "manual"
        },
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_fax"
        }
      ]
    },
    {
      "unique_id": "field_1753978110347_i17q7arko",
      "display_attributes": {
        "display_name": "Who Is This Agreement Between?",
        "input_type": "text",
        "order": 16,
        "width": 12,
        "value": {
          "type": "manual"
        },
        "block": "Parties Involved",
        "isRequired": true,
        "description": "Please list the participants of this agreement in this order: tenant and brokerage firm/broker name",
        "placeholder": "Tenant 1, tenant 2 and of brokerage firm/broker name",
        "visibleIf": []
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "agreement_parties_linked_1"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "agreement_parties_linked_2"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "agreement_parties_linked_3"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "agreement_parties_linked_4"
        }
      ]
    },
    {
      "unique_id": "market_area",
      "display_attributes": {
        "display_name": "Where is the client looking to purchase property?",
        "input_type": "text-area",
        "description": "Specify the area in Texas (e.g., property address, subdivision, city, county, zip code) where the client wants to purchase property.",
        "order": 17,
        "block": "Agreement Scope",
        "block_style": {
          "title": "Market Area & Agreement Term",
          "description": "Define the geographical area and the duration of this agreement.",
          "icon": "Map",
          "color_theme": "purple"
        },
        "placeholder": "e.g., Travis County, City of Austin",
        "width": 12,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "market_area_definition",
          "linked_form_fields_text": [
            "market_area_definition", "market_area_definition_cont_1", "market_area_definition_cont_2", "market_area_definition_cont_3"
          ]
        }
      ]
    },
    {
      "unique_id": "term_start_date",
      "display_attributes": {
        "display_name": "Agreement Start Date",
        "input_type": "text",
        "description": "The date this agreement begins.",
        "order": 18,
        "block": "Agreement Scope",
        "placeholder": "MM/DD/YYYY",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "agreement_start_date"
        }
      ]
    },
    {
      "unique_id": "term_end_date",
      "display_attributes": {
        "display_name": "Agreement End Date",
        "input_type": "text",
        "description": "The date this agreement ends at 11:59 p.m.",
        "order": 19,
        "block": "Agreement Scope",
        "placeholder": "MM/DD/YYYY",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "agreement_end_date"
        }
      ]
    },
    {
      "unique_id": "field_1754350279942_hkm7ncau0",
      "display_attributes": {
        "input_type": "checkbox",
        "order": 20,
        "width": 12,
        "value": {
          "type": "manual"
        },
        "block": "Broker Compensation",
        "checkbox_options": {
          "options": [
            {
              "display_name": "Commission for Purchase",
              "databaseStored": "1",
              "linkedFields": [
                "purchase_fee_percentage",
                "purchase_fee_flat"
              ]
            },
            {
              "display_name": "Commission for Lease",
              "databaseStored": "2",
              "linkedFields": [
                "lease_fee_one_month_rent_pct",
                "lease_fee_flat",
                "lease_fee_all_rents_pct"
              ]
            }
          ]
        },
        "special_input": {
          "checkbox": {
            "asRadio": true
          }
        },
        "display_name": "Is the Broker Being Compensated For a Purchase or Lease?"
      }
    },
    {
      "unique_id": "purchase_fee_percentage",
      "display_attributes": {
        "display_name": "Percentage of Sales Price",
        "input_type": "text",
        "order": 21,
        "block": "Broker Compensation",
        "block_style": {
          "title": "Broker Compensation",
          "description": "Detail the fees and compensation for the broker's services.",
          "icon": "DollarSign",
          "color_theme": "purple"
        },
        "placeholder": "Enter fee as a percentage of the sales price",
        "width": 6,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "purchase_commission_percent"
        }
      ]
    },
    {
      "unique_id": "purchase_fee_flat",
      "display_attributes": {
        "display_name": "Flat Amount",
        "input_type": "text",
        "order": 22,
        "block": "Broker Compensation",
        "placeholder": "Enter fee as a flat dollar amount",
        "width": 6,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "purchase_flat_fee_amount"
        }
      ]
    },
    {
      "unique_id": "lease_fee_one_month_rent_pct",
      "display_attributes": {
        "display_name": "Percentage of one month's rent",
        "input_type": "text",
        "order": 23,
        "block": "Broker Compensation",
        "placeholder": "Enter fee as a percentage of one month's rent.",
        "width": 4,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "lease_commission_percent"
        }
      ]
    },
    {
      "unique_id": "lease_fee_all_rents_pct",
      "display_attributes": {
        "display_name": "Percentage of all rents",
        "input_type": "text",
        "order": 24,
        "block": "Broker Compensation",
        "placeholder": "Enter fee as percent of all rents over the term",
        "width": 4,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "lease_rent_percent"
        }
      ]
    },
    {
      "unique_id": "lease_fee_flat",
      "display_attributes": {
        "display_name": "Flat Amount",
        "input_type": "text",
        "order": 25,
        "block": "Broker Compensation",
        "placeholder": "Enter fee as a flat dollar amount",
        "width": 4,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "lease_flat_fee_amount"
        }
      ]
    },
    {
      "unique_id": "construction_fee",
      "display_attributes": {
        "display_name": "Construction Compensation",
        "input_type": "text",
        "description": "Fee if Client uses Broker's services to find or negotiate the construction of improvements to the property. You can put \"N/A\" if this section is not applicable to you.",
        "order": 26,
        "block": "Broker Compensation",
        "placeholder": "Describe the fee structure for construction services.",
        "width": 12,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "referral_service_provider"
        }
      ]
    },
    {
      "unique_id": "field_1753918810389_367x4c1tw",
      "display_attributes": {
        "display_name": "What to Put For Other Compensation?",
        "input_type": "info",
        "order": 27,
        "width": 12,
        "value": {
          "type": "manual"
        },
        "block": "Broker Compensation",
        "description": "Only insert amounts or rates of compensation that are objectively\nascertainable and the specific amount or rate is known at the time of execution. Do not insert\nbonuses, a range of compensation, or terms such as “TBD”"
      }
    },
    {
      "unique_id": "field_1753918562948_gx6cif5r0",
      "display_attributes": {
        "display_name": "Other Compensation",
        "input_type": "text",
        "order": 28,
        "width": 12,
        "value": {
          "type": "manual"
        },
        "block": "Broker Compensation",
        "description": "Fee for other compensation, you can put \"N/A\" if this section is not applicable to you.",
        "placeholder": "Describe the amount of money owed"
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "additional_compensation",
          "linked_form_fields_text": [
            "additional_compensation", "additional_compensation_cont_2", "additional_compensation_cont_3"
          ]
        }
      ]
    },
    {
      "unique_id": "payment_county",
      "display_attributes": {
        "display_name": "Payment County",
        "input_type": "text",
        "description": "The Texas county where amounts payable to Broker in cash are paid.",
        "order": 29,
        "block": "Broker Compensation",
        "placeholder": "e.g., Travis",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "payment_county"
        }
      ]
    },
    {
      "unique_id": "protection_period",
      "display_attributes": {
        "display_name": "Protection Period (Days)",
        "input_type": "text",
        "description": "Number of days for the protection period after the agreement ends.",
        "order": 30,
        "block": "Broker Compensation",
        "placeholder": "e.g., 90",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "protection_period_days"
        }
      ]
    },
    {
      "unique_id": "benefit_provider",
      "display_attributes": {
        "display_name": "Third-Party Relocation Assistance",
        "input_type": "text",
        "description": "Name any employer, relocation company, or other entity that will provide benefits to Client when acquiring property in the market area. For example, Microsoft might pay you to relocate to Austin, Texas, so you can work for them. You would then put Microsoft here. You can put \"N/A\" if this section is not applicable to you.",
        "order": 31,
        "block": "Client Representations",
        "block_style": {
          "title": "Client Representations",
          "description": "Information regarding the client's status and benefits.",
          "icon": "Briefcase",
          "color_theme": "blue"
        },
        "placeholder": "e.g., ABC Corporation Relocation Services",
        "width": 12,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_financial_info"
        }
      ]
    },
    {
      "unique_id": "field_1753910852944_5ktxdszt6",
      "display_attributes": {
        "display_name": "What is Intermediary Status?",
        "input_type": "info",
        "order": 32,
        "width": 12,
        "value": {
          "type": "manual"
        },
        "description": "Intermediary Status is a legal practice that allows a single real estate brokerage firm to represent both the seller and the buyer in the same transaction. This situation arises when a buyer, represented by the brokerage, wishes to purchase a property that is also listed for sale by the same brokerage.",
        "block": "Intermediary Status"
      },
      "pdf_attributes": []
    },
    {
      "unique_id": "intermediary_status",
      "display_attributes": {
        "display_name": "Intermediary Status",
        "input_type": "checkbox",
        "description": "Select the client's preference regarding intermediary status.",
        "order": 33,
        "block": "Intermediary Status",
        "block_style": {
          "title": "Intermediary Status",
          "description": "Specify how to handle transactions where the broker represents both buyer and seller.",
          "icon": "GitMerge",
          "color_theme": "gray"
        },
        "width": 12,
        "isRequired": true,
        "value": {
          "type": "manual"
        },
        "special_input": {
          "checkbox": {
            "asRadio": true
          }
        },
        "checkbox_options": {
          "options": [
            {
              "display_name": "Allow the broker to show their listings to the clients",
              "databaseStored": "intermediary_status"
            },
            {
              "display_name": "Do not allow the broker to show their listings to the clients",
              "databaseStored": "no_intermediary_status"
            }
          ]
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "intermediary_status",
          "linked_form_fields_checkbox": [
            {
              "fromDatabase": "intermediary_status",
              "pdfAttribute": "intermediary_status"
            },
            {
              "fromDatabase": "no_intermediary_status",
              "pdfAttribute": "no_intermediary_status"
            }
          ]
        }
      ]
    },
    {
      "unique_id": "addenda_checkboxes",
      "display_attributes": {
        "display_name": "Addenda",
        "input_type": "checkbox",
        "description": "Select all applicable addenda that are part of this agreement.",
        "order": 34,
        "block": "Addenda & Provisions",
        "block_style": {
          "title": "Addenda & Special Provisions",
          "description": "Include any additional documents and special terms.",
          "icon": "FileText",
          "color_theme": "blue"
        },
        "width": 12,
        "checkbox_options": {
          "options": [
            {
              "display_name": "Information About Brokerage Services",
              "databaseStored": "info_about_brokerage_services"
            },
            {
              "display_name": "General Information and Notice to Buyers and Sellers",
              "databaseStored": "general_info_notice"
            },
            {
              "display_name": "Protect Your Family from Lead in Your Home",
              "databaseStored": "lead_in_home"
            },
            {
              "display_name": "Information about Special Flood Hazard Areas",
              "databaseStored": "flood_hazard_areas"
            },
            {
              "display_name": "For Your Protection: Get a Home Inspection",
              "databaseStored": "get_home_inspection"
            },
            {
              "display_name": "Wire Fraud Warning",
              "databaseStored": "wire_fraud_warning"
            },
            {
              "display_name": "Mold Remediation Consumer Protection",
              "databaseStored": "mold_remediation"
            },
            {
              "display_name": "Information Concerning Property Insurance",
              "databaseStored": "property_insurance_info"
            },
            {
              "display_name": "Additional Provisions To Agreement",
              "databaseStored": "Additional_Provisions"
            }
          ],
          "maxSelected": 9,
          "minSelected": 0
        },
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "",
          "linked_form_fields_checkbox": [
            {
              "fromDatabase": "info_about_brokerage_services",
              "pdfAttribute": "IABS_in_agreement_checkbox"
            },
            {
              "fromDatabase": "general_info_notice",
              "pdfAttribute": "General_Information_and_Notice_to_Buyers_and_Sellers_in_agreement_checkbox"
            },
            {
              "fromDatabase": "lead_in_home",
              "pdfAttribute": "Protect_Your_Family_From_Lead_in_Your_Home_in_agreement_checkbox"
            },
            {
              "fromDatabase": "flood_hazard_areas",
              "pdfAttribute": "Information_about_Special_Flood_Hazard_Areas_in_agreement_checkbox"
            },
            {
              "fromDatabase": "get_home_inspection",
              "pdfAttribute": "Get_a_home_inspection_in_agreement_checkbox"
            },
            {
              "fromDatabase": "wire_fraud_warning",
              "pdfAttribute": "Wire_Fraud_Warning_in_agreement_checkbox"
            },
            {
              "fromDatabase": "mold_remediation",
              "pdfAttribute": "Mold_Remediation_Consumer_Protection_in_agreement_checkbox"
            },
            {
              "fromDatabase": "property_insurance_info",
              "pdfAttribute": "Information_Concerning_Property_Insurance_in_agreement_checkbox"
            },
            {
              "fromDatabase": "Additional_Provisions",
              "pdfAttribute": "additional_provisions_in_agreement_checkbox"
            }
          ]
        }
      ]
    },
    {
      "unique_id": "field_1753916294334_scjs4og39",
      "display_attributes": {
        "display_name": "Other Related Documents",
        "input_type": "text",
        "order": 35,
        "width": 12,
        "value": {
          "type": "manual"
        },
        "description": "If you clicked \"additional provisions to agreement\" because there are other related documents that are part of the agreement, enter them here.",
        "block": "Addenda & Provisions",
        "placeholder": "Enter the related documents here.",
        "visibleIf": []
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "additional_provisions"
        }
      ]
    },
    {
      "unique_id": "special_provisions",
      "display_attributes": {
        "display_name": "Special Provisions",
        "input_type": "text-area",
        "description": "Include any special provisions or terms to this agreement.",
        "order": 36,
        "block": "Addenda & Provisions",
        "placeholder": "Enter any special provisions here.",
        "width": 12,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "special_provisions",
          "linked_form_fields_text": [
            "special_provisions_cont_1",
            "special_provisions_cont_2",
            "special_provisions_cont_3"
          ]
        }
      ]
    },
    {
      "unique_id": "field_1753920137981_hbqrpyzce",
      "display_attributes": {
        "display_name": "Is the Broker or the Broker's Associate Going to Sign",
        "input_type": "checkbox",
        "order": 37,
        "width": 12,
        "value": {
          "type": "manual"
        },
        "block": "Signatures",
        "checkbox_options": {
          "options": [
            {
              "display_name": "Broker Signature",
              "databaseStored": "broker_signature"
            },
            {
              "display_name": "Broker's Associate Signature",
              "databaseStored": "broker_associate_signature",
              "linkedFields": [
                "associate_printed_name",
                "associate_license_no"
              ]
            }
          ]
        },
        "special_input": {
          "checkbox": {
            "asRadio": true
          }
        },
        "isRequired": true
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "",
          "linked_form_fields_checkbox": [
            {
              "fromDatabase": "broker_signature",
              "pdfAttribute": "broker_signature"
            },
            {
              "fromDatabase": "broker_associate_signature",
              "pdfAttribute": "broker_associate_signature"
            }
          ]
        }
      ]
    },
    {
      "unique_id": "associate_printed_name",
      "display_attributes": {
        "display_name": "Broker's Associate's Printed Name",
        "input_type": "text",
        "description": "The printed name of the broker's associate, if applicable.",
        "order": 38,
        "block": "Signatures",
        "placeholder": "Associate's Full Name",
        "width": 6,
        "isRequired": false,
        "value": {
          "type": "manual"
        },
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_associate_printed_name"
        }
      ]
    },
    {
      "unique_id": "broker_license_no",
      "display_attributes": {
        "display_name": "Broker's License No.",
        "input_type": "text",
        "description": "The license number of the broker.",
        "order": 39,
        "block": "Signatures",
        "placeholder": "License Number",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_license_number"
        }
      ]
    },
    {
      "unique_id": "associate_license_no",
      "display_attributes": {
        "display_name": "Associate's License No.",
        "input_type": "text",
        "description": "The license number of the associate, if applicable.",
        "order": 40,
        "block": "Signatures",
        "placeholder": "License Number",
        "width": 6,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_associate_license_number"
        }
      ]
    },
    {
      "unique_id": "broker_signature",
      "display_attributes": {
        "display_name": "Broker or Broker's Associate's Signature ",
        "input_type": "signature",
        "description": "Electronic signature of the broker or bro ker's associate",
        "order": 41,
        "block": "Signatures",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        },
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker/associate_signature",
          "linked_dates": [
            {
              "dateFieldName": "broker/associate_signature_date"
            }
          ]
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_initials_linked_1"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_initials_linked_2"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_initials_linked_3"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "broker_initials_linked_4"
        }
      ]
    },
    {
      'unique_id': 'broker/associate_signature_date',
      'display_attributes': {
        'display_name': 'Broker Signature Date',
        'input_type': 'text',
        'order': 42,
        'block': 'Signatures',
        isHidden: true,
        value: {
          type: 'manual'
        }
      },
      'pdf_attributes': [
        {
          'formType': 'residential_buyer_tenant_representation_agreement_long_form',
          'formfield': 'broker/associate_signature_date'
        }
      ]
    },
    {
      "unique_id": "client1_printed_name",
      "display_attributes": {
        "display_name": "Client 1 Printed Name",
        "input_type": "text",
        "description": "The printed name of the first client.",
        "order": 43,
        "block": "Signatures",
        "placeholder": "Client 1 Full Name",
        "width": 6,
        "isRequired": true,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client1_printed_name"
        },
      ]
    },
    {
      "unique_id": "client1_signature",
      "display_attributes": {
        "display_name": "Client 1 Signature",
        "input_type": "signature",
        "description": "Electronic signature of client 1.",
        "order": 44,
        "block": "Signatures",
        "width": 6,
        "isRequired": true,
        "value": {
        "type": "resolved",
        "output": "SignatureInput__signer",
        "supabase": [
          {
            "table": "deals_parties",
            "column": "party_email",
            "eqBy": [
              {
                "columnName": "deal_id",
                "variable": "dealId"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "1"
              },
              {
                "columnName": "party_role",
                "hardCodedValue": "tenant"
              }
            ]
          },
          {
            "table": "deals_parties",
            "column": "party_email",
            "eqBy": [
              {
                "columnName": "deal_id",
                "variable": "dealId"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "1"
              },
              {
                "columnName": "party_role",
                "hardCodedValue": "buyer"
              }
            ]
          }
        ]
      },
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client1_signature",
          "linked_dates": [
            {
              "dateFieldName": "client1_signature_date"
            }
          ]
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_initials_linked_1"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_initials_linked_2"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_initials_linked_3"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client_initials_linked_4"
        }
      ]
    },
    {
      'unique_id': 'client1_signature_date',
      'display_attributes': {
        'display_name': 'Broker Signature Date',
        'input_type': 'text',
        'order': 45,
        'block': 'Signatures',
        isHidden: true,
        value: {
          type: 'manual'
        }
      
      },
      'pdf_attributes': [
        {
          'formType': 'residential_buyer_tenant_representation_agreement_long_form',
          'formfield': 'client1_signature_date'
        }
      ]
    },
    {
      "unique_id": "client2_printed_name",
      "display_attributes": {
        "display_name": "Client 2 Printed Name",
        "input_type": "text",
        "description": "The printed name of the second client, if applicable.",
        "order": 46,
        "block": "Signatures",
        "placeholder": "Client 2 Full Name",
        "width": 6,
        "isRequired": false,
        "value": {
          "type": "manual"
        }
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client2_printed_name"
        }
      ]
    },
    {
      "unique_id": "client2_signature",
      "display_attributes": {
        "display_name": "Client 2 Signature",
        "input_type": "signature",
        "description": "Electronic signature of client 2.",
        "order": 47,
        "block": "Signatures",
        "width": 6,
        "isRequired": false,
        "value": {
        "type": "resolved",
        "output": "SignatureInput__signer",
        "supabase": [
          {
            "table": "deals_parties",
            "column": "party_email",
            "eqBy": [
              {
                "columnName": "deal_id",
                "variable": "dealId"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "2"
              },
              {
                "columnName": "party_role",
                "hardCodedValue": "tenant"
              }
            ]
          },
          {
            "table": "deals_parties",
            "column": "party_email",
            "eqBy": [
              {
                "columnName": "deal_id",
                "variable": "dealId"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "2"
              },
              {
                "columnName": "party_role",
                "hardCodedValue": "buyer"
              }
            ]
          }
        ]
      },
      },
      "pdf_attributes": [
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client2_signature",
          "linked_dates": [
            {
              "dateFieldName": "client2_signature_date"
            }
          ]
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client2_initials_linked_1"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client2_initials_linked_2"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "client2_initials_linked_3"
        },
        {
          "formType": "residential_buyer_tenant_representation_agreement_long_form",
          "formfield": "page_number_linked_4"
        }
      ]
    },
    {
      'unique_id': 'client2_signature_date',
      'display_attributes': {
        'display_name': 'Broker Signature Date',
        'input_type': 'text',
        'order': 48,
        'block': 'Signatures',
        isHidden: true,
        value: {
          type: 'manual'
        }
      },
      'pdf_attributes': [
        {
          'formType': 'residential_buyer_tenant_representation_agreement_long_form',
          'formfield': 'client2_signature_date'
        }
      ]
    },
    {
      "unique_id": "field_1753913350728_nqeqzqeev",
      "display_attributes": {
        "display_name": "More Than Two Clients or Brokers",
        "input_type": "info",
        "order": 49,
        "width": 12,
        "value": {
          "type": "manual"
        },
        "block": "Signatures",
        "description": "If there are more than two clients or brokers involved with this agreement, you will need to click \"Convert to Custom Form\" to manually add the extra individuals to the contract PDF."
      }
    }
  ];