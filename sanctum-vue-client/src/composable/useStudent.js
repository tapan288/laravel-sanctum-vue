import axios from "axios";
import { computed, ref, watch } from "vue";

export default function useStudent() {
  let students = ref({}),
    errors = ref({}),
    metaData = ref({}),
    pageNumber = ref(1);

  let studentsUrl = computed(() => {
    let url = new URL("http://sanctum-vue-api.test/api/students");

    url.searchParams.append("page", pageNumber.value);

    return url;
  });

  const fetchStudents = async () => {
    try {
      let response = await axios.get(studentsUrl.value);

      students.value = response.data.data;
      metaData.value = response.data.meta;

      console.log(metaData.value);
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

  const deleteStudent = async (id) => {
    try {
      let response = axios.delete("api/students/" + id);

      return response;
    } catch (error) {
      console.log(error);

      return Promise.reject(null);
    }
  };

  const getStudent = async (id) => {
    let response = await axios.get("api/students/" + id);

    return response.data;
  };

  const updatedPageNumber = (link) => {
    pageNumber.value = link.url.split("=")[1];
  };

  watch(
    () => studentsUrl.value,
    (updatedStudentsUrl) => {
      fetchStudents();
    }
  );

  return {
    fetchStudents,
    students,
    createStudent,
    errors,
    updateStudent,
    getStudent,
    deleteStudent,
    metaData,
    studentsUrl,
    pageNumber,
    updatedPageNumber,
  };
}
