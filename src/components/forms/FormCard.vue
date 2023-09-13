<template>
  <v-card class="pa-2" width="300" :loading="loading">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <slot></slot>
  </v-card>
</template>

<script setup lang="ts">
import { inject } from "vue";

const loading = inject<boolean>("loading");
</script>
