<template>
  <v-form v-model="formValid" @submit.prevent="emit('submitForm')">
    <slot name="fields"></slot>

    <SubmitButton :disabled="!formValid"> </SubmitButton>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SubmitButton from "../SubmitButton.vue";

const formValid = ref(false);

const emit = defineEmits<{ (event: "submitForm"): void }>();
</script>
