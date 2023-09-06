import "vuetify/styles";
import "@/assets/main.scss";
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from "vue";
import router from "@/router/index";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});

app.use(router);
app.use(vuetify);

app.mount("#app");
