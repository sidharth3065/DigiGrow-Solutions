"use client";

import { ThemeProvider } from "next-themes";
import SocketProvider from "@/components/layout/Socket";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // 30 seconds
            retry: 1,
          },
        },
      })
  );

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SocketProvider>
      </ThemeProvider>
  );
}
