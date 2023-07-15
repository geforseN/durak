<template>
  <div>TWITCH</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
// https://dev.twitch.tv/console/apps/kfsfb3kuep25nplvuqeig0u5gpigq2
// https://github.com/twitchdev/authentication-node-sample
// TODO add scope email_verified
// FIXME IMPORTANT /auth/twitch/redirect?code=eldsr4jy40ejxc1gszpdt5a92kcxuu&scope=user%3Aread%3Aemail
const route = useRoute();
// WHEN COOL
console.log(route.fullPath)
console.log(route.query);
// WHEN BAD
// http://localhost:3000/
// ?error=access_denied
// &error_description=The+user+denied+you+access
// &state=c3ab8aa609ea11e793ae92361f002671
// const accessToken = new URLSearchParams(route.hash.slice(1)).get("access_token");
// if (!accessToken) throw new Error("BAD");
// const headers = new Headers({ "Authorization": `OAuth ${accessToken}` });
</script>
