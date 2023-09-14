<template>
  <FlashcardForm
    @submit-flashcard-data="handleModifyFlashcard"
    :flashcard="flashcard"
  >
    <template #form-title>Modify flashcard</template>
  </FlashcardForm>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import FlashcardForm from "@/components/forms/FlashcardForm.vue";
import flashcardUtils from "@/vueutils/flashcards";
import type { FlashcardData } from "@/types";

const router = useRouter();
const loading = ref(false);

const flashcard = await flashcardUtils.getFlashcard(
  +useRoute().params.flashcardId,
);

const handleModifyFlashcard = async (flashcardData: FlashcardData) => {
  loading.value = true;

  await flashcardUtils.modifyFlashcard({
    ...flashcardData,
    path: flashcard.imageUrl.split("/").at(-1)!,
    id: flashcard.id,
  });

  loading.value = false;

  await router.go(-1);
};

provide("submitName", "update flashcard");
provide("loading", loading);
</script>
