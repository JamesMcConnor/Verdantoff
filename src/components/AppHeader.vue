<template>
<div>
<nav class="relative w-full bg-gradient-to-r bg-blue-600 text-white px-4 py-5">
<router-link class="mx-2" to="/about">About Page</router-link>
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
  apiKey: "AIzaSyD1YI91Om_clqONTREybAWTppUV-Ick41M",
  authDomain: "vuetest-b2bcc.firebaseapp.com",
  projectId: "vuetest-b2bcc",
  storageBucket: "vuetest-b2bcc.appspot.com",
  messagingSenderId: "617902258261",
  appId: "1:617902258261:web:a8993773f8ea9ebc3cbcdc",
  databaseURL: "https://vuetest-b2bcc-default-rtdb.asia-southeast1.firebasedatabase.app"
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