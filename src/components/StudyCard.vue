<template>
  <v-sheet elevation="2" class="pa-5 d-flex flex-column align-center">
    <FlashCard :flashcard="studyCard" />

    <div class="mt-4 scores" v-if="flipped">
      <v-btn
        v-for="{ score, label } in buttons"
        :key="score"
        @click.stop="study(score)"
      >
        {{ label }}</v-btn
      >
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { Score, StudyCardStructure } from "@/types";
import FlashCard from "./FlashCard.vue";

const buttons = [
  { score: 1, label: "again" },
  { score: 2, label: "hard" },
  { score: 3, label: "moderate" },
  { score: 4, label: "easy" },
  { score: 5, label: "very easy" },
];

const { studyCard } = defineProps<{
  studyCard: StudyCardStructure;
  flipped: boolean;
}>();

const emit = defineEmits<{
  (event: "study", studyCard: StudyCardStructure, score: Score): Promise<void>;
}>();

const study = async (score: number) => {
  await emit("study", studyCard, score as Score);
};
</script>

<styled scoped lang="css">
.scores {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 10px;
}

.v-btn:last-child {
  grid-column: span 2;
}
</styled>
