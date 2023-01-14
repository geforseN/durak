<!-- TODO: ширина форм меняется из-за ширины текста (h1, dt, dd) -->
<!-- TODO: изменять url страницы, сделать три отдельных компонента формы -->
<template>
  <div class="min-h-[80vh] flex justify-center items-center">
    <form v-if="!hasAccount" action="" class="flex flex-col gap-y-6 w-[40rem]">
      <h1 class="text-4xl font-semibold">Регистрация учетной записи</h1>
      <div>
        <label class="text-xl" for="reg-username">Уникальное имя учетной записи </label>
        <input type="text" v-model="username" required maxlength="128" id="reg-username"
               class="py-2 px-2 border-2 border-black w-full h-full" />
      </div>
      <div>
        <label class="text-xl" for="reg-email">Электронная почта </label>
        <input type="email" v-model="email" inputmode="email" required maxlength="128" id="reg-email"
               class="py-2 px-2 border-2 border-black w-full h-full" />
      </div>
      <!--  Нужно, что бы padding в fieldset не влиял на ширину input-ов   -->
      <!--  Не пробовал использовать :before или :after                    -->
      <!--                 _____________                                   -->
      <!--                 |     |     |                                   -->
      <!--                 V     V     V                                   -->
      <fieldset class="-mx-2 border-2 px-2 py-4 border-gray-500 flex flex-col gap-y-6">
        <legend class="text-2xl">Придумайте пароль</legend>
        <div>
          <label class="text-xl" for="reg-password">Пароль </label>
          <input type="password" v-model="password" required maxlength="128" id="reg-password"
                 class="py-2 px-2 border-2 border-black w-full h-full" />
        </div>
        <div>
          <label class="text-xl" for="reg-password-repeat">Повторите пароль </label>
          <input type="password" v-model="repeatedPassword" required maxlength="128" id="reg-password-repeat"
                 class="py-2 px-2 border-2 border-black w-full h-full" />
        </div>
      </fieldset>
      <div class="flex gap-x-5">
        <button type="button" @click="hasAccount = true"
                class="flex-1 text-xl bg-orange-500 hover:bg-orange-400 border-2 border-black px-2 py-2">
          Есть аккаунт? Войдите
        </button>
        <button type="submit" @submit.prevent="user.register()"
                class="flex-1 text-2xl bg-green-500 hover:bg-green-400 border-2 border-black px-2 py-2">
          Зарегистрироваться
        </button>
      </div>
      <button type="reset">Очистить</button>
      <details class="hidden">
        <summary class="text-2xl">Зачем для регистрации нужна электронная почта?</summary>
        <div class="pt-4">
          Нам нужно убедиться, что именно вы регистрируете аккаунт. <br>
          Для этого
          <mark>на почту будет отправлено письмо c подтверждением</mark>
        </div>
      </details>

    </form>

    <form v-if="hasAccount && !hasForgotCredintials" action="" class="flex flex-col gap-y-6 w-[40rem]">
      <h1 class="text-3xl font-semibold">Вход в учетную запись</h1>
      <div>
        <label class="text-xl" for="login-username">Имя аккаунта </label>
        <input v-model="username" required maxlength="128"
               class="py-2 px-2 border-2 border-black w-full h-full"
               id="login-username" />
      </div>
      <div>
        <label class="text-xl" for="login-password">Пароль </label>
        <input type="password" v-model="password" required maxlength="128" id="login-password"
               class="py-2 px-2 border-2 border-black w-full h-full" />
      </div>

      <div class="flex gap-x-5">
        <button type="button" @click="hasAccount = false"
                class="flex-1 text-xl bg-green-500 hover:bg-green-400 border-2 border-black px-2 py-2">
          Нет аккаунта? Зарегистрируйтесь
        </button>
        <button type="submit" @submit.prevent="user.login()"
                class="flex-1 text-2xl bg-orange-500 hover:bg-orange-400 border-2 border-black px-2 py-2">
          Войти
        </button>
      </div>
      <button id="pos" type="button" @click="hasForgotCredintials = true"
              class="pos relative flex-1 text-xl bg-yellow-500 hover:bg-yellow-400 border-2 border-black px-2 py-2">
        Забыли пароль или имя аккаунта? <br> Отправим письмо на почту
      </button>
      <a :href="yandexUrl" target="_blank" @click="handleYandexAuth" class="h-[56px] flex justify-center items-center gap-[12px] py-[10px] px-[24px] bg-black" >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="12" fill="#FC3F1D"/>
          <path d="M13.6913 19.212H16.1984V4.81201H12.5517C8.88439 4.81201 6.95749 6.69748 6.95749 9.47388C6.95749 11.6909 8.01418 12.9962 9.89965 14.3429L6.62598 19.212H9.34022L12.9868 13.7628L11.723 12.9133C10.1897 11.8773 9.44382 11.0693 9.44382 9.32885C9.44382 7.79561 10.5212 6.75964 12.5725 6.75964H13.6913V19.212Z" fill="white"/>
        </svg>
        <span class="text-white">Войти с Яндекс ID</span>
      </a>
    </form>

    <form v-if="hasAccount && hasForgotCredintials" action="" class="flex flex-col w-[40rem]">
      <h1 class="text-3xl font-semibold">Восстановить пароль или имя учетной записи</h1>
      <div>
        <label class="text-xl" for="forgot-credentials">Электронная почта</label>
        <input v-model="email" required maxlength="128" type="email" inputmode="email"
               class="py-2 px-2 border-2 border-black w-full h-full"
               id="forgot-credentials" />
      </div>
      <div class="flex gap-x-5">
        <button type="button" @click="hasAccount = false; hasForgotCredintials = false"
                class="flex-1 text-xl bg-green-500 hover:bg-green-400 border-2 border-black px-2 py-2">
          Нет аккаунта? Зарегистрируйтесь
        </button>
        <button type="submit" @submit.prevent="console.error('user.restoreCredentials()')"
                class="flex-1 text-2xl bg-blue-500 hover:bg-blue-400 border-2 border-black px-2 py-2">
          Отправить письмо
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import user from "@/api/user";
import useAuthStore from "@/stores/auth.store";
import { storeToRefs } from "pinia";

const store = useAuthStore();

const { hasAccount, hasForgotCredintials, email, username, password, repeatedPassword } = storeToRefs(store);

const yandexUrl = "https://oauth.yandex.ru/authorize?response_type=token&client_id=8430c9f64f184909aa0a2977f1a27386&force_confirm=yes";

const handleYandexAuth = () => {

};

</script>

<style scoped>
#pos {
  @apply
  before:content-['!'] before:absolute
  before:top-2 before:right-2 before:bottom-2
  before:flex before:flex-col before:justify-center
  before:px-4 before:py-2
  before:bg-gray-900 before:text-yellow-400 before:text-3xl

  after:content-['!'] after:absolute
  after:top-2 after:left-2 after:bottom-2
  after:flex after:flex-col after:justify-center
  after:px-4 after:py-2
  after:bg-gray-900 after:text-yellow-400 after:text-3xl
}
</style>