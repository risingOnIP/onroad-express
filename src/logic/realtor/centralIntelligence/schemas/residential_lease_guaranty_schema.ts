// Auto-generated schema for Residential Lease Guaranty
// Generated from: Residential_Lease_Guaranty_-_524_ts96806_unlocked.pdf

export interface ResidentialLeaseGuarantySchema {
  // Page 1 - Guaranty Agreement
  lease_information: {
    landlords: string;  // Line for landlord names
    tenants: string;    // Line for tenant names
    property_address: string;  // Property being leased
    commencement_date: string;  // Lease start date
    expiration_date: string;    // Lease end date
    monthly_rent: number;       // Monthly rent amount
  };
  
  guaranty_renewal: {
    last_renewal_date: string;  // Last date for lease renewal that extends guarantor obligation
  };
  
  guarantor_application_consent: {
    submit_application: boolean;  // Whether guarantors will submit application (checkbox)
  };
  
  special_provisions: string;  // Additional terms or conditions
  
  guarantor_signatures: {
    guarantor_1: {
      signature: string;
      date: string;
      printed_name: string;
    };
    guarantor_2: {
      signature: string;
      date: string;
      printed_name: string;
    };
  };
  
  // Page 2 - Application for Guarantor
  application_lease_info: {
    landlords: string;      // Should match page 1
    tenants: string;        // Should match page 1
    property_address: string;  // Should match page 1
    commencement_date: string; // Should match page 1
    expiration_date: string;   // Should match page 1
    monthly_rent: number;      // Should match page 1
  };
  
  guarantor_1_info: {
    name: string;              // As listed on proof of identification
    address: string;           // Current address
    email: string;
    phone: string;
    alternate_phone: string;
    social_security_number: string;
    drivers_license_number: string;
    drivers_license_state: string;
    date_of_birth: string;
    relationship_to_tenant: string;
    marital_status: string;
    citizenship_country: string;
    
    employment: {
      employer_name: string;
      employer_address: string;
      supervisor_name: string;
      supervisor_phone: string;
      supervisor_fax: string;
      start_date: string;
      gross_monthly_income: number;
      position: string;
    };
  };
  
  guarantor_2_info: {
    name: string;              // As listed on proof of identification
    address: string;           // Current address
    email: string;
    phone: string;
    alternate_phone: string;
    social_security_number: string;
    drivers_license_number: string;
    drivers_license_state: string;
    date_of_birth: string;
    relationship_to_tenant: string;
    marital_status: string;
    citizenship_country: string;
    
    employment: {
      employer_name: string;
      employer_address: string;
      supervisor_name: string;
      supervisor_phone: string;
      supervisor_fax: string;
      start_date: string;
      gross_monthly_income: number;
      position: string;
    };
  };
  
  application_fees: {
    guarantor_1_fee: number;  // Non-refundable processing fee
    guarantor_2_fee: number;  // Non-refundable processing fee
  };
  
  authorization_signatures: {
    guarantor_1: {
      signature: string;
      date: string;
    };
    guarantor_2: {
      signature: string;
      date: string;
    };
  };
}

// Field mapping with unique identifiers based on context
export const ResidentialLeaseGuarantyFieldMapping = {
  // Page 1 - Guaranty Agreement
  "lease_landlords": {
    unique_id: "lease_information.landlords",
    description: "Name(s) of landlord(s) for the lease",
    page: 1,
    section: "A"
  },
  "lease_tenants": {
    unique_id: "lease_information.tenants",
    description: "Name(s) of tenant(s) on the lease",
    page: 1,
    section: "A"
  },
  "lease_property": {
    unique_id: "lease_information.property_address",
    description: "Address of the property being leased",
    page: 1,
    section: "A"
  },
  "lease_commencement_date": {
    unique_id: "lease_information.commencement_date",
    description: "Date the lease begins",
    page: 1,
    section: "A"
  },
  "lease_expiration_date": {
    unique_id: "lease_information.expiration_date",
    description: "Date the lease expires",
    page: 1,
    section: "A"
  },
  "lease_monthly_rent": {
    unique_id: "lease_information.monthly_rent",
    description: "Monthly rental amount",
    page: 1,
    section: "A"
  },
  "guaranty_last_renewal_date": {
    unique_id: "guaranty_renewal.last_renewal_date",
    description: "Last date on which lease renewal will extend guarantor's obligation",
    page: 1,
    section: "C"
  },
  "submit_application_checkbox": {
    unique_id: "guarantor_application_consent.submit_application",
    description: "Whether guarantors will submit application for creditworthiness verification",
    page: 1,
    section: "F"
  },
  "special_provisions": {
    unique_id: "special_provisions",
    description: "Additional terms, conditions, or agreements",
    page: 1,
    section: "G"
  },
  "guarantor_1_signature": {
    unique_id: "guarantor_signatures.guarantor_1.signature",
    description: "First guarantor's signature",
    page: 1
  },
  "guarantor_1_signature_date": {
    unique_id: "guarantor_signatures.guarantor_1.date",
    description: "Date of first guarantor's signature",
    page: 1
  },
  "guarantor_1_printed_name": {
    unique_id: "guarantor_signatures.guarantor_1.printed_name",
    description: "First guarantor's printed name",
    page: 1
  },
  "guarantor_2_signature": {
    unique_id: "guarantor_signatures.guarantor_2.signature",
    description: "Second guarantor's signature",
    page: 1
  },
  "guarantor_2_signature_date": {
    unique_id: "guarantor_signatures.guarantor_2.date",
    description: "Date of second guarantor's signature",
    page: 1
  },
  "guarantor_2_printed_name": {
    unique_id: "guarantor_signatures.guarantor_2.printed_name",
    description: "Second guarantor's printed name",
    page: 1
  },
  
  // Page 2 - Application fields (repeat lease info)
  "app_lease_landlords": {
    unique_id: "application_lease_info.landlords",
    description: "Landlord names (should match page 1)",
    page: 2
  },
  "app_lease_tenants": {
    unique_id: "application_lease_info.tenants",
    description: "Tenant names (should match page 1)",
    page: 2
  },
  "app_lease_property": {
    unique_id: "application_lease_info.property_address",
    description: "Property address (should match page 1)",
    page: 2
  },
  "app_lease_commencement": {
    unique_id: "application_lease_info.commencement_date",
    description: "Lease start date (should match page 1)",
    page: 2
  },
  "app_lease_expiration": {
    unique_id: "application_lease_info.expiration_date",
    description: "Lease end date (should match page 1)",
    page: 2
  },
  "app_lease_rent": {
    unique_id: "application_lease_info.monthly_rent",
    description: "Monthly rent (should match page 1)",
    page: 2
  },
  
  // Guarantor 1 Information
  "guarantor_1_name": {
    unique_id: "guarantor_1_info.name",
    description: "First guarantor's legal name as shown on ID",
    page: 2
  },
  "guarantor_1_address": {
    unique_id: "guarantor_1_info.address",
    description: "First guarantor's current residential address",
    page: 2
  },
  "guarantor_1_email": {
    unique_id: "guarantor_1_info.email",
    description: "First guarantor's email address",
    page: 2
  },
  "guarantor_1_phone": {
    unique_id: "guarantor_1_info.phone",
    description: "First guarantor's primary phone number",
    page: 2
  },
  "guarantor_1_alternate_phone": {
    unique_id: "guarantor_1_info.alternate_phone",
    description: "First guarantor's alternate phone number",
    page: 2
  },
  "guarantor_1_ssn": {
    unique_id: "guarantor_1_info.social_security_number",
    description: "First guarantor's Social Security Number",
    page: 2
  },
  "guarantor_1_license_number": {
    unique_id: "guarantor_1_info.drivers_license_number",
    description: "First guarantor's driver's license or ID number",
    page: 2
  },
  "guarantor_1_license_state": {
    unique_id: "guarantor_1_info.drivers_license_state",
    description: "State that issued first guarantor's ID",
    page: 2
  },
  "guarantor_1_dob": {
    unique_id: "guarantor_1_info.date_of_birth",
    description: "First guarantor's date of birth",
    page: 2
  },
  "guarantor_1_relationship": {
    unique_id: "guarantor_1_info.relationship_to_tenant",
    description: "First guarantor's relationship to tenant",
    page: 2
  },
  "guarantor_1_marital_status": {
    unique_id: "guarantor_1_info.marital_status",
    description: "First guarantor's marital status",
    page: 2
  },
  "guarantor_1_citizenship": {
    unique_id: "guarantor_1_info.citizenship_country",
    description: "First guarantor's country of citizenship",
    page: 2
  },
  "guarantor_1_employer": {
    unique_id: "guarantor_1_info.employment.employer_name",
    description: "First guarantor's employer name",
    page: 2
  },
  "guarantor_1_employer_address": {
    unique_id: "guarantor_1_info.employment.employer_address",
    description: "First guarantor's employer address",
    page: 2
  },
  "guarantor_1_supervisor": {
    unique_id: "guarantor_1_info.employment.supervisor_name",
    description: "First guarantor's supervisor name",
    page: 2
  },
  "guarantor_1_supervisor_phone": {
    unique_id: "guarantor_1_info.employment.supervisor_phone",
    description: "First guarantor's supervisor phone",
    page: 2
  },
  "guarantor_1_supervisor_fax": {
    unique_id: "guarantor_1_info.employment.supervisor_fax",
    description: "First guarantor's supervisor fax",
    page: 2
  },
  "guarantor_1_employment_start": {
    unique_id: "guarantor_1_info.employment.start_date",
    description: "First guarantor's employment start date",
    page: 2
  },
  "guarantor_1_income": {
    unique_id: "guarantor_1_info.employment.gross_monthly_income",
    description: "First guarantor's gross monthly income",
    page: 2
  },
  "guarantor_1_position": {
    unique_id: "guarantor_1_info.employment.position",
    description: "First guarantor's job position/title",
    page: 2
  },
  
  // Guarantor 2 Information
  "guarantor_2_name": {
    unique_id: "guarantor_2_info.name",
    description: "Second guarantor's legal name as shown on ID",
    page: 2
  },
  "guarantor_2_address": {
    unique_id: "guarantor_2_info.address",
    description: "Second guarantor's current residential address",
    page: 2
  },
  "guarantor_2_email": {
    unique_id: "guarantor_2_info.email",
    description: "Second guarantor's email address",
    page: 2
  },
  "guarantor_2_phone": {
    unique_id: "guarantor_2_info.phone",
    description: "Second guarantor's primary phone number",
    page: 2
  },
  "guarantor_2_alternate_phone": {
    unique_id: "guarantor_2_info.alternate_phone",
    description: "Second guarantor's alternate phone number",
    page: 2
  },
  "guarantor_2_ssn": {
    unique_id: "guarantor_2_info.social_security_number",
    description: "Second guarantor's Social Security Number",
    page: 2
  },
  "guarantor_2_license_number": {
    unique_id: "guarantor_2_info.drivers_license_number",
    description: "Second guarantor's driver's license or ID number",
    page: 2
  },
  "guarantor_2_license_state": {
    unique_id: "guarantor_2_info.drivers_license_state",
    description: "State that issued second guarantor's ID",
    page: 2
  },
  "guarantor_2_dob": {
    unique_id: "guarantor_2_info.date_of_birth",
    description: "Second guarantor's date of birth",
    page: 2
  },
  "guarantor_2_relationship": {
    unique_id: "guarantor_2_info.relationship_to_tenant",
    description: "Second guarantor's relationship to tenant",
    page: 2
  },
  "guarantor_2_marital_status": {
    unique_id: "guarantor_2_info.marital_status",
    description: "Second guarantor's marital status",
    page: 2
  },
  "guarantor_2_citizenship": {
    unique_id: "guarantor_2_info.citizenship_country",
    description: "Second guarantor's country of citizenship",
    page: 2
  },
  "guarantor_2_employer": {
    unique_id: "guarantor_2_info.employment.employer_name",
    description: "Second guarantor's employer name",
    page: 2
  },
  "guarantor_2_employer_address": {
    unique_id: "guarantor_2_info.employment.employer_address",
    description: "Second guarantor's employer address",
    page: 2
  },
  "guarantor_2_supervisor": {
    unique_id: "guarantor_2_info.employment.supervisor_name",
    description: "Second guarantor's supervisor name",
    page: 2
  },
  "guarantor_2_supervisor_phone": {
    unique_id: "guarantor_2_info.employment.supervisor_phone",
    description: "Second guarantor's supervisor phone",
    page: 2
  },
  "guarantor_2_supervisor_fax": {
    unique_id: "guarantor_2_info.employment.supervisor_fax",
    description: "Second guarantor's supervisor fax",
    page: 2
  },
  "guarantor_2_employment_start": {
    unique_id: "guarantor_2_info.employment.start_date",
    description: "Second guarantor's employment start date",
    page: 2
  },
  "guarantor_2_income": {
    unique_id: "guarantor_2_info.employment.gross_monthly_income",
    description: "Second guarantor's gross monthly income",
    page: 2
  },
  "guarantor_2_position": {
    unique_id: "guarantor_2_info.employment.position",
    description: "Second guarantor's job position/title",
    page: 2
  },
  
  // Application fees
  "guarantor_1_fee": {
    unique_id: "application_fees.guarantor_1_fee",
    description: "Non-refundable processing fee for first guarantor",
    page: 2
  },
  "guarantor_2_fee": {
    unique_id: "application_fees.guarantor_2_fee",
    description: "Non-refundable processing fee for second guarantor",
    page: 2
  },
  
  // Authorization signatures
  "guarantor_1_auth_signature": {
    unique_id: "authorization_signatures.guarantor_1.signature",
    description: "First guarantor's authorization signature",
    page: 2
  },
  "guarantor_1_auth_date": {
    unique_id: "authorization_signatures.guarantor_1.date",
    description: "Date of first guarantor's authorization",
    page: 2
  },
  "guarantor_2_auth_signature": {
    unique_id: "authorization_signatures.guarantor_2.signature",
    description: "Second guarantor's authorization signature",
    page: 2
  },
  "guarantor_2_auth_date": {
    unique_id: "authorization_signatures.guarantor_2.date",
    description: "Date of second guarantor's authorization",
    page: 2
  }
};

// Type definitions for form validation
export type ResidentialLeaseGuarantyFieldValue = string | number | boolean | undefined;

export interface ResidentialLeaseGuarantyValidation {
  required_fields: (keyof ResidentialLeaseGuarantySchema)[];
  conditional_requirements?: {
    [key: string]: {
      condition: (data: ResidentialLeaseGuarantySchema) => boolean;
      required_fields: (keyof ResidentialLeaseGuarantySchema)[];
    };
  };
}