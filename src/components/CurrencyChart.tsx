
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CurrencyChartProps {
  fromCurrency: string;
  toCurrency: string;
}

const CurrencyChart = ({ fromCurrency, toCurrency }: CurrencyChartProps) => {
  const [timeframe, setTimeframe] = useState("7d");
  const [chartData, setChartData] = useState<any[]>([]);

  // Mock historical data - in real app, fetch from API
  const generateMockData = (days: number) => {
    const data = [];
    const baseRate = 0.85; // EUR rate for example
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Generate some realistic fluctuation
      const fluctuation = (Math.random() - 0.5) * 0.1;
      const rate = baseRate + fluctuation;
      
      data.push({
        date: date.toLocaleDateString(),
        rate: parseFloat(rate.toFixed(4)),
      });
    }
    
    return data;
  };

  useEffect(() => {
    const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
    const mockData = generateMockData(days);
    setChartData(mockData);
  }, [timeframe, fromCurrency, toCurrency]);

  return (
    <div className="glass rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Historical Rates</h3>
        <div className="flex gap-2">
          {["7d", "30d", "90d"].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                timeframe === period
                  ? "bg-primary text-black"
                  : "glass hover:bg-white/10"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(156, 163, 175, 0.1)' }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(156, 163, 175, 0.1)' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                border: '1px solid rgba(156, 163, 175, 0.2)',
                borderRadius: '8px',
                color: '#ffffff'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#4ADE80" 
              strokeWidth={2}
              dot={{ fill: '#4ADE80', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#4ADE80', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CurrencyChart;
