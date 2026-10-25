import { SchemaItem } from "../../../../types/realtor";

export const EARLY_TERMINATION_OF_RESIDENTIAL_LEASE_SCHEMA: SchemaItem[] = [
  {
    "unique_id": "field_1754006607494_b13eyls4c",
    "display_attributes": {
      "display_name": "Early Termination of Residential Release",
      "input_type": "info",
      "order": 1,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "description": "The Early Termination of Residential Lease form is used when both landlord and tenant voluntarily agree to end a fixed‑term residential lease early."
    }
  },
  {
    "unique_id": "property_address",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_4",
        "linked_form_fields_text": [
          "early_termination_of_residential_lease_textfield_5"
        ]
      },
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_16"
      }
    ],
    "display_attributes": {
      "display_name": "Property Address",
      "input_type": "text",
      "description": "Full address of the property being leased",
      "order": 2,

      "block": "property_information",
      "block_style": {
        "title": "Property Information",
        "description": "Details about the property being leased",
        "icon": "home",
        "color_theme": "blue"
      },
      "placeholder": "123 Main Street, City, State ZIP",
      "width": 12,
      "value": {
        "type": "reserved",
        "reserved": "property_street_address"
      },
      "attribute": {
        "key": "property_street_address",
        "operation": "value",
        "reverseOperation": "value"
      },
      "visibleIf": []
    }
  },
  {
    "unique_id": "landlord_names",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_1"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord(s) Name or Landlord's Representative(s) Name",
      "input_type": "text",
      "order": 4,

      "block": "party_information",
      "block_style": {
        "title": "Party Information",
        "description": "Landlord and tenant details",
        "icon": "users",
        "color_theme": "green"
      },
      "placeholder": "John Doe, Jane Doe",
      "width": 7,
      "value": {
        "type": "reserved",
        "reserved": "landlord_name_csv"
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "field_1753891655381_psgolv37x",
    "display_attributes": {
      "display_name": "More Than One Landlord Representative, More Than Two Landlords or More than Four Tenants",
      "input_type": "info",
      "order": 3,
      "width": 12,
      "value": {
        "type": "manual"
      },
      
      "block": "party_information",
      "description": "If more than one individual is acting as a landlord representative or if more than two landlords are participating in this agreement or if there are more than four tenants participating in this agreement, you will need to click \"Convert to Custom Form\" to manually add the extra individuals to the contract PDF. ",
      "visibleIf": []
    }
  },
  {
    "unique_id": "tenant_names",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_2",
        "linked_form_fields_text": [
          "early_termination_of_residential_lease_textfield_3"
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Tenant Name(s)",
      "input_type": "text",
      "order": 5,

      "block": "party_information",
      "placeholder": "John Smith, Jane Smith",
      "width": 5,
      "value": {
        "type": "reserved",
        "reserved": "tenant_name_csv"
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "lease_agreement_date",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_6",
        "linked_dates": [
          {
            "dateFieldName": "early_termination_of_residential_lease"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Original Lease Date",
      "input_type": "text",
      "description": "Date when the original lease was signed",
      "order": 6,

      "block": "lease_details",
      "block_style": {
        "title": "Lease Agreement Details",
        "description": "Information about the lease being terminated",
        "icon": "file-text",
        "color_theme": "purple"
      },
      "placeholder": "MM/DD/YYYY",
      "width": 6,
      "validation": {
        "loopback": [
          {
            "regex": "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            "message": "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      "special_input": {
        "text": {
          "date": true
        }
      },
      "value": {
        "type": "manual",
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "termination_date",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_7",
        "linked_dates": [
          {
            "dateFieldName": "early_termination_of_residential_lease"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Termination Date",
      "input_type": "text",
      "description": "Date when the lease will terminate at 11:59 p.m.",
      "order": 7,

      "block": "lease_details",
      "placeholder": "MM/DD/YYYY",
      "width": 6,
      "validation": {
        "loopback": [
          {
            "regex": "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            "message": "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      "special_input": {
        "text": {
          "date": true
        }
      },
      "value": {
        "type": "manual"
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "termination_fee",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_8"
      }
    ],
    "display_attributes": {
      "display_name": "Termination Fee",
      "input_type": "text",
      "description": "Fee for early termination of the lease",
      "order": 8,

      "block": "lease_details",
      "block_style": {
        "icon": "dollar-sign",
        "color_theme": "orange"
      },
      "placeholder": "$0.00",
      "width": 6,
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "special_input": {
        "text": {
          "currency": true
        }
      },
      "value": {
        "type": "manual"
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "field_1753825210183_eaqgkb55k",
    "display_attributes": {
      "display_name": "Termination Fee Due Date",
      "input_type": "text",
      "order": 9,
      "width": 6,
      "value": {
        "type": "manual"
      },
      "description": "The termination fee is due no later than this date",
      "placeholder": "MM/DD/YYYY",
      "special_input": {
        "text": {
          "date": true
        }
      },
      "block": "lease_details",
      "block_style": {
        "color_theme": "orange"
      }
    },
    "pdf_attributes": [
      {
        "formType": "early_termination_of_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_9"
      }
    ]
  },
  {
    "unique_id": "special_provisions",
    "pdf_attributes": [
      {
        "formType": "early_termination_of_residential_lease",
        "formfield": "special_provisions"
      }
    ],
    "display_attributes": {
      "placeholder": "Example: Security deposit will be returned within 30 days of move-out, minus any deductions for damages or unpaid rent.",
      "display_name": "Special Provisions",
      "order": 10,
      "input_type": "text-area",
      "block": "special_provisions",
      "block_style": {
        "title": "Special Provisions",
        "description": "Additional terms and conditions",
        "icon": "file-text",
        "color_theme": "orange"
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "isRequired": true,
      "description": "Please list any special provisions for this form"
    }
  },
  {
    "unique_id": "landlord_signature",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_17",
        "linked_dates": [
          {
            "dateFieldName": "early_termination_of_residential_lease_textfield_18"
          }
        ]
      },
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_10"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord 1 Signatures and Initials",
      "input_type": "signature",
      "order": 11,

      "block": "signatures",
      "block_style": {
        "title": "Signatures",
        "description": "Required signatures for agreement",
        "icon": "pen-tool",
        "color_theme": "gray"
      },
      "width": 6,
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
      "visibleIf": []
    }
  },
  {
    "unique_id": "early_termination_of_residential_lease_textfield_18",
    "display_attributes": {
      "input_type": "text",
      "order": 12,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    },
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_18"
      }
    ]
  },
  {
    "unique_id": "landlord_2_signature",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_21",
        "linked_dates": [
          {
            "dateFieldName": "early_termination_of_residential_lease_textfield_22"
          }
        ]
      },
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_11"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord 2 Signatures and Initials",
      "input_type": "signature",
      "order": 13,

      "block": "signatures",
      "width": 6,
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
      "visibleIf": []
    }
  },
  {
    "unique_id": "early_termination_of_residential_lease_textfield_22",
    "display_attributes": {
      "input_type": "text",
      "order": 14,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    },
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_22"
      }
    ]
  },
  {
    "unique_id": "tenant_signature",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_19",
        "linked_dates": [
          {
            "dateFieldName": "early_termination_of_residential_lease_textfield_20"
          }
        ]
      },
      {
        "formType": "",
        "formfield": "early_termination_of_residential_lease_textfield_12"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 1 Signature and Initials",
      "input_type": "signature",
      "order": 15,

      "block": "signatures",
      "width": 6,
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
          }
        ]
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "early_termination_of_residential_lease_textfield_20",
    "display_attributes": {
      "input_type": "text",
      "order": 16,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    },
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_20"
      }
    ]
  },
  {
    "unique_id": "tenant_2_signature",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_23",
        "linked_dates": [
          {
            "dateFieldName": "early_termination_of_residential_lease_textfield_24"
          }
        ]
      },
      {
        "formType": "",
        "formfield": "early_termination_of_residential_lease_textfield_13"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 2 Signature and Initials",
      "input_type": "signature",
      "order": 17,

      "block": "signatures",
      "width": 6,
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
          }
        ]
      },
      "visibleIf": []
    }
  },
  {
    "unique_id": "early_termination_of_residential_lease_textfield_24",
    "display_attributes": {
      "input_type": "text",
      "order": 18,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    },
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_24"
      }
    ]
  },
  {
    "unique_id": "tenant_3_signature",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_25",
        "linked_dates": [
          {
            "dateFieldName": "early_termination_of_residential_lease_textfield_26"
          }
        ]
      },
      {
        "formType": "",
        "formfield": "early_termination_of_residential_lease_textfield_14"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 3 Signature and Initials",
      "input_type": "signature",
      "order": 19,

      "block": "signatures",
      "width": 6,
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
                "hardCodedValue": "3"
              },
              {
                "columnName": "party_role",
                "hardCodedValue": "tenant"
              }
            ]
          }
        ]
      },
      "visibleIf": []
    }
  },
  {
    "unique_id": "early_termination_of_residential_lease_textfield_26",
    "display_attributes": {
      "input_type": "text",
      "order": 20,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    },
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_26"
      }
    ]
  },
  {
    "unique_id": "tenant_4_signature",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_28",
        "linked_dates": [
          {
            "dateFieldName": "early_termination_of_residential_lease_textfield_29"
          }
        ]
      },
      {
        "formType": "",
        "formfield": "early_termination_of_residential_lease_textfield_15"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 4 Signature and Initials",
      "input_type": "signature",
      "order": 21,

      "block": "signatures",
      "width": 6,
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
                "hardCodedValue": "4"
              },
              {
                "columnName": "party_role",
                "hardCodedValue": "tenant"
              }
            ]
          }
        ]
      },
      "visibleIf": []
    }
  },
  {
    "unique_id": "early_termination_of_residential_lease_textfield_29",
    "display_attributes": {
      "input_type": "text",
      "order": 22,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    },
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_29"
      }
    ]
  },
  {
    "unique_id": "field_1753825774423_7m5qut1o9",
    "display_attributes": {
      "display_name": "Written Property Management/Power of Attorney Signature",
      "input_type": "signature",
      "order": 23,
      "width": 6,
      "value": {
        "type": "manual"
      },
      "description": "The agreement can be signed for the landlord under written property management or power of attorney",
      "block": "signatures",
      "visibleIf": []
    },
    "pdf_attributes": [
      {
        "formType": "early_termination_of_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_27",
        "linked_dates": [
          {
            "dateFieldName": "early_termination_of_residential_lease_textfield_34"
          }
        ]
      },
      {
        "formType": "",
        "formfield": "early_termination_of_residential_lease_textfield_11"
      }
    ]
  },
  {
    "unique_id": "early_termination_of_residential_lease_textfield_34",
    "display_attributes": {
      "input_type": "text",
      "order": 24,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    },
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_34"
      }
    ]
  },

  {
    "unique_id": "broker_associate_name",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_30"
      }
    ],
    "display_attributes": {
      "display_name": "Broker's Associate Name",
      "input_type": "text",
      "order": 25,

      "block": "broker_information",
      "block_style": {
        "title": "Broker/Property Management",
        "icon": "briefcase",
        "color_theme": "orange"
      },
      "placeholder": "Agent Name",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isCached": true,
      "isRequired": true
    }
  },
  {
    "unique_id": "broker_name",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_31"
      }
    ],
    "display_attributes": {
      "display_name": "Broker's Name",
      "input_type": "text",
      "order": 26,

      "block": "broker_information",
      "placeholder": "Broker Name",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isCached": true,
      "isRequired": true
    }
  },
  {
    "unique_id": "broker_license_number",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_32"
      }
    ],
    "display_attributes": {
      "display_name": "License Number",
      "input_type": "text",
      "order": 27,

      "block": "broker_information",
      "placeholder": "RE123456",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "isCached": true,
      "isRequired": true
    }
  },
  {
    "unique_id": "firm_name",
    "pdf_attributes": [
      {
        "formType": "early_termination_residential_lease",
        "formfield": "early_termination_of_residential_lease_textfield_33"
      }
    ],
    "display_attributes": {
      "display_name": "Firm Name",
      "input_type": "text",
      "order": 28,

      "block": "broker_information",
      "placeholder": "Broker Firm Name",
      "width": 8,
      "value": {
        "type": "manual"
      },
      "isCached": true,
      "isRequired": true
    }
  }
];