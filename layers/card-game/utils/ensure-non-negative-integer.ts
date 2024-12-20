import * as v from "valibot";

const nonNegativeInteger = v.pipe(v.number(), v.integer(), v.minValue(0));

export function ensureNonNegativeInteger(value: unknown): number {
  return v.parse(nonNegativeInteger, value);
}
