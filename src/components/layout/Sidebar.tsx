"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  FileText,
  Users,
  BarChart3,
  MessageSquare,
  FolderOpen,
  Calendar,
  Target,
  Megaphone,
  Search,
  Mail,
  Globe,
  Palette,
  Video,
  Smartphone,
  Zap,
  TrendingUp,
  UserCheck,
  Receipt,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const clientNav: NavItem[] = [
  { label: "Dashboard", href: "/client", icon: <LayoutDashboard size={20} /> },
  { label: "SEO", href: "/client/services/seo", icon: <Search size={20} /> },
  { label: "Social Media", href: "/client/services/social", icon: <Megaphone size={20} /> },
  { label: "Ads (PPC)", href: "/client/services/ads", icon: <Target size={20} /> },
  { label: "Email", href: "/client/services/email", icon: <Mail size={20} /> },
  { label: "Website", href: "/client/services/website", icon: <Globe size={20} /> },
  { label: "Branding", href: "/client/services/branding", icon: <Palette size={20} /> },
  { label: "Video", href: "/client/services/video", icon: <Video size={20} /> },
  { label: "WhatsApp/SMS", href: "/client/services/whatsapp", icon: <Smartphone size={20} /> },
  { label: "Leads", href: "/client/services/leads", icon: <Zap size={20} /> },
  { label: "Invoices", href: "/client/invoices", icon: <Receipt size={20} /> },
  { label: "Messages", href: "/client/services/messages", icon: <MessageSquare size={20} /> },
];

const teamNav: NavItem[] = [
  { label: "Dashboard", href: "/team", icon: <LayoutDashboard size={20} /> },
  { label: "Tasks", href: "/team/tasks", icon: <FileText size={20} /> },
  { label: "Calendar", href: "/team/calendar", icon: <Calendar size={20} /> },
  { label: "Files", href: "/team/files", icon: <FolderOpen size={20} /> },
  { label: "Chat", href: "/team/chat", icon: <MessageSquare size={20} /> },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
  { label: "Clients", href: "/admin/clients", icon: <Users size={20} /> },
  { label: "Team", href: "/admin/team", icon: <UserCheck size={20} /> },
  { label: "Invoices", href: "/admin/invoices", icon: <Receipt size={20} /> },
  { label: "AI Tools", href: "/admin/ai", icon: <BrainCircuit size={20} /> },
];

interface SidebarProps {
  role: "ADMIN" | "TEAM" | "CLIENT";
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function Sidebar({ role, onCollapseChange }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    onCollapseChange?.(next);
  };

  const navItems =
    role === "ADMIN" ? adminNav : role === "TEAM" ? teamNav : clientNav;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
      style={{
        backgroundColor: "var(--sidebar)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 shrink-0 border-b"
           style={{ borderColor: "var(--border)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
             style={{
               background: "linear-gradient(135deg, #6C5CE7, #00D2FF)",
             }}>
          <span className="text-white font-bold text-sm">DG</span>
        </div>
        {!collapsed && (
          <span className="text-lg font-bold gradient-text whitespace-nowrap">
            DigiGrow
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-hover"
              )}
            >
              <span
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={handleToggle}
        className="flex items-center justify-center h-12 border-t transition-colors hover:bg-sidebar-hover"
        style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
