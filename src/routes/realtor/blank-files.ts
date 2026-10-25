import { Router, Request, Response } from "express";
import { getBlankFile } from "../../logic/realtor/blank-files-logic";
import { getFormsByCategory, FORM_MAPPINGS, getFormMapping, getFormPDFFilename, getFormDisplayName } from "../forms/pdf-templates";

const router = Router();

router.get("/metadata/all", (req: Request, res: Response) => {
  try {

    console.log("getting all form metadata")
    const { category } = req.query;
    
    if (category && typeof category === 'string') {
      // Filter by category
      const filtered = getFormsByCategory(category);
      const result = Object.fromEntries(filtered);
      console.log("result", result)
      return res.json(result);
    }
    console.log("returning all form metadata")
    // Return all mappings
    res.json(FORM_MAPPINGS);
  } catch (error) {
    console.error("Error getting all form metadata:", error);
    res.status(500).json({ error: "Failed to get form metadata" });
  }
});

/**
 * GET /api/forms/pdf-template/metadata/categories
 * Get all unique form categories
 */
router.get("/metadata/categories", (_req: Request, res: Response) => {
  try {
    const categories = new Set<string>();
    
    Object.values(FORM_MAPPINGS).forEach(mapping => {
      if (mapping.category) {
        categories.add(mapping.category);
      }
    });
    
    res.json(Array.from(categories).sort());
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ error: "Failed to get categories" });
  }
});

/**
 * GET /api/forms/pdf-template/metadata/:formType
 * Get metadata for a specific form including display name and PDF filename
 */
router.get("/metadata/:formType", (req: Request, res: Response) => {
  try {
    const { formType } = req.params;
    
    const mapping = getFormMapping(formType);
    if (!mapping) {
      // Return fallback for unmapped forms
      return res.json({
        displayName: formType.split('_').map((w: string) => 
          w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        ).join(' '),
        pdfFilename: `${formType}_Fillable`,
        schemaKey: formType,
        category: 'uncategorized'
      });
    }
    
    res.json({
      displayName: mapping.displayName,
      pdfFilename: mapping.pdfFilename,
      schemaKey: mapping.schemaKey,
      category: mapping.category || 'uncategorized',
      description: mapping.description
    });
  } catch (error) {
    console.error("Error getting form metadata:", error);
    res.status(500).json({ error: "Failed to get form metadata" });
  }
});

/**
 * GET /api/forms/pdf-template/pdf-filename/:formType
 * Get just the PDF filename for a form
 */
router.get("/pdf-filename/:formType", (req: Request, res: Response) => {
  try {
    const { formType } = req.params;
    const pdfFilename = getFormPDFFilename(formType);
    
    res.json({ 
      formType,
      pdfFilename: pdfFilename.replace('.pdf', '') // Remove .pdf extension
    });
  } catch (error) {
    console.error("Error getting PDF filename:", error);
    res.status(500).json({ error: "Failed to get PDF filename" });
  }
});

/**
 * GET /api/forms/pdf-template/display-name/:formType
 * Get just the display name for a form
 */
router.get("/display-name/:formType", (req: Request, res: Response) => {
  try {
    const { formType } = req.params;
    const displayName = getFormDisplayName(formType);
    
    res.json({ 
      formType,
      displayName
    });
  } catch (error) {
    console.error("Error getting display name:", error);
    res.status(500).json({ error: "Failed to get display name" });
  }
});

// GET /blank-files/:formType
// Serves PDF files - checks for broker-uploaded TAR forms for authenticated realtors
router.get("/:formType", async (req, res) => {
  try {
    const { formType } = req.params;
    
    // Extract JWT token from Authorization header if present
    const authHeader = req.headers.authorization;
    let token: string | undefined;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // Call the logic function
    const fileBuffer = await getBlankFile(formType, req.supabaseClient!, token);
    
    // Set appropriate headers for binary data
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', fileBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    
    // Send the raw buffer (will be received as ArrayBuffer on frontend)
    res.send(fileBuffer);
  } catch (error: any) {
    console.error(`Error serving PDF file ${req.params.formType}:`, error);
    
    // Handle custom errors from logic
    if (error && typeof error === 'object' && 'status' in error) {
      return res.status(error.status).json({ 
        error: error.error,
        ...(error.errorType && { errorType: error.errorType })
      });
    }
    
    res.status(500).json({ error: "Failed to serve PDF template" });
  }
});

export default router;