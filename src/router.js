/*
 * File for controlling vue routing
 */
import {createRouter, createWebHashHistory} from "vue-router";
import About from './components/About';
import LogChat from './components/LogChat';
import AboutUs from './components/AboutUs'
import TermOfUse from './components/TermOfUse';
import ContactUs from './components/ContactUs';
import MyContacts from './components/MyContact';
import Tutorial from './components/tutorial';
import Privacy from './components/Privacy';

const routes = [
    {path: '/about', component: About},
    {path: '/logchat', component: LogChat},
    {
        //Add a boolean condition to control navbar and footer.
        path: '/term', component: TermOfUse, meta: {
            showNav: true
        }
    },
    {path: '/', component: About},
    {path: '/tutorial', component: Tutorial},
    {path: '/privacy', component: Privacy},
    {path: '/aboutus', component: AboutUs},
    {path: '/contactus', component: ContactUs},
    {path: '/mycontacts', component: MyContacts},

]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;