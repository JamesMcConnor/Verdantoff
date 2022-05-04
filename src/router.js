import {createRouter,createWebHashHistory} from "vue-router";
import About from './components/About';


import LogChat from './components/LogChat';


const routes = [
    {path:'/about',component: About},
    {path:'/logchat',component: LogChat},
    {path:'/',component: About}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;