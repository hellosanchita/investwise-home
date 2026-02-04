// Mock property data generator based on URL patterns
export interface PropertyData {
  id: string;
  url: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: number;
  pricePerSqft: number;
  yearBuilt: number;
  propertyType: string;
  hoaFees: number;
  monthlyTax: number;
  monthlyInsurance: number;
  estimatedRent: number;
  daysOnMarket: number;
  source: "zillow" | "realtor" | "redfin";
}

const streetNames = [
  "Oak Street",
  "Maple Avenue",
  "Pine Road",
  "Cedar Lane",
  "Elm Drive",
  "Birch Court",
];

const cities = [
  "Austin, TX",
  "Denver, CO",
  "Phoenix, AZ",
  "Seattle, WA",
  "Portland, OR",
  "Nashville, TN",
];

const propertyTypes = [
  "Single Family",
  "Townhouse",
  "Condo",
  "Multi-Family",
];

function getSourceFromUrl(url: string): "zillow" | "realtor" | "redfin" {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("zillow.com")) return "zillow";
  if (lowerUrl.includes("realtor.com")) return "realtor";
  return "redfin";
}

function generateRandomProperty(url: string, index: number): PropertyData {
  const basePrice = 350000 + Math.random() * 450000;
  const sqft = 1200 + Math.floor(Math.random() * 2000);
  const bedrooms = 2 + Math.floor(Math.random() * 4);
  const bathrooms = Math.max(1, bedrooms - Math.floor(Math.random() * 2));
  const lotSize = sqft * (1.5 + Math.random() * 3);
  const yearBuilt = 1970 + Math.floor(Math.random() * 54);
  const hoaFees = Math.random() > 0.4 ? Math.floor(Math.random() * 400) : 0;

  return {
    id: `prop-${index}-${Date.now()}`,
    url,
    address: `${100 + Math.floor(Math.random() * 900)} ${streetNames[index % streetNames.length]}, ${cities[index % cities.length]}`,
    price: Math.round(basePrice),
    bedrooms,
    bathrooms,
    sqft,
    lotSize: Math.round(lotSize),
    pricePerSqft: Math.round(basePrice / sqft),
    yearBuilt,
    propertyType: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
    hoaFees,
    monthlyTax: Math.round(basePrice * 0.012 / 12),
    monthlyInsurance: Math.round(basePrice * 0.004 / 12),
    estimatedRent: Math.round((basePrice * 0.007) + Math.random() * 500),
    daysOnMarket: Math.floor(Math.random() * 90),
    source: getSourceFromUrl(url),
  };
}

export function generateMockPropertyData(urls: string[]): PropertyData[] {
  return urls.map((url, index) => generateRandomProperty(url, index));
}

export interface ComparisonInsight {
  type: "best" | "warning" | "info";
  title: string;
  description: string;
  propertyId?: string;
}

export function generateComparisonInsights(properties: PropertyData[]): ComparisonInsight[] {
  const insights: ComparisonInsight[] = [];

  if (properties.length < 2) {
    insights.push({
      type: "info",
      title: "Single Property Analysis",
      description: "Add more properties to get comparative insights.",
    });
    return insights;
  }

  // Best price per sqft
  const bestPricePerSqft = properties.reduce((prev, curr) =>
    prev.pricePerSqft < curr.pricePerSqft ? prev : curr
  );
  insights.push({
    type: "best",
    title: "Best Value per Sq Ft",
    description: `${bestPricePerSqft.address.split(",")[0]} offers the best price per sq ft at $${bestPricePerSqft.pricePerSqft}/sqft.`,
    propertyId: bestPricePerSqft.id,
  });

  // Lowest price
  const lowestPrice = properties.reduce((prev, curr) =>
    prev.price < curr.price ? prev : curr
  );
  insights.push({
    type: "best",
    title: "Most Affordable",
    description: `${lowestPrice.address.split(",")[0]} is the most affordable at $${lowestPrice.price.toLocaleString()}.`,
    propertyId: lowestPrice.id,
  });

  // Best rent yield
  const bestRentYield = properties.reduce((prev, curr) => {
    const prevYield = (prev.estimatedRent * 12) / prev.price;
    const currYield = (curr.estimatedRent * 12) / curr.price;
    return prevYield > currYield ? prev : curr;
  });
  const yieldPercent = ((bestRentYield.estimatedRent * 12) / bestRentYield.price * 100).toFixed(2);
  insights.push({
    type: "best",
    title: "Best Investment Potential",
    description: `${bestRentYield.address.split(",")[0]} has the highest rent yield at ${yieldPercent}% annually.`,
    propertyId: bestRentYield.id,
  });

  // High HOA warning
  const highHOA = properties.filter((p) => p.hoaFees > 300);
  if (highHOA.length > 0) {
    insights.push({
      type: "warning",
      title: "High HOA Fees",
      description: `${highHOA.length} ${highHOA.length === 1 ? "property has" : "properties have"} HOA fees above $300/month, impacting monthly costs.`,
    });
  }

  // Newest property
  const newest = properties.reduce((prev, curr) =>
    prev.yearBuilt > curr.yearBuilt ? prev : curr
  );
  insights.push({
    type: "info",
    title: "Newest Construction",
    description: `${newest.address.split(",")[0]} was built in ${newest.yearBuilt}, potentially requiring less maintenance.`,
    propertyId: newest.id,
  });

  // Largest property
  const largest = properties.reduce((prev, curr) =>
    prev.sqft > curr.sqft ? prev : curr
  );
  insights.push({
    type: "info",
    title: "Most Space",
    description: `${largest.address.split(",")[0]} offers the most living space at ${largest.sqft.toLocaleString()} sq ft.`,
    propertyId: largest.id,
  });

  return insights;
}
