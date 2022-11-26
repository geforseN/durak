<template>
  <vue-header :profileId="dataFromServer.profileId"></vue-header>
  <main class="grid grid-cols-12 auto-rows-auto">
    <available-rooms class="col-start-4 col-span-6" :rooms="mockRoomsData" />
  </main>
</template>

<script setup lang="ts">
  import { mockRoomsData } from "@/mock/available-rooms.mock";
  import AvailableRooms from "@/components/available-rooms.vue";
  import VueHeader from "@/components/vue-header.vue";
  const dataFromServer = {
    profileId: "qweqwerty123",
  };
</script>

<style scoped></style>
