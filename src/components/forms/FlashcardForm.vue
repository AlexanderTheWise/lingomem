<template>
  <FormCard>
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title class="text-center">
      <slot name="form-title"></slot>
    </v-card-title>

    <v-divider class="my-2"></v-divider>

    <FormValid @submit-form="handleSubmitFlashcardForm">
      <template #fields>
        <TextInput
          label="Question"
          path="question"
          :schema="string().max(40)"
          :predefined-value="flashcard?.question"
          @update-value="(question) => (flashcardData.question = question)"
        />

        <TextArea
          label="Answer"
          path="answer"
          :schema="string().max(60)"
          :predefined-value="flashcard?.answer"
          @update-value="(answer) => (flashcardData.answer = answer)"
        />

        <FileInput
          label="Image"
          @update-file="(file) => (flashcardData.file = file)"
        />
      </template>
    </FormValid>
  </FormCard>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { string } from "yup";
import FormValid from "./FormValid.vue";
import TextInput from "./TextInput.vue";
import TextArea from "./TextArea.vue";
import FileInput from "./FileInput.vue";
import FormCard from "./FormCard.vue";
import { type FlashcardData } from "@/types";
import type { Flashcard } from "@/types";

const flashcardData = reactive<
  Omit<FlashcardData, "file"> & { file: File | null }
>({
  question: "",
  answer: "",
  file: null,
});

const emit = defineEmits<{
  (event: "submitFlashcardData", flashcardData: FlashcardData): Promise<void>;
}>();
defineProps<{ flashcard?: Flashcard }>();

async function handleSubmitFlashcardForm() {
  await emit("submitFlashcardData", flashcardData as FlashcardData);
}
</script>
