import { expect, test } from "vitest";
import { ensureNonNegativeInteger } from "./ensure-non-negative-integer";

test("ensureNonNegativeInteger", () => {
  expect(() => ensureNonNegativeInteger(-1)).toThrow(
    "Invalid value: Expected >=0 but received -1",
  );
  expect(() => ensureNonNegativeInteger(2.1)).toThrow(
    "Invalid integer: Received 2.1",
  );
  expect(() => ensureNonNegativeInteger(0)).not.toThrow();
  expect(() => ensureNonNegativeInteger(1)).not.toThrow();
});
