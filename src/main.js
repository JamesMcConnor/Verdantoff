/*
 * @Author: Tai Zhang
 */
import { createApp, VueElement } from 'vue'
import App from './App.vue'
import "./assets/style.css";
import router from './router';

import global_ from './config/Global';

const app = createApp(App);
//global vars
VueElement.prototype.GLOBAL = global_;
app.use(router);
app.mount("#app");

