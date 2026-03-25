"use client";

import { useState, useEffect } from "react";
import { Play, Square, History } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TimeTrackerProps {
  tasks: Array<{ id: string; title: string }>;
}

type LogTimeInput = {
  taskId: string;
  amountHours: number;
  description: string;
};

export default function TimeTracker({ tasks }: TimeTrackerProps) {
  const queryClient = useQueryClient();
  const [activeTaskId, setActiveTaskId] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const logTimeMutation = useMutation({
    mutationFn: async ({ taskId, amountHours, description }: LogTimeInput) => {
      const authData = localStorage.getItem("digigrow-auth");
      const token = authData ? JSON.parse(authData).state.accessToken : "";
      
      const res = await fetch("/api/team/time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ taskId, amountHours, description }),
      });
      if (!res.ok) throw new Error("Failed to log time");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", "time"] });
    },
  });

  const handleToggle = () => {
    if (isTracking) {
      // Stop and Log
      setIsTracking(false);
      const hours = Number((seconds / 3600).toFixed(2));
      if (hours > 0 && activeTaskId) {
        logTimeMutation.mutate({ taskId: activeTaskId, amountHours: hours, description });
      }
      setSeconds(0);
      setDescription("");
    } else {
      // Start
      if (!activeTaskId) return alert("Please select a task first.");
      setIsTracking(true);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass-card p-6 border-l-4" style={{ borderLeftColor: isTracking ? "var(--primary)" : "var(--border)" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Time Tracker</h2>
          <p className="text-sm text-muted-foreground">Log billable hours against your assigned tasks.</p>
        </div>
        <div className="flex items-center gap-2">
          <History className="text-muted-foreground w-5 h-5" />
          <span className="font-mono text-xl tracking-wider text-foreground">
            {formatTime(seconds)}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <select
          value={activeTaskId}
          onChange={(e) => setActiveTaskId(e.target.value)}
          disabled={isTracking}
          className="flex-1 bg-muted border border-border rounded-xl px-4 text-sm outline-none disabled:opacity-50"
        >
          <option value="">Select a task...</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="What are you working on?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isTracking}
          className="flex-1 bg-muted border border-border rounded-xl px-4 py-3 text-sm outline-none disabled:opacity-50"
        />

        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg w-32 justify-center ${
            isTracking 
              ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 border" 
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {isTracking ? <><Square size={18} /> Stop</> : <><Play size={18} /> Start</>}
        </button>
      </div>
    </div>
  );
}
