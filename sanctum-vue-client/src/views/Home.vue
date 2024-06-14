<script setup>
import axios from "axios";
import { reactive } from "vue";

const form = reactive({
  email: "admin@admin.com",
  password: "password",
});

const login = async () => {
  await axios.get("/sanctum/csrf-cookie");
  const response = await axios.post("/login", form);

  console.log(response);
};
</script>

<template>
  <form action="" method="POST" @submit.prevent="login">
    <input
      v-model="form.email"
      type="text"
      name="email"
      id="email"
      placeholder="Email"
    />
    <input
      v-model="form.password"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
    />
    <button type="submit">Login</button>
  </form>
</template>
