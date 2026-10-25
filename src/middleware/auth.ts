import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

// Define the structure of our JWT payload
interface SupabaseJwtPayload extends JwtPayload {
  sub: string;
  email?: string;
  role?: string;
  aud: string;
}

// Extend Express Request type to include our custom properties
declare global {
  namespace Express {
    interface Request {
      user?: SupabaseJwtPayload;
      userToken?: string;
      supabaseClient?: ReturnType<typeof createClient>;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Auth Middleware - Starting authentication check');
  
  // Log headers in a cleaner format
  console.log('Auth headers:', {
    authorization: req.headers.authorization ? `Bearer ${req.headers.authorization.split(' ')[1].substring(0, 10)}...` : 'missing',
    'content-type': req.headers['content-type']
  });
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('Auth Middleware - Missing Authorization header');
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('Auth Middleware - Malformed Authorization header');
    return res.status(401).json({ error: 'Malformed Authorization header' });
  }

  try {
    const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET;
    if (!supabaseJwtSecret) {
      console.error('Auth Middleware - Missing SUPABASE_JWT_SECRET environment variable');
      throw new Error('Missing SUPABASE_JWT_SECRET environment variable');
    }

    // Log environment variables status (without exposing full values)
    // console.log('Auth Middleware - Environment check:', {
    //   hasSupabaseUrl: !!process.env.SUPABASE_URL,
    //   hasSupabaseAnonKey: !!process.env.SUPABASE_ANON_KEY,
    //   hasSupabaseJwtSecret: !!supabaseJwtSecret,
    //   jwtSecretLength: supabaseJwtSecret.length,
    //   // Log first and last few characters of JWT secret to verify it's loaded correctly
    //   jwtSecretStart: supabaseJwtSecret.substring(0, 5),
    //   jwtSecretEnd: supabaseJwtSecret.substring(supabaseJwtSecret.length - 5)
    // });

    // Try to decode the token without verification first to see its contents
    const decodedWithoutVerification = jwt.decode(token) as SupabaseJwtPayload | null;
    if (decodedWithoutVerification) {
      // console.log('Auth Middleware - Token decoded without verification:', {
      //   sub: decodedWithoutVerification.sub, //user id
      //   aud: decodedWithoutVerification.aud, //means audience, says 'authenticated' for some reason
      //   exp: decodedWithoutVerification.exp, //expiration time
      //   iat: decodedWithoutVerification.iat //issued at 
      // });
    }

    // Verify the token with the shared secret
    console.log('Auth Middleware - Attempting to verify JWT');
    const decoded = jwt.verify(token, supabaseJwtSecret) as SupabaseJwtPayload;
    console.log('Auth Middleware - JWT verified successfully:', {
      sub: decoded.sub, //user id
      aud: decoded.aud, // audience; says 'authenticated'
      exp: decoded.exp // says expiration time
    });
    
    // Attach the decoded token and raw token to the request
    req.user = decoded;
    req.userToken = token;

    // Create and attach a Supabase client instance with the user's token
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Auth Middleware - Missing Supabase configuration');
      throw new Error('Missing Supabase configuration');
    }

    // console.log('Auth Middleware - Creating Supabase client');
    req.supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
    // console.log('Auth Middleware - Supabase client created successfully');

    next();
  } catch (err) {
    console.error('Auth Middleware - JWT verification failed:', {
      name: err instanceof Error ? err.name : 'Unknown error',
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined
    });

    if (err instanceof jwt.JsonWebTokenError) {
      console.error('Auth Middleware - JWT specific error:', {
        name: err.name,
        message: err.message
      });
    }
    return res.status(401).json({ 
      error: 'Invalid token', 
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}; 