import axios from "axios";
import { reactive, computed } from "vue";

const state = reactive({
  authenticated: false,
  user: {},
});

export default function useAuth() {
  const authenticated = computed(() => state.authenticated);

  const user = computed(() => state.user);

  const setAuthenticated = (authenticated) => {
    state.authenticated = authenticated;
  };

  const setUser = (user) => {
    state.user = user;
  };

  const login = async (form) => {
    await axios.get("/sanctum/csrf-cookie");

    try {
      const response = await axios.post("/login", form);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    authenticated,
    user,
    login,
  };
}
