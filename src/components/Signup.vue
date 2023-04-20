<!---
  This is the sign up page. 
 --->

<template>

<section 
  @click="close"
  class="z-20 h-screen w-screen bg-gray-200 fixed top-0 opacity-50"></section>
  <!-- Use Z-Axis to make the button higher than others -->
  <div class="absolute inset-0">
    <div class="flex h-full ">
      <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3 ">
        <h1 class="text-xl text-center">Sign Up</h1>
        <!--- Sign up window--->
        <form class="p-2 my-4 border" @submit.prevent="submit">
          <div class="my-2">
          <label>Email</label>
          <input v-model="form.email" class="rounded shadow p-2 w-full" type="email"> 
          </div>
          <div class="my-2">
           <label>Password</label>
          <input v-model="form.password" class="rounded shadow p-2 w-full" type="password"> 
          </div>
          <div class="my-2">
           <label>Username</label>
          <input v-model="form.username" class="rounded shadow p-2 w-full" type="username"> 
          </div>
          <div class="my-2">
            <button type="submit" class="p-2 w-full rounded shadow bg-red-400 text-white">
            Submit
          </button>
          </div>
        </form>
        <!--- Add a button for  terms and conditions --->
        <div class = "my-2 right-2">
            <button @click="open" class="p-2 rounded shadow bg-blue-400 text-white">
              Terms and conditions
            </button>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
//import components from firebase and cometchat and initialize them
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {CometChat} from "@cometchat-pro/chat";
let authKey = process.env.VUE_APP_COMETCHAT_authKey;
const appID = process.env.VUE_APP_COMETCHAT_appID;
const region = process.env.VUE_APP_COMETCHAT_region;
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting);

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
console.log(app);
export default {
  data(){
    return {
      form:{
      email:'',
      password:'',
      username:'',
      }
    }
  },

  methods :{
    submit(){
      //create user in firebase
    const auth = getAuth();
    auth.languageCode = 'en';
    createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
  .then(() => {
    this.close();
  })
  .then(() => {
    //create user for cometchat
    var cometuid = this.form.email;
    cometuid = cometuid.replace('@','');
    cometuid = cometuid.replaceAll('.','');
    var name = this.form.username;
    var cometuser = new CometChat.User(cometuid);
    cometuser.setName(name);
    CometChat.createUser(cometuser,authKey).then(() => {
        console.log("user created");
    },error => {
        alert(error);
        console.log("error", error);
    }
    )
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  });
 
    },
    close()
    {
      this.$emit('close');
    },
    //Function for opening terms and condition page, written is this way for open it in a new tab
    open()
    {
      const routeData = this.$router.resolve({
        path: '/term'
      });
      window.open(routeData.href, "_blank");
    }

  },
}
</script>

<style>

</style>