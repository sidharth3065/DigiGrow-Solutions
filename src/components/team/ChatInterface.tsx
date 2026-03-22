"use client";

import { useState } from "react";
import { Send, Smile, Paperclip, CheckCheck } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice (PM)", text: "Hey team, the new ad creatives for Apex Fitness are approved!", time: "10:23 AM", isMe: false },
    { id: 2, sender: "You", text: "Awesome, I'll schedule them for launch tomorrow.", time: "10:25 AM", isMe: true },
    { id: 3, sender: "Bob (Design)", text: "Files are in the Apex OneDrive folder.", time: "10:28 AM", isMe: false },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      sender: "You",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }]);
    setInput("");
  };

  return (
    <div className="glass-card flex flex-col h-[600px] overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/20">
        <h2 className="font-semibold">Project: Apex Fitness Campaign</h2>
        <p className="text-xs text-muted-foreground">3 team members</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.isMe ? "self-end items-end" : "self-start items-start"}`}>
            {!msg.isMe && <span className="text-xs text-muted-foreground mb-1 ml-1">{msg.sender}</span>}
            <div className={`px-4 py-2.5 rounded-2xl ${
              msg.isMe 
                ? "bg-primary text-primary-foreground rounded-br-sm" 
                : "bg-muted text-foreground border border-border rounded-bl-sm"
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
              <span>{msg.time}</span>
              {msg.isMe && <CheckCheck size={12} className="text-blue-400" />}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-border bg-muted/10 flex items-center gap-2">
        <button type="button" className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted transition-colors">
          <Paperclip size={20} />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary pr-10"
          />
          <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1">
            <Smile size={18} />
          </button>
        </div>
        <button 
          type="submit" 
          disabled={!input.trim()}
          className="bg-primary text-primary-foreground p-2.5 rounded-xl disabled:opacity-50 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
        </button>
      </form>
    </div>
  );
}
