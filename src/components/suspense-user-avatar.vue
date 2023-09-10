<template>
  <suspense>
    <user-avatar />
    <template #fallback>
      <div class="h-12 w-12 rounded border border-primary bg-black"></div>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import UserAvatar from "./user-avatar.vue";
</script>
