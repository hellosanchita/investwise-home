import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, X, Link2, Download, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generateMockPropertyData, generateComparisonInsights, PropertyData, ComparisonInsight } from "@/utils/mockPropertyData";
import { generatePdfReport } from "@/utils/generatePdfReport";

const CompareHomes = () => {
  const { toast } = useToast();
  const [propertyLinks, setPropertyLinks] = useState<string[]>(["", ""]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyData[]>([]);
  const [insights, setInsights] = useState<ComparisonInsight[]>([]);

  const validLinks = propertyLinks.filter((link) => link.trim() !== "");

  const addPropertyLink = () => {
    if (propertyLinks.length < 5) {
      setPropertyLinks([...propertyLinks, ""]);
    }
  };

  const removePropertyLink = (index: number) => {
    if (propertyLinks.length > 2) {
      setPropertyLinks(propertyLinks.filter((_, i) => i !== index));
    }
  };

  const updatePropertyLink = (index: number, value: string) => {
    const updated = [...propertyLinks];
    updated[index] = value;
    setPropertyLinks(updated);
  };

  const isValidPropertyLink = (url: string) => {
    if (!url.trim()) return true;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.includes("zillow.com") || lowerUrl.includes("redfin.com");
  };

  const allLinksValid = propertyLinks.every(isValidPropertyLink);
  const canGenerate = validLinks.length >= 2 && allLinksValid;

  const handleGenerateReport = async () => {
    if (!canGenerate) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const data = generateMockPropertyData(validLinks);
    const comparisonInsights = generateComparisonInsights(data);

    setPropertyData(data);
    setInsights(comparisonInsights);
    setReportGenerated(true);

    toast({
      title: "Report Generated!",
      description: `Your comparison report for ${data.length} properties is ready.`,
    });

    setIsProcessing(false);
  };

  const handleDownloadPdf = () => {
    const pdf = generatePdfReport(propertyData, insights, "Property Comparison");
    pdf.save(`property-comparison-${Date.now()}.pdf`);
    toast({ title: "PDF Downloaded", description: "Your report has been saved." });
  };

  const handleNewReport = () => {
    setReportGenerated(false);
    setPropertyData([]);
    setInsights([]);
    setPropertyLinks(["", ""]);
  };

  // Helpers for pro/con highlighting
  const getBestWorst = (key: keyof PropertyData, higherIsBetter: boolean) => {
    const values = propertyData.map((p) => Number(p[key]));
    const best = higherIsBetter ? Math.max(...values) : Math.min(...values);
    const worst = higherIsBetter ? Math.min(...values) : Math.max(...values);
    return { best, worst };
  };

  const getCellClass = (value: number, best: number, worst: number) => {
    if (propertyData.length < 2) return "";
    if (value === best) return "text-green-600 font-bold";
    if (value === worst) return "text-red-600 font-bold";
    return "";
  };

  const metrics: { label: string; key: keyof PropertyData; higherIsBetter: boolean; format: (v: number) => string }[] = [
    { label: "Price", key: "price", higherIsBetter: false, format: (v) => `$${v.toLocaleString()}` },
    { label: "Bedrooms", key: "bedrooms", higherIsBetter: true, format: (v) => v.toString() },
    { label: "Bathrooms", key: "bathrooms", higherIsBetter: true, format: (v) => v.toString() },
    { label: "Sq Ft", key: "sqft", higherIsBetter: true, format: (v) => v.toLocaleString() },
    { label: "Price / Sq Ft", key: "pricePerSqft", higherIsBetter: false, format: (v) => `$${v}` },
    { label: "Lot Size (sq ft)", key: "lotSize", higherIsBetter: true, format: (v) => v.toLocaleString() },
    { label: "Year Built", key: "yearBuilt", higherIsBetter: true, format: (v) => v.toString() },
    { label: "HOA Fees / mo", key: "hoaFees", higherIsBetter: false, format: (v) => `$${v}` },
    { label: "Est. Monthly Tax", key: "monthlyTax", higherIsBetter: false, format: (v) => `$${v}` },
    { label: "Est. Insurance / mo", key: "monthlyInsurance", higherIsBetter: false, format: (v) => `$${v}` },
    { label: "Est. Rent / mo", key: "estimatedRent", higherIsBetter: true, format: (v) => `$${v.toLocaleString()}` },
    { label: "Days on Market", key: "daysOnMarket", higherIsBetter: false, format: (v) => v.toString() },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            Compare <span className="text-gradient-gold">Properties</span>
          </h1>
          <p className="text-primary-foreground/80 mt-2 max-w-2xl">
            Paste 2–5 Zillow or Redfin property links to get a side-by-side comparison with pros and cons highlighted.
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4">
          {reportGenerated ? (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <Button variant="outline" onClick={handleNewReport}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  New Comparison
                </Button>
                <Button onClick={handleDownloadPdf} className="gap-2 gold-gradient text-foreground hover:opacity-90 shadow-gold">
                  <Download className="w-4 h-4" />
                  Download PDF Report
                </Button>
              </div>

              {/* Key Insights */}
              <Card className="card-gradient shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {insights.map((insight, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          insight.type === "best"
                            ? "bg-green-500/10 border-green-500/30"
                            : insight.type === "warning"
                            ? "bg-red-500/10 border-red-500/30"
                            : "bg-primary/10 border-primary/20"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {insight.type === "warning" ? (
                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <span className={`text-sm mt-0.5 ${insight.type === "best" ? "text-green-600" : "text-primary"}`}>
                              {insight.type === "best" ? "✓" : "ℹ"}
                            </span>
                          )}
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

              {/* Side-by-Side Comparison Table */}
              <Card className="card-gradient shadow-card">
                <CardHeader>
                  <CardTitle>Side-by-Side Comparison</CardTitle>
                  <CardDescription>
                    <span className="text-green-600 font-medium">Green</span> = best value &nbsp;|&nbsp; <span className="text-red-600 font-medium">Red</span> = weakest value
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 font-semibold text-muted-foreground">Metric</th>
                        {propertyData.map((p, i) => (
                          <th key={p.id} className="text-right py-3 px-3 font-semibold text-foreground min-w-[140px]">
                            <div className="text-xs text-muted-foreground mb-1">Property {i + 1}</div>
                            <div className="text-xs truncate max-w-[140px]">{p.address}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.map((metric) => {
                        const { best, worst } = getBestWorst(metric.key, metric.higherIsBetter);
                        return (
                          <tr key={metric.label} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-2.5 pr-4 text-muted-foreground font-medium">{metric.label}</td>
                            {propertyData.map((p) => {
                              const val = Number(p[metric.key]);
                              return (
                                <td key={p.id} className={`py-2.5 px-3 text-right ${getCellClass(val, best, worst)}`}>
                                  {metric.format(val)}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                      {/* Rent Yield row (computed) */}
                      {(() => {
                        const yields = propertyData.map((p) => (p.estimatedRent * 12) / p.price * 100);
                        const bestY = Math.max(...yields);
                        const worstY = Math.min(...yields);
                        return (
                          <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-2.5 pr-4 text-muted-foreground font-medium">Annual Rent Yield</td>
                            {propertyData.map((p, i) => {
                              const y = yields[i];
                              return (
                                <td key={p.id} className={`py-2.5 px-3 text-right ${getCellClass(y, bestY, worstY)}`}>
                                  {y.toFixed(2)}%
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })()}
                      {/* Total Monthly Costs row */}
                      {(() => {
                        const costs = propertyData.map((p) => p.hoaFees + p.monthlyTax + p.monthlyInsurance);
                        const bestC = Math.min(...costs);
                        const worstC = Math.max(...costs);
                        return (
                          <tr className="hover:bg-muted/30 transition-colors">
                            <td className="py-2.5 pr-4 text-muted-foreground font-medium">Total Monthly Costs</td>
                            {propertyData.map((p, i) => {
                              const c = costs[i];
                              return (
                                <td key={p.id} className={`py-2.5 px-3 text-right ${getCellClass(c, bestC, worstC)}`}>
                                  ${c.toLocaleString()}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })()}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Disclosure */}
              <Card className="border-muted">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Disclaimer:</strong> This report is for informational purposes only. All property data, valuations, rent estimates, and financial projections are approximations generated from publicly available listing information and may not reflect actual market conditions. Figures should be independently verified before making any real estate, investment, or financial decisions. RE InvestWise does not guarantee the accuracy, completeness, or reliability of any data presented. This does not constitute financial, legal, or real estate advice.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-8">
              <Card className="card-gradient shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-accent" />
                    Paste Property Links
                  </CardTitle>
                  <CardDescription>
                    Add 2–5 property links from Zillow or Redfin to compare side by side.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {propertyLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={`link-${index}`} className="text-xs text-muted-foreground">
                          Property {index + 1} {index < 2 ? "*" : "(optional)"}
                        </Label>
                        <Input
                          id={`link-${index}`}
                          type="url"
                          placeholder="https://www.zillow.com/homedetails/..."
                          value={link}
                          onChange={(e) => updatePropertyLink(index, e.target.value)}
                          className={!isValidPropertyLink(link) ? "border-destructive" : ""}
                        />
                        {!isValidPropertyLink(link) && (
                          <p className="text-xs text-destructive">Please enter a valid Zillow or Redfin URL</p>
                        )}
                      </div>
                      {propertyLinks.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePropertyLink(index)}
                          className="mt-5 text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {propertyLinks.length < 5 && (
                    <Button variant="outline" onClick={addPropertyLink} className="w-full gap-2">
                      <Plus className="w-4 h-4" />
                      Add Another Property ({propertyLinks.length}/5)
                    </Button>
                  )}

                  <div className="pt-4 border-t border-border">
                    <Button
                      onClick={handleGenerateReport}
                      disabled={!canGenerate || isProcessing}
                      className="w-full h-12 text-base gold-gradient text-foreground hover:opacity-90 transition-opacity shadow-gold"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mr-2" />
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5 mr-2" />
                          Generate Comparison Report
                        </>
                      )}
                    </Button>
                    {validLinks.length < 2 && (
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        Add at least 2 property links to generate a report
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CompareHomes;
