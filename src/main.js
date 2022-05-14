import { createApp } from 'vue'
import App from './App.vue'
import "./assets/style.css";
import router from './router';

const app = createApp(App);
//global vars
app.config.globalProperties.$bgCounter = 1;
app.use(router);
app.mount("#app");

