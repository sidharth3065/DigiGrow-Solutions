import PortalShell from "@/components/layout/PortalShell";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalShell role="TEAM">{children}</PortalShell>;
}
