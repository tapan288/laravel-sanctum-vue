<script setup>
import useAuth from "../composable/useAuth";

const { user, authenticated } = useAuth();
</script>

<template>
  <div v-if="authenticated">
    {{ user.name }}
  </div>
</template>
