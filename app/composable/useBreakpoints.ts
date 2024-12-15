import { useBreakpoints as _useBreakpoints } from "@vueuse/core";
import screens from "@@/tailwind.screens";

export function useBreakpoints() {
  return _useBreakpoints(screens);
}
