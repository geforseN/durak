import { assertIsObject, assertIsString } from "@/utils/type-assert";

export class CustomWebsocketEvent {
  constructor(public eventName: string) {}
  asString() {
    return JSON.stringify({
      eventName: this.eventName,
      payload: { ...this, eventName: undefined },
    });
  }
}

class CorrectServerData {
  eventName: string;
  payload: Record<string, unknown>;

  constructor(event: MessageEvent) {
    const parsedData = JSON.parse(event.data + "");
    assertIsObject(parsedData);
    const { eventName, payload } = parsedData;
    assertIsString(eventName);
    assertIsObject(payload);
    this.eventName = eventName;
    this.payload = payload;
  }
}

export function dispatchMessage(
  this: WebSocket,
  listeners: Record<string, Function>,
  handleError: (error: unknown) => void,
  event: MessageEvent,
) {
  const { eventName, payload } = new CorrectServerData(event);
  const listener = listeners[eventName];
  if (!listener) {
    throw new Error(`Unknown event for frontend from backend: ${eventName}`);
  }
  console.log({ eventName, payload, listener });
  try {
    listener(payload);
  } catch (error) {
    handleError(error);
  }
}

export const WS_BASE = `${import.meta.env.VITE_FASTIFY_SERVER_URI.replace(
  /^http/,
  "ws",
)}`;
