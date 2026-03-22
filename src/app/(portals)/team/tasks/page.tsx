"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import TaskBoard from "@/components/team/TaskBoard";

export default function TeamTasksPage() {
  const { accessToken } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["team", "tasks"],
    queryFn: async () => {
      const res = await fetch("/api/team/tasks", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
  });

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Board</h1>
          <p className="text-muted-foreground mt-1">
            Drag and drop your assigned tasks across active client projects.
          </p>
        </div>
      </div>

      <div className="glass-card p-6">
        {isLoading ? (
          <div className="h-[600px] w-full animate-pulse skeleton rounded-xl" />
        ) : (
          <TaskBoard initialData={data?.tasks || []} />
        )}
      </div>
    </div>
  );
}
