<template>
  <SlideWrap>
    <DeckCard v-for="deck in decks" :deck="deck" :key="deck.id" />
  </SlideWrap>
</template>

<script setup lang="ts">
import type { DeckCards } from "@/types";
import DeckCard from "./DeckCard.vue";
import SlideWrap from "./SlideWrap.vue";

defineProps<{
  decks: DeckCards;
}>();
</script>
