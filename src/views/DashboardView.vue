<template>
  <PaginateWraper>
    <DeckSlide :decks="decks!" />
    <PaginationComp
      @update-page="setPage"
      :page="page"
      :total-pages="totalPages"
    />
  </PaginateWraper>
</template>

<script setup lang="ts">
import { provide, ref, watch, onMounted } from "vue";
import deckUtils from "@/vueutils/decks";
import type { DeckCards } from "@/types";
import DeckSlide from "@/components/DeckSlide.vue";
import PaginationComp from "@/components/PaginationComp.vue";
import PaginateWraper from "@/components/PaginateWraper.vue";

const decks = ref<DeckCards>([]);
const page = ref(1);
const totalPages = ref(1);

watch(
  page,
  async (newPage) => {
    decks.value = (await deckUtils.getDecks(newPage)) ?? [];
  },
  { immediate: true },
);

onMounted(async () => {
  totalPages.value = await deckUtils.getTotalDecksPages();
});

async function deleteDeck(deckId: number) {
  await deckUtils.deleteDeck(deckId);

  decks.value = decks.value!.filter(({ id }) => id !== deckId);
}

function setPage(newPage: number) {
  page.value = newPage;
}

provide("deleteDeck", deleteDeck);
</script>
