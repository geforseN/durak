<template>
  <header>
    <nav>
      <ul class="navbar bg-neutral-700">
        <li>
          <router-link to="/" class="btn btn-ghost text-xl text-secondary"
            active-class="underline underline-offset-8 text-accent decoration-black">
            <home class="mr-2" />
            Главная
          </router-link>
        </li>
        <template v-if="username">
          <li class="ml-auto">
            <router-link :to="`/profile/${personalLink}`" class="border border-black w-10 avatar aspect-square">
              <img :src="photoUrl" :alt="`${username} profile picture`" :title="username" />
            </router-link>
          </li>
        </template>
        <template v-else>
          <li class="ml-auto">
            <router-link to="/auth/registration" class="btn btn-ghost text-xl text-neutral-content">
              Зарегистрироваться
            </router-link>
          </li>
          <li class="ml-4">
            <router-link to="/auth/login" class="btn btn-ghost text-xl text-neutral-content">
              Войти
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";
import Home from "@/components/svg/Home.vue";

const { photoUrl, username, personalLink } = storeToRefs(useUserStore());
</script>
