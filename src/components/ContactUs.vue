<!---
    This is the file for contact us page. 
 --->
<template>
    <div :style="background" class="relative bg-fixed opacity-90 w-full h-screen">
        <div class="p-10 font-serif text-4xl subpixel-antialiased font-bold leading-relaxed text-center text-white">
            <h1 class="text-6xl">Contact Us</h1>
            <br>
            <p>FronTech NZ</p>
            <br>
            <p>
                Email: jamesfrontechcorp@gmail.com
            </p>
        </div>
    </div>
    <div v-if="isLoggedin" class="flex justify-center">
        <button @click="loginWithGoogle"
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Sign
            in with Google</button>
    </div>
    <div v-if="isLoggedin">
        <div v-for="(contact, i) in userContactsList" :key="i" class="px-3">
            <strong>
                {{ contact.name }} - {{ contact.email }}
            </strong>
        </div>
    </div>
</template>

<script>
import app from '../utilities/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import axios from 'axios';
import { googleSdkLoaded } from "vue3-google-login"

export default {
    name: 'contactUs',

    data() {
        return {
            //CSS setting
            background: {
                backgroundImage: [
                    "url(" + require("../assets/alterBG6.jpg") + ")",
                ],
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgoundPosition: "center",
            },
            userContactsList: [],
            isLoggedin: false,
            userId: null,
            googleAccessToken: null,
        };
    },
    watch: {
        googleAccessToken: function () {
            console.log('googleAccessToken changed');
            this.getUserContacts();
        },
    },
    mounted() {
        // Get Auth object
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.isLoggedin = true;
                this.userId = user.uid;
            } else {
                this.isLoggedin = false
            }
        });
    },
    methods: {
        loginWithGoogle() {
            googleSdkLoaded((google) => {
                google.accounts.oauth2.initTokenClient({
                    client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
                    scope: 'https://www.googleapis.com/auth/userinfo.email \
                  https://www.googleapis.com/auth/contacts.readonly',
                    callback: (response) => {
                        if (google.accounts.oauth2.hasGrantedAllScopes(response, 'https://www.googleapis.com/auth/contacts.readonly')) {
                            this.googleAccessToken = response.access_token;
                            console.log("Access granted");
                        }
                    }
                }).requestAccessToken()
            })
        },
        async getUserContacts() {
            if (this.isLoggedin === true && this.googleAccessToken) {
                // Use Google People API to retrieve contacts
                const url = 'https://people.googleapis.com/v1/people/me/connections?personFields=emailAddresses,names';
                const headers = { 'Authorization': `Bearer ${this.googleAccessToken}` };
                const response = await axios.get(url, { headers });

                if (response.data.connections) {
                    const contacts = response.data.connections.map(connection => {
                        const name = connection.names && connection.names[0] && connection.names[0].displayName || '';
                        const email = connection.emailAddresses && connection.emailAddresses[0] && connection.emailAddresses[0].value || '';
                        return { name, email };
                    });

                    // Store contacts in Firebase Realtime Database
                    const db = getDatabase(app);
                    const contactsRef = ref(db, '/contacts');

                    contacts.forEach(contact => {
                        push(contactsRef, {
                            name: contact.name,
                            email: contact.email
                        });
                    });

                    onValue(contactsRef, snapshot => {
                        // Retrieve the data from the snapshot object
                        const contacts = [];
                        // Loop through the snapshot data using forEach()
                        snapshot.forEach(childSnapshot => {
                            // Get the data from each child snapshot
                            const contact = childSnapshot.val();
                            const email = contact.email;
                            const name = contact.name;
                            // Push the contact data into the contacts array
                            contacts.push({ email, name });
                        });
                        // update app state
                        this.userContactsList = contacts;
                    }, error => {
                        console.log(error);
                    })
                }
            } else {
                console.log('You are not loggedIn on the system!')
            }
        },
    }
}

</script>
<style scoped lang='less'></style>