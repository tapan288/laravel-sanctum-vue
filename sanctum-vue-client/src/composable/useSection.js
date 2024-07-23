import axios from "axios";
import { ref } from "vue";

export default function useSection() {
  let sections = ref({});

  const fetchSections = async (class_id) => {
    try {
      let response = await axios.get("api/sections?class_id=" + class_id);

      sections.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { sections, fetchSections };
}
