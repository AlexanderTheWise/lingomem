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
            :to="{ name: 'Study' }"
          ></v-list-item>

          <v-list-item
            title="Add deck"
            prepend-icon="mdi-plus"
            class="px-2"
            :to="{ name: 'AddDeck' }"
          >
          </v-list-item>
        </v-list>

        <v-list>
          <v-list-item
            title="Logout"
            prepend-icon="mdi-logout"
            class="bg-teal-darken-1 rounded-lg px-2"
            @click.stop="signOut"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex justify-center align-center">
        <RouterView v-slot="{ Component }">
          <Suspense>
            <component :is="Component"></component>
          </Suspense>
        </RouterView>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import authUtils from "@/vueutils/auth";

const router = useRouter();

const signOut = async () => {
  await authUtils.signOut();

  router.push({ name: "SignIn" });
};
</script>

<styled scoped lang="css">
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</styled>
