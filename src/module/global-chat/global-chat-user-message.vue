<template>
  <div class="chat " :class="sendByUser ? 'chat-end ' : 'chat-start'">
    <div class="w-12 avatar chat-image indicator" :class="sendByUser ? 'pr-2' : 'pl-2 '">
      <div class="rounded">
        <img :src="sender.photoUrl" :alt="`${sender.nickname} profile picture`" />
      </div>
    </div>
    <div class="chat-bubble break-all flex flex-col" :class="sendByUser ? 'items-end' : 'items-start'">
      <span class="font-bold badge bg-black rounded-sm p-1">{{ sender.nickname }}</span>
      <p>{{ text }}</p>
      <time class="text-xs opacity-50">{{ date }}</time>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserMessage } from "@/module/global-chat/types";
import { useUserStore } from "@/stores/user.store";
import { computed } from "@vue/reactivity";

const props = defineProps<{ message: UserMessage }>();
const { date, text, sender } = props.message;

const user = useUserStore();

const sendByUser = computed(() => user.accname === sender.accname)
</script>
