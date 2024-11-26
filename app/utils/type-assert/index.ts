export function assertIsObject(
  data: unknown,
): asserts data is Record<string, unknown> {
  if (typeof data !== "object" || data === null) {
    throw new TypeError("Not an object");
  }
}

export function assertIsString(
  maybeString: string | unknown,
): asserts maybeString is string {
  if (typeof maybeString !== "string") {
    throw new TypeError("Not an string");
  }
}
