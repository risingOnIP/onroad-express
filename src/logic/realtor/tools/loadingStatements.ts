// Business language translation functions for tool execution loading messages
export function getBusinessActionText(toolName: string, toolArgs: any): string {
  switch (toolName) {
    case 'add_deal':
      return ` Creating deal "${toolArgs.deal_name || 'new deal'}"`;
    case 'add_form_to_deal_option':
      return ` Adding ${toolArgs.form_name || 'form'} to your deal`;
    case 'request_all_deals':
      return ` Loading your deals`;
    case 'request_deal':
      return ` Getting deal details`;
    case 'get_available_forms':
      return ` Finding available forms`;
    case 'add_deal_option':
      return ` Adding ${toolArgs.deal_option_address || 'property option'}`;
    case 'request_all_deal_options_in_deal':
      return ` Loading property options`;
    case 'get_all_form_templates':
      return ` Loading form templates`;
    case 'navigate_within_deal':
      return ` Navigating to ${toolArgs.tab || 'timeline'}`;
    case 'navigate_to_templates':
      return ` Navigating to templates`;
    case 'navigate_to_workspace':
      return ` Navigating to workspace`;
    case 'navigate_to_crm':
      return ` Navigating to CRM`;
    case 'navigate_to_help_docs':
      return ` Navigating to help docs`;
    case 'get_form_metadata':
      return ` Getting form details`;
    case 'get_form_values':
      return ` Loading specific field data`;
    case 'list_fields_in_form':
      return ` Listing available fields`;
    case 'get_file_upload_pdf_form':
      return ` Retrieving uploaded PDF`;
    case 'update_fields':
      return ` Updating form fields`;
    case 'get_all_form_metadatas_in_deal_option':
      return ` Loading property forms`;
    case 'get_all_deal_options_in_deal':
      return ` Loading property options`;
    case 'delete_form':
      return ` Deleting form`;
    case 'add_form_to_dealoption':
      return ` Adding ${toolArgs.formType || 'form'} to property`;
    case 'get_available_forms_to_add':
      return ` Finding available forms for deal`;
    case 'send_form_for_signature':
      return ` Sending form for signature`;
    case 'get_info_about_form_type':
      return ` Getting ${toolArgs.formType || 'form'} information`;
    case 'add_deal_option':
      return ` Adding ${toolArgs.deal_option_address || 'property'} to deal`;
    case 'search_for_full_address':
      return ` Searching for address: ${toolArgs.partialAddress || 'address'}`;
    case 'create_deal':
      return ` Creating deal "${toolArgs.deal_name || 'new deal'}"`;
    case 'get_deal_metadata':
      return ` Getting deal information`;
    case 'update_deal_name':
      return ` Updating deal name to "${toolArgs.newName || 'new name'}"`;
    case 'delete_deal':
      return ` Deleting deal`;
    default:
      return ` Working on that`;
  }
}
