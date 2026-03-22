"use client";

import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { Users, TrendingUp, CreditCard, Activity } from "lucide-react";
import DragDropPipeline from "@/components/admin/DragDropPipeline";
import RevenueChart from "@/components/admin/RevenueChart";
import { useAuthStore } from "@/stores/authStore";

export default function AdminDashboardPage() {
  const { accessToken } = useAuthStore();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const { data: pipelineData, isLoading: pipelineLoading } = useQuery({
    queryKey: ["admin", "pipeline"],
    queryFn: async () => {
      const res = await fetch("/api/admin/pipeline", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch pipeline");
      return res.json();
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            Agency Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time insights across all clients and services.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<TrendingUp className="text-primary" />}
          title="Monthly Recurring (MRR)"
          value={statsLoading ? "..." : formatCurrency(stats?.mrr || 0)}
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard
          icon={<Users className="text-blue-400" />}
          title="Active Clients"
          value={statsLoading ? "..." : stats?.activeClients || 0}
          trend="+3 this month"
          trendUp={true}
        />
        <StatCard
          icon={<CreditCard className="text-green-400" />}
          title="Pending Invoices"
          value={statsLoading ? "..." : formatCurrency(stats?.pendingInvoices || 0)}
          trend="Action required"
          trendUp={false}
        />
        <StatCard
          icon={<Activity className="text-purple-400" />}
          title="Team Capacity"
          value={statsLoading ? "..." : `${stats?.teamUtilization || 0}%`}
          trend="Optimal"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Revenue Growth</h2>
              <p className="text-sm text-muted-foreground">MRR vs Total Revenue (Past 6 Months)</p>
            </div>
          </div>
          <div className="flex-1">
            <RevenueChart />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
          <div className="space-y-3 flex-1">
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-left group">
              <span className="font-medium">Create Proposal</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors text-left group">
              <span className="font-medium">Add New Client</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors text-left group">
              <span className="font-medium">Generate Invoice</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-colors text-left group">
              <span className="font-medium">Onboard Team Member</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* CRM Pipeline */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">CRM Pipeline</h2>
            <p className="text-sm text-muted-foreground">Drag and drop leads to update their status.</p>
          </div>
        </div>
        {pipelineLoading ? (
          <div className="h-[600px] w-full animate-pulse skeleton rounded-xl" />
        ) : (
          <DragDropPipeline initialData={pipelineData?.clients || []} />
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend, trendUp }: any) {
  return (
    <div className="glass-card p-6 group hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl bg-muted/50 border border-border group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            trendUp
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {trend}
        </span>
      </div>
      <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-1 tracking-tight text-white">{value}</p>
    </div>
  );
}