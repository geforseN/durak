<template>
  <Suspense>
    <user-profile />
    <template #fallback>
      <div class="bg-red-900">Loading...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import UserProfile from '@/components/user-profile.vue';
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';
onMounted(() => {
  console.log('mounted')
})

onUnmounted(() => {
  console.log('unmounted')
})
</script>
