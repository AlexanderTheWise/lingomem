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

      <FormValid @submit-form="$emit('submitCredentials', credentials)">
        <template #fields>
          <TextInput
            label="Email adress"
            type="email"
            path="email"
            :schema="string().email()"
            @update-value="(email) => (credentials.email = email)"
          />

          <TextInput
            label="Password"
            type="password"
            path="password"
            :schema="string().min(8).max(24)"
            @update-value="(password) => (credentials.password = password)"
          />

          <v-divider></v-divider>

          <p class="submit-error mb-2">{{ submitError }}</p>
        </template>
      </FormValid>

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
import { reactive } from "vue";
import { string } from "yup";
import type { UserCredentials } from "@/types";
import TextInput from "./TextInput.vue";
import FormValid from "./FormValid.vue";

const credentials = reactive<UserCredentials>({
  email: "",
  password: "",
});

defineEmits<{
  (event: "submitCredentials", credentials: UserCredentials): Promise<void>;
}>();

defineProps<{ submitError: string }>();
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
