<template>
  <PaginateWraper>
    <v-btn :to="{ name: 'AddFlashcard', params: { deckId } }"
      >Add a new flashcard</v-btn
    >

    <template v-if="flashcards.length">
      <CardSlide :flashcards="flashcards" />

      <PaginationComp
        @update-page="setPage"
        :page="page"
        :total-pages="totalPages"
      />
    </template>
  </PaginateWraper>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { useRoute } from "vue-router";
import flashcardsUtils from "@/vueutils/flashcards";
import CardSlide from "@/components/CardSlide.vue";
import PaginationComp from "@/components/PaginationComp.vue";
import PaginateWraper from "@/components/PaginateWraper.vue";
import type { Flashcards } from "@/types";
import { watchEffect } from "vue";

const deckId = +useRoute().params.deckId;
const flashcards = ref<Flashcards>([]);
const page = ref(1);
const totalPages = ref(0);

watchEffect(async () => {
  flashcards.value =
    (await flashcardsUtils.getFlashcards(deckId, page.value)) ?? [];

  if (!flashcards.value.length && page.value > 1) {
    page.value = 1;
  }

  totalPages.value = await flashcardsUtils.getTotalFlashcardsPages();
});

function setPage(newPage: number) {
  page.value = newPage;
}

async function deleteFlashcard(flashcardId: number, path: string) {
  await flashcardsUtils.deleteFlashcard(flashcardId, path);

  flashcards.value = flashcards.value.filter(({ id }) => id !== flashcardId);
}

provide("deleteFlashcard", deleteFlashcard);
</script>
