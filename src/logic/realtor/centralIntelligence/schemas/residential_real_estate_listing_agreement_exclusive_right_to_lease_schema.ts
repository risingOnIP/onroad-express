import { SchemaItem } from "../../../../types/realtor";

export const residentialRealEstateListingAgreementExclusiveRightToLeaseSchema: SchemaItem[] =
  [
    {
      unique_id: "field_1754082016059_q8ip14ez8",
      display_attributes: {
        display_name:
          "RESIDENTIAL REAL ESTATE LISTING AGREEMENT EXCLUSIVE RIGHT TO LEASE",
        input_type: "info",
        order: 1,
        width: 12,
        value: {
          type: "manual",
        },
        description:
          "This is the contract where a property owner gives a licensed real estate broker the exclusive right to market and lease their residential property. During the agreement term, only that broker can earn a commission, even if the owner finds a tenant independently.",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_1",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_1",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_2",
          ],
        },
      ],
      display_attributes: {
        display_name: "Landlord(s) Full Name",
        description: "",

        order: 2,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "Users",
          color_theme: "green",
        },
        width: 12,
        placeholder: "Enter full name of the landlord",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "reserved",
          reserved: "landlord_name_csv"
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_33",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_3",
        },
      ],
      display_attributes: {
        display_name: "Landlord Street Address",

        order: 3,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 12,
        placeholder: "Enter the landlord's street address",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_34",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_4",
        },
      ],
      display_attributes: {
        display_name: "Landlord City, State, and Zip Code",

        order: 4,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 12,
        placeholder: "Enter City, State, and Zip Code",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_35",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_5",
        },
      ],
      display_attributes: {
        display_name: "Landlord Home Phone",

        order: 5,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 6,
        special_input: {
          text: {
            phone: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "reserved",
          reserved: "landlord_phone_number"
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_36",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_6",
        },
      ],
      display_attributes: {
        display_name: "Landlord Mobile Phone",

        order: 6,
        block: "Parties Information",
        width: 6,
        special_input: {
          text: {
            phone: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "reserved",
          reserved: "landlord_phone_number"
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_37",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_7",
        },
      ],
      display_attributes: {

        order: 7,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 12,
        placeholder: "landlord@email.com",
        isCached: false,
        isRequired: true,
        input_type: "text",
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
                  "hardCodedValue": "landlord"
                }
              ]
            },
          ]
        },
          display_name: "Landlord Email/Fax Number",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_2",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_8",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_8",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_9",
          ],
        },
      ],
      display_attributes: {
        display_name: "Broker Firm Name and Broker Name",
        description: "Include both the Broker Firm name and the Broker name",

        order: 8,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 12,
        isCached: false,
        isRequired: true,
        input_type: "text-area",
        value: {
          type: "manual",
        },
        placeholder: "Example Firm, John Doe",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_38",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_10",
        },
      ],
      display_attributes: {
        display_name: "Broker's Address",

        order: 9,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 6,
        placeholder: "Enter the Brokers Address",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_39",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_11",
        },
      ],
      display_attributes: {
        display_name: "Broker City, State, and Zip Code",

        order: 10,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 6,
        placeholder: "Enter City, State, and Zip Code",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_40",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_12",
        },
      ],
      display_attributes: {
        display_name: "Broker Home Phone Number",

        order: 11,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 6,
        special_input: {
          text: {
            phone: true,
          },
        },
        isCached: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_41",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_13",
        },
      ],
      display_attributes: {
        display_name: "Broker Mobile Phone Number",

        order: 12,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 6,
        special_input: {
          text: {
            phone: true,
          },
        },
        isCached: true,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_42",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_14",
        },
      ],
      display_attributes: {
        display_name: "Broker Contact Information - E-Mail/Fax Number",

        order: 13,
        block: "Parties Information",
        block_style: {
          title: "Parties Information",
          icon: "user",
          color_theme: "green",
        },
        width: 12,
        placeholder: "broker@email.com",
        isCached: true,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_43",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_16",
        },
      ],
      display_attributes: {

        order: 14,
        block: "Property Details",
        block_style: {
          title: "Property Details",
          icon: "Home",
          color_theme: "blue",
        },
        width: 3,
        placeholder: "7",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
        display_name: "Land Lot",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_44",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_18",
        },
      ],
      display_attributes: {
        display_name: "Block",

        order: 15,
        block: "Property Details",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 3,
        placeholder: "B",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_3",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_15",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_15",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_17",
          ],
        },
      ],
      display_attributes: {
        display_name: "Addition",

        order: 16,
        block: "Property Details",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        placeholder: "Oakridge Estates",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_45",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_19",
        },
      ],
      display_attributes: {
        display_name: "City",

        order: 17,
        block: "Property Details",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 5,
        placeholder: "Plano",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_46",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_20",
        },
      ],
      display_attributes: {
        display_name: "County",

        order: 18,
        block: "Property Details",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 7,
        placeholder: "Collin",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_32",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_36",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_58",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_71",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_78",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_83",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_89",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_104",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_108",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_131",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_161",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_22",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_21",
          ],
        },
      ],
      display_attributes: {
        display_name: "Address",

        order: 19,
        block: "Property Details",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "1234 Example Rd, Plano TX, 75023",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_4",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_23",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_24",
          ],
        },
      ],
      display_attributes: {
        display_name: "Detachable Property Items",
        description:
          "The Property will be marketed with the following non-real estate items. (List included items not attached to the property like furniture, curtains, washing machines, etc.)",

        order: 20,
        block: "Property Details",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "List non-real estate items here...",
        isCached: false,
        isRequired: true,
        input_type: "text-area",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_5",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_25",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_26",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_27",
          ],
        },
      ],
      display_attributes: {
        display_name: "Items taken by Landlord",
        description:
          "Include any Items not attached to the property that the landlord will remove",

        order: 21,
        block: "Property Details",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "List any items the Landlord will take with them here...",
        isCached: false,
        isRequired: true,
        input_type: "text-area",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_49",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_28",
        },
      ],
      display_attributes: {
        display_name: "Monthly Rental Price for Property Listing",

        order: 22,
        block: "Listing Information",
        block_style: {
          title: "Listing Information",
          icon: "home",
          color_theme: "purple",
        },
        width: 12,
        placeholder: "1500",
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_51",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_30",
        },
      ],
      display_attributes: {
        display_name: "Minimum Lease Term Duration (Months)",

        order: 23,
        block: "Listing Information",
        block_style: {
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        placeholder: "4",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_52",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_31",
        },
      ],
      display_attributes: {
        display_name: "Listing Term Start Date",

        order: 24,
        block: "Listing Information",
        block_style: {
          title: "Listing Information",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        placeholder: "MM/DD/YYYY",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_53",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_32",
        },
      ],
      display_attributes: {
        display_name: "Listing Term End Date",
        order: 25,
        block: "Listing Information",
        block_style: {
          title: "Listing Information",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
        placeholder: "MM/DD/YYYY",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_50",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_29",
        },
      ],
      display_attributes: {
        display_name: "Maximum Lease Term Duration (Months)",

        order: 26,
        block: "Listing Information",
        block_style: {
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        placeholder: "14",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_13",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_12",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_12",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_12",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_13",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_13",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Broker Filing Instructions for Listing Services",

        order: 27,
        block: "Listing Information",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 1,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name:
                "Broker will file this Listing with one or more Multiple Listing Services (MLS)",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_12",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_14",
              ],
            },
            {
              display_name:
                "Broker will not file this Listing with any Multiple Listing Services (MLS)",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_13",
            },
          ],
          minSelected: 1,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_14",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_14",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_14",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_14",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_15",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_15",
            },
          ],
        },
      ],
      display_attributes: {

        order: 28,
        block: "Listing Information",
        block_style: {
          title: "Listing Services",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 1,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name:
                "Within MLS requirement or 5 days of the listing date",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_14",
            },
            {
              display_name: "A set number of days after the listing date",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_15",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_82",
                "estate_listing_agreement_exclusive_right_to_lease_15",
              ],
            },
          ],
          minSelected: 1,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_82",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_72",
        },
      ],
      display_attributes: {
        display_name: "Days to Wait",

        order: 29,
        block: "Listing Information",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 3,
        placeholder: "Days",
        isCached: false,
        isRequired: true,
        input_type: "text",
        checkbox_options: {
          options: [
            {
              display_name: "Broker will file this Listing with MLS",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_12",
            },
            {
              display_name:
                "Landlord instructs Broker not to file this Listing until specified days",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_13",
            },
          ],
          minSelected: 1,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_18",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1010",
          linked_form_fields_checkbox: [
            {
              fromDatabase:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1010",
              pdfAttribute:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1010",
            },
            {
              fromDatabase:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1011",
              pdfAttribute:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1011",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Does the Landlord Restrict",

        order: 30,
        block: "Listing Information",
        block_style: {
          title: "Listing Information",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 2,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Displaying this Listing on the Internet",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1010",
            },
            {
              display_name:
                "Displaying the Address of this Listing on the Internet",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1011",
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_17",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_18",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_18",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_18",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_19",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_19",
            },
          ],
        },
      ],
      display_attributes: {
        display_name:
          "Can the Broker show the Property to Tenants or Buyers they represent?",

        order: 31,
        block: "Listing Information",
        block_style: {
          title: "Parties Information",
          icon: "green",
          color_theme: "green",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 2,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Allowed",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_18",
            },
            {
              display_name: "Not Allowed",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_19",
            },
          ],
          minSelected: 1,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_15",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_73",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_73",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_74",
          ],
        },
      ],
      display_attributes: {
        display_name: "Reason for Waiting",

        order: 32,
        block: "Listing Information",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "green",
        },
        width: 9,
        placeholder: "Enter details regarding the delay",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      display_attributes: {
        display_name: "Will the other Broker be Compensated?",
        input_type: "checkbox",
        order: 33,
        width: 12,
        value: {
          type: "manual",
        },
        block: "Broker Compensation",
        block_style: {
          title: "Broker Compensation",
          color_theme: "orange",
          icon: "CreditCard",
        },
        checkbox_options: {
          options: [
            {
              display_name: "Yes",
              databaseStored: "yes",
              linkedFields: ["other_broker"],
            },
            {
              display_name: "No",
              databaseStored: "no",
            },
          ],
        },
        special_input: {
          checkbox: {
            horizontal: 2,
            asRadio: true,
          },
        },
      },
      unique_id: "will_the_other_broker_be_compensated",
    },
    {
      unique_id: "field_1754002316222_fsq4w1le4",
      display_attributes: {
        input_type: "text",
        order: 34,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            percentage: true,
          },
        },
        placeholder: "15",
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_49",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_47",
        },
      ],
    },
    {
      unique_id: "field_1754002378402_9se7j451u",
      display_attributes: {
        input_type: "text",
        order: 35,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            percentage: true,
          },
        },
        placeholder: "15",
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_50",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_49",
        },
      ],
    },
    {
      unique_id: "field_1754002410097_hs1qduxop",
      display_attributes: {
        input_type: "text",
        order: 36,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            currency: true,
          },
        },
        placeholder: "1000",
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_51",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_51",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_51",
          ],
        },
      ],
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_8",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_56",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_56",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_56",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_55",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_55",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_54",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_54",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Broker Payment Fee Option-is a subagent",

        order: 37,
        block: "Broker Compensation",
        block_style: {
          title: "Broker Compensation",
          icon: "user",
          color_theme: "green",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 3,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name:
                "Percentage of One Month's Rent to be Paid Under a Lease",
              databaseStored:
                "PERCENTAGE_OF_ONE_MONTHS_RENT_TO_BE_PAID_UNDER_A_LEASE",
              linkedFields: ["field_1754002316222_fsq4w1le4"],
            },
            {
              display_name: "Percentage of All Rents to be Paid Under a Lease",
              databaseStored:
                "PERCENTAGE_OF_ALL_RENTS_TO_BE_PAID_UNDER_A_LEASE",
              linkedFields: ["field_1754002378402_9se7j451u"],
            },
            {
              display_name: "A Flat Fee",
              databaseStored: "A_FLAT_FEE",
              linkedFields: ["field_1754002410097_hs1qduxop"],
            },
          ],
          minSelected: 1,
        },
        value: {
          type: "manual",
        },
        visibleIf: [
          {
            unique_id: "other_broker",
            operation: "contains",
            valueChecked: "subagent",
          },
        ],
      },
    },
    {
      unique_id: "other_broker",
      display_attributes: {
        input_type: "checkbox",
        order: 38,
        width: 12,
        value: {
          type: "manual",
        },
        block: "Broker Compensation",
        checkbox_options: {
          options: [
            {
              display_name: "Represents Tenant",
              databaseStored: "represents_tenant",
            },
            {
              display_name: "Is a Subagent",
              databaseStored: "subagent",
            },
          ],
        },
        special_input: {
          checkbox: {
            horizontal: 2,
          },
        },
        display_name: "Other broker",
        visibleIf: [],
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_7",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_53",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_53",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_53",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_52",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_52",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_51",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_51",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Brokers Payment Fee Options-Represents Tenant",

        order: 39,
        block: "Broker Compensation",
        block_style: {
          title: "Broker Compensation",
          icon: "user",
          color_theme: "green",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 3,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Percentage of One Month's Rent",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_51",
              linkedFields: ["field_1754001525242_nscozs4xg"],
            },
            {
              display_name: "A Percentage of all Months' Rent",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_52",
              linkedFields: ["field_1754001669326_r1lyask58"],
            },
            {
              display_name: "A flat fee ",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_53",
              linkedFields: ["field_1754001732994_234p2qahe"],
            },
          ],
          minSelected: 1,
        },
        value: {
          type: "manual",
        },
        visibleIf: [
          {
            unique_id: "other_broker",
            operation: "contains",
            valueChecked: "represents_tenant",
          },
        ],
      },
    },
    {
      unique_id: "field_1754001669326_r1lyask58",
      display_attributes: {
        input_type: "text",
        order: 40,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            percentage: true,
          },
        },
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_42",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_43",
        },
      ],
    },
    {
      unique_id: "field_1754001732994_234p2qahe",
      display_attributes: {
        input_type: "text",
        order: 41,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            currency: true,
          },
        },
        display_name: "flat fee value",
      },
      pdf_attributes: [
        {
          formType: "",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_45",
        },
      ],
    },
    {
      unique_id: "field_1754001525242_nscozs4xg",
      display_attributes: {
        input_type: "text",
        order: 42,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            percentage: true,
          },
        },
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_41",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_41",
        },
      ],
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_6",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_2",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_2",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_3",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_3",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Broker's Fee Payment Options",

        order: 43,
        block: "Broker Compensation",
        block_style: {
          title: "Broker Compensation",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 3,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Percentage of one full month's rent",
              databaseStored: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_57",
              ],
            },
            {
              display_name: "Percentage of all rents",
              databaseStored: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_2",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_58",
              ],
            },
            {
              display_name: "Flat Fee",
              databaseStored: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_3",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_59",
              ],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
        visibleIf: [
          {
            unique_id: "will_the_other_broker_be_compensated",
            operation: "contains",
            valueChecked: "yes",
          },
        ],
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_58",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_38",
        },
      ],
      display_attributes: {

        order: 44,
        block: "Broker Compensation",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        isRequired: true,
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_57",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_37",
        },
      ],
      display_attributes: {

        order: 45,
        block: "Broker Compensation",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Enter percentage",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_59",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_39",
        },
      ],
      display_attributes: {

        order: 46,
        block: "Broker Compensation",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_9",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_4",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_4",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_4",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_5",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_5",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_6",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_6",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Broker's Fee Payment Options",

        order: 47,
        block: "Broker Compensation",
        block_style: {
          title: "Broker Compensation",
          icon: "user",
          color_theme: "green",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 3,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Percentage of One Full Month's Rent",
              databaseStored: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_4",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_66",
              ],
            },
            {
              display_name: "Percentage of All Rents",
              databaseStored: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_5",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_67",
              ],
            },
            {
              display_name: "Flat Fee",
              databaseStored: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_6",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_68",
              ],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
        visibleIf: [
          {
            unique_id: "will_the_other_broker_be_compensated",
            operation: "contains",
            valueChecked: "no",
          },
        ],
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_68",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_54",
        },
      ],
      display_attributes: {

        order: 48,
        block: "Broker Compensation",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Insert amount to be paid to Broker",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_67",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_53",
        },
      ],
      display_attributes: {

        order: 49,
        block: "Broker Compensation",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Enter percentage",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_66",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_52",
        },
      ],
      display_attributes: {

        order: 50,
        block: "Broker Compensation",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Enter percentage",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_72",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_59",
        },
      ],
      display_attributes: {

        order: 51,
        block_style: {
          title: "Other Compensation",
        },
        width: 12,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
        block: "Broker Compensation",
        placeholder: "Enter percentage",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_10",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_7",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_7",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_7",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_8",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_8",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_9",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_9",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Compensation For Lease Renewal",

        order: 52,
        block: "Broker Compensation",
        block_style: {
          title: "Other Compensation",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 3,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Percentage of one full month's rent",
              databaseStored: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_7",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_72",
              ],
            },
            {
              display_name: "Percentage of all rents",
              databaseStored: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_8",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_73",
              ],
            },
            {
              display_name: "Flat Fee",
              databaseStored: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_9",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_74",
              ],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_73",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_60",
        },
      ],
      display_attributes: {

        order: 53,
        block: "Broker Compensation",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
        placeholder: "Enter percentage",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_74",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_61",
        },
      ],
      display_attributes: {

        order: 54,
        block: "Broker Compensation",
        block_style: {
          title: "Other Compensation",
        },
        width: 12,
        placeholder: "Enter Amount",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_11",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_10",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_10",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_10",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_11",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_11",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Compensation In Case of Sale",

        order: 55,
        block: "Broker Compensation",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 2,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Percentage of Sales Price",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_10",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_75",
              ],
            },
            {
              display_name: "Flat Fee",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_11",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_76",
              ],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_75",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_62",
        },
      ],
      display_attributes: {

        order: 56,
        block: "Broker Compensation",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "purple",
        },
        width: 12,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
        placeholder: "Enter percentage",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_77",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_64",
        },
      ],
      display_attributes: {
        display_name: "Reimbursable Expenses Details",

        order: 57,
        block: "Broker Compensation",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "orange",
        },
        width: 12,
        placeholder: "Enter reimbursable expenses",
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "field_1753957677046_ep0xofqa5",
      display_attributes: {
        display_name: "Protection Period",
        input_type: "info",
        order: 58,
        width: 12,
        value: {
          type: "manual",
        },
        block: "Broker Compensation",
        special_input: {
          info: {
            style: "default",
            icon: true,
          },
        },
        description:
          "The protection period is extra time after the listing ends where the broker can still earn a fee if the landlord leases or sells to someone the broker found during the listing. It only applies if the broker gives written notice of those people within 10 days.",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_78",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_65",
        },
      ],
      display_attributes: {
        display_name: "Protection Period",

        order: 59,
        block: "Broker Compensation",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 3,
        placeholder: "Number of Days",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_12",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_66",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_66",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_67",
          ],
        },
      ],
      display_attributes: {
        display_name: "Broker Payment Reception Address",

        order: 60,
        block: "Broker Compensation",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "green",
        },
        width: 9,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
        placeholder: "1234 Main St, Plano, 75023, Collin",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_76",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_63",
        },
      ],
      display_attributes: {

        order: 61,
        block: "Broker Compensation",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_86",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_79",
        },
      ],
      display_attributes: {
        display_name:
          "Companies Allowed to Schedule Appointments and Authorize Access to Property",
        description:
          "The broker may authorize others to enter the property at reasonable to facilitate the showing and lease of the property",

        order: 62,
        block: "Property Access",
        block_style: {
          title: "Property Access",
          icon: "home",
          color_theme: "gray",
        },
        width: 12,
        placeholder: "Company A, Company B",
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_16",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_16",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_16",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_16",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_17",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_17",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Keybox Authorization Options",

        order: 63,
        block: "Property Access",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 2,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name:
                "Broker is authorized to place a keybox on the Property",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_16",
            },
            {
              display_name:
                "Broker is not authorized to place a keybox on the Property",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_17",
            },
          ],
          minSelected: 1,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_19",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_20",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_20",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_20",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_21",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_21",
            },
          ],
        },
      ],
      display_attributes: {
        display_name:
          "Is the broker authorized to make repairs/alterations to the property",

        order: 64,
        block: "Repairs",
        block_style: {
          title: "Repairs",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 2,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Yes",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_21",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_93",
                "estate_listing_agreement_exclusive_right_to_lease_20",
              ],
            },
            {
              display_name: "No",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_20",
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_132",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_145",
        },
      ],
      display_attributes: {
        display_name: "Emergency Repair Contact Information",

        order: 65,
        block: "Repairs",
        block_style: {
          title: "Repairs",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_133",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_146",
        },
      ],
      display_attributes: {
        display_name: "Appliances or Items that will not be repaired",

        order: 66,
        block_style: {
          title: "Repairs",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        block: "Repairs",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_93",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_90",
        },
      ],
      display_attributes: {

        order: 67,
        block: "Repairs",
        block_style: {
          title: "Repairs",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "1000",
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
        display_name: "Maximum Repair Cost",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_20",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_22",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_22",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_22",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_23",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_23",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Landlord Will",

        order: 68,
        block_style: {
          title: "Repairs",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 1,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name:
                "Pay the contractors directly and pay Broker a service fee",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_22",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_95",
              ],
            },
            {
              display_name:
                "Reimburse Broker for any costs and pay a service fee",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_23",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_96",
              ],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
        block: "Repairs",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_95",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_92",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_92",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_91",
          ],
        },
      ],
      display_attributes: {

        order: 69,
        block: "Repairs",
        block_style: {
          title: "Repairs",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Service Fee",
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_96",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_93",
        },
      ],
      display_attributes: {

        order: 70,
        block: "Repairs",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Service Fee",
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_97",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_94",
        },
      ],
      display_attributes: {
        display_name: "Outstanding Property Loans and Fees",

        order: 71,
        block: "Property Loans and Fees",
        block_style: {
          title: "Property Loans and Fees",
          icon: "CreditCard",
          color_theme: "green",
        },
        width: 12,
        placeholder: "Specify any outstanding payments related to the payments",
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        description:
          "Is the Landlord behind on any mortgages, HOA dues, property taxes, or other loans related to the property?",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_98",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_9500",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_9500",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_95",
          ],
        },
      ],
      display_attributes: {
        display_name: "Legal claims or debts tied to the property",
        description:
          "Does the landlord know of any existing legal claims or debts tied to the property",

        order: 72,
        block: "Property Loans and Fees",
        block_style: {
          title: "Property Loans and Fees",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder:
          "Specify any known legal claims or debts tied to the property",
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_21",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_96",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_96",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_97",
          ],
        },
      ],
      display_attributes: {
        display_name:
          "List any optional fees to use shared areas (like pools or clubhouses)",

        order: 73,
        block: "Property Loans and Fees",
        block_style: {
          title: "Property Loans and Fees",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Specify any optional fees to use shared areas",
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_22",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_98",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_98",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_99",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_100",
          ],
        },
      ],
      display_attributes: {
        display_name: "List any known safety or health hazards on the property",

        order: 74,
        block: "Property Loans and Fees",
        block_style: {
          title: "Property Loans and Fees",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder:
          "Describe any known safety or health hazards on the property",
        isCached: false,
        isRequired: true,
        input_type: "text-area",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_23",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_24",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_24",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_24",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_25",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_25",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_26",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_26",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_27",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_27",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_28",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_28",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_29",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_29",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_30",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_30",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_31",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_31",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_32",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_32",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_49",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_49",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_50",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_50",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_48",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_48",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Required Addenda and Documents for Landlord",

        order: 75,
        block: "Addenda and Other Documents",
        block_style: {
          title: "Addenda and Other Documents",
          icon: "None",
          color_theme: "gray",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 3,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Information About Brokerage Services",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_48",
            },
            {
              display_name: "Addendum Regarding Rental Flood Disclosure",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_50",
            },
            {
              display_name: "Addendum Regarding Lead-Based Paint",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_49",
            },
            {
              display_name:
                "Request for Information from an Owners' Association",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_24",
            },
            {
              display_name: "Information about Special Flood Hazard Areas",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_25",
            },
            {
              display_name: "Condominium Addendum to Listing",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_26",
            },
            {
              display_name: "Keybox Authorization by Tenant",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_27",
            },
            {
              display_name: "Information about On-Site Sewer Facility",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_28",
            },
            {
              display_name: "IRS Forms (W-9 or W-8)",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_29",
            },
            {
              display_name:
                "Owner's Authorization Concerning Unescorted Access to Property",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_30",
            },
            {
              display_name:
                "General Information for Landlord Regarding Assistance Animals",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_31",
            },
            {
              display_name: "Other Addenda",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_32",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_105",
              ],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_105",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_111",
        },
      ],
      display_attributes: {

        order: 76,
        block: "Addenda and Other Documents",
        block_style: {
          title: "Addenda and Other Documents",
          icon: "None",
          color_theme: "gray",
        },
        width: 12,
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        placeholder: "Additional Addenda",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_24",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_33",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_33",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_33",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_34",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_34",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Rent Due Date",

        order: 77,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 2,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "First Day of Month",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_33",
            },
            {
              display_name: "Other Day",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_34",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_106",
              ],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_106",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_112",
        },
      ],
      display_attributes: {

        order: 78,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "5th",
        isCached: false,
        input_type: "text",
        isRequired: true,
        validation: {
          loopback: [
            {
              regex: "^[0-9]+(\\.[0-9]{1,2})?$",
              message: "Please enter a valid number.",
            },
          ],
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_107",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_113",
        },
      ],
      display_attributes: {
        display_name:
          "Number of days after rent is due when late charges are incurred",

        order: 79,
        block: "Lease Requirements",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        placeholder: "3",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_25",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_35",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_35",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_35",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_36",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_36",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Lease Terms Options",

        order: 80,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 2,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Late Charge Flat Fee",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_35",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_108",
              ],
            },
            {
              display_name: "Late Charge Percent of Rent",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_36",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_110",
              ],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_108",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_114",
        },
      ],
      display_attributes: {

        order: 81,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Enter Late Charge Fee",
        isCached: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_110",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_116",
        },
      ],
      display_attributes: {

        order: 82,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements by Landlord",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Enter Late Charge Rent Percent",
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_109",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_115",
        },
      ],
      display_attributes: {
        display_name:
          "Additional Fees charged per day after late charges are incurred",

        order: 83,
        block: "Lease Requirements",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "50",
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_26",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_37",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_37",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_37",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_38",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_38",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Animal Policy",

        order: 84,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 1,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Animals Not Permitted",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_37",
            },
            {
              display_name: "Animals Permitted with Restrictions",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_38",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_111",
              ],
            },
          ],
          minSelected: 1,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_111",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_117",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_117",
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_118",
          ],
        },
      ],
      display_attributes: {

        order: 85,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Animal Restrictions (size, weight, number, type)",
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_27",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_57",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_57",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_57",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_59",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_59",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_58",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_58",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Animal Charges and Restrictions",

        order: 86,
        block: "Lease Requirements",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "gray",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 3,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Animal Deposit Required",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_57",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_113",
              ],
            },
            {
              display_name: "Increased Monthly Rent",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_59",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_114",
              ],
            },
            {
              display_name: "One-Time Non-Refundable Payment",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_58",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_115",
              ],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
        visibleIf: [
          {
            unique_id: "estate_listing_agreement_exclusive_right_to_lease_26",
            operation: "contains",
            valueChecked: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_38",
          },
        ],
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_113",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_120",
        },
      ],
      display_attributes: {

        order: 87,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "100",
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_114",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_122",
        },
      ],
      display_attributes: {

        order: 88,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "20",
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            currency: true,
          },
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_115",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_124",
        },
      ],
      display_attributes: {

        order: 89,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            currency: true,
          },
        },
        placeholder: "50",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_116",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_125",
        },
      ],
      display_attributes: {
        display_name: "Initial Animal Violation Charge",

        order: 90,
        block: "Lease Requirements",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "green",
        },
        width: 6,
        placeholder: "200",
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_117",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_126",
        },
      ],
      display_attributes: {
        display_name: "Additional Daily Animal Fees",

        order: 91,
        block: "Lease Requirements",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "orange",
        },
        width: 6,
        placeholder: "30",
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_118",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_127",
        },
      ],
      display_attributes: {
        display_name: "Security Deposit Amount",

        order: 92,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "500",
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_122",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_132",
        },
      ],
      display_attributes: {
        display_name: "Utilities that will not be paid by the landlord",

        order: 93,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        placeholder: "Rent, water",
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_123",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_133",
        },
      ],
      display_attributes: {
        display_name: "Maximum allowed duration of guest stay",

        order: 94,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Enter number of days",
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_124",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_134",
        },
      ],
      display_attributes: {
        display_name: "Permitted Vehicle Count on Property",

        order: 95,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Enter number of vehicles",
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "trip_charge_info",
      display_attributes: {
        display_name: "Trip Charge Information",

        order: 96,
        block: "Lease Requirements",
        input_type: "info",
        description:
          "A trip charge is a fee a service provider (like a repair person or technician) charges just for coming out to your location, even if no work is done. It covers their time, travel, and fuel costs.",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_125",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_135",
        },
      ],
      display_attributes: {
        display_name: "Trip Charge ",

        order: 97,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_127",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_137",
        },
      ],
      display_attributes: {
        display_name: "Keybox Early Withdrawal Fee",

        order: 98,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        special_input: {
          text: {
            currency: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_126",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_136",
        },
      ],
      display_attributes: {
        display_name: "Keybox Authorization Period",

        order: 99,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        placeholder: "____ last few days before lease ends",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_128",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_138",
        },
      ],
      display_attributes: {
        display_name: "Inventory and Condition Form Delivery Time (Days)",

        order: 100,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_28",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_39",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_39",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_39",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_40",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_40",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_41",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_41",
            },
            {
              fromDatabase:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1003",
              pdfAttribute:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1003",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Maintenance Responsibilities for Yard",

        order: 101,
        block: "Lease Requirements",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 4,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Landlord",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_39",
            },
            {
              display_name: "Tenant",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_40",
            },
            {
              display_name: "Contractor chosen and paid by Tenant",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_41",
            },
            {
              display_name: "Specified Contractor",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1003",
              linkedFields: ["specified_contractor"],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "specified_contractor",
      display_attributes: {
        display_name: "specified contractor",
        input_type: "text",
        order: 102,
        width: 12,
        value: {
          type: "manual",
        },
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_140",
        },
      ],
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_29",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_42",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_42",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_42",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_43",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_43",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_44",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_44",
            },
            {
              fromDatabase:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1001",
              pdfAttribute:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1001",
            },
            {
              fromDatabase:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1002",
              pdfAttribute:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1002",
            },
          ],
        },
      ],
      display_attributes: {
        display_name: "Maintenance Responsibilities for Pool/Spa",

        order: 103,
        block: "Lease Requirements",
        block_style: {
          title: "Property Details",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 5,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Landlord",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_42",
            },
            {
              display_name: "Tenant",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_43",
            },
            {
              display_name: "Specifield Contractor",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1001",
              linkedFields: ["field_1754007266561_0vonxapnc"],
            },
            {
              display_name: "Other",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1002",
              linkedFields: ["field_1754007099889_vmkr9e3jd"],
            },
            {
              display_name: "Contractor Chosen By Tenant",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_44",
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_30",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1005",
          linked_form_fields_checkbox: [
            {
              fromDatabase:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1005",
              pdfAttribute:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1005",
            },
            {
              fromDatabase:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1007",
              pdfAttribute:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1007",
            },
          ],
        },
      ],
      display_attributes: {

        order: 104,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "None",
          color_theme: "purple",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 2,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Flat Fee",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1005",
              linkedFields: ["field_1754007188106_wwopzbpf1"],
            },
            {
              display_name: "Percent of Monthly Rent",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1007",
              linkedFields: ["field_1754008142507_5syz6kurc"],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
        display_name:
          "Assignment, Subletting, and Replacement Tenant Fees (If procured by tenant)",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_140",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_156",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_157",
          ],
        },
      ],
      display_attributes: {
        display_name: "Other Lease Requirements by Landlord",

        order: 105,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "None",
          color_theme: "gray",
        },
        width: 12,
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_31",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1004",
          linked_form_fields_checkbox: [
            {
              fromDatabase:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1004",
              pdfAttribute:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1004",
            },
            {
              fromDatabase:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1006",
              pdfAttribute:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1006",
            },
          ],
        },
      ],
      display_attributes: {
        display_name:
          "Assignment, Subletting, and Replacement Tenant Fees (If procured by landlord)",

        order: 106,
        block: "Lease Requirements",
        block_style: {
          title: "Other Compensation",
          icon: "None",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 2,
          },
        },
        isCached: false,
        isRequired: false,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Flat Fee",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1004",
              linkedFields: ["field_1754008132104_p3rvqvyik"],
            },
            {
              display_name: "Percentage of Rent",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1006",
              linkedFields: ["field_1754008148765_tx20mi5ln"],
            },
          ],
          minSelected: 0,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_134",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_147",
          linked_form_fields_text: [
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_148",
          ],
        },
      ],
      display_attributes: {
        display_name: "Special Provisions and Additional Terms",

        order: 107,
        block: "Lease Requirements",
        block_style: {
          title: "Lease Requirements",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        placeholder: "Enter any special provisions or additional terms here",
        isCached: false,
        isRequired: false,
        input_type: "text-area",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "field_1754008148765_tx20mi5ln",
      display_attributes: {
        input_type: "text",
        order: 108,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            percentage: true,
          },
        },
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_155",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_155",
        },
      ],
    },
    {
      unique_id: "field_1754008142507_5syz6kurc",
      display_attributes: {
        input_type: "text",
        order: 109,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            percentage: true,
          },
        },
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_151",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_151",
        },
      ],
    },
    {
      unique_id: "field_1754008132104_p3rvqvyik",
      display_attributes: {
        input_type: "text",
        order: 110,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            currency: true,
          },
        },
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_153",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_153",
        },
      ],
    },
    {
      unique_id: "field_1754007188106_wwopzbpf1",
      display_attributes: {
        input_type: "text",
        order: 111,
        width: 12,
        value: {
          type: "manual",
        },
        special_input: {
          text: {
            currency: true,
          },
        },
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_149",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_149",
        },
      ],
    },
    {
      unique_id: "field_1754007266561_0vonxapnc",
      display_attributes: {
        input_type: "text",
        order: 112,
        width: 12,
        value: {
          type: "manual",
        },
        description: "specify contractor name",
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_142",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_142",
        },
      ],
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_145",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_162",
        },
      ],
      display_attributes: {
        display_name: "Landlord 1's Printed Name",

        order: 113,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "orange",
        },
        width: 6,
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_150",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_165",
        },
      ],
      display_attributes: {
        display_name: "Landlord 2's Printed Name",

        order: 114,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        isCached: false,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_154",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_169",
          linked_form_fields_text: [""],
          linked_dates: [
            {
              dateFieldName:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_164",
            },
          ],
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_34",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_34",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_56",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_56",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_69",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_69",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_76",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_76",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_81",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_81",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_87",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_87",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_102",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_102",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_106",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_106",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_129",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_129",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_159",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_159",
        },
      ],
      display_attributes: {
        display_name: "Landlord 1's Signature",

        order: 115,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        isCached: false,
        isRequired: true,
        input_type: "signature",
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
                  "hardCodedValue": "landlord"
                }
              ]
            }
          ]
        },
        },
    },
    {
      unique_id: "field_1754007099889_vmkr9e3jd",
      display_attributes: {
        input_type: "text",
        order: 116,
        width: 12,
        value: {
          type: "manual",
        },
        description: "(specify other maintenance service)",
      },
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_144",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_144",
        },
      ],
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_81",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_172",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_172",
          linked_dates: [
            {
              dateFieldName:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_166",
            },
          ],
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_35",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_35",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_57",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_57",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_70",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_70",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_77",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_77",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_82",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_82",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_88",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_88",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_103",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_103",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_107",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_107",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_130",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_130",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_160",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_160",
        },
      ],
      display_attributes: {
        display_name: "Landlord 2's Signature",

        order: 117,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        placeholder: "Enter County Name",
        isCached: false,
        input_type: "signature",
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
                  "hardCodedValue": "landlord"
                }
              ]
            }
          ]
        },
        },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_152",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_167",
        },
      ],
      display_attributes: {
        display_name: "Broker's Printed Name ",

        order: 118,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        isCached: true,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_155",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_170",
        },
      ],
      display_attributes: {
        display_name: "Broker License Number",

        order: 119,
        block: "Broker's Authority",
        block_style: {
          icon: "user",
          color_theme: "green",
          title: "Broker's Authority",
        },
        width: 6,
        isCached: true,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_148",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_46",
          linked_form_fields_checkbox: [
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_46",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_46",
            },
            {
              fromDatabase: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_47",
              pdfAttribute: "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_47",
            },
          ],
        },
      ],
      display_attributes: {
        display_name:
          "Is the Broker or Broker's Associate Signing this Document?",

        order: 120,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          checkbox: {
            horizontal: 1,
            asRadio: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "checkbox",
        checkbox_options: {
          options: [
            {
              display_name: "Broker's Signature",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_46",
            },
            {
              display_name: "Broker Associate's Signature",
              databaseStored:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_47",
              linkedFields: [
                "estate_listing_agreement_exclusive_right_to_lease_153",
                "estate_listing_agreement_exclusive_right_to_lease_158",
              ],
            },
          ],
          minSelected: 1,
        },
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_146",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_163",
          linked_dates: [
            {
              dateFieldName:
                "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_171",
            },
          ],
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_33",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_33",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_55",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_55",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_68",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_68",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_75",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_75",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_80",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_80",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_86",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_86",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_101",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_101",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_105",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_105",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_128",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_128",
        },
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_158",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_158",
        },
      ],
      display_attributes: {
        display_name: "Broker or Broker's Associate Signature",

        order: 121,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        isCached: false,
        isRequired: true,
        input_type: "signature",
        value: {
          type: "manual",
        },
      },
    },
    {
      unique_id: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_171",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_171",
        },
      ],
      display_attributes: {
        display_name: "Broker or Broker's Associate signature dat",

        order: 122,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        special_input: {
          text: {
            date: true,
          },
        },
        isCached: false,
        isRequired: true,
        input_type: "text",
        value: {
          type: "manual",
        },
        isHidden: true,
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_153",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_168",
        },
      ],
      display_attributes: {
        display_name: "Broker's Associate's Printed Name",

        order: 123,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        placeholder: "John Doe",
      },
    },
    {
      unique_id: "estate_listing_agreement_exclusive_right_to_lease_158",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield:
            "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_173",
        },
      ],
      display_attributes: {
        display_name: "Broker's Associate License Number",

        order: 124,
        block: "Broker's Authority",
        block_style: {
          title: "Broker's Authority",
          icon: "home",
          color_theme: "blue",
        },
        width: 6,
        isCached: false,
        isRequired: false,
        input_type: "text",
        value: {
          type: "manual",
        },
        placeholder: "John Doe",
      },
    },
    {
      unique_id: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_164",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_164",
        },
      ],
      display_attributes: {
        display_name: "Landlord 1 Signature Date",
        input_type: "text",

        order: 125,
        block: "Landlord 1",
        block_style: {
          title: "Landlord 1",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        value: {
          type: "manual",
        },
        isHidden: true,
      },
    },
    {
      unique_id: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_166",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_166",
        },
      ],
      display_attributes: {
        display_name: "Landlord 2 Signature Date",
        input_type: "text",

        order: 126,
        block: "Landlord 2",
        block_style: {
          title: "Landlord 2",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,  
        value: {
          type: "manual",
        },
        isHidden: true,
      },
    },
    {
      unique_id: "broker/associate_signature_date",
      pdf_attributes: [
        {
          formType: "residential_real_estate_listing_agreement_exclusive_right_to_lease",
          formfield: "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_171",
        },
      ],
      display_attributes: {
        display_name: "Broker or Broker's Associate Signature Date",
        input_type: "text",

        order: 127,
        block: "Broker or Broker's Associate",
        block_style: {
          title: "Broker or Broker's Associate",
          icon: "home",
          color_theme: "blue",
        },
        width: 12,
        value: {
          type: "manual",
        },
        isHidden: true,
      },
    }
  ];
