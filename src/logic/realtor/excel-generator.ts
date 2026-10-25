import * as XLSX from "xlsx";
import {
  FinancialAssumptions,
  FinancialResults,
  SensitivityConfig,
  SensitivityResults,
} from "../../types/financial";

export async function generateExcelFile(
  financialModel: any,
  propertyAddress: string
): Promise<Buffer> {
  const workbook = XLSX.utils.book_new();
  
  // Add Summary Sheet
  addSummarySheet(workbook, financialModel, propertyAddress);
  
  // Add Assumptions Sheet
  addAssumptionsSheet(workbook, financialModel.assumptions);
  
  // Add Monthly Cash Flow Sheet
  if (financialModel.results?.monthlyCashFlow) {
    addMonthlyCashFlowSheet(workbook, financialModel.results.monthlyCashFlow);
  }
  
  // Add Annual Cash Flow Sheet
  if (financialModel.results?.annualCashFlow) {
    addAnnualCashFlowSheet(workbook, financialModel.results.annualCashFlow);
  }
  
  // Add Sensitivity Analysis Sheet
  if (financialModel.sensitivityResults) {
    addSensitivitySheet(workbook, financialModel.sensitivityResults, financialModel.sensitivityConfig);
  }
  
  // Generate buffer
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  return buffer;
}

function addSummarySheet(workbook: XLSX.WorkBook, model: any, address: string) {
  const summaryData = [];
  
  // Header
  summaryData.push(["Financial Model Summary"]);
  summaryData.push([`Property: ${address}`]);
  summaryData.push([`Generated: ${new Date().toLocaleDateString()}`]);
  summaryData.push([]);
  
  // Key Metrics
  summaryData.push(["KEY METRICS"]);
  summaryData.push(["Metric", "Value"]);
  
  if (model.results) {
    summaryData.push(["IRR", `${model.results.irr?.toFixed(2)}%`]);
    summaryData.push(["Cash-on-Cash Return (Year 1)", `${model.results.cashOnCashReturn?.toFixed(2)}%`]);
    summaryData.push(["Total Return", `${model.results.totalReturn?.toFixed(2)}%`]);
    summaryData.push(["ROI", `${model.results.roi?.toFixed(2)}%`]);
    summaryData.push(["Cap Rate", `${model.results.capRate?.toFixed(2)}%`]);
    summaryData.push(["NOI (Year 1)", formatCurrency(model.results.noi)]);
    summaryData.push(["NPV", formatCurrency(model.results.npv)]);
    summaryData.push(["Break-Even Year", model.results.breakEvenYear > 0 ? model.results.breakEvenYear : "N/A"]);
    summaryData.push([]);
    
    // Investment Summary
    summaryData.push(["INVESTMENT SUMMARY"]);
    summaryData.push(["Initial Investment", formatCurrency(model.results.totalCashInvested)]);
    summaryData.push(["Total Cash Flow (Operations)", formatCurrency(model.results.totalCashFlowBeforeSale)]);
    summaryData.push(["Net Proceeds from Sale", formatCurrency(model.results.netProceedsFromSale)]);
    summaryData.push(["Total Profit", formatCurrency(model.results.totalProfit)]);
    summaryData.push([]);
    
    // Purchase Details
    summaryData.push(["PURCHASE DETAILS"]);
    summaryData.push(["Purchase Price", formatCurrency(model.assumptions?.purchasePrice || 0)]);
    summaryData.push(["Down Payment", formatCurrency(model.results.purchaseCosts?.downPayment || 0)]);
    summaryData.push(["Closing Costs", formatCurrency(model.results.purchaseCosts?.closingCosts || 0)]);
    summaryData.push(["Loan Amount", formatCurrency(model.assumptions?.loanAmount || 0)]);
    summaryData.push([]);
    
    // Exit Strategy
    summaryData.push(["EXIT STRATEGY"]);
    summaryData.push(["Holding Period", `${model.assumptions?.holdingPeriodYears || 0} years`]);
    summaryData.push(["Estimated Sale Price", formatCurrency(model.results.saleAnalysis?.estimatedSalePrice || 0)]);
    summaryData.push(["Selling Costs", formatCurrency(model.results.saleAnalysis?.sellingCosts || 0)]);
    summaryData.push(["Mortgage Balance at Sale", formatCurrency(model.results.saleAnalysis?.mortgageBalance || 0)]);
    summaryData.push(["Net Proceeds", formatCurrency(model.results.saleAnalysis?.netProceeds || 0)]);
  }
  
  const ws = XLSX.utils.aoa_to_sheet(summaryData);
  
  // Set column widths
  ws["!cols"] = [{ wch: 30 }, { wch: 20 }];
  
  XLSX.utils.book_append_sheet(workbook, ws, "Summary");
}

function addAssumptionsSheet(workbook: XLSX.WorkBook, assumptions: FinancialAssumptions) {
  const assumptionsData = [];
  
  // Header
  assumptionsData.push(["FINANCIAL ASSUMPTIONS"]);
  assumptionsData.push([]);
  
  // Purchase Details
  assumptionsData.push(["PURCHASE DETAILS"]);
  assumptionsData.push(["Parameter", "Value", "Notes"]);
  assumptionsData.push(["Purchase Price", formatCurrency(assumptions?.purchasePrice || 0), ""]);
  assumptionsData.push(["Down Payment %", `${assumptions?.downPaymentPercent || 0}%`, ""]);
  assumptionsData.push(["Closing Costs", formatCurrency(assumptions?.closingCosts || 0), ""]);
  assumptionsData.push(["Loan Amount", formatCurrency(assumptions?.loanAmount || 0), "Auto-calculated"]);
  assumptionsData.push([]);
  
  // Financing
  assumptionsData.push(["FINANCING"]);
  assumptionsData.push(["Parameter", "Value", "Notes"]);
  assumptionsData.push(["Interest Rate", `${assumptions?.interestRate || 0}%`, "Annual"]);
  assumptionsData.push(["Loan Term", `${assumptions?.loanTermYears || 0} years`, ""]);
  assumptionsData.push([]);
  
  // Income
  assumptionsData.push(["INCOME"]);
  assumptionsData.push(["Parameter", "Value", "Notes"]);
  assumptionsData.push(["Monthly Rent", formatCurrency(assumptions?.monthlyRent || 0), ""]);
  assumptionsData.push(["Rent Growth Rate", `${assumptions?.rentGrowthRate || 0}%`, "Annual"]);
  assumptionsData.push(["Other Income", formatCurrency(assumptions?.otherIncome || 0), "Monthly"]);
  assumptionsData.push(["Vacancy Rate", `${assumptions?.vacancyRate || 0}%`, ""]);
  assumptionsData.push([]);
  
  // Expenses
  assumptionsData.push(["OPERATING EXPENSES"]);
  assumptionsData.push(["Parameter", "Value", "Notes"]);
  assumptionsData.push(["Property Tax Rate", `${assumptions?.propertyTaxRate || 0}%`, "% of property value"]);
  assumptionsData.push(["Insurance", formatCurrency(assumptions?.insuranceAnnual || 0), "Annual"]);
  assumptionsData.push(["HOA Fees", formatCurrency(assumptions?.hoaMonthly || 0), "Monthly"]);
  assumptionsData.push(["Maintenance", `${assumptions?.maintenancePercent || 0}%`, "% of property value"]);
  assumptionsData.push(["Management Fee", `${assumptions?.managementPercent || 0}%`, "% of rental income"]);
  assumptionsData.push([]);
  
  // Growth & Exit
  assumptionsData.push(["GROWTH & EXIT"]);
  assumptionsData.push(["Parameter", "Value", "Notes"]);
  assumptionsData.push(["Appreciation Rate", `${assumptions?.appreciationRate || 0}%`, "Annual"]);
  assumptionsData.push(["Inflation Rate", `${assumptions?.inflationRate || 0}%`, "Annual"]);
  assumptionsData.push(["Holding Period", `${assumptions?.holdingPeriodYears || 0} years`, ""]);
  assumptionsData.push(["Exit Cap Rate", `${assumptions?.exitCapRate || 0}%`, ""]);
  assumptionsData.push(["Selling Costs", `${assumptions?.sellingCostsPercent || 0}%`, "% of sale price"]);
  
  const ws = XLSX.utils.aoa_to_sheet(assumptionsData);
  
  // Set column widths
  ws["!cols"] = [{ wch: 25 }, { wch: 20 }, { wch: 30 }];
  
  XLSX.utils.book_append_sheet(workbook, ws, "Assumptions");
}

function addMonthlyCashFlowSheet(workbook: XLSX.WorkBook, monthlyCashFlow: any[]) {
  const headers = [
    "Month",
    "Year",
    "Gross Income",
    "Vacancy",
    "Effective Income",
    "Operating Expenses",
    "Debt Service",
    "Net Cash Flow",
    "Cumulative Cash Flow",
  ];
  
  const data = [headers];
  
  monthlyCashFlow.forEach((cf) => {
    data.push([
      cf.month,
      cf.year,
      formatCurrency(cf.grossIncome),
      formatCurrency(cf.vacancy),
      formatCurrency(cf.effectiveIncome),
      formatCurrency(cf.operatingExpenses),
      formatCurrency(cf.debtService),
      formatCurrency(cf.netCashFlow),
      formatCurrency(cf.cumulativeCashFlow),
    ]);
  });
  
  const ws = XLSX.utils.aoa_to_sheet(data);
  
  // Set column widths
  ws["!cols"] = headers.map(() => ({ wch: 18 }));
  
  XLSX.utils.book_append_sheet(workbook, ws, "Monthly Cash Flow");
}

function addAnnualCashFlowSheet(workbook: XLSX.WorkBook, annualCashFlow: any[]) {
  const headers = [
    "Year",
    "Gross Income",
    "Vacancy",
    "Effective Income",
    "Operating Expenses",
    "NOI",
    "Debt Service",
    "Before-Tax Cash Flow",
    "Property Value",
    "Loan Balance",
    "Equity",
    "Cash-on-Cash Return",
  ];
  
  const data = [headers];
  
  annualCashFlow.forEach((cf) => {
    data.push([
      cf.year,
      formatCurrency(cf.grossIncome),
      formatCurrency(cf.vacancy),
      formatCurrency(cf.effectiveIncome),
      formatCurrency(cf.operatingExpenses),
      formatCurrency(cf.noi),
      formatCurrency(cf.debtService),
      formatCurrency(cf.beforeTaxCashFlow),
      formatCurrency(cf.propertyValue),
      formatCurrency(cf.loanBalance),
      formatCurrency(cf.equity),
      `${cf.cashOnCashReturn.toFixed(2)}%`,
    ]);
  });
  
  const ws = XLSX.utils.aoa_to_sheet(data);
  
  // Set column widths
  ws["!cols"] = headers.map(() => ({ wch: 18 }));
  
  XLSX.utils.book_append_sheet(workbook, ws, "Annual Cash Flow");
}

function addSensitivitySheet(workbook: XLSX.WorkBook, results: SensitivityResults, config: SensitivityConfig) {
  const data = [];
  
  // Header
  data.push(["SENSITIVITY ANALYSIS"]);
  data.push([]);
  
  // Base Case
  data.push(["BASE CASE METRICS"]);
  data.push(["IRR", `${results.baseCase.irr?.toFixed(2)}%`]);
  data.push(["Cash-on-Cash Return", `${results.baseCase.cashOnCashReturn?.toFixed(2)}%`]);
  data.push(["Total Return", `${results.baseCase.totalReturn?.toFixed(2)}%`]);
  data.push(["NOI", formatCurrency(results.baseCase.noi)]);
  data.push([]);
  
  // Scenarios
  if (results.scenarios && results.scenarios.length > 0) {
    data.push(["SENSITIVITY SCENARIOS"]);
    
    // Create headers based on target metrics
    const headers = ["Variable", "Value", ...config.targetMetrics.map(m => getMetricLabel(m))];
    data.push(headers);
    
    // Add scenario data
    results.scenarios.forEach((scenario) => {
      const row = [
        config.variables.find(v => v.name === scenario.variableName)?.label || scenario.variableName,
        formatVariableValue(scenario.variableValue, config.variables.find(v => v.name === scenario.variableName)),
      ];
      
      config.targetMetrics.forEach((metric) => {
        const value = scenario.results[metric as keyof typeof scenario.results];
        if (value !== undefined) {
          row.push(formatMetricValue(Number(value), metric));
        } else {
          row.push("N/A");
        }
      });
      
      data.push(row);
    });
  }
  
  const ws = XLSX.utils.aoa_to_sheet(data);
  
  // Set column widths
  ws["!cols"] = [{ wch: 20 }, { wch: 15 }, ...config.targetMetrics.map(() => ({ wch: 18 }))];
  
  XLSX.utils.book_append_sheet(workbook, ws, "Sensitivity Analysis");
}

function formatCurrency(value: number): string {
  if (value === undefined || value === null) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatVariableValue(value: number, variable: any): string {
  if (variable?.isPercentage) {
    return `${value > 0 ? "+" : ""}${value}%`;
  }
  return `${value.toFixed(2)}%`;
}

function formatMetricValue(value: number, metric: string): string {
  if (["irr", "cashOnCashReturn", "totalReturn", "capRate"].includes(metric)) {
    return `${value.toFixed(2)}%`;
  }
  return formatCurrency(value);
}

function getMetricLabel(metric: string): string {
  const labels: { [key: string]: string } = {
    irr: "IRR",
    cashOnCashReturn: "Cash-on-Cash",
    totalReturn: "Total Return",
    noi: "NOI",
    npv: "NPV",
    capRate: "Cap Rate",
  };
  return labels[metric] || metric;
}