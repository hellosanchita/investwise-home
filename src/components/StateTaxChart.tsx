import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StateTaxData {
  state: string;
  salesTax: number;
  propertyTax: number;
  incomeTax: number;
}

const stateTaxData: StateTaxData[] = [
  { state: "CA", salesTax: 7.25, propertyTax: 0.74, incomeTax: 9.3 },
  { state: "TX", salesTax: 6.25, propertyTax: 1.90, incomeTax: 0 },
  { state: "FL", salesTax: 6.0, propertyTax: 0.91, incomeTax: 0 },
  { state: "NY", salesTax: 4.0, propertyTax: 1.69, incomeTax: 6.85 },
  { state: "AZ", salesTax: 5.6, propertyTax: 0.60, incomeTax: 2.5 },
  { state: "CO", salesTax: 2.9, propertyTax: 0.55, incomeTax: 4.4 },
  { state: "GA", salesTax: 4.0, propertyTax: 0.92, incomeTax: 5.49 },
  { state: "NC", salesTax: 4.75, propertyTax: 0.80, incomeTax: 4.75 },
];

const StateTaxChart = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <Card className="card-gradient shadow-card max-w-5xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-display">
              State Tax Comparison
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Compare sales tax, property tax, and state income tax rates across supported states
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stateTaxData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="state" 
                    className="text-xs fill-muted-foreground"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs fill-muted-foreground"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                    formatter={(value: number, name: string) => [
                      `${value}%`,
                      name === 'salesTax' ? 'Sales Tax' : 
                      name === 'propertyTax' ? 'Property Tax' : 'State Income Tax'
                    ]}
                  />
                  <Legend 
                    formatter={(value) => 
                      value === 'salesTax' ? 'Sales Tax' : 
                      value === 'propertyTax' ? 'Property Tax' : 'State Income Tax'
                    }
                    wrapperStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar 
                    dataKey="salesTax" 
                    fill="hsl(var(--accent))" 
                    radius={[4, 4, 0, 0]}
                    name="salesTax"
                  />
                  <Bar 
                    dataKey="propertyTax" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    name="propertyTax"
                  />
                  <Bar 
                    dataKey="incomeTax" 
                    fill="hsl(var(--success))" 
                    radius={[4, 4, 0, 0]}
                    name="incomeTax"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StateTaxChart;
