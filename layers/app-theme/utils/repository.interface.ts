export interface AppThemeRepository<T> {
  defaultValue: T;
  getOrDefault(): T;
  setOrThrow(value: unknown): void;
}