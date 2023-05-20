<template>
  <template v-if="username">
    <li>
      <router-link
        :to="`/profile/${personalLink}`"
        class="h-12 w-12 rounded border border-primary"
        active-class="shadow-lg shadow-primary"
      >
        <img
          :src="photoUrl"
          :alt="`${username} profile picture`"
          :title="username"
          class="rounded"
        />
      </router-link>
    </li>
  </template>
  <template v-else>
    <list-item-link to="/auth/registration">Зарегистрироваться</list-item-link>
    <li class="ml-2" />
    <list-item-link to="/auth/login">Войти</list-item-link>
  </template>
</template>

<script setup lang="ts">
import ListItemLink from "@/components/list-item-link.vue";

const { username, photoUrl, personalLink } = defineProps<{
  username: string;
  photoUrl: string;
  personalLink: string;
}>();
</script>
