import { Schema } from "../../../../types/realtor";

export const ANIMAL_AGREEMENT_SCHEMA: Schema = [
  {
    "unique_id": "animal_agreement_info",
    "display_attributes": {
      "display_name": "Animal Agreement Form",
      "description": "This agreement establishes the terms and conditions for keeping animals on the rental property. All animal information must be accurate and complete to ensure compliance with property policies and local regulations.",
      "order": 1,
      "input_type": "info",
      "value": {
        "type": "manual"
      },
      "width": 12
    }
  },
  {
    "unique_id": "property_address",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "property_address",
        "linked_form_fields_text": [
          "property_address",
          "property_address_continued"
        ]
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "full_property_address"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "full_property_address_2"
      }
    ],
    "display_attributes": {
      "display_name": "Property Address",
      "input_type": "text",
      "order": 2,
      "block": "Property Information",
      "block_style": {
        "title": "Property Information",
        "description": "Address details for the rental property",
        "icon": "Home",
        "color_theme": "blue"
      },
      "placeholder": "123 Main Street, City, State 12345",
      "width": 12,
      "isRequired": true,
      "value": {
        "type": "resolved",
        "supabase": [
          {
            "table": "deals",
            "column": "dealName",
            "eqBy": [
              {
                "columnName": "id",
                "variable": "dealId"
              }
            ]
          }
        ]
      },
      "special_input": {
        "text": {
          "phone": true,
        }
      }
    }
  },
  {
    "unique_id": "field_1754344672221_ro401lpyk",
    "display_attributes": {
      "display_name": "More Than Four Animals",
      "input_type": "info",
      "order": 3,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Animal Count",
      "description": "If you have more than four animals, you will need to click \"Convert to Custom Form\" to manually add the extra individuals to the contract PDF."
    }
  },
  {
    "unique_id": "number_of_animals_question",
    "display_attributes": {
      "display_name": "How Many Animals Are You Moving In?",
      "description": "Select the total number of animals that will be living on the property. This will determine which sections of the form you need to complete.",
      "input_type": "radio",
      "order": 4,
      "block": "Animal Count",
      "block_style": {
        "title": "Number of Animals",
        "description": "Specify how many animals will be kept on the property",
        "icon": "Users",
        "color_theme": "green"
      },
      "display_radio_options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "width": 12,
      "isRequired": true,
      "value": {
        "type": "manual"
      },
      "breakBefore": true
    }
  },
  {
    "unique_id": "type",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "type",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Animal Type",
      "input_type": "text",
      "order": 5,
      "block": "Animal 1 Details",
      "block_style": {
        "title": "First Animal Information",
        "description": "Complete details for your first animal",
        "icon": "Users",
        "color_theme": "green"
      },
      "placeholder": "e.g., Dog, Cat, Bird",
      "width": 5,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      },
      "breakBefore": true
    }
  },
  {
    "unique_id": "breed",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "breed",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Breed",
      "input_type": "text",
      "order": 6,
      "block": "Animal 1 Details",
      "placeholder": "Golden Retriever, Persian, Mixed, etc.",
      "width": 7,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "name",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "name",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Animal's Name",
      "input_type": "text",
      "order": 7,
      "block": "Animal 1 Details",
      "placeholder": "Buddy, Whiskers, etc.",
      "width": 8,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "color",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "color",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Color",
      "input_type": "text",
      "order": 8,
      "block": "Animal 1 Details",
      "placeholder": "Brown, Black & White, Tabby, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "weight",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "weight",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Weight",
      "input_type": "text",
      "order": 9,
      "block": "Animal 1 Details",
      "placeholder": "45 lbs, 8 lbs, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "age",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "age",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Age",
      "input_type": "text",
      "order": 10,
      "block": "Animal 1 Details",
      "placeholder": "3 years, 6 months, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "gender",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "gender",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Gender",
      "input_type": "text",
      "order": 11,
      "block": "Animal 1 Details",
      "placeholder": "Male, Female",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "spayed/nuetered",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "spa/nue",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_1_spayed_yes",
            "pdfAttribute": "animal_1_spayed_yes"
          },
          {
            "fromDatabase": "animal_1_spayed_no",
            "pdfAttribute": "animal_1_spayed_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Spayed/Neutered?",
      "description": "Has this animal already been spayed or neutered?",
      "input_type": "checkbox",
      "order": 12,
      "block": "Animal 1 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_1_spayed_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_1_spayed_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "rabies_shot_current",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "rabies",
         "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_1_rabies_yes",
            "pdfAttribute": "animal_1_rabies_yes"
          },
          {
            "fromDatabase": "animal_1_rabies_no",
            "pdfAttribute": "animal_1_rabies_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Current Rabies Vaccination?",
      "description": "Is the animal's rabies vaccination current and up-to-date?",
      "input_type": "checkbox",
      "order": 13,
      "block": "Animal 1 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_1_rabies_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_1_rabies_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "assistance_animal",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "assist",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_1_assistance_yes",
            "pdfAttribute": "animal_1_assistance_yes"
          },
          {
            "fromDatabase": "animal_1_assistance_no",
            "pdfAttribute": "animal_1_assistance_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Service/Assistance Animal?",
      "description": "Is this animal a certified service or assistance animal?",
      "input_type": "checkbox",
      "order": 14,
      "block": "Animal 1 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "1"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_1_assistance_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_1_assistance_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "type_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "type_2",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Animal Type",
      "input_type": "text",
      "order": 15,
      "block": "Animal 2 Details",
      "block_style": {
        "title": "Second Animal Information",
        "description": "Complete details for your second animal",
        "icon": "Users",
        "color_theme": "green"
      },
      "placeholder": "e.g., Cat, Dog, Bird",
      "width": 5,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      },
      "breakBefore": true
    }
  },
  {
    "unique_id": "breed_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "breed_2",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Breed",
      "input_type": "text",
      "order": 16,
      "block": "Animal 2 Details",
      "placeholder": "Siamese, Labrador, Mixed, etc.",
      "width": 7,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "name_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "name_2",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Animal's Name",
      "input_type": "text",
      "order": 17,
      "block": "Animal 2 Details",
      "placeholder": "Luna, Max, etc.",
      "width": 8,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "color_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "color_2",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Color",
      "input_type": "text",
      "order": 18,
      "block": "Animal 2 Details",
      "placeholder": "Gray, Calico, Spotted, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "weight_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "weight_2",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Weight",
      "input_type": "text",
      "order": 19,
      "block": "Animal 2 Details",
      "placeholder": "12 lbs, 65 lbs, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "age_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "age_2",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Age",
      "input_type": "text",
      "order": 20,
      "block": "Animal 2 Details",
      "placeholder": "2 years, 8 months, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "gender_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "gender_2",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Gender",
      "input_type": "text",
      "order": 21,
      "block": "Animal 2 Details",
      "placeholder": "Male, Female",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "spayed/nuetered_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "spa/nue_2",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_2_spayed_yes",
            "pdfAttribute": "animal_2_spayed_yes"
          },
          {
            "fromDatabase": "animal_2_spayed_no",
            "pdfAttribute": "animal_2_spayed_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Spayed/Neutered?",
      "input_type": "checkbox",
      "order": 22,
      "block": "Animal 2 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_2_spayed_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_2_spayed_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "rabies_shot_current_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "rabies_2",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_2_rabies_yes",
            "pdfAttribute": "animal_2_rabies_yes"
          },
          {
            "fromDatabase": "animal_2_rabies_no",
            "pdfAttribute": "animal_2_rabies_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Current Rabies Vaccination?",
      "input_type": "checkbox",
      "order": 23,
      "block": "Animal 2 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_2_rabies_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_2_rabies_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "assistance_animal_2",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "assist_2",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_2_assistance_yes",
            "pdfAttribute": "animal_2_assistance_yes"
          },
          {
            "fromDatabase": "animal_2_assistance_no",
            "pdfAttribute": "animal_2_assistance_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Service/Assistance Animal?",
      "input_type": "checkbox",
      "order": 24,
      "block": "Animal 2 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "2"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_2_assistance_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_2_assistance_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "type_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "type_3",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Animal Type",
      "input_type": "text",
      "order": 25,
      "block": "Animal 3 Details",
      "block_style": {
        "title": "Third Animal Information",
        "description": "Complete details for your third animal",
        "icon": "Users",
        "color_theme": "green"
      },
      "placeholder": "e.g., Bird, Rabbit, Fish",
      "width": 5,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      },
      "breakBefore": true
    }
  },
  {
    "unique_id": "breed_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "breed_3",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Breed",
      "input_type": "text",
      "order": 26,
      "block": "Animal 3 Details",
      "placeholder": "Parakeet, Holland Lop, etc.",
      "width": 7,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "name_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "name_3",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Animal's Name",
      "input_type": "text",
      "order": 27,
      "block": "Animal 3 Details",
      "placeholder": "Charlie, Bella, etc.",
      "width": 8,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "color_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "color_3",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Color",
      "input_type": "text",
      "order": 28,
      "block": "Animal 3 Details",
      "placeholder": "Blue, White & Brown, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "weight_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "weight_3",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Weight",
      "input_type": "text",
      "order": 29,
      "block": "Animal 3 Details",
      "placeholder": "2 lbs, 1 oz, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "age_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "age_3",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Age",
      "input_type": "text",
      "order": 30,
      "block": "Animal 3 Details",
      "placeholder": "1 year, 6 months, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "gender_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "gender_3",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Gender",
      "input_type": "text",
      "order": 31,
      "block": "Animal 3 Details",
      "placeholder": "Male, Female, N/A",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "spayed/nuetered_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "spa/nue_3",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_3_spayed_yes",
            "pdfAttribute": "animal_3_spayed_yes"
          },
          {
            "fromDatabase": "animal_3_spayed_no",
            "pdfAttribute": "animal_3_spayed_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Spayed/Neutered?",
      "input_type": "checkbox",
      "order": 32,
      "block": "Animal 3 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_3_spayed_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_3_spayed_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "rabies_shot_current_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "rabies_3",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_3_rabies_yes",
            "pdfAttribute": "animal_3_rabies_yes"
          },
          {
            "fromDatabase": "animal_3_rabies_no",
            "pdfAttribute": "animal_3_rabies_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Current Rabies Vaccination?",
      "input_type": "checkbox",
      "order": 33,
      "block": "Animal 3 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_3_rabies_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_3_rabies_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "assistance_animal_3",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "assist_3",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_3_assistance_yes",
            "pdfAttribute": "animal_3_assistance_yes"
          },
          {
            "fromDatabase": "animal_3_assistance_no",
            "pdfAttribute": "animal_3_assistance_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Service/Assistance Animal?",
      "input_type": "checkbox",
      "order": 34,
      "block": "Animal 3 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "3"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_3_assistance_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_3_assistance_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "type_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "type_4",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Animal Type",
      "input_type": "text",
      "order": 35,
      "block": "Animal 4 Details",
      "block_style": {
        "title": "Fourth Animal Information",
        "description": "Complete details for your fourth animal",
        "icon": "Users",
        "color_theme": "green"
      },
      "placeholder": "e.g., Reptile, Hamster, Guinea Pig",
      "width": 5,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      },
      "breakBefore": true
    }
  },
  {
    "unique_id": "breed_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "breed_4",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Breed",
      "input_type": "text",
      "order": 36,
      "block": "Animal 4 Details",
      "placeholder": "Bearded Dragon, Syrian, etc.",
      "width": 7,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "name_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "name_4",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Animal's Name",
      "input_type": "text",
      "order": 37,
      "block": "Animal 4 Details",
      "placeholder": "Spike, Ginger, etc.",
      "width": 8,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "color_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "color_4",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Color",
      "input_type": "text",
      "order": 38,
      "block": "Animal 4 Details",
      "placeholder": "Orange, Black stripes, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "weight_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "weight_4",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Weight",
      "input_type": "text",
      "order": 39,
      "block": "Animal 4 Details",
      "placeholder": "1 lb, 5 oz, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "age_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "age_4",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Age",
      "input_type": "text",
      "order": 40,
      "block": "Animal 4 Details",
      "placeholder": "3 months, 2 years, etc.",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "gender_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "gender_4",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Gender",
      "input_type": "text",
      "order": 41,
      "block": "Animal 4 Details",
      "placeholder": "Male, Female, N/A",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      }
    }
  },
  {
    "unique_id": "spayed/nuetered_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "spa/nue_4",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_4_spayed_yes",
            "pdfAttribute": "animal_4_spayed_yes"
          },
          {
            "fromDatabase": "animal_4_spayed_no",
            "pdfAttribute": "animal_4_spayed_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Spayed/Neutered?",
      "input_type": "checkbox",
      "order": 42,
      "block": "Animal 4 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_4_spayed_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_4_spayed_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "rabies_shot_current_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "rabies_4",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_4_rabies_yes",
            "pdfAttribute": "animal_4_rabies_yes"
          },
          {
            "fromDatabase": "animal_4_rabies_no",
            "pdfAttribute": "animal_4_rabies_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Current Rabies Vaccination?",
      "input_type": "checkbox",
      "order": 43,
      "block": "Animal 4 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_4_rabies_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_4_rabies_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "assistance_animal_4",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "assist_4",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "animal_4_assistance_yes",
            "pdfAttribute": "animal_4_assistance_yes"
          },
          {
            "fromDatabase": "animal_4_assistance_no",
            "pdfAttribute": "animal_4_assistance_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Service/Assistance Animal?",
      "input_type": "checkbox",
      "order": 44,
      "block": "Animal 4 Details",
      "width": 4,
      "isRequired": true,
      "visibleIf": [
        {
          "unique_id": "number_of_animals_question",
          "operation": ">=",
          "valueChecked": "4"
        }
      ],
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "animal_4_assistance_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "animal_4_assistance_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "pay_animal_deposit_checkbox",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "pay_animal_deposit_checkbox",
        "linked_form_fields_text": [],
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "pay_animal_deposit_checkbox",
            "pdfAttribute": "pay_animal_deposit_checkbox"
          },
          {
            "fromDatabase": "animal_fee_checkbox",
            "pdfAttribute": "animal_fee_checkbox"
          },
          {
            "fromDatabase": "one_time_animal_fee_checkbox",
            "pdfAttribute": "one_time_animal_fee_checkbox"
          }
        ]
      }
    ],
    "display_attributes": {
      "input_type": "checkbox",
      "checkbox_options": {
        "options": [
          {
            "display_name": "Is an animal deposit required?",
            "databaseStored": "pay_animal_deposit_checkbox",
            "linkedFields": [
              "animal_deposit_amount",
              "animal_deposit_date"
            ]
          },
          {
            "display_name": "Is a monthly animal fee required?",
            "databaseStored": "animal_fee_checkbox",
            "linkedFields": [
              "monthly_animal_fee_amount"
            ]
          },
          {
            "display_name": "Is a one-time animal fee required?",
            "databaseStored": "one_time_animal_fee_checkbox",
            "linkedFields": [
              "one_time_animal_fee_amount",
              "animal_fee_before_date"
            ]
          }
        ],
        "maxSelected": 3
      },
      "order": 45,
      "block": "Fees and Deposits",
      "block_style": {
        "title": "Animal-Related Fees and Deposits",
        "description": "Financial obligations associated with keeping animals on the property. Choose up to 3 options.",
        "icon": "CreditCard",
        "color_theme": "purple"
      },
      "width": 12,
      "value": {
        "type": "manual"
      },
      "breakBefore": true
    }
  },
  {
    "unique_id": "animal_deposit_amount",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "animal_deposit_amount",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Animal Deposit Amount",
      "description": "Total amount of the refundable animal deposit",
      "input_type": "text",
      "order": 46,
      "block": "Fees and Deposits",
      "placeholder": "$500.00",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "visibleIf": [
        {
          "unique_id": "pay_animal_deposit_checkbox",
          "operation": "contains",
          "valueChecked": "pay_animal_deposit_checkbox"
        }
      ],
      "isRequired": true
    }
  },
  {
    "unique_id": "animal_deposit_date",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "animal_deposit_date"
      }
    ],
    "display_attributes": {
      "display_name": "Deposit Due Date",
      "description": "The Animal Deposit must be paid before this date",
      "input_type": "text",
      "special_input": {
        "text": {
          "date": true
        }
      },
      "order": 47,
      "block": "Fees and Deposits",
      "placeholder": "MM/DD/YYYY",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "visibleIf": [
        {
          "unique_id": "pay_animal_deposit_checkbox",
          "operation": "contains",
          "valueChecked": "pay_animal_deposit_checkbox"
        }
      ],
      "isRequired": true
    }
  },
  {
    "unique_id": "monthly_animal_fee_amount",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "monthly_animal_fee_amount"
      }
    ],
    "display_attributes": {
      "display_name": "Monthly Fee Amount",
      "description": "The tenant will have to pay this animal fee each month, which is due concurrently with the rent",
      "input_type": "text",
      "order": 48,
      "block": "Fees and Deposits",
      "placeholder": "$25.00",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "visibleIf": [
        {
          "unique_id": "pay_animal_deposit_checkbox",
          "operation": "contains",
          "valueChecked": "animal_fee_checkbox"
        }
      ],
      "isRequired": true
    }
  },
  {
    "unique_id": "one_time_animal_fee_amount",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "one_time_animal_fee_amount"
      }
    ],
    "display_attributes": {
      "display_name": "One-Time Fee Amount",
      "description": "Tenant will have to pay this non-refundable fee once",
      "input_type": "text",
      "order": 49,
      "block": "Fees and Deposits",
      "placeholder": "150.00",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "visibleIf": [
        {
          "unique_id": "pay_animal_deposit_checkbox",
          "operation": "contains",
          "valueChecked": "one_time_animal_fee_checkbox"
        }
      ],
      "isRequired": true
    }
  },
  {
    "unique_id": "animal_fee_before_date",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "animal_fee_before_date",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Fee Payment Due Date",
      "description": "The tenant must pay the non-refundable fee on or before this date",
      "input_type": "text",
      "special_input": {
        "text": {
          "date": true
        }
      },
      "order": 50,
      "block": "Fees and Deposits",
      "placeholder": "MM/DD/YYYY",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "visibleIf": [
        {
          "unique_id": "pay_animal_deposit_checkbox",
          "operation": "contains",
          "valueChecked": "one_time_animal_fee_checkbox"
        }
      ],
      "isRequired": true
    }
  },
  {
    "unique_id": "bit_or_injured_person",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "bit_or_injured_person",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "bit_or_injured_yes",
            "pdfAttribute": "bit_or_injured_yes"
          },
          {
            "fromDatabase": "bit_or_injured_no",
            "pdfAttribute": "bit_or_injured_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Has Any Animal Previously Bitten or Injured Someone?",
      "input_type": "checkbox",
      "order": 51,
      "block": "Animal Behavior History",
      "block_style": {
        "title": "Animal Behavior and Safety History",
        "description": "Required disclosure about animal behavior and past incidents",
        "icon": "AlertCircle",
        "color_theme": "orange"
      },
      "width": 12,
      "isRequired": true,
      "value": {
        "type": "manual"
      },
      "breakBefore": true,
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "bit_or_injured_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "bit_or_injured_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "explain_bite_or_injury",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "explain_bite_or_injury",
        "linked_form_fields_text": [
          "explain_bite_or_injury",
          "explain_bite_or_injury_continued",
          "explain_bite_or_injury_continued_further"
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Explain the Incident",
      "description": "Provide detailed explanation of any biting or injury incident (circumstances, date, outcome, etc.)",
      "input_type": "text-area",
      "order": 52,
      "block": "Animal Behavior History",
      "placeholder": "Please provide full details about the incident, including date, circumstances, and any follow-up actions taken...",
      "width": 12,
      "value": {
        "type": "manual"
      },
      "visibleIf": [
        {
          "unique_id": "bit_or_injured_person",
          "operation": "==",
          "valueChecked": "Yes"
        }
      ]
    }
  },
  {
    "unique_id": "predisposition_to_bite_or_injure",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "predisposition_to_bite_or_injure",
        "linked_form_fields_checkbox": [
          {
            "fromDatabase": "predisposition_to_bite_or_injure_yes",
            "pdfAttribute": "predisposition_to_bite_or_injure_yes"
          },
          {
            "fromDatabase": "predisposition_to_bite_or_injure_no",
            "pdfAttribute": "predisposition_to_bite_or_injure_no"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Does Any Animal Have a Predisposition to Bite or Injure?",
      "description": "Disclose if any animal shows aggressive tendencies or has behavioral issues that could lead to biting or injury",
      "input_type": "checkbox",
      "order": 53,
      "block": "Animal Behavior History",
      "width": 12,
      "isRequired": true,
      "value": {
        "type": "manual"
      },
      "checkbox_options": {
        "options": [
          {
            "display_name": "Yes",
            "databaseStored": "predisposition_to_bite_or_injure_yes"
          },
          {
            "display_name": "No",
            "databaseStored": "predisposition_to_bite_or_injure_no"
          }
        ]
      }
    }
  },
  {
    "unique_id": "explain_predisposition_to_bite_or_injure",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "explain_predisposition_to_bite_or_injure",
        "linked_form_fields_text": [
          "explain_predisposition_to_bite_or_injure",
          "explain_predisposition_to_bite_or_injure_continued",
          "explain_predisposition_to_bite_or_injure_continued_further"
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Explain Behavioral Concerns",
      "description": "Describe any aggressive behavior, triggers, or circumstances that may lead to biting or injury",
      "input_type": "text-area",
      "order": 54,
      "block": "Animal Behavior History",
      "placeholder": "Please describe any behavioral issues, triggers, training being undertaken, or other relevant information...",
      "width": 12,
      "value": {
        "type": "manual"
      },
      "visibleIf": [
        {
          "unique_id": "predisposition_to_bite_or_injure",
          "operation": "==",
          "valueChecked": "Yes_2"
        }
      ]
    }
  },
  {
    "unique_id": "special_provisions",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "special_provisions"
      }
    ],
    "display_attributes": {
      "display_name": "Special Provisions",
      "description": "Any special provisions that are not covered in this agreement",
      "order": 55,
      "input_type": "text-area",
      "block": "Special Provisions",
      "block_style": {
        "title": "Special Provisions",
        "icon": "AlertCircle",
        "color_theme": "blue"
      },
      "value": {
        "type": "manual"
      },
      "width": 12,
      "isRequired": false,
    }
  },
  {
    "unique_id": "field_1754344868265_wh269s2or",
    "display_attributes": {
      "display_name": "More Than Two Landlords, More Than Four Tenants, or More Than One Landlord Representative",
      "input_type": "info",
      "order": 56,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "block": "Signatures & Initials",
      "description": "If there are more than two landlords, more than four tenants, or more than one landlord representative participating in this agreement, you will have to click \"Convert to Custom Form\" in order to manually add the extra individuals to the agreement. "
    }
  },
  {
    "unique_id": "landlord1_signatures",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord1_signature",
        "linked_dates": [
          {
            "dateFieldName": "landlord1_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Landlord 1 Signature",
      "input_type": "signature",
      "order": 57,
      "block": "Signatures & Initials",
      "block_style": {
        "title": "All Signatures & Initials",
        "description": "Required signatures and initials for all parties",
        "icon": "FileText",
        "color_theme": "gray"
      },
      "special_input": {
        "signature": {
          "type": "signature",
        }
      },
      attribute: {
        "key": "landlord_1",
        "operation": (email) => email,
        "reverseOperation": (email) => email
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
                "columnName": "party_role",
                "hardCodedValue": "landlord"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "1"
              }
            ]
          }
        ]
        
      },
      "breakBefore": true
      
    }
  },
  {
    "unique_id": "landlord1_signature_date",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord1_signature_date"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord/Owner 1 Signature Date",
      "input_type": "text",
      "order": 58,
      "block": "Signatures & Initials",
      "value": {
        "type": "manual"
      },
      "isHidden": true
    }
  },
  {
    "unique_id": "landlord2_signatures",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord2_signature",
        "linked_dates": [
          {
            "dateFieldName": "landlord2_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Landlord 2 Signature",
      "input_type": "signature",
      "order": 59,
      "block": "Signatures & Initials",
      "special_input": {
        "signature": {
          "type": "signature",
        },
        
      },
      attribute: {
        "key": "landlord_2",
        "operation": (email) => email,
        "reverseOperation": (email) => email
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
                "columnName": "party_role",
                "hardCodedValue": "landlord"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "2"
              }
            ]
          }
        ]
      }
    }
  },
  {
    "unique_id": "landlord2_signature_date",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord2_signature_date"
      }
    ],
    "display_attributes": {
      "display_name": "Landlord/Owner 2 Signature Date",
      "input_type": "text",
      "order": 60,
      "block": "Signatures & Initials",
      "value": {
        "type": "manual"
      },
      "isHidden": true
    }
  },
  {
    "unique_id": "tenant1_signatures",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant1_signature",
        "linked_dates": [
          {
            "dateFieldName": "tenant1_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 1 Signature",
      "input_type": "signature",
      "order": 61,
      "block": "Signatures & Initials",
      "special_input": {
        "signature": {
          "type": "signature",
        }
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
                "columnName": "party_role",
                "hardCodedValue": "tenant"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "1"
              }
            ]
          }
        ]
      },
      attribute: {
        "key": "tenant_1",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      },
      "isRequired": true
    }
  },
  {
    "unique_id": "tenant1_signature_date",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant1_signature_date"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 1 Signature Date",
      "input_type": "text",
      "order": 62,
      "block": "Signatures & Initials",
      "value": {
        "type": "manual"
      },
      "isHidden": true
    }
  },
  {
    "unique_id": "tenant2_signatures",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant2_signature",
        "linked_dates": [
          {
            "dateFieldName": "tenant2_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 2 Signature",
      "input_type": "signature",
      "order": 63,
      "block": "Signatures & Initials",
      "special_input": {
        "signature": {
          "type": "signature",
        }
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
                "columnName": "party_role",
                "hardCodedValue": "tenant"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "2"
              }
            ]
          }
        ]
      },
      attribute: {
        "key": "tenant_2",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      }
    }
  },
  {
    "unique_id": "tenant2_signature_date",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant2_signature_date"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 2 Signature Date",
      "input_type": "text",
      "order": 64,
      "block": "Signatures & Initials",
      "value": {
        "type": "manual"
      },
      "isHidden": true
    }
  },
  {
    "unique_id": "tenant3_signatures",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant3_signature",
        "linked_dates": [
          {
            "dateFieldName": "tenant3_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 3 Signature",
      "input_type": "signature",
      "order": 65,
      "block": "Signatures & Initials",
      "special_input": {
        "signature": {
          "type": "signature",
        }
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
                "columnName": "party_role",
                "hardCodedValue": "tenant"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "3"
              }
            ]
          }
        ]
      },
      attribute: {
        "key": "tenant_3",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      }
    }
  },
  {
    "unique_id": "tenant3_signature_date",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant3_signature_date"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 3 Signature Date",
      "input_type": "text",
      "order": 66,
      "block": "Signatures & Initials",
      "value": {
        "type": "manual"
      },
      "isHidden": true
    }
  },
  {
    "unique_id": "tenant4_signatures",
    
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant4_signature",
        "linked_dates": [
          {
            "dateFieldName": "tenant4_signature_date"
          }
        ]
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 4 Signature",
      "input_type": "signature",
      "order": 67,
      "block": "Signatures & Initials",
      "special_input": {
        "signature": {
          "type": "signature",
        }
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
                "columnName": "party_role",
                "hardCodedValue": "tenant"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "4"
              }
            ]
          }
        ]
      },
      attribute: {
        "key": "tenant_4",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      }
    }
  },
  {
    "unique_id": "tenant4_signature_date",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant4_signature_date"
      }
    ],
    "display_attributes": {
      "display_name": "Tenant 4 Signature Date",
      "input_type": "text",
      "order": 68,
      "block": "Signatures & Initials",
      "value": {
        "type": "manual"
      },
      "isHidden": true
    }
  },
  {
    "unique_id": "field_1754344269315_0smp6pvmu",
    "display_attributes": {
      "input_type": "info",
      "order": 69,
      "width": 12,
      "value": {
        "type": "manual"
      },
      "display_name": "Only fill out the below information if a landlord is using a representative to sign this agreement for them.",
      "block": "Power of Attorney Info and Signature",
      "description": "If the landlord is using a representative to sign on their behalf, do not fill out the landlord/owner signatures and initials section for that landlord."
    }
  },
  {
    "unique_id": "form_filler_printed_name",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "form_filler_printed_name",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Power of Attorney Printed Name",
      "input_type": "text",
      "order": 70,
      "block": "Power of Attorney Info and Signature",
      "width": 6,
      "value": {
        "type": "resolved",
        "reserved": "realtor_name_spaced"
      },
    }
  },
  {
    "unique_id": "form_filler_firm_name",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "form_filler_firm_name",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Power of Attorney Firm Name",
      "input_type": "text",
      "order": 71,
      "block": "Power of Attorney Info and Signature",
      "width": 6,
      "value": {
        "type": "manual"
      },
    }
  },
  {
    "unique_id": "form_filler_signature",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "form_filler_signature",
        "linked_form_fields_text": []
      }
    ],
    "display_attributes": {
      "display_name": "Written property management/power of attorney signature",
      "input_type": "signature",
      "order": 72,
      "block": "Power of Attorney Info and Signature",
      "width": 12,
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
                "columnName": "party_role",
                "hardCodedValue": "landlord_agent"
              },
              {
                "columnName": "partyNumber",
                "hardCodedValue": "1"
              }
            ]
          }
        ]
      },
      "isCached": true
    }
  },
  {
    "unique_id": "landlord_1_initials",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord1_initial1"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord1_initial2"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord1_initial3"
      },
    ],
    "display_attributes": {
      "display_name": "Landlord 1 Initials",
      "input_type": "signature",
      "order": 73,
      "block": "Power of Attorney Info and Signature",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isHidden": true,
      "special_input": {
        "signature": {
          "type": "initials",
        }
      },
      attribute: {
        "key": "landlord_1",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      }
    }
  },
  {
    "unique_id": "landlord_2_initials",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord2_initial1"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord2_initial2"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "landlord2_initial3"
      },
    ],
    "display_attributes": {
      "display_name": "Landlord 2 Initials",
      "input_type": "signature",
      "order": 73,
      "block": "Power of Attorney Info and Signature",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isHidden": true,
      "special_input": {
        "signature": {
          "type": "initials",
        }
      },
      attribute: {
        "key": "landlord_2",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      }
    }
  },
  {
    "unique_id": "tenant_1_initials",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant1_initial1"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant1_initial2"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant1_initial3"
      },
    ],
    "display_attributes": {
      "display_name": "Tenant 1 Initial 1",
      "input_type": "signature",
      "order": 73,
      "block": "Power of Attorney Info and Signature",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isHidden": true,
      "special_input": {
        "signature": {
          "type": "initials",
        }
      },
      attribute: {
        "key": "tenant_1",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      }
    }
  },
  {
    "unique_id": "tenant_2_initials",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant2_initial1"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant2_initial2"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant2_initial3"
      },
    ],
    "display_attributes": {
      "display_name": "Tenant 2 Initial 1",
      "input_type": "signature",
      "order": 73,
      "block": "Power of Attorney Info and Signature",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isHidden": true,
      "special_input": {
        "signature": {
          "type": "initials",
        }
      },
      attribute: {
        "key": "tenant_2",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      }
    }
  },
  {
    "unique_id": "tenant_3_initials",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant3_initial1"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant3_initial2"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant3_initial3"
      },
    ],
    "display_attributes": {
      "display_name": "Tenant 3 Initial 1",
      "input_type": "signature",
      "order": 73,
      "block": "Power of Attorney Info and Signature",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isHidden": true,
      "special_input": {
        "signature": {
          "type": "initials",
        }
      },
      attribute: {
        "key": "tenant_3",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      }
    }
  },
  {
    "unique_id": "tenant_4_initials",
    "pdf_attributes": [
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant4_initial1"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant4_initial2"
      },
      {
        "formType": "Animal_Agreement",
        "formfield": "tenant4_initial3"
      },
    ],
    "display_attributes": {
      "display_name": "Tenant 4 Initial 1",
      "input_type": "signature",
      "order": 73,
      "block": "Power of Attorney Info and Signature",
      "width": 6,
      "value": {
        "type": "manual"
      },
      "isHidden": true,
      "special_input": {
        "signature": {
          "type": "initials",
        }
      },
      attribute: {
        "key": "tenant_4",
        "operation": (email) => email,
        "reverseOperation": (email) => email
      }
    }
  },
];