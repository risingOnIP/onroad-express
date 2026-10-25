import { SchemaItem } from "../../../../types/realtor";

export const addendumReservationOfOilGasMineralsSchema: SchemaItem[] = [
  // Property Information Block
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "addendum_reservation_of_oil_gas_minerals",
      formfield: "addendum_reservation_of_oil,_gas,_minerals_textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Street address and city of the property",
      order: 1,
      block: "property_information",
      block_style: {
        title: "Property Information",
        description: "Details about the property subject to mineral rights reservation",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, Houston, TX",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // Mineral Rights Reservation Block
  {
    unique_id: "reservation_type",
    pdf_attributes: [{
      formType: "addendum_reservation_of_oil_gas_minerals",
      formfield: "as follows check one box only.addendum_reservation_of_oil,_gas,_minerals_textfield_7",
      linked_form_fields_radio: [
        { radioField: "2", displayName: "Reserve All Mineral Estate" },
        { radioField: "1", displayName: "Reserve Partial Interest" }
      ]
    }],
    display_attributes: {
      display_name: "Reservation Type",
      input_type: "radio",
      description: "Select whether seller reserves all or a portion of the mineral estate",
      order: 2,
      block: "mineral_reservation",
      block_style: {
        title: "Mineral Rights Reservation",
        description: "Specify the type and extent of mineral rights being reserved",
        icon: "layers",
        color_theme: "orange"
      },
      display_radio_options: ["Reserve All Mineral Estate", "Reserve Partial Interest"],
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  {
    unique_id: "partial_interest_percentage",
    pdf_attributes: [{
      formType: "addendum_reservation_of_oil_gas_minerals",
      formfield: "addendum_reservation_of_oil,_gas,_minerals_textfield_2"
    }],
    display_attributes: {
      display_name: "Percentage/Fraction of Interest",
      input_type: "text",
      description: "Enter the percentage or fraction of mineral estate being reserved (e.g., 50% or 1/2)",
      order: 3,
      block: "mineral_reservation",
      placeholder: "50% or 1/2",
      width: 4,
      value: {
        type: "manual"
      },
      visibleIf: [{
        unique_id: "reservation_type",
        operation: "==",
        valueChecked: "Reserve Partial Interest"
      }],
      validation: {
        loopback: [{
          regex: "^[\\d.]+%?$|^\\d+/\\d+$",
          message: "Must be a valid percentage (e.g., 50%) or fraction (e.g., 1/2)"
        }]
      }
    }
  },

  // Surface Rights Waiver Block
  {
    unique_id: "surface_rights_waiver",
    pdf_attributes: [{
      formType: "addendum_reservation_of_oil_gas_minerals",
      formfield: "surface_rights_waiver",
      linked_form_fields_checkbox: [
        { fromDatabase: "DOES_WAIVE", pdfAttribute: "addendum_reservation_of_oil,_gas,_minerals_checkbox_1" },
        { fromDatabase: "DOES_NOT_WAIVE", pdfAttribute: "addendum_reservation_of_oil,_gas,_minerals_checkbox_2" }
      ]
    }],
    display_attributes: {
      display_name: "Surface Rights Waiver",
      input_type: "checkbox",
      description: "Select whether seller waives rights of ingress, egress, and reasonable use of the property",
      order: 4,
      block: "surface_rights",
      block_style: {
        title: "Surface Rights",
        description: "Specify seller's surface rights for mineral development",
        icon: "map",
        color_theme: "green"
      },
      checkbox_options: {
        options: [
          { 
            display_name: "Does waive surface rights", 
            databaseStored: "DOES_WAIVE"
          },
          { 
            display_name: "Does NOT waive surface rights", 
            databaseStored: "DOES_NOT_WAIVE"
          }
        ],
        maxSelected: 1,
        minSelected: 1
      },
      special_input: {
        checkbox: {
          asRadio: true
        }
      },
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // Signatures Block
  {
    unique_id: "buyer_signature",
    pdf_attributes: [{
      formType: "addendum_reservation_of_oil_gas_minerals",
      formfield: "addendum_reservation_of_oil,_gas,_minerals_textfield_3",
      linked_dates: [{ dateFieldName: "addendum_reservation_of_oil,_gas,_minerals_textfield_6" }]
    }],
    display_attributes: {
      display_name: "Buyer Signature",
      input_type: "signature",
      order: 5,
      block: "signatures",
      block_style: {
        title: "Signatures",
        description: "Required signatures for this addendum",
        icon: "pen-tool",
        color_theme: "gray"
      },
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },

  {
    unique_id: "buyer_signature_date",
    pdf_attributes: [{
      formType: "addendum_reservation_of_oil_gas_minerals",
      formfield: "addendum_reservation_of_oil,_gas,_minerals_textfield_6"
    }],
    display_attributes: {
      display_name: "Date",
      input_type: "text",
      order: 6,
      block: "signatures",
      placeholder: "MM/DD/YYYY",
      width: 3,
      value: {
        type: "manual"
      },
      special_input: {
        text: { date: true }
      },
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      isRequired: true
    }
  },

  {
    unique_id: "seller_signature",
    pdf_attributes: [{
      formType: "addendum_reservation_of_oil_gas_minerals",
      formfield: "addendum_reservation_of_oil,_gas,_minerals_textfield_4",
      linked_dates: [{ dateFieldName: "addendum_reservation_of_oil,_gas,_minerals_textfield_5" }]
    }],
    display_attributes: {
      display_name: "Seller Signature",
      input_type: "signature",
      order: 7,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      },
      isRequired: true
    }
  },

  {
    unique_id: "seller_signature_date",
    pdf_attributes: [{
      formType: "addendum_reservation_of_oil_gas_minerals",
      formfield: "addendum_reservation_of_oil,_gas,_minerals_textfield_5"
    }],
    display_attributes: {
      display_name: "Date",
      input_type: "text",
      order: 8,
      block: "signatures",
      placeholder: "MM/DD/YYYY",
      width: 3,
      value: {
        type: "manual"
      },
      special_input: {
        text: { date: true }
      },
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      isRequired: true
    }
  }
];