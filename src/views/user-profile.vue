<template>
  <main>
    <div class="flex">
      <img :src="profile.photoUrl" :alt="`${profile.nickname} profile picture`" />
      <div>
        <h2>{{ profile.nickname }}</h2>
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
const { personalLink } = route.params;

const profile = ref<Omit<User, "id" | "isInvisible" | "accname" | "personalLink">>({
  nickname: "",
  connectStatus: ConnectStatus.offline,
  photoUrl: "",
});

onMounted(async () => {
  const req = new Request(`${host}/api/profile/${personalLink}`, { method: "GET", mode: "cors"});
  const profileData = await fetch(req);
  const { nickname, connectStatus, photoUrl } = await profileData.json();
  profile.value = {
    nickname,
    photoUrl,
    connectStatus,
  };
});
</script>
