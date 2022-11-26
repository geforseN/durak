<template>
  <header>
    <ul class="flex gap-2 px-4 py-1 bg-emerald-200">
      <li>
        <router-link to="/" class="underline">Home</router-link>
      </li>
      <li>
        <router-link to="/auth" class="underline">Auth</router-link>
      </li>
      <li>
        <span>Text</span>
      </li>
      <li class="ml-auto">
        <router-link :to="`/profile/${props.profileId}`" class="underline">
          My Profile
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
  const props = defineProps<{
    profileId: string | number;
  }>();
</script>
