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
        <router-link :to="`/profile/${profileId}`" class="underline">
          {{ username }}
        </router-link>
      </li>
    </ul>
  </header>
</template>
<script setup lang="ts">
import socket from "@/socket";
import { ref } from "vue";

// !!!!!!!!!!!!!!!!!11111!!!!!!!!!!!!!!!!!
// user.store.ts
const username = ref();
const profileId = 1;

socket.on("connect_error", (error) => console.log(error))

socket.on("user:success", (usernameFromSocket) => {
  username.value = usernameFromSocket;
});

socket.on("user:connected", (nickname) => {
  console.log(`${nickname} теперь в сети`);
});

</script>
