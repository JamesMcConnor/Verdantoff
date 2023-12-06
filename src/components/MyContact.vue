<!--- This is the file for the navbar --->

<template>
    <div>
        <div :style="background" class="relative bg-fixed opacity-90 w-full h-screen">
            <div class="p-10 font-serif text-4xl subpixel-antialiased font-bold leading-relaxed text-center text-white">
                <h1 class="text-6xl">My Contacts</h1>
            </div>
        </div>
        <div v-if="isLoggedIn">
            <div id="contact-list-container" class="container mx-auto px-4 py-4">
                <ul id="contact-list">
                    <li v-for="contact in contacts" :key="contact.email" class="mb-4">
                        <div class="flex items-center justify-start">
                            <span class="mr-4">{{ contact.name }}</span>
                            <button @click="handleInviteButtonClick(contact, $event)"
                                class="btn bg-gold text-white px-4 py-2 rounded">
                                Invite to join
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
import app from '../utilities/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
    name: 'MyContacts',

    data() {
        return {
            // CSS setting
            background: {
                backgroundImage: [
                    "url(" + require("../assets/alterBG6.jpg") + ")",
                ],
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center", // Fix the typo here
            },
            isLoggedIn: false,
            userId: null,
            email: null,
            contacts: [],
        };
    },

    mounted() {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.isLoggedIn = true;
                this.userId = user.uid;
                this.email = user.email;

                this.displayContacts().catch((err) => {
                    toast.error(err);
                });
            } else {
                this.isLoggedIn = false
            }
        });
    },
    methods: {
        async displayContacts() {
            const db = getDatabase(app);
            const contactsRef = ref(db, `users/${this.userId}/contacts`);

            onValue(contactsRef, snapshot => {
                this.contacts = [];

                snapshot.forEach(childSnapshot => {
                    const contact = childSnapshot.val();
                    this.contacts.push(contact);
                });
            });
        },
        async handleInviteButtonClick(contact, event) {
            if (!contact?.email) {
                toast.warning('Email is empty for this contact');
                return;
            }

            const inviteButton = event.target;
            inviteButton.disabled = true;
            inviteButton.textContent = 'Please wait...';

            try {
                await this.inviteContact(contact.email);
                inviteButton.textContent = 'Invite sent!';
                toast.success('Invite sent!');
            } catch (error) {
                toast.error(error);
            } finally {
                inviteButton.disabled = false;
                inviteButton.textContent = 'Invite to join';
            }
        },
        async inviteContact(contactEmail) {
            httpsCallable('sendInviteEmail')({ email: contactEmail })
                .then(() => {
                    toast.success('Invitation email sent successfully');
                })
                .catch((err) => {
                    toast.error(err);
                });
        },
    }
}
</script>
<style scoped lang='less'></style>
