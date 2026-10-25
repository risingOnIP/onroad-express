import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middleware/auth";
import { join } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { animalAgreementFields } from "../../lib/fields/animal_agreement_fields";
import { FormFields } from "../../types/broker";
import { residentialLeaseAgreementFields } from "../../lib/fields/residential_lease_agreement_fields";
import { residentialLeaseExtensionFields } from "../../lib/fields/residential_lease_extension_fields";
import { earlyTerminationOfResidentialLeaseFields } from "../../lib/fields/early_termination_of_residential_lease";
import { residentialBuyertenantRepresentationAgreementFields } from "../../lib/fields/residential_buyertenant_representation_agreement_fields";
import { residentialExclusiveRightLeaseFields } from "../../lib/fields/residential_exclusive_right_lease_fields";

const router = Router();

export interface FormMapping {
  displayName: string;      // Human-readable form name shown in UI
  pdfFilename?: string;       // Bundled PDF in blank_files (without .pdf); TAR forms omit it and use broker uploads
  schemaKey: string;         // Key used in ALL_SCHEMAS object
  category?: string;         // Optional category for grouping
  description?: string;      // Optional description
  aliases?: string[];        // Optional alternative names for backward compatibility
  orgCreated: string;
  fields?: FormFields;
}

/**
 * Central registry of all form mappings
 * Key: form identifier used in database and API
 * Value: FormMapping object with display name and filename
 */
export const FORM_MAPPINGS: Record<string, FormMapping> = {
  'IABS': {
    displayName: 'Information About Brokerage Services',
    pdfFilename: 'IABS_Fillable',
    schemaKey: 'IABS', 
    orgCreated: 'TREC',
  },
  
  // Animal Agreement
  'Animal_Agreement': {
    displayName: 'Animal Agreement',
    schemaKey: 'Animal_Agreement',
    category: 'addendum',
    orgCreated: 'TAR',
    fields: animalAgreementFields
  },
  
  // Landlord/Tenant Forms
  'landlord_floodplain_notice': {
    displayName: 'Landlord Floodplain Notice',
    schemaKey: 'landlord_floodplain_notice',
    category: 'notice',
    orgCreated: 'TAR'
  },
  
  // Financing Forms
  'Third_party_financing': {
    displayName: 'Third Party Financing',
    pdfFilename: 'Third_party_financing_Fillable',
    schemaKey: 'Third_party_financing',
    category: 'financing',
    orgCreated: 'TREC'
  },
  
  // Residential Lease Forms
  'residential_lease_agreement': {
    displayName: 'Residential Lease Agreement',
    schemaKey: 'residential_lease_agreement',
    category: 'lease',
    orgCreated: 'TAR',
    fields: residentialLeaseAgreementFields
  },
  
  'residential_lease_extension': {
    displayName: 'Residential Lease Extension',
    schemaKey: 'residential_lease_extension',
    category: 'lease',
    orgCreated: 'TAR',
    fields: residentialLeaseExtensionFields
  },
  
  'early_termination_of_residential_lease': {
    displayName: 'Early Termination of Residential Lease',
    schemaKey: 'early_termination_of_residential_lease',
    category: 'lease',
    orgCreated: 'TAR',
    fields: earlyTerminationOfResidentialLeaseFields
  },
  
  'residential_lease_multi_family': {
    displayName: 'Residential Lease - Multi-Family',
    schemaKey: 'residential_lease_multi_family',
    category: 'lease',
    orgCreated: 'TAR'
  },
  
  // Buyer/Tenant Representation
  'residential_buyer_tenant_representation_agreement_long_form': {
    displayName: 'Residential Buyer/Tenant Representation Agreement (Long Form)',
    schemaKey: 'residential_buyer_tenant_representation_agreement_long_form',
    category: 'representation',
    orgCreated: 'TAR',
    fields: residentialBuyertenantRepresentationAgreementFields
  },
  
  // Addendums
  'addendum_hydrostatic_testing': {
    displayName: 'Addendum - Hydrostatic Testing',
    pdfFilename: 'addendum_hydrostatic_testing_Fillable',
    schemaKey: 'addendum_hydrostatic_testing',
    category: 'addendum',
    orgCreated: 'TREC'
  },
  
  'addendum_mandatory_poa_membership': {
    displayName: 'Addendum - Mandatory POA Membership',
    pdfFilename: 'addendum_mandatory_poa_membership_Fillable',
    schemaKey: 'addendum_mandatory_poa_membership',
    category: 'addendum',
    orgCreated: 'TREC'
  },
  
  'buyers_temporary_residential_lease': {
    displayName: "Buyer's Temporary Residential Lease",
    pdfFilename: "buyer's_temporary_residential_lease_Fillable",
    schemaKey: 'buyers_temporary_residential_lease',
    category: 'lease',
    orgCreated: 'TREC'
  },
  
  'residential_exclusive_right_to_lease': {
    displayName: 'Residential Real Estate Listing Agreement - Exclusive Right to Lease',
    schemaKey: 'residential_exclusive_right_to_lease',
    category: 'listing',
    orgCreated: 'TAR',
    fields: residentialExclusiveRightLeaseFields
  },
};

export function getFormMapping(identifier: string): FormMapping | undefined {
  // Direct lookup
  if (FORM_MAPPINGS[identifier]) {
    return FORM_MAPPINGS[identifier];
  }
  
  // Check aliases
  for (const [key, mapping] of Object.entries(FORM_MAPPINGS)) {
    if (mapping.aliases?.includes(identifier)) {
      return mapping;
    }
    
    // Check if identifier matches pdfFilename (with or without _Fillable)
    if (mapping.pdfFilename === identifier || 
        mapping.pdfFilename === `${identifier}_Fillable`) {
      return mapping;
    }
    
    // Check if identifier matches schemaKey
    if (mapping.schemaKey === identifier) {
      return mapping;
    }
  }
  
  return undefined;
}

export function getFormPDFFilename(formIdentifier: string): string {
  const mapping = getFormMapping(formIdentifier);
  if (!mapping) {
    // Fallback to legacy behavior for unmapped forms
    console.warn(`No mapping found for form: ${formIdentifier}, using direct filename`);
    return `${formIdentifier}_Fillable.pdf`;
  }
  return `${mapping.pdfFilename}.pdf`;
}

export function getFormSchemaKey(formIdentifier: string): string {
  const mapping = getFormMapping(formIdentifier);
  if (!mapping) {
    // Fallback to legacy behavior for unmapped forms
    console.warn(`No mapping found for form: ${formIdentifier}, using direct key`);
    return formIdentifier;
  }
  return mapping.schemaKey;
}

export function getFormDisplayName(formIdentifier: string): string {
  const mapping = getFormMapping(formIdentifier);
  if (!mapping) {
    // Fallback to legacy behavior - convert underscore to spaces and capitalize
    console.warn(`No mapping found for form: ${formIdentifier}, generating display name`);
    return formIdentifier
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return mapping.displayName;
}

export function getFormsByCategory(category: string): Array<[string, FormMapping]> {
  return Object.entries(FORM_MAPPINGS).filter(
    ([_, mapping]) => mapping.category === category
  );
}

export default router;