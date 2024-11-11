/*
 * @Author: Tai Zhang
 */
import { createApp, VueElement } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from "./router";

import global_ from "./config/Global";

const app = createApp(App);
//global vars
VueElement.prototype.GLOBAL = global_;
app.use(router);

// Add Vue Toastification as a plugin
app.use(Toast, {
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
});

app.mount("#app");
