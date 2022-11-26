<template>
  <div class="p-4 flex flex-col items-center w-max rounded-2xl border-4 border-green-500">
    <h2 class="font-bold">Войдите в аккаунт, что-бы сыграть</h2>
    <button class="font-bold border-4 w-full bg-emerald-200 m-4 p-2">
      Войти в аккаунт
    </button>
    <div class="w-full grid grid-flow-col grid-cols-[1fr_1fr] m-3 gap-2">
      <button class="font-bold border-4 flex-grow text-red-600 bg-black p-2">Я</button>
      <button class="font-bold border-4 flex-grow bg-blue-700 text-white p-2">VK</button>
    </div>
    <div class="my-3">...</div>
    <div>
      <span class="mr-1">Или можете просто </span>
      <button class="font-bold border-4 inline bg-amber-200 p-2">Посмотреть игру</button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
