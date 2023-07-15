<template>
  <div>YANDEX</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();


// https://oauth.yandex.ru/client/8430c9f64f184909aa0a2977f1a27386
// https://yandex.com/dev/id/doc/en/concepts/ya-oauth-intro


// console.log(route.query.code);
const { code } = route.query;

// const codeData = await fetch("https://oauth.yandex.ru/", {
//   method: "POST",
//   mode: "no-cors",
//   headers: {
//     "Content-type": "application/x-www-form-urlencoded",
//   },
//   body: `grant_type=authorization_code&code=${code}`,
//   credentials: "include"
// });
// console.log(codeData);


const accessToken = new URLSearchParams(route.hash.slice(1)).get("access_token");
if (!accessToken) throw new Error("BAD");
const headers = new Headers({ "Authorization": `OAuth ${accessToken}` });

// const data = await fetch(`https://login.yandex.ru/info?oauth_token=${accessToken}`, {
//   // headers,
//   mode: "no-cors",
//   credentials: "include",
// });
// console.log(data);
// const value = await data.json()
// console.log(value);
</script>

<style scoped>

</style>