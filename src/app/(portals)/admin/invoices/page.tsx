"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type InvoiceResponse = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  client: { businessName: string };
  project?: { serviceType: string } | null;
};

const columns: ColumnDef<InvoiceResponse>[] = [
  {
    accessorKey: "id",
    header: "Invoice ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        #{row.original.id.slice(0, 8).toUpperCase()}
      </span>
    ),
  },
  {
    accessorKey: "client.businessName",
    header: "Client",
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.client.businessName}</span>,
  },
  {
    accessorKey: "project.serviceType",
    header: "Service",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.project?.serviceType.replace("_", " ") || "General Retainer"}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-semibold text-foreground">
        {formatCurrency(row.original.amount)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let styles = "bg-muted text-muted-foreground border-border";
      
      if (status === "PAID") styles = "bg-green-500/10 text-green-400 border-green-500/20";
      if (status === "SENT" || status === "OVERDUE") {
        styles = "bg-red-500/10 text-red-400 border-red-500/20";
      }
      if (status === "DRAFT") styles = "bg-orange-500/10 text-orange-400 border-orange-500/20";

      return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border ${styles}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.dueDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
        <Download size={16} />
      </button>
    ),
  },
];

export default function InvoicesPage() {
  const { accessToken } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "invoices"],
    queryFn: async () => {
      const res = await fetch("/api/admin/invoices", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch invoices");
      return res.json();
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing & Invoices</h1>
          <p className="text-muted-foreground mt-1">
            Track payments, send invoices, and monitor financial health.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-primary/25">
          <Plus size={18} />
          Create Invoice
        </button>
      </div>

      <div className="glass-card p-6">
        <DataTable columns={columns} data={data?.invoices || []} loading={isLoading} />
      </div>
    </div>
  );
}
