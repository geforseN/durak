import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  const hasAccount = ref(false);
  const hasForgotCredintials = ref(false);

  const email = ref("");
  const username = ref("");
  const password = ref("");
  const repeatedPassword = ref("");

  return {
    hasAccount,
    hasForgotCredintials,
    email,
    username,
    password,
    repeatedPassword,
  };
});

export default useAuthStore;