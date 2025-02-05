/// <reference types="vite/client" />

export function requireEnv<T extends ImportMeta['env']>(
  key: keyof T & string,
  importMeta: T,
) {
  const value = importMeta[key];
  if (value === undefined) {
    throw new Error(`${key} environment variable is equal to undefined`);
  }
  return value;
}
