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
import { onMounted, ref } from "vue";
import { ConnectStatus, type User } from "@/module/global-chat/types";

const route = useRoute();
const host = import.meta.env.VITE_SOCKET_SERVER_ADDRESS;
const { urlToProfile } = route.params;

  const props = defineProps<{
    profileId: string;
    username: string;
  }>();
</script>
<style scoped></style>
