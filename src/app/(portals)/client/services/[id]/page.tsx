"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock metrics data specifically generated for a requested service id
const mockMetrics = [
  { name: "Week 1", traffic: 4000, conversions: 240, spend: 2400 },
  { name: "Week 2", traffic: 3000, conversions: 139, spend: 2210 },
  { name: "Week 3", traffic: 2000, conversions: 980, spend: 2290 },
  { name: "Week 4", traffic: 2780, conversions: 390, spend: 2000 },
  { name: "Week 5", traffic: 1890, conversions: 480, spend: 2181 },
  { name: "Week 6", traffic: 2390, conversions: 380, spend: 2500 },
  { name: "Week 7", traffic: 3490, conversions: 430, spend: 2100 },
];

export default function ServiceDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <Link href="/client" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 w-max">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              Campaign Analytics
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full uppercase tracking-widest font-bold">Live</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Tracking performance for Project #{id?.slice(0, 6)} over the last 7 weeks.
            </p>
          </div>
          <button className="flex items-center gap-2 border border-border bg-muted/20 hover:bg-muted/50 text-foreground px-4 py-2 rounded-xl transition-all">
            <ExternalLink size={16} />
            Live Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col justify-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Traffic</h3>
          <p className="text-4xl font-bold text-foreground">19.5k</p>
          <span className="text-sm text-green-500 font-medium mt-2 flex items-center gap-1">
             +12.5% <span className="text-muted-foreground">vs last period</span>
          </span>
        </div>
        <div className="glass-card p-6 flex flex-col justify-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Conversions</h3>
          <p className="text-4xl font-bold text-foreground">3,039</p>
          <span className="text-sm text-green-500 font-medium mt-2 flex items-center gap-1">
             +4.1% <span className="text-muted-foreground">vs last period</span>
          </span>
        </div>
        <div className="glass-card p-6 flex flex-col justify-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Ad Spend</h3>
          <p className="text-4xl font-bold text-foreground">$15,681</p>
          <span className="text-sm text-red-500 font-medium mt-2 flex items-center gap-1">
             -2.3% <span className="text-muted-foreground">vs last period</span>
          </span>
        </div>
      </div>

      <div className="glass-card p-6 h-[400px]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">Performance Tracking</h2>
          <div className="flex gap-4 items-center">
             <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-3 h-3 bg-[#6C5CE7] rounded-full"/> Traffic</div>
             <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-3 h-3 bg-[#00D2FF] rounded-full"/> Conversions</div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={mockMetrics} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => val >= 1000 ? `${val/1000}k` : val} />
            <Tooltip 
              contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "8px" }}
              itemStyle={{ color: "var(--foreground)" }}
            />
            <Line type="monotone" dataKey="traffic" stroke="#6C5CE7" strokeWidth={3} dot={{ r: 4, fill: "#6C5CE7", strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="conversions" stroke="#00D2FF" strokeWidth={3} dot={{ r: 4, fill: "#00D2FF", strokeWidth: 0 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-6 flex items-start gap-4 bg-primary/5 border-primary/20">
         <ShieldCheck className="text-primary mt-1 shrink-0" size={24} />
         <div>
            <h3 className="font-semibold text-foreground">Agency Audit Note</h3>
            <p className="text-sm text-muted-foreground mt-1">All campaigns are currently performing within the targeted KPI bounds. We are adjusting bid limits this week to attempt scaling the primary ad set without deteriorating the Return on Ad Spend (ROAS).</p>
         </div>
      </div>
    </div>
  );
}
