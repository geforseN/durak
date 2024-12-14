<template>
  <li class="contents">
    <router-link
      :to
      v-bind="$attrs"
      active-class="underline underline-offset-8 decoration-black"
    >
      <slot />
    </router-link>
  </li>
</template>
<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

defineOptions({
  inheritAttrs: false,
});

const { to } = defineProps<{
  to: RouteLocationRaw;
}>();
</script>
