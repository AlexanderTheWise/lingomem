import supabase from "@/lib/supabase";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

const getUser = async () => (await supabase.auth.getUser()).data.user;

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: "SignIn" },
  },
  {
    path: "/auth",
    component: () => import("@/views/AuthView.vue"),
    name: "Auth",
    meta: {
      requiresAuth: false,
    },
    beforeEnter: async (_, from) => {
      if (from.meta.requiresAuth && (await getUser())) return false;
    },
    children: [
      {
        path: "signin",
        component: () => import("@/views/SignInView.vue"),
        name: "SignIn",
      },
      {
        path: "signup",
        component: () => import("@/views/SignUpView.vue"),
        name: "SignUp",
      },
    ],
  },
  {
    path: "/app",
    component: () => import("@/views/AppLayout.vue"),
    name: "App",
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async (_, from) => {
      if (!from.meta.requiresAuth && !(await getUser())) return false;
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/DashboardView.vue"),
        name: "Dashboard",
      },
      {
        path: "study",
        component: () => import("@/views/ReviewView.vue"),
        name: "Study",
      },
      {
        path: "deck/:deckId",
        component: () => import("@/views/DeckView.vue"),
        name: "Deck",
      },
      {
        path: "deck/:deckId/modify",
        component: () => import("@/views/ModifyDeckView.vue"),
        name: "ModifyDeck",
      },
      {
        path: "deck/add",
        component: () => import("@/views/AddDeckView.vue"),
        name: "AddDeck",
      },
      {
        path: ":deckId/flashcard/add",
        component: () => import("@/views/AddFlashcardView.vue"),
        name: "AddFlashcard",
      },
      {
        path: ":deckId/:flashcardId/modify",
        component: () => import("@/views/ModifyFlashcard.vue"),
        name: "ModifyFlashcard",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
