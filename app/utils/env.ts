/// <reference types="vite/client" />

export function requireEnv<
  T extends ImportMeta["env"],
  K extends keyof T & string,
>(key: K, env: T, transform?: undefined): string;

export function requireEnv<
  T extends ImportMeta["env"],
  K extends keyof T & string,
  V,
>(key: K, env: T, transform: (value: T[K]) => V): V;

export function requireEnv<
  T extends ImportMeta["env"],
  K extends keyof T & string,
  V,
>(key: K, env: T, transform?: (value: T[K]) => V): V {
  const value = env[key];
  if (value === undefined) {
    throw new Error(`${key} environment variable is equal to undefined`);
  }
  if (typeof value !== "string") {
    throw new Error(
      `${key} environment variable expected to be typeof string, received ${typeof value}`,
    );
  }
  if (typeof transform === "function") {
    return transform(value);
  }
  return value;
}

export function forEnv<T extends ImportMeta["env"]>(env: T) {
  return {
    require<K extends keyof T & string>(key: K) {
      const value = requireEnv(key, env);

      return {
        value() {
          return value;
        },
        transform<V>(transform: (value: string) => V) {
          const transformedValue = transform(value);
          return {
            value() {
              return transformedValue;
            },
          };
        },
      };
    },
    try<K extends keyof T & string>(key: K) {
      const value = env[key];

      return {
        value() {
          return value;
        },
        orElse<R>(makeDefaultValue: () => R): R {
          if (typeof value !== "string") {
            return makeDefaultValue();
          }
          return value;
        },
      };
    },
  };
}
