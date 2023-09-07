<template>
  <v-file-input
    :label="label"
    variant="outlined"
    accept=".webp, .jpg, .jpeg, .png"
    density="compact"
    class="mb-2"
    :rules="rules"
    @update:model-value="
      (files) => {
        $emit('updateFile', files[0]);
      }
    "
  >
  </v-file-input>
</template>

<script setup lang="ts">
const rules: ((value: File[]) => boolean | string)[] = [
  (value) => value.length > 0 || "Required field",
  (value) => /\.(jpg|png|webp|jpeg)$/.test(value[0].name) || "Incorrect format",
  (value) => value[0].size < 3000000 || "Should be less than 3MB",
];

defineEmits<{ (event: "updateFile", file: File): void }>();
defineProps<{ label: string }>();
</script>
