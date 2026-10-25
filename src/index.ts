import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env and .env.local BEFORE any other imports
dotenv.config(); // Load .env first
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') }); // Then load .env.local, which will override any duplicate values

import express from 'express';
import cors from 'cors';
import dealsRouter from './routes/realtor/deals';
import dealOptionsRouter from './routes/realtor/dealOptions';
import formsRouter from './routes/realtor/forms';
import profilesRouter from './routes/profiles';
import templatesRouter from './routes/realtor/templates';
import partyIntakeTemplatesRouter from './routes/realtor/party-intake-templates';
import searchRouter from './routes/party/search';
import realtorPartyTetherRouter from './routes/tether/realtor-party';
import intakeReadRouter from './routes/party/intake';
import { authMiddleware } from './middleware/auth';
import schemaRouter from './routes/realtor/schema';
import aiRouter from './routes/realtor/ai-actions';
import brokerRouter from './routes/broker/realtor-tether';
import brokerFormsReviewRouter from './routes/broker/forms-review';
import brokerFormsRouter from './routes/broker/broker-forms';
import signaturesRouter from "./routes/realtor/signatures"
import signingJwtRouter from "./routes/jwt/signing"
import partyIntakeJwtRouter from "./routes/jwt/party-intake"
import partyPortalJwtRouter from "./routes/jwt/party-portal"
import partyDealsJwtRouter from "./routes/jwt/party-deals"
import dealsPartiesRouter from "./routes/realtor/deals_parties"
import dealOptionPartiesRouter from "./routes/realtor/deal_option_parties"
import partiesRouter from "./routes/realtor/parties"
import partyIntakesRouter from "./routes/realtor/party-intakes"
import fileUploadRouter from "./routes/realtor/file-upload"
import pdfActionsRouter from "./routes/realtor/pdf-actions"
import realtorBlankFilesRouter from "./routes/realtor/blank-files"
import brokerBlankFilesRouter from "./routes/broker/blank-files"
import brokerTetherRouter from "./routes/realtor/broker-tether"
import realtorBrokerFormsCheckRouter from "./routes/realtor/broker-forms-check"
import contactRouter from "./routes/contact"
import blankFilesRouter from "./routes/jwt/blank-files"
import lightningRouter from "./routes/realtor/lightning"

const app = express();
const port = process.env.PORT || 3200;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// Request logging middleware: method and path only (bodies may contain personal data)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

//JWT routes

app.use('/api/jwt/signing', signingJwtRouter)
app.use('/api/jwt/party-intake', partyIntakeJwtRouter)
app.use('/api/jwt/party-portal', partyPortalJwtRouter)
app.use('/api/jwt/party-deals', partyDealsJwtRouter)
app.use('/api/jwt/blank-files', blankFilesRouter)

// Protected routes - require authentication

//tether routes
app.use('/api/tether/realtor-party', authMiddleware, realtorPartyTetherRouter); 


//realtor routes 
app.use('/api/realtor/deals', authMiddleware, dealsRouter);
app.use('/api/realtor/deals-parties', authMiddleware, dealsPartiesRouter);
app.use('/api/realtor/deal-option-parties', authMiddleware, dealOptionPartiesRouter);
app.use('/api/realtor/deal-options-with-parties', authMiddleware, dealOptionsRouter);
app.use('/api/realtor/dealOptions', authMiddleware, dealOptionsRouter);
app.use('/api/realtor/forms', authMiddleware, formsRouter);
app.use('/api/profiles', authMiddleware, profilesRouter);
app.use('/api/realtor/templates', authMiddleware, templatesRouter);
app.use('/api/realtor/schema', authMiddleware, schemaRouter);
app.use('/api/realtor/party-intake-templates', authMiddleware, partyIntakeTemplatesRouter);
app.use('/api/realtor/parties', authMiddleware, partiesRouter);
app.use('/api/realtor/party-intakes', authMiddleware, partyIntakesRouter);
app.use('/api/realtor/signatures', authMiddleware, signaturesRouter);
app.use('/api/realtor/pdf', authMiddleware, pdfActionsRouter);
app.use('/api/realtor/broker-tether', authMiddleware, brokerTetherRouter);
app.use('/api/realtor/broker-forms', authMiddleware, realtorBrokerFormsCheckRouter);
app.use('/api/realtor/lightning', authMiddleware, lightningRouter);

//party routes
app.use('/api/party/searches', authMiddleware, searchRouter);
app.use('/api/party/intake', authMiddleware, intakeReadRouter); 

//ai routes
app.use('/api/realtor/ai-actions', authMiddleware, aiRouter);
// Universal AI route for frontend compatibility
app.use('/api/ai', authMiddleware, aiRouter);

//broker routes
app.use('/api/broker/realtor-broker-tether', authMiddleware, brokerRouter);
app.use('/api/broker/forms', authMiddleware, brokerFormsRouter);
app.use('/api/broker', authMiddleware, brokerFormsReviewRouter);


//file upload routes
app.use('/api/file-upload', authMiddleware, fileUploadRouter);

//blank files routes (auth required for realtor, not for broker)
app.use('/api/realtor/blank-files', authMiddleware, realtorBlankFilesRouter);
app.use('/api/broker/blank-files', brokerBlankFilesRouter);

// Contact form route (no auth required for public contact form)
app.use('/api', contactRouter);

// 404 handler
app.use((req, res) => {
  console.log(`[${new Date().toISOString()}] 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log('Environment variables status:', {
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
    SUPABASE_JWT_SECRET: !!process.env.SUPABASE_JWT_SECRET
  });
  console.log(`Server is running on port ${port}`);
});
