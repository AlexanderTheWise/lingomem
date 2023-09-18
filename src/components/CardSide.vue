<template>
  <v-card
    class="pa-2 card d-flex flex-column align-center"
    width="250"
    height="300"
  >
    <v-btn
      class="card-modify"
      icon="mdi-text-box-edit-outline"
      variant="tonal"
      color="blue-darken-3"
      :to="{
        name: 'ModifyFlashcard',
        params: { flashcardId: flashcard.id, deckId: flashcard.deck_id },
      }"
    ></v-btn>

    <v-btn
      class="card-delete"
      icon="mdi-delete-outline"
      variant="tonal"
      color="red-darken-4"
      @click.stop="
        deleteFlashcard(flashcard.id, flashcard.imageUrl.split('/').at(-1)!)
      "
      v-if="routeName !== 'Study'"
    >
    </v-btn>

    <v-img
      class="rounded-circle"
      cover
      :src="flashcard.imageUrl"
      :alt="sideContent"
      width="150"
      max-height="150"
    ></v-img>

    <p class="pa-2 flex-grow-1">{{ sideContent }}</p>
  </v-card>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useRoute } from "vue-router";
import type { Flashcard } from "@/types";

const routeName = useRoute().name;

defineProps<{
  flashcard: Flashcard;
  sideContent: string;
}>();

const deleteFlashcard =
  inject<(flashcardId: number, path: string) => Promise<void>>(
    "deleteFlashcard",
  )!;
</script>

<styled scoped lang="scss">
.card {
  position: relative;
}
</styled>
