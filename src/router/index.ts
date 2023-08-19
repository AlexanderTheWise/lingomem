import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import AuthView from "@/views/AuthView.vue";
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: "SignIn" },
  },
  {
    path: "/auth",
    component: AuthView,
    children: [
      { path: "signin", component: SignInView, name: "SignIn" },
      { path: "signup", component: SignUpView, name: "SignUp" },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
