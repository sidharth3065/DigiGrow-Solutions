import { Hono } from "hono";
import prisma from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { InvoiceStatus, ProjectStatus } from "@prisma/client";

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
  } catch {
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

  const activeStatuses: ProjectStatus[] = [
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.NOT_STARTED,
  ];
  const totalUnpaid = clientAcc.invoices.reduce((acc, invoice) => acc + invoice.total, 0);

  return c.json({
    activeServices: clientAcc.projects.filter((project) => activeStatuses.includes(project.status)),
    completedServices: clientAcc.projects.filter(
      (project) => project.status === ProjectStatus.COMPLETED
    ),
    totalUnpaidBalance: totalUnpaid,
    clientMetrics: clientAcc,
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

clientRouter.post("/invoices/:invoiceId/pay", async (c) => {
  const userId = c.get("userId");
  const invoiceId = c.req.param("invoiceId");

  const clientAcc = await prisma.client.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!clientAcc) return c.json({ error: "Client not found" }, 404);

  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
      clientId: clientAcc.id,
    },
  });

  if (!invoice) return c.json({ error: "Invoice not found" }, 404);

  if (invoice.status === InvoiceStatus.PAID) {
    return c.json({ invoice });
  }

  const paidInvoice = await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      status: InvoiceStatus.PAID,
      paidAt: new Date(),
    },
  });

  return c.json({ invoice: paidInvoice });
});

export default clientRouter;
