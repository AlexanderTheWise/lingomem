<template>
  <FlashcardForm @submit-flashcard-data="handleAddFlashcard">
    <template #form-title>Add a flashcard</template>
  </FlashcardForm>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import FlashcardForm from "@/components/forms/FlashcardForm.vue";
import type { FlashcardData } from "@/types";
import flashcardUtils from "@/vueutils/flashcards";

const router = useRouter();
const deckId = +useRoute().params.deckId;
const loading = ref(false);

const handleAddFlashcard = async (flashcardData: FlashcardData) => {
  loading.value = true;

  await flashcardUtils.addFlashcard({ ...flashcardData, deck_id: deckId });

  loading.value = false;

  await router.go(-1);
};

provide("submitName", "Create new flashcard");
provide("loading", loading);
</script>
