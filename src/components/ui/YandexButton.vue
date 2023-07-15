<template>
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
    <label class="text-white"><slot /></label>
  </a>
</template>

<script setup lang="ts">

const yandexUrl =
  "https://oauth.yandex.ru/authorize?response_type=token&client_id=8430c9f64f184909aa0a2977f1a27386&force_confirm=yes";

const handleYandexAuth = () => {
};
</script>
