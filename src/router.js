import {createRouter,createWebHashHistory} from "vue-router";
import About from './components/About';
import Calendar from './components/Calendar';
import Markdown from './components/Markdown';
import Chat from './components/Chat';
import LogChat from './components/LogChat';


const routes = [
    {path:'/about',component: About},
    {path:'/calendar',component: Calendar},
    {path:'/markdown',component: Markdown},
    {path:'/chat',component: Chat},
    {path:'/logchat',component: LogChat},
    {path:'/',component: About}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;