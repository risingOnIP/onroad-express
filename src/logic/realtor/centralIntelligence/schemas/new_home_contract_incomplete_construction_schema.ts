import { SchemaItem } from "../../../../types/realtor";

export const newHomeContractIncompleteConstructionSchema: SchemaItem[] = [
  {
    "unique_id": "contract_date",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_1"
      }
    ],
    "display_attributes": {
      "display_name": "Contract Date",
      "input_type": "text",
      "order": 1,
      "block": "contract_information",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Contract Information",
        "description": "Contract date and basic information",
        "icon": "file-text",
        "color_theme": "blue"
      },
      "placeholder": "MM/DD/YYYY",
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
      }
    }
  },
  {
    "unique_id": "buyer_name",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_2"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Name",
      "input_type": "text",
      "order": 2,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Parties",
        "description": "Buyer and Seller information",
        "icon": "users",
        "color_theme": "green"
      },
      "placeholder": "John and Jane Doe",
      "isRequired": true
    }
  },
  {
    "unique_id": "text_field_3",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_3"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 3,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Additional Information",
        "description": "Other contract details",
        "icon": "info",
        "color_theme": "gray"
      }
    }
  },
  {
    "unique_id": "construction_detail_4",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_4"
      }
    ],
    "display_attributes": {
      "display_name": "Construction Detail",
      "input_type": "text",
      "order": 4,
      "block": "property_condition",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Property Condition & Construction",
        "description": "Construction specifications and warranties",
        "icon": "tool",
        "color_theme": "gray"
      }
    }
  },
  {
    "unique_id": "text_field_5",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_5"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 5,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "construction_detail_6",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_6"
      }
    ],
    "display_attributes": {
      "display_name": "Construction Detail",
      "input_type": "text",
      "order": 6,
      "block": "property_condition",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_7",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_7"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 7,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "construction_detail_8",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_8"
      }
    ],
    "display_attributes": {
      "display_name": "Construction Detail",
      "input_type": "text",
      "order": 8,
      "block": "property_condition",
      "width": 9,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "sales_price_total",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_9"
      }
    ],
    "display_attributes": {
      "display_name": "Total Sales Price",
      "input_type": "text",
      "order": 9,
      "block": "sales_price",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Sales Price",
        "description": "Purchase price and payment terms",
        "icon": "dollar-sign",
        "color_theme": "orange"
      },
      "placeholder": "$0.00",
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
      "isRequired": true
    }
  },
  {
    "unique_id": "financing_options",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "financing_type",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "THIRD_PARTY",
            "pdfAttribute": "new_home_contract_incomplete_construction_checkbox_1"
          },
          {
            "fromDatabase": "SELLER",
            "pdfAttribute": "new_home_contract_incomplete_construction_checkbox_3"
          },
          {
            "fromDatabase": "LOAN_ASSUMPTION",
            "pdfAttribute": "new_home_contract_incomplete_construction_checkbox_2"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Financing Type",
      "input_type": "checkbox",
      "order": 10,
      "block": "financing",
      "width": 12,
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Third Party",
            "databaseStored": "THIRD_PARTY"
          },
          {
            "display_name": "Seller",
            "databaseStored": "SELLER"
          },
          {
            "display_name": "Loan Assumption",
            "databaseStored": "LOAN_ASSUMPTION"
          }
        ],
        "maxSelected": 1,
        "minSelected": 1
      }
    }
  },
  {
    "unique_id": "text_field_10",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_10"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 11,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_11",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_11"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 12,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "not_party_to_resource_lease",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_5"
      }
    ],
    "display_attributes": {
      "display_name": "Not Party to Natural Resource Lease",
      "input_type": "checkbox",
      "order": 13,
      "block": "natural_resources",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Natural Resources",
        "description": "Natural resource leases",
        "icon": "leaf",
        "color_theme": "green"
      }
    }
  },
  {
    "unique_id": "not_party_to_resource_lease",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_4"
      }
    ],
    "display_attributes": {
      "display_name": "Not Party to Natural Resource Lease",
      "input_type": "checkbox",
      "order": 14,
      "block": "natural_resources",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "resource_lease_delivered",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_6"
      }
    ],
    "display_attributes": {
      "display_name": "Natural Resource Lease Delivered",
      "input_type": "checkbox",
      "order": 15,
      "block": "natural_resources",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_7",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_7"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 16,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "effective_date",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_12"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_15"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_17"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_132"
      }
    ],
    "display_attributes": {
      "display_name": "Effective Date",
      "input_type": "text",
      "order": 17,
      "block": "contract_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "MM/DD/YYYY",
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
      }
    }
  },
  {
    "unique_id": "escrow_agent_name",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_14"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_94"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_93"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_92"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_183"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_185"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_189"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_199"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_201"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_207"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_211"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_213"
      }
    ],
    "display_attributes": {
      "display_name": "Escrow Agent Name",
      "input_type": "text",
      "order": 18,
      "block": "earnest_money",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Earnest Money & Option Fee",
        "description": "Deposit and option period details",
        "icon": "shield",
        "color_theme": "purple"
      },
      "placeholder": "Agent Name"
    }
  },
  {
    "unique_id": "escrow_agent_address",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_13"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_95"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_187"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_188"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_193"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_197"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_198"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_203"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_205"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_200"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_209"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_210"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_215"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_212"
      }
    ],
    "display_attributes": {
      "display_name": "Escrow Agent Address",
      "input_type": "text",
      "order": 19,
      "block": "earnest_money",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "amount_16",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_16"
      }
    ],
    "display_attributes": {
      "display_name": "Amount",
      "input_type": "text",
      "order": 20,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "$0.00",
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
      }
    }
  },
  {
    "unique_id": "earnest_money_amount",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_18"
      }
    ],
    "display_attributes": {
      "display_name": "Earnest Money",
      "input_type": "text",
      "order": 21,
      "block": "earnest_money",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "$0.00",
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
      }
    }
  },
  {
    "unique_id": "text_field_19",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_19"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 22,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_20",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_20"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 23,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_22",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_22"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 24,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_initial_23",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_23"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 25,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "buyer_initial_24",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_24"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 26,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "text_field_21",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_21"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 27,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_25",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_25"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 28,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Additional Provisions",
        "description": "Special provisions and additional terms",
        "icon": "file-text",
        "color_theme": "gray"
      }
    }
  },
  {
    "unique_id": "field_8",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_8"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 29,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_9",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_9"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 30,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "title_company_name",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_26"
      }
    ],
    "display_attributes": {
      "display_name": "Title Company",
      "input_type": "text",
      "order": 31,
      "block": "title_and_survey",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Title Policy & Survey",
        "description": "Title insurance and property survey",
        "icon": "map",
        "color_theme": "blue"
      },
      "placeholder": "Company Name"
    }
  },
  {
    "unique_id": "boundary_not_amended",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_10"
      }
    ],
    "display_attributes": {
      "display_name": "Boundaries Will Not Be Amended",
      "input_type": "checkbox",
      "order": 32,
      "block": "title_and_survey",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "boundary_not_amended",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_11"
      }
    ],
    "display_attributes": {
      "display_name": "Boundaries Will Not Be Amended",
      "input_type": "checkbox",
      "order": 33,
      "block": "title_and_survey",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "area_shortage_buyer_expense",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_12"
      }
    ],
    "display_attributes": {
      "display_name": "Area Shortage at Buyer's Expense",
      "input_type": "checkbox",
      "order": 34,
      "block": "parties",
      "width": 3,
      "value": {
        "type": "manual"
      },
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
      }
    }
  },
  {
    "unique_id": "area_shortage_buyer_expense",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_13"
      }
    ],
    "display_attributes": {
      "display_name": "Area Shortage at Buyer's Expense",
      "input_type": "checkbox",
      "order": 35,
      "block": "parties",
      "width": 3,
      "value": {
        "type": "manual"
      },
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
      }
    }
  },
  {
    "unique_id": "field_14",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_14"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 36,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_27",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_27"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 37,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_15",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_15"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 38,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_28",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_28"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 39,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_29",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_29"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 40,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_30",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_30"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 41,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "closing_date",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_31"
      },
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_78"
      }
    ],
    "display_attributes": {
      "display_name": "Closing Date",
      "input_type": "text",
      "order": 42,
      "block": "closing",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Closing & Possession",
        "description": "Closing date and possession details",
        "icon": "calendar",
        "color_theme": "purple"
      },
      "placeholder": "MM/DD/YYYY",
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
      "isRequired": true
    }
  },
  {
    "unique_id": "not_subject_to_hoa",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_17"
      }
    ],
    "display_attributes": {
      "display_name": "Not Subject to HOA",
      "input_type": "checkbox",
      "order": 43,
      "block": "hoa",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "HOA Information",
        "description": "Homeowners association details",
        "icon": "home",
        "color_theme": "green"
      }
    }
  },
  {
    "unique_id": "not_subject_to_hoa",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_16"
      }
    ],
    "display_attributes": {
      "display_name": "Not Subject to HOA",
      "input_type": "checkbox",
      "order": 44,
      "block": "hoa",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_32",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_32"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 45,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_33",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_33"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 46,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_initial_34",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_34"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 47,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "buyer_initial_35",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_35"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 48,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "text_area_36",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_36"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 49,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_38",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_38"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 50,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_37",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_37"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 51,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_initial_39",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_39"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 52,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "buyer_initial_40",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_40"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 53,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "text_area_41",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_41"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 54,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_42",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_42"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 55,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_43",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_43"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 56,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_44",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_44"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 57,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "construction_detail_45",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_45"
      }
    ],
    "display_attributes": {
      "display_name": "Construction Detail",
      "input_type": "text",
      "order": 58,
      "block": "property_condition",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_signature_46",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_46"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Signature",
      "input_type": "signature",
      "order": 59,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "construction_detail_47",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_47"
      }
    ],
    "display_attributes": {
      "display_name": "Construction Detail",
      "input_type": "text",
      "order": 60,
      "block": "property_condition",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "construction_detail_48",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_48"
      }
    ],
    "display_attributes": {
      "display_name": "Construction Detail",
      "input_type": "text",
      "order": 61,
      "block": "property_condition",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_49",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_49"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 62,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_50",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_50"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 63,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "specs_attached",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_18"
      }
    ],
    "display_attributes": {
      "display_name": "Specifications Attached",
      "input_type": "checkbox",
      "order": 64,
      "block": "property_condition",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "specs_attached",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_19"
      }
    ],
    "display_attributes": {
      "display_name": "Specifications Attached",
      "input_type": "checkbox",
      "order": 65,
      "block": "property_condition",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_51",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_51"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 66,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_53",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_53"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 67,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_spec_52",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_52"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation Specification",
      "input_type": "text",
      "order": 68,
      "block": "property_condition",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_54",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_54"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 69,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_55",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_55"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 70,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_spec_56",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_56"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation Specification",
      "input_type": "text",
      "order": 71,
      "block": "property_condition",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_r_value",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "inches which yields an RValue of_2.new_home_contract_incomplete_construction_textfield_57"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation R-Value",
      "input_type": "text",
      "order": 72,
      "block": "property_condition",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_58",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_58"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 73,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_spec_60",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_60"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation Specification",
      "input_type": "text",
      "order": 74,
      "block": "property_condition",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_spec_59",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_59"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation Specification",
      "input_type": "text",
      "order": 75,
      "block": "property_condition",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_spec_61",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_61"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation Specification",
      "input_type": "text",
      "order": 76,
      "block": "property_condition",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_62",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_62"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 77,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_64",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_64"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 78,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_spec_63",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_63"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation Specification",
      "input_type": "text",
      "order": 79,
      "block": "property_condition",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_spec_65",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_65"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation Specification",
      "input_type": "text",
      "order": 80,
      "block": "property_condition",
      "width": 9,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_spec_66",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_66"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation Specification",
      "input_type": "text",
      "order": 81,
      "block": "property_condition",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_67",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_67"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 82,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "insulation_spec_68",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_68"
      }
    ],
    "display_attributes": {
      "display_name": "Insulation Specification",
      "input_type": "text",
      "order": 83,
      "block": "property_condition",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_21",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_21"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 84,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_20",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_20"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 85,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_23",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_23"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 86,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_22",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_22"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 87,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_25",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_25"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 88,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_24",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_24"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 89,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_27",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_27"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 90,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_26",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_26"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 91,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_initial_71",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_71"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 92,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "buyer_initial_72",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_72"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 93,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "text_field_70",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_70"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 94,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_69",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_69"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 95,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_73",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_73"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 96,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_29",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_29"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 97,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_28",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_28"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 98,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_31",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_31"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 99,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_30",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_30"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 100,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_33",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_33"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 101,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_32",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_32"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 102,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_35",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_35"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 103,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_34",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_34"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 104,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_37",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_37"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 105,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_36",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_36"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 106,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_74",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_74"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 107,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_75",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_75"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 108,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_76",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_76"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 109,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "seller_payment_acknowledgment",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "acknowledged by Seller and Buyers agreement to pay Seller.new_home_contract_incomplete_construction_textfield_77"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Payment Acknowledgment",
      "input_type": "text",
      "order": 110,
      "block": "parties",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_79",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_79"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 111,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_38",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_38"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 112,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_39",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_39"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 113,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_80",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_80"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 114,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_81",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_81"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 115,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_82",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_82"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 116,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_83",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_83"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 117,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_84",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_84"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 118,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_initial_85",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_85"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 119,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "buyer_initial_86",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_86"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 120,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "text_area_87",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_87"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 121,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_88",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_88"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 122,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_89",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_89"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 123,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_40",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_40"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 124,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_41",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_41"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 125,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_90",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_90"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 126,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_identification_initial_91",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "Initialed for identification by Buyer_5.new_home_contract_incomplete_construction_textfield_91"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Identification Initial",
      "input_type": "signature",
      "order": 127,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "seller_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_96"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Phone",
      "input_type": "text",
      "order": 128,
      "block": "parties",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "text_field_103",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_103"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 129,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_97"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Phone",
      "input_type": "text",
      "order": 130,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "seller_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_104"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Phone",
      "input_type": "text",
      "order": 131,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "text_field_105",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_105"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 132,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_106",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_106"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 133,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_98",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_98"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 134,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_99",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_99"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 135,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "seller_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_107"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Phone",
      "input_type": "text",
      "order": 136,
      "block": "parties",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "buyer_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_100"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Phone",
      "input_type": "text",
      "order": 137,
      "block": "parties",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "seller_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_108"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Phone",
      "input_type": "text",
      "order": 138,
      "block": "parties",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "buyer_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_101"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Phone",
      "input_type": "text",
      "order": 139,
      "block": "parties",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "seller_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_109"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Phone",
      "input_type": "text",
      "order": 140,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "buyer_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_102"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Phone",
      "input_type": "text",
      "order": 141,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "field_42",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_42"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 142,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_51",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_51"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 143,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_43",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_43"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 144,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_52",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_52"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 145,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_44",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_44"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 146,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_53",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_53"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 147,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_54",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_54"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 148,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_45",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_45"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 149,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_46",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_46"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 150,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_55",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_55"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 151,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_47",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_47"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 152,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_56",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_56"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 153,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_48",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_48"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 154,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_57",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_57"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 155,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_49",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_49"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 156,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_58",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_58"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 157,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_50",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_50"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 158,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_59",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_59"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 159,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_110",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_110"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 160,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_111",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_111"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 161,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_112",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_112"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 162,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_113",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_113"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 163,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_initial_114",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_114"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 164,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "buyer_initial_115",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_115"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Initial",
      "input_type": "signature",
      "order": 165,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      }
    }
  },
  {
    "unique_id": "text_area_116",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_116"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 166,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "buyer_signature_117",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_117"
      }
    ],
    "display_attributes": {
      "display_name": "Buyer Signature",
      "input_type": "signature",
      "order": 167,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual",
        "output": "SignatureInput__signer"
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "text_field_124",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_124"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 168,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_118",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_118"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 169,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "seller_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_125"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Phone",
      "input_type": "text",
      "order": 170,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "text_field_127",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_127"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 171,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_120",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_120"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 172,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_126",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_126"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 173,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_119",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_119"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 174,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_128",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_128"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 175,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_129",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_129"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 176,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_121",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_121"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 177,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_122",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_122"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 178,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_123",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_123"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 179,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_130",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_130"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 180,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_131",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_131"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 181,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_133",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_133"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 182,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_134",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_134"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 183,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_136",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_136"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 184,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_137",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_137"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 185,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "construction_detail_135",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_135"
      }
    ],
    "display_attributes": {
      "display_name": "Construction Detail",
      "input_type": "text",
      "order": 186,
      "block": "property_condition",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_area_138",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_138"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 187,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "broker_license_140",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_140"
      }
    ],
    "display_attributes": {
      "display_name": "Broker License",
      "input_type": "text",
      "order": 188,
      "block": "broker_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Broker Information",
        "description": "Real estate broker and agent details",
        "icon": "briefcase",
        "color_theme": "purple"
      },
      "placeholder": "123456",
      "validation": {
        "loopback": [
          {
            "regex": "^[A-Za-z0-9]+$",
            "message": "Must be a valid license number"
          }
        ]
      }
    }
  },
  {
    "unique_id": "broker_license_153",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_153"
      }
    ],
    "display_attributes": {
      "display_name": "Broker License",
      "input_type": "text",
      "order": 189,
      "block": "broker_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "123456",
      "validation": {
        "loopback": [
          {
            "regex": "^[A-Za-z0-9]+$",
            "message": "Must be a valid license number"
          }
        ]
      }
    }
  },
  {
    "unique_id": "broker_license_154",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_154"
      }
    ],
    "display_attributes": {
      "display_name": "Broker License",
      "input_type": "text",
      "order": 190,
      "block": "broker_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "123456",
      "validation": {
        "loopback": [
          {
            "regex": "^[A-Za-z0-9]+$",
            "message": "Must be a valid license number"
          }
        ]
      }
    }
  },
  {
    "unique_id": "broker_license_139",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_139"
      }
    ],
    "display_attributes": {
      "display_name": "Broker License",
      "input_type": "text",
      "order": 191,
      "block": "broker_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "123456",
      "validation": {
        "loopback": [
          {
            "regex": "^[A-Za-z0-9]+$",
            "message": "Must be a valid license number"
          }
        ]
      }
    }
  },
  {
    "unique_id": "field_60",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_60"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 192,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_62",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_62"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 193,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_61",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_61"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 194,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "agent_license_155",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_155"
      }
    ],
    "display_attributes": {
      "display_name": "Agent License",
      "input_type": "text",
      "order": 195,
      "block": "broker_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "123456",
      "validation": {
        "loopback": [
          {
            "regex": "^[A-Za-z0-9]+$",
            "message": "Must be a valid license number"
          }
        ]
      }
    }
  },
  {
    "unique_id": "text_field_156",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_156"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 196,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_141",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_141"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 197,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "broker_license_142",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_142"
      }
    ],
    "display_attributes": {
      "display_name": "Broker License",
      "input_type": "text",
      "order": 198,
      "block": "broker_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "123456",
      "validation": {
        "loopback": [
          {
            "regex": "^[A-Za-z0-9]+$",
            "message": "Must be a valid license number"
          }
        ]
      }
    }
  },
  {
    "unique_id": "seller_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_157"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Phone",
      "input_type": "text",
      "order": 199,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "seller_phone",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_143"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Phone",
      "input_type": "text",
      "order": 200,
      "block": "parties",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "address_144",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_144"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 201,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "address_145",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_145"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 202,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "agent_license_159",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_159"
      }
    ],
    "display_attributes": {
      "display_name": "Agent License",
      "input_type": "text",
      "order": 203,
      "block": "broker_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "123456",
      "validation": {
        "loopback": [
          {
            "regex": "^[A-Za-z0-9]+$",
            "message": "Must be a valid license number"
          }
        ]
      }
    }
  },
  {
    "unique_id": "contact_phone_158",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_158"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 204,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_160",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_160"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 205,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_161",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_161"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 206,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "address_146",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_146"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 207,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "address_147",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_147"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 208,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "contact_phone_162",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_162"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 209,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_163",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_163"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 210,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "address_149",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_149"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 211,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "address_148",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_148"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 212,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "contact_phone_165",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_165"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 213,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_166",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_166"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 214,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "address_150",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_150"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 215,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "contact_phone_151",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_151"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 216,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_152",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_152"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 217,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_164",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_164"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 218,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_167",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_167"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 219,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_168",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_168"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 220,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_169",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_169"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 221,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_170",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_170"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 222,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_171",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_171"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 223,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_172",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_172"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 224,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_173",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_173"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 225,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_174",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_174"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 226,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "address_175",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_175"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 227,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "address_176",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_176"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 228,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "agent_license_177",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_177"
      }
    ],
    "display_attributes": {
      "display_name": "Agent License",
      "input_type": "text",
      "order": 229,
      "block": "broker_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "123456",
      "validation": {
        "loopback": [
          {
            "regex": "^[A-Za-z0-9]+$",
            "message": "Must be a valid license number"
          }
        ]
      }
    }
  },
  {
    "unique_id": "additional_cost_179",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_179"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Cost",
      "input_type": "text",
      "order": 230,
      "block": "property_details",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "title": "Property Description",
        "description": "Legal description and address",
        "icon": "home",
        "color_theme": "blue"
      },
      "placeholder": "Subdivision Name",
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
      }
    }
  },
  {
    "unique_id": "text_field_178",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_178"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 231,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "field_64",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_checkbox_64"
      }
    ],
    "display_attributes": {
      "display_name": "Field",
      "input_type": "checkbox",
      "order": 232,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "seller_agent_representation",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "Seller only as Sellers agent.new_home_contract_incomplete_construction_checkbox_63"
      }
    ],
    "display_attributes": {
      "display_name": "Seller Agent Representation",
      "input_type": "checkbox",
      "order": 233,
      "block": "parties",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "Agent Name"
    }
  },
  {
    "unique_id": "text_area_180",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_180"
      }
    ],
    "display_attributes": {
      "display_name": "Additional Information",
      "input_type": "text-area",
      "order": 234,
      "block": "additional_provisions",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_181",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_181"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 235,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_182",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_182"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 236,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "text_field_184",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_184"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 237,
      "block": "additional_information",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "email_186",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_186"
      }
    ],
    "display_attributes": {
      "display_name": "Email",
      "input_type": "text",
      "order": 238,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "example@email.com",
      "validation": {
        "loopback": [
          {
            "regex": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "message": "Must be a valid email address"
          }
        ]
      },
      // "special_input": {
      //   "text": {
      //     "email": true
      //   }
      // },
    }
  },
  {
    "unique_id": "contact_phone_194",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_194"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 239,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_195",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_195"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 240,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "text_field_192",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_192"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 241,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "address_190",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_190"
      }
    ],
    "display_attributes": {
      "display_name": "Address",
      "input_type": "text",
      "order": 242,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "123 Main Street"
    }
  },
  {
    "unique_id": "text_field_191",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_191"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 243,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "contact_phone_196",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_196"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 244,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_204",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_204"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 245,
      "block": "additional_information",
      "width": 3,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "text_field_202",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_202"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 246,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "contact_phone_206",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_206"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 247,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_208",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_208"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 248,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_216",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_216"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 249,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "contact_phone_217",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_217"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 250,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "text_field_214",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_214"
      }
    ],
    "display_attributes": {
      "display_name": "Information",
      "input_type": "text",
      "order": 251,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "contact_phone_218",
    "pdf_attributes": [
      {
        "formType": "new_home_contract_incomplete_construction",
        "formfield": "new_home_contract_incomplete_construction_textfield_218"
      }
    ],
    "display_attributes": {
      "display_name": "Contact Phone",
      "input_type": "text",
      "order": 252,
      "block": "additional_information",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "placeholder": "(555) 123-4567",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10,}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  }
];
