import { Hono } from "hono";
import prisma from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";

type Variables = {
  userId: string;
};

const clientRouter = new Hono<{ Variables: Variables }>();

// Middleware: Client or Admin only
clientRouter.use("*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);

    if (payload.role !== "CLIENT" && payload.role !== "ADMIN") {
      return c.json({ error: "Forbidden: Client Admins only" }, 403);
    }
    
    c.set("userId", payload.userId);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
});

clientRouter.get("/dashboard", async (c) => {
  const userId = c.get("userId");
  
  const clientAcc = await prisma.client.findUnique({
    where: { userId },
    include: {
      projects: true,
      invoices: {
        where: { status: { in: ["DRAFT", "SENT", "OVERDUE"] } }
      }
    }
  });

  if (!clientAcc) return c.json({ error: "Client not found" }, 404);

  const totalUnpaid = clientAcc.invoices.reduce((acc: number, inv: any) => acc + inv.total, 0);

  return c.json({
    activeServices: clientAcc.projects.filter((p: any) => ["IN_PROGRESS", "NOT_STARTED"].includes(p.status)),
    completedServices: clientAcc.projects.filter((p: any) => p.status === "COMPLETED"),
    totalUnpaidBalance: totalUnpaid,
    clientMetrics: clientAcc
  });
});

clientRouter.get("/invoices", async (c) => {
  const userId = c.get("userId");
  
  const clientAcc = await prisma.client.findUnique({
    where: { userId },
    include: { invoices: { orderBy: { createdAt: "desc" } } }
  });

  if (!clientAcc) return c.json({ error: "Client not found" }, 404);

  return c.json({ invoices: clientAcc.invoices });
});

export default clientRouter;
