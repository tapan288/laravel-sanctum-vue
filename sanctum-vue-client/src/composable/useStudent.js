import axios from "axios";
import { ref } from "vue";

export default function useStudent() {
  let students = ref({}),
    errors = ref({});

  const fetchStudents = async () => {
    try {
      let response = await axios.get("api/students");

      students.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createStudent = async (form) => {
    try {
      console.log(form);
      let response = await axios.post("api/students", form);

      return response;
    } catch (error) {
      if (error.response.status == 422) {
        errors.value = error.response.data.errors;
      }

      return Promise.reject(null);
    }
  };

  return { fetchStudents, students, createStudent, errors };
}
