import { useMemo } from "react";
import { getAllCities, CityData } from "@/data/propertyData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Home, TrendingUp, TrendingDown } from "lucide-react";

const MedianPricesTicker = () => {
  const cities = useMemo(() => {
    return getAllCities().sort((a, b) => b.medianHomePrice - a.medianHomePrice);
  }, []);

  const averagePrice = useMemo(() => {
    const total = cities.reduce((sum, city) => sum + city.medianHomePrice, 0);
    return total / cities.length;
  }, [cities]);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  const getPriceColor = (price: number) => {
    if (price >= 800000) return "text-rose-500";
    if (price >= 500000) return "text-amber-500";
    return "text-emerald-500";
  };

  return (
    <section className="py-8 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-display font-semibold text-foreground">
              Median Home Prices by City
            </h2>
          </div>
          <div className="text-sm text-muted-foreground">
            Avg: <span className="font-semibold text-foreground">{formatPrice(averagePrice)}</span>
          </div>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 pb-3">
            {cities.map((city) => (
              <CityPriceCard 
                key={`${city.state}-${city.name}`} 
                city={city} 
                formatPrice={formatPrice}
                getPriceColor={getPriceColor}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

interface CityPriceCardProps {
  city: CityData;
  formatPrice: (price: number) => string;
  getPriceColor: (price: number) => string;
}

const CityPriceCard = ({ city, formatPrice, getPriceColor }: CityPriceCardProps) => {
  const isHighAppreciation = city.annualAppreciation >= 5;
  
  return (
    <div className="flex-shrink-0 w-48 p-4 rounded-lg bg-background border border-border hover:border-accent/50 hover:shadow-md transition-all duration-200 cursor-default">
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{city.name}</p>
          <p className="text-xs text-muted-foreground">{city.state}</p>
        </div>
        {isHighAppreciation ? (
          <TrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        ) : (
          <TrendingDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </div>
      <p className={`text-xl font-bold ${getPriceColor(city.medianHomePrice)}`}>
        {formatPrice(city.medianHomePrice)}
      </p>
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        <span>{city.annualAppreciation}% growth</span>
        <span>•</span>
        <span>{city.rentalYield}% yield</span>
      </div>
    </div>
  );
};

export default MedianPricesTicker;
