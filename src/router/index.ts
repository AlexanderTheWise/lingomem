import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: "SignIn" },
  },
  {
    path: "/auth",
    component: () => import("@/views/AuthView.vue"),
    children: [
      {
        path: "signin",
        component: () => import("@/views/SignInView.vue"),
        name: "SignIn",
      },
      {
        path: "signup",
        component: import("@/views/SignUpView.vue"),
        name: "SignUp",
      },
    ],
  },
  {
    path: "/app",
    component: () => import("@/views/AppLayout.vue"),
    name: "App",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/DashboardView.vue"),
        name: "Dashboard",
      },
      {
        path: "deck/:deckId",
        component: () => import("@/views/DeckView.vue"),
        name: "Deck",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
