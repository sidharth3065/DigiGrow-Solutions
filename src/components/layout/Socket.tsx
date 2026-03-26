"use client";

import { SocketContext } from "@/lib/socketContext";
import { PropsWithChildren, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface SocketProviderProps extends PropsWithChildren {
  /**
   * URL of the Socket.io server.
   * Defaults to the same host with `/socket.io` path.
   */
  url?: string;
}

export default function SocketProvider({ children, url }: SocketProviderProps) {
  const [socket] = useState<Socket>(() =>
    io(url, { transports: ["websocket", "polling"] })
  );

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
