import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StateTaxData {
  state: string;
  salesTax: number;
  propertyTax: number;
  incomeTax: number;
}

const stateTaxData: StateTaxData[] = [
  { state: "AL", salesTax: 4.0, propertyTax: 0.41, incomeTax: 5.0 },
  { state: "AK", salesTax: 0, propertyTax: 1.19, incomeTax: 0 },
  { state: "AZ", salesTax: 5.6, propertyTax: 0.60, incomeTax: 2.5 },
  { state: "AR", salesTax: 6.5, propertyTax: 0.62, incomeTax: 4.9 },
  { state: "CA", salesTax: 7.25, propertyTax: 0.74, incomeTax: 9.3 },
  { state: "CO", salesTax: 2.9, propertyTax: 0.55, incomeTax: 4.4 },
  { state: "CT", salesTax: 6.35, propertyTax: 2.14, incomeTax: 6.99 },
  { state: "DE", salesTax: 0, propertyTax: 0.57, incomeTax: 6.6 },
  { state: "FL", salesTax: 6.0, propertyTax: 0.91, incomeTax: 0 },
  { state: "GA", salesTax: 4.0, propertyTax: 0.92, incomeTax: 5.49 },
  { state: "HI", salesTax: 4.0, propertyTax: 0.28, incomeTax: 11.0 },
  { state: "ID", salesTax: 6.0, propertyTax: 0.69, incomeTax: 5.8 },
  { state: "IL", salesTax: 6.25, propertyTax: 2.27, incomeTax: 4.95 },
  { state: "IN", salesTax: 7.0, propertyTax: 0.85, incomeTax: 3.15 },
  { state: "IA", salesTax: 6.0, propertyTax: 1.57, incomeTax: 6.0 },
  { state: "KS", salesTax: 6.5, propertyTax: 1.41, incomeTax: 5.7 },
  { state: "KY", salesTax: 6.0, propertyTax: 0.86, incomeTax: 4.5 },
  { state: "LA", salesTax: 4.45, propertyTax: 0.55, incomeTax: 4.25 },
  { state: "ME", salesTax: 5.5, propertyTax: 1.36, incomeTax: 7.15 },
  { state: "MD", salesTax: 6.0, propertyTax: 1.09, incomeTax: 5.75 },
  { state: "MA", salesTax: 6.25, propertyTax: 1.23, incomeTax: 5.0 },
  { state: "MI", salesTax: 6.0, propertyTax: 1.54, incomeTax: 4.25 },
  { state: "MN", salesTax: 6.88, propertyTax: 1.12, incomeTax: 9.85 },
  { state: "MS", salesTax: 7.0, propertyTax: 0.81, incomeTax: 5.0 },
  { state: "MO", salesTax: 4.23, propertyTax: 0.97, incomeTax: 4.95 },
  { state: "MT", salesTax: 0, propertyTax: 0.84, incomeTax: 6.75 },
  { state: "NE", salesTax: 5.5, propertyTax: 1.73, incomeTax: 6.84 },
  { state: "NV", salesTax: 6.85, propertyTax: 0.60, incomeTax: 0 },
  { state: "NH", salesTax: 0, propertyTax: 2.18, incomeTax: 0 },
  { state: "NJ", salesTax: 6.63, propertyTax: 2.49, incomeTax: 10.75 },
  { state: "NM", salesTax: 5.13, propertyTax: 0.80, incomeTax: 5.9 },
  { state: "NY", salesTax: 4.0, propertyTax: 1.69, incomeTax: 6.85 },
  { state: "NC", salesTax: 4.75, propertyTax: 0.80, incomeTax: 4.75 },
  { state: "ND", salesTax: 5.0, propertyTax: 0.98, incomeTax: 2.9 },
  { state: "OH", salesTax: 5.75, propertyTax: 1.59, incomeTax: 3.99 },
  { state: "OK", salesTax: 4.5, propertyTax: 0.90, incomeTax: 4.75 },
  { state: "OR", salesTax: 0, propertyTax: 0.97, incomeTax: 9.9 },
  { state: "PA", salesTax: 6.0, propertyTax: 1.58, incomeTax: 3.07 },
  { state: "RI", salesTax: 7.0, propertyTax: 1.63, incomeTax: 5.99 },
  { state: "SC", salesTax: 6.0, propertyTax: 0.57, incomeTax: 6.5 },
  { state: "SD", salesTax: 4.5, propertyTax: 1.31, incomeTax: 0 },
  { state: "TN", salesTax: 7.0, propertyTax: 0.71, incomeTax: 0 },
  { state: "TX", salesTax: 6.25, propertyTax: 1.90, incomeTax: 0 },
  { state: "UT", salesTax: 6.1, propertyTax: 0.63, incomeTax: 4.85 },
  { state: "VT", salesTax: 6.0, propertyTax: 1.90, incomeTax: 8.75 },
  { state: "VA", salesTax: 5.3, propertyTax: 0.82, incomeTax: 5.75 },
  { state: "WA", salesTax: 6.5, propertyTax: 0.98, incomeTax: 0 },
  { state: "WV", salesTax: 6.0, propertyTax: 0.58, incomeTax: 6.5 },
  { state: "WI", salesTax: 5.0, propertyTax: 1.85, incomeTax: 7.65 },
  { state: "WY", salesTax: 4.0, propertyTax: 0.61, incomeTax: 0 },
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
            <div className="h-[400px] w-full overflow-x-auto">
              <div className="min-w-[1200px] h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stateTaxData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis 
                      dataKey="state" 
                      className="text-xs fill-muted-foreground"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                      interval={0}
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
                      stackId="taxes"
                      fill="hsl(var(--accent))" 
                      name="salesTax"
                    />
                    <Bar 
                      dataKey="propertyTax" 
                      stackId="taxes"
                      fill="hsl(var(--primary))" 
                      name="propertyTax"
                    />
                    <Bar 
                      dataKey="incomeTax" 
                      stackId="taxes"
                      fill="hsl(var(--success))" 
                      radius={[4, 4, 0, 0]}
                      name="incomeTax"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StateTaxChart;
