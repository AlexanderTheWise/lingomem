<template>
  <CredentialsForm :submit-error="error" @submit="handleSignIn">
    <template #form-name>Sign in</template>
    <template #form-link>Form link</template>
  </CredentialsForm>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UserCredentials } from "@/types";
import CredentialsForm from "@/components/forms/CredentialsForm.vue";
import { signIn } from "@/vueutils/auth";

const error = ref("");

const handleSignIn = async (credentials: UserCredentials) => {
  const signInError = await signIn(credentials);

  error.value = signInError ?? "";
};
</script>
