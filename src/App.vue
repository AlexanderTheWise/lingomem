<template>
  <RouterView />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import supabase from "./lib/supabase";
import { RouterView, useRouter } from "vue-router";

const router = useRouter();

watchEffect(() => {
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      router.push({ name: "Dashboard" });
    }

    if (event === "SIGNED_OUT") {
      router.push({ name: "SignIn" });
    }
  });
});
</script>
