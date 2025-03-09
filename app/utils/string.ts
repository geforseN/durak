export function makeWithBase(base: string) {
  return function (string: string) {
    return base + string;
  };
}

export function withSlashAtStart(string: string) {
  return string.startsWith("/") ? string : "/" + string;
}
