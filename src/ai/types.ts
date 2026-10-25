
export interface DataAccessScope {
  scope: 'own' | 'tethered' | 'all' | 'own_deals' | 'own_broker' | 'none';
  fields: string[] | '*';
}

export interface DataAccess {
  deals?: DataAccessScope;
  clients?: DataAccessScope;
  properties?: DataAccessScope;
  forms?: DataAccessScope;
  brokerInfo?: DataAccessScope;
  realtors?: DataAccessScope;
  analytics?: DataAccessScope;
}

export interface ContextRequirements {
  required: string[];
  optional: string[];
}

export interface RateLimits {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
}

export interface RoleFeatures {
  [feature: string]: boolean;
}

export interface AIRoleConfig {
  role: 'realtor' | 'client' | 'broker';
  displayName: string;
  systemPrompt: string;
  dataAccess: DataAccess;
  contextRequirements: ContextRequirements;
  rateLimits: RateLimits;
  features: RoleFeatures;
}

export interface BusinessContext {
  dealSummary?: string;          // "Buy deal for 123 Main St (Active)" 
  currentLocation?: string;      // "Deal workspace - Client management"
  currentActivity?: string;      // "Editing John Smith buyer intake"
  formContext?: string;          // "Purchase Agreement (Draft status)"
  dealType?: string;            // "Buy Commercial" | "Lease Residential"
}

export interface AIContext {
  
  userId: string;
  userRole: 'realtor' | 'client' | 'broker';
  userEmail?: string;
  workplace: string;
  dealId?: string;
  template?: {
    templateName: string;
    templateId: string;
  };
  formId?: string;
  clientIntakeId?: string;
  viewMode?: string;
  sessionId: string;
  metadata?: Record<string, any>;
  businessContext?: BusinessContext;
}

export interface AIToolExecution {
  toolName: string;
  parameters: Record<string, any>;
  userId: string;
  userRole: string;
  timestamp: Date;
  dealId?: string;
  result?: any;
  error?: string;
}

export interface AIPermissionCheck {
  allowed: boolean;
  reason?: string;
}