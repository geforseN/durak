<template>
  <div class="min-h-[80vh] flex justify-center items-center">
    <form class="flex flex-col gap-y-6 w-[40rem]">
      <h1 class="text-4xl font-semibold">Регистрация учетной записи</h1>
      <labeled-input
        id="reg-email"
        type="email"
        v-model="email"
        inputmode="email"
        required
      >
        Электронная почта
      </labeled-input>
      <labeled-input
        id="reg-password"
        type="password"
        v-model="password"
        required
      >
        Пароль
      </labeled-input>
      <div class="flex gap-x-5">
        <authentication-button
          @click="router.push('/auth/login')"
          class="bg-orange-500 hover:bg-orange-400"
        >
          Есть аккаунт? Войдите
        </authentication-button>
        <authentication-button
          type="submit"
          @submit.prevent="user.register()"
          class="bg-green-500 hover:bg-green-400"
        >
          Зарегистрироваться
        </authentication-button>
      </div>
      <button type="reset">Очистить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import useAuthStore from "@/stores/auth.store";
import { useRouter } from "vue-router";
import LabeledInput from "@/components/ui/LabeledInput.vue";
import AuthenticationButton from "@/components/ui/AuthenticationButton.vue";

const router = useRouter();

const { email, accname, password } = storeToRefs(useAuthStore());
</script>
