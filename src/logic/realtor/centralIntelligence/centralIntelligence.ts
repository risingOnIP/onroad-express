import {
  IndividualKnowledgeRuleSet,
  Schema,
  SchemaItem,
} from "../../../types/realtor";
import { IABS_SCHEMA } from "./schemas/IABS";
import { ANIMAL_AGREEMENT_SCHEMA } from "./schemas/Animal_Agreement";

import { LANDLORD_FLOODPLAIN_NOTICE_SCHEMA } from "./schemas/Landlord_Floodplain_Notice";
import { BUY_RESIDENTIAL_KNOWLEDGE } from "./knowledgeBase/transactions/buy/buy-residential";
import { BUY_COMMERCIAL_KNOWLEDGE } from "./knowledgeBase/transactions/buy/buy-commercial";
import { BUY_UNIMPROVED_LAND_KNOWLEDGE } from "./knowledgeBase/transactions/buy/buy-unimproved_land";
import { BUY_IMPROVED_LAND_KNOWLEDGE } from "./knowledgeBase/transactions/buy/buy-improved_land";
import { SELL_RESIDENTIAL_KNOWLEDGE } from "./knowledgeBase/transactions/sell/sell-residential";
import { SELL_COMMERCIAL_KNOWLEDGE } from "./knowledgeBase/transactions/sell/sell-commercial";
import { SELL_UNIMPROVED_LAND_KNOWLEDGE } from "./knowledgeBase/transactions/sell/sell-unimproved_land";
import { SELL_IMPROVED_LAND_KNOWLEDGE } from "./knowledgeBase/transactions/sell/sell-improved_land";
import { RENT_RESIDENTIAL_KNOWLEDGE } from "./knowledgeBase/transactions/rent/rent-residential";
import { RENT_COMMERCIAL_KNOWLEDGE } from "./knowledgeBase/transactions/rent/rent-commercial";
import { RENT_UNIMPROVED_LAND_KNOWLEDGE } from "./knowledgeBase/transactions/rent/rent-unimproved_land";
import { RENT_IMPROVED_LAND_KNOWLEDGE } from "./knowledgeBase/transactions/rent/rent-improved_land";
import { LEASE_RESIDENTIAL_KNOWLEDGE } from "./knowledgeBase/transactions/lease/lease-residential";
import { LEASE_COMMERCIAL_KNOWLEDGE } from "./knowledgeBase/transactions/lease/lease-commercial";
import { LEASE_UNIMPROVED_LAND_KNOWLEDGE } from "./knowledgeBase/transactions/lease/lease-unimproved_land";
import { LEASE_IMPROVED_LAND_KNOWLEDGE } from "./knowledgeBase/transactions/lease/lease-improved_land";
import { residentialLeaseExtensionSchema } from "./schemas/residential_lease_extension_schema";
import { RESIDENTIAL_LEASE_AGREEMENT_SCHEMA } from "./schemas/residential_lease_agreement";
import { THIRD_PARTY_FINANCING_SCHEMA } from "./schemas/third_party_financing_schema";
import { EARLY_TERMINATION_OF_RESIDENTIAL_LEASE_SCHEMA } from "./schemas/early_termination_of_residential_lease_schema";

import { addendumHydrostaticTestingSchema } from "./schemas/addendum_hydrostatic_testing_schema";
import { addendumMandatoryPoaMembershipSchema } from "./schemas/addendum_mandatory_poa_membership_schema";
import { buyersTemporaryResidentialLeaseSchema } from "./schemas/buyers_temporary_residential_lease_schema";
import { residentialRealEstateListingAgreementExclusiveRightToLeaseSchema } from "./schemas/residential_real_estate_listing_agreement_exclusive_right_to_lease_schema";
import { RESIDENTIAL_BUYER_TENANT_REPRESENTATION_AGREEMENT_LONG_FORM_SCHEMA } from "./schemas/residential_buyer_tenant_representation_agreement_long_form_schema";

// Add missing schema imports
import { residentialLeaseMultiFamilySchema } from "./schemas/residential_lease_multi_family_schema";
import { residentialCondominiumContractResaleSchema } from "./schemas/residential_condominium_contract_resale_schema";
import { newHomeContractIncompleteConstructionSchema } from "./schemas/new_home_contract_incomplete_construction_schema";
import { newHomeContractCompletedConstructionSchema } from "./schemas/new_home_contract_completed_construction_schema";
import { poolspaMaintenanceAddendumSchema } from "./schemas/poolspa_maintenance_addendum_schema";
import { loanAssumptionAddendumSchema } from "./schemas/loan_assumption_addendum_schema";
import { leadBasedPaintAddendumSchema } from "./schemas/lead_based_paint_addendum_schema";
import { improvementDistrictAssessmentSchema } from "./schemas/improvement_district_assessment_schema";
import { gulfIntracoastalWaterwaySchema } from "./schemas/gulf_intracoastal_waterway_schema";
import { coastalAreaPropertySchema } from "./schemas/coastal_area_property_schema";
import { backUpContractSchema } from "./schemas/back_up_contract_schema";
import { appraisalTerminationSchema } from "./schemas/appraisal_termination_schema";
import { addendumSection1031ExchangeSchema } from "./schemas/addendum_section_1031_exchange_schema";
import { agreementBetweenBrokersSchema } from "./schemas/agreement_between_brokers_schema";
import { addendumSaleOfOtherPropertyByBuyerSchema } from "./schemas/addendum_sale_of_other_property_by_buyer_schema";
import { addendumReservationOfOilGasMineralsSchema } from "./schemas/addendum_reservation_of_oil_gas_minerals_schema";
import { addendumReleaseAssumedVaLoanLiabilitySchema } from "./schemas/addendum_release_assumed_va_loan_liability_schema";
import { addendumRegardingLeadBasedPaintSchema } from "./schemas/addendum_regarding_lead_based_paint_schema";
import { addendumPropaneSystemServiceAreaSchema } from "./schemas/addendum_propane_system_service_area_schema";
import { environmentalWetlandsAddendumSchema } from "./schemas/environmental_wetlands_addendum_schema";
import { unimprovedPropertyContractSchema } from "./schemas/unimproved_property_contract_schema";
import { residentialLeaseLightningSchema } from "./schemas/residential_lease_lightning";

export type SIDE = "buy"  | "sell" | "rent" | "lease";
export type DEAL_TYPE = "residential" | "commercial" | "unimproved_land" | "improved_land";


export const operators: Record<string, (a: number, b: number) => boolean> = {
  ">": (a, b) => a > b,
  ">=": (a, b) => a >= b,
  "<": (a, b) => a < b,
  "<=": (a, b) => a <= b,
  "==": (a, b) => a == b,
  "===": (a, b) => a === b,
  "!=": (a, b) => a != b,
  "!==": (a, b) => a !== b,
};

export const KNOWLEDGE_BASE: Record<
  string,
  Record<string, Record<string, IndividualKnowledgeRuleSet>>
> = {
  buy: {
    residential: {
      TX: BUY_RESIDENTIAL_KNOWLEDGE["TX"],
    },
    commercial: {
      TX: BUY_COMMERCIAL_KNOWLEDGE["TX"],
    },
    unimproved_land: {
      TX: BUY_UNIMPROVED_LAND_KNOWLEDGE["TX"],
    },
    improved_land: {
      TX: BUY_IMPROVED_LAND_KNOWLEDGE["TX"],
    },
  },
  sell: {
    residential: {
      TX: SELL_RESIDENTIAL_KNOWLEDGE["TX"],
    },
    commercial: {
      TX: SELL_COMMERCIAL_KNOWLEDGE["TX"],
    },
    unimproved_land: {
      TX: SELL_UNIMPROVED_LAND_KNOWLEDGE["TX"],
    },
    improved_land: {
      TX: SELL_IMPROVED_LAND_KNOWLEDGE["TX"],
    },
  },
  rent: {
    residential: {
      TX: RENT_RESIDENTIAL_KNOWLEDGE["TX"],
    },
    commercial: {
      TX: RENT_COMMERCIAL_KNOWLEDGE["TX"],
    },
    unimproved_land: {
      TX: RENT_UNIMPROVED_LAND_KNOWLEDGE["TX"],
    },
    improved_land: {
      TX: RENT_IMPROVED_LAND_KNOWLEDGE["TX"],
    },
  },
  lease: {
    residential: {
      TX: LEASE_RESIDENTIAL_KNOWLEDGE["TX"],
    },
    commercial: {
      TX: LEASE_COMMERCIAL_KNOWLEDGE["TX"],
    },
    unimproved_land: {
      TX: LEASE_UNIMPROVED_LAND_KNOWLEDGE["TX"],
    },
    improved_land: {
      TX: LEASE_IMPROVED_LAND_KNOWLEDGE["TX"],
    },
  },
};

export const ALL_SCHEMAS: Record<string, SchemaItem[]> = {
  IABS: IABS_SCHEMA,
  Animal_Agreement: ANIMAL_AGREEMENT_SCHEMA,
  landlord_floodplain_notice: LANDLORD_FLOODPLAIN_NOTICE_SCHEMA,
  Third_party_financing: THIRD_PARTY_FINANCING_SCHEMA,
  residential_lease_agreement: RESIDENTIAL_LEASE_AGREEMENT_SCHEMA,
  residential_lease_extension: residentialLeaseExtensionSchema,
  early_termination_of_residential_lease:
    EARLY_TERMINATION_OF_RESIDENTIAL_LEASE_SCHEMA,
  residential_buyer_tenant_representation_agreement_long_form:
    RESIDENTIAL_BUYER_TENANT_REPRESENTATION_AGREEMENT_LONG_FORM_SCHEMA,
  addendum_hydrostatic_testing: addendumHydrostaticTestingSchema,
  addendum_mandatory_poa_membership: addendumMandatoryPoaMembershipSchema,
  earlyTerminationOfResidentialLeaseSchema:
    EARLY_TERMINATION_OF_RESIDENTIAL_LEASE_SCHEMA,
  residential_exclusive_right_to_lease:
    residentialRealEstateListingAgreementExclusiveRightToLeaseSchema,

  // Add all missing schemas
  residential_lease_multi_family: residentialLeaseMultiFamilySchema,
  residential_condominium_contract_resale:
    residentialCondominiumContractResaleSchema,
  new_home_contract_incomplete_construction:
    newHomeContractIncompleteConstructionSchema,
  new_home_contract_completed_construction:
    newHomeContractCompletedConstructionSchema,
  poolspa_maintenance_addendum: poolspaMaintenanceAddendumSchema,
  loan_assumption_addendum: loanAssumptionAddendumSchema,
  lead_based_paint_addendum: leadBasedPaintAddendumSchema,
  improvement_district_assessment: improvementDistrictAssessmentSchema,
  gulf_intracoastal_waterway: gulfIntracoastalWaterwaySchema,
  coastal_area_property: coastalAreaPropertySchema,
  back_up_contract: backUpContractSchema,
  appraisal_termination: appraisalTerminationSchema,
  addendum_section_1031_exchange: addendumSection1031ExchangeSchema,
  agreement_between_brokers: agreementBetweenBrokersSchema,
  addendum_sale_of_other_property_by_buyer:
    addendumSaleOfOtherPropertyByBuyerSchema,
  addendum_reservation_of_oil_gas_minerals:
    addendumReservationOfOilGasMineralsSchema,
  addendum_release_assumed_va_loan_liability:
    addendumReleaseAssumedVaLoanLiabilitySchema,
  addendum_regarding_lead_based_paint: addendumRegardingLeadBasedPaintSchema,
  addendum_propane_system_service_area: addendumPropaneSystemServiceAreaSchema,
  environmental_wetlands_addendum: environmentalWetlandsAddendumSchema,
  unimproved_property_contract: unimprovedPropertyContractSchema,
};

export const lightningSchemas: Record<
  SIDE,
  Record<DEAL_TYPE, Schema>
> = {
  lease: {
    residential: residentialLeaseLightningSchema,
    commercial: residentialLeaseLightningSchema,
    unimproved_land: residentialLeaseLightningSchema,
    improved_land: residentialLeaseLightningSchema,
  },
  rent: {
    residential: residentialLeaseLightningSchema,
    commercial: residentialLeaseLightningSchema,
    unimproved_land: residentialLeaseLightningSchema,
    improved_land: residentialLeaseLightningSchema,
  },
  buy: {
    residential: residentialLeaseLightningSchema,
    commercial: residentialLeaseLightningSchema,
    unimproved_land: residentialLeaseLightningSchema,
    improved_land: residentialLeaseLightningSchema,
  },
  sell: {
    residential: residentialLeaseLightningSchema,
    commercial: residentialLeaseLightningSchema,
    unimproved_land: residentialLeaseLightningSchema,
    improved_land: residentialLeaseLightningSchema,
  },
};
