import {createRouter,createWebHashHistory} from "vue-router";
import About from './components/About';
import LogChat from './components/LogChat';
import TermOfUse from './components/TermOfUse';

const routes = [
    {path:'/about',component: About},
    {path:'/logchat',component: LogChat},
    {path:'/term', component: TermOfUse, meta:{
        showNav: true
    }},
    {path:'/',component: About}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;