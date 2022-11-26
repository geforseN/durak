<template>
  <div>
    <div class="flex flex-col m-3 border-2" v-for="room in props.rooms">
      <div>{{ room.game_type }} {{ room.max_players }}</div>
      <div class="flex border-2 border-amber-200">
        <div
          v-for="player in room.players"
          :key="player.profile_id"
          class="border border-amber-500 flex flex-col items-center"
        >
          <img :src="player.img_href" :alt="`${player.name} profile picture`" />
          <router-link class="underline" :to="`/profiles/${player.profile_id}`" target="_blank">
            {{ player.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Room } from "@/types/available-rooms.types";

  const props = defineProps<{
    rooms: Room[];
  }>();
</script>

<style scoped></style>
