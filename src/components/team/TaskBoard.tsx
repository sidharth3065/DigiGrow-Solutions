"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Clock, CheckSquare } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  project: { serviceType: string; client: { businessName: string } };
}

const STAGES = [
  { id: "TODO", title: "To Do", color: "#6C5CE7" },
  { id: "IN_PROGRESS", title: "In Progress", color: "#00D2FF" },
  { id: "IN_REVIEW", title: "In Review", color: "#FFB74D" },
  { id: "DONE", title: "Done", color: "#00E676" },
];

export default function TaskBoard({ initialData }: { initialData: Task[] }) {
  const queryClient = useQueryClient();
  const [data, setData] = useState<Record<string, Task[]>>({});
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    const grouped = STAGES.reduce((acc, stage) => {
      acc[stage.id] = initialData.filter((t) => t.status === stage.id);
      return acc;
    }, {} as Record<string, Task[]>);
    setData(grouped);
  }, [initialData]);

  const updateStageMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const authData = localStorage.getItem("digigrow-auth");
      const token = authData ? JSON.parse(authData).state.accessToken : "";
      
      const res = await fetch(`/api/team/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", "tasks"] });
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
    moved.status = destination.droppableId;
    
    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, moved);
      setData({ ...data, [source.droppableId]: sourceCol });
    } else {
      destCol.splice(destination.index, 0, moved);
      setData({ ...data, [source.droppableId]: sourceCol, [destination.droppableId]: destCol });
      
      // Fire API call
      updateStageMutation.mutate({ taskId: draggableId, status: destination.droppableId });
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
                  {data[stage.id]?.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
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
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "var(--primary)", opacity: 0.8, color: "white" }}>
                              {task.project.serviceType}
                            </span>
                            <span className="text-xs text-muted-foreground">{task.project.client.businessName}</span>
                          </div>
                          
                          <p className="text-sm font-bold mb-1" style={{ color: "var(--foreground)" }}>{task.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
                          
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                            <div className="flex items-center gap-1">
                              <CheckSquare size={12} className={task.status === "DONE" ? "text-green-500" : "text-muted-foreground"} />
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span className="text-[10px] text-muted-foreground">
                                {new Date(task.dueDate).toLocaleDateString()}
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
