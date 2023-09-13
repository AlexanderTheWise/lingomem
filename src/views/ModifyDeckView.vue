<template>
  <DeckForm @submit-deck-data="handleModifyDeck" :deck="deck">
    <template #form-title> Update deck </template>
  </DeckForm>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import DeckForm from "@/components/forms/DeckForm.vue";
import deckUtils from "@/vueutils/decks";
import type { DeckData } from "@/types";

const loading = ref(false);
const router = useRouter();
const deck = await deckUtils.getDeck(useRoute().params.deckId as string);

const handleModifyDeck = async (deckData: DeckData) => {
  loading.value = true;

  await deckUtils.modifyDeck({
    id: deck.id,
    path: deck.imageUrl.split("/").at(-1)!,
    ...deckData,
  });

  loading.value = false;

  router.push({ name: "Deck", params: { deckId: deck.id } });
};

provide("submitName", "Modify deck");
provide("loading", loading);
</script>
