import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

interface YearlyProjection {
  year: number;
  propertyValue: number;
  equity: number;
  cumulativeIncome: number;
  cumulativeExpenses: number;
}

interface ProjectionChartProps {
  data: YearlyProjection[];
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
};

const ProjectionChart = ({ data }: ProjectionChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(35, 45%, 65%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(35, 45%, 65%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }}
          axisLine={{ stroke: "hsl(214, 32%, 91%)" }}
          tickLine={{ stroke: "hsl(214, 32%, 91%)" }}
        />
        <YAxis
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }}
          axisLine={{ stroke: "hsl(214, 32%, 91%)" }}
          tickLine={{ stroke: "hsl(214, 32%, 91%)" }}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(value),
            name,
          ]}
          contentStyle={{
            backgroundColor: "hsl(0, 0%, 100%)",
            border: "1px solid hsl(214, 32%, 91%)",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px hsl(222 47% 11% / 0.1)",
          }}
          labelStyle={{ color: "hsl(222, 47%, 11%)", fontWeight: 600 }}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
        />
        <Area
          type="monotone"
          dataKey="equity"
          name="Equity"
          fill="url(#equityGradient)"
          stroke="hsl(35, 45%, 65%)"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="propertyValue"
          name="Property Value"
          stroke="hsl(222, 47%, 15%)"
          strokeWidth={2}
          dot={{ fill: "hsl(222, 47%, 15%)", strokeWidth: 0, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(222, 47%, 15%)", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="cumulativeIncome"
          name="Total Income"
          stroke="hsl(142, 70%, 45%)"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: "hsl(142, 70%, 45%)", strokeWidth: 0, r: 3 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ProjectionChart;
