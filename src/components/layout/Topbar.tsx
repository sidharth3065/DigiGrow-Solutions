"use client";

import { Bell, Search, LogOut, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = useAuthStore.getState().refreshToken;
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // logout regardless
    }
    logout();
    router.push("/login");
  };

  const roleBadgeColor =
    user?.role === "ADMIN"
      ? "bg-danger/20 text-danger"
      : user?.role === "TEAM"
      ? "bg-warning/20 text-warning"
      : "bg-success/20 text-success";

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b"
      style={{
        backgroundColor: "rgba(11, 15, 26, 0.85)",
        backdropFilter: "blur(16px)",
        borderColor: "var(--border)",
      }}
    >
      {/* Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div
          className="flex items-center w-full gap-2 px-4 py-2 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: searchFocused ? "var(--secondary)" : "var(--muted)",
            border: `1px solid ${searchFocused ? "var(--primary)" : "var(--border)"}`,
          }}
        >
          <Search size={16} style={{ color: "var(--muted-foreground)" }} />
          <input
            type="text"
            placeholder="Search clients, tasks, reports…"
            className="w-full bg-transparent border-none outline-none text-sm"
            style={{ color: "var(--foreground)" }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-xs"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
            }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl transition-colors hover:bg-muted"
          title="Notifications"
          id="notifications-button"
        >
          <Bell size={20} style={{ color: "var(--muted-foreground)" }} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--danger)" }}
          />
        </button>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl transition-colors hover:bg-muted"
            id="user-menu-button"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #6C5CE7, #00D2FF)",
                color: "#fff",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium leading-none" style={{ color: "var(--foreground)" }}>
                {user?.name || "User"}
              </p>
              <span className={`inline-flex mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${roleBadgeColor}`}>
                {user?.role || "CLIENT"}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              style={{ color: "var(--muted-foreground)" }}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-52 rounded-xl shadow-2xl overflow-hidden animate-fade-in"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  {user?.name}
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {user?.email}
                </p>
              </div>
              <div className="py-1">
                <button
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors hover:bg-muted"
                  style={{ color: "var(--foreground)" }}
                >
                  <User size={16} style={{ color: "var(--muted-foreground)" }} />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors hover:bg-muted"
                  style={{ color: "var(--danger)" }}
                  id="logout-button"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
