<!---
  This is the file for the navbar
 --->

<template>
  <div>
    <!--- Add a v-if condition to control navbar, make it unseen in condition page --->
    <nav v-if="!$route.meta.showNav" class="relative w-full bg-gradient-to-r bg-blue-600 text-white px-4 py-5">

      <router-link class="navbar-brand" to="/">VerdantOff</router-link>
      <button v-if="isLoggedin" class="z-30 mx-2" @click="importContacts">Import your Contacts</button>
      <a href="mailto:jamesfrontechcorp@gmail.com" class="z-30 mx-2">Contact Us</a>
      <router-link class="z-30 mx-2" to="/logchat">Make video call</router-link>
      <router-link class="z-30 mx-2" to="/about">About</router-link>
      <button v-if="isLoggedin" class="z-30 mx-2" @click="logout">Log out</button>
      <button v-else class="z-30 mx-2" @click="$emit('open-login')">Login</button>
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
    isLoggedin: Boolean,
    email: String,
    userId: String
  },
  methods: {
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
      if (this.isLoggedin === true && googleAccessToken && this.userId) {
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