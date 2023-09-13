<template>
  <RouterView />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import supabase from "./lib/supabase";
import { RouterView, useRouter } from "vue-router";

const router = useRouter();

watchEffect(async () => {
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_OUT") {
      await router.push({ name: "SignIn" });
    }
  });
});
</script>
