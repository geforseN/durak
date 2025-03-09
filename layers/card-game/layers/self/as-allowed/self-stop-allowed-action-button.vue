<template>
  <button
    class="btn btn-info flex h-max flex-col"
  >
    <span class="text-lg">{{ stopActionMessage }}</span>
    <span class="text-xs/3">
      Нажмите <kbd class="kbd kbd-xs rounded">S</kbd>
    </span>
  </button>
</template>
<!-- FIXME: i18n -->
<script setup lang="ts">
import { computed } from "vue";

const { action } = defineProps<{
  action: "attack" | "defend" | "smash";
}>();

const stopActionMessage = computed(() => {
  if (action === "smash") return "Закончить добивание";
  if (action === "attack") return "Закончить атаку";
  if (action === "defend") return "Сдаться";
  throw new Error("No allowed action message");
});
</script>
