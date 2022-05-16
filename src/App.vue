<!--
 * @Author: Tai Zhang
-->
<template>
<AppHeader :isLoggedin = "isLoggedin" @open-login="isOpen = true" @open-sign="isSign = true" :email=email :varifiedMessage=varifiedMessage :varified=varified />
<div>
  <router-view></router-view>
</div>

<Login v-if="isOpen" @close="isOpen = false"/>
<Signup v-if="isSign" @close = "isSign = false"/>

<Footer></Footer>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Footer from "./components/Footer.vue";


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

export default{
    data(){
    return {
      isOpen: false,
      isSign: false,
      isLoggedin: false,
      email: '',
      varified: false,
      varifiedMessage: ''
    };
  },

  mounted()
  {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    this.isLoggedin = true;
    const uid = user.uid;
    this.email = user.email;
    this.varified = user.emailVerified;
    if(this.varified == false)
    {
      this.varifiedMessage = " (This email is not varified!)";
    }else if(this.varified == true)
    {
      this.varifiedMessage = " (This email is varified!)";
    }
    console.log(uid);
    // ...
  } else {
    // User is signed out
    // ...
    this.isLoggedin = false
  }
});
  },

  components:{ AppHeader, Login, Signup, Footer }
}
</script>

<style></style>
