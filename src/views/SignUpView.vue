<template>
  <CredentialsForm @submit="handleSignUp" :submit-error="error">
    <template #form-name> Sign up</template>
    <template #form-link> Form link</template>
  </CredentialsForm>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CredentialsForm from "../components/forms/CredentialsForm.vue";
import { signUp } from "../vueutils/auth";
import type { UserCredentials } from "@/types";

const error = ref("");

const handleSignUp = async (credentials: UserCredentials) => {
  const signUpError = await signUp(credentials);

  error.value = signUpError ?? "";
};
</script>
