<template>
  <!--  "hasAccount && hasForgotCredentials"-->
  <div class="min-h-[80vh] flex justify-center items-center">
    <form class="flex flex-col w-[40rem]">
      <h1 class="text-3xl font-semibold">
        Восстановить пароль или имя учетной записи
      </h1>
      <div>
        <label class="text-xl" for="forgot-credentials">
          Электронная почта
        </label>
        <input
          v-model="email"
          required
          maxlength="128"
          type="email"
          inputmode="email"
          class="py-2 px-2 border-2 border-black w-full h-full"
          id="forgot-credentials"
        />
      </div>
      <div class="flex gap-x-5">
        <!-- hasAccount = false; hasForgotCredentials = false;-->
        <button
          type="button"
          @click="router.push('/auth/registration')"
          class="flex-1 text-xl bg-green-500 hover:bg-green-400 border-2 border-black px-2 py-2"
        >
          Нет аккаунта? Зарегистрируйтесь
        </button>
        <button
          type="submit"
          @submit.prevent="user.restoreCredentials()"
          class="flex-1 text-2xl bg-blue-500 hover:bg-blue-400 border-2 border-black px-2 py-2"
        >
          Отправить письмо
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import useAuthStore from "@/stores/auth.store";
import { useRouter } from "vue-router";

const router = useRouter();

const { email } = storeToRefs(useAuthStore());
</script>
