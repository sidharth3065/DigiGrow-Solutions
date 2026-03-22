"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sparkles, Coins, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function AIUsageDashboardPage() {
  const { accessToken } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "ai", "usage"],
    queryFn: async () => {
      const res = await fetch("/api/ai/usage", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch AI usage");
      return res.json();
    },
  });

  const { metrics, history } = data || {};

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="text-primary" size={28} />
            AI Operations Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Track OpenAI token usage and discover new operational efficiencies.
          </p>
        </div>
        <Link href="/admin/ai/proposal" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-primary/25">
          Generate Proposal <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-b-2 border-primary/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Lifetime Calls</h3>
          <p className="text-4xl font-bold text-foreground">{metrics?.totalCalls || 0}</p>
        </div>
        <div className="glass-card p-6 border-b-2 border-red-500/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total API Spend</h3>
          <p className="text-4xl font-bold text-foreground text-red-400">
             {formatCurrency(metrics?.totalCost || 0)}
          </p>
        </div>
        <div className="glass-card p-6 border-b-2 border-green-500/50 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">Estimated Labor Saved <TrendingDown size={14} className="text-green-500"/></h3>
            <p className="text-4xl font-bold text-foreground text-green-400">~24 hrs</p>
          </div>
          <Coins className="absolute -bottom-4 -right-4 w-24 h-24 text-green-500/10" />
        </div>
      </div>

      <div className="glass-card p-6 h-[400px]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">API Usage over 7 Days</h2>
        </div>
        {isLoading ? (
           <div className="w-full h-full skeleton rounded-xl animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "8px" }}
                itemStyle={{ color: "var(--foreground)" }}
              />
              <Area type="monotone" yAxisId="left" dataKey="calls" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCalls)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
