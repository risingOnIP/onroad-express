export interface ResidentialListingAgreementExclusiveLease {
  // Property Information (Page 1)
  property: {
    address: {
      street: string;
      unit?: string;
      city: string;
      state: string;
      zipCode: string;
      county?: string;
    };
    legalDescription?: string;
    parcelId?: string;
    subdivision?: string;
    lotBlock?: string;
  };

  // Owner/Landlord Information
  owner: {
    name: string;
    additionalOwners?: string[];
    mailingAddress?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    phone: string;
    alternatePhone?: string;
    email?: string;
    fax?: string;
  };

  // Listing Agreement Terms
  listingTerms: {
    startDate: string;
    endDate: string;
    listPrice: number;
    pricePerSquareFoot?: number;
    minimumLease?: number;
    maximumLease?: number;
  };

  // Lease Terms and Rental Information
  leaseTerms: {
    monthlyRent: number;
    securityDeposit: number;
    petDeposit?: number;
    lastMonthRent?: boolean;
    applicationFee?: number;
    leaseTerm: number; // in months
    availableDate: string;
    preferredLeaseStart?: string;
  };

  // Commission Information
  commission: {
    listingBrokerageRate: number;
    cooperatingBrokerageRate?: number;
    transactionFee?: number;
    adminFee?: number;
    commissionPaidBy: 'owner' | 'tenant' | 'split';
    commissionNotes?: string;
  };

  // Property Features (Page 2)
  propertyFeatures: {
    type: 'single_family' | 'condo' | 'townhouse' | 'apartment' | 'other';
    style?: string;
    yearBuilt?: number;
    bedrooms: number;
    bathrooms: number;
    halfBaths?: number;
    squareFootage?: number;
    lotSize?: string;
    stories?: number;
    garage?: {
      type: 'attached' | 'detached' | 'carport' | 'none';
      spaces: number;
    };
    pool?: boolean;
    spa?: boolean;
    furnished?: 'furnished' | 'partially_furnished' | 'unfurnished';
  };

  // Utilities and Services
  utilities: {
    includedInRent: {
      water: boolean;
      sewer: boolean;
      trash: boolean;
      electricity: boolean;
      gas: boolean;
      cable: boolean;
      internet: boolean;
      lawnCare: boolean;
      poolService: boolean;
      pestControl: boolean;
    };
    paidByTenant: string[];
    utilityNotes?: string;
  };

  // Appliances and Equipment
  appliances: {
    refrigerator: boolean;
    stove: boolean;
    oven: boolean;
    microwave: boolean;
    dishwasher: boolean;
    disposal: boolean;
    washer: boolean;
    dryer: boolean;
    other?: string[];
  };

  // Restrictions and Requirements (Page 3)
  restrictions: {
    pets: {
      allowed: boolean;
      restrictions?: string;
      petLimit?: number;
      weightLimit?: number;
      breeds?: string;
      deposit?: number;
      monthlyFee?: number;
    };
    smoking: boolean;
    maxOccupants: number;
    hoa?: {
      name?: string;
      fee?: number;
      frequency?: 'monthly' | 'quarterly' | 'annually';
      approvalRequired: boolean;
      restrictions?: string;
    };
  };

  // Marketing Authorization
  marketing: {
    signage: {
      yardSign: boolean;
      directionalSigns: boolean;
      signLocation?: string;
    };
    internet: {
      mls: boolean;
      brokerWebsite: boolean;
      syndication: boolean;
      socialMedia: boolean;
      virtualTour: boolean;
    };
    showings: {
      lockbox: boolean;
      keyLocation?: string;
      showingInstructions?: string;
      appointmentRequired: boolean;
      tenantRights?: string;
    };
  };

  // Agency Relationships (Page 4)
  agency: {
    listingAgency: 'seller_agency' | 'buyer_agency' | 'dual_agency' | 'transaction_broker';
    disclosureProvided: boolean;
    designatedAgent?: {
      name: string;
      licenseNumber: string;
    };
    dualAgencyConsent?: boolean;
  };

  // Additional Terms and Conditions
  additionalTerms: {
    specialProvisions?: string;
    exclusions?: string;
    inclusions?: string;
    leadBasedPaint?: {
      applicable: boolean;
      disclosureProvided?: boolean;
      reportProvided?: boolean;
    };
    propertyCondition?: string;
    sellerDisclosures?: string[];
  };

  // Broker/Agent Information (Page 5)
  listingBroker: {
    companyName: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    phone: string;
    fax?: string;
    email?: string;
    licenseNumber: string;
    agent: {
      name: string;
      phone: string;
      email: string;
      licenseNumber: string;
    };
  };

  // Signatures (Pages 10-11)
  signatures: {
    owner1: {
      signature: string;
      printedName: string;
      date: string;
      initials?: string[];
    };
    owner2?: {
      signature: string;
      printedName: string;
      date: string;
      initials?: string[];
    };
    listingAgent: {
      signature: string;
      printedName: string;
      date: string;
      licenseNumber: string;
    };
    broker?: {
      signature: string;
      printedName: string;
      date: string;
      licenseNumber: string;
    };
  };

  // Form Metadata
  formMetadata: {
    formNumber: string;
    formVersion: string;
    preparationDate: string;
    lastModified?: string;
    totalPages: number;
  };
}

// Field mapping for form fields to schema paths
export const FIELD_MAPPING = {
  // Page 1 - Property and Owner Information
  'textfield_1': 'property.address.street',
  'textfield_2': 'property.address.unit',
  'textfield_3': 'property.address.city',
  'textfield_4': 'property.address.state',
  'textfield_5': 'property.address.zipCode',
  'textfield_6': 'property.address.county',
  'textfield_7': 'property.legalDescription',
  'textfield_8': 'owner.name',
  'textfield_9': 'owner.additionalOwners[0]',
  'textfield_10': 'owner.mailingAddress.street',
  'textfield_11': 'owner.mailingAddress.city',
  'textfield_12': 'owner.mailingAddress.state',
  'textfield_13': 'owner.mailingAddress.zipCode',
  'textfield_14': 'owner.phone',
  'textfield_15': 'owner.alternatePhone',
  'textfield_16': 'owner.email',
  'textfield_17': 'listingTerms.startDate',
  'textfield_18': 'listingTerms.endDate',
  'textfield_19': 'listingTerms.listPrice',
  'textfield_20': 'leaseTerms.monthlyRent',
  'textfield_21': 'leaseTerms.securityDeposit',
  'textfield_22': 'leaseTerms.leaseTerm',
  'textfield_23': 'leaseTerms.availableDate',
  'textfield_24': 'commission.listingBrokerageRate',
  'textfield_25': 'commission.cooperatingBrokerageRate',
  
  // Checkboxes for property type
  'checkbox_1': 'propertyFeatures.type_single_family',
  'checkbox_2': 'propertyFeatures.type_condo',
  'checkbox_3': 'propertyFeatures.type_townhouse',
  
  // Checkboxes for utilities
  'checkbox_4': 'utilities.includedInRent.water',
  'checkbox_5': 'utilities.includedInRent.electricity',
  'checkbox_6': 'utilities.includedInRent.gas',
  'checkbox_7': 'utilities.includedInRent.trash',
  'checkbox_8': 'utilities.includedInRent.sewer',
  
  // Additional mappings continue...
};

// Validation rules for the form
export const VALIDATION_RULES = {
  required: [
    'property.address.street',
    'property.address.city',
    'property.address.state',
    'property.address.zipCode',
    'owner.name',
    'owner.phone',
    'listingTerms.startDate',
    'listingTerms.endDate',
    'listingTerms.listPrice',
    'leaseTerms.monthlyRent',
    'leaseTerms.securityDeposit',
    'commission.listingBrokerageRate',
    'listingBroker.companyName',
    'listingBroker.licenseNumber',
    'signatures.owner1.signature',
    'signatures.owner1.date',
    'signatures.listingAgent.signature',
    'signatures.listingAgent.date'
  ],
  
  numeric: [
    'listingTerms.listPrice',
    'leaseTerms.monthlyRent',
    'leaseTerms.securityDeposit',
    'leaseTerms.petDeposit',
    'leaseTerms.applicationFee',
    'leaseTerms.leaseTerm',
    'commission.listingBrokerageRate',
    'commission.cooperatingBrokerageRate',
    'propertyFeatures.bedrooms',
    'propertyFeatures.bathrooms',
    'propertyFeatures.squareFootage',
    'propertyFeatures.yearBuilt',
    'restrictions.maxOccupants'
  ],
  
  date: [
    'listingTerms.startDate',
    'listingTerms.endDate',
    'leaseTerms.availableDate',
    'signatures.owner1.date',
    'signatures.owner2.date',
    'signatures.listingAgent.date',
    'signatures.broker.date'
  ],
  
  percentage: [
    'commission.listingBrokerageRate',
    'commission.cooperatingBrokerageRate'
  ],
  
  email: [
    'owner.email',
    'listingBroker.email',
    'listingBroker.agent.email'
  ],
  
  phone: [
    'owner.phone',
    'owner.alternatePhone',
    'listingBroker.phone',
    'listingBroker.agent.phone'
  ]
};

// Helper function to process form data
export function processListingAgreementForm(formData: any): ResidentialListingAgreementExclusiveLease {
  // Implementation would map raw form fields to the structured schema
  return {} as ResidentialListingAgreementExclusiveLease;
}

// Export types for specific sections
export type PropertyInfo = ResidentialListingAgreementExclusiveLease['property'];
export type OwnerInfo = ResidentialListingAgreementExclusiveLease['owner'];
export type LeaseTerms = ResidentialListingAgreementExclusiveLease['leaseTerms'];
export type Commission = ResidentialListingAgreementExclusiveLease['commission'];
export type PropertyFeatures = ResidentialListingAgreementExclusiveLease['propertyFeatures'];
export type Restrictions = ResidentialListingAgreementExclusiveLease['restrictions'];
export type Marketing = ResidentialListingAgreementExclusiveLease['marketing'];
export type Signatures = ResidentialListingAgreementExclusiveLease['signatures'];