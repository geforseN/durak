<template>
  <header>
    <ul class="flex items-center gap-2 px-4 py-1 bg-emerald-200">
      <li>
        <router-link to="/" class="underline">Home</router-link>
      </li>
      <li class="ml-auto" v-if="username">
        <router-link :to="`/profile/${urlToProfile}`" class="inline-block border border-black h-10 w-10">
          <img :src="photoUrl" :alt="`${username} profile picture`" :title="username">
        </router-link>
      </li>
      <template v-if="!username">
        <li class="ml-auto">
          <router-link to="/auth/registration" class="underline">Зарегистрироваться</router-link>
        </li>
        <li>
          <router-link to="/auth/login" class="underline">Войти</router-link>
        </li>
      </template>
    </ul>
  </header>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";

const { photoUrl, username, urlToProfile } = storeToRefs(useUserStore());

</script>
