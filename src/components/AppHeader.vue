<template>
  <div>
    <nav v-if="!$route.meta.showNav" class="relative w-full bg-gradient-to-r bg-blue-600 text-white px-4 py-5">
      <!-- Three dots menu button -->
      <div class="dropdown z-30 mx-2">
        <button @click="toggleMenu">☰</button>
        <div id="dropdownMenu" class="dropdown-content hidden">
          <router-link to="/">Home</router-link>
          <router-link to="/ContactUs">Contact Us</router-link>
          <router-link v-if="!isLoggedIn" to="/signup">Sign Up</router-link>
          <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
          <router-link to="/AboutUs">About Us</router-link>
          <router-link to="/TermsAndConditions">Terms and Conditions</router-link>
          <router-link to="/PrivacyPolicy">Privacy Policy</router-link>
          <router-link to="/FAQ">FAQ</router-link>
        </div>
      </div>

      <!-- Buttons for authenticated users -->
      <button v-if="isLoggedIn" class="z-30 mx-2" @click="importContacts">Invite your email contacts</button>
      <router-link v-if="isLoggedIn" class="z-30 mx-2" to="/logchat">Make video call</router-link>
      <router-link v-if="isLoggedIn" class="z-30 mx-2" to="/myContacts">My Contacts</router-link>

      <!-- Logout button -->
      <button v-if="isLoggedIn" class="z-30 mx-2" @click="logout">Log out</button>
    </nav>
  </div>
</template>

<script>
import app from '../utilities/firebase.js';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import { getDatabase, ref, push } from 'firebase/database';
import { googleSdkLoaded } from "vue3-google-login"

export default {
  props: {
    isLoggedIn: Boolean,
    email: String,
    userId: String
  },
  methods: {
    logout() {
      // Existing logout code
    },
    importContacts() {
      // Existing importContacts code
    },
    toggleMenu() {
      const menu = document.getElementById('dropdownMenu');
      menu.classList.toggle('hidden');
    }
  }
}
</script>

<style>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}
</style>
