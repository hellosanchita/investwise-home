export interface CityData {
  name: string;
  state: string;
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
      { name: "Los Angeles", state: "CA", medianHomePrice: 950000, annualAppreciation: 4.5, rentalYield: 4.2, propertyTaxRate: 0.76, insuranceRate: 0.35, vacancyRate: 5, maintenanceRate: 1, managementFee: 8 },
      { name: "San Francisco", state: "CA", medianHomePrice: 1400000, annualAppreciation: 3.8, rentalYield: 3.5, propertyTaxRate: 0.68, insuranceRate: 0.4, vacancyRate: 4, maintenanceRate: 1.2, managementFee: 10 },
      { name: "San Diego", state: "CA", medianHomePrice: 850000, annualAppreciation: 5.0, rentalYield: 4.5, propertyTaxRate: 0.73, insuranceRate: 0.32, vacancyRate: 4.5, maintenanceRate: 0.9, managementFee: 8 },
      { name: "Sacramento", state: "CA", medianHomePrice: 485000, annualAppreciation: 5.5, rentalYield: 5.2, propertyTaxRate: 0.75, insuranceRate: 0.28, vacancyRate: 5, maintenanceRate: 0.8, managementFee: 7 },
      { name: "San Jose", state: "CA", medianHomePrice: 1350000, annualAppreciation: 4.2, rentalYield: 3.8, propertyTaxRate: 0.7, insuranceRate: 0.38, vacancyRate: 4, maintenanceRate: 1.1, managementFee: 9 },
      { name: "Fresno", state: "CA", medianHomePrice: 385000, annualAppreciation: 5.8, rentalYield: 6.0, propertyTaxRate: 0.78, insuranceRate: 0.26, vacancyRate: 5.5, maintenanceRate: 0.75, managementFee: 7 },
      { name: "Oakland", state: "CA", medianHomePrice: 780000, annualAppreciation: 4.0, rentalYield: 4.8, propertyTaxRate: 0.72, insuranceRate: 0.36, vacancyRate: 5, maintenanceRate: 1.0, managementFee: 8 },
      { name: "Long Beach", state: "CA", medianHomePrice: 750000, annualAppreciation: 4.3, rentalYield: 4.6, propertyTaxRate: 0.74, insuranceRate: 0.33, vacancyRate: 5, maintenanceRate: 0.95, managementFee: 8 },
      { name: "Bakersfield", state: "CA", medianHomePrice: 340000, annualAppreciation: 5.5, rentalYield: 6.2, propertyTaxRate: 0.8, insuranceRate: 0.24, vacancyRate: 6, maintenanceRate: 0.7, managementFee: 7 },
      { name: "Irvine", state: "CA", medianHomePrice: 1150000, annualAppreciation: 4.8, rentalYield: 4.0, propertyTaxRate: 0.69, insuranceRate: 0.3, vacancyRate: 3.5, maintenanceRate: 0.85, managementFee: 9 },
    ]
  },
  {
    name: "Texas",
    abbreviation: "TX",
    cities: [
      { name: "Austin", state: "TX", medianHomePrice: 565000, annualAppreciation: 6.0, rentalYield: 5.5, propertyTaxRate: 1.8, insuranceRate: 0.5, vacancyRate: 6, maintenanceRate: 0.8, managementFee: 8 },
      { name: "Houston", state: "TX", medianHomePrice: 340000, annualAppreciation: 4.5, rentalYield: 6.5, propertyTaxRate: 2.0, insuranceRate: 0.8, vacancyRate: 7, maintenanceRate: 0.9, managementFee: 7 },
      { name: "Dallas", state: "TX", medianHomePrice: 420000, annualAppreciation: 5.0, rentalYield: 6.0, propertyTaxRate: 1.9, insuranceRate: 0.55, vacancyRate: 6, maintenanceRate: 0.85, managementFee: 8 },
      { name: "San Antonio", state: "TX", medianHomePrice: 290000, annualAppreciation: 4.8, rentalYield: 6.8, propertyTaxRate: 1.85, insuranceRate: 0.45, vacancyRate: 6.5, maintenanceRate: 0.75, managementFee: 7 },
      { name: "Fort Worth", state: "TX", medianHomePrice: 380000, annualAppreciation: 5.2, rentalYield: 6.2, propertyTaxRate: 1.88, insuranceRate: 0.52, vacancyRate: 6, maintenanceRate: 0.8, managementFee: 7 },
      { name: "El Paso", state: "TX", medianHomePrice: 235000, annualAppreciation: 4.2, rentalYield: 7.0, propertyTaxRate: 2.1, insuranceRate: 0.4, vacancyRate: 7, maintenanceRate: 0.7, managementFee: 7 },
      { name: "Arlington", state: "TX", medianHomePrice: 350000, annualAppreciation: 5.0, rentalYield: 6.3, propertyTaxRate: 1.92, insuranceRate: 0.5, vacancyRate: 6, maintenanceRate: 0.78, managementFee: 7 },
      { name: "Plano", state: "TX", medianHomePrice: 520000, annualAppreciation: 4.8, rentalYield: 5.2, propertyTaxRate: 1.75, insuranceRate: 0.48, vacancyRate: 5, maintenanceRate: 0.82, managementFee: 8 },
      { name: "Corpus Christi", state: "TX", medianHomePrice: 260000, annualAppreciation: 4.0, rentalYield: 7.2, propertyTaxRate: 1.95, insuranceRate: 0.85, vacancyRate: 7.5, maintenanceRate: 0.8, managementFee: 7 },
      { name: "Lubbock", state: "TX", medianHomePrice: 220000, annualAppreciation: 4.5, rentalYield: 7.5, propertyTaxRate: 2.0, insuranceRate: 0.42, vacancyRate: 7, maintenanceRate: 0.72, managementFee: 6 },
    ]
  },
  {
    name: "Florida",
    abbreviation: "FL",
    cities: [
      { name: "Miami", state: "FL", medianHomePrice: 580000, annualAppreciation: 5.5, rentalYield: 5.8, propertyTaxRate: 0.89, insuranceRate: 1.2, vacancyRate: 7, maintenanceRate: 1.0, managementFee: 10 },
      { name: "Orlando", state: "FL", medianHomePrice: 395000, annualAppreciation: 5.8, rentalYield: 6.2, propertyTaxRate: 0.97, insuranceRate: 0.9, vacancyRate: 6, maintenanceRate: 0.85, managementFee: 8 },
      { name: "Tampa", state: "FL", medianHomePrice: 410000, annualAppreciation: 6.2, rentalYield: 6.0, propertyTaxRate: 0.91, insuranceRate: 0.95, vacancyRate: 5.5, maintenanceRate: 0.8, managementFee: 8 },
      { name: "Jacksonville", state: "FL", medianHomePrice: 340000, annualAppreciation: 5.5, rentalYield: 6.5, propertyTaxRate: 0.88, insuranceRate: 0.75, vacancyRate: 6, maintenanceRate: 0.75, managementFee: 7 },
      { name: "Fort Lauderdale", state: "FL", medianHomePrice: 520000, annualAppreciation: 5.2, rentalYield: 5.5, propertyTaxRate: 0.92, insuranceRate: 1.1, vacancyRate: 6.5, maintenanceRate: 0.9, managementFee: 9 },
      { name: "St. Petersburg", state: "FL", medianHomePrice: 380000, annualAppreciation: 6.0, rentalYield: 6.2, propertyTaxRate: 0.9, insuranceRate: 0.92, vacancyRate: 5.5, maintenanceRate: 0.78, managementFee: 8 },
      { name: "Sarasota", state: "FL", medianHomePrice: 480000, annualAppreciation: 5.8, rentalYield: 5.5, propertyTaxRate: 0.85, insuranceRate: 1.0, vacancyRate: 7, maintenanceRate: 0.85, managementFee: 9 },
      { name: "Cape Coral", state: "FL", medianHomePrice: 420000, annualAppreciation: 6.5, rentalYield: 5.8, propertyTaxRate: 0.82, insuranceRate: 1.15, vacancyRate: 8, maintenanceRate: 0.88, managementFee: 8 },
      { name: "Tallahassee", state: "FL", medianHomePrice: 280000, annualAppreciation: 4.5, rentalYield: 7.0, propertyTaxRate: 0.95, insuranceRate: 0.7, vacancyRate: 6, maintenanceRate: 0.72, managementFee: 7 },
      { name: "Gainesville", state: "FL", medianHomePrice: 310000, annualAppreciation: 4.8, rentalYield: 6.8, propertyTaxRate: 0.93, insuranceRate: 0.72, vacancyRate: 5.5, maintenanceRate: 0.7, managementFee: 7 },
    ]
  },
  {
    name: "New York",
    abbreviation: "NY",
    cities: [
      { name: "New York City", state: "NY", medianHomePrice: 750000, annualAppreciation: 3.0, rentalYield: 4.0, propertyTaxRate: 0.88, insuranceRate: 0.4, vacancyRate: 4, maintenanceRate: 1.5, managementFee: 10 },
      { name: "Buffalo", state: "NY", medianHomePrice: 240000, annualAppreciation: 5.0, rentalYield: 7.5, propertyTaxRate: 2.4, insuranceRate: 0.35, vacancyRate: 6, maintenanceRate: 1.0, managementFee: 7 },
      { name: "Rochester", state: "NY", medianHomePrice: 210000, annualAppreciation: 4.5, rentalYield: 8.0, propertyTaxRate: 2.6, insuranceRate: 0.32, vacancyRate: 6.5, maintenanceRate: 1.0, managementFee: 7 },
      { name: "Albany", state: "NY", medianHomePrice: 280000, annualAppreciation: 4.0, rentalYield: 7.0, propertyTaxRate: 2.2, insuranceRate: 0.3, vacancyRate: 5.5, maintenanceRate: 0.9, managementFee: 7 },
      { name: "Syracuse", state: "NY", medianHomePrice: 195000, annualAppreciation: 4.2, rentalYield: 8.2, propertyTaxRate: 2.5, insuranceRate: 0.33, vacancyRate: 6.5, maintenanceRate: 0.95, managementFee: 7 },
      { name: "Yonkers", state: "NY", medianHomePrice: 580000, annualAppreciation: 3.5, rentalYield: 4.5, propertyTaxRate: 1.8, insuranceRate: 0.38, vacancyRate: 4.5, maintenanceRate: 1.2, managementFee: 9 },
      { name: "White Plains", state: "NY", medianHomePrice: 650000, annualAppreciation: 3.2, rentalYield: 4.2, propertyTaxRate: 2.0, insuranceRate: 0.4, vacancyRate: 4, maintenanceRate: 1.1, managementFee: 9 },
      { name: "Ithaca", state: "NY", medianHomePrice: 320000, annualAppreciation: 4.0, rentalYield: 6.5, propertyTaxRate: 2.3, insuranceRate: 0.3, vacancyRate: 5, maintenanceRate: 0.85, managementFee: 8 },
      { name: "Binghamton", state: "NY", medianHomePrice: 145000, annualAppreciation: 3.8, rentalYield: 9.0, propertyTaxRate: 2.7, insuranceRate: 0.28, vacancyRate: 7, maintenanceRate: 1.0, managementFee: 7 },
      { name: "Schenectady", state: "NY", medianHomePrice: 190000, annualAppreciation: 4.0, rentalYield: 7.8, propertyTaxRate: 2.4, insuranceRate: 0.32, vacancyRate: 6, maintenanceRate: 0.92, managementFee: 7 },
    ]
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
    cities: [
      { name: "Phoenix", state: "AZ", medianHomePrice: 450000, annualAppreciation: 5.5, rentalYield: 5.8, propertyTaxRate: 0.62, insuranceRate: 0.28, vacancyRate: 5.5, maintenanceRate: 0.7, managementFee: 8 },
      { name: "Tucson", state: "AZ", medianHomePrice: 320000, annualAppreciation: 5.0, rentalYield: 6.5, propertyTaxRate: 0.68, insuranceRate: 0.25, vacancyRate: 6, maintenanceRate: 0.65, managementFee: 7 },
      { name: "Scottsdale", state: "AZ", medianHomePrice: 750000, annualAppreciation: 4.5, rentalYield: 4.5, propertyTaxRate: 0.55, insuranceRate: 0.3, vacancyRate: 5, maintenanceRate: 0.8, managementFee: 9 },
      { name: "Mesa", state: "AZ", medianHomePrice: 420000, annualAppreciation: 5.3, rentalYield: 5.5, propertyTaxRate: 0.6, insuranceRate: 0.26, vacancyRate: 5.5, maintenanceRate: 0.68, managementFee: 7 },
      { name: "Chandler", state: "AZ", medianHomePrice: 480000, annualAppreciation: 5.5, rentalYield: 5.2, propertyTaxRate: 0.58, insuranceRate: 0.27, vacancyRate: 5, maintenanceRate: 0.7, managementFee: 8 },
      { name: "Gilbert", state: "AZ", medianHomePrice: 520000, annualAppreciation: 5.8, rentalYield: 5.0, propertyTaxRate: 0.56, insuranceRate: 0.26, vacancyRate: 4.5, maintenanceRate: 0.68, managementFee: 8 },
      { name: "Glendale", state: "AZ", medianHomePrice: 380000, annualAppreciation: 5.2, rentalYield: 5.8, propertyTaxRate: 0.64, insuranceRate: 0.28, vacancyRate: 5.5, maintenanceRate: 0.7, managementFee: 7 },
      { name: "Tempe", state: "AZ", medianHomePrice: 440000, annualAppreciation: 5.0, rentalYield: 5.5, propertyTaxRate: 0.6, insuranceRate: 0.27, vacancyRate: 5, maintenanceRate: 0.72, managementFee: 8 },
      { name: "Peoria", state: "AZ", medianHomePrice: 410000, annualAppreciation: 5.4, rentalYield: 5.6, propertyTaxRate: 0.58, insuranceRate: 0.26, vacancyRate: 5.5, maintenanceRate: 0.68, managementFee: 7 },
      { name: "Surprise", state: "AZ", medianHomePrice: 395000, annualAppreciation: 5.6, rentalYield: 5.8, propertyTaxRate: 0.57, insuranceRate: 0.25, vacancyRate: 5.5, maintenanceRate: 0.66, managementFee: 7 },
    ]
  },
  {
    name: "Colorado",
    abbreviation: "CO",
    cities: [
      { name: "Denver", state: "CO", medianHomePrice: 595000, annualAppreciation: 4.8, rentalYield: 4.8, propertyTaxRate: 0.55, insuranceRate: 0.32, vacancyRate: 5, maintenanceRate: 0.85, managementFee: 8 },
      { name: "Colorado Springs", state: "CO", medianHomePrice: 450000, annualAppreciation: 5.2, rentalYield: 5.5, propertyTaxRate: 0.52, insuranceRate: 0.28, vacancyRate: 5.5, maintenanceRate: 0.8, managementFee: 7 },
      { name: "Boulder", state: "CO", medianHomePrice: 850000, annualAppreciation: 4.0, rentalYield: 4.0, propertyTaxRate: 0.58, insuranceRate: 0.35, vacancyRate: 4, maintenanceRate: 0.9, managementFee: 9 },
      { name: "Fort Collins", state: "CO", medianHomePrice: 520000, annualAppreciation: 4.5, rentalYield: 5.0, propertyTaxRate: 0.54, insuranceRate: 0.3, vacancyRate: 4.5, maintenanceRate: 0.78, managementFee: 7 },
      { name: "Aurora", state: "CO", medianHomePrice: 480000, annualAppreciation: 5.0, rentalYield: 5.2, propertyTaxRate: 0.56, insuranceRate: 0.3, vacancyRate: 5, maintenanceRate: 0.82, managementFee: 7 },
      { name: "Lakewood", state: "CO", medianHomePrice: 540000, annualAppreciation: 4.6, rentalYield: 4.8, propertyTaxRate: 0.54, insuranceRate: 0.31, vacancyRate: 4.5, maintenanceRate: 0.8, managementFee: 8 },
      { name: "Thornton", state: "CO", medianHomePrice: 510000, annualAppreciation: 4.8, rentalYield: 5.0, propertyTaxRate: 0.55, insuranceRate: 0.29, vacancyRate: 5, maintenanceRate: 0.78, managementFee: 7 },
      { name: "Arvada", state: "CO", medianHomePrice: 560000, annualAppreciation: 4.5, rentalYield: 4.8, propertyTaxRate: 0.53, insuranceRate: 0.3, vacancyRate: 4.5, maintenanceRate: 0.8, managementFee: 8 },
      { name: "Westminster", state: "CO", medianHomePrice: 525000, annualAppreciation: 4.7, rentalYield: 5.0, propertyTaxRate: 0.54, insuranceRate: 0.29, vacancyRate: 5, maintenanceRate: 0.78, managementFee: 7 },
      { name: "Pueblo", state: "CO", medianHomePrice: 280000, annualAppreciation: 5.5, rentalYield: 6.5, propertyTaxRate: 0.58, insuranceRate: 0.26, vacancyRate: 6, maintenanceRate: 0.75, managementFee: 7 },
    ]
  },
  {
    name: "Georgia",
    abbreviation: "GA",
    cities: [
      { name: "Atlanta", state: "GA", medianHomePrice: 400000, annualAppreciation: 5.5, rentalYield: 6.0, propertyTaxRate: 0.92, insuranceRate: 0.38, vacancyRate: 6, maintenanceRate: 0.8, managementFee: 8 },
      { name: "Savannah", state: "GA", medianHomePrice: 350000, annualAppreciation: 5.0, rentalYield: 6.5, propertyTaxRate: 1.0, insuranceRate: 0.55, vacancyRate: 7, maintenanceRate: 0.85, managementFee: 8 },
      { name: "Augusta", state: "GA", medianHomePrice: 220000, annualAppreciation: 4.5, rentalYield: 7.5, propertyTaxRate: 0.95, insuranceRate: 0.35, vacancyRate: 7, maintenanceRate: 0.75, managementFee: 7 },
      { name: "Athens", state: "GA", medianHomePrice: 310000, annualAppreciation: 5.2, rentalYield: 6.8, propertyTaxRate: 0.88, insuranceRate: 0.32, vacancyRate: 5.5, maintenanceRate: 0.7, managementFee: 7 },
      { name: "Marietta", state: "GA", medianHomePrice: 420000, annualAppreciation: 5.3, rentalYield: 5.8, propertyTaxRate: 0.9, insuranceRate: 0.36, vacancyRate: 5.5, maintenanceRate: 0.78, managementFee: 8 },
      { name: "Roswell", state: "GA", medianHomePrice: 520000, annualAppreciation: 4.8, rentalYield: 5.2, propertyTaxRate: 0.85, insuranceRate: 0.34, vacancyRate: 5, maintenanceRate: 0.8, managementFee: 8 },
      { name: "Sandy Springs", state: "GA", medianHomePrice: 580000, annualAppreciation: 4.5, rentalYield: 5.0, propertyTaxRate: 0.88, insuranceRate: 0.35, vacancyRate: 4.5, maintenanceRate: 0.82, managementFee: 9 },
      { name: "Alpharetta", state: "GA", medianHomePrice: 550000, annualAppreciation: 5.0, rentalYield: 5.2, propertyTaxRate: 0.86, insuranceRate: 0.34, vacancyRate: 5, maintenanceRate: 0.78, managementFee: 8 },
      { name: "Macon", state: "GA", medianHomePrice: 180000, annualAppreciation: 4.2, rentalYield: 8.0, propertyTaxRate: 1.0, insuranceRate: 0.35, vacancyRate: 8, maintenanceRate: 0.8, managementFee: 7 },
      { name: "Columbus", state: "GA", medianHomePrice: 210000, annualAppreciation: 4.0, rentalYield: 7.5, propertyTaxRate: 0.98, insuranceRate: 0.36, vacancyRate: 7.5, maintenanceRate: 0.78, managementFee: 7 },
    ]
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
    cities: [
      { name: "Charlotte", state: "NC", medianHomePrice: 420000, annualAppreciation: 5.8, rentalYield: 5.5, propertyTaxRate: 0.78, insuranceRate: 0.32, vacancyRate: 5.5, maintenanceRate: 0.75, managementFee: 8 },
      { name: "Raleigh", state: "NC", medianHomePrice: 450000, annualAppreciation: 6.0, rentalYield: 5.2, propertyTaxRate: 0.82, insuranceRate: 0.3, vacancyRate: 5, maintenanceRate: 0.72, managementFee: 8 },
      { name: "Durham", state: "NC", medianHomePrice: 410000, annualAppreciation: 5.5, rentalYield: 5.5, propertyTaxRate: 0.85, insuranceRate: 0.28, vacancyRate: 5, maintenanceRate: 0.7, managementFee: 7 },
      { name: "Asheville", state: "NC", medianHomePrice: 480000, annualAppreciation: 4.5, rentalYield: 5.0, propertyTaxRate: 0.62, insuranceRate: 0.35, vacancyRate: 6, maintenanceRate: 0.85, managementFee: 9 },
      { name: "Greensboro", state: "NC", medianHomePrice: 280000, annualAppreciation: 5.2, rentalYield: 6.5, propertyTaxRate: 0.85, insuranceRate: 0.28, vacancyRate: 6, maintenanceRate: 0.72, managementFee: 7 },
      { name: "Winston-Salem", state: "NC", medianHomePrice: 265000, annualAppreciation: 5.0, rentalYield: 6.8, propertyTaxRate: 0.88, insuranceRate: 0.27, vacancyRate: 6, maintenanceRate: 0.7, managementFee: 7 },
      { name: "Cary", state: "NC", medianHomePrice: 520000, annualAppreciation: 5.5, rentalYield: 4.8, propertyTaxRate: 0.8, insuranceRate: 0.29, vacancyRate: 4.5, maintenanceRate: 0.7, managementFee: 8 },
      { name: "Wilmington", state: "NC", medianHomePrice: 380000, annualAppreciation: 5.5, rentalYield: 5.8, propertyTaxRate: 0.72, insuranceRate: 0.45, vacancyRate: 7, maintenanceRate: 0.82, managementFee: 8 },
      { name: "Fayetteville", state: "NC", medianHomePrice: 225000, annualAppreciation: 4.8, rentalYield: 7.2, propertyTaxRate: 0.9, insuranceRate: 0.3, vacancyRate: 7, maintenanceRate: 0.75, managementFee: 7 },
      { name: "High Point", state: "NC", medianHomePrice: 240000, annualAppreciation: 5.0, rentalYield: 7.0, propertyTaxRate: 0.86, insuranceRate: 0.28, vacancyRate: 6.5, maintenanceRate: 0.72, managementFee: 7 },
    ]
  },
];

// Helper to get all cities flattened
export const getAllCities = (): CityData[] => {
  return statesData.flatMap(state => state.cities);
};

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
