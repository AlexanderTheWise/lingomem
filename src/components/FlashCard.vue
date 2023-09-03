<template>
  <FlipCard>
    <template #front>
      <CardSide
        :flashcard-id="flashcard.id"
        :image-url="flashcard.imageUrl"
        :side-content="flashcard.question"
      />
    </template>

    <template #back>
      <CardSide
        :flashcard-id="flashcard.id"
        :image-url="flashcard.imageUrl"
        :side-content="flashcard.answer"
      />
    </template>
  </FlipCard>
</template>

<script setup lang="ts">
import FlipCard from "./FlipCard.vue";
import CardSide from "./CardSide.vue";
import type { Flashcard } from "@/types";

defineProps<{ flashcard: Flashcard }>();
</script>
