<!--- This is the file for the navbar --->

<template>
    <div>
        <div :style="backgroundStyle" class="relative bg-fixed opacity-90 min-h-screen w-full h-full">
            <div class="p-10 font-serif subpixel-antialiased font-bold leading-relaxed text-center gold-text-light">
                <h1 class="text-6xl">My Contacts</h1>
                <div v-if="isLoadingContacts" class="bg-light-black gold-text-light text-center mt-4">
                    Loading contacts...
                </div>
                <div v-else-if="isLoggedIn && contacts.length > 0">
                    <div id="contact-list-container" class="container bg-light-black mx-auto mt-4 px-4 py-4 pb-12 z-50">
                        <ul id="contact-list">
                            <li v-for="contact in contacts" :key="contact.email" class="mb-4">
                                <div class="flex items-center justify-evenly">
                                    <span class="mr-4">{{ contact.name }}{{ contact.email ? ' · ' + contact.email : ''
                                    }}</span>
                                    <button @click="handleInviteButtonClick(contact, $event)"
                                        class="btn bg-gold text-black hover:text-white px-4 py-2 rounded">
                                        Invite to join
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div v-else-if="isLoggedIn && !isLoadingContacts">
                    <p class="bg-light-black gold-text-light text-center mt-4">No Contacts Found!</p>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';
import { httpsCallable } from 'firebase/functions';
import { useToast } from 'vue-toastification';
import app from '../utilities/firebase.js';

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
            isLoadingContacts: false,
        };
    },

    computed: {
        backgroundStyle() {
            const commonStyle = {
                backgroundImage: `url(${require("../assets/alterBG6.jpg")})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            };

            if (this.contacts.length === 0 || !this.isLoggedIn) {
                return { ...commonStyle, height: "100vh" };
            } else {
                return commonStyle;
            }
        },
    },


    mounted() {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.isLoggedIn = true;
                this.userId = user.uid;
                this.email = user.email;

                this.isLoadingContacts = true;
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
            this.isLoadingContacts = true;
            const db = getDatabase(app);
            const contactsRef = ref(db, `users/${this.userId}/contacts`);

            try {
                const snapshot = await get(contactsRef);
                this.contacts = [];

                snapshot.forEach(childSnapshot => {
                    const contact = childSnapshot.val();
                    this.contacts.push(contact);
                });

                this.contacts = this.contacts.slice().sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });

                this.isLoadingContacts = false;
            } catch (error) {
                this.isLoadingContacts = false;
                toast.error("Error fetching contacts:", error);
            }
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
