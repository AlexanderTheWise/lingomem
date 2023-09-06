<template>
  <v-text-field
    :prepend-icon="icon"
    v-model="value"
    :label="label"
    variant="outlined"
    density="compact"
    :type="type"
    class="mb-2"
    :error="!!errors.length"
    :error-messages="errors"
    @input="emit('updateValue', value)"
  >
  </v-text-field>
</template>

<script setup lang="ts">
import type { TextInputProps } from "@/types";
import { useField } from "vee-validate";

const emit = defineEmits<{ (event: "updateValue", value: string): void }>();

const props = defineProps<TextInputProps>();

const { value, errors } = useField<string>(props.path, props.schema.required());
</script>
