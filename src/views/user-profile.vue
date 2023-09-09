<template>
  <Suspense>
    <user-profile />
    <template #fallback>
      <div class="bg-red-900">Loading...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import UserProfile from "@/components/user-profile.vue";
</script>
