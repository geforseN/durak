import type { Socket as Socket_ } from "socket.io-client";
import type { DurakGameSocket } from "@durak-game/durak-dts";

export type Socket = Socket_<
  DurakGameSocket.ServerToClientEvents,
  DurakGameSocket.ClientToServerEvents
>;
