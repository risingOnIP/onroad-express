import { PartyIntakeSchema } from "../../../types/realtor";

export const LANDLORD_INTAKE_FORM: PartyIntakeSchema = [
  {
    "unique_id": "field_1755468964522_ln0g0ira5",
    "display_attributes": {
      "input_type": "info",
      "order": 1,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "display_name": "Landlord Intake Form",
      "description": "This is the landlord intake form, designed for you as the property owner to complete. The information you provide here will be used to automatically populate key documents such as the 'Residential Lease Agreement' and the 'Residential Exclusive Right to Lease' form. By streamlining the paperwork, your realtor can handle the administrative process more efficiently, helping your property quickly accelerate from listing to leasing."
    }
  },
  {
    "unique_id": "hoa_association_name",
    "display_attributes": {
      "placeholder": "HOA Name",
      "order": 2,
      "input_type": "text",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 8,
      "visibleIf": []
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease",
    "display_attributes": {
      "display_name": "Landlord's Full Name",
      "description": "",
      "order": 3,
      "block": "Parties Information",
      "block_style": {
        "title": "Parties Information",
        "icon": "Users",
        "color_theme": "green"
      },
      "width": 12,
      "placeholder": "Enter full name of the landlord",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "reserved",
        "reserved": "landlord_name_csv"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_33",
    "display_attributes": {
      "display_name": "Landlord's Current Street Address",
      "order": 4,
      "block": "Parties Information",
      "block_style": {
        "title": "Parties Information",
        "icon": "user",
        "color_theme": "green"
      },
      "width": 12,
      "placeholder": "Enter the landlord's street address",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_34",
    "display_attributes": {
      "display_name": "Landlord's Current City, State, and Zip Code",
      "order": 5,
      "block": "Parties Information",
      "block_style": {
        "title": "Parties Information",
        "icon": "user",
        "color_theme": "green"
      },
      "width": 12,
      "placeholder": "Enter City, State, and Zip Code",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_35",
    "display_attributes": {
      "display_name": "Landlord's Home Phone",
      "order": 6,
      "block": "Parties Information",
      "block_style": {
        "title": "Parties Information",
        "icon": "user",
        "color_theme": "green"
      },
      "width": 6,
      "special_input": {
        "text": {
          "phone": true
        }
      },
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "reserved",
        "reserved": "landlord_phone_number"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_36",
    "display_attributes": {
      "display_name": "Landlord's Mobile Phone",
      "order": 7,
      "block": "Parties Information",
      "width": 6,
      "special_input": {
        "text": {
          "phone": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "reserved",
        "reserved": "landlord_phone_number"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_37",
    "display_attributes": {
      "order": 8,
      "block": "Parties Information",
      "block_style": {
        "title": "Parties Information",
        "icon": "user",
        "color_theme": "green"
      },
      "width": 12,
      "placeholder": "landlord@example.com",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
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
          }
        ]
      },
      "display_name": "Landlord's Email or Fax Number"
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_43",
    "display_attributes": {
      "order": 9,
      "block": "Property Details",
      "block_style": {
        "title": "Property Details",
        "icon": "Home",
        "color_theme": "blue"
      },
      "width": 4,
      "placeholder": "7-A",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "display_name": "Land Lot",
      "description": "A land lot is simply a specific plot of ground with official property lines that are on file with the county. It's the basic piece of land you can legally own, sell, or build a house on."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_44",
    "display_attributes": {
      "display_name": "Block",
      "order": 10,
      "block": "Property Details",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 4,
      "placeholder": "B",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "description": "In a neighborhood, a block is simply a group of property lots that are clustered together. It’s just a way of organizing a big subdivision into smaller sections on a map."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_3",
    "display_attributes": {
      "display_name": "Addition",
      "order": 11,
      "block": "Property Details",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 4,
      "placeholder": "Oakridge Estates",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "description": "An addition is simply the official term for a new neighborhood or a new section added to a town. It's a large piece of land that a developer has divided into lots and blocks so new homes can be built."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_45",
    "display_attributes": {
      "display_name": "City",
      "order": 12,
      "block": "Property Details",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 5,
      "placeholder": "Plano",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_46",
    "display_attributes": {
      "display_name": "County",
      "order": 13,
      "block": "Property Details",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 7,
      "placeholder": "Collin",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_32",
    "display_attributes": {
      "display_name": "Address",
      "order": 14,
      "block": "Property Details",
      "block_style": {
        "title": "Broker's Authority",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "1234 Example Rd, Plano TX, 75023",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "does_property_have_hoa",
    "display_attributes": {
      "display_name": "Is the Property a Part of a HOA (Home Owners Association)?",
      "order": 15,
      "input_type": "checkbox",
      "block": "Property Details",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "checkbox_options": {
        "options": [
          {
            "display_name": "No",
            "databaseStored": "property_does_not_have_hoa"
          },
          {
            "display_name": "Yes",
            "databaseStored": "property_does_have_hoa",
            "linkedFields": [
              "hoa_association_name"
            ]
          }
        ],
        "maxSelected": 1
      },
      "isRequired": true,
      "special_input": {
        "checkbox": {
          "asRadio": true,
          "horizontal": 2
        }
      },
      "block_style": {
        "title": "Property Details"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_4",
    "display_attributes": {
      "display_name": "Detachable Property Items",
      "description": "The Property will be marketed with the following non-real estate items. (List included items not attached to the property like furniture, curtains, washing machines, etc.)",
      "order": 16,
      "block": "Property Details",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "List non-real estate items here...",
      "isCached": false,
      "isRequired": true,
      "input_type": "text-area",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_5",
    "display_attributes": {
      "display_name": "Items taken by Landlord",
      "description": "Include any Items not attached to the property that the landlord will remove (carpets, tables, etc.)",
      "order": 17,
      "block": "Property Details",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "List any items the Landlord will take with them here...",
      "isCached": false,
      "isRequired": true,
      "input_type": "text-area",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_49",
    "display_attributes": {
      "display_name": "Monthly Rental Price for Property Listing",
      "order": 18,
      "block": "Listing Information",
      "block_style": {
        "title": "Listing Information",
        "icon": "home",
        "color_theme": "purple"
      },
      "width": 12,
      "placeholder": "1500",
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_51",
    "display_attributes": {
      "display_name": "Minimum Lease Term Duration (Months)",
      "order": 19,
      "block": "Listing Information",
      "block_style": {
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 6,
      "placeholder": "4",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_50",
    "display_attributes": {
      "display_name": "Maximum Lease Term Duration (Months)",
      "order": 20,
      "block": "Listing Information",
      "block_style": {
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 6,
      "placeholder": "14",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_52",
    "display_attributes": {
      "display_name": "Listing Term Start Date",
      "order": 21,
      "block": "Listing Information",
      "block_style": {
        "title": "Listing Information",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 6,
      "placeholder": "MM/DD/YYYY",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "description": "This is the date the listing agreement officially begins and becomes active. On this day, the real estate agent can legally start marketing the property, which may include things like putting up a \"For Sale\" sign and advertising it to buyers."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_53",
    "display_attributes": {
      "display_name": "Listing Term End Date",
      "order": 22,
      "block": "Listing Information",
      "block_style": {
        "title": "Listing Information",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 6,
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "placeholder": "MM/DD/YYYY",
      "description": "This is the date the listing agreement expires. If the property has not been sold by this date, the contract is terminated, and the seller is no longer obligated to work with that agent."
    }
  },
  {
    "unique_id": "field_1755474388529_l57xaoibn",
    "display_attributes": {
      "display_name": "What is a Multiple Listing Service (MLS)",
      "input_type": "info",
      "order": 23,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Listing Information",
      "block_style": {
        "title": "Listing Information"
      },
      "description": "The Multiple Listing Service (MLS) is the private, online database that real estate agents use to see every home for sale in an area. Think of it as the website for realtors where they post all their listings to share with each other. When an agent lists your home on the MLS, it immediately gets advertised to thousands of other agents who are working with potential buyers. This system is the original source for the listings you eventually see on public websites like Zillow and Realtor.com. Ultimately, it's the most important tool for giving a home the maximum exposure to the entire market."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_13",
    "display_attributes": {
      "display_name": "Do You Want The Broker To File This Listing With One Or More Multiple Listing Services?",
      "order": 24,
      "block": "Listing Information",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 1,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": true,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes, I want the broker to file this listing with one or more Multiple Listing Services (MLS)",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_12",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_14"
            ]
          },
          {
            "display_name": "No, I don't want the broker will not file this listing with any Multiple Listing Services (MLS)",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_13"
          }
        ],
        "minSelected": 1
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_14",
    "display_attributes": {
      "order": 25,
      "block": "Listing Information",
      "block_style": {
        "title": "Listing Services"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 1,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": true,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Within MLS requirements or 5 days of the listing date",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_14"
          },
          {
            "display_name": "A set number of days after the listing date",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_15",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_82",
              "estate_listing_agreement_exclusive_right_to_lease_15"
            ]
          }
        ],
        "minSelected": 1
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_82",
    "display_attributes": {
      "display_name": "Days to Wait",
      "order": 26,
      "block": "Listing Information",
      "block_style": {
        "title": "Broker's Authority",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 3,
      "placeholder": "Days",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Broker will file this Listing with MLS",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_12"
          },
          {
            "display_name": "Landlord instructs Broker not to file this Listing until specified days",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_13"
          }
        ],
        "minSelected": 1
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_18",
    "display_attributes": {
      "display_name": "Does the Landlord Restrict",
      "order": 27,
      "block": "Listing Information",
      "block_style": {
        "title": "Listing Information",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Displaying this Listing on the Internet",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1010"
          },
          {
            "display_name": "Displaying the Address of this Listing on the Internet",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1011"
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_17",
    "display_attributes": {
      "display_name": "Can the Broker show the Property to Tenants or Buyers they represent?",
      "order": 28,
      "block": "Listing Information",
      "block_style": {
        "title": "Parties Information",
        "icon": "green",
        "color_theme": "green"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": true,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes, the broker CAN show the Property to Tenants or Buyers they represent",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_18"
          },
          {
            "display_name": "No, the broker CANNOT show the Property to Tenants or Buyers they represent",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_19"
          }
        ],
        "minSelected": 1
      },
      "value": {
        "type": "manual"
      },
      "description": "This question asks you to decide if your real estate agent is allowed to show your property to one of their own clients who might want to buy or rent it. This choice determines how your agent handles a potential conflict of interest.\n\n"
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_15",
    "display_attributes": {
      "display_name": "Reason for Waiting",
      "order": 29,
      "block": "Listing Information",
      "block_style": {
        "title": "Other Compensation",
        "icon": "None",
        "color_theme": "green"
      },
      "width": 9,
      "placeholder": "Enter details regarding the delay",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_86",
    "display_attributes": {
      "display_name": "Companies Allowed to Schedule Appointments and Authorize Access to Property",
      "description": "Which companies can the broker authorize to enter the property at a reasonable time to facilitate the showing and lease of the property?",
      "order": 30,
      "block": "Property Access",
      "block_style": {
        "title": "Property Access",
        "icon": "home",
        "color_theme": "gray"
      },
      "width": 12,
      "placeholder": "Company A, Company B",
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_16",
    "display_attributes": {
      "display_name": "Keybox Authorization Options",
      "order": 31,
      "block": "Property Access",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Broker is authorized to place a keybox on the Property",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_16"
          },
          {
            "display_name": "Broker is not authorized to place a keybox on the Property",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_17"
          }
        ],
        "minSelected": 1
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_19",
    "display_attributes": {
      "display_name": "Is the broker authorized to make repairs/alterations to the property",
      "order": 32,
      "block": "Repairs",
      "block_style": {
        "title": "Repairs",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_21",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_93",
              "estate_listing_agreement_exclusive_right_to_lease_20"
            ]
          },
          {
            "display_name": "No",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_20"
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_132",
    "display_attributes": {
      "display_name": "Emergency Repair Contact Information",
      "order": 33,
      "block": "Repairs",
      "block_style": {
        "title": "Repairs",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_133",
    "display_attributes": {
      "display_name": "Appliances or Items that will not be repaired",
      "order": 34,
      "block_style": {
        "title": "Repairs",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "block": "Repairs"
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_93",
    "display_attributes": {
      "order": 35,
      "block": "Repairs",
      "block_style": {
        "title": "Repairs",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "1000",
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "display_name": "Maximum Repair Cost"
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_20",
    "display_attributes": {
      "display_name": "Landlord Will",
      "order": 36,
      "block_style": {
        "title": "Repairs",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 1,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Pay the contractors directly and pay Broker a service fee",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_22",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_95"
            ]
          },
          {
            "display_name": "Reimburse Broker for any costs and pay a service fee",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_23",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_96"
            ]
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      },
      "block": "Repairs"
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_95",
    "display_attributes": {
      "order": 37,
      "block": "Repairs",
      "block_style": {
        "title": "Repairs",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Service Fee",
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_96",
    "display_attributes": {
      "order": 38,
      "block": "Repairs",
      "block_style": {
        "title": "Broker's Authority",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Service Fee",
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_97",
    "display_attributes": {
      "display_name": "Outstanding Property Loans and Fees",
      "order": 39,
      "block": "Property Loans and Fees",
      "block_style": {
        "title": "Property Loans and Fees",
        "icon": "CreditCard",
        "color_theme": "green"
      },
      "width": 12,
      "placeholder": "Specify any outstanding payments related to the payments",
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "description": "Is the Landlord behind on any mortgages, HOA dues, property taxes, or other loans related to the property?"
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_98",
    "display_attributes": {
      "display_name": "Legal claims or debts tied to the property",
      "description": "Does the landlord know of any existing legal claims or debts tied to the property",
      "order": 40,
      "block": "Property Loans and Fees",
      "block_style": {
        "title": "Property Loans and Fees",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Specify any known legal claims or debts tied to the property",
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_21",
    "display_attributes": {
      "display_name": "List any optional fees to use shared areas (like pools or clubhouses)",
      "order": 41,
      "block": "Property Loans and Fees",
      "block_style": {
        "title": "Property Loans and Fees",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Specify any optional fees to use shared areas",
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_22",
    "display_attributes": {
      "display_name": "List any known safety or health hazards on the property",
      "order": 42,
      "block": "Property Loans and Fees",
      "block_style": {
        "title": "Property Loans and Fees",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Describe any known safety or health hazards on the property",
      "isCached": false,
      "isRequired": true,
      "input_type": "text-area",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_24",
    "display_attributes": {
      "display_name": "Rent Due Date",
      "order": 43,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "First Day of Month",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_33"
          },
          {
            "display_name": "Other Day",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_34",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_106"
            ]
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_106",
    "display_attributes": {
      "order": 44,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "5th",
      "isCached": false,
      "input_type": "text",
      "isRequired": true,
      "validation": {
        "loopback": [
          {
            "regex": "^[0-9]+(\\.[0-9]{1,2})?$",
            "message": "Please enter a valid number."
          }
        ]
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_107",
    "display_attributes": {
      "display_name": "Number of days after rent is due when late charges are incurred",
      "order": 45,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "placeholder": "3"
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_25",
    "display_attributes": {
      "display_name": "Lease Terms Options",
      "order": 46,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Late Charge Flat Fee",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_35",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_108"
            ]
          },
          {
            "display_name": "Late Charge Percent of Rent",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_36",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_110"
            ]
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_108",
    "display_attributes": {
      "order": 47,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Enter Late Charge Fee",
      "isCached": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_110",
    "display_attributes": {
      "order": 48,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements by Landlord",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Enter Late Charge Rent Percent",
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_109",
    "display_attributes": {
      "display_name": "Additional Fees charged per day after late charges are incurred",
      "order": 49,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Other Compensation",
        "icon": "None",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "50",
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_26",
    "display_attributes": {
      "display_name": "Animal Policy",
      "order": 50,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 1,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Animals Not Permitted",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_37"
          },
          {
            "display_name": "Animals Permitted with Restrictions",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_38",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_111"
            ]
          }
        ],
        "minSelected": 1
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_111",
    "display_attributes": {
      "order": 51,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Animal Restrictions (size, weight, number, type)",
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_27",
    "display_attributes": {
      "display_name": "Animal Charges and Restrictions",
      "order": 52,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Other Compensation",
        "icon": "None",
        "color_theme": "gray"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 3
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Animal Deposit Required",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_57",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_113"
            ]
          },
          {
            "display_name": "Increased Monthly Rent",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_59",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_114"
            ]
          },
          {
            "display_name": "One-Time Non-Refundable Payment",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_58",
            "linkedFields": [
              "estate_listing_agreement_exclusive_right_to_lease_115"
            ]
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      },
      "visibleIf": [
        {
          "unique_id": "estate_listing_agreement_exclusive_right_to_lease_26",
          "operation": "contains",
          "valueChecked": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_38"
        }
      ]
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_113",
    "display_attributes": {
      "order": 53,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "100",
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_114",
    "display_attributes": {
      "order": 54,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "20",
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_115",
    "display_attributes": {
      "order": 55,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "placeholder": "50"
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_116",
    "display_attributes": {
      "display_name": "Initial Animal Violation Charge",
      "order": 56,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Other Compensation",
        "icon": "None",
        "color_theme": "green"
      },
      "width": 6,
      "placeholder": "200",
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "description": "This is a one-time, immediate fine charged to the tenant as soon as the unauthorized animal is discovered."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_117",
    "display_attributes": {
      "display_name": "Additional Daily Animal Fees",
      "order": 57,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Other Compensation",
        "icon": "None",
        "color_theme": "orange"
      },
      "width": 6,
      "placeholder": "30",
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "description": "This is an ongoing penalty charged for each day the unauthorized animal remains on the property after the landlord has given notice."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_118",
    "display_attributes": {
      "display_name": "Security Deposit Amount",
      "order": 58,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "500",
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_122",
    "display_attributes": {
      "display_name": "Utilities that will not be paid by the landlord",
      "order": 59,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "isCached": false,
      "placeholder": "Electricity, water, internet bills",
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_123",
    "display_attributes": {
      "display_name": "Maximum allowed duration of guest stay",
      "order": 60,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Enter number of days",
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_124",
    "display_attributes": {
      "display_name": "Permitted Vehicle Count on Property",
      "order": 61,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Enter number of vehicles",
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "trip_charge_info",
    "display_attributes": {
      "display_name": "Trip Charge Information",
      "order": 62,
      "block": "Lease Requirements",
      "input_type": "info",
      "description": "A trip charge is a fee a service provider (like a repair person or technician) charges just for coming out to your location, even if no work is done. It covers their time, travel, and fuel costs.",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_125",
    "display_attributes": {
      "display_name": "Trip Charge ",
      "order": 63,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_127",
    "display_attributes": {
      "display_name": "Keybox Early Withdrawal Fee",
      "order": 64,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 6,
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "description": "This is a fee the property owner (landlord) would have to pay the broker if the owner terminates the listing agreement early and demands the keybox be removed. Placing a keybox is usually a key part of a broker's marketing plan, and removing it early hinders their ability to lease the property."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_126",
    "display_attributes": {
      "display_name": "Keybox Authorization Period",
      "order": 65,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 6,
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "placeholder": "____ last few days before lease ends",
      "description": "This clause defines the specific timeframe during which a keybox can be placed on a currently occupied rental property. It is used to allow the landlord or their agent to show the property to prospective new tenants before the current tenant's lease ends."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_128",
    "display_attributes": {
      "display_name": "Inventory and Condition Form Delivery Time (Days)",
      "order": 66,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "isCached": false,
      "isRequired": true,
      "input_type": "text",
      "value": {
        "type": "manual"
      },
      "placeholder": "3",
      "description": "Under Texas law, a landlord must provide a tenant with an \"Inventory and Condition Form\" upon move-in. This field sets the deadline, in days, for the tenant to complete, sign, and return this form to the landlord."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_28",
    "display_attributes": {
      "display_name": "Who is Responsible for the Maintenance of the Yard?",
      "order": 67,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 4,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Landlord",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_39"
          },
          {
            "display_name": "Tenant",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_40"
          },
          {
            "display_name": "Contractor chosen and paid by Tenant",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_41"
          },
          {
            "display_name": "Specified Contractor",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1003",
            "linkedFields": [
              "specified_contractor"
            ]
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "specified_contractor",
    "display_attributes": {
      "display_name": "specified contractor",
      "input_type": "text",
      "order": 68,
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_29",
    "display_attributes": {
      "display_name": "Who is Responsible for the Maintenance of the Pool/Spa?",
      "order": 69,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Property Details",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 5,
          "asRadio": true
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Landlord",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_42"
          },
          {
            "display_name": "Tenant",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_43"
          },
          {
            "display_name": "Specifield Contractor",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1001",
            "linkedFields": [
              "field_1754007266561_0vonxapnc"
            ]
          },
          {
            "display_name": "Other",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1002",
            "linkedFields": [
              "field_1754007099889_vmkr9e3jd"
            ]
          },
          {
            "display_name": "Contractor Chosen By Tenant",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_44"
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_30",
    "display_attributes": {
      "order": 70,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "None",
        "color_theme": "purple"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Flat Fee",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1005",
            "linkedFields": [
              "field_1754007188106_wwopzbpf1"
            ]
          },
          {
            "display_name": "Percent of Monthly Rent",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1007",
            "linkedFields": [
              "field_1754008142507_5syz6kurc"
            ]
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      },
      "display_name": "Assignment, Subletting, and Replacement Tenant Fees (If procured by tenant)",
      "description": "This sets the fee a tenant must pay if they want to break their lease early, and they find a qualified replacement tenant who is then approved by the landlord. This fee is meant to compensate the landlord for the administrative work involved in screening the new applicant and preparing a new lease."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_31",
    "display_attributes": {
      "display_name": "Assignment, Subletting, and Replacement Tenant Fees (If procured by landlord)",
      "order": 71,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Other Compensation",
        "icon": "None",
        "color_theme": "blue"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2
        }
      },
      "isCached": false,
      "isRequired": false,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Flat Fee",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1004",
            "linkedFields": [
              "field_1754008132104_p3rvqvyik"
            ]
          },
          {
            "display_name": "Percentage of Rent",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_checkbox_1006",
            "linkedFields": [
              "field_1754008148765_tx20mi5ln"
            ]
          }
        ],
        "minSelected": 0
      },
      "value": {
        "type": "manual"
      },
      "description": "This is called a \"Reletting Fee.\" It is the fee the tenant pays if they break their lease early, and the landlord has to do the work of advertising the property, showing it, and finding a suitable replacement. This fee is typically higher than the fee above because it compensates the landlord for their time, effort, and marketing costs."
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_140",
    "display_attributes": {
      "display_name": "Other Lease Requirements by Landlord",
      "order": 72,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "None",
        "color_theme": "gray"
      },
      "width": 12,
      "isCached": false,
      "isRequired": false,
      "input_type": "text",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "estate_listing_agreement_exclusive_right_to_lease_134",
    "display_attributes": {
      "display_name": "Special Provisions and Additional Terms",
      "order": 73,
      "block": "Lease Requirements",
      "block_style": {
        "title": "Lease Requirements",
        "icon": "home",
        "color_theme": "blue"
      },
      "width": 12,
      "placeholder": "Enter any special provisions or additional terms here",
      "isCached": false,
      "isRequired": false,
      "input_type": "text-area",
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_1754008148765_tx20mi5ln",
    "display_attributes": {
      "input_type": "text",
      "order": 74,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "percentage": true
        }
      }
    }
  },
  {
    "unique_id": "field_1754008142507_5syz6kurc",
    "display_attributes": {
      "input_type": "text",
      "order": 75,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "percentage": true
        }
      }
    }
  },
  {
    "unique_id": "field_1754008132104_p3rvqvyik",
    "display_attributes": {
      "input_type": "text",
      "order": 76,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "field_1754007188106_wwopzbpf1",
    "display_attributes": {
      "input_type": "text",
      "order": 77,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "field_1754007266561_0vonxapnc",
    "display_attributes": {
      "input_type": "text",
      "order": 78,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "description": "specify contractor name"
    }
  }
]