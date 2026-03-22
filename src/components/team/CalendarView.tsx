"use client";

import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  // Mock schedule data
  const schedule = [
    { date: new Date(), title: "SEO Audit Review", time: "10:00 AM", type: "meeting" },
    { date: addDays(new Date(), 1), title: "Submit Ad Creatives", time: "05:00 PM", type: "deadline" },
    { date: addDays(new Date(), 2), title: "Client Weekly Sync", time: "02:00 PM", type: "meeting" },
  ];

  return (
    <div className="glass-card flex flex-col h-[600px] overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="text-primary w-5 h-5" />
          Content & Deadlines
        </h2>
        <span className="text-muted-foreground font-medium">
          {format(startDate, "MMMM yyyy")}
        </span>
      </div>

      <div className="grid grid-cols-7 border-b border-border bg-muted/30">
        {weekDays.map((day) => (
          <div key={day.toString()} className="p-4 text-center border-r border-border last:border-0 relative">
            <span className="text-xs text-muted-foreground uppercase font-semibold block">{format(day, "EEE")}</span>
            <span className={`text-lg font-medium mt-1 inline-flex w-8 h-8 items-center justify-center rounded-full ${
              isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : "text-foreground"
            }`}>
              {format(day, "d")}
            </span>
            {/* Dots underneath indicating events */}
            <div className="flex justify-center gap-1 mt-2">
              {schedule.some(s => isSameDay(s.date, day) && s.type === "deadline") && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              )}
              {schedule.some(s => isSameDay(s.date, day) && s.type === "meeting") && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {schedule.map((event, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/30 transition-colors">
            <div className={`w-1 rounded-full shrink-0 ${event.type === "deadline" ? "bg-red-400" : "bg-blue-400"}`} />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-sm">{event.title}</h4>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                <span className="capitalize">{event.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
