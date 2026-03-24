"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import TimeTracker from "@/components/team/TimeTracker";
import { Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

interface ProjectSummary {
  client: {
    businessName: string;
  };
  serviceType: string;
}

interface TaskItem {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate: string;
  project: ProjectSummary;
}

interface TasksApiResponse {
  tasks?: TaskItem[];
}

export default function TeamDashboardPage() {
  const { accessToken, user } = useAuthStore();

  const { data: tasksData, isLoading: tasksLoading } = useQuery<TasksApiResponse>({
    queryKey: ["team", "tasks", "dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/team/tasks", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
  });

  const activeTasks: TaskItem[] = (tasksData?.tasks ?? []).filter((t) => t.status !== "DONE");
  const completedCount = (tasksData?.tasks ?? []).filter((t) => t.status === "DONE").length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            Welcome back, {user?.name?.split( " " )[0] || "Team"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what you need to focus on today.
          </p>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Time Tracker & Tasks */}
        <div className="space-y-8">
          <TimeTracker tasks={activeTasks} />
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Up Next
              </h2>
              <Link href="/team/tasks" className="text-sm text-primary hover:underline">
                View Kanban Board &rarr;
              </Link>
            </div>

            {tasksLoading ? (
               <div className="space-y-3">
                 {[1,2,3].map(i => <div key={i} className="h-16 w-full animate-pulse skeleton rounded-xl" />)}
               </div>
            ) : activeTasks.length === 0 ? (
              <p className="text-muted-foreground text-sm">No pending tasks! Enjoy your day.</p>
            ) : (
              <div className="space-y-3">
                {activeTasks.slice(0, 4).map((task) => (
                  <div key={task.id} className="p-4 rounded-xl border border-border bg-muted/10 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{task.project.client.businessName} • {task.project.serviceType}</p>
                    </div>
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded border border-border">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side widgets */}
        <div className="space-y-8">
           <div className="glass-card p-6 border-t-2 border-t-[#00E676] bg-gradient-to-b from-[#00E676]/5 to-transparent">
             <div className="flex items-center gap-4">
               <div className="bg-[#00E676]/10 p-3 rounded-xl border border-[#00E676]/20">
                 <CheckCircle className="text-[#00E676] w-6 h-6" />
               </div>
               <div>
                 <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                 <h3 className="text-2xl font-bold tracking-tight text-foreground">{completedCount} <span className="text-sm font-normal text-muted-foreground">this month</span></h3>
               </div>
             </div>
           </div>

           <div className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-6">Recent Team Activity</h2>
              <div className="relative pl-6 border-l-2 border-border/50 space-y-6">
                 {[
                   { label: "Alice assigned you a new task", time: "2m ago" },
                   { label: "Bob uploaded 'Ad_creatives_v2.zip'", time: "1hr ago" },
                   { label: "Client 'Apex Fitness' approved the proposal.", time: "4hrs ago" },
                 ].map((act, i) => (
                   <div key={i} className="relative">
                     <span className="absolute -left-[31px] bg-background w-3 h-3 rounded-full border-2 border-primary" />
                     <p className="text-sm text-foreground">{act.label}</p>
                     <p className="text-xs text-muted-foreground mt-0.5">{act.time}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
