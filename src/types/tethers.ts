
export interface RealtorPartyTether {
  id: string;
  realtor_id: string;
  party_id: string;
  tether_status: "pending" | "active" | "rejected";
  pendingBy: "party" | "realtor";
  search_id: string;
  deal_id: string;
  realtor_email: string;
  party_email: string;
  intake_form_schema: JSON;
  party_answers: JSON;
  created_at: Date;
}

export interface BrokerRealtorTether {
  id: string;
  realtor_id: string;
  created_at: Date | string;
  status?: 'accepted' | 'pending' | 'denied';
  broker_license: string;
  broker_id?: string;
  realtor_email?: string;
  broker_email?: string;
  realtor_full_name?: string;
  broker_full_name?: string;
}