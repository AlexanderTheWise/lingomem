<template>
  <v-btn
    type="submit"
    size="large"
    block
    rounded="xl"
    variant="flat"
    color="teal-darken-4"
    :disabled="disabled"
  >
    {{ submitName }}
  </v-btn>
</template>

<script setup lang="ts">
import { inject } from "vue";

const submitName = inject<string>("submitName");
defineProps<{ disabled: boolean }>();
</script>
