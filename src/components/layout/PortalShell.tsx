"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

interface PortalShellProps {
  role: "ADMIN" | "TEAM" | "CLIENT";
  children: React.ReactNode;
}

function getPortalHome(role: "ADMIN" | "TEAM" | "CLIENT") {
  if (role === "ADMIN") return "/admin";
  if (role === "TEAM") return "/team";
  return "/client";
}

export default function PortalShell({ role, children }: PortalShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, isLoading, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated || isLoading) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (user.role !== role) {
      router.replace(getPortalHome(user.role));
    }
  }, [hasHydrated, isAuthenticated, isLoading, role, router, user]);

  const isAuthorized =
    hasHydrated && !isLoading && isAuthenticated && user?.role === role;

  if (!isAuthorized) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
          Loading your workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar role={role} onCollapseChange={setSidebarCollapsed} />
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? "72px" : "260px" }}
      >
        <Topbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
