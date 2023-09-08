<template>
  <DeckForm @submit-deck-data="handleModifyDeck" :deck="deck">
    <template #form-title> Update deck </template>
  </DeckForm>
</template>

<script setup lang="ts">
import { provide } from "vue";
import { useRoute } from "vue-router";
import DeckForm from "@/components/forms/DeckForm.vue";
import deckUtils from "@/vueutils/decks";
import type { DeckData } from "@/types";

let deck = await deckUtils.getDeck(useRoute().params.deckId as string);

const handleModifyDeck = async (deckData: DeckData) => {
  await deckUtils.modifyDeck({
    id: deck.id,
    path: deck.imageUrl.split("/").at(-1)!,
    ...deckData,
  });
};

provide("submitName", "Modify deck");
</script>
