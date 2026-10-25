import { Schema } from "../../../../types/realtor";

export const residentialLeaseLightningSchema: Schema = [
    {
        unique_id: "lease_start_date",
        pdf_attributes: [
            {
                formType: "residential_lease",
                formfield: "lease_start_date"
            }
        ],
        display_attributes: {
            placeholder: "MM/DD/YYYY",
            display_name: "Lease Start Date",
            description: "Date when the lease term begins and tenant may take possession",
            order: 1,
            input_type: "text",
            validation: {
                loopback: [
                    {
                        regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
                        message: "Must be a valid date (MM/DD/YYYY)"
                    }
                ]
            },
            value: {
                type: "manual"
            },
            block: "Lease Terms",
            width: 6,
            isRequired: true,
            special_input: {
                text: {
                    date: true
                }
            }
        }
    },
    {
        unique_id: "lease_end_date",
        
        pdf_attributes: [
            {
                formType: "residential_lease",
                formfield: "lease_end_date"
            }
        ],
        display_attributes: {
            placeholder: "MM/DD/YYYY",
            display_name: "Lease End Date",
            description: "Date when the lease term expires and tenant must vacate",
            order: 2,
            input_type: "text",
            block: "Lease Terms",
            validation: {
                loopback: [
                    {
                        regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
                        message: "Must be a valid date (MM/DD/YYYY)"
                    }
                ]
            },
            value: {
                type: "manual"
            },
            width: 6,
            isRequired: true,
            special_input: {
                text: {
                    date: true
                }
            }
        }
    },
    {
        unique_id: "monthly_rent_amount",
        
        pdf_attributes: [
            {
                formType: "residential_lease",
                formfield: "monthly_rent_amount"
            }
        ],
        display_attributes: {
            placeholder: "2,500.00",
            display_name: "Monthly Rent Amount",
            order: 3,
            input_type: "text",
            block: "Financial",
            validation: {
                loopback: [
                    {
                        regex: "^[\\d.,$]+$",
                        message: "Must be a valid monetary amount"
                    }
                ]
            },
            value: {
                type: "manual"
            },
            width: 6,
            isRequired: true
        }
    },
    {
        unique_id: "security_deposit_amount",
        pdf_attributes: [
            {
                formType: "residential_lease",
                formfield: "security_deposit_amount"
            }
        ],
        display_attributes: {
            placeholder: "2,500.00",
            display_name: "Security Deposit Amount",
            order: 4,
            input_type: "text",
            block: "Financial",

            validation: {
                loopback: [
                    {
                        regex: "^[\\d.,$]+$",
                        message: "Must be a valid monetary amount"
                    }
                ]
            },
            value: {
                type: "manual"
            },
            width: 6,
            isRequired: true
        }
    },
    {
        unique_id: "first_month_rent_due_date",
        pdf_attributes: [
            {
                formType: "residential_lease",
                formfield: "first_month_rent_due_date"
            }
        ],
        display_attributes: {
            placeholder: "MM/DD/YYYY",
            display_name: "First Month Rent Due Date",
            description: "Due date for first month's rent",
            order: 5,
            input_type: "text",
            block: "Financial",

            validation: {
                loopback: [
                    {
                        regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
                        message: "Must be a valid date (MM/DD/YYYY)"
                    }
                ]
            },
            value: {
                type: "manual"
            },
            width: 6,
            isRequired: true,
            special_input: {
                text: {
                    date: true
                }
            }
        }
    },
    {
        unique_id: "prorated_rent_amount",
        pdf_attributes: [
            {
                formType: "residential_lease",
                formfield: "prorated_rent_amount"
            }
        ],
        display_attributes: {
            placeholder: "500.00",
            display_name: "Prorated Rent Amount",
            description: "Rent amount for partial month of occupancy",
            order: 6,
            input_type: "text",
            block: "Financial",

            validation: {
                loopback: [
                    {
                        regex: "^[\\d.,$]+$",
                        message: "Must be a valid monetary amount"
                    }
                ]
            },
            value: {
                type: "manual"
            },
            width: 6,
            isRequired: false
        }
    },
    {
        unique_id: "prorated_rent_due_date",
        pdf_attributes: [
            {
                formType: "residential_lease",
                formfield: "prorated_rent_due_date"
            }
        ],
        display_attributes: {
            placeholder: "MM/DD/YYYY",
            display_name: "Prorated Rent Due Date",
            order: 7,
            input_type: "text",
            block: "Financial",

            validation: {
                loopback: [
                    {
                        regex: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/]\\d{4}$",
                        message: "Must be a valid date (MM/DD/YYYY)"
                    }
                ]
            },
            value: {
                type: "manual"
            },
            width: 6,
            isRequired: false,
            special_input: {
                text: {
                    date: true
                }
            }
        }
    },
    {
        unique_id: "landlord_paid_utilities",
        pdf_attributes: [
            {
                formType: "residential_lease",
                formfield: "landlord_paid_utilities",
                linked_form_fields_text: [
                    "landlord_paid_utilities",
                    "landlord_paid_utilities_cont",
                    "landlord_paid_utilities_cont_2"
                ]
            }
        ],
        display_attributes: {
            placeholder: "Electric, gas, water, trash, etc.",
            display_name: "Utilities Landlord is to Pay",
            order: 8,
            input_type: "text-area",
            block: "Property Details",

            value: {
                type: "manual"
            },
            width: 12,
            isRequired: false
        }
    },
    {
        unique_id: "special_provisions",
        pdf_attributes: [
            {
                formType: "residential_lease",
                formfield: "special_provisions"
            }
        ],
        display_attributes: {
            placeholder: "Any special provisions or agreements",
            display_name: "Special Provisions",
            description: "Special provisions are customized clauses added to address specific concerns",
            order: 9,
            input_type: "text-area",
            block: "Additional",
            value: {
                type: "manual"
            },
            width: 12,
            isRequired: false
        }
    }
];