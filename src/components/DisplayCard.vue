<template>
  <FlashCard :flashcard="flashcard" />
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import type { Flashcard } from "@/types";
import FlashCard from "./FlashCard.vue";

defineProps<{ flashcard: Flashcard }>();
const isFlipped = ref(false);

function flip() {
  isFlipped.value = !isFlipped.value;
}

provide("flipped", { isFlipped, flip });
</script>
