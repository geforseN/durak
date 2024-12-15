import { useBreakpoints } from "@/composable/useBreakpoints";

export function useAppScreen() {
  const breakpoints = useBreakpoints();

  const isExtraSmall = breakpoints.smallerOrEqual("xs");

  return {
    breakpoints,
    isExtraSmall,
  };
}
