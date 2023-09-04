<template>
  <SlideWrap>
    <DisplayCard
      v-for="flashcard in flashcards"
      :flashcard="flashcard"
      :key="flashcard.id"
    />
  </SlideWrap>
</template>

<script setup lang="ts">
import type { Flashcards } from "@/types";
import DisplayCard from "./DisplayCard.vue";
import SlideWrap from "./SlideWrap.vue";

defineProps<{ flashcards: Flashcards }>();
</script>
