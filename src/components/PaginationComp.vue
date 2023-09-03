<template>
  <v-pagination
    total-visible="4"
    v-model="currentPage"
    rounded="circle"
    :length="totalPages"
  >
  </v-pagination>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ page: number; totalPages: number }>();
const emit = defineEmits<{ (event: "updatePage", newPage: number): void }>();

const currentPage = computed({
  get() {
    return props.page;
  },
  set(newPage) {
    emit("updatePage", newPage);
  },
});
</script>
