<template>
  <v-app class="d-flex flex-column h-screen">
    <v-layout>
      <v-navigation-drawer permanent rail expand-on-hover class="pa-2">
        <v-list>
          <v-list-item
            title="Dashboard"
            prepend-icon="mdi-view-dashboard"
            :to="{ name: 'Dashboard' }"
            class="px-2"
          >
          </v-list-item>
          <v-list-item
            title="Flashcards"
            prepend-icon="mdi-cards"
            class="px-2"
          ></v-list-item>
        </v-list>

        <v-list>
          <v-list-item
            title="Logout"
            prepend-icon="mdi-logout"
            class="bg-teal-darken-1 rounded-lg px-2"
            @click.stop="authUtils.signOut()"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex align-center">
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import authUtils from "@/vueutils/auth";
import { useRoute } from "vue-router";

const routeName = useRoute().name;
</script>

<styled scoped lang="css">
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</styled>
