import { PropertyData, ComparisonInsight } from "@/utils/mockPropertyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Star, AlertTriangle, Info, Home, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { generatePdfReport } from "@/utils/generatePdfReport";

interface ComparisonReportProps {
  properties: PropertyData[];
  insights: ComparisonInsight[];
  customerName: string;
}

const ComparisonReport = ({ properties, insights, customerName }: ComparisonReportProps) => {
  const handleDownload = () => {
    const pdf = generatePdfReport(properties, insights, customerName);
    pdf.save(`property-comparison-${Date.now()}.pdf`);
  };

  const getInsightIcon = (type: ComparisonInsight["type"]) => {
    switch (type) {
      case "best":
        return <Star className="w-4 h-4 text-accent" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getInsightBg = (type: ComparisonInsight["type"]) => {
    switch (type) {
      case "best":
        return "bg-accent/10 border-accent/20";
      case "warning":
        return "bg-destructive/10 border-destructive/20";
      default:
        return "bg-primary/10 border-primary/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Download Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Comparison Report</h2>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      {/* Key Insights */}
      <Card className="card-gradient shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getInsightBg(insight.type)}`}
              >
                <div className="flex items-start gap-2">
                  {getInsightIcon(insight.type)}
                  <div>
                    <p className="font-medium text-foreground">{insight.title}</p>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Property Cards */}
      <div className="grid gap-4">
        {properties.map((property, index) => (
          <Card key={property.id} className="card-gradient shadow-card overflow-hidden">
            <CardHeader className="bg-accent/5 border-b border-border">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="w-5 h-5 text-accent" />
                Property {index + 1}: {property.address}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Price */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-lg font-bold text-foreground">
                    ${property.price.toLocaleString()}
                  </p>
                </div>

                {/* Beds/Baths */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Beds / Baths</p>
                  <p className="text-lg font-bold text-foreground">
                    {property.bedrooms} / {property.bathrooms}
                  </p>
                </div>

                {/* Sq Ft */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Square Feet</p>
                  <p className="text-lg font-bold text-foreground">
                    {property.sqft.toLocaleString()}
                  </p>
                </div>

                {/* Price per Sq Ft */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Price / Sq Ft</p>
                  <p className="text-lg font-bold text-foreground">
                    ${property.pricePerSqft}
                  </p>
                </div>

                {/* Lot Size */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Lot Size</p>
                  <p className="font-medium text-foreground">
                    {property.lotSize.toLocaleString()} sq ft
                  </p>
                </div>

                {/* Year Built */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Year Built</p>
                  <p className="font-medium text-foreground">{property.yearBuilt}</p>
                </div>

                {/* Property Type */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Property Type</p>
                  <p className="font-medium text-foreground">{property.propertyType}</p>
                </div>

                {/* Days on Market */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Days on Market</p>
                  <p className="font-medium text-foreground">{property.daysOnMarket}</p>
                </div>
              </div>

              {/* Monthly Costs */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-accent" />
                  <p className="font-semibold text-foreground">Monthly Costs</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">HOA Fees</p>
                    <p className="font-medium text-foreground">${property.hoaFees}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Tax</p>
                    <p className="font-medium text-foreground">${property.monthlyTax}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Insurance</p>
                    <p className="font-medium text-foreground">${property.monthlyInsurance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total (excl. mortgage)</p>
                    <p className="font-bold text-foreground">
                      ${property.hoaFees + property.monthlyTax + property.monthlyInsurance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Investment Metrics */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <p className="font-semibold text-foreground">Investment Metrics</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Monthly Rent</p>
                    <p className="font-bold text-accent">${property.estimatedRent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Rent Yield</p>
                    <p className="font-bold text-foreground">
                      {((property.estimatedRent * 12) / property.price * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Source</p>
                    <p className="font-medium text-foreground capitalize">{property.source}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      {properties.length > 1 && (
        <Card className="card-gradient shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Side-by-Side Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Metric</th>
                  {properties.map((p, i) => (
                    <th key={p.id} className="text-left py-2 px-2 font-semibold text-foreground">
                      Property {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Price", getValue: (p: PropertyData) => `$${(p.price / 1000).toFixed(0)}K` },
                  { label: "Beds / Baths", getValue: (p: PropertyData) => `${p.bedrooms} / ${p.bathrooms}` },
                  { label: "Square Feet", getValue: (p: PropertyData) => p.sqft.toLocaleString() },
                  { label: "Price / Sq Ft", getValue: (p: PropertyData) => `$${p.pricePerSqft}` },
                  { label: "Year Built", getValue: (p: PropertyData) => p.yearBuilt.toString() },
                  { label: "HOA Fees", getValue: (p: PropertyData) => `$${p.hoaFees}/mo` },
                  { label: "Est. Rent", getValue: (p: PropertyData) => `$${p.estimatedRent}/mo` },
                  { label: "Rent Yield", getValue: (p: PropertyData) => `${((p.estimatedRent * 12) / p.price * 100).toFixed(1)}%` },
                  { label: "Days Listed", getValue: (p: PropertyData) => p.daysOnMarket.toString() },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-muted-foreground">{row.label}</td>
                    {properties.map((p) => (
                      <td key={p.id} className="py-2 px-2 text-foreground">
                        {row.getValue(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground">
        This report is for informational purposes only. All data is estimated and should be verified independently before making any real estate decisions.
      </p>
    </div>
  );
};

export default ComparisonReport;
