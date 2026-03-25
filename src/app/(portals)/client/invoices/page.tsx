"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type InvoiceResponse = {
  id: string;
  invoiceNo: string;
  amount: number;
  tax: number;
  total: number;
  currency: string;
  status: string;
  dueDate: string;
  project?: { serviceType: string } | null;
};

const columns: ColumnDef<InvoiceResponse>[] = [
  {
    accessorKey: "invoiceNo",
    header: "Invoice #",
    cell: ({ row }) => <span className="font-mono text-sm text-muted-foreground">{row.original.invoiceNo}</span>,
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
    accessorKey: "total",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-semibold text-foreground">
        {formatCurrency(row.original.total)}
      </span>
    ),
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let styles = "bg-muted text-muted-foreground border-border";
      let label = status;

      if (status === "PAID") styles = "bg-green-500/10 text-green-400 border-green-500/20";
      if (status === "OVERDUE" || status === "SENT") {
        styles = "bg-red-500/10 text-red-400 border-red-500/20";
        label = "PAY NOW";
      }
      if (status === "DRAFT") return <span className="text-xs text-muted-foreground">Processing</span>;

      return (
        <button className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wide border cursor-pointer hover:opacity-80 transition-opacity ${styles}`}>
          {label}
        </button>
      );
    },
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

export default function ClientInvoicesPage() {
  const { accessToken } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["client", "invoices"],
    queryFn: async () => {
      const res = await fetch("/api/client/invoices", {
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
            View your invoice history and make secure payments.
          </p>
        </div>
      </div>

      <div className="glass-card p-6">
        <DataTable columns={columns} data={data?.invoices || []} loading={isLoading} />
      </div>
    </div>
  );
}
