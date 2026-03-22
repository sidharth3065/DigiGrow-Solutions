"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

type ClientResponse = {
  id: string;
  businessName: string;
  industry: string;
  plan: string;
  leadStage: string;
  createdAt: string;
  user: { email: string; name: string };
  projects: Array<{ id: string; serviceType: string; status: string }>;
};

const columns: ColumnDef<ClientResponse>[] = [
  {
    accessorKey: "businessName",
    header: "Business Name",
    cell: ({ row }) => (
      <div className="font-semibold text-foreground">{row.original.businessName}</div>
    ),
  },
  {
    accessorKey: "user.name",
    header: "Primary Contact",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-foreground">{row.original.user.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.user.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
        {row.getValue("plan")}
      </span>
    ),
  },
  {
    accessorKey: "leadStage",
    header: "Pipeline Stage",
    cell: ({ row }) => {
      const stage = row.getValue("leadStage") as string;
      return (
        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md border border-border">
          {stage.replace("_", " ")}
        </span>
      );
    },
  },
  {
    id: "activeServices",
    header: "Active Services",
    cell: ({ row }) => (
      <div className="flex gap-1 flex-wrap">
        {row.original.projects.slice(0, 2).map((p) => (
          <span key={p.id} className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded">
            {p.serviceType}
          </span>
        ))}
        {row.original.projects.length > 2 && (
          <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
            +{row.original.projects.length - 2}
          </span>
        )}
      </div>
    ),
  },
];

export default function ClientsPage() {
  const { accessToken } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "clients"],
    queryFn: async () => {
      const res = await fetch("/api/admin/clients", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch clients");
      return res.json();
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Client Directory</h1>
          <p className="text-muted-foreground mt-1">
            Manage your agency's client portfolio and active subscriptions.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-primary/25">
          <Plus size={18} />
          Add Client
        </button>
      </div>

      <div className="glass-card p-6">
        <DataTable columns={columns} data={data?.clients || []} loading={isLoading} />
      </div>
    </div>
  );
}
