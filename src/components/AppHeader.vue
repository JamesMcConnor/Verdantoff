<template>
<div>
<nav v-if= "!$route.meta.showNav" class="relative w-full bg-gradient-to-r bg-blue-600 text-white px-4 py-5">

<router-link class="z-30 mx-2" to="/about">Home</router-link>

<button  class="z-30 mx-2 " @click="$emit('open-sign')">Sign Up</button>
<button v-if="isLoggedin" class = "z-30 mx-2" @click="logout">Log out</button>
<button v-else class="z-30 mx-2" @click="$emit('open-login')">Login</button>
<router-link class = "z-30 mx-2" to = "/tutorial">Tutorial</router-link>
<router-link v-if = "varified && isLoggedin"  class="z-30 mx-2" to="/logchat">CometChat</router-link>
<p v-if="isLoggedin && !varified"  class="z-0 absolute inset-y-0 right-2 select-none text-xs">Welcome {{email}} {{varifiedMessage}}</p>
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
    props:{
      isLoggedin:Boolean,
      email:String,
      varifiedMessage:String,
      varified:Boolean
    },
    methods:{
        logout()
    {
    const auth = getAuth();
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