<template>
  <div class="min-h-[80vh] flex justify-center items-center">
    <!--    "hasAccount && !hasForgotCredentials"-->
    <form class="flex flex-col gap-y-6 w-[40rem]">
      <h1 class="text-3xl font-semibold">Вход в учетную запись</h1>
      <div>
        <label class="text-xl" for="login-accname">Имя аккаунта </label>
        <input
          v-model="accname"
          required
          maxlength="128"
          class="py-2 px-2 border-2 border-black w-full h-full"
          id="login-accname"
        />
      </div>
      <div>
        <label class="text-xl" for="login-password">Пароль </label>
        <input
          type="password"
          v-model="password"
          required
          maxlength="128"
          id="login-password"
          class="py-2 px-2 border-2 border-black w-full h-full"
        />
      </div>

      <div class="flex gap-x-5">
        <!--     "hasAccount = false"    -->
        <button
          type="button"
          @click="router.push('/auth/registration')"
          class="flex-1 text-xl bg-green-500 hover:bg-green-400 border-2 border-black px-2 py-2"
        >
          Нет аккаунта? Зарегистрируйтесь
        </button>
        <button
          type="submit"
          @submit.prevent="user.login()"
          class="flex-1 text-2xl bg-orange-500 hover:bg-orange-400 border-2 border-black px-2 py-2"
        >
          Войти
        </button>
      </div>
      <!--      "hasForgotCredentials = true"-->
      <button
        id="pos"
        type="button"
        @click="router.push('/auth/forgot-credentials')"
        class="pos relative flex-1 text-xl bg-yellow-500 hover:bg-yellow-400 border-2 border-black px-2 py-2"
      >
        Забыли пароль или имя аккаунта? <br />
        Отправим письмо на почту
      </button>
      <a
        :href="yandexUrl"
        target="_blank"
        @click="handleYandexAuth"
        class="h-[56px] flex justify-center items-center gap-[12px] py-[10px] px-[24px] bg-black"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="12" fill="#FC3F1D" />
          <path
            d="M13.6913 19.212H16.1984V4.81201H12.5517C8.88439 4.81201 6.95749 6.69748 6.95749 9.47388C6.95749 11.6909 8.01418 12.9962 9.89965 14.3429L6.62598 19.212H9.34022L12.9868 13.7628L11.723 12.9133C10.1897 11.8773 9.44382 11.0693 9.44382 9.32885C9.44382 7.79561 10.5212 6.75964 12.5725 6.75964H13.6913V19.212Z"
            fill="white"
          />
        </svg>
        <span class="text-white">Войти с Яндекс ID</span>
      </a>
    </form>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from "@/stores/auth.store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const { accname, password } = storeToRefs(useAuthStore());

const yandexUrl =
  "https://oauth.yandex.ru/authorize?response_type=token&client_id=8430c9f64f184909aa0a2977f1a27386&force_confirm=yes";

const handleYandexAuth = () => {
};
</script>

<style scoped>
#pos {
  @apply before:content-['!'] before:absolute
  before:top-2 before:right-2 before:bottom-2
  before:flex before:flex-col before:justify-center
  before:px-4 before:py-2
  before:bg-gray-900 before:text-yellow-400 before:text-3xl

  after:content-['!'] after:absolute
  after:top-2 after:left-2 after:bottom-2
  after:flex after:flex-col after:justify-center
  after:px-4 after:py-2
  after:bg-gray-900 after:text-yellow-400 after:text-3xl;
}
</style>
