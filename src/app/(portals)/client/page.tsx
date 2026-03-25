"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Activity, ArrowRight, BarChart } from "lucide-react";
import Link from "next/link";

type ClientService = {
  id: string;
  name: string;
  serviceType: string;
  status: string;
  endDate?: string | null;
};

type ClientDashboardResponse = {
  activeServices: ClientService[];
  completedServices: ClientService[];
  totalUnpaidBalance: number;
  clientMetrics?: {
    businessName?: string | null;
  };
};

export default function ClientDashboardPage() {
  const { accessToken, user } = useAuthStore();

  const { data, isLoading } = useQuery<ClientDashboardResponse>({
    queryKey: ["client", "dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/client/dashboard", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch dashboard");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-12 w-1/3 bg-muted rounded-xl skeleton" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-muted rounded-xl skeleton" />
          <div className="h-32 bg-muted rounded-xl skeleton" />
        </div>
        <div className="h-64 bg-muted rounded-xl skeleton" />
      </div>
    );
  }

  const activeServices = data?.activeServices ?? [];
  const completedServices = data?.completedServices ?? [];
  const totalUnpaidBalance = data?.totalUnpaidBalance ?? 0;
  const clientMetrics = data?.clientMetrics;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {clientMetrics?.businessName || user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">Here is a summary of your active campaigns and metrics.</p>
        </div>
        {totalUnpaidBalance > 0 && (
          <Link href="/client/invoices" className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-xl transition-colors font-medium text-sm border border-red-500/20">
            <CreditCard size={18} />
            {formatCurrency(totalUnpaidBalance)} Due
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="text-primary" size={20} />
            Active Services
          </h2>
          {activeServices?.length === 0 ? (
            <div className="glass-card p-6 text-center text-muted-foreground">
              No active services currently. Contact your account manager to start a campaign.
            </div>
          ) : (
            <div className="grid gap-4">
              {activeServices?.map((service) => (
                <Link key={service.id} href={`/client/services/${service.id}`} className="glass-card p-6 hover:border-primary/50 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h3 className="font-bold text-foreground capitalize">{service.serviceType.replace("_", " ")}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.name}</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-green-400 bg-green-500/10 px-2 py-1 rounded inline-block border border-green-500/20">
                      {service.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary font-medium group-hover:underline">
                    View performance metrics <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
             <BarChart className="text-blue-400" size={20} />
             Past Projects
          </h2>
          {completedServices?.length === 0 ? (
             <div className="glass-card p-6 text-center text-muted-foreground text-sm">
               No completed projects yet.
             </div>
          ) : (
             <div className="glass-card divide-y divide-border">
                {completedServices?.map((service) => (
                  <div key={service.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm text-foreground">{service.serviceType.replace("_", " ")}</p>
                      <p className="text-xs text-muted-foreground">
                        {service.endDate ? new Date(service.endDate).toLocaleDateString() : "Completed recently"}
                      </p>
                    </div>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">Completed</span>
                  </div>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
