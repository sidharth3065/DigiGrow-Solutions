"use client";

import FileManager from "@/components/team/FileManager";

export default function TeamFilesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Asset & File Library</h1>
          <p className="text-muted-foreground mt-1">
            Safely store and retrieve creatives, reports, and client guidelines.
          </p>
        </div>
      </div>

      <FileManager />
    </div>
  );
}
