<template>
  <div class="flex flex-col border border-black p-2">
    <section class="bg-blue-300">
      <div class="flex flex-col" v-for="day of props.days">
        <div class="self-center opacity-70 text-sm">{{ day.value }}</div>
        <div v-for="message of day.messages">
          <a :href="`profile/${message.senderId}`" class="bold underline">{{ message.sender }}</a>
          <span>: </span>
          <span class="opacity-40">{{ message.time }}</span>
          <pre class="ml-2 inline" v-if="message.type === 'text'">{{ message.text }}</pre>
        </div>
      </div>
    </section>
    <div class="mt-2 grid grid-flow-col grid-cols-[1fr_max-content]">
      <div>
        <label class="sr-only" for="global-chat-input">Введите сообщение</label>
        <input class="input-border wh-full" id="global-chat-input" v-model="input" placeholder="Нажмите ENTER, что-бы отправить сообщение в чат."/>
      </div>
      <button class="btn-bg btn-border px-2 py-[1px]" title="Отправить сообщение в общий чат">Оправить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import type { Day } from "@/types/global-chat.types";

  const input = ref("");

  const props = defineProps<{
    days: Day[];
  }>();
</script>

<style scoped>
.wh-full {
  @apply w-full h-full;
}
.btn-bg {
  @apply bg-amber-300 focus:bg-amber-400;
}

.btn-border {
  @apply border-2 border-black;
}
.input-border {
  @apply border-2 border-black border-r-0;
}


</style>
