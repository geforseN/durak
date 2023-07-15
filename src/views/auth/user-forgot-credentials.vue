<template>
  <div class="min-h-[80vh] flex justify-center items-center">
    <form class="flex flex-col w-[40rem]">
      <h1 class="text-3xl font-semibold">Восстановить пароль / имя учетной записи</h1>
      <labeled-input id="forgot-credentials" v-model="email" type="email" inputmode="email" required>
        Электронная почта
      </labeled-input>
      <div class="flex gap-x-5 mt-4">
        <authentication-button class="bg-green-500 hover:bg-green-400" @click="router.push('/auth/registration')">
          Нет аккаунта? Зарегистрируйтесь
        </authentication-button>
        <authentication-button class="bg-blue-500 hover:bg-blue-400" type="submit"
                               @submit.prevent="user.restoreCredentials()">
          Отправить письмо
        </authentication-button>
      </div>
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

const { email } = storeToRefs(useAuthStore());
</script>
