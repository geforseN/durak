<template>
  <global-chat :days="mockChat"></global-chat>
  <log-in-pop-up />
  <main class="grid grid-cols-12 auto-rows-auto">
    <available-rooms class="col-start-4 col-span-6" :rooms="mockRoomsData" />
  </main>
</template>

<script setup lang="ts">
  import { mockRoomsData } from "@/mock/available-rooms.mock";
  import { mockChat } from "@/mock/global-chat.mock";
  import AvailableRooms from "@/components/available-rooms.vue";
  import GlobalChat from "@/components/global-chat.vue";
  import LogInPopUp from "@/components/log-in-pop-up.vue";
</script>

<style scoped></style>
