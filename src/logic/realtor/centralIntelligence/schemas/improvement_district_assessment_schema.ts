import { SchemaItem } from "../../../../types/realtor";

export const improvementDistrictAssessmentSchema: SchemaItem[] = [
  // Header Information Block
  {
    unique_id: "municipality_or_county_name",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_1"
    }],
    display_attributes: {
      display_name: "Municipality or County Name",
      input_type: "text",
      description: "Name of the municipality or county levying the assessment",
      order: 1,
      block: "assessment_details",
      block_style: {
        title: "Assessment Details",
        description: "Information about the improvement district assessment",
        icon: "file-text",
        color_theme: "blue"
      },
      placeholder: "City of Austin",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "property_address",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_2"
    }],
    display_attributes: {
      display_name: "Property Address",
      input_type: "text",
      description: "Full address of the property subject to assessment",
      order: 2,
      block: "assessment_details",
      placeholder: "123 Main Street, Austin, TX 78701",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },

  // District Information Block
  {
    unique_id: "public_improvement_district_name",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_3"
    }],
    display_attributes: {
      display_name: "Public Improvement District Name",
      input_type: "text",
      description: "Name of the public improvement district",
      order: 3,
      block: "district_information",
      block_style: {
        title: "District Information",
        description: "Details about the improvement district",
        icon: "building",
        color_theme: "purple"
      },
      placeholder: "Downtown Public Improvement District",
      width: 8,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "municipality_or_county_district",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_4"
    }],
    display_attributes: {
      display_name: "Municipality or County",
      input_type: "text",
      description: "Municipality or county where the district is created",
      order: 4,
      block: "district_information",
      placeholder: "City of Austin",
      width: 6,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "applicable_chapter",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_5"
    }],
    display_attributes: {
      display_name: "Applicable Chapter",
      input_type: "text",
      description: "Applicable chapter of Government Code or Local Government Code",
      order: 5,
      block: "district_information",
      placeholder: "Chapter 372",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },

  // Assessment Information Block
  {
    unique_id: "authorized_project",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_6"
    }],
    display_attributes: {
      display_name: "Authorized Project",
      input_type: "text",
      description: "Description of the authorized public improvement project",
      order: 6,
      block: "project_details",
      block_style: {
        title: "Project Details",
        description: "Information about the improvement project",
        icon: "tool",
        color_theme: "orange"
      },
      placeholder: "Street lighting improvements",
      width: 12,
      value: {
        type: "manual"
      },
      isRequired: true
    }
  },
  {
    unique_id: "ordinance_resolution_number",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_7"
    }],
    display_attributes: {
      display_name: "Ordinance or Resolution Number",
      input_type: "text",
      description: "Number of the ordinance or resolution",
      order: 7,
      block: "project_details",
      placeholder: "2024-001",
      width: 6,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "ordinance_resolution_date",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_8"
    }],
    display_attributes: {
      display_name: "Ordinance or Resolution Date",
      input_type: "text",
      description: "Date of the ordinance or resolution",
      order: 8,
      block: "project_details",
      placeholder: "01/15/2024",
      width: 6,
      validation: {
        loopback: [{
          regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
          message: "Must be a valid date (MM/DD/YYYY)"
        }]
      },
      special_input: {
        text: { date: true }
      },
      value: {
        type: "manual"
      }
    }
  },

  // Contact Information Block
  {
    unique_id: "governing_body_name",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_9"
    }],
    display_attributes: {
      display_name: "Governing Body Name",
      input_type: "text",
      description: "Name of city council or county commissioners court",
      order: 9,
      block: "contact_information",
      block_style: {
        title: "Contact Information",
        description: "Where to find more information",
        icon: "info",
        color_theme: "green"
      },
      placeholder: "Austin City Council",
      width: 8,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "contact_website",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_10"
    }],
    display_attributes: {
      display_name: "Contact Website",
      input_type: "text",
      description: "Website for more information about the district",
      order: 10,
      block: "contact_information",
      placeholder: "www.austintexas.gov/pid",
      width: 8,
      value: {
        type: "manual"
      }
    }
  },
  {
    unique_id: "contact_location",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_11"
    }],
    display_attributes: {
      display_name: "Contact Location",
      input_type: "text",
      description: "Physical location for more information",
      order: 11,
      block: "contact_information",
      placeholder: "301 W. 2nd Street, Austin, TX 78701",
      width: 12,
      value: {
        type: "manual"
      }
    }
  },

  // Signatures Block
  {
    unique_id: "seller_signature_1",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_16",
      linked_dates: [{ dateFieldName: "addendum__improvement_district_assessment_textfield_12" }]
    }],
    display_attributes: {
      display_name: "Seller Signature",
      input_type: "signature",
      order: 12,
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
    unique_id: "seller_signature_2",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_18",
      linked_dates: [{ dateFieldName: "addendum__improvement_district_assessment_textfield_13" }]
    }],
    display_attributes: {
      display_name: "Seller Signature",
      input_type: "signature",
      order: 13,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  },
  {
    unique_id: "buyer_signature_1",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_17",
      linked_dates: [{ dateFieldName: "addendum__improvement_district_assessment_textfield_14" }]
    }],
    display_attributes: {
      display_name: "Buyer Signature",
      input_type: "signature",
      order: 14,
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
    unique_id: "buyer_signature_2",
    pdf_attributes: [{
      formType: "improvement_district_assessment",
      formfield: "addendum__improvement_district_assessment_textfield_19",
      linked_dates: [{ dateFieldName: "addendum__improvement_district_assessment_textfield_15" }]
    }],
    display_attributes: {
      display_name: "Buyer Signature",
      input_type: "signature",
      order: 15,
      block: "signatures",
      width: 6,
      value: {
        type: "manual",
        output: "SignatureInput__signer"
      }
    }
  }
];