<template>
  <Suspense>
    <durak-game-with-websocket :game-id />
  </Suspense>
</template>
<script setup lang="ts">
import DurakGameWithWebsocket from "$/card-game/components/_durak-game-with-websocket.vue";
import { getRouteStringParam } from "@/router/utils";

const gameId = getRouteStringParam("gameId");
</script>
