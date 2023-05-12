<template>
  <div class="chat" :class="isMyMessage ? 'chat-end' : 'chat-start'">
    <div class="w-12 avatar chat-image" :class="isMyMessage ? 'hidden' : 'pl-2 '">
      <div class="rounded">
        <img :src="sender.photoUrl" :alt="`${sender.nickname} profile picture`" />
      </div>
    </div>
    <div class="chat-bubble break-all flex flex-col p-2 pb-1" :class="isMyMessage ? 'items-end bg-neutral-600' : 'items-start'">
      <div class="flex flex-wrap gap-1 items-baseline">
        <span class="font-bold badge border-0 bg-black rounded-sm p-1" :class="isMyMessage && 'hidden'">
          {{ sender.nickname }}
        </span>
        <time class="text-xs opacity-50">{{ date }}</time>
      </div>
      <span class="ml-0.5">{{ text }}</span>
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

const isMyMessage = computed(() => user.accname === sender.accname)
</script>
