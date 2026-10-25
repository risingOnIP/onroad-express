import {
  FinancialAssumptions,
  FinancialResults,
  SensitivityConfig,
  SensitivityResults,
  SensitivityScenario,
  HeatMapData,
} from "../../types/financial";
import { calculateFinancialMetrics } from "./financial-calculator";

export function runSensitivityAnalysis(
  baseAssumptions: FinancialAssumptions,
  config: SensitivityConfig
): SensitivityResults {
  // Calculate base case
  const baseCase = calculateFinancialMetrics(baseAssumptions);
  
  const scenarios: SensitivityScenario[] = [];
  const heatMapData: HeatMapData[] = [];
  
  // Single variable sensitivity
  if (config.variables.length === 1) {
    const variable = config.variables[0];
    const scenarios = calculateSingleVariableSensitivity(
      baseAssumptions,
      baseCase,
      variable,
      config.targetMetrics
    );
    
    return {
      baseCase,
      scenarios,
    };
  }
  
  // Two-variable sensitivity (heat map)
  if (config.variables.length === 2) {
    const [var1, var2] = config.variables;
    
    // Generate scenarios for each combination
    const var1Values = generateVariableValues(var1, baseAssumptions);
    const var2Values = generateVariableValues(var2, baseAssumptions);
    
    for (const v1Value of var1Values) {
      for (const v2Value of var2Values) {
        const modifiedAssumptions = applyVariableChange(
          applyVariableChange(baseAssumptions, var1.name, v1Value, var1.isPercentage),
          var2.name,
          v2Value,
          var2.isPercentage
        );
        
        const results = calculateFinancialMetrics(modifiedAssumptions);
        
        // Add scenario
        scenarios.push({
          variableName: `${var1.name}_${var2.name}`,
          variableValue: v1Value, // Primary variable value
          results: extractTargetMetrics(results, config.targetMetrics),
          percentChangeFromBase: calculatePercentChanges(results, baseCase, config.targetMetrics),
        });
        
        // Add heat map data for each target metric
        for (const metric of config.targetMetrics) {
          heatMapData.push({
            variable1Name: var1.name,
            variable1Value: v1Value,
            variable2Name: var2.name,
            variable2Value: v2Value,
            metricValue: results[metric as keyof FinancialResults] as number,
          });
        }
      }
    }
    
    return {
      baseCase,
      scenarios,
      heatMapData,
    };
  }
  
  // Multiple variables (one at a time)
  for (const variable of config.variables) {
    const variableScenarios = calculateSingleVariableSensitivity(
      baseAssumptions,
      baseCase,
      variable,
      config.targetMetrics
    );
    scenarios.push(...variableScenarios);
  }
  
  return {
    baseCase,
    scenarios,
  };
}

function calculateSingleVariableSensitivity(
  baseAssumptions: FinancialAssumptions,
  baseCase: FinancialResults,
  variable: any,
  targetMetrics: string[]
): SensitivityScenario[] {
  const scenarios: SensitivityScenario[] = [];
  const values = generateVariableValues(variable, baseAssumptions);
  
  for (const value of values) {
    const modifiedAssumptions = applyVariableChange(
      baseAssumptions,
      variable.name,
      value,
      variable.isPercentage
    );
    
    const results = calculateFinancialMetrics(modifiedAssumptions);
    
    scenarios.push({
      variableName: variable.name,
      variableValue: value,
      results: extractTargetMetrics(results, targetMetrics),
      percentChangeFromBase: calculatePercentChanges(results, baseCase, targetMetrics),
    });
  }
  
  return scenarios;
}

function generateVariableValues(variable: any, baseAssumptions: FinancialAssumptions): number[] {
  const values: number[] = [];
  const { min, max, step } = variable;
  
  for (let value = min; value <= max; value += step) {
    values.push(value);
  }
  
  return values;
}

function applyVariableChange(
  assumptions: FinancialAssumptions,
  variableName: string,
  value: number,
  isPercentage?: boolean
): FinancialAssumptions {
  const modified = { ...assumptions };
  
  if (isPercentage) {
    // Apply as percentage change from base value
    const baseValue = assumptions[variableName as keyof FinancialAssumptions] as number;
    (modified as any)[variableName] = baseValue * (1 + value / 100);
  } else {
    // Apply as absolute value
    (modified as any)[variableName] = value;
  }
  
  // Recalculate loan amount if purchase price or down payment changed
  if (variableName === "purchasePrice" || variableName === "downPaymentPercent") {
    modified.loanAmount = modified.purchasePrice * (1 - modified.downPaymentPercent / 100);
  }
  
  return modified;
}

function extractTargetMetrics(
  results: FinancialResults,
  targetMetrics: string[]
): Partial<FinancialResults> {
  const extracted: Partial<FinancialResults> = {};
  
  for (const metric of targetMetrics) {
    if (metric in results) {
      (extracted as any)[metric] = results[metric as keyof FinancialResults];
    }
  }
  
  return extracted;
}

function calculatePercentChanges(
  results: FinancialResults,
  baseCase: FinancialResults,
  targetMetrics: string[]
): any {
  const changes: any = {};
  
  for (const metric of targetMetrics) {
    const baseValue = baseCase[metric as keyof FinancialResults] as number;
    const newValue = results[metric as keyof FinancialResults] as number;
    
    if (baseValue !== 0) {
      changes[metric] = ((newValue - baseValue) / Math.abs(baseValue)) * 100;
    } else {
      changes[metric] = newValue !== 0 ? 100 : 0;
    }
  }
  
  return changes;
}