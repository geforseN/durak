/// <reference types="vite/client" />

export function forEnv<T extends ImportMeta["env"]>(env: T) {
  return {
    require<K extends keyof T & string>(key: K) {
      const value = env[key];
      if (value === undefined) {
        throw new Error(`${key} environment variable is equal to undefined`);
      }
      if (typeof value !== "string") {
        throw new Error(
          `${key} environment variable expected to be typeof string, received ${typeof value}`,
        );
      }

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
