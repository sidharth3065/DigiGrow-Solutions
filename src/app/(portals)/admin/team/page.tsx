"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, UserCircle } from "lucide-react";
import Image from "next/image";

type TeamResponse = {
  id: string;
  department: string;
  hourlyRate: number | null;
  user: { email: string; name: string; avatar: string | null };
  _count: { tasks: number };
};

const columns: ColumnDef<TeamResponse>[] = [
  {
    accessorKey: "user",
    header: "Team Member",
    cell: ({ row }) => (
        <div className="flex items-center gap-3">
        {row.original.user.avatar ? (
          <Image
            src={row.original.user.avatar}
            alt=""
            width={32}
            height={32}
            loader={({ src }) => src}
            unoptimized
            className="w-8 h-8 rounded-full bg-muted object-cover"
          />
        ) : (
          <UserCircle className="w-8 h-8 text-muted-foreground" />
        )}
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{row.original.user.name}</span>
          <span className="text-xs text-muted-foreground">{row.original.user.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
        {row.original.department}
      </span>
    ),
  },
  {
    accessorKey: "hourlyRate",
    header: "Rate/Hr",
    cell: ({ row }) => (
      <span className="text-foreground">
        {row.original.hourlyRate ? `$${row.original.hourlyRate}/hr` : "Salary"}
      </span>
    ),
  },
  {
    id: "workload",
    header: "Active Workload",
    cell: ({ row }) => {
      const taskCount = row.original._count.tasks;
      return (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${Math.min((taskCount / 20) * 100, 100)}%` }} 
            />
          </div>
          <span className="text-xs text-muted-foreground w-12 text-right">
            {taskCount} tasks
          </span>
        </div>
      );
    },
  },
];

export default function TeamPage() {
  const { accessToken } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "team"],
    queryFn: async () => {
      const res = await fetch("/api/admin/team", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch team");
      return res.json();
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your agency staff, contractors, and workload distribution.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-primary/25">
          <Plus size={18} />
          Invite Member
        </button>
      </div>

      <div className="glass-card p-6">
        <DataTable columns={columns} data={data?.team || []} loading={isLoading} />
      </div>
    </div>
  );
}
