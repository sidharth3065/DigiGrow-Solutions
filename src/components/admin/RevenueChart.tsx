"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", revenue: 4000, mrr: 2400 },
  { name: "Feb", revenue: 3000, mrr: 1398 },
  { name: "Mar", revenue: 2000, mrr: 9800 },
  { name: "Apr", revenue: 2780, mrr: 3908 },
  { name: "May", revenue: 1890, mrr: 4800 },
  { name: "Jun", revenue: 2390, mrr: 3800 },
  { name: "Jul", revenue: 3490, mrr: 4300 },
];

export default function RevenueChart() {
  if (typeof window === "undefined") {
    return <div className="animate-pulse skeleton h-[300px] w-full rounded-xl" />;
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.5} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E676" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--muted)", 
              border: "1px solid var(--border)", 
              borderRadius: "12px",
              color: "var(--foreground)" 
            }} 
            itemStyle={{ color: "var(--foreground)" }}
            formatter={(value) => [`$${value ?? ""}`, undefined]}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="var(--primary)" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
          <Area 
            type="monotone" 
            dataKey="mrr" 
            stroke="#00E676" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorMRR)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
