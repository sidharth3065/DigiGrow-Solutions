"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Target, Clock, AlertCircle } from "lucide-react";

export interface PipelineClient {
  id: string;
  businessName: string;
  leadStage: string;
  createdAt: string;
}

const STAGES = [
  { id: "NEW", title: "New Leads", color: "#6C5CE7" },
  { id: "CONTACTED", title: "Contacted", color: "#00D2FF" },
  { id: "PROPOSAL_SENT", title: "Proposal Sent", color: "#FFB74D" },
  { id: "WON", title: "Won", color: "#00E676" },
  { id: "LOST", title: "Lost", color: "#FF5252" },
];

export default function DragDropPipeline({ initialData }: { initialData: PipelineClient[] }) {
  const queryClient = useQueryClient();
  const [data, setData] = useState<Record<string, PipelineClient[]>>({});
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    const grouped = STAGES.reduce((acc, stage) => {
      acc[stage.id] = initialData.filter((c) => c.leadStage === stage.id);
      return acc;
    }, {} as Record<string, PipelineClient[]>);
    setData(grouped);
  }, [initialData]);

  const updateStageMutation = useMutation({
    mutationFn: async ({ clientId, stage }: { clientId: string; stage: string }) => {
      const authData = localStorage.getItem("digigrow-auth");
      const token = authData ? JSON.parse(authData).state.accessToken : "";
      
      const res = await fetch(`/api/admin/pipeline/${clientId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stage }),
      });
      if (!res.ok) throw new Error("Failed to update pipeline");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pipeline"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = [...data[source.droppableId]];
    const destCol = [...data[destination.droppableId]];
    const [moved] = sourceCol.splice(source.index, 1);

    // Optimistic UI update
    moved.leadStage = destination.droppableId;
    
    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, moved);
      setData({ ...data, [source.droppableId]: sourceCol });
    } else {
      destCol.splice(destination.index, 0, moved);
      setData({ ...data, [source.droppableId]: sourceCol, [destination.droppableId]: destCol });
      
      // Fire API call
      updateStageMutation.mutate({ clientId: draggableId, stage: destination.droppableId });
    }
  };

  if (!isBrowser) return <div className="animate-pulse skeleton h-[600px] w-full rounded-2xl" />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 items-start min-h-[600px]">
        {STAGES.map((stage) => (
          <div key={stage.id} className="min-w-[300px] w-[300px] glass-card p-4 flex flex-col max-h-[750px] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  {stage.title}
                </h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-lg font-medium"
                style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}>
                {data[stage.id]?.length || 0}
              </span>
            </div>

            <Droppable droppableId={stage.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 overflow-y-auto space-y-3 p-1 rounded-xl transition-colors ${
                    snapshot.isDraggingOver ? "bg-muted/50" : ""
                  }`}
                  style={{ minHeight: "150px" }}
                >
                  {data[stage.id]?.map((client, index) => (
                    <Draggable key={client.id} draggableId={client.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 rounded-xl cursor-grab active:cursor-grabbing transition-all ${
                            snapshot.isDragging ? "shadow-2xl scale-[1.02] ring-2 ring-primary border-transparent" : ""
                          }`}
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: "var(--muted)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <p className="text-sm font-bold mb-1" style={{ color: "var(--foreground)" }}>
                            {client.businessName}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-background text-muted-foreground border border-border">
                              {client.id.slice(-6).toUpperCase()}
                            </span>
                            <div className="flex items-center gap-1">
                              <Clock size={12} style={{ color: "var(--muted-foreground)" }} />
                              <span className="text-[10px] text-muted-foreground">
                                {new Date(client.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
