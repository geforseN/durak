<template>
  <Suspense>
    <user-profile />
    <template #fallback>
      <div class="flex justify-center">
        <div
          class="mt-9 h-[272px] w-full max-w-5xl border-0 border-black bg-slate-500 lg:border-2"
        />
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import UserProfile from "@/components/user-profile.vue";
</script>
