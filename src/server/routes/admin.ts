import { Hono } from "hono";
import prisma from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";

const adminRouter = new Hono();

// Middleware: Admin only
adminRouter.use("*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);

    if (payload.role !== "ADMIN") {
      return c.json({ error: "Forbidden: Admins only" }, 403);
    }
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
});

// ── Dashboard Stats ─────────────────────────────────────────────────
adminRouter.get("/stats", async (c) => {
  const clientsCount = await prisma.client.count();
  const invoices = await prisma.invoice.aggregate({
    _sum: { total: true },
    where: { status: { in: ["SENT", "OVERDUE"] } },
  });

  return c.json({
    mrr: 124500,
    activeClients: clientsCount,
    pendingInvoices: invoices._sum.total || 0,
    teamUtilization: 82,
  });
});

// ── CRM Pipeline ────────────────────────────────────────────────────
adminRouter.get("/pipeline", async (c) => {
  const clients = await prisma.client.findMany({
    select: {
      id: true,
      businessName: true,
      leadStage: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return c.json({ clients });
});

adminRouter.patch("/pipeline/:clientId", async (c) => {
  const clientId = c.req.param("clientId");
  const { stage } = await c.req.json();

  if (!stage) return c.json({ error: "Stage required" }, 400);

  const client = await prisma.client.update({
    where: { id: clientId },
    data: { leadStage: stage },
  });

  return c.json({ client });
});

// ── Clients CRUD ────────────────────────────────────────────────────
adminRouter.get("/clients", async (c) => {
  const clients = await prisma.client.findMany({
    include: {
      user: { select: { email: true, name: true } },
      projects: { select: { id: true, serviceType: true, status: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return c.json({ clients });
});

// ── Team CRUD ───────────────────────────────────────────────────────
adminRouter.get("/team", async (c) => {
  const team = await prisma.teamMember.findMany({
    include: {
      user: { select: { email: true, name: true, role: true, avatar: true } },
      _count: { select: { tasks: true } },
    },
  });
  return c.json({ team });
});

// ── Invoices CRUD ───────────────────────────────────────────────────
adminRouter.get("/invoices", async (c) => {
  const invoices = await prisma.invoice.findMany({
    include: {
      client: { select: { businessName: true } },
      project: { select: { serviceType: true } },
    },
    orderBy: { dueDate: "asc" },
  });
  return c.json({ invoices });
});

export default adminRouter;
