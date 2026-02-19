import { TrendingUp, Home, Wallet, PiggyBank, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ProjectionChart from "./ProjectionChart";
import CostBreakdown from "./CostBreakdown";

interface YearlyProjection {
  year: number;
  propertyValue: number;
  annualRent: number;
  totalExpenses: number;
  netIncome: number;
  cumulativeIncome: number;
  cumulativeExpenses: number;
  equity: number;
  roi: string;
}

interface AnalysisData {
  initialInvestment: number;
  propertyValue: number;
  loanAmount: number;
  closingCosts: number;
  monthlyMortgage: number;
  yearlyProjections: YearlyProjection[];
  annualExpenseBreakdown: {
    propertyTax: number;
    insurance: number;
    maintenance: number;
    management: number;
    mortgage: number;
  };
  cityData: {
    name: string;
    annualAppreciation: number;
    rentalYield: number;
  };
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const finalYear = data.yearlyProjections[data.yearlyProjections.length - 1];
  const totalProfit = finalYear.equity - data.initialInvestment + finalYear.cumulativeIncome - finalYear.cumulativeExpenses + data.initialInvestment;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-gradient shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Home className="w-4 h-4 text-accent" />
              Property Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(data.propertyValue)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {data.cityData.annualAppreciation}% annual appreciation
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="w-4 h-4 text-accent" />
              Year 10 Equity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(finalYear.equity)}
            </p>
            <p className="text-xs text-success mt-1">
              +{formatCurrency(finalYear.equity - data.initialInvestment)} gain
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-accent" />
              Total Rental Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(finalYear.cumulativeIncome)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Over 10 years
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              Total ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">
              {finalYear.roi}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Return on investment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-gradient shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-display">
              10-Year Investment Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectionChart data={data.yearlyProjections} />
          </CardContent>
        </Card>

        <Card className="card-gradient shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-display">
              Annual Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CostBreakdown breakdown={data.annualExpenseBreakdown} />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Projection Table */}
      <Card className="card-gradient shadow-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-display">
            Year-by-Year Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TooltipProvider delayDuration={200}>
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  {[
                    { label: "Year", align: "text-left", tip: "The projection year, starting from year 1 after purchase." },
                    { label: "Property Value", align: "text-right", tip: "Estimated market value based on the city's annual appreciation rate compounded each year." },
                    { label: "Annual Rent", align: "text-right", tip: "Projected gross rental income for that year, based on the city's rental yield applied to the current property value." },
                    { label: "Expenses", align: "text-right", tip: "Total annual costs including mortgage payments, property tax, insurance, maintenance, and property management fees." },
                    { label: "Net Income", align: "text-right", tip: "Annual Rent minus Expenses. A positive value means the property generates cash flow; negative means you pay out of pocket." },
                    { label: "Equity", align: "text-right", tip: "Your ownership stake: current property value minus remaining loan balance. Grows through appreciation and mortgage paydown." },
                    { label: "ROI", align: "text-right", tip: "Return on Investment: total profit (equity gain + cumulative net income) divided by your initial cash investment, expressed as a percentage." },
                  ].map((col) => (
                    <th key={col.label} className={`px-4 py-3 ${col.align} font-semibold text-muted-foreground`}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1 cursor-help">
                            {col.label}
                            <Info className="w-3.5 h-3.5 text-muted-foreground/60" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[250px] text-xs">
                          {col.tip}
                        </TooltipContent>
                      </Tooltip>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.yearlyProjections.map((year, index) => (
                  <tr
                    key={year.year}
                    className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{year.year}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(year.propertyValue)}</td>
                    <td className="px-4 py-3 text-right text-success">{formatCurrency(year.annualRent)}</td>
                    <td className="px-4 py-3 text-right text-destructive">{formatCurrency(year.totalExpenses)}</td>
                    <td className={`px-4 py-3 text-right font-medium ${year.netIncome >= 0 ? "text-success" : "text-destructive"}`}>
                      {formatCurrency(year.netIncome)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(year.equity)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-accent">{year.roi}%</td>
                  </tr>
                ))}
              </tbody>
              </TooltipProvider>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-warning/30 bg-warning/5">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-semibold text-warning">Important Disclaimer</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                These projections are estimates based on current market trends and historical data for {data.cityData.name}. 
                Actual results may vary significantly due to market fluctuations, economic conditions, property-specific factors, 
                and unforeseen expenses. This analysis assumes a 20% down payment, 6.5% mortgage rate, and 30-year fixed loan term. 
                Property taxes, insurance rates, and rental yields are based on city averages and may differ for individual properties. 
                Consult with a qualified financial advisor, real estate professional, and tax specialist before making any investment decisions. 
                Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
