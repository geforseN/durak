import { onMounted, ref, watch } from "vue";
import type { AppThemeRepository } from "./utils/repository.interface";

export function useAppTheme<T extends string>(
  themes: Record<T, string>,
  repository: AppThemeRepository<T>,
) {
  const selectedTheme = ref(repository.defaultValue);

  onMounted(() => {
    selectedTheme.value = repository.getOrDefault();
  });

  watch(selectedTheme, (theme) => {
    repository.setOrThrow(theme);
    document.documentElement.dataset.theme = theme;
  });

  return {
    record: themes,
    selected: selectedTheme,
  };
}
