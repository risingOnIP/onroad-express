import express, { Request, Response } from "express";
import { authMiddleware } from "../../middleware/auth";
import {
  getFinancialModel,
  saveFinancialModel,
  runSensitivityAnalysis,
  exportFinancialModelToExcel,
} from "../../logic/realtor/financial-logic";

const router = express.Router();

// Get financial model for a deal option
router.get("/:dealOptionId", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { dealOptionId } = req.params;
    const supabaseClient = req.supabaseClient!;
    
    const financialModel = await getFinancialModel(dealOptionId, supabaseClient);
    
    if (!financialModel) {
      return res.status(404).json({ error: "No financial model found" });
    }
    
    res.json(financialModel);
  } catch (error) {
    console.error("Error fetching financial model:", error);
    res.status(500).json({ error: "Failed to fetch financial model" });
  }
});

// Save/update financial model for a deal option
router.post("/:dealOptionId", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { dealOptionId } = req.params;
    const modelData = req.body;
    const supabaseClient = req.supabaseClient!;
    
    const updatedModel = await saveFinancialModel(dealOptionId, modelData, supabaseClient);
    
    res.json(updatedModel);
  } catch (error) {
    console.error("Error saving financial model:", error);
    res.status(500).json({ error: "Failed to save financial model" });
  }
});

// Run sensitivity analysis
router.post("/:dealOptionId/analyze", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { dealOptionId } = req.params;
    const config = req.body;
    const supabaseClient = req.supabaseClient!;
    
    const results = await runSensitivityAnalysis(dealOptionId, config, supabaseClient);
    
    res.json(results);
  } catch (error) {
    console.error("Error running sensitivity analysis:", error);
    res.status(500).json({ error: "Failed to run sensitivity analysis" });
  }
});

// Export financial model to Excel
router.post("/:dealOptionId/export", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { dealOptionId } = req.params;
    const supabaseClient = req.supabaseClient!;
    
    const excelBuffer = await exportFinancialModelToExcel(dealOptionId, supabaseClient);
    
    // Set headers for Excel file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="financial-model-${dealOptionId}.xlsx"`
    );
    
    res.send(excelBuffer);
  } catch (error) {
    console.error("Error exporting financial model:", error);
    res.status(500).json({ error: "Failed to export financial model" });
  }
});

export default router;