import { useState, useMemo } from "react";
import { DollarSign, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statesData, StateData, CityData } from "@/data/propertyData";

interface InvestmentFormProps {
  onAnalyze: (investment: number, city: CityData) => void;
  isLoading: boolean;
}

const InvestmentForm = ({ onAnalyze, isLoading }: InvestmentFormProps) => {
  const [investment, setInvestment] = useState<string>("100000");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const cities = useMemo(() => {
    const state = statesData.find((s) => s.abbreviation === selectedState);
    return state?.cities || [];
  }, [selectedState]);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cityData = cities.find((c) => c.name === selectedCity);
    if (cityData && investment) {
      onAnalyze(parseInt(investment.replace(/,/g, "")), cityData);
    }
  };

  const formatInvestment = (value: string) => {
    const num = value.replace(/[^0-9]/g, "");
    return num ? parseInt(num).toLocaleString() : "";
  };

  const isValid = investment && selectedState && selectedCity;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="investment" className="text-sm font-medium text-foreground flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-accent" />
          Investment Amount
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            $
          </span>
          <Input
            id="investment"
            type="text"
            value={investment}
            onChange={(e) => setInvestment(formatInvestment(e.target.value))}
            placeholder="100,000"
            className="pl-8 h-12 text-lg font-medium bg-background border-border focus:border-accent focus:ring-accent/20"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          This covers your down payment (20%) and closing costs
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="state" className="text-sm font-medium text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          State
        </Label>
        <Select value={selectedState} onValueChange={handleStateChange}>
          <SelectTrigger id="state" className="h-12 bg-background border-border focus:border-accent focus:ring-accent/20">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border z-50">
            {statesData.map((state) => (
              <SelectItem key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="text-sm font-medium text-foreground flex items-center gap-2">
          <Building className="w-4 h-4 text-accent" />
          City
        </Label>
        <Select
          value={selectedCity}
          onValueChange={setSelectedCity}
          disabled={!selectedState}
        >
          <SelectTrigger id="city" className="h-12 bg-background border-border focus:border-accent focus:ring-accent/20">
            <SelectValue placeholder={selectedState ? "Select a city" : "First select a state"} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border z-50">
            {cities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full h-12 text-base font-semibold bg-accent hover:bg-gold-dark text-accent-foreground shadow-gold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
            Analyzing...
          </span>
        ) : (
          "Analyze Investment"
        )}
      </Button>
    </form>
  );
};

export default InvestmentForm;
