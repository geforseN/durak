<template>
  <div class="min-h-[80vh] flex justify-center items-center">
    <!--    "!hasAccount"-->
    <form class="flex flex-col gap-y-6 w-[40rem]">
      <h1 class="text-4xl font-semibold">Регистрация учетной записи</h1>
      <div>
        <label class="text-xl" for="reg-accName">
          Уникальное имя учетной записи
        </label>
        <input
          type="text"
          v-model="accName"
          required
          maxlength="128"
          id="reg-accName"
          class="py-2 px-2 border-2 border-black w-full h-full"
        />
      </div>
      <div>
        <label class="text-xl" for="reg-email">Электронная почта </label>
        <input
          type="email"
          v-model="email"
          inputmode="email"
          required
          maxlength="128"
          id="reg-email"
          class="py-2 px-2 border-2 border-black w-full h-full"
        />
      </div>
      <!--  Нужно, что бы padding в fieldset не влиял на ширину input-ов   -->
      <!--  Не пробовал использовать :before или :after                    -->
      <!--                 _____________                                   -->
      <!--                 |     |     |                                   -->
      <!--                 V     V     V                                   -->
      <fieldset
        class="-mx-2 border-2 px-2 py-4 border-gray-500 flex flex-col gap-y-6"
      >
        <legend class="text-2xl">Придумайте пароль</legend>
        <div>
          <label class="text-xl" for="reg-password">Пароль </label>
          <input
            type="password"
            v-model="password"
            required
            maxlength="128"
            id="reg-password"
            class="py-2 px-2 border-2 border-black w-full h-full"
          />
        </div>
        <div>
          <label class="text-xl" for="reg-password-repeat"
          >Повторите пароль
          </label>
          <input
            type="password"
            v-model="repeatedPassword"
            required
            maxlength="128"
            id="reg-password-repeat"
            class="py-2 px-2 border-2 border-black w-full h-full"
          />
        </div>
      </fieldset>
      <div class="flex gap-x-5">
        <!--          hasAccount = true-->
        <button
          type="button"
          @click="router.push('/auth/login')"
          class="flex-1 text-xl bg-orange-500 hover:bg-orange-400 border-2 border-black px-2 py-2"
        >
          Есть аккаунт? Войдите
        </button>
        <button
          type="submit"
          @submit.prevent="user.register()"
          class="flex-1 text-2xl bg-green-500 hover:bg-green-400 border-2 border-black px-2 py-2"
        >
          Зарегистрироваться
        </button>
      </div>
      <button type="reset">Очистить</button>
      <details class="hidden">
        <summary class="text-2xl">
          Зачем для регистрации нужна электронная почта?
        </summary>
        <div class="pt-4">
          Нам нужно убедиться, что именно вы регистрируете аккаунт. <br />
          Для этого
          <mark>на почту будет отправлено письмо c подтверждением</mark>
        </div>
      </details>
    </form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import useAuthStore from "@/stores/auth.store";
import { useRouter } from "vue-router";

const router = useRouter();

const {
  email,
  accName,
  password,
  repeatedPassword,
} = storeToRefs(useAuthStore());
</script>
