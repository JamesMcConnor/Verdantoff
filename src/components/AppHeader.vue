<!--
  This is the file for the navbar
--->

<template>
  <div>
    <!-- Navbar with gradient background -->
    <nav
      class="relative w-full bg-gradient-to-r from-green-500 from-30% via-blue-500 via-30% to-purple-500 to-90% text-white px-4 py-5">

      <!-- Dropdown button to toggle the menu -->
      <button ref="dropdownButton" @click="toggleDropdown" @mouseenter="showDropdown" @touchstart="onTouchStart"
        class="z-50 mx-2 focus:outline-none relative md:hidden">
        ☰
        <div v-if="dropdown" @mouseleave="hideDropdown"
          class="absolute left-1 mt-2 bg-white rounded-lg shadow-md z-50 text-sm text-black">
          <router-link to="/" class="block w-full px-4 py-2 text-left">
            Home
          </router-link>
          <button v-if="isLoggedIn" @click="importContacts" class="block w-full px-4 py-2 text-left">
            Import your Contacts
          </button>

          <button v-if="isLoggedIn" @click="logout" class="block w-full px-4 py-2 text-left">
            Logout
          </button>

          <button v-else @click="$emit('open-login')" class="block w-full px-4 py-2 text-left">
            Login
          </button>

          <button v-if="!isLoggedIn" @click="$emit('open-sign')" class="block w-full px-4 py-2 text-left">
            Sign Up
          </button>

          <router-link to="/ContactUs" class="block w-full px-4 py-2 text-left whitespace-nowrap">
            Contact Us
          </router-link>
        </div>
      </button>

      <!-- Show navigation links for screens 768px and wider -->
      <div class="hidden md:block text-base">
        <router-link class="navbar-brand" to="/">Home</router-link>
        <button v-if="isLoggedIn" class="z-30 mx-2" @click="importContacts">Import your Contacts</button>
        <router-link class="z-30 mx-2" to="/ContactUs">Contact Us</router-link>
        <router-link class="z-30 mx-2" to="/logchat">Make video call</router-link>
        <button v-if="isLoggedIn" class="z-30 mx-2" @click="logout">Log out</button>
        <button v-else class="z-30 mx-2" @click="$emit('open-login')">Login</button>
        <button v-if="!isLoggedIn" class="z-30 mx-2" @click="$emit('open-sign')">Sign Up</button>
        <router-link class="z-30 mx-2" to="/privacy">Privacy Policy</router-link>
      </div>

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
  //Get variable from app.vue
  props: {
    isLoggedIn: Boolean,
    email: String,
    userId: String
  },
  data() {
    return {
      dropdown: false,
    };
  },
  methods: {
    showDropdown() {
      this.dropdown = true;
    },
    hideDropdown() {
      this.dropdown = false;
    },
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    onTouchStart(event) {
      if (!this.dropdown) {
        event.preventDefault(); // Prevent the default touch behavior
        this.toggleDropdown();
      }
    },
    closeDropdownOnClickOutside(event) {
      if (this.dropdown) {
        const dropdownButton = this.$refs.dropdownButton;
        if (!dropdownButton.contains(event.target)) {
          this.hideDropdown();
        }
      }
    },
    logout() {
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
    },
    importContacts() {
      googleSdkLoaded((google) => {
        google.accounts.oauth2.initTokenClient({
          client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/userinfo.email \
                  https://www.googleapis.com/auth/contacts.readonly',
          callback: async (response) => {
            if (google.accounts.oauth2.hasGrantedAllScopes(response, 'https://www.googleapis.com/auth/contacts.readonly')) {
              console.log("Access granted");
              await this.getUserContacts(response.access_token)
            }
          }
        }).requestAccessToken()
      })
    },
    async getUserContacts(googleAccessToken) {
      if (this.isLoggedIn === true && googleAccessToken && this.userId) {
        // Use Google People API to retrieve contacts
        const url = 'https://people.googleapis.com/v1/people/me/connections?personFields=emailAddresses,names';
        const headers = { 'Authorization': `Bearer ${googleAccessToken}` };
        const response = await axios.get(url, { headers });

        if (response.data.connections) {
          const contacts = response.data.connections.map(connection => {
            const name = connection.names && connection.names[0] && connection.names[0].displayName || '';
            const email = connection.emailAddresses && connection.emailAddresses[0] && connection.emailAddresses[0].value || '';
            return { name, email };
          });

          if (contacts && contacts.length > 0) {
            // Store contacts in Firebase Realtime Database
            const db = getDatabase(app);
            const contactsRef = ref(db, `users/${this.userId}/contacts`);

            contacts.forEach(contact => {
              push(contactsRef, {
                name: contact.name,
                email: contact.email
              });
            });
          }
        }
      } else {
        console.log('You are not loggedIn on the system!')
      }
    },
  },
  mounted() {
    document.body.addEventListener('click', this.closeDropdownOnClickOutside);
  },

  beforeUnmount() {
    document.body.removeEventListener('click', this.closeDropdownOnClickOutside);
  },
}
</script>

<style></style>
