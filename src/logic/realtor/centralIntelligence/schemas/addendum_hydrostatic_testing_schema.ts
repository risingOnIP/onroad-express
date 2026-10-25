import { SchemaItem } from "../../../../types/realtor";

export const addendumHydrostaticTestingSchema: SchemaItem[] = [
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "addendum_hydrostatic_testing",
      formfield: "addendum_hydrostatic_testing_textfield_1"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Enter the complete street address and city of the property",
      order: 1,

      block: "Property Information",
      block_style: {
        title: "Property Information",
        description: "Details about the property subject to this addendum",
        icon: "home",
        color_theme: "blue"
      },
      placeholder: "123 Main Street, Austin",
      width: 9,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "risk_allocation",
    pdf_attributes: [{
      formType: "addendum_hydrostatic_testing",
      formfield: "risk_allocation",
      linked_form_fields_checkbox: [
        { fromDatabase: "SELLER_LIABLE", pdfAttribute: "addendum_hydrostatic_testing_checkbox_1" },
        { fromDatabase: "BUYER_LIABLE", pdfAttribute: "addendum_hydrostatic_testing_checkbox_2" },
        { fromDatabase: "BUYER_LIABLE_LIMITED", pdfAttribute: "addendum_hydrostatic_testing_checkbox_3" }
      ]
    }],
    display_attributes: {
      display_name: "Allocation of Risk",
      input_type: "checkbox",
      description: "Select who will be liable for damages caused by the hydrostatic plumbing test",
      order: 2,
      block: "Risk Allocation",
      block_style: {
        title: "Allocation of Risk",
        description: "Determine liability for hydrostatic testing damages",
        icon: "shield",
        color_theme: "orange"
      },
      checkbox_options: {
        options: [
          {
            display_name: "Seller shall be liable for damages",
            databaseStored: "SELLER_LIABLE"
          },
          {
            display_name: "Buyer shall be liable for damages",
            databaseStored: "BUYER_LIABLE"
          },
          {
            display_name: "Buyer shall be liable for damages up to a specified amount",
            databaseStored: "BUYER_LIABLE_LIMITED",
            linkedFields: ["buyer_liability_limit"]
          }
        ],
        maxSelected: 1,
        minSelected: 1
      },
      width: 12,
      value: {
        type: "manual"
      },
      special_input: {
        checkbox: {
          asRadio: true
        }
      },
      isRequired: true
    }
  },
  {
    unique_id: "buyer_liability_limit",
    pdf_attributes: [{
      formType: "addendum_hydrostatic_testing",
      formfield: "addendum_hydrostatic_testing_textfield_2"
    }],
    display_attributes: {
      display_name: "Maximum Liability Amount",
      input_type: "text",
      description: "Enter the maximum amount buyer is liable for if damages occur",
      order: 3,
      block: "Risk Allocation",
      placeholder: "$5,000.00",
      width: 4,
      visibleIf: [{
        unique_id: "risk_allocation",
        operation: "contains",
        valueChecked: "BUYER_LIABLE_LIMITED"
      }],
      validation: {
        loopback: [{
          regex: "^[\\d.,$]+$",
          message: "Must be a valid monetary amount"
        }]
      },
      special_input: {
        text: {
          currency: true
        }
      },
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "buyer_1_signature",
    pdf_attributes: [{
      formType: "addendum_hydrostatic_testing",
      formfield: "addendum_hydrostatic_testing_textfield_6",
      linked_dates: [
        { dateFieldName: "addendum_hydrostatic_testing_textfield_3" }
      ]
    }],
    display_attributes: {
      display_name: "Buyer 1 Signature",
      input_type: "signature",
      description: "Signature of the first buyer",
      order: 4,
      block: "Buyer Signatures",
      block_style: {
        title: "Buyer Signatures",
        description: "All buyers must sign this addendum",
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
    unique_id: "buyer_2_signature",
    pdf_attributes: [{
      formType: "addendum_hydrostatic_testing",
      formfield: "addendum_hydrostatic_testing_textfield_4",
      linked_dates: [
        { dateFieldName: "addendum_hydrostatic_testing_textfield_5" }
      ]
    }],
    display_attributes: {
      display_name: "Buyer 2 Signature",
      input_type: "signature",
      description: "Signature of the second buyer (if applicable)",
      order: 5,
      block: "Buyer Signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  }
];