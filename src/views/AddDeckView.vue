<template>
  <DeckForm @submit-deck-data="handleAddDeck">
    <template #form-title> Add a new deck </template>
  </DeckForm>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { useRouter } from "vue-router";
import DeckForm from "@/components/forms/DeckForm.vue";
import deckUtils from "@/vueutils/decks";
import type { DeckData } from "@/types";

const router = useRouter();
const loading = ref(false);

const handleAddDeck = async (deckData: DeckData) => {
  loading.value = true;

  const deckId = await deckUtils.addDeck(deckData);

  loading.value = false;

  router.push({ name: "Deck", params: { deckId } });
};

provide("submitName", "Create new deck");
provide("loading", loading);
</script>
