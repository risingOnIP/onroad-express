type ConversationContext = any;
/**
 * Production-ready conversation context management
 * In production, replace this with Redis or similar distributed cache
 */
export class ConversationContextManager {
  private static contexts = new Map<string, ConversationContext>();
  private static readonly MAX_ACTIONS = 50;
  private static readonly CONTEXT_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
  private static lastCleanup = Date.now();
  
  static getOrCreate(userId: string): ConversationContext {
    // Periodic cleanup of old contexts
    if (Date.now() - this.lastCleanup > 60000) { // Every minute
      this.cleanup();
    }
    
    if (!this.contexts.has(userId)) {
      this.contexts.set(userId, {
        recentActions: [],
        lastAccessed: Date.now()
      } as ConversationContext & { lastAccessed: number });
    }
    
    const context = this.contexts.get(userId)!;
    (context as any).lastAccessed = Date.now();
    return context;
  }
  
  static update(userId: string, updates: Partial<ConversationContext>) {
    const context = this.getOrCreate(userId);
    Object.assign(context, updates);
    
    // Keep only last MAX_ACTIONS actions
    if (context.recentActions.length > this.MAX_ACTIONS) {
      context.recentActions = context.recentActions.slice(-this.MAX_ACTIONS);
    }
  }
  
  static clear(userId: string) {
    this.contexts.delete(userId);
  }
  
  static getContextSummary(userId: string): {
    currentDeal?: string;
    currentForm?: string;
    recentTools: string[];
    lastAction?: Date;
  } {
    const context = this.contexts.get(userId);
    if (!context) {
      return { recentTools: [] };
    }
    
    return {
      currentDeal: context.currentDealId,
      currentForm: context.currentFormId,
      recentTools: context.recentActions
        .slice(-10)
        .map((a: any) => a.toolName),
      lastAction: context.recentActions[context.recentActions.length - 1]?.timestamp
    };
  }
  
  private static cleanup() {
    const now = Date.now();
    for (const [userId, context] of this.contexts.entries()) {
      if (now - (context as any).lastAccessed > this.CONTEXT_TTL) {
        this.contexts.delete(userId);
      }
    }
    this.lastCleanup = now;
  }
}