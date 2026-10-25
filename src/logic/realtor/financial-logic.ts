import { createClient } from "@supabase/supabase-js";
import {
  FinancialAssumptions,
  FinancialResults,
  SensitivityConfig,
  SensitivityResults,
} from "../../types/financial";
import { calculateFinancialMetrics } from "./financial-calculator";
import { runSensitivityAnalysis as runAnalysis } from "./sensitivity-analyzer";
import { generateExcelFile } from "./excel-generator";
// import { generateExcelFile } from "./excel-generator";

export async function getFinancialModel(
  dealOptionId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  try {
    // Fetch the financial model from the financial_models table
    const { data: financialModel, error } = await supabaseClient
      .from("financial_models")
      .select("*")
      .eq("deal_option_id", dealOptionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No model exists yet, return null
        return null;
      }
      throw error;
    }

    return {
      assumptions: financialModel.assumptions,
      results: financialModel.results,
      sensitivityConfig: financialModel.sensitivity_config,
      sensitivityResults: financialModel.sensitivity_results,
      version: financialModel.version,
      last_updated: financialModel.updated_at,
    };
  } catch (error) {
    console.error("Error fetching financial model:", error);
    throw error;
  }
}

export async function saveFinancialModel(
  dealOptionId: string,
  modelData: {
    assumptions?: FinancialAssumptions;
    results?: FinancialResults;
    sensitivityConfig?: SensitivityConfig;
    sensitivityResults?: SensitivityResults;
  },
  supabaseClient: ReturnType<typeof createClient>
) {
  try {
    // If assumptions are provided, calculate results
    let results = modelData.results;
    if (modelData.assumptions) {
      results = calculateFinancialMetrics(modelData.assumptions);
    }

    // Check if a model already exists
    const { data: existingModel, error: fetchError } = await supabaseClient
      .from("financial_models")
      .select("id")
      .eq("deal_option_id", dealOptionId)
      .single();

    let savedModel;
    
    if (existingModel) {
      // Update existing model
      const { data, error: updateError } = await supabaseClient
        .from("financial_models")
        .update({
          assumptions: modelData.assumptions || undefined,
          results: results || undefined,
          sensitivity_config: modelData.sensitivityConfig || undefined,
          sensitivity_results: modelData.sensitivityResults || undefined,
          version: "1.0",
          updated_at: new Date().toISOString(),
        })
        .eq("deal_option_id", dealOptionId)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }
      savedModel = data;
    } else {
      // Get user_id from the deal option
      const { data: dealOption, error: dealOptionError } = await supabaseClient
        .from("dealOptions")
        .select("user_id")
        .eq("id", dealOptionId)
        .single();

      if (dealOptionError) {
        throw dealOptionError;
      }

      // Create new model
      const { data, error: insertError } = await supabaseClient
        .from("financial_models")
        .insert({
          deal_option_id: dealOptionId,
          user_id: dealOption.user_id,
          assumptions: modelData.assumptions,
          results: results,
          sensitivity_config: modelData.sensitivityConfig,
          sensitivity_results: modelData.sensitivityResults,
          version: "1.0",
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }
      savedModel = data;
    }

    return {
      assumptions: savedModel.assumptions,
      results: savedModel.results || results,
      sensitivityConfig: savedModel.sensitivity_config,
      sensitivityResults: savedModel.sensitivity_results,
      version: savedModel.version,
      last_updated: savedModel.updated_at,
    };
  } catch (error) {
    console.error("Error saving financial model:", error);
    throw error;
  }
}

export async function runSensitivityAnalysis(
  dealOptionId: string,
  config: SensitivityConfig,
  supabaseClient: ReturnType<typeof createClient>
) {
  try {
    // Get current financial model
    const financialModel = await getFinancialModel(dealOptionId, supabaseClient);
    
    if (!financialModel || !financialModel.assumptions) {
      throw new Error("No financial model found for this property");
    }

    const assumptions = financialModel.assumptions as FinancialAssumptions;
    
    // Run sensitivity analysis
    const sensitivityResults = runAnalysis(assumptions, config);

    // Save the results
    await saveFinancialModel(
      dealOptionId,
      {
        sensitivityConfig: config,
        sensitivityResults,
      },
      supabaseClient
    );

    return sensitivityResults;
  } catch (error) {
    console.error("Error running sensitivity analysis:", error);
    throw error;
  }
}

export async function exportFinancialModelToExcel(
  dealOptionId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  try {
    // Get the complete financial model
    const financialModel = await getFinancialModel(dealOptionId, supabaseClient);
    
    if (!financialModel) {
      throw new Error("No financial model found for this property");
    }

    // Get deal option details for the address
    const { data: dealOption, error } = await supabaseClient
      .from("dealOptions")
      .select("address")
      .eq("id", dealOptionId)
      .single();

    if (error) {
      throw error;
    }

    // Generate Excel file
    const excelBuffer = await generateExcelFile(
      financialModel,
      dealOption.address as string
    );

    return excelBuffer;
  } catch (error) {
    console.error("Error exporting financial model to Excel:", error);
    throw error;
  }
}