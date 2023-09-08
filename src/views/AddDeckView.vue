<template>
  <DeckForm @submit-deck-data="handleAddDeck">
    <template #form-title> Add a new deck </template>
  </DeckForm>
</template>

<script setup lang="ts">
import DeckForm from "@/components/forms/DeckForm.vue";
import deckUtils from "@/vueutils/decks";
import type { DeckData } from "@/types";
import { provide } from "vue";

const handleAddDeck = async (deckData: DeckData) => {
  await deckUtils.addDeck(deckData);
};

provide("submitName", "Create new deck");
</script>
