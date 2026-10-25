import { Schema } from "../../../../types/realtor";

export const RESIDENTIAL_LEASE_AGREEMENT_SCHEMA: Schema = [

  {
    "unique_id": "lease_info",
    "display_attributes": {
      "display_name": "Residential Lease Agreement",
      "description": "This form establishes a comprehensive rental agreement between landlord and tenant(s) for residential property. All parties must complete and sign this agreement before occupancy begins.",
                  "order": 1,
      "input_type": "info",
      "block_style": {
        "title": "Residential Lease Agreement",
        "description": "Comprehensive rental agreement for residential property",
        "icon": "Info",
        "color_theme": "blue"
      },
      "value": {
        "type": "manual"
      },
      "width": 12
    }
  },
  {
    "unique_id": "landlord_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_name",
        "linked_form_fields_text": [
          "landlord_name",
          "landlord_name_cont"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "John Doe",
      "display_name": "Landlord Names",
      "description": "Full legal name of all property owners/landlords as it should appear on the lease agreement",
      "order": 2,
      "input_type": "text",
      "block": "Landlord Information",
      "block_style": {
        "title": "Landlord Information",
        "description": "Property owner details and contact information",
        "icon": "Users",
        "color_theme": "green"
      },
      "value": {
        "type": "reserved",
        "reserved": "landlord_name_csv"
      },
      "width": 6,
      "isRequired": true,
      "breakBefore": true
    }
  },
  {
    "unique_id": "tenant_names",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_names",
        "linked_form_fields_text": [
          "tenant_names",
          "tenant_names_cont"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "Jane Smith, John Smith",
      "display_name": "Tenant Names",
      "description": "Full legal names of all tenants who will be lividng in the property \n",
      "order": 3,
      "input_type": "text",
      "block": "Landlord Information",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isRequired": true
    }
  },
  {
    "unique_id": "property_street_address",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_street_address"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_1"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_2"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_3"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_4"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_5"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_6"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_7"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_8"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_9"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_10"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_11"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_12"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_13"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_14"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_15"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_address_linked_16"
      }
    ],
    "display_attributes": {
      "placeholder": "123 Main Street, Apt 4B",
      "display_name": "Property Street Address",
      "description": "Complete street address of the rental property including unit number if applicable",
                  "order": 4,
      "input_type": "text",
      "block": "Property Information",
      "block_style": {
        "title": "Property Information",
        "description": "Details about the rental property location and description",
        "icon": "Home",
        "color_theme": "purple"
      },
      "value": {
        "type": "manual"
      },
      "attribute": {
        "key": "property_street_address",
        "operation": "value",
        "reverseOperation": "value"
      },
      "width": 8,
      "isRequired": true,
      "breakBefore": true
    }
  },
  {
    "unique_id": "property_county",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_county"
      }
    ],
    "display_attributes": {
      "placeholder": "Harris County",
      "display_name": "Property County",
      "description": "County where the rental property is located",
                  "order": 5,
      "input_type": "text",
      "block": "Property Information",
      "value": {
        "type": "manual"
      },
      "width": 4,
      "isRequired": true
    }
  },
  {
    "unique_id": "property_legal_description",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_legal_description",
        "linked_form_fields_text": [
          "property_legal_description",
          "property_legal_description_cont"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "Legal property description from deed or survey",
      "display_name": "Property Legal Description",
      "description": "Official legal description of the property as it appears in county records",
                  "order": 6,
      "input_type": "text-area",
      "block": "Property Information",
      "value": {
        "type": "manual"
      },
      "width": 6,
    }
    
  },
  {
    "unique_id": "property_items",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_items_1",
        "linked_form_fields_text": [
          "property_items_1",
          "property_items_2"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "Appliances, furniture, fixtures, etc.",
      "display_name": "Property Items & Fixtures",
      "description": "Non-real property items included with rental (appliances, furniture, etc.)",
                  "order": 7,
      "input_type": "text-area",
      "block": "Property Information",
      "value": {
        "type": "manual"
      },
      "width": 6,
    }
  },
  {
    "unique_id": "delay of occupancy",
    "display_attributes": {
      "display_name": "Delay of Occupancy",
      "input_type": "info",
      "description": "Tenant must move in within 5 days of the lease start date. If delayed by construction or a previous tenant staying too long, the tenant can cancel the lease with written notice. The landlord will refund rent and the deposit and won’t charge rent during that delay. This doesn’t apply to delays from cleaning or repairs.",
                  "order": 8,
      "breakBefore": true,
      "block": "Lease Term",
      "width": 12,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "info": {
          "style": "subtle"
        }
      },
      "block_style": {
        "color_theme": "green"
      }
    }
  },
  {
    "unique_id": "lease_start_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "lease_start_date"
      }
    ],
    "display_attributes": {
      "placeholder": "MM/DD/YYYY",
      "display_name": "Lease Start Date",
      "description": "Date when the lease term begins and tenant may take possession",
                  "order": 9,
      "input_type": "text",
      "block": "Lease Term",
      "block_style": {
        "title": "Lease Term",
        "description": "Primary term of the lease agreement",
        "icon": "Calendar",
        "color_theme": "orange"
      },
      "validation": {
        "loopback": [
          {
            "regex": "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            "message": "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "attribute": {
        "key": "lease_start_date",
        "operation": "value",
        "reverseOperation": "value"
      },
      "width": 6,
      "isRequired": true,
      "breakBefore": true,
      "special_input": {
        "text": {
          "date": true
        }
      }
    }
  },
  {
    "unique_id": "lease_end_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "lease_end_date"
      }
    ],
    "display_attributes": {
      "placeholder": "MM/DD/YYYY",
      "display_name": "Lease End Date",
      "description": "Date when the lease term expires and tenant must vacate",
                  "order": 10,
      "input_type": "text",
      "block": "Lease Term",
      "validation": {
        "loopback": [
          {
            "regex": "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            "message": "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isRequired": true,
      "special_input": {
        "text": {
          "date": true
        }
      }
    }
  },
  {
    "unique_id": "auto_renewal_term_checkbox",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "auto_renewal_30_days_before_expiration_date",
            "pdfAttribute": "auto_renewal_30_days_before_expiration_date"
          },
          {
            "fromDatabase": "auto_renewal_custom_days_before_expiration_date",
            "pdfAttribute": "auto_renewal_custom_days_before_expiration_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Auto Renewal",
      "description": "",
                  "order": 11,
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Auto Renew Lease unless terminated with 30 days written notice before expiration",
            "databaseStored": "auto_renewal_30_days_before_expiration_date"
          },
          {
            "display_name": "Auto Renew Lease unless terminated with specified days written notice before expiration",
            "databaseStored": "auto_renewal_custom_days_before_expiration_date",
            "linkedFields": [
              "auto_renewal_days_before_expiration_date"
            ]
          }
        ],
        "maxSelected": 1
      },
      "block": "Automatic Renewal & Notice of Termination",
      "block_style": {
        "title": "Automatic Renewal & Notice of Termination",
        "description": "This lease will renew month-to-month unless either the Landlord or Tenant gives written notice to end it ahead of time. Oral notice of termination is not valid.",
        "icon": "Clock",
        "color_theme": "blue"
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "isRequired": true,
      "special_input": {
        "checkbox": {
          "asRadio": true
        }
      }
    }
  },
  {
    "unique_id": "auto_renewal_days_before_expiration_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "auto_renewal_days_before_expiration_date"
      }
    ],
    "display_attributes": {
      "placeholder": "30",
      "display_name": "Notice Days for Termination",
      "description": "Number of days advance written notice required to terminate lease",
                  "order": 12,
      "input_type": "text",
      "block": "Automatic Renewal & Notice of Termination",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "visibleIf": [
        {
          "unique_id": "auto_renewal_term_checkbox",
          "operation": "contains",
          "valueChecked": "auto_renewal_custom_days_before_expiration_date"
        }
      ],
      "isRequired": true
    }
  },
  {
    "unique_id": "field_1753905753890_9oekgv8mx",
    "display_attributes": {
      "display_name": "Effective Date of Termination",
      "input_type": "checkbox",
                  "order": 13,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "description": "After either party gives a written notice to end the lease, the lease will end on this date. Rent will be prorated on a daily basis if necessary.",
      "checkbox_options": {
        "options": [
          {
            "display_name": "On the last day of the month following the date of notice",
            "databaseStored": "renewal_notice_on_last_day_of_month"
          },
          {
            "display_name": "On the date designated in the notice but not sooner than 30 days after the date of notice",
            "databaseStored": "renewal_notice_on_date_assigned"
          },
        ],
      },
      "special_input": {
        "checkbox": {
          "asRadio": true
        }
      },
      "block": "Automatic Renewal & Notice of Termination"
    },
    "pdf_attributes": [
      {
        "formType": "",
        "formfield": "renewal_notice_termination_date",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "renewal_notice_on_last_day_of_month",
            "pdfAttribute": "renewal_notice_on_last_day_of_month"
          },
          {
            "fromDatabase": "renewal_notice_on_date_assigned",
            "pdfAttribute": "renewal_notice_on_date_assigned"
          }
        ]
      }
    ]
  },
  {
    "unique_id": "monthly_rent_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "monthly_rent_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "2,500.00",
      "display_name": "Monthly Rent Amount",
                  "order": 14,
      "input_type": "text",
      "block": "Rent & Payment Information",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "isRequired": true,
      "breakBefore": true,
      "block_style": {
        "title": "Rent & Payment Information",
        "icon": "CreditCard",
        "description": "Rent amounts, deposits, fees, and payment details",
        "color_theme": "purple"
      },
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "monthly_rent_due_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "monthly_rent_due_date",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "rent_due_on_first_day_of_month",
            "pdfAttribute": "rent_due_on_first_day_of_month"
          },
          {
            "fromDatabase": "rent_due_on_custom_date",
            "pdfAttribute": "rent_due_on_custom_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Monthly Rent Due Date",
                  "order": 15,
      "input_type": "checkbox",
      "block": "Rent & Payment Information",
      "block_style": {
        "title": "Rent & Payment Information",
        "description": "Rent amounts, deposits, fees, and payment details",
        "icon": "CreditCard",
        "color_theme": "purple"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "First Day of Each Month",
            "databaseStored": "rent_due_on_first_day_of_month"
          },
          {
            "display_name": "Other Date",
            "databaseStored": "rent_due_on_custom_date",
            "linkedFields": [
              "field_1753906744487_7hjm5i774"
            ]
          }
        ],
        "maxSelected": 1
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "asRadio": true,
          "horizontal": 2
        }
      }
    }
  },
  {
    "unique_id": "field_1753906744487_7hjm5i774",
    "display_attributes": {
      "display_name": "Rent Due Date (Day of Month)",
      "input_type": "text",
                  "order": 16,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Rent & Payment Information",
      "placeholder": "5th"
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "rent_due_date_day"
      }
    ]
  },
  {
    "unique_id": "payment_payee_landlord",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "payment_payee_landlord",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "payment_payee_landlord",
            "pdfAttribute": "payment_payee_landlord"
          },
          {
            "fromDatabase": "payment_payee_manager",
            "pdfAttribute": "payment_payee_manager"
          },
          {
            "fromDatabase": "payment_payee_broker",
            "pdfAttribute": "payment_payee_broker"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Who should the first month's rent be paid to?",
      "description": "The first month's rent can be paid to either the landlord, manager, or broker and may be due on a different date than the monthly rent due date.",
                  "order": 17,
      "input_type": "checkbox",
      "block": "Rent & Payment Information",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Landlord",
            "databaseStored": "payment_payee_landlord",
            "linkedFields": [
              "first_month_rent_due_date"
            ]
          },
          {
            "display_name": "Manager",
            "databaseStored": "payment_payee_manager",
            "linkedFields": [
              "first_month_rent_due_date"
            ]
          },
          {
            "display_name": "Broker",
            "databaseStored": "payment_payee_broker",
            "linkedFields": [
              "first_month_rent_due_date"
            ]
          }
        ],
        "maxSelected": 1
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "asRadio": true,
          "horizontal": 3
        }
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "first_month_rent_due_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "first_month_rent_due_date"
      }
    ],
    "display_attributes": {
      "placeholder": "MM/DD/YYYY",
      "display_name": "First Month Rent Due Date",
      "description": "Due date for first month's rent",
                  "order": 18,
      "input_type": "text",
      "block": "Rent & Payment Information",
      "validation": {
        "loopback": [
          {
            "regex": "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            "message": "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "isRequired": true,
      "special_input": {
        "text": {
          "date": true
        }
      }
    }
  },
  {
    "unique_id": "field_1753920423365_p54rmzmbe",
    "display_attributes": {
      "display_name": "If there is a different payment method make sure it is acceptable to all parties involved",
      "input_type": "info",
                  "order": 19,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Rent & Payment Information",
      "visibleIf": [
        {
          "unique_id": "payment_method_cashier",
          "operation": "contains",
          "valueChecked": "payment_method_other"
        }
      ]
    }
  },
  {
    "unique_id": "payment_method_cashier",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "payment_method_cashier",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "payment_method_cashier",
            "pdfAttribute": "payment_method_cashier"
          },
          {
            "fromDatabase": "payment_method_electronic",
            "pdfAttribute": "payment_method_electronic"
          },
          {
            "fromDatabase": "payment_method_money_order",
            "pdfAttribute": "payment_method_money_order"
          },
          {
            "fromDatabase": "payment_method_personal_check",
            "pdfAttribute": "payment_method_personal_check"
          },
          {
            "fromDatabase": "payment_method_other",
            "pdfAttribute": "payment_method_other"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Payment Method For First Month's Rent",
                  "order": 20,
      "input_type": "checkbox",
      "block": "Rent & Payment Information",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Cashier's Check",
            "databaseStored": "payment_method_cashier"
          },
          {
            "display_name": "Electronic",
            "databaseStored": "payment_method_electronic"
          },
          {
            "display_name": "Money Order",
            "databaseStored": "payment_method_money_order"
          },
          {
            "display_name": "Personal Check",
            "databaseStored": "payment_method_personal_check"
          },
          {
            "display_name": "Other",
            "databaseStored": "payment_method_other"
          }
        ],
        
        "maxSelected": 5
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 5
        }
      }
    }
  },
  {
    "unique_id": "prorated_rent_explanation",
    "display_attributes": {
      "display_name": "Prorated Rent",
      "description": "Prorated rent is the amount of rent that is due for the partial month of occupancy. For example if the tenant moves in on the 15th of the month, the landlord will prorate the rent for the first month.",
                  "order": 21,
      "input_type": "info",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "block": "Rent & Payment Information",
      "special_input": {
        "info": {
          "style": "subtle"
        }
      }
    }
  },
  {
    "unique_id": "prorated_rent_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "prorated_rent_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "500.00",
      "display_name": "Prorated Rent Amount",
                  "order": 22,
      "input_type": "text",
      "block": "Rent & Payment Information",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "prorated_rent_due_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "prorated_rent_due_date"
      }
    ],
    "display_attributes": {
      "placeholder": "MM/DD/YYYY",
      "display_name": "Prorated Rent Due Date",
                  "order": 23,
      "input_type": "text",
      "block": "Rent & Payment Information",
      "validation": {
        "loopback": [
          {
            "regex": "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            "message": "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "special_input": {
        "text": {
          "date": true
        }
      }
    }
  },
  {
    "unique_id": "field_1753920045814_aoyvwev4x",
    "display_attributes": {
      "display_name": "If there is a different payment method make sure it is acceptable to all parties involved",
      "input_type": "info",
                  "order": 24,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Rent & Payment Information",
      "visibleIf": [
        {
          "unique_id": "prorated_rent_payment_method",
          "operation": "contains",
          "valueChecked": "prorated_rent_payment_method_other"
        }
      ]
    }
  },
  {
    "unique_id": "prorated_rent_payment_method",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "prorated_rent_payment_method",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "prorated_payment_method_cashier",
            "pdfAttribute": "prorated_payment_method_cashier"
          },
          {
            "fromDatabase": "prorated_payment_method_electronic",
            "pdfAttribute": "prorated_payment_method_electronic"
          },
          {
            "fromDatabase": "prorated_payment_method_money_order",
            "pdfAttribute": "prorated_payment_method_money_order"
          },
          {
            "fromDatabase": "prorated_payment_method_personal_check",
            "pdfAttribute": "prorated_payment_method_personal_check"
          },
          {
            "fromDatabase": "prorated_payment_method_other",
            "pdfAttribute": "prorated_payment_method_other"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Prorated Rent Payment Method",
      "order": 25,
      "input_type": "checkbox",
      "block": "Rent & Payment Information",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Cashier's Check",
            "databaseStored": "prorated_rent_payment_method_cashier"
          },
          {
            "display_name": "Electronic",
            "databaseStored": "prorated_payment_method_electronic"
          },
          {
            "display_name": "Money Order",
            "databaseStored": "prorated_payment_method_money_order"
          },
          {
            "display_name": "Personal Check",
            "databaseStored": "prorated_payment_method_personal_check"
          },
          {
            "display_name": "Other",
            "databaseStored": "prorated_payment_method_other"
          }
        ],
        "minSelected": 0,
        "maxSelected": 5
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 5
        }
      },
      "visibleIf": []
    }
  },
  {
    "unique_id": "place_of_payment_explanation",
    "display_attributes": {
      "display_name": "Place of Payment",
      "description": "Tenant must pay all rent payments to the person and address specified here. If the landlord wishes, they may later designate another person or place of payment. The property address and tenant's name must be included on all payments.",
                  "order": 26,
      "input_type": "info",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "block": "Rent & Payment Information",
      "special_input": {
        "info": {
          "style": "compact"
        }
      }
    }
  },
  {
    "unique_id": "payment_recipient_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "payment_recipient_name"
      }
    ],
    "display_attributes": {
      "placeholder": "John Doe",
      "display_name": "Payment Recipient Name",
                  "order": 27,
      "input_type": "text",
      "block": "Rent & Payment Information",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isRequired": true
    }
  },
  {
    "unique_id": "payment_address",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "payment_address",
        "linked_form_fields_text": [
          "payment_address",
          "payment_address_continued"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": 'e.g., P.O. Box Account No: __ Routing No: __',
      "display_name": "Payment Address or Bank Info",
                  "order": 28,
      "input_type": "text",
      "block": "Rent & Payment Information",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isRequired": true
    }
  },
  {
    "unique_id": "payment_processing_fee",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "payment_processing_fee",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "payment_fee_option",
            "pdfAttribute": "payment_fee_option"
          },
          {
            "fromDatabase": "payment_fee_restriction",
            "pdfAttribute": "payment_fee_restriction"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Payment Processing Fee",
      "description": "The landlord may be able to charge a reasonablefee for processing payments through certain methods indicated below.",
                  "order": 29,
      "input_type": "checkbox",
      "block": "Rent & Payment Information",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Payment Processing Fee Allowed",
            "databaseStored": "payment_fee_option",
            "linkedFields": [
              "payment_processing_fee_type"
            ]
          },
          {
            "display_name": "Payment Processing Fee Not Allowed",
            "databaseStored": "payment_fee_restriction"
          }
        ],
        
        "maxSelected": 1
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "asRadio": true,
          "horizontal": 2
        }
      }
    }
  },
  {
    "unique_id": "field_1753920997696_c1f5oec5t",
    "display_attributes": {
      "display_name": "If there is a different payment method make sure it is acceptable to all parties involved",
      "input_type": "info",
                  "order": 30,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Rent & Payment Information",
      "visibleIf": [
        {
          "unique_id": "accepted_payment_methods",
          "operation": "contains",
          "valueChecked": "accepted_payment_other"
        }
      ]
    }
  },
  {
    "unique_id": "accepted_payment_methods",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "accepted_payment_methods",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "accepted_payment_cashier",
            "pdfAttribute": "accepted_payment_cashier"
          },
          {
            "fromDatabase": "accepted_payment_money_order",
            "pdfAttribute": "accepted_payment_money_order"
          },
          {
            "fromDatabase": "accepted_payment_personal_check",
            "pdfAttribute": "accepted_payment_personal_check"
          },
          {
            "fromDatabase": "accepted_payment_electronic",
            "pdfAttribute": "accepted_payment_electronic"
          },
          {
            "fromDatabase": "accepted_payment_other",
            "pdfAttribute": "accepted_payment_other"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Accepted Payment Methods",
      "description": "Tenant may pay rent by cash, cashier's check, money order, personal check, or electronic payment.",
                  "order": 31,
      "input_type": "checkbox",
      "block": "Rent & Payment Information",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Cashier's Check",
            "databaseStored": "accepted_payment_cashier"
          },
          {
            "display_name": "Money Order",
            "databaseStored": "accepted_payment_money_order"
          },
          {
            "display_name": "Personal Check",
            "databaseStored": "accepted_payment_personal_check"
          },
          {
            "display_name": "Electronic",
            "databaseStored": "accepted_payment_electronic"
          },
          {
            "display_name": "Other",
            "databaseStored": "accepted_payment_other"
          }
        ],
        
        "maxSelected": 5
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 5
        }
      }
    }
  },
  {
    "unique_id": "payment_processing_fee_type",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "payment_processing_fee_type",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "fee_payment_cashier",
            "pdfAttribute": "fee_payment_cashier"
          },
          {
            "fromDatabase": "fee_payment_money_order",
            "pdfAttribute": "fee_payment_money_order"
          },
          {
            "fromDatabase": "fee_payment_personal_check",
            "pdfAttribute": "fee_payment_personal_check"
          },
          {
            "fromDatabase": "fee_payment_electronic",
            "pdfAttribute": "fee_payment_electronic"
          },
          {
            "fromDatabase": "fee_payment_other",
            "pdfAttribute": "fee_payment_other"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Payment Processing Fee Type",
      "description": "Payment processing fee type",
                  "order": 32,
      "input_type": "checkbox",
      "block": "Rent & Payment Information",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Cashier's Check",
            "databaseStored": "fee_payment_cashier"
          },
          {
            "display_name": "Money Order",
            "databaseStored": "fee_payment_money_order"
          },
          {
            "display_name": "Personal Check",
            "databaseStored": "fee_payment_personal_check"
          },
          {
            "display_name": "Electronic",
            "databaseStored": "fee_payment_electronic"
          },
          {
            "display_name": "Other",
            "databaseStored": "fee_payment_other"
          }
        ],
        
        "maxSelected": 5
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 3
        }
      }
    }
  },
  {
    "unique_id": "single_payment_required",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "single_payment_required",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "single_payment_required",
            "pdfAttribute": "single_payment_required"
          },
          {
            "fromDatabase": "single_payment_not_required",
            "pdfAttribute": "single_payment_not_required"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Does the tenant require the monthly rent to be paid in a single payment?",
                  "order": 33,
      "input_type": "checkbox",
      "block": "Rent & Payment Information",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "single_payment_required"
          },
          {
            "display_name": "No",
            "databaseStored": "single_payment_not_required"
          }
        ],
        
        "maxSelected": 1
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2,
          "asRadio": true
        }
      }
    }
  },
  {
    "unique_id": "late_or_bad_payment_explanation",
    "display_attributes": {
      "display_name": "Late or Bounced Payments",
      "description": "If you don’t pay rent on time, or if your check bounces, the landlord can insist that you pay from then on with guaranteed funds (like a cashier’s check or money order). This doesn’t stop the landlord from using any other legal remedies if you keep missing or bouncing payments.",
                  "order": 34,
      "input_type": "info",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "block": "Rent & Payment Information",
      "special_input": {
        "info": {
          "style": "subtle"
        }
      }
    }
  },
  {
    "unique_id": "rent_increases_explanation",
    "display_attributes": {
      "display_name": "Rent Increases",
      "description": "Landlord cannot increase rent during the fixed lease term. Once the lease rolls into month‑to‑month, the landlord can raise the rent, but they must give the tenant at least 30 days’ written notice first.",
                  "order": 35,
      "input_type": "info",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "block": "Rent & Payment Information",
      "special_input": {
        "info": {
          "style": "subtle"
        }
      }
    }
  },
  {
    "unique_id": "late_charge_day",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "late_charge_day"
      }
    ],
    "display_attributes": {
      "placeholder": "5th",
      "display_name": "Day When Rent is Due",
      "description": "After this day, the tenant is charged a late fee",
                  "order": 36,
      "input_type": "text",
      "block": "Late Charges",
      "block_style": {
        "title": "Late Charges",
        "description": "Late fees, deposits, and other charges",
        "icon": "AlertCircle",
        "color_theme": "orange"
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "breakBefore": true
    }
  },
  {
    "unique_id": "late_charge_fee",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "late_charge_fee",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "late_charge_flat_fee",
            "pdfAttribute": "late_charge_flat_fee"
          },
          {
            "fromDatabase": "late_charge_in_percent",
            "pdfAttribute": "late_charge_in_percent"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Late Charge Fee",
                  "order": 37,
      "input_type": "checkbox",
      "block": "Late Charges",
      "checkbox_options": {
        "options": [
          {
            "display_name": "One Time Fee",
            "databaseStored": "late_charge_flat_fee",
            "linkedFields": [
              "late_charge_amount_a"
            ]
          },
          {
            "display_name": "Percentage of Rent",
            "databaseStored": "residential_real_estate_listing_agreement_exclusive_right_to_lease_textfield_116",
            "linkedFields": [
              "late_charge_amount_b"
            ]
          }
        ],
        
        "maxSelected": 1
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "checkbox": {
          "horizontal": 2,
          "asRadio": true
        }
      },
      "description": "Is the fee for a late payment taken in a one time fee or a percentage of the rent"
    }
  },
  {
    "unique_id": "late_charge_amount_a",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "late_charge_amount_a"
      }
    ],
    "display_attributes": {
      "placeholder": "$50.00",
                  "order": 38,
      "input_type": "text",
      "block": "Late Charges",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12
    }
  },
  {
    "unique_id": "late_charge_amount_b",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "late_charge_amount_b"
      }
    ],
    "display_attributes": {
      "placeholder": "10",
                  "order": 39,
      "input_type": "text",
      "block": "Late Charges",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.]+$",
            "message": "Must be a valid percentage"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12
    }
  },
  {
    "unique_id": "additional_late_charge_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "additional_late_charge_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "10.00",
      "display_name": "Additional Late Charge Amount",
      "description": "Additional late charge amount is added to fee for every day the rent is late",
                  "order": 40,
      "input_type": "text",
      "block": "Late Charges",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "returned_payment_fee",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "returned_payment_fee"
      }
    ],
    "display_attributes": {
      "placeholder": "35.00",
      "display_name": "Returned Payment Fee",
      "description": "Fee applied when payments don't go through",
                  "order": 41,
      "input_type": "text",
      "block": "Late Charges",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "animal_violation_fee_initial_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "animal_violation_fee_initial_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "200.00",
      "display_name": "Animal Violation Fee (Initial)",
      "description": "Initial fee for animal policy violations",
                  "order": 42,
      "input_type": "text",
      "block": "Animal Violations",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "block_style": {
        "color_theme": "green"
      },
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "animal_violation_fee_additional_daily_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "animal_violation_fee_additional_daily_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "25.00",
      "display_name": "Animal Violation Fee (Daily)",
      "description": "Daily fee for ongoing animal policy violations",
                  "order": 43,
      "input_type": "text",
      "block": "Animal Violations",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "security_deposit_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "security_deposit_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "2,500.00",
      "display_name": "Security Deposit Amount",
                  "order": 44,
      "input_type": "text",
      "block": "Security Deposit",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "isRequired": true,
      "block_style": {
        "icon": "MapPin",
        "title": "Security Deposit",
        // "description": "A security deposit is paid by the tenant to the landlord at the start of a lease to cover potential damage or unpaid rent. If the tenant does not break the lease or damage the property, the security deposit is refunded. ",
        "color_theme": "blue"
      },
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "field_1753921575189_zaklnkjpr",
    "display_attributes": {
      "display_name": "If there is a different payment method make sure it is acceptable to all parties involved",
      "input_type": "info",
                  "order": 45,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Security Deposit",
      "visibleIf": [
        {
          "unique_id": "field_1753822603826_wvhybv4za",
          "operation": "contains",
          "valueChecked": "security_deposit_method_other"
        }
      ]
    }
  },
  {
    "unique_id": "field_1753822603826_wvhybv4za",
    "display_attributes": {
      "display_name": "Security Deposit Method",
      "input_type": "checkbox",
                  "order": 46,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Cashiers Check",
            "databaseStored": "security_deposit_method_cashier"
          },
          {
            "display_name": "Electronic Payment",
            "databaseStored": "security_deposit_method_electronic"
          },
          {
            "display_name": "Money Order",
            "databaseStored": "security_deposit_method_money_order"
          },
          {
            "display_name": "Personal Check",
            "databaseStored": "security_deposit_method_personal_check"
          },
          {
            "display_name": "Other",
            "databaseStored": "security_deposit_method_other"
          }
        ],
        "maxSelected": 5,
        
      },
      "special_input": {
        "checkbox": {
          "horizontal": 3
        }
      },
      "block": "Security Deposit"
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "security_deposit_method_other",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "security_deposit_method_cashier",
            "pdfAttribute": "security_deposit_method_cashier"
          },
          {
            "fromDatabase": "security_deposit_method_electronic",
            "pdfAttribute": "security_deposit_method_electronic"
          },
          {
            "fromDatabase": "security_deposit_method_money_order",
            "pdfAttribute": "security_deposit_method_money_order"
          },
          {
            "fromDatabase": "security_deposit_method_personal_check",
            "pdfAttribute": "security_deposit_method_personal_check"
          },
          {
            "fromDatabase": "security_deposit_method_other",
            "pdfAttribute": "security_deposit_method_other"
          }
        ]
      }
    ]
  },
  {
    "unique_id": "field_1753909477328_2d80g4vhm",
    "display_attributes": {
      "display_name": "Tenant Procures Assignment",
      "input_type": "checkbox",
                  "order": 47,
      "width": 6,
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Dollar Amount",
            "databaseStored": "dollar_amount_tenant_pays_when_tenant_procures",
            "linkedFields": [
              "tenant_assignment_fee_dollar_amount"
            ]
          },
          {
            "display_name": "Percentage of Rent",
            "databaseStored": "percentage_of_rent_tenant_pays_when_tenant_procures",
            "linkedFields": [
              "tenant_assignment_fee_percentage_amount"
            ]
          }
        ]
      },
      "block": "Fees & Charges",
      "special_input": {
        "checkbox": {
          "asRadio": true
        }
      },
      "block_style": {
        "color_theme": "purple"
      }
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_procures_assignee",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "dollar_amount_tenant_pays_when_tenant_procures",
            "pdfAttribute": "dollar_amount_tenant_pays_when_tenant_procures"
          },
          {
            "fromDatabase": "percentage_of_rent_tenant_pays_when_tenant_procures",
            "pdfAttribute": "percentage_of_rent_tenant_pays_when_tenant_procures"
          }
        ]
      }
    ]
  },
  {
    "unique_id": "landlord_procures_assignee",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_procures_assignee",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "dollar_amount_tenant_pays_when_landlord_procures",
            "pdfAttribute": "dollar_amount_tenant_pays_when_landlord_procures"
          },
          {
            "fromDatabase": "percentage_of_rent_tenant_pays_when_landlord_procures",
            "pdfAttribute": "percentage_of_rent_tenant_pays_when_landlord_procures"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Landlord Procures Assignee",
                  "order": 48,
      "input_type": "checkbox",
      "block": "Fees & Charges",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "checkbox_options": {
        "options": [
          {
            "display_name": "Dollar Amount",
            "databaseStored": "dollar_amount_tenant_pays_when_landlord_procures",
            "linkedFields": [
              "landlord_assignment_fee_dollar_amount"
            ]
          },
          {
            "display_name": "Percentage of Rent",
            "databaseStored": "percentage_of_rent_tenant_pays_when_landlord_procures",
            "linkedFields": [
              "landlord_assignment_fee_percentage_amount"
            ]
          }
        ]
      },
      "special_input": {
        "checkbox": {
          "asRadio": true
        }
      }
    }
  },
  {
    "unique_id": "landlord_assignment_fee_dollar_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_assignment_fee_dollar_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "300.00",
      "description": "Dollar amount for landlord lease assignment fee",
                  "order": 49,
      "input_type": "text",
      "block": "Fees & Charges",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "landlord_assignment_fee_percentage_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_assignment_fee_percentage_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "5",
      "description": "Percentage amount for landlord lease assignment fee",
                  "order": 50,
      "input_type": "text",
      "block": "Fees & Charges",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.]+%?$",
            "message": "Must be a valid percentage"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "text": {
          "percentage": true
        }
      }
    }
  },
  {
    "unique_id": "tenant_assignment_fee_dollar_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_assignment_fee_dollar_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "500.00",
      "description": "Dollar amount for tenant lease assignment fee",
                  "order": 51,
      "input_type": "text",
      "block": "Fees & Charges",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "tenant_assignment_fee_percentage_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_assignment_fee_percentage_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "10",
      "description": "Percentage amount for tenant lease assignment fee",
                  "order": 52,
      "input_type": "text",
      "block": "Fees & Charges",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.]+%?$",
            "message": "Must be a valid percentage"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "text": {
          "percentage": true
        }
      }
    }
  },
  {
    "unique_id": "landlord_paid_utilities",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_paid_utilities",
        "linked_form_fields_text": [
          "landlord_paid_utilities",
          "landlord_paid_utilities_cont",
          "landlord_paid_utilities_cont_2"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "Electric, gas, water, trash, etc.",
      "display_name": "Utilities Landlord is to Pay",
                  "order": 53,
      "input_type": "text-area",
      "block": "Property Terms",
      "block_style": {
        "title": "Property Terms",
        "icon": "Home",
        "color_theme": "blue"
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "breakBefore": true
    }
  },
  {
    "unique_id": "authorized_occupants",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "authorized_occupants",
        "linked_form_fields_text": [
          "authorized_occupants",
          "authorized_occupants_cont",
          "authorized_occupants_cont_2"
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Authorized Occupants",
      "description": "List of authorized occupants besides tenants (include names and ages). This typically includes family members, roommates, or significant others of the tenant who have the landlord's approval to reside there",
                  "order": 54,
      "input_type": "text-area",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "placeholder": "John Doe (49yrs, Men), Jane Doe (32yrs, Women), Jessica Doe (5yrs, Child) etc."
    }
  },
  {
    "unique_id": "does_property_have_hoa",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "does_property_have_hoa",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "property_does_not_have_hoa",
            "pdfAttribute": "property_does_not_have_hoa"
          },
          {
            "fromDatabase": "property_does_have_hoa",
            "pdfAttribute": "property_does_have_hoa"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Does Property Have HOA",
                  "order": 55,
      "input_type": "checkbox",
      "block": "Property Terms",
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
      }
    }
  },
  {
    "unique_id": "hoa_association_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "hoa_association_name",
        "linked_form_fields_text": [
          "hoa_association_name",
          "hoa_association_name_continued"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "HOA Name",
                  "order": 56,
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
    "unique_id": "additional_restrictions",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "additional_restrictions"
      }
    ],
    "display_attributes": {
      "placeholder": "10",
      "display_name": "How many consecutive days can guests stay without the landlord's written permission?",
                  "order": 57,
      "input_type": "text",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 6
    }
  },
  {
    "unique_id": "maximum_vehicles",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "maximum_vehicles"
      }
    ],
    "display_attributes": {
      "placeholder": "2",
      "display_name": "Maximum Vehicles\n",
                  "order": 58,
      "input_type": "text",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 6
    }
  },
  {
    "unique_id": "tenant_trip_charge_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_trip_charge_amount"
      }
    ],
    "display_attributes": {
      "placeholder": "75.00",
      "display_name": "Tenant Trip Charge Amount",
      "description": "Amount charged when tenant's actions prevent the landlord from visiting the property during a planned visit",
                  "order": 59,
      "input_type": "text",
      "block": "Property Terms",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "tenants_die",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "broker_name"
      }

    ],
    "display_attributes": {
      "placeholder": "Jane Smith",
      "display_name": "Who Will Be Allowed to Access the Property?",
      "description": "If every tenant above the age of 18 dies, who will be permitted to access the property? (e.g. sibling, child, friend, etc.)",
      "order": 60,
      "input_type": "text",
      "block": "In Case of Tenant's Death",
      "block_style": {
        "icon": "User",
        "color_theme": "green"
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isCached": false,
      "breakBefore": true
    }
  },
  {
    "unique_id": "tenants_die_phone",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "broker_phone"
      }
    ],
    "display_attributes": {
      "placeholder": "(555) 123-4567",
      "display_name": "Phone Number To Contact If Tenants Die",
      "description": "\n\n",
      "order": 61,
      "input_type": "text",
      "block": "In Case of Tenant's Death",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10}$",
            "message": "Must be a valid phone number"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isCached": false,
      "special_input": {
        "text": {
          "phone": true
        }
      }
    }
  },
  {
    "unique_id": "tenants_die_address",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "broker_address"
      }
    ],
    "display_attributes": {
      "display_name": "Address To Contact If Tenants Die",
      "placeholder": "123 Business Street, City, State 12345",
                  "order": 62,
      "input_type": "text",
      "block": "In Case of Tenant's Death",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isCached": false,
    }
  },
  {
    "unique_id": "tenants_die_email",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "broker_email"
      }
    ],
    "display_attributes": {
      "placeholder": "john@example.com",
      "display_name": "Email To Contact If Tenants Die",
                  "order": 63,
      "input_type": "text",
      "block": "In Case of Tenant's Death",
      "validation": {
        "loopback": [
          {
            "regex": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "message": "Must be a valid email address"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isCached": false
    }
  },
  {
    "unique_id": "condition_exception_days",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "condition_exception_days"
      }
    ],
    "display_attributes": {
      "placeholder": "7",
      "display_name": "Condition Exception Days",
      "description": "Number of days before the lease ends that a keybox can be on the property.",
                  "order": 64,
      "input_type": "text",
      "block": "Property Terms",
      "block_style": {
        "title": "Property Terms",
        "icon": "Home",
        "color_theme": "blue"
      },
      "value": {
        "type": "manual"
      },
      "width": 6
    }
  },
  {
    "unique_id": "condition_change_fee",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "condition_change_fee"
      }
    ],
    "display_attributes": {
      "placeholder": "100.00",
      "display_name": "Condition Change Fee",
      "description": "Fee for property condition changes",
                  "order": 65,
      "input_type": "text",
      "block": "Property Terms",
      "validation": {
        "loopback": [
          {
            "regex": "^[\\d.,$]+$",
            "message": "Must be a valid monetary amount"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "special_input": {
        "text": {
          "currency": true
        }
      }
    }
  },
  {
    "unique_id": "tenant_scheduled_lawn_contract",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_scheduled_lawn_contract",
        "linked_form_fields_radio": [
          {
            "radioField": "contractor_who_regularly_provides_service",
            "displayName": "Regular Contractor"
          },
          {
            "radioField": "other_contractor",
            "displayName": "Other Contractor"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Tenant Scheduled Lawn Contract",
      "description": "Tenant scheduled lawn maintenance contract",
                  "order": 66,
      "input_type": "radio",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "visibleIf": [
        {
          "unique_id": "lawn_maintenance_responsibility",
          "operation": "==",
          "valueChecked": "Tenant Maintains with Contract"
        }
      ]
    }
  },
  {
    "unique_id": "smoking_rules",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "smoking_rules",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "smoking_is_not_allowed",
            "pdfAttribute": "smoking_is_not_allowed"
          },
          {
            "fromDatabase": "smoking_is_allowed",
            "pdfAttribute": "smoking_is_allowed"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Smoking Rules",
                  "order": 67,
      "input_type": "checkbox",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "checkbox_options": {
        "options": [
          {
            "display_name": "Smoking Not Allowed",
            "databaseStored": "smoking_is_not_allowed"
          },
          {
            "display_name": "Smoking Allowed",
            "databaseStored": "smoking_is_allowed"
          }
        ]
      },
      "special_input": {
        "checkbox": {
          "horizontal": 2,
          "asRadio": true
        }
      }
    }
  },
  {
    "unique_id": "lawn_maintenance_responsibility",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "lawn_maintenance_responsibility",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "landlord_maintains_lawn",
            "pdfAttribute": "landlord_maintains_lawn"
          },
          {
            "fromDatabase": "tenant_maintains_lawn_at_tenants_expense",
            "pdfAttribute": "tenant_maintains_lawn_at_tenants_expense"
          },
          {
            "fromDatabase": "tenant_maintains_lawn_with_contract",
            "pdfAttribute": "tenant_maintains_lawn_with_contract"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Lawn Maintenance Responsibility",
                  "order": 68,
      "input_type": "checkbox",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "checkbox_options": {
        "options": [
          {
            "display_name": "Landlord Maintains",
            "databaseStored": "landlord_maintains_lawn"
          },
          {
            "display_name": "Tenant Maintains at Own Expense",
            "databaseStored": "tenant_maintains_lawn_at_tenants_expense"
          },
          {
            "display_name": "Tenant Maintains Lawn with Contract",
            "databaseStored": "tenant_maintains_lawn_with_contract",
            "linkedFields": [
              "contractor_type"
            ]
          }
        ]
      },
      "special_input": {
        "checkbox": {
          "asRadio": true,
          "horizontal": 3
        }
      }
    }
  },
  {
    "unique_id": "contractor_type",
    "display_attributes": {
      "input_type": "checkbox",
                  "order": 69,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Property Terms",
      "block_style": {
        "title": "Property Terms"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Regular Contractor",
            "databaseStored": "contractor_who_regularly_provides_service"
          },
          {
            "display_name": "Different Contractor",
            "databaseStored": "other_contractor",
            "linkedFields": [
              "field_1753835103348_e21vje3xe"
            ]
          }
        ],
        "maxSelected": 1
      },
      "special_input": {
        "checkbox": {
          "asRadio": true
        }
      }
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "contractor_type",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "contractor_who_regularly_provides_service",
            "pdfAttribute": "contractor_who_regularly_provides_service"
          },
          {
            "fromDatabase": "other_contractor",
            "pdfAttribute": "other_contractor"
          }
        ]
      }
    ]
  },
  {
    "unique_id": "field_1753835103348_e21vje3xe",
    "display_attributes": {
      "input_type": "text",
                  "order": 70,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "placeholder": "Contractor Name"
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "other_contractor_name"
      }
    ]
  },
  {
    "unique_id": "yard_watering_times",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "water_access_times",
        "linked_form_fields_text": [
          "water_access_times",
          "water_access_times_continued",
          "water_access_times_continued_2"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "Yard watering times (e.g., wednesday, friday)",
      "display_name": "Yard Watering Times",
      "description": "Tenant must water the yard at least during these times \n",
                  "order": 71,
      "input_type": "text",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 6
    }
  },
  {
    "unique_id": "inventory_return_days",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "inventory_return_days"
      }
    ],
    "display_attributes": {
      "placeholder": "7",
      "display_name": "Inventory Return Days",
                  "order": 72,
      "input_type": "text",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "description": "How many days after the commencment date will the tenant need to complete the inventory and conditions form."
    }
  },
  {
    "unique_id": "specific_maintenance_items",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "specific_maintenance_items",
        "linked_form_fields_text": [
          "specific_maintenance_items",
          "specific_maintenance_items_cont",
          "specific_maintenance_items_cont_2"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "List specific maintenance items or responsibilities",
      "display_name": "Specific Maintenance Items",
      "description": "Specific maintenance responsibilities or items the tenant is responsible for",
                  "order": 73,
      "input_type": "text-area",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 12
    }
  },
  {
    "unique_id": "tenant_conditions_for_landlord",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_conditions_for_landlord",
        "linked_form_fields_text": [
          "tenant_conditions_for_landlord",
          "tenant_conditions_for_landlord_continued",
          "tenant_conditions_for_landlord_continued_2"
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "Conditions or requests for landlord",
      "display_name": "Landlord action for tenant to accept property condition",
      "description": "List anything the landlord must do in order for the tenant to accept the property after inspection",
                  "order": 74,
      "input_type": "text-area",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 12
    }
  },
  {
    "unique_id": "special_provisions",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "special_provisions",
      }
    ],
    "display_attributes": {
      "placeholder": "Any special provisions or agreements",
      "display_name": "Special Provisions",
      "description": "Special provisions are customized clauses added to address specific concerns and go beyond the standard lease and are legally binding once agreed upon.",
                  "order": 75,
      "input_type": "text-area",
      "block": "Property Terms",
      "value": {
        "type": "manual"
      },
      "width": 12
    }
  },
  

  {
    "unique_id": "property_manager_email",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_manager_email"
      }
    ],
    "display_attributes": {
      "placeholder": "manager@company.com",
      "display_name": "Property Manager Email",
      "description": "Property manager email address",
                  "order": 76,
      "input_type": "text",
      "block": "Management Information",
      "validation": {
        "loopback": [
          {
            "regex": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "message": "Must be a valid email address"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "visibleIf": [
        {
          "unique_id": "who_manages_property",
          "operation": "==",
          "valueChecked": "Property Manager Manages"
        }
      ]
    }
  },
  {
    "unique_id": "property_manager_address",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_manager_address"
      }
    ],
    "display_attributes": {
      "placeholder": "123 Management Street, City, State 12345",
      "display_name": "Property Manager Address",
      "description": "Property manager address",
                  "order": 77,
      "input_type": "text",
      "block": "Management Information",
      "value": {
        "type": "manual"
      },
      "width": 8,
      "visibleIf": [
        {
          "unique_id": "who_manages_property",
          "operation": "==",
          "valueChecked": "Property Manager Manages"
        }
      ]
    }
  },
  
  {
    "unique_id": "broker_license_number",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "broker_license_number"
      }
    ],
    "display_attributes": {
      "placeholder": "RE123456",
      "display_name": "Broker License Number",
                  "order": 78,
      "input_type": "text",
      "block": "Broker Information",
      "block_style": {
        "color_theme": "orange"
      },
      "value": {
        "type": "manual"
      },
      "width": 4,
      "isCached": true
    }
  },
  {
    "unique_id": "broker_firm_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "broker_firm_name"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlords_broker_name"
      }
    ],
    "display_attributes": {
      "placeholder": "ABC Realty",
      "display_name": "Broker Firm Name",
                  "order": 79,
      "input_type": "text",
      "block": "Broker Information",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isCached": true
    }
  },
  
  {
    "unique_id": "landlord_broker_role_with_property",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_broker_role_with_property",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "broker_is_property_manager",
            "pdfAttribute": "broker_is_property_manager"
          },
          {
            "fromDatabase": "broker_is_not_property_manager",
            "pdfAttribute": "broker_is_not_property_manager"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Landlord Broker Role with Property",
                  "order": 80,
      "input_type": "checkbox",
      "block": "Broker Information",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "checkbox_options": {
        "options": [
          {
            "display_name": "Broker is Property Manager",
            "databaseStored": "broker_is_property_manager",
            linkedFields: [
              "broker_phone_number"
            ]
          },
          {
            "display_name": "Broker is Not Property Manager",
            "databaseStored": "broker_is_not_property_manager",
            "linkedFields": [
              "property_manager_selected_by_landlord"
            ]
          }
        ],
        "maxSelected": 1
      },
      "special_input": {
        "checkbox": {
          "asRadio": true
        }
      }
    }
  },
  {
    "unique_id": "property_manager_selected_by_landlord",
    "display_attributes": {
      "input_type": "checkbox",
                  "order": 81,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "landlord manages property",
            "databaseStored": "landlord_manages_property",
            "linkedFields": [
              "landlord_phone_number"
            ]
          },
          {
            "display_name": "property manager selected by landlord manages property",
            "databaseStored": "property_manager_selected_by_landlord_manages_property",
            "linkedFields": [
              "field_1753842000258_ty4udtwj2",
              "field_1753842146535_6ftbq2mdz",
              "property_manager_phone_number",
              "field_1753842414591_vjn2xvrjc"
            ]
          }
        ],
        "maxSelected": 1
      },
      "special_input": {
        "checkbox": {
          "asRadio": true,
          "horizontal": 1
        }
      },
      "display_name": "property manager selection"
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_manager_selected_by_landlord_manages_property",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "landlord_manages_property",
            "pdfAttribute": "landlord_manages_property"
          },
          {
            "fromDatabase": "property_manager_selected_by_landlord_manages_property",
            "pdfAttribute": "property_manager_selected_by_landlord_manages_property"
          }
        ]
      }
    ]
  },
  {
    "unique_id": "field_1753842000258_ty4udtwj2",
    "display_attributes": {
      "display_name": "Property Manager Name",
      "input_type": "text",
                  "order": 82,
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "Mary Manager"
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_manager_name"
      }
    ]
  },
  {
    "unique_id": "field_1753842146535_6ftbq2mdz",
    "display_attributes": {
      "display_name": "Property Manager Address",
      "input_type": "text",
                  "order": 83,
      "width": 6,
      "value": {
        "type": "manual"
      },
      "placeholder": "Manager Address"
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_manager_address"
      }
    ]
  },
  // {
  //   "unique_id": "field_1753842345075_hdgu92g1g",
  //   "display_attributes": {
  //     "display_name": "Property Manager Phone",
  //     "input_type": "text",
  //                 "order": 84,
  //     "width": 6,
  //     "value": {
  //       "type": "manual"
  //     },
  //     "special_input": {
  //       "text": {
  //         "phone": true
  //       }
  //     }
  //   },
  //   "pdf_attributes": [
  //     {
  //       "formType": "residential_lease",
  //       "formfield": "property_manager_phone_real"
  //     }
  //     // {
  //     //   "formType": "residential_lease",
  //     //   "formfield": "property_manager_phone_number"
  //     // }
  //   ]
  // },
  {
    "unique_id": "property_manager_phone_number",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_manager_phone_number"
      },
      {
        "formType": "residential_lease",
        "formfield": "property_manager_phone"
      }
    ],
    "display_attributes": {
      "display_name": "Property Manager Phone Number",
      "input_type": "text",
      "order": 85,
      "width": 6,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "phone": true
        }
      },
      "placeholder": "(555) 123-4567"
    }
  },
  {
    "unique_id": "landlord_phone_number",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_manager_phone"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord Phone Number",
      "input_type": "text",
      "order": 85,
      "width": 6,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "phone": true
        }
      },
      "placeholder": "(555) 123-4567"
    }
  },
  {
    "unique_id": "broker_phone_number",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_manager_phone"
      }
    ],
    "display_attributes": {
      "display_name": "Broker Phone Number",
      "input_type": "text",
      "order": 85,
      "width": 6,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "phone": true
        }
      },
      "placeholder": "(555) 123-4567"
    }
  },
  {
    "unique_id": "field_1753842414591_vjn2xvrjc",
    "display_attributes": {
      "display_name": "Property Manager Email",
      "input_type": "text",
                  "order": 85,
      "width": 6,
      "value": {
        "type": "manual"
      },
      // "special_input": {
      //   "text": {
      //     "email": true
      //   }
      // },
      "placeholder": "manager@company.com"
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "property_manager_email"
      }
    ]
  },
  {
    "unique_id": "tenant_notice_address",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_notice_address_1",
        "linked_form_fields_text": [
          "tenant_notice_address_1",
          "tenant_notice_address_2",
          "tenant_notice_address_3"
        ]
      },
    ],
    "display_attributes": {
      "placeholder": "123 Main Street\nCity, State 12345",
      "display_name": "Where else should official notices be sent?",
      'description' : "In addition to the property address, enter the contact (name or company) and full address/email/fax to also receive notices.",
      "order": 86,
      "input_type": "text-area",
      "block": "Contact Information",
      "block_style": {
        "title": "Recipients of Official Notices",
        "description": "Notice addresses and contact details",
        "icon": "FileText",
        "color_theme": "blue"
      },
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isRequired": true,
      "breakBefore": true
    }
  },
  {
    "unique_id": "landlord_notice_address",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_notice_address_1",
        "linked_form_fields_text": [
          "landlord_notice_address_1",
          "landlord_notice_address_2",
          "landlord_notice_address_3"
        ]
      },
    ],
    "display_attributes": {
      "placeholder": "123 Main Street\nCity, State 12345",
      "display_name": "Landlord Notice Address",
      "description": "Enter the full address for sending official notices to the landlord. This is not the property address for this deal.",
      "order": 87,
      "input_type": "text-area",
      "block": "Contact Information",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isRequired": true
    }
  },
  {
    "unique_id": "tenant_email",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_email"
      }
    ],
    "display_attributes": {
      "placeholder": "tenant@email.com",
      "display_name": " E-mail/Fax 1 to receive notices",
      "description" : "Enter an email address or fax number for receiving notices",
      "order": 88,
      "input_type": "text",
      "block": "Contact Information",
      "validation": {
        "loopback": [
          {
            "regex": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "message": "Must be a valid email address"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "attribute": {
        "key": "tenant_email",
        "operation": "value",
        "reverseOperation": "value"
      },
      "width": 6
    }
  },
  {
    "unique_id": "landlord_email",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_email"
      }
    ],
    "display_attributes": {
      "placeholder": "landlord@email.com",
      "display_name": "Landlord Email/Fax 1 to receive notices",
      "description": "Optional: This is the email or fax for the landlord to receive notices.",
      "order": 89,
      "input_type": "text",
      "block": "Contact Information",
      "validation": {
        "loopback": [
          {
            "regex": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "message": "Must be a valid email address"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6
    }
  },
  {
    "unique_id": "tenant_fax",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_fax"
      }
    ],
    "display_attributes": {
      "placeholder": "(555) 123-4567",
      "display_name": " E-mail/Fax 2 to receive notices",
      "description": "Enter an additional email address or fax number for receiving notices",
      "order": 90,
      "input_type": "text",
      "block": "Contact Information",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10}$",
            "message": "Must be a valid fax number"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6
    }
  },
  {
    "unique_id": "landlord_fax",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_fax"
      }
    ],
    "display_attributes": {
      "placeholder": "(555) 123-4567",
      "display_name": "Landlord Email/Fax 2 to receive notices",
      "description": "Optional: This is another email or fax for the landlord to receive notices.",
        "order": 91,
      "input_type": "text",
      "block": "Contact Information",
      "validation": {
        "loopback": [
          {
            "regex": "^[-()\\s\\d]{10}$",
            "message": "Must be a valid fax number"
          }
        ]
      },
      "value": {
        "type": "manual"
      },
      "width": 6
    }
  },
  {
    "unique_id": "field_1753916844941_ie3x1vkk2",
    "display_attributes": {
      "input_type": "info",
                  "order": 92,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block_style": {
        "color_theme": "green",
        "title": "Addenda",
        "icon": "FileText"
      },
      "block": "Addenda",
      "special_input": {
        "info": {
          "style": "success",
          "icon": false
        }
      },
      "display_name": "An addendum is a signed addition to a lease that adds or changes the original terms."
    }
  },
  {
    "unique_id": "field_1753913370735_pq5b39v5u",
    "display_attributes": {
      "display_name": "Select all the addendums that need to be added to the lease",
      "input_type": "checkbox",
                  "order": 93,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Addenda",
      "block_style": {
        "title": "Addenda",
        "color_theme": "green"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Addendum: Flood Disclosure",
            "databaseStored": "addendum_flood_disclosure"
          },
          {
            "display_name": "Addendum: Lead Paint",
            "databaseStored": "addendum_lead_paint"
          },
          {
            "display_name": "Addendum: Inventory Condition",
            "databaseStored": "addendum_inventory_condition"
          },
          {
            "display_name": "Addendum: Animal Agreement",
            "databaseStored": "addendum_animal_agreement"
          },
          {
            "display_name": "Addendum: Parking Rules",
            "databaseStored": "addendum_parking_rules"
          },
          {
            "display_name": "Addendum: Mold Remediation",
            "databaseStored": "addendum_mold_remediation"
          },
          {
            "display_name": "Addendum: Lease Guaranty",
            "databaseStored": "addendum_lease_guaranty"
          },
          {
            "display_name": "Addendum: Broker Agreement",
            "databaseStored": "addendum_broker_agreement"
          },
          {
            "display_name": "Addendum: Landlord Rules",
            "databaseStored": "addendum_landlord_rules"
          },
          {
            "display_name": "Addendum: HOA Rules",
            "databaseStored": "addendum_hoa_rules"
          },
          {
            "display_name": "Addendum: Pool/Spa",
            "databaseStored": "addendum_pool_spa"
          },
          {
            "display_name": "Addendum: Lease Application",
            "databaseStored": "addendum_lease_application"
          },
          {
            "display_name": "Addendum: Bed Bug",
            "databaseStored": "addendum_bed_bug"
          }
        ]
      },
      "special_input": {
        "checkbox": {
          "horizontal": 2
        }
      }
    },
    "pdf_attributes": [
      {
        "formType": "",
        "formfield": "",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "addendum_flood_disclosure",
            "pdfAttribute": "addendum_flood_disclosure"
          },
          {
            "fromDatabase": "addendum_lead_paint",
            "pdfAttribute": "addendum_lead_paint"
          },
          {
            "fromDatabase": "addendum_inventory_condition",
            "pdfAttribute": "addendum_inventory_condition"
          },
          {
            "fromDatabase": "addendum_animal_agreement",
            "pdfAttribute": "addendum_animal_agreement"
          },
          {
            "fromDatabase": "addendum_parking_rules",
            "pdfAttribute": "addendum_parking_rules"
          },
          {
            "fromDatabase": "addendum_mold_remediation",
            "pdfAttribute": "addendum_mold_remediation"
          },
          {
            "fromDatabase": "addendum_lease_guaranty",
            "pdfAttribute": "addendum_lease_guaranty"
          },
          {
            "fromDatabase": "addendum_broker_agreement",
            "pdfAttribute": "addendum_broker_agreement"
          },
          {
            "fromDatabase": "addendum_landlord_rules",
            "pdfAttribute": "addendum_landlord_rules"
          },
          {
            "fromDatabase": "addendum_hoa_rules",
            "pdfAttribute": "addendum_hoa_rules"
          },
          {
            "fromDatabase": "addendum_pool_spa",
            "pdfAttribute": "addendum_pool_spa"
          },
          {
            "fromDatabase": "addendum_lease_application",
            "pdfAttribute": "addendum_lease_application"
          },
          {
            "fromDatabase": "addendum_bed_bug",
            "pdfAttribute": "addendum_bed_bug"
          }
        ]
      }
    ]
  },
  {
    "unique_id": "field_1753918308085_3m2m5uhyn",
    "display_attributes": {
      "input_type": "checkbox",
                  "order": 94,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Extra Addenda 1",
            "databaseStored": "other_addenda_checkbox",
            "linkedFields": [
              "other_addenda_checkbox"
            ]
          },
          {
            "display_name": "Extra Addenda 2",
            "databaseStored": "other_addenda2_checkbox",
            "linkedFields": [
              "other_addenda2_checkbox"
            ]
          },
          {
            "display_name": "Extra Addenda 3",
            "databaseStored": "other_addenda3_checkbox",
            "linkedFields": [
              "other_addenda3_checkbox"
            ]
          }
        ]
      },
      "display_name": "Please enter any extra Addenda here",
      "block": "Addenda"
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "other_addenda_checkbox",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "other_addenda_checkbox",
            "pdfAttribute": "other_addenda_checkbox"
          },
          {
            "fromDatabase": "other_addenda2_checkbox",
            "pdfAttribute": "other_addenda2_checkbox"
          },
          {
            "fromDatabase": "other_addenda3_checkbox",
            "pdfAttribute": "other_addenda3_checkbox"
          }
        ]
      }
    ]
  },
  {
    "unique_id": "other_addenda_checkbox",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "other_addenda"
      }
    ],
    "display_attributes": {
      "display_name": "Extra Addenda 1",
      "order": 95,
      "input_type": "text",
      "block": "Addenda",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "placeholder": "Addendum:"
    }
  },
  {
    "unique_id": "other_addenda2_checkbox",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "other_addenda2"
      }
    ],
    "display_attributes": {
                  "order": 96,
      "input_type": "text",
      "block": "Addenda",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "placeholder": "Addendum:"
    }
  },
  {
    "unique_id": "other_addenda3_checkbox",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "other_addenda3"
      }
    ],
    "display_attributes": {
                  "order": 97,
      "input_type": "text",
      "block": "Addenda",
      "value": {
        "type": "manual"
      },
      "width": 12,
      "placeholder": "Addendum:"
    }
  },
  {
    "unique_id": "landlord_signature",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_signature_1",
        "linked_dates": [
          {
            "dateFieldName": "landlord_signature_date_1"
          }
        ]
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_1"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_2"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_3"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_4"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_5"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_6"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_7"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_8"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_9"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_10"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_11"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_12"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_13"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_14"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_15"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_initials_linked_16"
      },
      // {
      //   "formType": "residential_lease",
      //   "formfield": "landlord_initials_linked_17"
      // }
    ],
    "display_attributes": {
      "display_name": "Landlord 1 Signatures and Initials",
                  "order": 98,
      "input_type": "signature",
      "block": "Signatures",
      "block_style": {
        "title": "Signatures",
        "description": "Required signatures for lease agreement execution",
        "icon": "FileText",
        "color_theme": "orange"
      },
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
      "width": 6,
      "isRequired": true,
      "breakBefore": true
    }
  },
  {
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_signature_2",
        "linked_dates": [
          {
            "dateFieldName": "landlord_signature_date_2"
          }
        ]
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_1"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_2"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_3"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_4"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_5"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_6"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_7"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_8"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_9"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_10"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_11"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_12"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_13"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_14"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_15"
      },
      {
        "formType": "residential_lease",
        "formfield": "landlord_2_initials_linked_16"
      },
      // {
      //   "formType": "residential_lease",
      //   "formfield": "landlord_2_initials_linked_17"
      // }
    ],
    "display_attributes": {
      "display_name": "Landlord 2 Signatures and Initials",
                  "order": 99,
      "input_type": "signature",
      "block": "Signatures",
      "block_style": {
        "title": "Signatures",
        "description": "Required signatures for lease agreement execution",
        "icon": "FileText",
        "color_theme": "orange"
      },
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
      "width": 6,
    },
    "unique_id": "landlord_signature_2"
  },
  {
    "unique_id": "tenant_signature",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_signature_1",
        "linked_dates": [
          {
            "dateFieldName": "tenant_signature_date_1"
          }
        ]
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_1"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_2"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_3"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_4"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_5"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_6"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_7"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_8"
      },
      {
        "formType": "residential_lease",  
        "formfield": "tenant_initials_linked_9"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_10"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_11"
      },
      {
        "formType": "residential_lease",  
        "formfield": "tenant_initials_linked_12"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_13"
      },    
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_14"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_15"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_initials_linked_16"
      },
      // {
      //   "formType": "residential_lease",
      //   "formfield": "tenant_initials_linked_17"
      // }
    ],
    "display_attributes": {
      "display_name": "Tenant 1 Signatures and Initials",
                  "order": 100,
      "input_type": "signature",
      "block": "Signatures",
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
      "width": 6,
      "isRequired": true
    }
  },
  {
    "unique_id": "tenant_signature_2",
    "display_attributes": {
      "display_name": "Tenant 2 Signatures and Initials",
      "input_type": "signature",
                  "order": 101,
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
      "block": "Signatures"
    },
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_signature_2",
        "linked_dates": [
          {
            "dateFieldName": "tenant_signature_date_2"
          }
        ]
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_1"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_2"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_3"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_4"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_5"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_6"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_7"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_8"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_9"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_10"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_11"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_12"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_13"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_14"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_15"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_2_initials_linked_16"
      },
      // {
      //   "formType": "residential_lease",
      //   "formfield": "tenant_2_initials_linked_17"
      // }
    ]
  },
  {
    "display_attributes": {
      "display_name": "Tenant 3 Signatures and Initials",
      "input_type": "signature",
                  "order": 102,
      "width": 6,
      "value": {
        "type": "manual"
      }
    },
    "unique_id": "tenant_signature_3",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_signature_3",
        "linked_dates": [
          {
            "dateFieldName": "tenant_signature_date_3"
          }
        ]
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_1"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_2"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_3"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_4"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_5"
      },
      {
        "formType": "residential_lease",  
        "formfield": "tenant_3_initials_linked_6"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_7"
      },    
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_8"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_9"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_10"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_11"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_12"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_13"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_14"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_15"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_3_initials_linked_16"
      },
      // {
      //   "formType": "residential_lease",  
      //   "formfield": "tenant_3_initials_linked_17"
      // }
    ]
  },
  {
    "display_attributes": {
      "display_name": "Tenant 4 Signatures and Initials",
      "input_type": "signature",
                  "order": 103,
      "width": 6,
      "value": {
        "type": "manual"
      }
    },
    "unique_id": "tenant_signature_4",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_signature_4",
        "linked_dates": [
          {
            "dateFieldName": "tenant_signature_date_4"
          }
        ]
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_1"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_2"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_3"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_4"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_5"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_6"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_7"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_8"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_9"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_10"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_11"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_12"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_13"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_14"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_15"
      },
      {
        "formType": "residential_lease",
        "formfield": "tenant_4_initials_linked_16"
      },
      // {
      //   "formType": "residential_lease",
      //   "formfield": "tenant_4_initials_linked_17"
      // }
    ]
  },
  {
    "unique_id": "broker_associate_printed_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "broker_associate_printed_name"
      }
    ],
    "display_attributes": {
      "placeholder": "Associate Name",
      "display_name": "Broker Associate Printed Name",
                  "order": 104,
      "input_type": "text",
      "block": "Signatures",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isCached": true
    }
  },
  {
    "unique_id": "broker_printed_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "broker_printed_name"
      }
    ],
    "display_attributes": {
      "placeholder": "Broker Name",
      "display_name": "Broker Printed Name",
                  "order": 105,
      "input_type": "text",
      "block": "Signatures",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "isCached": true
    }
  },
  {
    "unique_id": "broker_associate_signature",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "broker_associate_signature",
        "linked_dates": [
          {
            "dateFieldName": "broker_associate_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "placeholder": "Property Management/Power of Attorney Signature",
      "display_name": "Property Management/Power of Attorney Signature",
                  "order": 106,
      "input_type": "signature",
      "value": {
        "type": "manual"
      },
      "width": 6,
      "block": "Signatures",
      "block_style": {
        "description": "Property Manager/Attorney can sign for landlord if given permission."
      }
    }
  },
  {
    "unique_id": "landlord_signature_date_1",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_signature_date_1"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord 1 Signature Date",
      "input_type": "text",
      "order": 107,
      "width": 6,
      "value": {
        "type": "manual"
      },
      isHidden: true
    }
  },
  {
    "unique_id": "landlord_signature_date_2",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "landlord_signature_date_2"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord 2 Signature Date",
      "input_type": "text",
      "order": 108,
      "width": 6,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    unique_id: "tenant_signature_date_1",
    pdf_attributes: [
      {
        "formType": "residential_lease",
        "formfield": "tenant_signature_date_1"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 1 Signature Date",
      "input_type": "text",
      "order": 109,
      "width": 6,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "tenant_signature_date_2",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_signature_date_2"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 2 Signature Date",
      "input_type": "text",
      "order": 110,
      "width": 6,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "tenant_signature_date_3",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_signature_date_3"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 3 Signature Date",
      "input_type": "text",
      "order": 111,
      "width": 6,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "tenant_signature_date_4",
    "pdf_attributes": [
      {
        "formType": "residential_lease",
        "formfield": "tenant_signature_date_4"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 4 Signature Date",
      "input_type": "text",
      "order": 112,
      "width": 6,
      "isHidden": true,
      "value": {
        "type": "manual"
      }
    }
  },
  
];