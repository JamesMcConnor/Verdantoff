<!---
  This is the sign up page. 
 --->

<template>
  <div>
    <section @click="close" class="z-20 h-screen w-screen bg-gray-200 fixed top-0 opacity-50"></section>
    <!-- Use Z-Axis to make the button higher than others -->
    <div class="absolute inset-0">
      <div class="flex h-full ">
        <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3 ">
          <h1 class="text-xl text-center">Sign Up</h1>
          <!--- Sign up window--->
          <form class="p-2 my-4 border" @submit.prevent="submit">
            <div class="my-2">
              <label>Username</label>
              <input v-model="form.username" class="rounded shadow p-2 w-full" type="text">
            </div>
            <div class="my-2">
              <label>Email</label>
              <input v-model="form.email" class="rounded shadow p-2 w-full" type="email">
            </div>
            <div class="my-2">
              <label>Password</label>
              <input v-model="form.password" class="rounded shadow p-2 w-full" type="password">
            </div>
            <div class="my-2">
              <label>Confirm Password</label>
              <input v-model="form.confirm_password" class="rounded shadow p-2 w-full" type="password">
            </div>
            <div class="my-2">
              <button type="submit" class="p-2 w-full rounded shadow bg-red-400 text-white">
                Submit
              </button>
            </div>
          </form>
          <!--- Add a button for  terms and conditions --->
          <div class="my-2 right-2">
            <button @click="openTerms" class="p-2 rounded shadow bg-blue-400 text-white">
              Terms and conditions
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Use the ErrorToast component to display errors -->
    <error-toast ref="errorToast" :messages="errorMessages"></error-toast>
  </div>
</template>





<script>
//import components from firebase and cometchat and initialize them
import app from './../utilities/firebase.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { CometChat } from "@cometchat-pro/chat";
import ErrorToast from './ErrorToast.vue';
let authKey = process.env.VUE_APP_COMETCHAT_authKey;
const appID = process.env.VUE_APP_COMETCHAT_appID;
const region = process.env.VUE_APP_COMETCHAT_region;
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting);

export default {
  components: {
    ErrorToast,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        confirm_password: '',
        username: '',
      },
      errorMessages: [],
    }
  },

  methods: {
    submit() {
      //create user in firebase
      const auth = getAuth(app);
      auth.languageCode = 'en';
      if (this.form.email.trim() === '' || this.form.email.trim() === '' || this.form.password.trim() === '' || this.form.confirm_password.trim() === '') {
        this.triggerError('Username, email and password fields are required.');
      } else if (this.form.password !== this.form.confirm_password) {
        this.triggerError("Confirm Password don't match.");
      } else {
        createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
          .then(() => {
            this.close();
          })
          .then(() => {
            //create user for cometchat
            var cometuid = this.form.email;
            cometuid = cometuid.replace('@', '');
            cometuid = cometuid.replaceAll('.', '');
            var name = this.form.username;
            var cometuser = new CometChat.User(cometuid);
            cometuser.setName(name);
            CometChat.createUser(cometuser, authKey).then(() => {
              console.log("user created");
            }, error => {
              this.triggerError(error);
            }
            )
          })
          .catch((error) => {
            const errorMessage = error.message;
            this.triggerError(errorMessage);
          });
      }
    },
    close() {
      this.$emit('close');
    },
    //Function for opening terms and condition page, written is this way for open it in a new tab
    openTerms() {
      const routeData = this.$router.resolve({
        path: '/term'
      });
      window.open(routeData.href, "_blank");
    },
    triggerError(error) {
      this.errorMessages.push(error);
      // Call showErrorToast to display the error
      this.$refs.errorToast.showErrorToast();
      setTimeout(() => {
        this.errorMessages.shift();
      }, 500);
    },

  },
}
</script>

<style></style>