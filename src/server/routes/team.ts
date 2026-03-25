import { Hono } from "hono";
import prisma from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";

type Variables = {
  userId: string;
};

const teamRouter = new Hono<{ Variables: Variables }>();

// Middleware: Team or Admin only
teamRouter.use("*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);

    if (payload.role !== "TEAM" && payload.role !== "ADMIN") {
      return c.json({ error: "Forbidden: Team Admins only" }, 403);
    }
    
    // Pass user ID into context for filtering
    c.set("userId", payload.userId);
    await next();
  } catch {
    return c.json({ error: "Invalid token" }, 401);
  }
});

// ── Tasks ───────────────────────────────────────────────────────────
teamRouter.get("/tasks", async (c) => {
  const userId = c.get("userId");
  
  const teamMember = await prisma.teamMember.findUnique({
    where: { userId },
  });

  if (!teamMember) return c.json({ tasks: [] });

  const tasks = await prisma.task.findMany({
    where: { assigneeId: teamMember.id },
    include: {
      project: { select: { serviceType: true, client: { select: { businessName: true } } } }
    },
    orderBy: { dueDate: "asc" }
  });

  return c.json({ tasks });
});

teamRouter.patch("/tasks/:taskId", async (c) => {
  const taskId = c.req.param("taskId");
  const { status } = await c.req.json();

  if (!status) return c.json({ error: "Status required" }, 400);

  const task = await prisma.task.update({
    where: { id: taskId },
    data: { status },
  });

  return c.json({ task });
});

// ── Time Tracking ───────────────────────────────────────────────────
teamRouter.post("/time", async (c) => {
  const userId = c.get("userId");
  const { taskId, amountHours, description } = await c.req.json();

  const teamMember = await prisma.teamMember.findUnique({
    where: { userId },
  });

  if (!teamMember) return c.json({ error: "Team member not found" }, 404);

  const log = await prisma.timeLog.create({
    data: {
      teamMemberId: teamMember.id,
      taskId,
      duration: Math.round(amountHours * 60),
      notes: description,
      startTime: new Date(Date.now() - amountHours * 3600000),
      endTime: new Date(),
    },
  });

  return c.json({ log });
});

export default teamRouter;
