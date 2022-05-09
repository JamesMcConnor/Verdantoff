<template>
<div>
<nav v-if= "!$route.meta.showNav" class="relative w-full bg-gradient-to-r bg-blue-600 text-white px-4 py-5">

<router-link class="mx-2" to="/about">Home</router-link>

<button  class="mx-2" @click="$emit('open-sign')">Sign Up</button>
<button v-if="isLoggedin" class = "mx-2" @click="logout">Log out</button>
<button v-else class="mx-2" @click="$emit('open-login')">Login</button>
<router-link v-if = "varified && isLoggedin"  class="mx-2" to="/logchat">CometChat</router-link>
<div v-if="isLoggedin" class="absolute inset-y-0 right-2">Welcome {{email}} {{varifiedMessage}}</div>
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