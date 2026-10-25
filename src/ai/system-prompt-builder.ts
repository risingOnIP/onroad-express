import { AIConnectionTether } from '../types/realtor';
import { realtorSystemPrompt } from './system_prompts/realtor';
import { brokerSystemPrompt } from './system_prompts/broker';
import { clientSystemPrompt } from './system_prompts/client';

const CONSOLIDATED_SYSTEM_PROMPTS = {
  realtor: realtorSystemPrompt,
  broker: brokerSystemPrompt,
  client: clientSystemPrompt
};

export interface SystemPromptOptions {
  userId: string;
  aiTether: AIConnectionTether;
}

export function buildSystemPrompt(options: SystemPromptOptions): string {
  const { userId, aiTether } = options;
  const { role, pageNavigation, fullConversation } = aiTether;
  
  const consolidatedPrompt = CONSOLIDATED_SYSTEM_PROMPTS[role as keyof typeof CONSOLIDATED_SYSTEM_PROMPTS];
  
  if (!consolidatedPrompt) {
    throw new Error(`Invalid role: ${role}`);
  }

  const sections: string[] = [];

  // Use the consolidated system prompt
  sections.push(consolidatedPrompt);

  // Context awareness - show business context instead of raw IDs
  sections.push(`\n## Current Context`);
  sections.push(`- User Role: ${role}`);
  sections.push(`- User ID: ${userId}`);

  // Current Page Context
  sections.push(`\n## Current Page Context`);

  if (pageNavigation.area === 'workspace') {
    sections.push(`- Area: Workspace (Deal Overview)`);
    sections.push(`- View: Dashboard showing all deals with navigation buttons for templates and CRM`);
    
  } else if (pageNavigation.area === 'inside_deal' && pageNavigation.deal) {
    const { dealId, tab, clients, forms } = pageNavigation.deal;
    
    sections.push(`- Area: Inside Deal Management`);
    sections.push(`- Deal ID: ${dealId}`);
    sections.push(`- Active Tab: ${tab}`);
    
    if (tab === 'clients' && clients) {
      sections.push(`- Client Tab: ${clients.clientTab || 'all'}`);
      sections.push(`- Client Section: ${clients.clientSection || 'management'}`);
      if (clients.editingIntake) sections.push(`- Editing Intake: ${clients.editingIntake}`);
      if (clients.viewingResponses) sections.push(`- Viewing Responses: ${clients.viewingResponses}`);
      if (clients.previewingIntake) sections.push(`- Previewing Intake: ${clients.previewingIntake}`);  
      if (clients.selectedClientIntakeId) sections.push(`- Selected Client Intake: ${clients.selectedClientIntakeId}`);
    }
    
    if (tab === 'forms' && forms) {
      sections.push(`- Forms View: ${forms.viewMode || 'list'}`);
      if (forms.selectedFormId) sections.push(`- Selected Form: ${forms.selectedFormId}`);
      if (forms.selectedPropertyId) sections.push(`- Selected Property: ${forms.selectedPropertyId}`);
    }
    
  } else if (pageNavigation.area === 'templates' && pageNavigation.templates) {
    sections.push(`- Area: Template Management`);
    sections.push(`- Tab: ${pageNavigation.templates.tab}`);
    if (pageNavigation.templates.modify) {
      sections.push(`- Modify Type: ${pageNavigation.templates.modify.type}`);
      if (pageNavigation.templates.modify.templateId) {
        sections.push(`- Template ID: ${pageNavigation.templates.modify.templateId}`);
      }
    }
    
  } else if (pageNavigation.area === 'crm') {
    sections.push(`- Area: Client Relationship Management`);
    
  } else if (pageNavigation.area === 'help-docs' && pageNavigation.help_docs) {
    sections.push(`- Area: Help Documentation`);
    sections.push(`- Tab: ${pageNavigation.help_docs.tab}`);
    
  } else if (pageNavigation.area === 'first-sign-in') {
    sections.push(`- Area: First Sign-In Setup`);
  }

  // Add conversation history if it exists
  if (fullConversation && fullConversation.length > 0) {
    sections.push(`\n## Conversation History`);
    sections.push(`This is your conversation history with the user. Continue the conversation naturally:`);
    
    for (const message of fullConversation) {
      if (message.role === 'user') {
        sections.push(`\nUser: ${message.content}`);
      } else if (message.role === 'assistant' && message.content) {
        // Skip empty assistant messages
        if (message.content.trim()) {
          sections.push(`\nAssistant (You): ${message.content}`);
        }
      }
    }
    
    sections.push(`\n## Instructions`);
    sections.push(`Continue the conversation based on the history above. Respond naturally to the user's latest message.`);
  }

  return sections.join('\n');
}

