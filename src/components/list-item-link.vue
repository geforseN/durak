<template>
  <li>
    <router-link
      :to="to"
      v-bind="attrs"
      class="btn btn-outline gap-2 border"
      active-class="underline underline-offset-8 decoration-black"
    >
      <slot></slot>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
import type { RouteLocationRaw } from "vue-router";

const attrs = useAttrs();
const { to } = defineProps<{
  to: RouteLocationRaw;
}>();
</script>
