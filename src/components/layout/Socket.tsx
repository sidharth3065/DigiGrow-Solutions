import { SocketContext } from "@/lib/socketContext";
import { PropsWithChildren } from "react";
import { io } from "socket.io-client";

export interface SocketProviderProps extends PropsWithChildren {
  /**
   * URL of the Socket.io server.
   * Defaults to the same host with `/socket.io` path.
   */
  url?: string;
}

export default function SocketProvider({ children, url = "http://localhost:3000/socket.io" }: SocketProviderProps) {
  const socket = io(url, { transports: ["websocket", "polling"] });
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
