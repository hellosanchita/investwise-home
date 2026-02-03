import { useState, useMemo, useEffect } from "react";
import { DollarSign, MapPin, Building, Home } from "lucide-react";
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
import { statesData, CityData } from "@/data/propertyData";

interface InvestmentFormProps {
  onAnalyze: (investment: number, propertyPrice: number, city: CityData) => void;
  isLoading: boolean;
  onFormChange?: (propertyPrice: number, investment: number) => void;
}

const InvestmentForm = ({ onAnalyze, isLoading, onFormChange }: InvestmentFormProps) => {
  const [investment, setInvestment] = useState<string>("100,000");
  const [propertyPrice, setPropertyPrice] = useState<string>("500,000");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const cities = useMemo(() => {
    const state = statesData.find((s) => s.abbreviation === selectedState);
    return state?.cities || [];
  }, [selectedState]);

  const selectedCityData = useMemo(() => {
    return cities.find((c) => c.name === selectedCity);
  }, [cities, selectedCity]);

  // Auto-populate property price when city is selected
  useEffect(() => {
    if (selectedCityData) {
      setPropertyPrice(selectedCityData.medianHomePrice.toLocaleString());
    }
  }, [selectedCityData]);

  // Notify parent of form changes for loan calculation
  useEffect(() => {
    const price = parseInt(propertyPrice.replace(/,/g, "")) || 0;
    const inv = parseInt(investment.replace(/,/g, "")) || 0;
    onFormChange?.(price, inv);
  }, [propertyPrice, investment, onFormChange]);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cityData = cities.find((c) => c.name === selectedCity);
    if (cityData && investment && propertyPrice) {
      onAnalyze(
        parseInt(investment.replace(/,/g, "")),
        parseInt(propertyPrice.replace(/,/g, "")),
        cityData
      );
    }
  };

  const formatCurrency = (value: string) => {
    const num = value.replace(/[^0-9]/g, "");
    return num ? parseInt(num).toLocaleString() : "";
  };

  const isValid = investment && propertyPrice && selectedState && selectedCity;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="propertyPrice" className="text-sm font-medium text-foreground flex items-center gap-2">
          <Home className="w-4 h-4 text-accent" />
          Target Property Price
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            $
          </span>
          <Input
            id="propertyPrice"
            type="text"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(formatCurrency(e.target.value))}
            placeholder="500,000"
            className="pl-8 h-12 text-lg font-medium bg-background border-border focus:border-accent focus:ring-accent/20"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Estimated purchase price of the property
        </p>
      </div>

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
            onChange={(e) => setInvestment(formatCurrency(e.target.value))}
            placeholder="100,000"
            className="pl-8 h-12 text-lg font-medium bg-background border-border focus:border-accent focus:ring-accent/20"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Your total cash investment (down payment + closing costs)
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
