<script setup>
import useAuth from "../composable/useAuth";

const { getName } = useAuth();
</script>

<template>
  <div>
    {{ getName }}
  </div>
</template>
