<template>
  <li>
    <router-link
      :to="to"
      v-bind="attrs"
      class="btn-ghost btn gap-2 text-xl text-secondary"
      active-class="underline underline-offset-8 text-accent decoration-black"
    >
      <slot></slot>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const attrs = useAttrs();
const { to } = defineProps<{
  to: string
}>();
</script>
