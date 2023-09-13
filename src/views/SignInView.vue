<template>
  <CredentialsForm :submit-error="error" @submit-credentials="handleSignIn">
    <template #form-name>Sign in</template>
    <template #form-link>
      <div class="mt-2">
        Don't have an account?
        <RouterLink :to="{ name: 'SignUp' }">Sign up</RouterLink>
      </div>
    </template>
  </CredentialsForm>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { provide, ref } from "vue";
import type { UserCredentials } from "@/types";
import CredentialsForm from "@/components/forms/CredentialsForm.vue";
import authUtils from "@/vueutils/auth";

const router = useRouter();
const error = ref("");

const handleSignIn = async (credentials: UserCredentials) => {
  const signInError = await authUtils.signIn(credentials);

  error.value = signInError ?? "";

  if (!error.value) {
    router.push({ name: "Dashboard" });
  }
};

provide("submitName", "Sign in");
</script>
