<template>
  <li class="contents">
    <router-link
      :to="to"
      v-bind="$attrs"
      class="btn btn-outline gap-2 border align-middle"
      active-class="underline underline-offset-8 decoration-black"
    >
      <slot></slot>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const { to } = defineProps<{
  to: RouteLocationRaw;
}>();
</script>
