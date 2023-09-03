<template>
  <PaginateWraper>
    <CardSlide :flashcards="flashcards" />

    <PaginationComp
      @update-page="setPage"
      :page="page"
      :total-pages="totalPages"
    />
  </PaginateWraper>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, provide } from "vue";
import { useRoute } from "vue-router";
import flashcardsUtils from "@/vueutils/flashcards";
import CardSlide from "@/components/CardSlide.vue";
import PaginationComp from "@/components/PaginationComp.vue";
import PaginateWraper from "@/components/PaginateWraper.vue";
import type { Flashcards } from "@/types";

const deckId = +useRoute().params.deckId;
const flashcards = ref<Flashcards>([]);
const page = ref(1);
const totalPages = ref(1);

watch(
  page,
  async (newPage) => {
    flashcards.value =
      (await flashcardsUtils.getFlashcards(deckId, newPage)) ?? [];
  },
  { immediate: true },
);

function setPage(newPage: number) {
  page.value = newPage;
}

onMounted(async () => {
  totalPages.value = await flashcardsUtils.getTotalFlashcardsPages();
});

async function deleteFlashcard(flashcardId: number) {
  await flashcardsUtils.deleteFlashcard(flashcardId);

  flashcards.value = flashcards.value.filter(({ id }) => id !== flashcardId);
}

provide("deleteFlashcard", deleteFlashcard);
</script>
