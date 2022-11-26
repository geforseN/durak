<template>
  <header>
    <ul class="flex gap-2 px-4 py-1 bg-emerald-200">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <span>Text</span>
      </li>
      <li class="ml-auto">
        <a class="underline" :href="`profile/${props.profileId}`">My Profile</a>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
  const props = defineProps<{
    profileId: string | number;
  }>();
</script>

<style scoped></style>
