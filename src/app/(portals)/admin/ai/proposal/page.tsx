"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { Sparkles, Copy, FileText, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ProposalGeneratorPage() {
  const { accessToken } = useAuthStore();
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    goals: "",
  });
  const [proposal, setProposal] = useState<string | null>(null);

  const generateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/ai/generate-proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Generation failed");
      const json = await res.json();
      return json.proposal;
    },
    onSuccess: (data) => {
      setProposal(data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.industry) return;
    setProposal(null);
    generateMutation.mutate(formData);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500 h-[calc(100vh-80px)]">
      {/* Form Sidebar */}
      <div className="glass-card p-6 w-full lg:w-[400px] flex flex-col h-max shrink-0">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <Sparkles className="text-primary" />
          AI Proposal Gen
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Business Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g. Apex Fitness"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Industry</label>
            <input 
              type="text" 
              required
              className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g. Local Gym / Health"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Primary Goals</label>
            <textarea 
              rows={4}
              required
              className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary resize-none"
              placeholder="e.g. Generate 50 new local leads per month."
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            disabled={generateMutation.isPending}
            className="w-full bg-gradient-to-r from-[#6C5CE7] to-[#00D2FF] hover:opacity-90 text-white p-3 rounded-xl font-semibold mt-4 transition-opacity flex items-center justify-center gap-2"
          >
            {generateMutation.isPending ? "Generating ✨" : "Generate Proposal"}
          </button>
        </form>
      </div>

      {/* Output Editor */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden relative group">
        <div className="h-14 border-b border-border bg-muted/20 px-6 flex items-center justify-between shrink-0">
           <span className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
             <FileText size={16} /> Document Preview
           </span>
           {proposal && (
             <div className="flex gap-2">
               <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-lg border border-border transition-colors">
                  <Copy size={14} /> Copy
               </button>
               <button className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-lg border border-primary/20 transition-colors">
                  <Download size={14} /> Export PDF
               </button>
             </div>
           )}
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 prose prose-invert max-w-none">
          {generateMutation.isPending ? (
            <div className="animate-pulse space-y-6">
              <div className="h-10 w-2/3 bg-muted rounded-xl" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-5/6 bg-muted rounded" />
              <div className="h-4 w-4/6 bg-muted rounded" />
              
              <div className="h-8 w-1/3 bg-muted rounded mt-8" />
              <div className="h-24 w-full bg-muted rounded-xl" />
            </div>
          ) : proposal ? (
             <div className="animate-in fade-in duration-500 text-foreground">
               <ReactMarkdown>{proposal}</ReactMarkdown>
             </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
               <Sparkles size={48} className="mb-4" />
               <p>Enter client details to generate an AI proposal.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
