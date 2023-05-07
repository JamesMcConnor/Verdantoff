<!---
  This is the file for the navbar
 --->

<template>
    <div :style="background" class="relative bg-fixed opacity-90 w-full h-screen">
        <div class="p-10 font-serif text-4xl subpixel-antialiased font-bold leading-relaxed text-center text-white">
            <h1 class="text-6xl">My Contacts</h1>
        </div>
    </div>
    <div v-if="isLoggedin">
        <div id="contact-list-container">
            <ul id="contact-list">
            </ul>
        </div>
    </div>
</template>
  
<script>
import app from '../utilities/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
// import axios from 'axios';
import { getDatabase, ref, onValue } from 'firebase/database';

export default {
    name: 'MyContacts',

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
            isLoggedin: false,
            userId: null,
            email: null
        };
    },

    mounted() {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.isLoggedin = true;
                this.userId = user.uid;
                this.email = user.email;
                // Display contact list only for authenticated users
                document.addEventListener('DOMContentLoaded', () => {
                    const contactListContainer = document.getElementById('contact-list-container');
                    if (contactListContainer) {
                        contactListContainer.style.display = 'block';
                        this.displayContacts();
                    }
                });
            } else {
                this.isLoggedin = false
            }
        });
    },
    methods: {
        async displayContacts() {
            // Get contacts from Firebase Realtime Database
            const db = getDatabase(app);
            const contactsRef = ref(db, `users/${this.userId}/contacts`);
            onValue(contactsRef, snapshot => {
                // Loop through the snapshot data using forEach()
                snapshot.forEach(childSnapshot => {
                    // Get the data from each child snapshot
                    const contact = childSnapshot.val();

                    const contactList = document.getElementById('contact-list');
                    contactList.innerHTML = '';

                    const contactElem = document.createElement('li');
                    contactElem.textContent = contact.name;
                    const inviteButton = document.createElement('button');
                    inviteButton.textContent = 'Invite to join';
                    inviteButton.addEventListener('click', () => {
                        this.inviteContact(contact.email);
                    });
                    contactElem.appendChild(inviteButton);
                    contactList.appendChild(contactElem);
                })
            }, error => {
                console.log(error);
            })
        },
        async inviteContact(contactEmail) {
            // Send invitation email to contact using Firebase functions
            httpsCallable('sendInviteEmail')({ email: contactEmail })
                .then(() => {
                    console.log('Invitation email sent successfully');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}
</script>
<style scoped lang='less'></style>