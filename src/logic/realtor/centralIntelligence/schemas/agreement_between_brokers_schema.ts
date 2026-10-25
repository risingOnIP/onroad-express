import { SchemaItem } from "../../../../types/realtor";

export const agreementBetweenBrokersSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_1",
      linked_form_fields_text: ["agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_2"]
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Address of the property covered by the residential lease",
      order: 1,
      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Details about the leased property",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  
  // Parties Information Block
  {
    unique_id: "landlord_name",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_3"
    }],
    display_attributes: {
      display_name: "Landlord Name",
      input_type: "text",
      order: 2,
      block: "parties_information",
      block_style: {
        title: "Parties Information",
        description: "Landlord and tenant details",
        icon: "users",
        color_theme: "green"
      },
      placeholder: "John Doe",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "tenant_name",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_4"
    }],
    display_attributes: {
      display_name: "Tenant Name",
      input_type: "text",
      order: 3,
      block: "parties_information",
      placeholder: "Jane Smith",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  
  // Commission Structure Block
  {
    unique_id: "commission_type",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "A.agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_19",
      linked_form_fields_radio: [
        { radioField: "1", displayName: "Percentage of One Month's Rent" },
        { radioField: "2", displayName: "Percentage of All Rent" },
        { radioField: "3", displayName: "Custom Amount" }
      ]
    }],
    display_attributes: {
      display_name: "Commission Type",
      input_type: "radio",
      order: 4,
      block: "commission_structure",
      block_style: {
        title: "Commission Structure",
        description: "Fee agreement between brokers",
        icon: "dollar-sign",
        color_theme: "orange"
      },
      display_radio_options: ["Percentage of One Month's Rent", "Percentage of All Rent", "Custom Amount"],
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "commission_percentage_one_month",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_5"
    }],
    display_attributes: {
      display_name: "Commission Percentage",
      input_type: "text",
      description: "Percentage of one full month's rent",
      order: 5,
      block: "commission_structure",
      placeholder: "50%",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      },
      visibleIf: [{
        unique_id: "commission_type",
        operation: "==",
        valueChecked: "Percentage of One Month's Rent"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "commission_percentage_all_rent",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_6"
    }],
    display_attributes: {
      display_name: "Commission Percentage",
      input_type: "text",
      description: "Percentage of all rent for the primary term",
      order: 6,
      block: "commission_structure",
      placeholder: "3%",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      },
      visibleIf: [{
        unique_id: "commission_type",
        operation: "==",
        valueChecked: "Percentage of All Rent"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "commission_custom_amount",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_7"
    }],
    display_attributes: {
      display_name: "Custom Commission Amount",
      input_type: "text",
      description: "Enter the custom commission amount",
      order: 7,
      block: "commission_structure",
      placeholder: "$0.00",
      width: 6,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      visibleIf: [{
        unique_id: "commission_type",
        operation: "==",
        valueChecked: "Custom Amount"
      }],
      value: {
        type: "manual"
      }
    }
  },
  
  // Renewal Commission Block
  {
    unique_id: "renewal_commission_enabled",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_checkbox_1"
    }],
    display_attributes: {
      display_name: "Include Renewal Commission",
      input_type: "checkbox",
      order: 8,
      block: "renewal_commission",
      block_style: {
        title: "Renewal Commission",
        description: "Additional fees for lease renewals",
        icon: "refresh-cw",
        color_theme: "purple"
      },
      checkbox_options: {
        options: [
          { display_name: "Yes, include renewal commission", databaseStored: "RENEWAL_COMMISSION" }
        ]
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "renewal_commission_type",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: ["agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_checkbox_3", 
                  "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_checkbox_4",
                  "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_checkbox_5"]
    }],
    display_attributes: {
      display_name: "Renewal Commission Type",
      input_type: "checkbox",
      order: 9,
      block: "renewal_commission",
      checkbox_options: {
        options: [
          { display_name: "Percentage of One Month's Rent", databaseStored: "RENEWAL_ONE_MONTH" },
          { display_name: "Percentage of All Renewal Rent", databaseStored: "RENEWAL_ALL_RENT" },
          { display_name: "Custom Amount", databaseStored: "RENEWAL_CUSTOM" }
        ],
        maxSelected: 1
      },
      width: 12,
      visibleIf: [{
        unique_id: "renewal_commission_enabled",
        operation: "contains",
        valueChecked: "RENEWAL_COMMISSION"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "renewal_percentage_one_month",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_8"
    }],
    display_attributes: {
      display_name: "Renewal Commission Percentage",
      input_type: "text",
      description: "Percentage of one full month's rent for renewal",
      order: 10,
      block: "renewal_commission",
      placeholder: "50%",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      },
      visibleIf: [{
        unique_id: "renewal_commission_type",
        operation: "contains",
        valueChecked: "RENEWAL_ONE_MONTH"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "renewal_percentage_all_rent",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_9"
    }],
    display_attributes: {
      display_name: "Renewal Commission Percentage",
      input_type: "text",
      description: "Percentage of all rent for the renewal term",
      order: 11,
      block: "renewal_commission",
      placeholder: "3%",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      },
      visibleIf: [{
        unique_id: "renewal_commission_type",
        operation: "contains",
        valueChecked: "RENEWAL_ALL_RENT"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "renewal_custom_amount",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_10"
    }],
    display_attributes: {
      display_name: "Renewal Custom Commission",
      input_type: "text",
      description: "Enter the custom renewal commission amount",
      order: 12,
      block: "renewal_commission",
      placeholder: "$0.00",
      width: 6,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      visibleIf: [{
        unique_id: "renewal_commission_type",
        operation: "contains",
        valueChecked: "RENEWAL_CUSTOM"
      }],
      value: {
        type: "manual"
      }
    }
  },
  
  // Sales Commission Block
  {
    unique_id: "sales_commission_enabled",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_checkbox_2"
    }],
    display_attributes: {
      display_name: "Include Sales Commission",
      input_type: "checkbox",
      order: 13,
      block: "sales_commission",
      block_style: {
        title: "Sales Commission",
        description: "Additional fees if property is sold to tenant",
        icon: "tag",
        color_theme: "green"
      },
      checkbox_options: {
        options: [
          { display_name: "Yes, include sales commission", databaseStored: "SALES_COMMISSION" }
        ]
      },
      width: 12,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "sales_commission_type",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: ["agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_checkbox_6", 
                  "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_checkbox_7"]
    }],
    display_attributes: {
      display_name: "Sales Commission Type",
      input_type: "checkbox",
      order: 14,
      block: "sales_commission",
      checkbox_options: {
        options: [
          { display_name: "Percentage of Sales Price", databaseStored: "SALES_PERCENTAGE" },
          { display_name: "Custom Amount", databaseStored: "SALES_CUSTOM" }
        ],
        maxSelected: 1
      },
      width: 12,
      visibleIf: [{
        unique_id: "sales_commission_enabled",
        operation: "contains",
        valueChecked: "SALES_COMMISSION"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "sales_percentage",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_11"
    }],
    display_attributes: {
      display_name: "Sales Commission Percentage",
      input_type: "text",
      description: "Percentage of the sales price",
      order: 15,
      block: "sales_commission",
      placeholder: "3%",
      width: 4,
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$",
          message: "Must be a valid percentage"
        }]
      },
      special_input: {
        text: { percentage: true }
      },
      visibleIf: [{
        unique_id: "sales_commission_type",
        operation: "contains",
        valueChecked: "SALES_PERCENTAGE"
      }],
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "sales_custom_amount",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_12"
    }],
    display_attributes: {
      display_name: "Sales Custom Commission",
      input_type: "text",
      description: "Enter the custom sales commission amount",
      order: 16,
      block: "sales_commission",
      placeholder: "$0.00",
      width: 6,
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: { currency: true }
      },
      visibleIf: [{
        unique_id: "sales_commission_type",
        operation: "contains",
        valueChecked: "SALES_CUSTOM"
      }],
      value: {
        type: "manual"
      }
    }
  },
  
  // Listing Broker Information Block
  {
    unique_id: "listing_broker_name",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_13"
    }],
    display_attributes: {
      display_name: "Listing Broker Name",
      input_type: "text",
      order: 17,
      block: "listing_broker_information",
      block_style: {
        title: "Listing Broker Information",
        description: "Details of the listing broker",
        icon: "briefcase",
        color_theme: "purple"
      },
      placeholder: "ABC Realty",
      width: 8,
      value: {
        type: "manual"
      },
      isCached: true,
      isRequired: true
    }
  },
  {
    unique_id: "listing_broker_signature",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_14",
      linked_dates: [{ dateFieldName: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_15" }]
    }],
    display_attributes: {
      display_name: "Listing Broker Signature",
      input_type: "signature",
      order: 18,
      block: "listing_broker_information",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },
  
  // Other Broker Information Block
  {
    unique_id: "other_broker_name",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_16"
    }],
    display_attributes: {
      display_name: "Other Broker Name",
      input_type: "text",
      order: 19,
      block: "other_broker_information",
      block_style: {
        title: "Other Broker Information",
        description: "Details of the cooperating broker",
        icon: "briefcase",
        color_theme: "purple"
      },
      placeholder: "XYZ Realty",
      width: 8,
      value: {
        type: "manual"
      },
      isCached: true,
      isRequired: true
    }
  },
  {
    unique_id: "other_broker_address",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_17"
    }],
    display_attributes: {
      display_name: "Other Broker Address",
      input_type: "text",
      order: 20,
      block: "other_broker_information",
      placeholder: "456 Business Ave",
      width: 12,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "other_broker_city_state_zip",
    pdf_attributes: [{
      formType: "agreement_between_brokers",
      formfield: "agreement_between_brokers_for_resid_leases___101403_ts51675_unlocked_textfield_18"
    }],
    display_attributes: {
      display_name: "City, State, ZIP",
      input_type: "text",
      order: 21,
      block: "other_broker_information",
      placeholder: "Austin, TX 78701",
      width: 12,
      value: {
        type: "manual"
      }
    }
  }
];