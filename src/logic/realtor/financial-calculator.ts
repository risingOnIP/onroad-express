import {
  FinancialAssumptions,
  FinancialResults,
  MonthlyCashFlow,
  AnnualCashFlow,
} from "../../types/financial";

export function calculateFinancialMetrics(assumptions: FinancialAssumptions): FinancialResults {
  // Calculate monthly and annual cash flows
  const monthlyCashFlows = calculateMonthlyCashFlows(assumptions);
  const annualCashFlows = calculateAnnualCashFlows(monthlyCashFlows, assumptions);
  
  // Calculate purchase costs
  const downPayment = assumptions.purchasePrice * (assumptions.downPaymentPercent / 100);
  const totalInitialInvestment = downPayment + assumptions.closingCosts;
  
  // Calculate sale analysis
  const finalYear = assumptions.holdingPeriodYears;
  const appreciatedValue = assumptions.purchasePrice * Math.pow(1 + assumptions.appreciationRate / 100, finalYear);
  const sellingCosts = appreciatedValue * (assumptions.sellingCostsPercent / 100);
  const mortgageBalance = calculateRemainingBalance(
    assumptions.loanAmount,
    assumptions.interestRate / 100,
    assumptions.loanTermYears,
    finalYear
  );
  const netProceeds = appreciatedValue - sellingCosts - mortgageBalance;
  
  // Calculate total cash flows
  const totalCashFlowBeforeSale = annualCashFlows.reduce((sum, cf) => sum + cf.beforeTaxCashFlow, 0);
  const totalProfit = totalCashFlowBeforeSale + netProceeds - totalInitialInvestment;
  
  // Calculate key metrics
  const irr = calculateIRR(annualCashFlows, totalInitialInvestment, netProceeds);
  const cashOnCashReturn = annualCashFlows[0] ? (annualCashFlows[0].beforeTaxCashFlow / totalInitialInvestment) * 100 : 0;
  const totalReturn = (totalProfit / totalInitialInvestment) * 100;
  const roi = totalReturn;
  const noi = annualCashFlows[0] ? annualCashFlows[0].noi : 0;
  const npv = calculateNPV(annualCashFlows, totalInitialInvestment, netProceeds, 0.08); // 8% discount rate
  const capRate = (noi / assumptions.purchasePrice) * 100;
  const grossRentMultiplier = assumptions.purchasePrice / (assumptions.monthlyRent * 12);
  const debtServiceCoverageRatio = annualCashFlows[0] ? annualCashFlows[0].noi / annualCashFlows[0].debtService : 0;
  
  // Find break-even year
  let cumulativeCashFlow = -totalInitialInvestment;
  let breakEvenYear = -1;
  for (let i = 0; i < annualCashFlows.length; i++) {
    cumulativeCashFlow += annualCashFlows[i].beforeTaxCashFlow;
    if (cumulativeCashFlow > 0 && breakEvenYear === -1) {
      breakEvenYear = i + 1;
    }
  }
  
  const averageAnnualCashFlow = totalCashFlowBeforeSale / assumptions.holdingPeriodYears;
  
  return {
    irr,
    cashOnCashReturn,
    totalReturn,
    roi,
    noi,
    npv,
    capRate,
    grossRentMultiplier,
    debtServiceCoverageRatio,
    breakEvenYear,
    monthlyCashFlow: monthlyCashFlows,
    annualCashFlow: annualCashFlows,
    totalCashInvested: totalInitialInvestment,
    totalCashFlowBeforeSale,
    netProceedsFromSale: netProceeds,
    totalProfit,
    averageAnnualCashFlow,
    purchaseCosts: {
      downPayment,
      closingCosts: assumptions.closingCosts,
      totalInitialInvestment,
    },
    saleAnalysis: {
      estimatedSalePrice: appreciatedValue,
      sellingCosts,
      mortgageBalance,
      netProceeds,
    },
  };
}

function calculateMonthlyCashFlows(assumptions: FinancialAssumptions): MonthlyCashFlow[] {
  const monthlyFlows: MonthlyCashFlow[] = [];
  let cumulativeCashFlow = 0;
  
  const monthlyDebtService = calculateMonthlyPayment(
    assumptions.loanAmount,
    assumptions.interestRate / 100 / 12,
    assumptions.loanTermYears * 12
  );
  
  const totalMonths = assumptions.holdingPeriodYears * 12;
  
  for (let month = 1; month <= totalMonths; month++) {
    const year = Math.ceil(month / 12);
    
    // Calculate rent with annual growth
    const rentGrowthFactor = Math.pow(1 + assumptions.rentGrowthRate / 100, year - 1);
    const monthlyRent = assumptions.monthlyRent * rentGrowthFactor;
    
    // Calculate income
    const grossIncome = monthlyRent + assumptions.otherIncome;
    const vacancy = grossIncome * (assumptions.vacancyRate / 100);
    const effectiveIncome = grossIncome - vacancy;
    
    // Calculate expenses (with inflation)
    const inflationFactor = Math.pow(1 + assumptions.inflationRate / 100, year - 1);
    const propertyTax = (assumptions.purchasePrice * (assumptions.propertyTaxRate / 100) / 12) * inflationFactor;
    const insurance = (assumptions.insuranceAnnual / 12) * inflationFactor;
    const hoa = assumptions.hoaMonthly * inflationFactor;
    const maintenance = (assumptions.purchasePrice * (assumptions.maintenancePercent / 100) / 12) * inflationFactor;
    const management = effectiveIncome * (assumptions.managementPercent / 100);
    
    const operatingExpenses = propertyTax + insurance + hoa + maintenance + management;
    const netCashFlow = effectiveIncome - operatingExpenses - monthlyDebtService;
    
    cumulativeCashFlow += netCashFlow;
    
    monthlyFlows.push({
      month,
      year,
      grossIncome,
      vacancy,
      effectiveIncome,
      operatingExpenses,
      debtService: monthlyDebtService,
      netCashFlow,
      cumulativeCashFlow,
    });
  }
  
  return monthlyFlows;
}

function calculateAnnualCashFlows(
  monthlyCashFlows: MonthlyCashFlow[],
  assumptions: FinancialAssumptions
): AnnualCashFlow[] {
  const annualFlows: AnnualCashFlow[] = [];
  
  for (let year = 1; year <= assumptions.holdingPeriodYears; year++) {
    const yearMonths = monthlyCashFlows.filter(cf => cf.year === year);
    
    const grossIncome = yearMonths.reduce((sum, cf) => sum + cf.grossIncome, 0);
    const vacancy = yearMonths.reduce((sum, cf) => sum + cf.vacancy, 0);
    const effectiveIncome = yearMonths.reduce((sum, cf) => sum + cf.effectiveIncome, 0);
    const operatingExpenses = yearMonths.reduce((sum, cf) => sum + cf.operatingExpenses, 0);
    const debtService = yearMonths.reduce((sum, cf) => sum + cf.debtService, 0);
    const beforeTaxCashFlow = yearMonths.reduce((sum, cf) => sum + cf.netCashFlow, 0);
    
    const noi = effectiveIncome - operatingExpenses;
    
    // Calculate property value and equity
    const propertyValue = assumptions.purchasePrice * Math.pow(1 + assumptions.appreciationRate / 100, year);
    const loanBalance = calculateRemainingBalance(
      assumptions.loanAmount,
      assumptions.interestRate / 100,
      assumptions.loanTermYears,
      year
    );
    const equity = propertyValue - loanBalance;
    
    const cashOnCashReturn = (beforeTaxCashFlow / (assumptions.purchasePrice * assumptions.downPaymentPercent / 100 + assumptions.closingCosts)) * 100;
    
    annualFlows.push({
      year,
      grossIncome,
      vacancy,
      effectiveIncome,
      operatingExpenses,
      noi,
      debtService,
      beforeTaxCashFlow,
      propertyValue,
      loanBalance,
      equity,
      cashOnCashReturn,
    });
  }
  
  return annualFlows;
}

function calculateMonthlyPayment(principal: number, monthlyRate: number, numPayments: number): number {
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
}

function calculateRemainingBalance(
  principal: number,
  annualRate: number,
  termYears: number,
  yearsElapsed: number
): number {
  const monthlyRate = annualRate / 12;
  const totalPayments = termYears * 12;
  const paymentsMade = yearsElapsed * 12;
  
  if (paymentsMade >= totalPayments) return 0;
  
  const monthlyPayment = calculateMonthlyPayment(principal, monthlyRate, totalPayments);
  
  // Calculate remaining balance using amortization formula
  const remainingPayments = totalPayments - paymentsMade;
  const presentValue = monthlyPayment * (1 - Math.pow(1 + monthlyRate, -remainingPayments)) / monthlyRate;
  
  return presentValue;
}

function calculateIRR(
  annualCashFlows: AnnualCashFlow[],
  initialInvestment: number,
  terminalValue: number
): number {
  // Create cash flow array: initial investment (negative), annual flows, and terminal value
  const cashFlows: number[] = [-initialInvestment];
  annualCashFlows.forEach(cf => cashFlows.push(cf.beforeTaxCashFlow));
  
  // Add terminal value to last year's cash flow
  if (cashFlows.length > 1) {
    cashFlows[cashFlows.length - 1] += terminalValue;
  }
  
  // Newton-Raphson method to find IRR
  let rate = 0.1; // Initial guess of 10%
  const maxIterations = 100;
  const tolerance = 0.00001;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;
    
    for (let j = 0; j < cashFlows.length; j++) {
      npv += cashFlows[j] / Math.pow(1 + rate, j);
      dnpv -= j * cashFlows[j] / Math.pow(1 + rate, j + 1);
    }
    
    const newRate = rate - npv / dnpv;
    
    if (Math.abs(newRate - rate) < tolerance) {
      return newRate * 100; // Convert to percentage
    }
    
    rate = newRate;
  }
  
  return rate * 100; // Convert to percentage
}

function calculateNPV(
  annualCashFlows: AnnualCashFlow[],
  initialInvestment: number,
  terminalValue: number,
  discountRate: number
): number {
  let npv = -initialInvestment;
  
  for (let i = 0; i < annualCashFlows.length; i++) {
    const year = i + 1;
    let cashFlow = annualCashFlows[i].beforeTaxCashFlow;
    
    // Add terminal value to last year
    if (year === annualCashFlows.length) {
      cashFlow += terminalValue;
    }
    
    npv += cashFlow / Math.pow(1 + discountRate, year);
  }
  
  return npv;
}

export {
  calculateMonthlyPayment,
  calculateRemainingBalance,
  calculateIRR,
  calculateNPV,
};