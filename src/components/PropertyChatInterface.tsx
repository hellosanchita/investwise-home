import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PropertyData } from "@/utils/mockPropertyData";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface PropertySuggestion extends PropertyData {
  selected?: boolean;
}

interface PropertyChatInterfaceProps {
  onPropertiesSelected: (properties: PropertySuggestion[]) => void;
  userEmail?: string;
  userName?: string;
}

const budgetRanges = [
  { label: "$200k - $400k", min: 200000, max: 400000 },
  { label: "$400k - $600k", min: 400000, max: 600000 },
  { label: "$600k - $800k", min: 600000, max: 800000 },
  { label: "$800k+", min: 800000, max: 1500000 },
];

const locations = [
  "Austin, TX",
  "Denver, CO",
  "Phoenix, AZ",
  "Seattle, WA",
  "Portland, OR",
  "Nashville, TN",
];

const investmentTypes = [
  "Investment Property",
  "Primary Residence",
  "Vacation Home",
  "Not sure yet",
];

export const PropertyChatInterface = ({
  onPropertiesSelected,
  userEmail,
  userName,
}: PropertyChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi${userName ? ` ${userName}` : ""}! 👋 I'm here to help you find the perfect properties. Let's start with your budget. What price range are you looking for?`,
    },
  ]);
  const [currentStep, setCurrentStep] = useState<
    "budget" | "location" | "type" | "review" | "selected"
  >("budget");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [suggestedProperties, setSuggestedProperties] = useState<
    PropertySuggestion[]
  >([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateMockProperties = (
    budget: string,
    location: string,
    type: string
  ): PropertySuggestion[] => {
    const budgetRange = budgetRanges.find((b) => b.label === budget);
    const basePrice =
      budgetRange?.min || 300000 +
      Math.random() * (budgetRange?.max - budgetRange?.min || 500000);

    const properties: PropertySuggestion[] = [
      {
        id: `mock-1`,
        url: "https://zillow.com/property-1",
        address: `123 Main St, ${location}`,
        price: Math.round(basePrice),
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        lotSize: 5000,
        pricePerSqft: Math.round(basePrice / 1800),
        yearBuilt: 2015,
        propertyType: type === "Investment Property" ? "Multi-Family" : "Single Family",
        hoaFees: 0,
        monthlyTax: Math.round((basePrice * 0.012) / 12),
        monthlyInsurance: Math.round((basePrice * 0.004) / 12),
        estimatedRent: Math.round(basePrice * 0.007),
        daysOnMarket: Math.floor(Math.random() * 60),
        source: "zillow",
        selected: false,
      },
      {
        id: `mock-2`,
        url: "https://realtor.com/property-2",
        address: `456 Oak Ave, ${location}`,
        price: Math.round(basePrice * 1.1),
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2200,
        lotSize: 7000,
        pricePerSqft: Math.round((basePrice * 1.1) / 2200),
        yearBuilt: 2018,
        propertyType: "Single Family",
        hoaFees: 150,
        monthlyTax: Math.round(((basePrice * 1.1) * 0.012) / 12),
        monthlyInsurance: Math.round(((basePrice * 1.1) * 0.004) / 12),
        estimatedRent: Math.round(basePrice * 1.1 * 0.007),
        daysOnMarket: Math.floor(Math.random() * 60),
        source: "realtor",
        selected: false,
      },
      {
        id: `mock-3`,
        url: "https://redfin.com/property-3",
        address: `789 Pine Rd, ${location}`,
        price: Math.round(basePrice * 0.95),
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 2000,
        lotSize: 6000,
        pricePerSqft: Math.round((basePrice * 0.95) / 2000),
        yearBuilt: 2012,
        propertyType: "Townhouse",
        hoaFees: 200,
        monthlyTax: Math.round(((basePrice * 0.95) * 0.012) / 12),
        monthlyInsurance: Math.round(((basePrice * 0.95) * 0.004) / 12),
        estimatedRent: Math.round(basePrice * 0.95 * 0.007),
        daysOnMarket: Math.floor(Math.random() * 60),
        source: "redfin",
        selected: false,
      },
      {
        id: `mock-4`,
        url: "https://zillow.com/property-4",
        address: `321 Elm Dr, ${location}`,
        price: Math.round(basePrice * 1.15),
        bedrooms: 5,
        bathrooms: 3.5,
        sqft: 2500,
        lotSize: 8000,
        pricePerSqft: Math.round((basePrice * 1.15) / 2500),
        yearBuilt: 2020,
        propertyType: "Single Family",
        hoaFees: 0,
        monthlyTax: Math.round(((basePrice * 1.15) * 0.012) / 12),
        monthlyInsurance: Math.round(((basePrice * 1.15) * 0.004) / 12),
        estimatedRent: Math.round(basePrice * 1.15 * 0.007),
        daysOnMarket: Math.floor(Math.random() * 60),
        source: "zillow",
        selected: false,
      },
    ];

    return properties;
  };

  const handleBudgetSelect = (budget: string) => {
    setSelectedBudget(budget);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: budget },
      {
        role: "assistant",
        content: `Great! ${budget} is a solid range. Now, where would you like to invest? Pick a location:`,
      },
    ]);
    setCurrentStep("location");
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: location },
      {
        role: "assistant",
        content: `Perfect! ${location} is a great market. Last question: are you looking for an investment property or a primary residence?`,
      },
    ]);
    setCurrentStep("type");
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: type },
      {
        role: "assistant",
        content: `Excellent! Based on your preferences, here are 4 recommended properties. Select up to 4 to compare:`,
      },
    ]);

    setIsLoading(true);
    setTimeout(() => {
      const properties = generateMockProperties(selectedBudget, selectedLocation, type);
      setSuggestedProperties(properties);
      setCurrentStep("review");
      setIsLoading(false);
    }, 1500);
  };

  const togglePropertySelection = (propertyId: string) => {
    setSelectedProperties((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      } else if (prev.length < 4) {
        return [...prev, propertyId];
      }
      return prev;
    });
  };

  const handleConfirmSelection = () => {
    const selected = suggestedProperties.filter((p) =>
      selectedProperties.includes(p.id)
    );
    onPropertiesSelected(selected);
  };

  return (
    <div className="space-y-4">
      {/* Chat Messages */}
      <Card className="bg-card border-border p-4 h-96 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Finding properties...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </Card>

      {/* Step Options */}
      {currentStep === "budget" && (
        <div className="grid grid-cols-2 gap-2">
          {budgetRanges.map((range) => (
            <Button
              key={range.label}
              variant="outline"
              onClick={() => handleBudgetSelect(range.label)}
              className="text-sm"
            >
              {range.label}
            </Button>
          ))}
        </div>
      )}

      {currentStep === "location" && (
        <div className="grid grid-cols-2 gap-2">
          {locations.map((location) => (
            <Button
              key={location}
              variant="outline"
              onClick={() => handleLocationSelect(location)}
              className="text-sm"
            >
              {location}
            </Button>
          ))}
        </div>
      )}

      {currentStep === "type" && (
        <div className="grid grid-cols-2 gap-2">
          {investmentTypes.map((type) => (
            <Button
              key={type}
              variant="outline"
              onClick={() => handleTypeSelect(type)}
              className="text-sm"
            >
              {type}
            </Button>
          ))}
        </div>
      )}

      {currentStep === "review" && suggestedProperties.length > 0 && (
        <div className="space-y-4">
          <div className="grid gap-3">
            {suggestedProperties.map((prop) => (
              <button
                key={prop.id}
                onClick={() => togglePropertySelection(prop.id)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  selectedProperties.includes(prop.id)
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {prop.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ${prop.price.toLocaleString()} •{" "}
                      {prop.bedrooms} bed • {prop.sqft.toLocaleString()} sqft
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedProperties.includes(prop.id)}
                    onChange={() => {}}
                    className="w-5 h-5 rounded border-input"
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="text-sm text-muted-foreground text-center">
            {selectedProperties.length} of 4 selected
          </div>

          <Button
            onClick={handleConfirmSelection}
            disabled={selectedProperties.length === 0}
            className="w-full gold-gradient text-foreground"
          >
            Continue with {selectedProperties.length} Selected
          </Button>
        </div>
      )}
    </div>
  );
};
