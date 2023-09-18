<template>
  <div
    v-if="studyPhase === StudyPhase.Start"
    class="d-flex flex-column align-center"
  >
    There
    {{
      studyCards.length
        ? studyCards.length > 1
          ? `are ${studyCards.length} cards`
          : "is one card"
        : "are no cards"
    }}
    to review

    <v-btn
      @click="changeStudyPhase(StudyPhase.Studying)"
      v-if="studyCards.length"
      class="d-block mt-5"
      >Start session</v-btn
    >
  </div>

  <StudyCard
    :study-card="studyCards[0]"
    :flipped="isFlipped"
    @study="studyCard"
    v-else-if="studyPhase === StudyPhase.Studying"
  />

  <div v-else>You have completed the study session.</div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import flashcardsUtils from "@/vueutils/flashcards";
import {
  calculateLateness,
  calculateNextReview,
  srsFunc,
} from "@/vueutils/srs";
import StudyCard from "@/components/StudyCard.vue";
import {
  type StudyCards,
  type Score,
  type StudyCardStructure,
  StudyPhase,
} from "@/types";
import supabase from "@/lib/supabase";

const studyCards = ref<StudyCards>(
  await flashcardsUtils.getFlashcardsToReview(),
);
const studyPhase = ref<StudyPhase>(StudyPhase.Start);
const isFlipped = ref(false);

const studyCard = async (
  { interval, efactor, reviews, ...rest }: StudyCardStructure,
  score: Score,
) => {
  const currentTime = Date.now();

  const newSRItem = srsFunc(
    { interval, efactor, reviews },
    {
      score,
      lateness: calculateLateness(
        currentTime,
        new Date(rest.schedule_time).valueOf(),
      ),
    },
  );

  const nextReview = calculateNextReview(currentTime, newSRItem.interval);

  const newCard: StudyCardStructure = {
    ...rest,
    ...newSRItem,
    schedule_time: new Date(nextReview).toISOString(),
  };

  await supabase.from("flashcards").update(newCard).eq("id", newCard.id);

  if (nextReview - currentTime >= 864e5) {
    studyCards.value.splice(0, 1);
  } else {
    studyCards.value.splice(0, 1, newCard);
  }

  studyCards.value = studyCards.value.sort(
    (a, b) =>
      new Date(a.schedule_time).valueOf() - new Date(b.schedule_time).valueOf(),
  );

  if (!studyCards.value.length) {
    changeStudyPhase(StudyPhase.Finished);
  }
};

const changeStudyPhase = (nextStudyPhase: StudyPhase) => {
  studyPhase.value = nextStudyPhase;
};

const flip = () => {
  isFlipped.value = true;
};

provide("flipped", { isFlipped, flip });
</script>
