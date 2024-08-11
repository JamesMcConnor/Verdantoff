<!--
  This is the file for the navbar
--->

<template>
  <div v-if="processing" class="loader">
    <div class="spinner"></div>
  </div>

  <div @mouseleave="closeDropdownMenu">
    <!-- Navbar with gradient background -->
    <nav
      class="bg-gradient-to-r from-white from-20% via-black-500 via-50% to-black-700 to-90% text-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 drop-shadow-lg">
      <div class="w-full block auto">
        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
          class="inline-flex items-center p-2 ml-3 w-10 h-10 gold-text-light shadow rounded bg-transparent border border-white md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
          @click="toggleDropdownMenu" @mouseenter="openDropdownMenu" @touchstart="onTouchStart">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg></button>

        <!-- Dropdown menu -->
        <div v-if="dropdownMenuOpen" id="dropdownNavbar"
          class="absolute z-50 ml-3 font-normal bg-black border divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          @mouseleave="closeDropdownMenu">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
            <li>
              <router-link class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                to="/">Home</router-link>
            </li>
            <li>
              <div v-if="isLoggedIn" class="block px-4 py-2 gold-text hover:bg-white cursor-pointer" @click="logout">
                Logout</div>
              <div v-else class="block px-4 py-2 gold-text hover:bg-white cursor-pointer" @click="handleLoginClick">
                Login
              </div>
            </li>
            <li v-if="!isLoggedIn">
              <div class="block px-4 py-2 gold-text hover:bg-white cursor-pointer" @click="handleSignUpClick">Sign
                Up</div>
            </li>
            <li v-if="isLoggedIn">
              <button
                class="w-full flex flex-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="importContacts" :disabled="processing">Import
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

  <!-- Contact Selection Modal -->
  <div id="default-modal" v-if="showModal" tabindex="-1" aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center max-h-screen">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-black rounded-lg shadow border">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 class="text-xl font-semibold gold-text-light dark:text-white">
            Select Contacts to Import
          </h3>
          <button type="button"
            class="gold-text-light bg-transparent hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body with fixed height -->
        <div class="p-4 md:p-5 space-y-4 overflow-y-auto" style="height: 60vh!important;">
          <div class="flex justify-between items-center mb-4">
            <!-- Search input -->
            <div class="relative flex-grow">
              <input v-model="searchQuery" type="text" placeholder="Search contacts"
                class="p-2 w-full rounded-md border-0 bg-gray-100 focus:outline-none focus:ring focus:border-gold dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
              <span class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <!-- Add a search icon if desired -->
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-5-5m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
            </div>

            <!-- Sorting button -->
            <button @click="toggleSortOrder"
              class="bg-gold text-black hover:text-white focus:outline-none p-1 md:p-2 lg:p-2 ml-2">
              {{ sortOrder === 'asc' ? 'Sort A-Z' : 'Sort Z-A' }}
            </button>
          </div>

          <!-- Select All checkbox -->
          <div class="mb-4">
            <input v-model="selectAll" type="checkbox" @change="toggleSelectAll" class="mr-2">
            <label>Select All</label>
          </div>
          <!-- Individual contacts -->
          <div v-for="(contact, index) in sortedAndFilteredContacts" :key="index" class="mb-4">
            <input :checked="isSelected(contact)" @change="toggleContact(contact)" type="checkbox" class="mr-2">
            <label>{{ contact.name }} {{ contact.email ? '(' + contact.email + ')' : '' }}</label>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
          <button @click="closeModal" class="px-4 py-2 bg-gold text-black hover:text-white rounded">Cancel</button>
          <button @click="importSelectedContacts"
            class="ml-2 px-4 py-2 bg-gold text-black hover:text-white rounded">Import
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Contact Selection Modal -->
</template>

<script>
import axios from 'axios';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useToast } from 'vue-toastification';
import app from '../utilities/firebase.js';

const toast = useToast();

export default {
  //Get variable from app.vue
  props: {
    isLoggedIn: Boolean,
    userId: String,
  },
  data() {
    return {
      dropdownMenuOpen: false,
      processing: false,
      showModal: false,
      userContacts: [],
      selectedContacts: [],
      selectAll: false,
      sortOrder: 'asc',
      searchQuery: '',
    };
  },
  watch: {
    $route: 'closeDropdownMenu',
  },
  computed: {
    sortedAndFilteredContacts() {
      // Apply sorting
      const sortedContacts = this.userContacts.slice().sort((a, b) => {
        const order = this.sortOrder === 'asc' ? 1 : -1;
        return order * a.name.localeCompare(b.name);
      });

      // Apply filtering based on search query
      const filteredContacts = sortedContacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      return filteredContacts;
    },
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
    handleLoginClick() {
      this.closeDropdownMenu();
      this.$emit('open-login')
    },
    handleSignUpClick() {
      this.closeDropdownMenu();
      this.$emit('open-sign')
    },
    logout() {
      const auth = getAuth();
      this.$router.push('/');
      signOut(auth).then(() => {
        toast.success("Log out successfully");
      }).catch((error) => {
        toast.error(error)
      });
    },
    importContacts() {
      this.processing = true;
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      provider.addScope('https://www.googleapis.com/auth/contacts.other.readonly');

      signInWithPopup(auth, provider)
        .then((result) => {
          const googleAccessToken = result._tokenResponse.oauthAccessToken;
          return this.getUserContacts(googleAccessToken);
        })
        .then((contacts) => {
          if (contacts?.length > 0) {
            this.userContacts = contacts;
            this.selectedContacts = [];
            this.processing = false;
            this.showModal = true;
          } else {
            toast.info('You have no contacts on this account!');
          }
        })
        .catch((error) => {
          this.processing = false;
          toast.error(error.message);
        })
        .finally(() => {
          this.processing = false;
        });
    },
    async getUserContacts(googleAccessToken) {
      if (this.isLoggedIn === true && googleAccessToken && this.userId) {
        // Use Google People API to retrieve contacts
        const url = 'https://people.googleapis.com/v1/people/me/connections?personFields=emailAddresses,names,addresses';
        const headers = { 'Authorization': `Bearer ${googleAccessToken}` };
        const response = await axios.get(url, { headers });

        if (response.data.connections) {
          const contacts = response.data.connections.map(connection => {
            const name = connection.names && connection.names[0] && connection.names[0].displayName || '';
            const email = connection.emailAddresses && connection.emailAddresses[0] && connection.emailAddresses[0].value || '';
            return { name, email };
          });

          return contacts;
        }
      } else {
        toast.error('You are not loggedIn on the system!');
      }
    },
    isSelected(contact) {
      return this.selectedContacts.some((selectedContact) =>
        selectedContact.name === contact.name && selectedContact.email === contact.email
      );
    },
    toggleContact(contact) {
      const index = this.selectedContacts.findIndex((c) => c.name === contact.name && c.email === contact.email);
      if (index !== -1) {
        this.selectedContacts.splice(index, 1);
      } else {
        this.selectedContacts.push(contact);
      }

      this.selectAll = this.selectedContacts.length === this.userContacts.length;
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedContacts = [...this.userContacts];
      } else {
        this.selectedContacts = [];
      }
    },
    closeModal() {
      this.showModal = false;
      this.selectAll = false
    },
    importSelectedContacts() {
      const db = getDatabase(app);
      const contactsRef = ref(db, `users/${this.userId}/contacts`);
      set(contactsRef, this.selectedContacts);
      toast.success('Selected contacts are successfully imported!');

      // Close the modal
      this.showModal = false;
      this.selectAll = false;
    },
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    },
  }
}
</script>

<style>
.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.spinner {
  border: 10px solid black;
  border-top: 10px solid #d4af37;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
