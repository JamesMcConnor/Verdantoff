<template>
<AppHeader :isLoggedin = "isLoggedin" @open-login="isOpen = true" @open-sign="isSign = true" :email=email :varifiedMessage=varifiedMessage :varified=varified />
<div>
  <router-view></router-view>
</div>

<Login v-if="isOpen" @close="isOpen = false"/>
<Signup v-if="isSign" @close = "isSign = false"/>


</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

  components:{ AppHeader, Login, Signup}
}
</script>

<style></style>
