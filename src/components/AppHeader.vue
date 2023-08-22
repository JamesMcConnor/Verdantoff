<!--
  This is the file for the navbar
--->

<template>
  <div>
    <!-- Navbar with gradient background -->
    <nav
      class="bg-gradient-to-r from-green-500 from-30% via-blue-500 via-30% to-purple-500 to-90% text-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="w-full block auto">
        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
          class="inline-flex items-center p-2 ml-3 w-10 h-10 text-gray-700 rounded bg-transparent md:border-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
          @click="toggleDropdownMenu" @mouseenter="openDropdownMenu" @touchstart="onTouchStart">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg></button>

        <!-- Dropdown menu -->
        <div v-if="dropdownMenuOpen" id="dropdownNavbar"
          class="absolute z-10 ml-3 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          @mouseleave="closeDropdownMenu">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
            <li>
              <router-link class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                to="/">Home</router-link>
            </li>
            <li>
              <button v-if="isLoggedIn" class="w-full flex flex-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="logout">Logout</button>
              <button v-else class="w-full flex flex-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="$emit('open-login')">Login</button>
            </li>
            <li v-if="!isLoggedIn">
              <button class="w-full flex flex-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="$emit('open-sign')">Sign
                Up</button>
            </li>
            <li v-if="isLoggedIn">
              <button class="w-full flex flex-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-base"
                @click="importContacts">Import
                your Contacts</button>
            </li>
            <li v-if="isLoggedIn">
              <router-link class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                to="/logchat">Make video
                call</router-link>
            </li>
            <li>
              <router-link class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                to="/privacy">Privacy
                Policy</router-link>
            </li>
            <li>
              <router-link class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                to="/ContactUs">Contact
                Us</router-link>
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
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
  //Get variable from app.vue
  props: {
    isLoggedIn: Boolean,
    email: String,
    userId: String
  },
  data() {
    return {
      dropdownMenuOpen: false,
    };
  },
  methods: {
    openDropdownMenu() {
      this.dropdownMenuOpen = true;
    },
    closeDropdownMenu() {
      this.dropdownMenuOpen = false;
    },
    toggleDropdownMenu() {
      this.dropdownMenuOpen = !this.dropdownMenuOpen;
    },
    onTouchStart(event) {
      if (!this.dropdownMenuOpen) {
        event.preventDefault(); // Prevent the default touch behavior
        this.toggleDropdownMenu();
      }
    },
    closeDropdownOnClickOutside(event) {
      if (this.dropdownMenuOpen) {
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
        toast.success("Log out successfully");
      }).catch((error) => {
        toast.error(error)
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
              toast.info("Access granted");
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
        toast.error('You are not loggedIn on the system!');
      }
    },
  }
}
</script>

<style></style>
