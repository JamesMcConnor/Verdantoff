<template>
  <div v-if="!$route.meta.showNav" class="relative w-full bg-gradient-to-r bg-blue-600 text-white px-4 py-5">
    <router-link class="navbar-brand" to="/">Home</router-link>
    <div class="dropdown" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
      <button class="dropbtn">☰</button>
      <div class="dropdown-content" v-show="showDropdown">
        <button v-if="isLoggedIn" class="z-30 mx-2" @click="importContacts">Import your Contacts</button>
        <router-link class="z-30 mx-2" to="/ContactUs">Contact Us</router-link>
        <router-link v-if="isLoggedIn" class="z-30 mx-2" to="/logchat">Make video call</router-link>
        <button v-if="isLoggedIn" class="z-30 mx-2" @click="logout">Log out</button>
        <router-link class="z-30 mx-2" to="/privacy">Privacy Policy</router-link>
        <router-link class="z-30 mx-2" to="/about-us">About Us</router-link>
        <router-link class="z-30 mx-2" to="/terms-and-conditions">Terms and Conditions</router-link>
        <router-link v-if="isLoggedIn" class="z-30 mx-2" to="/my-contacts">My Contacts</router-link>
        <button v-else class="z-30 mx-2" @click="$emit('open-login')">Login</button>
        <button class="z-30 mx-2" @click="$emit('open-sign')">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import app from '../utilities/firebase.js';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { getDatabase, ref, push } from 'firebase/database';
import { loadAuth2 } from 'gapi-script'

export default {
  data() {
    return {
      isLoggedIn: false,
      email: '',
      userId: '',
      showDropdown: false
    };
  },
  created() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, user => {
      if(user) {
        this.isLoggedIn = true;
        this.email = user.email;
        this.userId = user.uid;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    logout() {
      const auth = getAuth(app);
      this.$router.push('/about');
      signOut(auth).then(() => {
        this.isLoggedIn = false;
        console.log("Logged out successfully");
      }).catch((error) => {
        console.error("Error logging out:", error);
      });
    },
    async importContacts() {
      const google = await loadAuth2(process.env.VUE_APP_GOOGLE_CLIENT_ID, '')
      if (google.isSignedIn.get()) {
        const googleUser = google.currentUser.get();
        const token = googleUser.getAuthResponse().access_token;
        this.getUserContacts(token);
      }
    },
    async getUserContacts(googleAccessToken) {
      // rest of your getUserContacts code
    },
    // rest of your methods
  }
}
</script>

<!-- rest of your style code -->

