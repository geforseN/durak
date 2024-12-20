import { SOCKET_IO_BASE } from "@/api/socket-io";
import { io } from "socket.io-client";
import type { ManagerOptions, SocketOptions } from "socket.io-client";

export function makeDurakGameSocket(
  gameId: string,
  url = `${SOCKET_IO_BASE}/game/${gameId}`,
  options: Partial<
    ManagerOptions &
      SocketOptions & {
        isDebugMode?: boolean;
      }
  > = {},
) {
  const { isDebugMode, ...socketIoOptions } = options;
  const socket = io(url, {
    withCredentials: true,
    reconnectionAttempts: 3,
    ...socketIoOptions,
  });
  if (isDebugMode) {
    socket.onAny((event: unknown, ...args: unknown[]) => {
      console.log(`%c${event}`, "color: red", ...args);
    });
  }
  return socket;
}
