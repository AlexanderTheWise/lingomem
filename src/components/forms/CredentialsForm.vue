<template>
  <div class="outer-container">
    <v-card
      class="pa-5 text-center form-card"
      max-width="300"
      variant="outlined"
    >
      <v-card-item class="d-flex justify-center">
        <v-card-title>
          <slot name="form-name"></slot> to continue
        </v-card-title>
        <v-card-subtitle class="font-italic"
          >Making learning a way of life</v-card-subtitle
        >
      </v-card-item>

      <v-form v-model="meta.valid" @submit.prevent="handleOnSubmit">
        <v-text-field
          label="Email address"
          variant="outlined"
          density="compact"
          type="email"
          class="text-left mb-2"
          :error="!!errors.email || !!submitError"
          v-bind="email"
        >
          <template #details>
            <div class="textfield-error w-100">
              {{ errors.email }}
            </div>
          </template>
        </v-text-field>

        <v-text-field
          label="Password"
          variant="outlined"
          density="compact"
          type="password"
          class="text-left mb-2"
          :error="!!errors.password || !!submitError"
          v-bind="password"
        >
          <template #details>
            <div class="textfield-error w-100">
              {{ errors.password }}
            </div>
          </template>
        </v-text-field>

        <v-divider></v-divider>

        <p class="submit-error mb-2">{{ submitError }}</p>

        <v-btn
          size="large"
          block
          rounded="xl"
          variant="flat"
          :loading="submitLoading"
          :color="meta.valid ? 'teal-darken-4' : 'teal-lighten-4'"
          @click="handleOnSubmit"
        >
          <slot name="form-name"></slot>
        </v-btn>
      </v-form>

      <v-divider> </v-divider>

      <slot name="form-link"></slot>
    </v-card>

    <div
      class="under-card w-100 h-100"
      v-for="n in 5"
      :key="n"
      :style="{
        zIndex: `${-n}`,
        transform: `rotate(${n * 2 + 'deg'}) translateX(${-n + 'px'})`,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { UserCredentials } from "@/types";

const { defineInputBinds, handleSubmit, errors, meta } =
  useForm<UserCredentials>({
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8, "Must be at least 8 characters")
        .max(24, "Must be at most 24 characters")
        .required(),
    }),
  });

const submitLoading = ref(false);
const email = defineInputBinds("email", { validateOnInput: true });
const password = defineInputBinds("password", { validateOnInput: true });

const emit = defineEmits<{
  (event: "submit", credentials: UserCredentials): Promise<void>;
}>();
defineProps<{ submitError: string }>();

const handleOnSubmit = handleSubmit(async (values) => {
  await emit("submit", values);
});
</script>

<styled scoped lang="scss">
.outer-container {
  position: relative;
  max-width: fit-content;
}

.v-card.form-card {
  z-index: 1;
  background: white;
  transform: rotate(5deg);
}

.textfield-error {
  color: #b00020;
  white-space: nowrap;

  &::first-letter {
    text-transform: capitalize;
  }
}

.submit-error {
  height: 24px;
  color: #b00020;
}

.under-card {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid;
  background: white;
}
</styled>
