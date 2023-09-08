<template>
  <v-card class="deck-form-card pa-2" width="300">
    <v-card-title class="text-center">
      <slot name="form-title"></slot>
    </v-card-title>

    <v-divider class="my-2"></v-divider>

    <FormValid @submit-form="handleSubmitDeckForm">
      <template #fields>
        <TextInput
          label="Name"
          icon="mdi-format-text"
          path="name"
          :schema="string().min(4).max(20)"
          :predefined-value="deck?.name"
          @update-value="(name) => (deckData.name = name)"
        />

        <TextArea
          label="Description"
          icon="mdi-text-long"
          path="description"
          :schema="string().max(24)"
          :predefined-value="deck?.description"
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
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { string } from "yup";
import FileInput from "./FileInput.vue";
import TextInput from "./TextInput.vue";
import TextArea from "./TextArea.vue";
import FormValid from "./FormValid.vue";
import { type DeckData, type DeckToModify } from "@/types";

const router = useRouter();

const deckData = reactive<Omit<DeckData, "file"> & { file: File | null }>({
  name: "",
  description: "",
  file: null,
});

const emit = defineEmits<{
  (event: "submitDeckData", deckData: DeckData): Promise<void>;
}>();
defineProps<{ deck?: DeckToModify }>();

async function handleSubmitDeckForm() {
  await emit("submitDeckData", deckData as DeckData);
  await router.push({ name: "Dashboard" });
}
</script>
