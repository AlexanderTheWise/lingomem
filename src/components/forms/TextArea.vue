<template>
  <v-textarea
    v-model="value"
    :prepend-icon="icon"
    :label="label"
    variant="outlined"
    density="compact"
    clearable
    rows="2"
    row-height="15"
    no-resize
    class="mb-2"
    :error="!!errors.length"
    :error-messages="errors"
    @input="emit('updateValue', value)"
  >
  </v-textarea>
</template>

<script setup lang="ts">
import type { TextAreaProps } from "@/types";
import { useField } from "vee-validate";

const emit = defineEmits<{ (event: "updateValue", value: string): void }>();
const props = defineProps<TextAreaProps>();

const { value, errors } = useField<string>(props.path, props.schema);
</script>
