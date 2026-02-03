import { useState, useMemo } from "react";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface MortgageCalculatorProps {
  loanAmount: number;
}

const MortgageCalculator = ({ loanAmount }: MortgageCalculatorProps) => {
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  const calculations = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (principal <= 0 || interestRate <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
    }

    const monthlyPayment =
      principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="card-gradient shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Calculator className="w-5 h-5 text-accent" />
          Mortgage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Loan Amount (calculated) */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-accent" />
            Loan Amount
          </Label>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-lg font-semibold text-foreground">
              ${formatNumber(loanAmount)}
            </p>
            <p className="text-xs text-muted-foreground">
              Property Price − Investment
            </p>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Percent className="w-4 h-4 text-accent" />
              Interest Rate
            </Label>
            <span className="text-sm font-semibold text-foreground">{interestRate}%</span>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            min={1}
            max={12}
            step={0.25}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>12%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              Loan Term
            </Label>
            <span className="text-sm font-semibold text-foreground">{loanTerm} years</span>
          </div>
          <Slider
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
            min={10}
            max={30}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10 years</span>
            <span>30 years</span>
          </div>
        </div>

        {/* Results */}
        <div className="pt-4 border-t border-border space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
            <p className="text-3xl font-bold text-accent">
              {formatCurrency(calculations.monthlyPayment)}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Payment</p>
              <p className="text-sm font-semibold text-foreground">
                {formatCurrency(calculations.totalPayment)}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
              <p className="text-sm font-semibold text-destructive">
                {formatCurrency(calculations.totalInterest)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;
