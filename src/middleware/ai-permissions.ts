import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { AIContext, AIToolExecution } from '../ai/types';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Note: Tool permission checking is now handled by role-based tool filtering
// in ai-actions-logic.ts. Tools are pre-filtered before being passed to the AI model.
// Data access validation is no longer needed as AI only has access to tools it can use.

// Log AI tool execution
async function logToolExecution(execution: AIToolExecution) {
  try {
    await supabase
      .from('ai_tool_executions')
      .insert({
        tool_name: execution.toolName,
        parameters: execution.parameters,
        user_id: execution.userId,
        user_role: execution.userRole,
        timestamp: execution.timestamp,
        deal_id: execution.dealId,
        result: execution.result,
        error: execution.error
      });
  } catch (error) {
    console.error('Failed to log AI tool execution:', error);
  }
}

// Simplified middleware for AI endpoints (tool filtering now done in ai-actions-logic.ts)
export function aiPermissionMiddleware(toolName?: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'User authentication required'
        });
      }

      // Get user role from Supabase
      let userRole: string | null = null;
      
      if (req.supabaseClient) {
        const { data: profile, error } = await req.supabaseClient
          .from('profiles')
          .select('role')
          .eq('user_id', userId)
          .single();
        
        if (!error && profile) {
          userRole = profile.role as string;
        }
      }

      if (!userRole) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'User role not found'
        });
      }

      // Log AI request if toolName provided
      if (toolName) {
        req.on('finish', async () => {
          if (res.statusCode < 400) {
            await logToolExecution({
              toolName,
              parameters: req.body.parameters || {},
              userId,
              userRole,
              timestamp: new Date(),
              result: 'success'
            });
          }
        });
      }

      next();
    } catch (error) {
      console.error('AI permission middleware error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to validate AI permissions'
      });
    }
  };
}

// Rate limiting middleware
export function aiRateLimitMiddleware() {
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  const REQUESTS_PER_MINUTE = 60; // Default rate limit

  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.sub;

    if (!userId) {
      console.log('AI Rate Limit - Missing user ID');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const now = Date.now();
    const userLimit = rateLimitMap.get(userId) || { count: 0, resetTime: now + 60000 };

    // Reset if time window has passed
    if (now > userLimit.resetTime) {
      userLimit.count = 0;
      userLimit.resetTime = now + 60000; // 1 minute window
    }

    userLimit.count++;

    if (userLimit.count > REQUESTS_PER_MINUTE) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil((userLimit.resetTime - now) / 1000)
      });
    }

    rateLimitMap.set(userId, userLimit);
    next();
  };
}

// Note: AI permissions are now handled through role-based tool filtering
// rather than request-level restrictions. Context validation removed as it
// depended on role configs which are no longer needed.