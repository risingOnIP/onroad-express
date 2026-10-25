// TypeScript Schema for Residential Lease Application
// Total fields: 220 (Text: 188, CheckBox: 24, RadioButton: 8)

export interface ResidentialLeaseApplication {
  // Administrative Info (Page 0)
  receivedDate: string; // textfield_1
  receivedTime: string; // textfield_2
  
  // Property Details
  propertyAddress: string; // textfield_3
  moveInDate: string; // textfield_4
  monthlyRent: string; // textfield_5
  securityDeposit: string; // textfield_6
  leaseTerm: string; // textfield_7 (months)
  
  // Applicant Information
  applicantName: {
    last: string; // textfield_8
    first: string; // textfield_9
    middle: string; // textfield_10
  };
  
  // Contact Information
  email: string; // textfield_10
  phones: {
    work: string; // textfield_11
    mobile: string; // textfield_12
    home: string; // textfield_13
  };
  textMessageConsent: boolean; // checkbox_1 or checkbox_2
  
  // Personal Identification
  ssn: string; // textfield_14
  dateOfBirth: string; // textfield_15
  driversLicense: {
    number: string; // textfield_16
    state: string; // textfield_17
  };
  
  // Physical Description
  physicalTraits: {
    height: string; // textfield_18
    weight: string; // textfield_19
    hairColor: string; // textfield_20
    eyeColor: string; // textfield_21
  };
  
  // Co-Applicants
  hasCoApplicants: boolean; // checkbox_3 or checkbox_4
  coApplicantNames: string[]; // textfield_22-27
  
  // Other Occupants
  otherOccupants: Array<{
    name: string; // textfield_28-33
    relationship: string; // textfield_34-37
  }>;
  
  // Current Residence (Page 1)
  currentResidence: {
    address: string; // textfield_38
    aptNumber: string; // textfield_40
    cityStateZip: string; // textfield_41
    landlordName: string; // textfield_42
    landlordEmail: string; // textfield_43
    landlordPhones: {
      day: string; // textfield_44
      night: string; // textfield_45
      mobile: string; // textfield_46
      fax: string; // textfield_47
    };
    monthlyRent: string; // textfield_48
    moveInDate: string; // textfield_49
    moveOutDate: string; // textfield_50
    reasonForMoving: string; // textfield_51
  };
  
  // Previous Residence
  previousResidence: {
    address: string; // textfield_52
    aptNumber: string; // textfield_53
    cityStateZip: string; // textfield_54
    landlordName: string; // textfield_55
    landlordEmail: string; // textfield_56
    landlordPhones: {
      day: string; // textfield_57
      night: string; // textfield_58
      mobile: string; // textfield_59
      fax: string; // textfield_60
    };
    monthlyRent: string; // textfield_61
    moveInDate: string; // textfield_62
    moveOutDate: string; // textfield_63
    reasonForMoving: string; // textfield_64
  };
  
  // Vehicle Information
  vehicles: Array<{
    make: string; // textfield_65,72
    model: string; // textfield_66,73
    type: string; // textfield_67,74
    color: string; // textfield_68,75
    year: string; // textfield_69,76
    licensePlate: string; // textfield_70,77
    state: string; // textfield_71,78
  }>;
  
  // Employment Information (Page 2)
  currentEmployer: {
    name: string; // textfield_79
    address: string; // textfield_80
    cityStateZip: string; // textfield_81
    phone: string; // textfield_82
    fax: string; // textfield_83
    email: string; // textfield_84
    position: string; // textfield_85
    supervisorName: string; // textfield_86
    supervisorPhone: string; // textfield_87
    employmentDates: {
      from: string; // textfield_88
      to: string; // textfield_89
    };
    monthlyGrossIncome: string; // textfield_90
  };
  
  previousEmployer: {
    name: string; // textfield_91
    address: string; // textfield_92
    cityStateZip: string; // textfield_93
    phone: string; // textfield_94
    position: string; // textfield_95
    supervisorName: string; // textfield_96
    employmentDates: {
      from: string; // textfield_97
      to: string; // textfield_98
    };
    monthlyGrossIncome: string; // textfield_99
  };
  
  // Additional Income Sources
  additionalIncome: Array<{
    source: string; // textfield_100-105
    monthlyAmount: string; // textfield_106-111
  }>;
  
  // Financial Obligations
  financialObligations: {
    alimony: string; // textfield_112
    childSupport: string; // textfield_113
    childCare: string; // textfield_114
    carPayments: string; // textfield_115
    creditCards: string; // textfield_116
  };
  
  // Credit Information
  creditInfo: {
    hasFiledBankruptcy: boolean; // checkbox_6-7
    hasCreditIssues: boolean; // checkbox_8-9
    hasCriminalHistory: boolean; // checkbox_10-11
    hasEvictionHistory: boolean; // checkbox_12-13
    explanations: string[]; // textfield_117-124
  };
  
  // References (Page 3)
  personalReferences: Array<{
    name: string; // textfield_125,133,141
    relationship: string; // textfield_126,134,142
    address: string; // textfield_127,135,143
    cityStateZip: string; // textfield_128,136,144
    phone: string; // textfield_129,137,145
    email: string; // textfield_130,138,146
    yearsKnown: string; // textfield_131,139,147
    occupation: string; // textfield_132,140,148
  }>;
  
  // Emergency Contact
  emergencyContact: {
    name: string; // textfield_149
    relationship: string; // textfield_150
    address: string; // textfield_151
    cityStateZip: string; // textfield_152
    phones: {
      home: string; // textfield_153
      work: string; // textfield_154
      mobile: string; // textfield_155
    };
    email: string; // textfield_156
  };
  
  // Banking Information
  bankAccounts: {
    checking: {
      bankName: string; // textfield_157
      accountNumber: string; // textfield_158
    };
    savings: {
      bankName: string; // textfield_159
      accountNumber: string; // textfield_160
    };
  };
  
  // Additional Questions
  additionalInfo: {
    smoker: boolean; // checkbox_14-15
    pets: boolean; // checkbox_16-17
    petDetails: Array<{
      type: string; // textfield_161-163
      breed: string; // textfield_164-166
      weight: string; // textfield_167-169
    }>;
    waterBedFurniture: boolean; // checkbox_18-19
    musicalInstruments: boolean; // checkbox_20-21
    instrumentDetails: string; // textfield_170
  };
  
  // Legal Questions (Page 4)
  legalQuestions: {
    requestedByOwner: boolean; // checkbox_22-23
    ownerName: string; // textfield_171
    representedByAgent: boolean; // checkbox_24-25
    agentInfo: {
      name: string; // textfield_172
      brokerName: string; // textfield_173
      licenseNumber: string; // textfield_174
      phone: string; // textfield_175
      email: string; // textfield_176
    };
  };
  
  // Military Service
  militaryService: {
    activeOrDependent: boolean; // checkbox_26-27
    branch: string; // textfield_177
    rank: string; // textfield_178
    dateToReport: string; // textfield_179
  };
  
  // Additional Disclosures
  disclosures: {
    understoodApplicationFee: boolean; // checkbox_28-29
    authorizeScreening: boolean; // checkbox_30-31
    certifyTruthful: boolean; // checkbox_32
  };
  
  // Signatures
  signatures: {
    applicantSignature: string; // textfield_180
    applicantSignatureDate: string; // textfield_181
    coApplicantSignatures: Array<{
      signature: string; // textfield_182-184
      date: string; // textfield_185-187
    }>;
  };
  
  // Additional Fields for Multi-Value Questions
  specialAnswers: {
    hasCoApplicants: string; // textfield_186
    hasAgent: string; // textfield_187
    hasPets: string; // textfield_188
  };
}

// Field mappings for form population
export const ResidentialLeaseFieldMappings = {
  // Administrative
  'residential_lease_application_textfield_1': 'receivedDate',
  'residential_lease_application_textfield_2': 'receivedTime',
  
  // Property
  'residential_lease_application_textfield_3': 'propertyAddress',
  'residential_lease_application_textfield_4': 'moveInDate',
  'residential_lease_application_textfield_5': 'monthlyRent',
  'residential_lease_application_textfield_6': 'securityDeposit',
  'residential_lease_application_textfield_7': 'leaseTerm',
  
  // Applicant Name
  'residential_lease_application_textfield_8': 'applicantName.last',
  'residential_lease_application_textfield_9': 'applicantName.first',
  'residential_lease_application_textfield_10': 'email',
  
  // Contact Info
  'residential_lease_application_textfield_11': 'phones.work',
  'residential_lease_application_textfield_12': 'phones.mobile',
  'residential_lease_application_textfield_13': 'phones.home',
  
  // Identification
  'residential_lease_application_textfield_14': 'ssn',
  'residential_lease_application_textfield_15': 'dateOfBirth',
  'residential_lease_application_textfield_16': 'driversLicense.number',
  'residential_lease_application_textfield_17': 'driversLicense.state',
  
  // Physical Traits
  'residential_lease_application_textfield_18': 'physicalTraits.height',
  'residential_lease_application_textfield_19': 'physicalTraits.weight',
  'residential_lease_application_textfield_20': 'physicalTraits.hairColor',
  'residential_lease_application_textfield_21': 'physicalTraits.eyeColor',
  
  // Current Residence (simplified mapping)
  'residential_lease_application_textfield_38': 'currentResidence.address',
  'residential_lease_application_textfield_40': 'currentResidence.aptNumber',
  'residential_lease_application_textfield_41': 'currentResidence.cityStateZip',
  'residential_lease_application_textfield_42': 'currentResidence.landlordName',
  'residential_lease_application_textfield_43': 'currentResidence.landlordEmail',
  
  // Employment (simplified)
  'residential_lease_application_textfield_79': 'currentEmployer.name',
  'residential_lease_application_textfield_80': 'currentEmployer.address',
  'residential_lease_application_textfield_85': 'currentEmployer.position',
  'residential_lease_application_textfield_90': 'currentEmployer.monthlyGrossIncome',
  
  // Checkboxes
  'residential_lease_application_checkbox_1': 'textMessageConsent',
  'residential_lease_application_checkbox_3': 'hasCoApplicants',
  'residential_lease_application_checkbox_6': 'creditInfo.hasFiledBankruptcy',
  'residential_lease_application_checkbox_14': 'additionalInfo.smoker',
  'residential_lease_application_checkbox_16': 'additionalInfo.pets',
  
  // Special multi-value fields
  'Are there coapplicants.residential_lease_application_textfield_186': 'specialAnswers.hasCoApplicants',
  'Is Applicant represented by a REALTOR or other agent.residential_lease_application_textfield_187': 'specialAnswers.hasAgent',
  'Will any animals dogs cats birds reptiles fish other types of animals be kept on the Property.residential_lease_application_textfield_188': 'specialAnswers.hasPets'
};

// Helper type for form field values
export type ResidentialLeaseFormData = Partial<ResidentialLeaseApplication>;

// Validation rules
export const ResidentialLeaseValidation = {
  required: [
    'propertyAddress',
    'moveInDate',
    'monthlyRent',
    'applicantName.last',
    'applicantName.first',
    'phones.mobile',
    'currentResidence.address',
    'currentEmployer.name'
  ],
  
  patterns: {
    ssn: /^\d{3}-?\d{2}-?\d{4}$/,
    phone: /^[\d\s\-\(\)]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    date: /^\d{1,2}\/\d{1,2}\/\d{2,4}$/,
    currency: /^\$?\d+(\.\d{2})?$/
  }
};