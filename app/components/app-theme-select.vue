<template>
  <select
    v-model="theme"
    class="select"
    name="app-theme-select"
    id="app-theme-select"
    data-testid="app-theme-select"
  >
    <option v-for="[value, label] of Object.entries(appThemes)" :key="value" :value>
      {{ label }}
    </option>
  </select>
</template>
<script lang="ts">
class AppThemeLocaleStorageRepository<T extends string> {
  constructor(
    readonly key: string,
    readonly isAllowedValue: (theme: unknown) => theme is T,
    readonly defaultValue: T,
  ) {}

  getOrDefault(): T {
    const themeFromStorage = localStorage.getItem(this.key);
    if (themeFromStorage && this.isAllowedValue(themeFromStorage)) {
      return themeFromStorage;
    }
    return this.defaultValue;
  }

  setOrThrow(theme: unknown) {
    if (this.isAllowedValue(theme)) {
      localStorage.setItem(this.key, theme);
    } else {
      throw new Error(`Theme ${theme} is not allowed`);
    }
  }
}
</script>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const appThemes = {
  system: "System",
  corporate: "Light",
  dark: "Dark",
} as const;

const themeRepository = new AppThemeLocaleStorageRepository(
  "app:theme",
  (value): value is keyof typeof appThemes =>
    typeof value === "string" && value in appThemes,
  "system",
);

const theme = ref(themeRepository.defaultValue);

onMounted(() => {
  theme.value = themeRepository.getOrDefault();
});

watch(theme, (theme) => {
  themeRepository.setOrThrow(theme);
  document.documentElement.dataset.theme = theme;
});
</script>
