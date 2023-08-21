<!--
  This is the file for the navbar
--->

<template>
  <div>
    <!-- Navbar with gradient background -->
    <nav class="bg-gradient-to-r from-green-500 from-30% via-blue-500 via-30% to-purple-500 to-90% text-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-start mx-auto px-4 py-2.5">
        <button data-collapse-toggle="navbar-dropdown" type="button"
          class="inline-flex items-center p-2 ml-3 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown" aria-expanded="false" @click="toggleMobileMenu">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <!-- Show navigation links for small screens (less than 768px) -->
        <div class="w-full md:hidden lg:hidden xl:hidden" id="navbar-dropdown" v-show="mobileMenuOpen">
          <ul
            class="flex flex-col p-4 mt-4 dark:text-white">
            <li>
              <router-link
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                to="/">Home</router-link>
            </li>
            <li v-if="isLoggedIn">
              <button 
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0 text-base"
                @click="importContacts">Import your Contacts</button>
            </li>
            <li v-if="isLoggedIn">
              <router-link
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                to="/logchat">Make video call</router-link>
            </li>
            <li>
              <button v-if="isLoggedIn"
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                @click="logout">Logout</button>
              <button v-else
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                @click="$emit('open-login')">Login</button>
            </li>
            <li v-if="!isLoggedIn">
              <button
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                @click="$emit('open-sign')">Sign Up</button>
            </li>
            <li>
              <router-link
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                to="/ContactUs">Contact Us</router-link>
            </li>
            <li>
              <router-link
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                to="/privacy">Privacy Policy</router-link>
            </li>
          </ul>
        </div>

        <!-- Show navigation links for screens 768px and wider -->
        <div class="hidden md:block lg:block xl:block">
          <ul
            class="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm dark:text-white">
            <li>
              <router-link
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                to="/">Home</router-link>
            </li>
            <li v-if="isLoggedIn">
              <button 
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0 text-base"
                @click="importContacts">Import your Contacts</button>
            </li>
            <li v-if="isLoggedIn">
              <router-link
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                to="/logchat">Make video call</router-link>
            </li>
            <li>
              <button v-if="isLoggedIn"
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                @click="logout">Logout</button>
              <button v-else
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                @click="$emit('open-login')">Login</button>
            </li>
            <li v-if="!isLoggedIn">
              <button
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                @click="$emit('open-sign')">Sign Up</button>
            </li>
            <li>
              <router-link
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                to="/ContactUs">Contact Us</router-link>
            </li>
            <li>
              <router-link
                class="block py-2 pl-3 pr-4 md:bg-transparent md:p-0"
                to="/privacy">Privacy Policy</router-link>
            </li>
          </ul>
        </div>
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
      mobileMenuOpen: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
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
  }
}
</script>

<style></style>
