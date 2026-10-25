export interface FormGK {
  formType: string;
  organization: "TREC" | "TAR" | "brokerage-custom-form";
  version: string;
  lastUpdated: string;
  form_summary_guidance: string;
  form_reason_for_use: string;
  legalRequirements?: string;
}

export const formGeneralKnowledgeBase: Record<string, FormGK> = {
"IABS": {
  formType: "Information About Brokerage Services (IABS)",
  organization: "TREC",
  version: "1.0",
  lastUpdated: "2025-08-11",
  form_summary_guidance:
    "Summarize that this is a statutory disclosure mandated by Texas law, not a contract. Explain the various brokerage roles (seller’s agent, buyer/tenant’s agent, intermediary), the broker’s fiduciary duties (loyalty, disclosure, confidentiality), how to file a complaint with TREC, and where to find the broker’s/agent’s contact details. Clarify that acknowledgment of receipt does not create an agency relationship and that representation requires a separate signed agreement.",
  form_reason_for_use:
    "To comply with TREC regulations by providing consumers with clear, required information about brokerage services and agency relationships at the first substantive dialogue, ensuring informed decision-making."
},

"landlord_floodplain_notice": {
  formType: "Landlord Floodplain/Flooding Notice",
  organization: "TAR",
  version: "1.0",
  lastUpdated: "2025-08-11",
  form_summary_guidance:
    "Record whether the dwelling is located in a 100-year floodplain as defined by FEMA maps, disclose any known history of flooding, and outline related tenant acknowledgments. Highlight that tenants are advised to consider renter’s insurance for flood damage, specify any statutory rights tied to this disclosure (e.g., early termination), and note delivery timelines. Provide guidance on attaching supporting maps or evidence when applicable.",
  form_reason_for_use:
    "To satisfy statutory disclosure obligations regarding floodplain status or prior flooding before executing a residential lease, reducing landlord liability and ensuring tenant awareness."
},

"residential_lease_agreement": {
  formType: "Residential Lease Agreement",
  organization: "TAR",
  version: "1.0",
  lastUpdated: "2025-08-11",
  form_summary_guidance:
    "Outline all lease elements including parties, full property address, lease term and start/end dates, monthly rent, due dates, acceptable payment methods, deposits and refundable vs non-refundable fees, late fees, returned payment penalties, utilities responsibility, maintenance and repair obligations, rules for pets, parking terms, HOA/community restrictions, keys and access device policies, insurance requirements, default remedies, notice procedures, and signature blocks with effective date.",
  form_reason_for_use:
    "To establish the enforceable contractual terms between landlord and tenant for occupancy of a Texas residential property."
},

"residential_lease_extension": {
  formType: "Residential Lease Extension / Renewal",
  organization: "TAR",
  version: "1.0",
  lastUpdated: "2025-08-11",
  form_summary_guidance:
    "Reference the original lease agreement, specify the new lease end date or renewal period, detail any changes to rent, deposits, or other terms, and state which original terms remain in force. Identify whether this is a formal extension (same lease) or renewal (new lease period). Include signatures and effective date, and note any notice provisions required for execution.",
  form_reason_for_use:
    "To continue a tenancy beyond the original lease term without negotiating an entirely new lease, ensuring clarity on revised terms."
},

"early_termination_of_residential_lease": {
  formType: "Early Termination of Residential Lease",
  organization: "TAR",
  version: "1.0",
  lastUpdated: "2025-08-11",
  form_summary_guidance:
    "Detail the agreed-upon early termination date, specify any termination fees or liquidated damages, clarify tenant obligations during the notice period (such as property showings, cleaning, surrender of keys), outline mitigation/reletting procedures, define how security deposits will be handled, and include mutual release or waiver language as appropriate. Ensure all parties sign with an effective date.",
  form_reason_for_use:
    "To formally document the mutual agreement between landlord and tenant for ending a lease before its scheduled expiration, avoiding disputes over obligations and penalties."
},

"residential_buyer_tenant_representation_agreement_long_form": {
  formType: "Residential Buyer/Tenant Representation Agreement (Long Form)",
  organization: "TAR",
  version: "1.0",
  lastUpdated: "2025-08-11",
  form_summary_guidance:
    "Define the representation term and geographic scope, specify whether representation is for purchase or lease, outline broker duties (loyalty, confidentiality, negotiation, standard of care), exclusivity provisions, compensation structure and commission sources, retainer fees if applicable, intermediary role disclosures, confidentiality terms, protection period after expiration, termination provisions, and client obligations such as referring all prospects through the broker.",
  form_reason_for_use:
    "To create an exclusive agency relationship authorizing a broker to represent a buyer or tenant in residential transactions in Texas, clearly defining compensation and service expectations."
},

"residential_exclusive_right_to_lease": {
  formType: "Residential Exclusive Right to Lease",
  organization: "TAR",
  version: "1.0",
  lastUpdated: "2025-08-11",
  form_summary_guidance:
    "Grant the broker exclusive authority to advertise and lease the property, define the listing term, specify asking rent and key leasing terms, outline broker and owner responsibilities, authorize MLS and other marketing, detail commission triggers including renewals/extensions, address cooperation with other brokers, and include indemnification and termination clauses. Include clear effective and expiration dates.",
  form_reason_for_use:
    "To secure exclusive rights for a broker to market and procure a tenant for a residential property, with defined compensation terms and listing authority."
},

"Animal_Agreement": {
  formType: "Animal Agreement",
  organization: "TAR",
  version: "1.0",
  lastUpdated: "2025-08-11",
  form_summary_guidance:
    "Identify permitted animals by type, breed, size, weight, and number; specify deposits, fees, or rent related to animals; outline pet rules and restrictions; address maintenance and cleaning obligations; clarify tenant responsibility for damages caused by animals; and note any landlord inspection rights. Include provisions for service and assistance animals as required by law, distinguishing them from pets. Require signatures and date.",
  form_reason_for_use:
    "To establish clear terms for keeping animals in a rental property, manage risk, comply with fair housing laws, and avoid disputes over animal-related issues."
}
};
