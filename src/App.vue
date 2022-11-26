<template>
  <div class="min-h-screen flex-full-center flex-center bg-gray-500">
    <h1 class="bg-emerald-200 header-text p-4 header-border">Hello World!</h1>
  </div>
</template>
<script setup lang="ts">

</script>

<style scoped>
  .flex-full-center {
    @apply flex justify-center items-center;
  }
  .header-border {
    @apply border-2 border-blue-900;
  }
  .header-text {
    @apply font-bold text-5xl text-blue-800;
  }
</style>