<template>
  <v-card
    class="pa-2 card d-flex flex-column align-center"
    width="250"
    height="300"
  >
    <v-btn
      class="card-delete"
      icon="mdi-delete-outline"
      variant="tonal"
      color="red-darken-4"
      @click.stop="deleteFlashcard(flashcardId)"
    >
    </v-btn>

    <v-img
      class="rounded-circle"
      cover
      :src="imageUrl"
      :alt="sideContent"
      width="150"
      max-height="150"
    ></v-img>

    <p class="pa-2 flex-grow-1">{{ sideContent }}</p>
  </v-card>
</template>

<script setup lang="ts">
import { inject } from "vue";

defineProps<{
  imageUrl: string;
  sideContent: string;
  flashcardId: number;
}>();

const deleteFlashcard =
  inject<(flashcardId: number) => Promise<void>>("deleteFlashcard")!;
</script>

<styled scoped lang="scss">
.card {
  position: relative;

  &-delete {
    position: absolute;
    right: 2%;
  }
}
</styled>
