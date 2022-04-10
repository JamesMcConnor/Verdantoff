import {createRouter,createWebHashHistory} from "vue-router";
import DCHeros from './components/DCHeros';
import Calendar from './components/Calendar';
import Markdown from './components/Markdown';
import Chat from './components/Chat';
import LogChat from './components/LogChat';

const routes = [
    {path:'/dc-heros',component: DCHeros},
    {path:'/calendar',component: Calendar},
    {path:'/markdown',component: Markdown},
    {path:'/chat',component: Chat},
    {path:'/logchat',component: LogChat}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;