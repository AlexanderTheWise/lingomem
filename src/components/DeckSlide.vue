<template>
  <div class="decks">
    <DeckCard v-for="deck in decks" :deck="deck" :key="deck.id" />
  </div>
</template>

<script setup lang="ts">
import type { DeckCards } from "@/types";
import DeckCard from "./DeckCard.vue";

defineProps<{
  decks: DeckCards;
}>();
</script>

<style scoped lang="scss">
.decks {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-template-rows: repeat(auto-fit, 300px);
}

@media (520px <= width <= 1060px) {
  .decks {
    grid-template-columns: repeat(2, 250px);
  }
}

@media (width >= 1060px) {
  .decks {
    grid-template-columns: repeat(4, 250px);
  }
}
</style>
