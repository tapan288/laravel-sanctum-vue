<script setup>
import { reactive, ref } from "vue";
import useAuth from "@/composable/useAuth";
import router from "@/router";
import axios from "axios";

const form = reactive({
  name: "John Doe",
  email: "john@email.com",
  password: "password",
  password_confirmation: "password",
});

const { attempt } = useAuth();

const errors = ref({});

const register = async () => {
  await axios.get("/sanctum/csrf-cookie");
  await axios
    .post("/register", form)
    .then(() => {
      attempt().then(() => {
        router.push({ name: "dashboard" });
      });
    })
    .catch((error) => {
      if (error.response.status == 422) {
        errors.value = error.response.data.errors;
      }
    });
};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Register
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="register" class="space-y-6">
        <div>
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Name</label
          >
          <div class="mt-2">
            <input
              v-model="form.name"
              id="name"
              name="name"
              type="text"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p
            v-if="errors.name"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ errors.name[0] }}
          </p>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="form.email"
              id="email"
              name="email"
              type="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p
            v-if="errors.email"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ errors.email[0] }}
          </p>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
          <div class="mt-2">
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p
            v-if="errors.password"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ errors.password[0] }}
          </p>
        </div>

        <div>
          <label
            for="password_confirmation"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password Confirmation</label
          >
          <div class="mt-2">
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              name="password_confirmation"
              type="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p
            v-if="errors.password_confirmation"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ errors.password_confirmation[0] }}
          </p>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already Registered?
        <RouterLink
          :to="{ name: 'login' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Login</RouterLink
        >
      </p>
    </div>
  </div>
</template>
