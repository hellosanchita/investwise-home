import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CostBreakdownProps {
  breakdown: {
    propertyTax: number;
    insurance: number;
    maintenance: number;
    management: number;
    mortgage: number;
  };
}

const COLORS = [
  "hsl(35, 45%, 65%)",    // gold
  "hsl(222, 47%, 25%)",   // navy light
  "hsl(142, 70%, 45%)",   // success
  "hsl(38, 92%, 50%)",    // warning
  "hsl(222, 47%, 15%)",   // navy
];

const CostBreakdown = ({ breakdown }: CostBreakdownProps) => {
  const data = [
    { name: "Mortgage", value: breakdown.mortgage },
    { name: "Property Tax", value: breakdown.propertyTax },
    { name: "Insurance", value: breakdown.insurance },
    { name: "Maintenance", value: breakdown.maintenance },
    { name: "Management", value: breakdown.management },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <div className="w-full lg:w-1/2">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(214, 32%, 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px hsl(222 47% 11% / 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full lg:w-1/2 space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(item.value)}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                ({((item.value / total) * 100).toFixed(0)}%)
              </span>
            </div>
          </div>
        ))}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Total Annual</span>
            <span className="text-sm font-bold text-accent">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown;
