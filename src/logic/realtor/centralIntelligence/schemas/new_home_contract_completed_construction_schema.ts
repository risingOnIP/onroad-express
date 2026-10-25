import { SchemaItem } from '../../../../types/realtor';

export const newHomeContractCompletedConstructionSchema: SchemaItem[] = [
  {
    unique_id: 'buyer_name',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_1'
      }
    ],
    display_attributes: {
      display_name: 'Buyer Name',
      input_type: 'text',
      order: 1,
      block: 'parties',
      block_style: {
        title: 'Parties Information',
        icon: 'users',
        color_theme: 'green'
      },
      width: 8,
      value: {
        type: 'manual'
      },
      placeholder: 'John and Jane Doe'
    }
  },
  {
    unique_id: 'seller_name',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_2'
      }
    ],
    display_attributes: {
      display_name: 'Seller Name',
      input_type: 'text',
      order: 2,
      block: 'parties',
      block_style: {
        title: 'Parties Information',
        icon: 'users',
        color_theme: 'green'
      },
      width: 8,
      value: {
        type: 'manual'
      },
      placeholder: 'ABC Builders, LLC'
    }
  },
  {
    unique_id: 'property_lot',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_3'
      }
    ],
    display_attributes: {
      display_name: 'Lot',
      input_type: 'text',
      order: 3,
      block: 'property_info',
      block_style: {
        title: 'Property Information',
        icon: 'home',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '25'
    }
  },
  {
    unique_id: 'property_block',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_4'
      }
    ],
    display_attributes: {
      display_name: 'Block',
      input_type: 'text',
      order: 4,
      block: 'property_info',
      block_style: {
        title: 'Property Information',
        icon: 'home',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'B'
    }
  },
  {
    unique_id: 'property_addition',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_5'
      }
    ],
    display_attributes: {
      display_name: 'Addition',
      input_type: 'text',
      order: 5,
      block: 'property_info',
      block_style: {
        title: 'Property Information',
        icon: 'home',
        color_theme: 'blue'
      },
      width: 8,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'property_city',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_6'
      }
    ],
    display_attributes: {
      display_name: 'City',
      input_type: 'text',
      order: 6,
      block: 'property_info',
      block_style: {
        title: 'Property Information',
        icon: 'home',
        color_theme: 'blue'
      },
      width: 6,
      value: {
        type: 'manual'
      },
      placeholder: 'Houston'
    }
  },
  {
    unique_id: 'property_county',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_7'
      }
    ],
    display_attributes: {
      display_name: 'County',
      input_type: 'text',
      order: 7,
      block: 'property_info',
      block_style: {
        title: 'Property Information',
        icon: 'home',
        color_theme: 'blue'
      },
      width: 6,
      value: {
        type: 'manual'
      },
      placeholder: 'Harris'
    }
  },
  {
    unique_id: 'property_address',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_8'
      }
    ],
    display_attributes: {
      display_name: 'Property Address/ZIP Code',
      input_type: 'text',
      order: 8,
      block: 'property_info',
      block_style: {
        title: 'Property Information',
        icon: 'home',
        color_theme: 'blue'
      },
      width: 12,
      value: {
        type: 'manual'
      },
      placeholder: '123 Main Street, Houston, TX 77001'
    }
  },
  {
    unique_id: 'sales_price',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_9'
      }
    ],
    display_attributes: {
      display_name: 'Sales Price',
      input_type: 'text',
      order: 9,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'financing_amount',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_10'
      }
    ],
    display_attributes: {
      display_name: 'Sum of Financing',
      input_type: 'text',
      order: 10,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'cash_down_payment',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_11'
      }
    ],
    display_attributes: {
      display_name: 'Cash Down Payment',
      input_type: 'text',
      order: 11,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'earnest_money_amount',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_13'
      }
    ],
    display_attributes: {
      display_name: 'Earnest Money',
      input_type: 'text',
      order: 12,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'additional_earnest_money',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_14'
      }
    ],
    display_attributes: {
      display_name: 'Additional Earnest Money',
      input_type: 'text',
      order: 13,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'days_additional_earnest_money',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_15'
      }
    ],
    display_attributes: {
      display_name: 'Days for Additional Earnest Money',
      input_type: 'text',
      order: 14,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 2,
      value: {
        type: 'manual'
      },
      placeholder: '10'
    }
  },
  {
    unique_id: 'option_fee',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_16'
      }
    ],
    display_attributes: {
      display_name: 'Option Fee',
      input_type: 'text',
      order: 15,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'earnest_money_25',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_18'
      }
    ],
    display_attributes: {
      display_name: 'Earnest Money',
      input_type: 'text',
      order: 16,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'amount_128',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_44'
      }
    ],
    display_attributes: {
      display_name: 'Amount',
      input_type: 'checkbox',
      order: 17,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'price_129',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_86'
      }
    ],
    display_attributes: {
      display_name: 'Price',
      input_type: 'text',
      order: 18,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'price_130',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_45'
      }
    ],
    display_attributes: {
      display_name: 'Price',
      input_type: 'checkbox',
      order: 19,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'amount_249',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_70'
      }
    ],
    display_attributes: {
      display_name: 'Amount',
      input_type: 'checkbox',
      order: 20,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'amount_250',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'when the Listing Brokers fee is received Escrow agent is authorized and directed to pay Other Broker from.new_home_contract_completed_construction_textfield_181'
      }
    ],
    display_attributes: {
      display_name: 'Amount',
      input_type: 'text',
      order: 21,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'price_251',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_71'
      }
    ],
    display_attributes: {
      display_name: 'Price',
      input_type: 'checkbox',
      order: 22,
      block: 'financial',
      block_style: {
        title: 'Financial Details',
        icon: 'dollar-sign',
        color_theme: 'orange'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '$0.00',
      validation: {
        loopback: [
          {
            regex: '^[\\d.,$]+$',
            message: 'Must be a valid monetary amount'
          }
        ]
      },
      special_input: {
        text: {
          currency: true
        }
      }
    }
  },
  {
    unique_id: 'financing_third_party',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_1'
      }
    ],
    display_attributes: {
      display_name: 'Third Party Financing Addendum',
      input_type: 'checkbox',
      order: 23,
      block: 'financing',
      block_style: {
        title: 'Financing Options',
        icon: 'credit-card',
        color_theme: 'purple'
      },
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'financing_loan_assumption',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_2'
      }
    ],
    display_attributes: {
      display_name: 'Loan Assumption Addendum',
      input_type: 'checkbox',
      order: 24,
      block: 'financing',
      block_style: {
        title: 'Financing Options',
        icon: 'credit-card',
        color_theme: 'purple'
      },
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'financing_seller',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_3'
      }
    ],
    display_attributes: {
      display_name: 'Seller Financing Addendum',
      input_type: 'checkbox',
      order: 25,
      block: 'financing',
      block_style: {
        title: 'Financing Options',
        icon: 'credit-card',
        color_theme: 'purple'
      },
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'residential_leases',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_4'
      }
    ],
    display_attributes: {
      display_name: 'Residential Leases',
      input_type: 'checkbox',
      order: 26,
      block: 'leases',
      block_style: {
        title: 'Leases',
        icon: 'file-text',
        color_theme: 'blue'
      },
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'addendum_residential_leases',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_5'
      }
    ],
    display_attributes: {
      display_name: 'Addendum Regarding Residential Leases',
      input_type: 'checkbox',
      order: 27,
      block: 'leases',
      block_style: {
        title: 'Leases',
        icon: 'file-text',
        color_theme: 'blue'
      },
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'fixture_leases',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_6'
      }
    ],
    display_attributes: {
      display_name: 'Fixture Leases',
      input_type: 'checkbox',
      order: 28,
      block: 'leases',
      block_style: {
        title: 'Leases',
        icon: 'file-text',
        color_theme: 'blue'
      },
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'natural_resource_leases_delivered',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_7'
      }
    ],
    display_attributes: {
      display_name: 'Natural Resource Leases Delivered',
      input_type: 'checkbox',
      order: 29,
      block: 'leases',
      block_style: {
        title: 'Leases',
        icon: 'file-text',
        color_theme: 'blue'
      },
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'natural_resource_leases_not_delivered',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_8'
      }
    ],
    display_attributes: {
      display_name: 'Natural Resource Leases Not Delivered',
      input_type: 'checkbox',
      order: 30,
      block: 'leases',
      block_style: {
        title: 'Leases',
        icon: 'file-text',
        color_theme: 'blue'
      },
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'days_deliver_natural_resource_leases',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_12'
      }
    ],
    display_attributes: {
      display_name: 'Days to Deliver',
      input_type: 'text',
      order: 31,
      block: 'leases',
      block_style: {
        title: 'Leases',
        icon: 'file-text',
        color_theme: 'blue'
      },
      width: 2,
      value: {
        type: 'manual'
      },
      placeholder: '10'
    }
  },
  {
    unique_id: 'option_period_days',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_17'
      }
    ],
    display_attributes: {
      display_name: 'Option Period (Days)',
      input_type: 'text',
      order: 32,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 2,
      value: {
        type: 'manual'
      },
      placeholder: '10'
    }
  },
  {
    unique_id: 'effective_date_28',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_21'
      }
    ],
    display_attributes: {
      display_name: 'Effective Date',
      input_type: 'text',
      order: 33,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'effective_date_29',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_22'
      }
    ],
    display_attributes: {
      display_name: 'Effective Date',
      input_type: 'text',
      order: 34,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'effective_date_30',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_23'
      }
    ],
    display_attributes: {
      display_name: 'Effective Date',
      input_type: 'text',
      order: 35,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'effective_date_31',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_24'
      }
    ],
    display_attributes: {
      display_name: 'Effective Date',
      input_type: 'text',
      order: 36,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_33',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_9'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'checkbox',
      order: 37,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_34',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_10'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'checkbox',
      order: 38,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_35',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_26'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'text',
      order: 39,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_40',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_15'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'checkbox',
      order: 40,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_41',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_27'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'text',
      order: 41,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_42',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_16'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'checkbox',
      order: 42,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_43',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_17'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'checkbox',
      order: 43,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_44',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_18'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'checkbox',
      order: 44,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_45',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_28'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'text',
      order: 45,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'effective_date_48',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_30'
      }
    ],
    display_attributes: {
      display_name: 'Effective Date',
      input_type: 'text',
      order: 46,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_49',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_31'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'text',
      order: 47,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_55',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_37'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'text',
      order: 48,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'closing_date_118',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_76'
      }
    ],
    display_attributes: {
      display_name: 'Closing Date',
      input_type: 'text',
      order: 49,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_132',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_88'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 50,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_133',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_89'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 51,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_134',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_90'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 52,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_135',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_91'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 53,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_136',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_92'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 54,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'effective_date_199',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_135'
      }
    ],
    display_attributes: {
      display_name: 'Effective Date',
      input_type: 'text',
      order: 55,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_200',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_136'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 56,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_254',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_184'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 57,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_255',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_185'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 58,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_258',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_188'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 59,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_260',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_190'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 60,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_264',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_194'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 61,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_268',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_198'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 62,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_270',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_200'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 63,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_274',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_204'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 64,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_278',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_208'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 65,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_280',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_210'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 66,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_282',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_212'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 67,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_283',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_213'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 68,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_284',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_214'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 69,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_286',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_216'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 70,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'date_290',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_220'
      }
    ],
    display_attributes: {
      display_name: 'Date',
      input_type: 'text',
      order: 71,
      block: 'dates_deadlines',
      block_style: {
        title: 'Dates and Deadlines',
        icon: 'calendar',
        color_theme: 'blue'
      },
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: 'MM/DD/YYYY',
      validation: {
        loopback: [
          {
            regex: '^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$',
            message: 'Must be a valid date (MM/DD/YYYY)'
          }
        ]
      },
      special_input: {
        text: {
          date: true
        }
      }
    }
  },
  {
    unique_id: 'initial_27',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_20'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 72,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_53',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_35'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 73,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_54',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_36'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 74,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_59',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_39'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 75,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_92',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_68'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 76,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_122',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_80'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 77,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_123',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_81'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 78,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_148',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_104'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 79,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_150',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_106'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 80,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_154',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_110'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 81,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_155',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_111'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 82,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_195',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_131'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 83,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'initial_196',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_132'
      }
    ],
    display_attributes: {
      display_name: 'Initial',
      input_type: 'signature',
      order: 84,
      block: 'signatures',
      block_style: {
        title: 'Signatures',
        icon: 'pen-tool',
        color_theme: 'gray'
      },
      width: 3,
      value: {
        type: 'manual',
        output: 'SignatureInput__signer'
      }
    }
  },
  {
    unique_id: 'field_26',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_19'
      }
    ],
    display_attributes: {
      display_name: 'Field 26',
      input_type: 'text',
      order: 85,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_32',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_25'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 86,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_36',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_11'
      }
    ],
    display_attributes: {
      display_name: 'Option 36',
      input_type: 'checkbox',
      order: 87,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_37',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_12'
      }
    ],
    display_attributes: {
      display_name: 'Option 37',
      input_type: 'checkbox',
      order: 88,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_38',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_13'
      }
    ],
    display_attributes: {
      display_name: 'Option 38',
      input_type: 'checkbox',
      order: 89,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_39',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_14'
      }
    ],
    display_attributes: {
      display_name: 'Option 39',
      input_type: 'checkbox',
      order: 90,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_46',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_19'
      }
    ],
    display_attributes: {
      display_name: 'Option 46',
      input_type: 'checkbox',
      order: 91,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_47',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_29'
      }
    ],
    display_attributes: {
      display_name: 'Field 47',
      input_type: 'text',
      order: 92,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_50',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_32'
      }
    ],
    display_attributes: {
      display_name: 'Field 50',
      input_type: 'text',
      order: 93,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_51',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_33'
      }
    ],
    display_attributes: {
      display_name: 'Field 51',
      input_type: 'text',
      order: 94,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_52',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_34'
      }
    ],
    display_attributes: {
      display_name: 'Field 52',
      input_type: 'text',
      order: 95,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_56',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_20'
      }
    ],
    display_attributes: {
      display_name: 'Option 56',
      input_type: 'checkbox',
      order: 96,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_57',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_21'
      }
    ],
    display_attributes: {
      display_name: 'Option 57',
      input_type: 'checkbox',
      order: 97,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_58',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_38'
      }
    ],
    display_attributes: {
      display_name: 'Field 58',
      input_type: 'text',
      order: 98,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_60',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_40'
      }
    ],
    display_attributes: {
      display_name: 'Field 60',
      input_type: 'text',
      order: 99,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_61',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_41'
      }
    ],
    display_attributes: {
      display_name: 'Field 61',
      input_type: 'text',
      order: 100,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_62',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_42'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 101,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_63',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_43'
      }
    ],
    display_attributes: {
      display_name: 'Field 63',
      input_type: 'text',
      order: 102,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_64',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_44'
      }
    ],
    display_attributes: {
      display_name: 'Field 64',
      input_type: 'text',
      order: 103,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_65',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_45'
      }
    ],
    display_attributes: {
      display_name: 'Field 65',
      input_type: 'text',
      order: 104,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_66',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_22'
      }
    ],
    display_attributes: {
      display_name: 'Option 66',
      input_type: 'checkbox',
      order: 105,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_67',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_23'
      }
    ],
    display_attributes: {
      display_name: 'Option 67',
      input_type: 'checkbox',
      order: 106,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_68',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_46'
      }
    ],
    display_attributes: {
      display_name: 'Field 68',
      input_type: 'text',
      order: 107,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_69',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_47'
      }
    ],
    display_attributes: {
      display_name: 'Field 69',
      input_type: 'text',
      order: 108,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_70',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_24'
      }
    ],
    display_attributes: {
      display_name: 'Option 70',
      input_type: 'checkbox',
      order: 109,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_71',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_25'
      }
    ],
    display_attributes: {
      display_name: 'Option 71',
      input_type: 'checkbox',
      order: 110,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_72',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_48'
      }
    ],
    display_attributes: {
      display_name: 'Field 72',
      input_type: 'text',
      order: 111,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_73',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_49'
      }
    ],
    display_attributes: {
      display_name: 'Field 73',
      input_type: 'text',
      order: 112,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_74',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_50'
      }
    ],
    display_attributes: {
      display_name: 'Field 74',
      input_type: 'text',
      order: 113,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_75',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_51'
      }
    ],
    display_attributes: {
      display_name: 'Field 75',
      input_type: 'text',
      order: 114,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_76',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_52'
      }
    ],
    display_attributes: {
      display_name: 'Field 76',
      input_type: 'text',
      order: 115,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_77',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_53'
      }
    ],
    display_attributes: {
      display_name: 'Field 77',
      input_type: 'text',
      order: 116,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_78',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_54'
      }
    ],
    display_attributes: {
      display_name: 'Field 78',
      input_type: 'text',
      order: 117,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_79',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_55'
      }
    ],
    display_attributes: {
      display_name: 'Field 79',
      input_type: 'text',
      order: 118,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_80',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_56'
      }
    ],
    display_attributes: {
      display_name: 'Field 80',
      input_type: 'text',
      order: 119,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_81',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_57'
      }
    ],
    display_attributes: {
      display_name: 'Field 81',
      input_type: 'text',
      order: 120,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_82',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_58'
      }
    ],
    display_attributes: {
      display_name: 'Field 82',
      input_type: 'text',
      order: 121,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_83',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_59'
      }
    ],
    display_attributes: {
      display_name: 'Field 83',
      input_type: 'text',
      order: 122,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_84',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_60'
      }
    ],
    display_attributes: {
      display_name: 'Field 84',
      input_type: 'text',
      order: 123,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_85',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_61'
      }
    ],
    display_attributes: {
      display_name: 'Field 85',
      input_type: 'text',
      order: 124,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_86',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_62'
      }
    ],
    display_attributes: {
      display_name: 'Field 86',
      input_type: 'text',
      order: 125,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_87',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_63'
      }
    ],
    display_attributes: {
      display_name: 'Field 87',
      input_type: 'text',
      order: 126,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_88',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_64'
      }
    ],
    display_attributes: {
      display_name: 'Field 88',
      input_type: 'text',
      order: 127,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_89',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_65'
      }
    ],
    display_attributes: {
      display_name: 'Field 89',
      input_type: 'text',
      order: 128,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_90',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_66'
      }
    ],
    display_attributes: {
      display_name: 'Field 90',
      input_type: 'text',
      order: 129,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_91',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_67'
      }
    ],
    display_attributes: {
      display_name: 'Field 91',
      input_type: 'text',
      order: 130,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_93',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_69'
      }
    ],
    display_attributes: {
      display_name: 'Field 93',
      input_type: 'text',
      order: 131,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_94',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_70'
      }
    ],
    display_attributes: {
      display_name: 'Field 94',
      input_type: 'text',
      order: 132,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_95',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_71'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 133,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_96',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_26'
      }
    ],
    display_attributes: {
      display_name: 'Option 96',
      input_type: 'checkbox',
      order: 134,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_97',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_27'
      }
    ],
    display_attributes: {
      display_name: 'Option 97',
      input_type: 'checkbox',
      order: 135,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_98',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_28'
      }
    ],
    display_attributes: {
      display_name: 'Option 98',
      input_type: 'checkbox',
      order: 136,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_99',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_29'
      }
    ],
    display_attributes: {
      display_name: 'Option 99',
      input_type: 'checkbox',
      order: 137,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_100',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_30'
      }
    ],
    display_attributes: {
      display_name: 'Option 100',
      input_type: 'checkbox',
      order: 138,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_101',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_31'
      }
    ],
    display_attributes: {
      display_name: 'Option 101',
      input_type: 'checkbox',
      order: 139,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_102',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_32'
      }
    ],
    display_attributes: {
      display_name: 'Option 102',
      input_type: 'checkbox',
      order: 140,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_103',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_33'
      }
    ],
    display_attributes: {
      display_name: 'Option 103',
      input_type: 'checkbox',
      order: 141,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_104',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_34'
      }
    ],
    display_attributes: {
      display_name: 'Option 104',
      input_type: 'checkbox',
      order: 142,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_105',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_35'
      }
    ],
    display_attributes: {
      display_name: 'Option 105',
      input_type: 'checkbox',
      order: 143,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_106',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_36'
      }
    ],
    display_attributes: {
      display_name: 'Option 106',
      input_type: 'checkbox',
      order: 144,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_107',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_37'
      }
    ],
    display_attributes: {
      display_name: 'Option 107',
      input_type: 'checkbox',
      order: 145,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_108',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_38'
      }
    ],
    display_attributes: {
      display_name: 'Option 108',
      input_type: 'checkbox',
      order: 146,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_109',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_39'
      }
    ],
    display_attributes: {
      display_name: 'Option 109',
      input_type: 'checkbox',
      order: 147,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_110',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'A Buyers Possession Seller shall deliver to Buyer possession of the Property in its present or required.new_home_contract_completed_construction_checkbox_40'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'checkbox',
      order: 148,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_111',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'temporary residential lease form promulgated by TREC or other written lease required by the parties.new_home_contract_completed_construction_checkbox_41'
      }
    ],
    display_attributes: {
      display_name: 'Option 111',
      input_type: 'checkbox',
      order: 149,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_112',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_42'
      }
    ],
    display_attributes: {
      display_name: 'Option 112',
      input_type: 'checkbox',
      order: 150,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_113',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_43'
      }
    ],
    display_attributes: {
      display_name: 'Option 113',
      input_type: 'checkbox',
      order: 151,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_114',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_72'
      }
    ],
    display_attributes: {
      display_name: 'Field 114',
      input_type: 'text',
      order: 152,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_115',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_73'
      }
    ],
    display_attributes: {
      display_name: 'Field 115',
      input_type: 'text',
      order: 153,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_116',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_74'
      }
    ],
    display_attributes: {
      display_name: 'Field 116',
      input_type: 'text',
      order: 154,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_117',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_75'
      }
    ],
    display_attributes: {
      display_name: 'Field 117',
      input_type: 'text',
      order: 155,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_119',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_77'
      }
    ],
    display_attributes: {
      display_name: 'Field 119',
      input_type: 'text',
      order: 156,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_120',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_78'
      }
    ],
    display_attributes: {
      display_name: 'Field 120',
      input_type: 'text',
      order: 157,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_121',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_79'
      }
    ],
    display_attributes: {
      display_name: 'Field 121',
      input_type: 'text',
      order: 158,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_124',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_82'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 159,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_125',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_83'
      }
    ],
    display_attributes: {
      display_name: 'Field 125',
      input_type: 'text',
      order: 160,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_126',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_84'
      }
    ],
    display_attributes: {
      display_name: 'Field 126',
      input_type: 'text',
      order: 161,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_127',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_85'
      }
    ],
    display_attributes: {
      display_name: 'Field 127',
      input_type: 'text',
      order: 162,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_131',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_87'
      }
    ],
    display_attributes: {
      display_name: 'Field 131',
      input_type: 'text',
      order: 163,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_137',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_93'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 164,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_138',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_94'
      }
    ],
    display_attributes: {
      display_name: 'Field 138',
      input_type: 'text',
      order: 165,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_139',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_95'
      }
    ],
    display_attributes: {
      display_name: 'Field 139',
      input_type: 'text',
      order: 166,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_140',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_96'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 167,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_141',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_97'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 168,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_142',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_98'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 169,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_143',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_99'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 170,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_144',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_100'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 171,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_145',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_101'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 172,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'field_146',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_102'
      }
    ],
    display_attributes: {
      display_name: 'Field 146',
      input_type: 'text',
      order: 173,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_147',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_103'
      }
    ],
    display_attributes: {
      display_name: 'Field 147',
      input_type: 'text',
      order: 174,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_149',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_105'
      }
    ],
    display_attributes: {
      display_name: 'Field 149',
      input_type: 'text',
      order: 175,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_151',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_107'
      }
    ],
    display_attributes: {
      display_name: 'Field 151',
      input_type: 'text',
      order: 176,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_152',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_108'
      }
    ],
    display_attributes: {
      display_name: 'Field 152',
      input_type: 'text',
      order: 177,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_153',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_109'
      }
    ],
    display_attributes: {
      display_name: 'Field 153',
      input_type: 'text',
      order: 178,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_156',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_112'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 179,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_157',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_46'
      }
    ],
    display_attributes: {
      display_name: 'Option 157',
      input_type: 'checkbox',
      order: 180,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_158',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_47'
      }
    ],
    display_attributes: {
      display_name: 'Option 158',
      input_type: 'checkbox',
      order: 181,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_159',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_48'
      }
    ],
    display_attributes: {
      display_name: 'Option 159',
      input_type: 'checkbox',
      order: 182,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_160',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_49'
      }
    ],
    display_attributes: {
      display_name: 'Option 160',
      input_type: 'checkbox',
      order: 183,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_161',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_50'
      }
    ],
    display_attributes: {
      display_name: 'Option 161',
      input_type: 'checkbox',
      order: 184,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_162',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_51'
      }
    ],
    display_attributes: {
      display_name: 'Option 162',
      input_type: 'checkbox',
      order: 185,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_163',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_52'
      }
    ],
    display_attributes: {
      display_name: 'Option 163',
      input_type: 'checkbox',
      order: 186,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_164',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_53'
      }
    ],
    display_attributes: {
      display_name: 'Option 164',
      input_type: 'checkbox',
      order: 187,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_165',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_54'
      }
    ],
    display_attributes: {
      display_name: 'Option 165',
      input_type: 'checkbox',
      order: 188,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_166',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_55'
      }
    ],
    display_attributes: {
      display_name: 'Option 166',
      input_type: 'checkbox',
      order: 189,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_167',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_56'
      }
    ],
    display_attributes: {
      display_name: 'Option 167',
      input_type: 'checkbox',
      order: 190,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_168',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_57'
      }
    ],
    display_attributes: {
      display_name: 'Option 168',
      input_type: 'checkbox',
      order: 191,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_169',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_58'
      }
    ],
    display_attributes: {
      display_name: 'Option 169',
      input_type: 'checkbox',
      order: 192,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_170',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_59'
      }
    ],
    display_attributes: {
      display_name: 'Option 170',
      input_type: 'checkbox',
      order: 193,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_171',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_60'
      }
    ],
    display_attributes: {
      display_name: 'Option 171',
      input_type: 'checkbox',
      order: 194,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_172',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_61'
      }
    ],
    display_attributes: {
      display_name: 'Option 172',
      input_type: 'checkbox',
      order: 195,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_173',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_62'
      }
    ],
    display_attributes: {
      display_name: 'Option 173',
      input_type: 'checkbox',
      order: 196,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_174',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_63'
      }
    ],
    display_attributes: {
      display_name: 'Option 174',
      input_type: 'checkbox',
      order: 197,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_175',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_64'
      }
    ],
    display_attributes: {
      display_name: 'Option 175',
      input_type: 'checkbox',
      order: 198,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_176',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_65'
      }
    ],
    display_attributes: {
      display_name: 'Option 176',
      input_type: 'checkbox',
      order: 199,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_177',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_113'
      }
    ],
    display_attributes: {
      display_name: 'Field 177',
      input_type: 'text',
      order: 200,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_178',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_114'
      }
    ],
    display_attributes: {
      display_name: 'Field 178',
      input_type: 'text',
      order: 201,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_179',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_115'
      }
    ],
    display_attributes: {
      display_name: 'Field 179',
      input_type: 'text',
      order: 202,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_180',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_116'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 203,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_181',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_117'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 204,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_182',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_118'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 205,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_183',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_119'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 206,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'field_184',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_120'
      }
    ],
    display_attributes: {
      display_name: 'Field 184',
      input_type: 'text',
      order: 207,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_185',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_121'
      }
    ],
    display_attributes: {
      display_name: 'Field 185',
      input_type: 'text',
      order: 208,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_186',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_122'
      }
    ],
    display_attributes: {
      display_name: 'Field 186',
      input_type: 'text',
      order: 209,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_187',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_123'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 210,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_188',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_124'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 211,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_189',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_125'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 212,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_190',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_126'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 213,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'field_191',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_127'
      }
    ],
    display_attributes: {
      display_name: 'Field 191',
      input_type: 'text',
      order: 214,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_192',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_128'
      }
    ],
    display_attributes: {
      display_name: 'Field 192',
      input_type: 'text',
      order: 215,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_193',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_129'
      }
    ],
    display_attributes: {
      display_name: 'Field 193',
      input_type: 'text',
      order: 216,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_194',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_130'
      }
    ],
    display_attributes: {
      display_name: 'Field 194',
      input_type: 'text',
      order: 217,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_197',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_133'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 218,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_198',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_134'
      }
    ],
    display_attributes: {
      display_name: 'Field 198',
      input_type: 'text',
      order: 219,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_201',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_137'
      }
    ],
    display_attributes: {
      display_name: 'Field 201',
      input_type: 'text',
      order: 220,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_202',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_138'
      }
    ],
    display_attributes: {
      display_name: 'Field 202',
      input_type: 'text',
      order: 221,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_203',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_139'
      }
    ],
    display_attributes: {
      display_name: 'Field 203',
      input_type: 'text',
      order: 222,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_204',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_140'
      }
    ],
    display_attributes: {
      display_name: 'Field 204',
      input_type: 'text',
      order: 223,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_205',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_141'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 224,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_206',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_142'
      }
    ],
    display_attributes: {
      display_name: 'Field 206',
      input_type: 'text',
      order: 225,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_207',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_143'
      }
    ],
    display_attributes: {
      display_name: 'Field 207',
      input_type: 'text',
      order: 226,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_208',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_66'
      }
    ],
    display_attributes: {
      display_name: 'Option 208',
      input_type: 'checkbox',
      order: 227,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_209',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_67'
      }
    ],
    display_attributes: {
      display_name: 'Option 209',
      input_type: 'checkbox',
      order: 228,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_210',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_144'
      }
    ],
    display_attributes: {
      display_name: 'Field 210',
      input_type: 'text',
      order: 229,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_211',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_145'
      }
    ],
    display_attributes: {
      display_name: 'Field 211',
      input_type: 'text',
      order: 230,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_212',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_146'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 231,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'field_213',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_147'
      }
    ],
    display_attributes: {
      display_name: 'Field 213',
      input_type: 'text',
      order: 232,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_214',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_148'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 233,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_215',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_149'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 234,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_216',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_150'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 235,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_217',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_151'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 236,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_218',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_152'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 237,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_219',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_153'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 238,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_220',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_154'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 239,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_221',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_155'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 240,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'field_222',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_156'
      }
    ],
    display_attributes: {
      display_name: 'Field 222',
      input_type: 'text',
      order: 241,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_223',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_157'
      }
    ],
    display_attributes: {
      display_name: 'Field 223',
      input_type: 'text',
      order: 242,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_224',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_68'
      }
    ],
    display_attributes: {
      display_name: 'Option 224',
      input_type: 'checkbox',
      order: 243,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'checkbox_225',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_checkbox_69'
      }
    ],
    display_attributes: {
      display_name: 'Option 225',
      input_type: 'checkbox',
      order: 244,
      width: 3,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_226',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_158'
      }
    ],
    display_attributes: {
      display_name: 'Field 226',
      input_type: 'text',
      order: 245,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_227',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_159'
      }
    ],
    display_attributes: {
      display_name: 'Field 227',
      input_type: 'text',
      order: 246,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_228',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_160'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 247,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_229',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_161'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 248,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'field_230',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_162'
      }
    ],
    display_attributes: {
      display_name: 'Field 230',
      input_type: 'text',
      order: 249,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_231',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_163'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 250,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_232',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_164'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 251,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_233',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_165'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 252,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_234',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_166'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 253,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_235',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_167'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 254,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_236',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_168'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 255,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_237',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_169'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 256,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_238',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_170'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 257,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_239',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_171'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 258,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_240',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_172'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 259,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'field_241',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_173'
      }
    ],
    display_attributes: {
      display_name: 'Field 241',
      input_type: 'text',
      order: 260,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_242',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_174'
      }
    ],
    display_attributes: {
      display_name: 'Field 242',
      input_type: 'text',
      order: 261,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_243',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_175'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 262,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_244',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_176'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 263,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'phone_245',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_177'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 264,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'address_246',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_178'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 265,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_247',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_179'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 266,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_248',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_180'
      }
    ],
    display_attributes: {
      display_name: 'Field 248',
      input_type: 'text',
      order: 267,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_252',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_182'
      }
    ],
    display_attributes: {
      display_name: 'Field 252',
      input_type: 'text',
      order: 268,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_253',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_183'
      }
    ],
    display_attributes: {
      display_name: 'Field 253',
      input_type: 'text',
      order: 269,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_256',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_186'
      }
    ],
    display_attributes: {
      display_name: 'Field 256',
      input_type: 'text',
      order: 270,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_257',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_187'
      }
    ],
    display_attributes: {
      display_name: 'Field 257',
      input_type: 'text',
      order: 271,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_259',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_189'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 272,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_261',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_191'
      }
    ],
    display_attributes: {
      display_name: 'Field 261',
      input_type: 'text',
      order: 273,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_262',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_192'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 274,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'field_263',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_193'
      }
    ],
    display_attributes: {
      display_name: 'Field 263',
      input_type: 'text',
      order: 275,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_265',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_195'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 276,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_266',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_196'
      }
    ],
    display_attributes: {
      display_name: 'Field 266',
      input_type: 'text',
      order: 277,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_267',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_197'
      }
    ],
    display_attributes: {
      display_name: 'Field 267',
      input_type: 'text',
      order: 278,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_269',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_199'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 279,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_271',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_201'
      }
    ],
    display_attributes: {
      display_name: 'Field 271',
      input_type: 'text',
      order: 280,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'phone_272',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_202'
      }
    ],
    display_attributes: {
      display_name: 'Phone Number',
      input_type: 'text',
      order: 281,
      width: 4,
      value: {
        type: 'manual'
      },
      placeholder: '(555) 123-4567',
      validation: {
        loopback: [
          {
            regex: '^[-()\\s\\d]{10,}$',
            message: 'Must be a valid phone number'
          }
        ]
      },
      special_input: {
        text: {
          phone: true
        }
      }
    }
  },
  {
    unique_id: 'field_273',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_203'
      }
    ],
    display_attributes: {
      display_name: 'Field 273',
      input_type: 'text',
      order: 282,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_275',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_205'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 283,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_276',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_206'
      }
    ],
    display_attributes: {
      display_name: 'Field 276',
      input_type: 'text',
      order: 284,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_277',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_207'
      }
    ],
    display_attributes: {
      display_name: 'Field 277',
      input_type: 'text',
      order: 285,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_279',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_209'
      }
    ],
    display_attributes: {
      display_name: 'Field 279',
      input_type: 'text',
      order: 286,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_281',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_211'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 287,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_285',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_215'
      }
    ],
    display_attributes: {
      display_name: 'Field 285',
      input_type: 'text',
      order: 288,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'address_287',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_217'
      }
    ],
    display_attributes: {
      display_name: 'Address',
      input_type: 'text',
      order: 289,
      width: 12,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_288',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_218'
      }
    ],
    display_attributes: {
      display_name: 'Field 288',
      input_type: 'text',
      order: 290,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  },
  {
    unique_id: 'field_289',
    pdf_attributes: [
      {
        formType: 'new_home_contract_completed_construction',
        formfield: 'new_home_contract_completed_construction_textfield_219'
      }
    ],
    display_attributes: {
      display_name: 'Field 289',
      input_type: 'text',
      order: 291,
      width: 6,
      value: {
        type: 'manual'
      }
    }
  }
];