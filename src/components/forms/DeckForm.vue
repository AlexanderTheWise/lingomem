<template>
  <v-card class="deck-form-card pa-2" width="300">
    <v-card-title class="text-center">
      <slot name="form-title"></slot>
    </v-card-title>

    <v-divider class="my-2"></v-divider>

    <FormValid @submit-form="$emit('submitDeckData', deckData)">
      <template #fields>
        <TextInput
          label="Name"
          icon="mdi-format-text"
          path="name"
          :schema="string().min(4).max(20)"
          @update-value="(name) => (deckData.name = name)"
        />

        <TextArea
          label="Description"
          icon="mdi-text-long"
          path="description"
          :schema="string().max(24)"
          @update-value="(description) => (deckData.description = description)"
        />

        <FileInput
          label="Image"
          @update-file="(payload) => (deckData.file = payload)"
        />
      </template>
    </FormValid>
  </v-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { string } from "yup";
import FileInput from "./FileInput.vue";
import TextInput from "./TextInput.vue";
import TextArea from "./TextArea.vue";
import FormValid from "./FormValid.vue";
import { type DeckData } from "@/types";

const deckData = reactive<Omit<DeckData, "file"> & { file: File | null }>({
  name: "",
  description: "",
  file: null,
});

defineEmits<{ (event: "submitDeckData", deckData: DeckData): Promise<void> }>();
</script>
