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
      let response = await axios.post("api/students", form);

      return response;
    } catch (error) {
      if (error.response.status == 422) {
        errors.value = error.response.data.errors;
      }

      return Promise.reject(null);
    }
  };

  const updateStudent = async (id, form) => {
    try {
      let response = await axios.put("api/students/" + id, form);

      return response;
    } catch (error) {
      if (error.response.status == 422) {
        errors.value = error.response.data.errors;
      }

      return Promise.reject(null);
    }
  };

  const getStudent = async (id) => {
    let response = await axios.get("api/students/" + id);

    return response.data;
  };

  return {
    fetchStudents,
    students,
    createStudent,
    errors,
    updateStudent,
    getStudent,
  };
}
