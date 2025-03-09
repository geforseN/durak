import { inject } from "vue";

export function injectOrThrow<T>(key: string): T {
  const value = inject<T>(key);
  if (value === undefined) {
    throw new Error(`"${key}" is not provided`);
  }
  return value;
}