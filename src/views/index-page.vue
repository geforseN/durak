<template>
  <div class="w-full flex flex-col items-center gap-6">
    <global-chat />
    <button class="mx-auto self-end w-max bg-green-600 px-4 py-4" @click="">
      Создать комнату
    </button>
    <create-room />
    <main class="grid grid-cols-12 auto-rows-auto">
      <available-rooms class="col-start-4 col-span-6" :rooms="mockRoomsData" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { mockRoomsData } from "@/mock/available-rooms.mock";
import AvailableRooms from "@/components/available-rooms.vue";
import GlobalChat from "@/module/global-chat/global-chat.vue";
import CreateRoom from "@/components/create-room.vue";
</script>
