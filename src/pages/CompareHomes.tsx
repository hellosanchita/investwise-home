import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, X, Mail, User, Link2, CreditCard, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ComparisonReport from "@/components/ComparisonReport";
import { PropertyChatInterface, PropertySuggestion } from "@/components/PropertyChatInterface";
import { generateComparisonInsights, PropertyData, ComparisonInsight } from "@/utils/mockPropertyData";

const CompareHomes = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [chatProperties, setChatProperties] = useState<PropertySuggestion[]>([]);
  const [propertyLinks, setPropertyLinks] = useState<string[]>([""]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyData[]>([]);
  const [insights, setInsights] = useState<ComparisonInsight[]>([]);

  const validLinks = propertyLinks.filter((link) => link.trim() !== "");
  // Use chat properties if available, otherwise validate manual links
  const isFormValid = email.trim() !== "" && name.trim() !== "" && (chatProperties.length > 0 || validLinks.length >= 1);

  const addPropertyLink = () => {
    if (propertyLinks.length < 6) {
      setPropertyLinks([...propertyLinks, ""]);
    }
  };

  const removePropertyLink = (index: number) => {
    if (propertyLinks.length > 1) {
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
    return (
      lowerUrl.includes("zillow.com") ||
      lowerUrl.includes("realtor.com") ||
      lowerUrl.includes("redfin.com")
    );
  };

  const handlePropertiesFromChat = (properties: PropertySuggestion[]) => {
    setChatProperties(properties);
    setChatStarted(true);
  };

  const handlePayment = async () => {
    if (!isFormValid) return;

    setIsProcessing(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Use chat properties if available, otherwise use manual links
    const propertiesToUse = chatProperties.length > 0 
      ? chatProperties 
      : propertyLinks.filter(l => l.trim() !== "").map((url, idx) => ({
          id: `manual-${idx}`,
          url,
          address: `Property ${idx + 1}`,
          price: 500000,
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1800,
          lotSize: 5000,
          pricePerSqft: 278,
          yearBuilt: 2015,
          propertyType: "Single Family",
          hoaFees: 0,
          monthlyTax: 500,
          monthlyInsurance: 167,
          estimatedRent: 3500,
          daysOnMarket: 30,
          source: "zillow" as const,
        }));

    const comparisonInsights = generateComparisonInsights(propertiesToUse as PropertyData[]);
    
    setPropertyData(propertiesToUse as PropertyData[]);
    setInsights(comparisonInsights);
    setReportGenerated(true);
    
    toast({
      title: "Report Generated!",
      description: `Your comparison report for ${propertiesToUse.length} properties is ready. You can view and download it below.`,
    });
    
    setIsProcessing(false);
  };

  const handleNewReport = () => {
    setReportGenerated(false);
    setPropertyData([]);
    setInsights([]);
    setEmail("");
    setName("");
    setPropertyLinks([""]);
    setChatStarted(false);
    setChatProperties([]);
  };

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
            Get a detailed comparison report for up to 6 properties delivered straight to your inbox.
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4">
          {reportGenerated ? (
            <div className="max-w-5xl mx-auto space-y-6">
              <Button variant="outline" onClick={handleNewReport} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Generate New Report
              </Button>
              <ComparisonReport
                properties={propertyData}
                insights={insights}
                customerName={name}
              />
            </div>
          ) : !chatStarted ? (
            // Chat interface
            <div className="max-w-3xl mx-auto space-y-8">
              <Card className="card-gradient shadow-card">
                <CardHeader>
                  <CardTitle>Find Your Properties</CardTitle>
                  <CardDescription>
                    Answer a few questions to get personalized property recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PropertyChatInterface
                    onPropertiesSelected={handlePropertiesFromChat}
                    userEmail={email}
                    userName={name}
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            // Comparison form after chat
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Service Info Card */}
              <Card className="card-gradient shadow-card border-accent/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Paid Service</h3>
                        <p className="text-sm text-muted-foreground">
                          $5.00 per comparison report
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email Delivery</h3>
                        <p className="text-sm text-muted-foreground">
                          Report sent to your email
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">2-24 Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          Delivery after payment
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Properties */}
              <Card className="card-gradient shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-accent" />
                    Your Selected Properties ({chatProperties.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {chatProperties.map((prop) => (
                      <div
                        key={prop.id}
                        className="flex items-start justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {prop.address}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${prop.price.toLocaleString()} •{" "}
                            {prop.bedrooms} bed • {prop.sqft.toLocaleString()} sqft
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Form Card */}
              <Card className="card-gradient shadow-card">
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>
                    We'll send the comparison report to your email address
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold text-foreground">Total</p>
                        <p className="text-sm text-muted-foreground">
                          Comparison report for {chatProperties.length} {chatProperties.length === 1 ? "property" : "properties"}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-foreground">$5.00</p>
                    </div>

                    <Button
                      onClick={handlePayment}
                      disabled={!isFormValid || isProcessing}
                      className="w-full h-12 text-base gold-gradient text-foreground hover:opacity-90 transition-opacity shadow-gold"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mr-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Pay with PayPal - Generate Report
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-3">
                      By proceeding, you agree to receive the comparison report via email.
                      Report will be delivered within 2-24 hours after payment confirmation.
                    </p>
                  </div>

                  {/* Back to Chat */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => setChatStarted(false)}
                      className="w-full"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Recommendations
                    </Button>
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
