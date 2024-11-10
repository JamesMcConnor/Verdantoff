<template>
  <!-- Send variables to appheader.vue -->
  <AppHeader :isLoggedIn="isLoggedIn" @open-login="isOpen = true" @open-sign="isSign = true" :email="email" :userId="userId" :verifiedMessage="verifiedMessage" :verified="verified" />
  
  <div>
    <router-view></router-view>
  </div>

  <!-- Send variables to login and signup components -->
  <Login v-if="isOpen" @close="isOpen = false" />
  <Signup v-if="isSign" @close="isSign = false" />

  <!-- Put footer to show in all pages -->
  <Footer :isLoggedIn="isLoggedIn" />
</template>

<script>
// Initialize Firebase
import app from './utilities/firebase.js';
import AppHeader from "./components/AppHeader.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {
      isOpen: false,
      isSign: false,
      isLoggedIn: false,
      userId: null,
      email: '',
      verified: false,
      verifiedMessage: ''
    };
  },

  mounted() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        this.isLoggedIn = true;
        this.userId = user.uid;
        this.email = user.email;
        this.verified = user.emailVerified;
        this.verifiedMessage = this.verified ? " (This email is verified!)" : " (This email is not verified!)";
      } else {
        // User is signed out
        this.isLoggedIn = false;
      }
    });
  },

  components: { AppHeader, Login, Signup, Footer }
};
</script>

<style>
/* Add your global styles here */
</style>

