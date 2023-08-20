<!---
  This is the file for the navbar
 --->

<template>
    <div>
        <div :style="background" class="relative bg-fixed opacity-90 w-full h-screen">
            <div class="p-10 font-serif text-4xl subpixel-antialiased font-bold leading-relaxed text-center text-white">
                <h1 class="text-6xl">My Contacts</h1>
            </div>
        </div>
        <div v-if="isLoggedIn">
            <div ref="contactListContainer" id="contact-list-container">
                <ul ref="contactList" id="contact-list">
                </ul>
            </div>
        </div>

        <!-- Use the ErrorToast component to display errors -->
        <error-toast ref="errorToast" :messages="errorMessages"></error-toast>
    </div>
</template>
  
<script>
import app from '../utilities/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { getDatabase, ref, onValue } from 'firebase/database';
import ErrorToast from './ErrorToast.vue';

export default {
    components: {
        ErrorToast,
    },
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
            isLoggedIn: false,
            userId: null,
            email: null,
            errorMessages: [],
        };
    },

    mounted() {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.isLoggedIn = true;
                this.userId = user.uid;
                this.email = user.email;

                // Display contact list only for authenticated users
                if (this.$refs.contactListContainer) {
                    this.displayContacts()
                        .then(() => {
                            console.log('success');
                        }).catch((err) => {
                            this.triggerError(err);
                        });
                }
            } else {
                this.isLoggedIn = false
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

                    const contactList = this.$refs.contactList;
                    contactList.innerHTML = '';

                    const contactElem = document.createElement('li');
                    contactElem.textContent = contact.name;
                    const inviteButton = document.createElement('button');
                    inviteButton.textContent = 'Invite to join';

                    inviteButton.addEventListener('click', () => {
                        inviteButton.disabled = true;
                        inviteButton.textContent = 'Please wait...';

                        this.inviteContact(contact.email)
                            .then(() => {
                                inviteButton.textContent = 'Invite sent!';
                                inviteButton.disabled = true;
                            })
                            .catch((error) => {
                                this.triggerError(error);
                                inviteButton.disabled = false;
                                inviteButton.textContent = 'Invite to join';
                            })
                    });
                    contactElem.appendChild(inviteButton);
                    contactList.appendChild(contactElem);
                })
            }, error => {
                this.triggerError(error);
            })
        },
        async inviteContact(contactEmail) {
            // Send invitation email to contact using Firebase functions
            httpsCallable('sendInviteEmail')({ email: contactEmail })
                .then(() => {
                    console.log('Invitation email sent successfully');
                })
                .catch((error) => {
                    this.triggerError(error);
                });
        },
        triggerError(error) {
            this.errorMessages.push(error);
            // Call showErrorToast to display the error
            this.$refs.errorToast.showErrorToast();
            setTimeout(() => {
                this.errorMessages.shift();
            }, 500);
        },
    }
}
</script>
<style scoped lang='less'></style>