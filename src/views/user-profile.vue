<template>
  <main>
    <div class="flex">
      <img src="https://picsum.photos/400/" :alt="`${props.username} profile picture`" />
      <div>
        <h2>{{ props.username || "unknown" }}</h2>
        <span>{{ route || "unknown" }}</span>
        <span>{{ route.params["id"] || "unknown" }}</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  const route = useRoute();

  const props = defineProps<{
    profileId: string;
    username: string;
  }>();
</script>
<style scoped></style>
