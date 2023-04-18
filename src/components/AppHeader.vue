<!---
  This is the file for the navbar
 --->

<template>
<div>
<!--- Add a v-if condition to control navbar, make it unseen in condition page --->
<nav v-if= "!$route.meta.showNav" class="relative w-full bg-gradient-to-r bg-blue-600 text-white px-4 py-5">

<router-link class="z-30 mx-2" to="/about">Home</router-link>

<button  class="z-30 mx-2 " @click="$emit('open-sign')">Sign Up</button>
<button v-if="isLoggedin" class = "z-30 mx-2" @click="logout">Log out</button>
<button v-else class="z-30 mx-2" @click="$emit('open-login')">Login</button>
<router-link class = "z-30 mx-2" to = "/tutorial">Tutorial</router-link>
<!--- Show button when user log in with an verified email --->
<router-link v-if = "isLoggedin"  class="z-30 mx-2" to="/logchat">CALL</router-link>
<!--- Only shows when user logged in with an unverified email --->
<p v-if="isLoggedin"  class="z-0 absolute inset-y-0 right-2 select-none text-xs">Welcome {{email}}</p>
</nav>
</div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_apiKey,
  authDomain: process.env.VUE_APP_FIREBASE_authDomain,
  projectId: process.env.VUE_APP_FIREBASE_projectId,
  storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
  appId: process.env.VUE_APP_FIREBASE_appId,
  databaseURL: process.env.VUE_APP_FIREBASE_databaseURL
};
const app = initializeApp(firebaseConfig);
console.log(app);
export default {
    //Get variable from app.vue
    props:{
      isLoggedin:Boolean,
      email:String,
    },
    methods:{
        logout()
    {
    const auth = getAuth();
    //When clicking logout, automatically switch back to the about page (main page)
    this.$router.push('/about');
    signOut(auth).then(() => {
        console.log("Log out successfully");
  // Sign-out successful.
    }).catch((error) => {
  // An error happened.
  console.log(error);
    });
        }
    }
}
</script>

<style>

</style>