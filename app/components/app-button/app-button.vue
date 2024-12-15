<template>
  <button
    class="btn"
    :class="[
      variant ? (variantClasses[variant] ?? '') : '',
      size ? (sizeClasses[size ?? defaultSize] ?? '') : (defaultSize ?? ''),
    ]"
  >
    <slot />
  </button>
</template>
<script lang="ts">
const variantClasses = {
  neutral: "btn-neutral",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  ghost: "btn-ghost",
  link: "btn-link",
};

const sizeClasses = {
  "extra-small": "btn-xs",
  small: "btn-sm",
  medium: "btn-md",
  large: "btn-lg",
};

export type AppButtonProps = {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  defaultSize?: keyof typeof sizeClasses;
};
</script>
<script setup lang="ts">
const { defaultSize } = defineProps<AppButtonProps>();
</script>
