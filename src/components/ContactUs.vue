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
                616 Glenbrook Rd, RD4 Pukekohe
                Auckland 2679, New Zealand.
                <br>
                Email: jamesfrontechcorp@gmail.com
            </p>
        </div>
    </div>
w    <div v-for="(contact, i) in userContactsList" :key="i" class="px-3">
        <strong>
            {{ contact.name }} - {{ contact.email }}
        </strong>
    </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_apiKey,
    authDomain: process.env.VUE_APP_FIREBASE_authDomain,
    projectId: process.env.VUE_APP_FIREBASE_projectId,
    storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
    appId: process.env.VUE_APP_FIREBASE_appId,
    databaseURL: process.env.VUE_APP_FIREBASE_databaseURL
};
const app = initializeApp(firebaseConfig);

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
            email: '',
        };
    },
    mounted() {
        // Get Auth object
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.isLoggedin = true;
                this.email = user.email;
                this.userId = user.uid;
            } else {
                this.isLoggedin = false
            }
        });
    },
    watch: {
        isLoggedin() {
            this.getUsers();
        }
    },
    methods: {
        async getUsers() {
            if (this.isLoggedin === true) {
                // Get Firebase database
                const db = getDatabase(app);
                const contactsRef = ref(db, 'users/' + this.userId + '/contacts');

                // Listen for changes to the data at that location in the database
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
                    // Do something with the data (e.g. update your app state)
                    this.userContactsList = contacts;
                }, error => {
                    console.log(error);
                })
            }
        },
    },

}

</script>
<style scoped lang='less'></style>