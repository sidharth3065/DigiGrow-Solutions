"use client";

import ChatInterface from "@/components/team/ChatInterface";

export default function TeamChatPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Internal Chat</h1>
          <p className="text-muted-foreground mt-1">
            Real-time project collaboration and quick syncing.
          </p>
        </div>
      </div>

      <ChatInterface />
    </div>
  );
}
