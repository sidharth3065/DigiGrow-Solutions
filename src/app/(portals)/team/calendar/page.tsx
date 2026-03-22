"use client";

import CalendarView from "@/components/team/CalendarView";

export default function TeamCalendarPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Track deadlines, meetings, and scheduled deliverables.
          </p>
        </div>
      </div>

      <CalendarView />
    </div>
  );
}
