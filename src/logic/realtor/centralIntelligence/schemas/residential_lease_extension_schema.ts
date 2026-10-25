
import { SchemaItem } from "../../../../types/realtor";

/**
 * Residential Lease Extension Schema
 * Optimized for user experience, validation, and logical flow
 * Following SCHEMA-BEAUTIFY principles for enhanced form UX
 */
export const residentialLeaseExtensionSchema: SchemaItem[] = [
  {
    "unique_id": "property_address",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "property_address",
        "linked_form_fields_text": [
          "property_address_continued"
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Property Address",
      "input_type": "text",
      "order": 1,

      "block": "General Information",
      "block_style": {
        "title": "General Information",
        "description": "Details about the lease",
        "icon": "home",
        "color_theme": "blue"
      },
      "placeholder": "123 Main Street, Anytown, CA 12345",
      "width": 12,
      "value": {
        "type": "reserved",
        "reserved": "property_street_address"
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "landlord_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "landlord_name"
      }
    ],
    "display_attributes": {
      "display_name": "All Landlords' Names",
      "input_type": "text",
      "description": "Full legal name of the property landlords or owners",
      "order": 2,

      "block": "General Information",
      "block_style": {
        "title": "General Information",
        "description": "Names of landlords and tenant(s)",
        "icon": "user",
        "color_theme": "green"
      },
      "placeholder": "John Doe",
      "width": 6,
      "value": {
        "type": "reserved",
        "reserved": "landlord_name_csv"
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "tenant_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "tenant_name"
      }
    ],
    "display_attributes": {
      "display_name": "All Tenants' Names",
      "input_type": "text",
      "description": "Full legal name of the primary tenant on the lease",
      "order": 3,

      "block": "General Information",
      "placeholder": "Jane Smith",
      "width": 6,
      "value": {
        "type": "reserved",
        "reserved": "tenant_name_csv"
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "amendments_effective_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "amendments_to_lease_put_into_effect_date"
      }
    ],
    "display_attributes": {
      "display_name": "Amendments Effective Date",
      "input_type": "text",
      "order": 4,

      "block": "Extension Terms",
      "block_style": {
        "title": "Extension Terms",
        "description": "Terms and conditions of the lease extension",
        "icon": "calendar",
        "color_theme": "blue"
      },
      "validation": {
        "loopback": [
          {
            "regex": "^(0[1-9]|1[0-2])/(0[1-9]|[12]\\d|3[01])/(19|20)\\d{2}$",
            "message": "Please enter a valid date in MM/DD/YYYY format"
          }
        ]
      },
      "placeholder": "Select effective date",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isRequired": true,
      "special_input": {
        "text": {
          "date": true
        }
      }
    }
  },
  {
    "unique_id": "new_lease_expiration_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "modified_expiration_date_from_paragraph_3"
      }
    ],
    "display_attributes": {
      "display_name": "New Lease Expiration Date",
      "input_type": "text",
      "order": 5,

      "block": "Extension Terms",
      "validation": {
        "loopback": [
          {
            "regex": "^(0[1-9]|1[0-2])/(0[1-9]|[12]\\d|3[01])/(19|20)\\d{2}$",
            "message": "Please enter a valid date in MM/DD/YYYY format"
          }
        ]
      },
      "placeholder": "Select new expiration date",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isRequired": true,
      "special_input": {
        "text": {
          "date": true
        }
      }
    }
  },
  {
    "unique_id": "lease_termination_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "lease_termination_date"
      }
    ],
    "display_attributes": {
      "display_name": "Current Lease Termination Date",
      "input_type": "text",
      "order": 6,

      "block": "Extension Terms",
      "validation": {
        "loopback": [
          {
            "regex": "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            "message": "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      "placeholder": "MM/DD/YYYY",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "date": true
        }
      }
    }
  },
  {
    "unique_id": "extension_signature_due_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "extension_signature_due_date"
      }
    ],
    "display_attributes": {
      "display_name": "Extension Signature Due Date",
      "input_type": "text",
      "order": 7,

      "block": "Extension Terms",
      "validation": {
        "loopback": [
          {
            "regex": "^(0[1-9]|1[0-2])/(0[1-9]|[12]\\d|3[01])/(19|20)\\d{2}$",
            "message": "Please enter a valid date in MM/DD/YYYY format"
          }
        ]
      },
      "placeholder": "Select signature deadline",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isRequired": true,
      "special_input": {
        "text": {
          "date": true
        }
      }
    }
  },
  {
    "unique_id": "rent_status_selection",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "rent_price_remains_the_same",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "rent_price_remains_the_same",
            "pdfAttribute": "rent_price_remains_the_same"
          },
          {
            "fromDatabase": "rent_price_changes",
            "pdfAttribute": "rent_price_changes"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Monthly Rent Status",
      "input_type": "checkbox",
      "description": "Choose whether the monthly rent will change or remain the same for the extended lease period",
      "order": 8,

      "block": "Extension Terms",
      "block_style": {
        "title": "Financial Terms",
        "description": "Rent amounts and payment terms for the lease extension",
        "icon": "dollar-sign",
        "color_theme": "green"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Rent Price Remains the Same",
            "databaseStored": "rent_price_remains_the_same"
          },
          {
            "display_name": "Rent Price Changes",
            "databaseStored": "rent_price_changes",
            "linkedFields": [
              "rent_price_change_amount"
            ]
          }
        ],
        "maxSelected": 1
      },
      "width": 12,
      "value": {
        "type": "manual"
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
    "unique_id": "consequences_of_failing_to_sign_extension",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "lease_continues_and_renews_monthly",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "lease_continues_and_renews_monthly",
            "pdfAttribute": "lease_continues_and_renews_monthly"
          },
          {
            "fromDatabase": "lease_terminates",
            "pdfAttribute": "lease_terminates"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Consequences of Not Signing",
      "input_type": "checkbox",
      "description": "What happens if tenant fails to sign the extension",
      "order": 9,

      "block": "Extension Terms",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Lease Continues and Renews Monthly",
            "databaseStored": "lease_continues_and_renews_monthly",
            "linkedFields": [
              "consequences_of_failing_to_sign_extension_rent_change"
            ]
          },
          {
            "display_name": "Lease Terminates",
            "databaseStored": "lease_terminates"
          }
        ],
        "maxSelected": 1
      },
      "width": 12,
      "value": {
        "type": "manual"
      },
      "isRequired": true,
      "special_input": {
        "checkbox": {
          "asRadio": true
        }
      }
    }
  },
  {
    "unique_id": "rent_price_change_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "rent_price_change_amount"
      }
    ],
    "display_attributes": {
      "input_type": "text",
      "description": "New monthly rent amount (if changed)",
      "order": 10,

      "block": "Financial Terms",
      "validation": {
        "loopback": [
          {
            "regex": "^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\\.[0-9][0-9])?$",
            "message": "Please enter a valid currency amount (e.g., $2,500.00)"
          }
        ]
      },
      "placeholder": "Enter new rent amount (e.g., $2,500.00)",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "contact_info_status",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "information_changed",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "information_changed",
            "pdfAttribute": "information_changed"
          },
          {
            "fromDatabase": "information_remains_the_same",
            "pdfAttribute": "information_remains_the_same"
          }
        ]
      }
    ],
    "display_attributes": {
      "input_type": "checkbox",
      "description": "Has the contact information referenced in Paragraph 34F of the original lease changed?",
      "order": 11,

      "block": "Contact Information",
      "block_style": {
        "title": "Contact Information",
        "description": "Contact details for parties as referenced in Paragraph 34F of the original lease",
        "icon": "address-book",
        "color_theme": "purple"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Information Changed",
            "databaseStored": "information_changed",
            "linkedFields": [
              "person_in_paragraph_34f_name",
              "person_in_paragraph_34f_phone_number",
              "person_in_paragraph_34f_email",
              "person_in_paragraph_34f_address"
            ]
          },
          {
            "display_name": "Information Remains the Same",
            "databaseStored": "information_remains_the_same"
          }
        ],
        "maxSelected": 1
      },
      "width": 12,
      "value": {
        "type": "manual"
      },
      "isRequired": true,
      "special_input": {
        "checkbox": {
          "asRadio": true
        }
      },
      "display_name": "Contact Information Status"
    }
  },
  {
    "unique_id": "person_in_paragraph_34f_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "person_in_paragraph_34f_name"
      }
    ],
    "display_attributes": {
      "input_type": "text",
      "description": "Full Name of Contact Person",
      "order": 12,

      "block": "Contact Information",
      "placeholder": "John Doe",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "person_in_paragraph_34f_phone_number",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "person_in_paragraph_34f_phone_number"
      }
    ],
    "display_attributes": {
      "input_type": "text",
      "order": 13,

      "block": "Contact Information",
      "validation": {
        "loopback": [
          {
            "regex": "^(\\+?1[-\\s]?)?\\(?([0-9]{3})\\)?[-\\s]?([0-9]{3})[-\\s]?([0-9]{4})$",
            "message": "Please enter a valid phone number (e.g., (555) 123-4567)"
          }
        ]
      },
      "placeholder": "(555)-271-0134",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "phone": true
        }
      },
      "description": "Contact phone Number"
    }
  },
  {
    "unique_id": "person_in_paragraph_34f_email",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "person_in_paragraph_34f_email"
      }
    ],
    "display_attributes": {
      "input_type": "text",
      "order": 14,

      "block": "Contact Information",
      "validation": {
        "loopback": [
          {
            "regex": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2}$",
            "message": "Please enter a valid email address"
          }
        ]
      },
      "placeholder": "contact@email.com",
      "width": 4,
      "value": {
        "type": "manual"
      },
      "description": "Contact Email"
    }
  },
  {
    "unique_id": "person_in_paragraph_34f_address",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "person_in_paragraph_34f_address"
      }
    ],
    "display_attributes": {
      "input_type": "text",
      "description": "Complete mailing address for the contact person",
      "order": 15,

      "block": "Contact Information",
      "placeholder": "123 Business Ave, City, State 12345",
      "width": 8,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "paragraphs_addressed_lease_ammendments",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "paragraphs_addressed_lease_ammendments"
      }
    ],
    "display_attributes": {
      "display_name": "Paragraph Numbers for Amendments",
      "input_type": "text",
      "description": "Enter the specific paragraph numbers from the original lease that are being amended (comma-separated)",
      "order": 16,

      "block": "Lease Amendments",
      "block_style": {
        "title": "Lease Amendments",
        "description": "Additional amendments to the lease terms",
        "icon": "edit",
        "color_theme": "gray"
      },
      "placeholder": "Enter paragraph numbers (e.g., 5, 12, 18)",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "lease_amendments",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "lease_ammendments",
        "linked_form_fields_text": [
          "lease_amendments_cont",
          "lease_amendments_cont_2",
          "lease_amendments_cont_3",
          "lease_amendments_cont_4"
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Lease Amendment Details",
      "input_type": "text-area",
      "description": "Provide a detailed description of all amendments and modifications being made to the original lease terms",
      "order": 17,

      "block": "Lease Amendments",
      "placeholder": "Describe all specific changes, additions, or modifications to the original lease terms in detail...",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "consequences_of_failing_to_sign_extension_rent_change",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "rent_will_change",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "rent_will_change",
            "pdfAttribute": "rent_will_change"
          },
          {
            "fromDatabase": "rent_will_remain_the_same",
            "pdfAttribute": "rent_will_remain_the_same"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Rent Change If Not Signed",
      "input_type": "checkbox",
      "description": "Whether rent will change if extension is not signed",
      "order": 18,

      "block": "Financial Terms",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Rent Will Change",
            "databaseStored": "rent_will_change",
            "linkedFields": [
              "new_rent_amount",
              "new_rent_in_effect_date"
            ]
          },
          {
            "display_name": "Rent Will Remain the Same",
            "databaseStored": "rent_will_remain_the_same"
          }
        ],
        "maxSelected": 1
      },
      "width": 12,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "checkbox": {
          "asRadio": true
        }
      }
    }
  },
  {
    "unique_id": "new_rent_amount",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "new_rent_amount"
      }
    ],
    "display_attributes": {
      "input_type": "text",
      "description": "New Rent Amount",
      "order": 19,

      "block": "Financial Terms",
      "validation": {
        "loopback": [
          {
            "regex": "^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\\.[0-9][0-9])?$",
            "message": "Please enter a valid currency amount (e.g., $2,500.00)"
          }
        ]
      },
      "placeholder": "Enter monthly rent (e.g., $2,500.00)",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "new_rent_in_effect_date",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "new_rent_in_effect_date"
      }
    ],
    "display_attributes": {
      "input_type": "text",
      "description": "Date for new rent to take effect",
      "order": 20,

      "block": "Financial Terms",
      "validation": {
        "loopback": [
          {
            "regex": "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
            "message": "Must be a valid date (MM/DD/YYYY)"
          }
        ]
      },
      "placeholder": "MM/DD/YYYY",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "special_input": {
        "text": {
          "date": true
        }
      }
    }
  },
  {
    "unique_id": "tenant_signature",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "tenant_signature",
        "linked_dates": [
          {
            "dateFieldName": "tenant_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Tenant Signature",
      "input_type": "signature",
      "description": "Digital signature of the primary tenant agreeing to the lease extension terms",
      "order": 21,

      "block": "Signatures",
      "block_style": {
        "title": "Signatures",
        "description": "Required signatures from all parties",
        "icon": "pen-tool",
        "color_theme": "gray"
      },
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isRequired": true
    }
  },
  {
    unique_id: "tenant_signature_date",
    display_attributes: {
      input_type: "text",
      order: 22,
      isHidden: true,
      value: {
        type: "manual",
      },
    },
    pdf_attributes: [
      {
        formType: "residential_lease_extension",
        formfield: "tenant_signature_date",
      },
    ],
  },
  {
    "unique_id": "tenant_2_signature",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "tenant_2_signature",
        "linked_dates": [
          {
            "dateFieldName": "tenant_2_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Second Tenant Signature",
      "input_type": "signature",
      "description": "Digital signature of the second tenant (if applicable)",
      "order": 23,

      "block": "Signatures",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
    {
    unique_id: "tenant_2_signature_date",
    display_attributes: {
      input_type: "text",
      order: 24,
      isHidden: true,
      value: {
        type: "manual",
      },
    },
    pdf_attributes: [
      {
        formType: "residential_lease_extension",
        formfield: "tenant_2_signature_date",
      },
    ],
  },

  {
    "unique_id": "tenant_3_signature",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "tenant_3_signature",
        "linked_dates": [
          {
            "dateFieldName": "tenant_3_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Third Tenant Signature",
      "input_type": "signature",
      "order": 25,

      "block": "Signatures",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    unique_id: "tenant_3_signature_date",
    display_attributes: {
      input_type: "text",
      order: 26,
      isHidden: true,
      value: {
        type: "manual",
      },
    },
    pdf_attributes: [
      {
        formType: "residential_lease_extension",
        formfield: "tenant_3_signature_date",
      },
    ],
  },

  {
    "unique_id": "tenant_4_signature",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "tenant_4_signature",
        "linked_dates": [
          {
            "dateFieldName": "tenant_4_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Fourth Tenant Signature",
      "input_type": "signature",
      "order": 27,

      "block": "Signatures",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    unique_id: "tenant_4_signature_date",
    display_attributes: {
      input_type: "text",
      order: 28,
      isHidden: true,
      value: {
        type: "manual",
      },
    },
    pdf_attributes: [
      {
        formType: "residential_lease_extension",
        formfield: "tenant_4_signature_date",
      },
    ],
  },

  {
    "unique_id": "landlord_signature",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "landlord_signature",
        "linked_dates": [
          {
            "dateFieldName": "landlord_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Landlord Signature",
      "input_type": "signature",
      "description": "Digital signature of the property landlord or owner",
      "order": 29,

      "block": "Signatures",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isRequired": true
    }
  },
  {
    unique_id: "landlord_signature_date",
    display_attributes: {
      input_type: "text",
      order: 30,
      isHidden: true,
      value: {
        type: "manual",
      },
    },
    pdf_attributes: [
      {
        formType: "residential_lease_extension",
        formfield: "landlord_signature_date",
      },
    ],
  },

  
  {
    "unique_id": "landlord_2_signature",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "landlord_2_signature",
        "linked_dates": [
          {
            "dateFieldName": "landlord_2_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Second Landlord Signature",
      "input_type": "signature",
      "order": 31,

      "block": "Signatures",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    unique_id: "landlord_2_signature_date",
    display_attributes: {
      input_type: "text",
      order: 32,
      isHidden: true,
      value: {
        type: "manual",
      },
    },
    pdf_attributes: [
      {
        formType: "residential_lease_extension",
        formfield: "landlord_2_signature_date",
      },
    ],
  },

  {
    "unique_id": "landlord_stand_in_signer",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "landlord_stand_in_signer"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord Representative Signature",
      "input_type": "signature",
      "description": "Digital signature of authorized representative acting on behalf of the landlord",
      "order": 33,

      "block": "Signatures",
      "width": 12,
      "value": {
        "type": "manual"
      }
    }
  },

  {
    "unique_id": "attorney_printed_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "attorney_printed_name"
      }
    ],
    "display_attributes": {
      "display_name": "Attorney Printed Name",
      "input_type": "text",
      "order": 35,

      "block": "Legal Representative",
      "block_style": {
        "title": "Legal Representative",
        "description": "Attorney or legal firm information",
        "icon": "briefcase",
        "color_theme": "purple"
      },
      "placeholder": "Attorney Name",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "attorney_firm_name",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "attorney_firm_name"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord Attorney Firm Name",
      "input_type": "text",
      "order": 36,

      "block": "Legal Representative",
      "placeholder": "Law Firm Name",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "tenant_home_phone_number",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "tenant_home_phone_number"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant Home Phone",
      "input_type": "text",
      "description": "Primary home phone number for the tenant",
      "order": 37,

      "block": "Tenant Contact Details",
      "block_style": {
        "title": "Tenant Contact Details",
        "description": "Complete contact information for all tenants on the lease",
        "icon": "users",
        "color_theme": "blue"
      },
      "validation": {
        "loopback": [
          {
            "regex": "^(\\+?1[-\\s]?)?\\(?([0-9]{3})\\)?[-\\s]?([0-9]{3})[-\\s]?([0-9]{4})$",
            "message": "Please enter a valid phone number (e.g., (555) 123-4567)"
          }
        ]
      },
      "placeholder": "Enter home phone (e.g., (555) 123-4567)",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "tenant_work_phone_number",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "tenant_work_phone_number"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant Work Phone",
      "input_type": "text",
      "description": "Work or business phone number for the tenant",
      "order": 38,

      "block": "Tenant Contact Details",
      "validation": {
        "loopback": [
          {
            "regex": "^(\\+?1[-\\s]?)?\\(?([0-9]{3})\\)?[-\\s]?([0-9]{3})[-\\s]?([0-9]{4})$",
            "message": "Please enter a valid phone number (e.g., (555) 123-4567)"
          }
        ]
      },
      "placeholder": "Enter work phone (e.g., (555) 123-4567)",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "tenant_mobile_phone_number",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "tenant_mobile_phone_number"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant Mobile Phone",
      "input_type": "text",
      "description": "Mobile or cell phone number for the tenant",
      "order": 39,

      "block": "Tenant Contact Details",
      "validation": {
        "loopback": [
          {
            "regex": "^(\\+?1[-\\s]?)?\\(?([0-9]{3})\\)?[-\\s]?([0-9]{3})[-\\s]?([0-9]{4})$",
            "message": "Please enter a valid phone number (e.g., (555) 123-4567)"
          }
        ]
      },
      "placeholder": "Enter mobile phone (e.g., (555) 123-4567)",
      "width": 6,
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "tenant_email",
    "pdf_attributes": [
      {
        "formType": "residential_lease_extension",
        "formfield": "tenant_email"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant Email",
      "input_type": "text",
      "description": "Primary email address for tenant correspondence",
      "order": 40,

      "block": "Tenant Contact Details",
      "validation": {
        "loopback": [
          {
            "regex": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2}$",
            "message": "Please enter a valid email address"
          }
        ]
      },
      "placeholder": "Enter email address (e.g., tenant@email.com)",
      "width": 6,
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
      }
    }
  }
];