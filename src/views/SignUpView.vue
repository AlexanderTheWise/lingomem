<template>
  <CredentialsForm @submit-credentials="handleSignUp" :submit-error="error">
    <template #form-name> Sign up</template>
    <template #form-link>
      <div class="mt-2">
        Already have an account?
        <RouterLink :to="{ name: 'SignIn' }">Sign in</RouterLink>
      </div>
    </template>
  </CredentialsForm>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import CredentialsForm from "../components/forms/CredentialsForm.vue";
import authUtils from "../vueutils/auth";
import type { UserCredentials } from "@/types";

const error = ref("");

const handleSignUp = async (credentials: UserCredentials) => {
  const signUpError = await authUtils.signUp(credentials);

  error.value = signUpError ?? "";
};

provide("submitName", "Sign up");
</script>
