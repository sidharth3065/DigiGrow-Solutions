import { Hono } from "hono";
import { cors } from "hono/cors";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations";

import adminRouter from "@/server/routes/admin";
import teamRouter from "@/server/routes/team";
import clientRouter from "@/server/routes/client";
import aiRouter from "@/server/routes/ai";

const app = new Hono().basePath("/api");

// CORS
app.use("*", cors());

// Admin Routes
app.route("/admin", adminRouter);

// Team Routes
app.route("/team", teamRouter);

// Client Routes
app.route("/client", clientRouter);

// AI Routes
app.route("/ai", aiRouter);

// ── Health ──────────────────────────────────────────────────────────
app.get("/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// ── Register ────────────────────────────────────────────────────────
app.post("/auth/register", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
    }

    const { name, email, password, businessName, role } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return c.json({ error: "Email already registered" }, 409);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: role || "CLIENT",
        ...(role === "CLIENT" || !role
          ? {
              client: {
                create: {
                  businessName: businessName || name + "'s Business",
                },
              },
            }
          : {}),
        ...(role === "TEAM"
          ? {
              teamMember: {
                create: {},
              },
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
      },
    });

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id, user.role);

    // Store refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return c.json({ user, accessToken, refreshToken }, 201);
  } catch (error) {
    console.error("Register error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ── Login ───────────────────────────────────────────────────────────
app.post("/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        passwordHash: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id, user.role);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isActive: user.isActive,
    };
    return c.json({ user: safeUser, accessToken, refreshToken });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ── Refresh Token ───────────────────────────────────────────────────
app.post("/auth/refresh", async (c) => {
  try {
    const body = await c.req.json();
    const { refreshToken: token } = body;

    if (!token) {
      return c.json({ error: "Refresh token required" }, 400);
    }

    const payload = verifyRefreshToken(token);

    const stored = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!stored || stored.expiresAt < new Date()) {
      return c.json({ error: "Invalid or expired refresh token" }, 401);
    }

    // Rotate: delete old, create new
    await prisma.refreshToken.delete({ where: { id: stored.id } });

    const newAccessToken = signAccessToken(payload.userId, payload.role);
    const newRefreshToken = signRefreshToken(payload.userId, payload.role);

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return c.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Refresh error:", error);
    return c.json({ error: "Invalid refresh token" }, 401);
  }
});

// ── Logout ──────────────────────────────────────────────────────────
app.post("/auth/logout", async (c) => {
  try {
    const body = await c.req.json();
    const { refreshToken: token } = body;

    if (token) {
      await prisma.refreshToken.deleteMany({ where: { token } });
    }

    return c.json({ message: "Logged out successfully" });
  } catch {
    return c.json({ message: "Logged out" });
  }
});

// ── Get Current User ────────────────────────────────────────────────
app.get("/users/me", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        phone: true,
        client: {
          select: {
            id: true,
            businessName: true,
            industry: true,
          },
        },
        teamMember: {
          select: {
            id: true,
            department: true,
            title: true,
          },
        },
      },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user });
  } catch {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
});

export default app;
