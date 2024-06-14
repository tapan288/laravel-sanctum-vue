import { reactive, computed } from "vue";

const state = reactive({
  name: "Admin",
});

export default function useAuth() {
  const getName = computed(() => state.name);

  const setName = (name) => {
    state.name = name;
  };

  return {
    getName,
    setName,
  };
}
