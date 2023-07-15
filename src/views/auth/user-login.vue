<template>
  <div class="min-h-[80vh] flex justify-center items-center">
    <form class="flex flex-col gap-y-6 w-[40rem]">
      <h1 class="text-3xl font-semibold">Вход в учетную запись</h1>
      <labeled-input id="login-accname" v-model="accname" required>Имя аккаунта</labeled-input>
      <labeled-input id="login-password" v-model="password" type="password" required>Пароль</labeled-input>
      <div class="flex gap-x-5">
        <authentication-button @click="router.push('/auth/registration')" class="bg-green-500 hover:bg-green-400">
          Нет аккаунта? Зарегистрируйтесь
        </authentication-button>
        <authentication-button type="submit" @submit.prevent="user.login()" class="bg-orange-500 hover:bg-orange-400">
          Войти
        </authentication-button>
      </div>
      <authentication-button @click="router.push('/auth/forgot-credentials')" class="bg-yellow-500 hover:bg-yellow-400">
        Забыли пароль или имя аккаунта? <br />Отправим письмо на почту
      </authentication-button>
     <div class="flex justify-between gap-5">
       <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=a70a29b2c24bce09f9eb"
          class="border-black border-2 flex-1 bg-slate-500 btn text-white text-xl w-fit self-end hover:bg-slate-600">GitHub</a>
       <a
         href="https://oauth.vk.com/authorize?client_id=51526080&display=page&redirect_uri=http://localhost:3000/login/vk/callback&scope=email&response_type=code"
         class="border-black border-2 flex-1 bg-blue-700 btn text-white text-xl w-fit self-end hover:bg-slate-600">VK</a>
       <a
         href="https://id.twitch.tv/oauth2/authorize?client_id=kfsfb3kuep25nplvuqeig0u5gpigq2&redirect_uri=http://localhost:3000/login/twitch/callback&response_type=code&scope=user:read:email"
         class="border-black border-2 flex-1 bg-purple-700 btn text-white text-xl w-fit self-end hover:bg-slate-600">Twitch</a>
     </div>
      <!--      <a :href="`https://id.twitch.tv/oauth2/authorize?client_id=kfsfb3kuep25nplvuqeig0u5gpigq2&redirect_uri=http://localhost:5173/auth/twitch/redirect&response_type=code&scope=email&state=${state}`" class="bg-purple-700">Connect with Twitch (added state)</a>-->
      <yandex-button>Войти с Яндекс ID</yandex-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from "@/stores/auth.store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import LabeledInput from "@/components/ui/LabeledInput.vue";
import YandexButton from "@/components/ui/YandexButton.vue";
import AuthenticationButton from "@/components/ui/AuthenticationButton.vue";

const router = useRouter();

const { accname, password } = storeToRefs(useAuthStore());
</script>
