import { requireEnv } from "@/utils/env";
import { assertIsObject, assertIsString } from "@/utils/type-assert";
import {
  useWebSocket as _useWebSocket,
  type MaybeRefOrGetter,
  type UseWebSocketOptions,
  type UseWebSocketReturn,
} from "@vueuse/core";
import { computed, toValue } from "vue";
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
export const basePath = requireEnv("VITE_SERVER_WS_BASE", import.meta.env);

function withWebSocketBasePath(string: string) {
  const path = string.startsWith("/") ? string : "/" + string;
  return basePath + path;
}

export function useWebSocket(
  url: MaybeRefOrGetter<string>,
  options?: UseWebSocketOptions,
): UseWebSocketReturn<unknown> {
  const url_ = computed(() => withWebSocketBasePath(toValue(url)));
  return _useWebSocket(url_, options);
}
