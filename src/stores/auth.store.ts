import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  const email = ref("");
  const accname = ref("");
  const password = ref("");
  const repeatedPassword = ref("");

  return {
    email,
    accname,
    password,
    repeatedPassword,
  };
});

export default useAuthStore;
