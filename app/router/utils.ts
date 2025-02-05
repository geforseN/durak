import { useRoute } from "vue-router";

export function getRouteStringParam(key: string, transform?: undefined): string;
export function getRouteStringParam<T>(
  key: string,
  transform: (value: string) => T,
): T;
export function getRouteStringParam<T>(
  key: string,
  transform?: (value: string) => T,
) {
  // @ts-expect-error failed to type useRoute
  const value = useRoute().params[key];
  if (typeof value !== "string") {
    throw new TypeError(`Page param "${key}" must be a string`);
  }
  if (typeof transform === "function") {
    return transform(value);
  }
  return value;
}
