import { useState } from "react";
import { Building2, TrendingUp, Shield, LineChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import InvestmentForm from "@/components/InvestmentForm";
import AnalysisResults from "@/components/AnalysisResults";
import { calculateInvestmentProjection, CityData } from "@/data/propertyData";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<ReturnType<typeof calculateInvestmentProjection> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (investment: number, city: CityData) => {
    setIsLoading(true);
    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    const data = calculateInvestmentProjection(investment, city);
    setAnalysisData(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-gold-light text-sm font-medium mb-6 animate-fade-in">
              <TrendingUp className="w-4 h-4" />
              Smart Real Estate Analysis
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-slide-up">
              Make Smarter{" "}
              <span className="text-gradient-gold">Property Investments</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Analyze potential returns, understand costs, and project your 10-year 
              investment performance based on real market data.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="relative h-16 -mb-1">
          <svg
            className="absolute bottom-0 w-full h-16"
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
          >
            <path
              d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z"
              fill="hsl(210, 20%, 98%)"
            />
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto -mt-20 relative z-10">
            {[
              {
                icon: LineChart,
                title: "10-Year Projections",
                description: "Detailed year-by-year analysis of your investment growth",
              },
              {
                icon: Building2,
                title: "City-Specific Data",
                description: "Calculations based on local property trends and rates",
              },
              {
                icon: Shield,
                title: "Complete Cost Analysis",
                description: "All expenses included: taxes, insurance, maintenance & more",
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="card-gradient shadow-card hover:shadow-card-hover transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-8">
                  <Card className="card-gradient shadow-card">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-display font-bold text-foreground mb-2">
                        Investment Calculator
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Enter your investment details to see projected returns
                      </p>
                      <InvestmentForm onAnalyze={handleAnalyze} isLoading={isLoading} />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-8">
                {analysisData ? (
                  <AnalysisResults data={analysisData} />
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      Ready to Analyze
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Select a state and city, enter your investment amount, and click "Analyze Investment" to see your projected returns.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 PropertyInvest Analyzer. For informational purposes only.</p>
            <p className="mt-1">
              All projections are estimates and should not be considered financial advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
