export interface CityData {
  name: string;
  medianHomePrice: number;
  annualAppreciation: number;
  rentalYield: number;
  propertyTaxRate: number;
  insuranceRate: number;
  vacancyRate: number;
  maintenanceRate: number;
  managementFee: number;
}

export interface StateData {
  name: string;
  abbreviation: string;
  cities: CityData[];
}

export const statesData: StateData[] = [
  {
    name: "California",
    abbreviation: "CA",
    cities: [
      { name: "Los Angeles", medianHomePrice: 950000, annualAppreciation: 4.5, rentalYield: 4.2, propertyTaxRate: 0.76, insuranceRate: 0.35, vacancyRate: 5, maintenanceRate: 1, managementFee: 8 },
      { name: "San Francisco", medianHomePrice: 1400000, annualAppreciation: 3.8, rentalYield: 3.5, propertyTaxRate: 0.68, insuranceRate: 0.4, vacancyRate: 4, maintenanceRate: 1.2, managementFee: 10 },
      { name: "San Diego", medianHomePrice: 850000, annualAppreciation: 5.0, rentalYield: 4.5, propertyTaxRate: 0.73, insuranceRate: 0.32, vacancyRate: 4.5, maintenanceRate: 0.9, managementFee: 8 },
      { name: "Sacramento", medianHomePrice: 485000, annualAppreciation: 5.5, rentalYield: 5.2, propertyTaxRate: 0.75, insuranceRate: 0.28, vacancyRate: 5, maintenanceRate: 0.8, managementFee: 7 },
    ]
  },
  {
    name: "Texas",
    abbreviation: "TX",
    cities: [
      { name: "Austin", medianHomePrice: 565000, annualAppreciation: 6.0, rentalYield: 5.5, propertyTaxRate: 1.8, insuranceRate: 0.5, vacancyRate: 6, maintenanceRate: 0.8, managementFee: 8 },
      { name: "Houston", medianHomePrice: 340000, annualAppreciation: 4.5, rentalYield: 6.5, propertyTaxRate: 2.0, insuranceRate: 0.8, vacancyRate: 7, maintenanceRate: 0.9, managementFee: 7 },
      { name: "Dallas", medianHomePrice: 420000, annualAppreciation: 5.0, rentalYield: 6.0, propertyTaxRate: 1.9, insuranceRate: 0.55, vacancyRate: 6, maintenanceRate: 0.85, managementFee: 8 },
      { name: "San Antonio", medianHomePrice: 290000, annualAppreciation: 4.8, rentalYield: 6.8, propertyTaxRate: 1.85, insuranceRate: 0.45, vacancyRate: 6.5, maintenanceRate: 0.75, managementFee: 7 },
    ]
  },
  {
    name: "Florida",
    abbreviation: "FL",
    cities: [
      { name: "Miami", medianHomePrice: 580000, annualAppreciation: 5.5, rentalYield: 5.8, propertyTaxRate: 0.89, insuranceRate: 1.2, vacancyRate: 7, maintenanceRate: 1.0, managementFee: 10 },
      { name: "Orlando", medianHomePrice: 395000, annualAppreciation: 5.8, rentalYield: 6.2, propertyTaxRate: 0.97, insuranceRate: 0.9, vacancyRate: 6, maintenanceRate: 0.85, managementFee: 8 },
      { name: "Tampa", medianHomePrice: 410000, annualAppreciation: 6.2, rentalYield: 6.0, propertyTaxRate: 0.91, insuranceRate: 0.95, vacancyRate: 5.5, maintenanceRate: 0.8, managementFee: 8 },
      { name: "Jacksonville", medianHomePrice: 340000, annualAppreciation: 5.5, rentalYield: 6.5, propertyTaxRate: 0.88, insuranceRate: 0.75, vacancyRate: 6, maintenanceRate: 0.75, managementFee: 7 },
    ]
  },
  {
    name: "New York",
    abbreviation: "NY",
    cities: [
      { name: "New York City", medianHomePrice: 750000, annualAppreciation: 3.0, rentalYield: 4.0, propertyTaxRate: 0.88, insuranceRate: 0.4, vacancyRate: 4, maintenanceRate: 1.5, managementFee: 10 },
      { name: "Buffalo", medianHomePrice: 240000, annualAppreciation: 5.0, rentalYield: 7.5, propertyTaxRate: 2.4, insuranceRate: 0.35, vacancyRate: 6, maintenanceRate: 1.0, managementFee: 7 },
      { name: "Rochester", medianHomePrice: 210000, annualAppreciation: 4.5, rentalYield: 8.0, propertyTaxRate: 2.6, insuranceRate: 0.32, vacancyRate: 6.5, maintenanceRate: 1.0, managementFee: 7 },
      { name: "Albany", medianHomePrice: 280000, annualAppreciation: 4.0, rentalYield: 7.0, propertyTaxRate: 2.2, insuranceRate: 0.3, vacancyRate: 5.5, maintenanceRate: 0.9, managementFee: 7 },
    ]
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
    cities: [
      { name: "Phoenix", medianHomePrice: 450000, annualAppreciation: 5.5, rentalYield: 5.8, propertyTaxRate: 0.62, insuranceRate: 0.28, vacancyRate: 5.5, maintenanceRate: 0.7, managementFee: 8 },
      { name: "Tucson", medianHomePrice: 320000, annualAppreciation: 5.0, rentalYield: 6.5, propertyTaxRate: 0.68, insuranceRate: 0.25, vacancyRate: 6, maintenanceRate: 0.65, managementFee: 7 },
      { name: "Scottsdale", medianHomePrice: 750000, annualAppreciation: 4.5, rentalYield: 4.5, propertyTaxRate: 0.55, insuranceRate: 0.3, vacancyRate: 5, maintenanceRate: 0.8, managementFee: 9 },
      { name: "Mesa", medianHomePrice: 420000, annualAppreciation: 5.3, rentalYield: 5.5, propertyTaxRate: 0.6, insuranceRate: 0.26, vacancyRate: 5.5, maintenanceRate: 0.68, managementFee: 7 },
    ]
  },
  {
    name: "Colorado",
    abbreviation: "CO",
    cities: [
      { name: "Denver", medianHomePrice: 595000, annualAppreciation: 4.8, rentalYield: 4.8, propertyTaxRate: 0.55, insuranceRate: 0.32, vacancyRate: 5, maintenanceRate: 0.85, managementFee: 8 },
      { name: "Colorado Springs", medianHomePrice: 450000, annualAppreciation: 5.2, rentalYield: 5.5, propertyTaxRate: 0.52, insuranceRate: 0.28, vacancyRate: 5.5, maintenanceRate: 0.8, managementFee: 7 },
      { name: "Boulder", medianHomePrice: 850000, annualAppreciation: 4.0, rentalYield: 4.0, propertyTaxRate: 0.58, insuranceRate: 0.35, vacancyRate: 4, maintenanceRate: 0.9, managementFee: 9 },
      { name: "Fort Collins", medianHomePrice: 520000, annualAppreciation: 4.5, rentalYield: 5.0, propertyTaxRate: 0.54, insuranceRate: 0.3, vacancyRate: 4.5, maintenanceRate: 0.78, managementFee: 7 },
    ]
  },
  {
    name: "Georgia",
    abbreviation: "GA",
    cities: [
      { name: "Atlanta", medianHomePrice: 400000, annualAppreciation: 5.5, rentalYield: 6.0, propertyTaxRate: 0.92, insuranceRate: 0.38, vacancyRate: 6, maintenanceRate: 0.8, managementFee: 8 },
      { name: "Savannah", medianHomePrice: 350000, annualAppreciation: 5.0, rentalYield: 6.5, propertyTaxRate: 1.0, insuranceRate: 0.55, vacancyRate: 7, maintenanceRate: 0.85, managementFee: 8 },
      { name: "Augusta", medianHomePrice: 220000, annualAppreciation: 4.5, rentalYield: 7.5, propertyTaxRate: 0.95, insuranceRate: 0.35, vacancyRate: 7, maintenanceRate: 0.75, managementFee: 7 },
      { name: "Athens", medianHomePrice: 310000, annualAppreciation: 5.2, rentalYield: 6.8, propertyTaxRate: 0.88, insuranceRate: 0.32, vacancyRate: 5.5, maintenanceRate: 0.7, managementFee: 7 },
    ]
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
    cities: [
      { name: "Charlotte", medianHomePrice: 420000, annualAppreciation: 5.8, rentalYield: 5.5, propertyTaxRate: 0.78, insuranceRate: 0.32, vacancyRate: 5.5, maintenanceRate: 0.75, managementFee: 8 },
      { name: "Raleigh", medianHomePrice: 450000, annualAppreciation: 6.0, rentalYield: 5.2, propertyTaxRate: 0.82, insuranceRate: 0.3, vacancyRate: 5, maintenanceRate: 0.72, managementFee: 8 },
      { name: "Durham", medianHomePrice: 410000, annualAppreciation: 5.5, rentalYield: 5.5, propertyTaxRate: 0.85, insuranceRate: 0.28, vacancyRate: 5, maintenanceRate: 0.7, managementFee: 7 },
      { name: "Asheville", medianHomePrice: 480000, annualAppreciation: 4.5, rentalYield: 5.0, propertyTaxRate: 0.62, insuranceRate: 0.35, vacancyRate: 6, maintenanceRate: 0.85, managementFee: 9 },
    ]
  },
];

export const calculateInvestmentProjection = (
  investmentAmount: number,
  cityData: CityData,
  years: number = 10
) => {
  const downPaymentPercent = 20;
  const mortgageRate = 6.5;
  const mortgageTerm = 30;
  const closingCostPercent = 3;

  // Calculate property value based on investment (assuming investment covers down payment + closing costs)
  const effectiveDownPayment = investmentAmount / (1 + closingCostPercent / 100 * (100 / downPaymentPercent));
  const propertyValue = effectiveDownPayment / (downPaymentPercent / 100);
  const loanAmount = propertyValue * (1 - downPaymentPercent / 100);
  const closingCosts = propertyValue * (closingCostPercent / 100);

  // Monthly mortgage payment calculation
  const monthlyRate = mortgageRate / 100 / 12;
  const numPayments = mortgageTerm * 12;
  const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

  const yearlyProjections = [];
  let cumulativeIncome = 0;
  let cumulativeExpenses = investmentAmount;
  let currentPropertyValue = propertyValue;

  for (let year = 1; year <= years; year++) {
    // Property appreciation
    currentPropertyValue *= (1 + cityData.annualAppreciation / 100);

    // Annual rent (with 3% annual increase)
    const annualRent = propertyValue * (cityData.rentalYield / 100) * Math.pow(1.03, year - 1);
    const effectiveRent = annualRent * (1 - cityData.vacancyRate / 100);

    // Annual expenses
    const propertyTax = currentPropertyValue * (cityData.propertyTaxRate / 100);
    const insurance = currentPropertyValue * (cityData.insuranceRate / 100);
    const maintenance = currentPropertyValue * (cityData.maintenanceRate / 100);
    const management = effectiveRent * (cityData.managementFee / 100);
    const mortgagePayments = monthlyMortgage * 12;

    const totalExpenses = propertyTax + insurance + maintenance + management + mortgagePayments;
    const netIncome = effectiveRent - totalExpenses;

    cumulativeIncome += effectiveRent;
    cumulativeExpenses += totalExpenses;

    // Equity calculation
    const principalPaid = calculatePrincipalPaid(loanAmount, monthlyRate, numPayments, year);
    const equity = currentPropertyValue - (loanAmount - principalPaid);

    yearlyProjections.push({
      year,
      propertyValue: Math.round(currentPropertyValue),
      annualRent: Math.round(effectiveRent),
      totalExpenses: Math.round(totalExpenses),
      netIncome: Math.round(netIncome),
      cumulativeIncome: Math.round(cumulativeIncome),
      cumulativeExpenses: Math.round(cumulativeExpenses),
      equity: Math.round(equity),
      roi: ((equity - investmentAmount + cumulativeIncome - cumulativeExpenses + investmentAmount) / investmentAmount * 100).toFixed(1),
    });
  }

  return {
    initialInvestment: investmentAmount,
    propertyValue: Math.round(propertyValue),
    loanAmount: Math.round(loanAmount),
    closingCosts: Math.round(closingCosts),
    monthlyMortgage: Math.round(monthlyMortgage),
    yearlyProjections,
    annualExpenseBreakdown: {
      propertyTax: Math.round(propertyValue * (cityData.propertyTaxRate / 100)),
      insurance: Math.round(propertyValue * (cityData.insuranceRate / 100)),
      maintenance: Math.round(propertyValue * (cityData.maintenanceRate / 100)),
      management: Math.round(propertyValue * (cityData.rentalYield / 100) * (cityData.managementFee / 100)),
      mortgage: Math.round(monthlyMortgage * 12),
    },
    cityData,
  };
};

const calculatePrincipalPaid = (
  loanAmount: number,
  monthlyRate: number,
  totalPayments: number,
  years: number
): number => {
  const paymentsMade = years * 12;
  let balance = loanAmount;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);

  for (let i = 0; i < paymentsMade; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
  }

  return loanAmount - balance;
};
