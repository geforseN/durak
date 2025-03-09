<template>
  <form
    :action="createAnonymousAccountApiPath"
    method="post"
  >
    <create-anonymous-user-button
      type="submit"
    />
  </form>
</template>
<script setup lang="ts">
import createAnonymousAccountApiPath from '../utils/create-anonymous-account-api-path';
import CreateAnonymousUserButton from './create-anonymous-user-button.vue';
</script>