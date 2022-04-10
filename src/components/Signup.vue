<template>

<section 
  @click="close"
  class="z-20 h-screen w-screen bg-gray-200 fixed top-0 opacity-50"></section>
  <!-- Use Z-Axis to make the button higher than others -->
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
        <h1 class="text-xl text-center">Sign Up</h1>
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
      </div>
    </div>
  </div>
</template>





<script>
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {CometChat} from "@cometchat-pro/chat";
let authKey = "bf8447c73c31952053f0e141c700723b0ead2c1b";
const appID = "205678e972415906";
const region = "us";
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting);


const firebaseConfig = {
  apiKey: "AIzaSyD1YI91Om_clqONTREybAWTppUV-Ick41M",
  authDomain: "vuetest-b2bcc.firebaseapp.com",
  projectId: "vuetest-b2bcc",
  storageBucket: "vuetest-b2bcc.appspot.com",
  messagingSenderId: "617902258261",
  appId: "1:617902258261:web:a8993773f8ea9ebc3cbcdc",
  databaseURL: "https://vuetest-b2bcc-default-rtdb.asia-southeast1.firebasedatabase.app"
};
const app = initializeApp(firebaseConfig);
console.log(app);
export default {
  data(){
    return {
      form:{
      email:'',
      password:'',
      username:''
      }
    }
  },

  methods :{
    submit(){
    const auth = getAuth();
    auth.languageCode = 'en';
    createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    sendEmailVerification(auth.currentUser);
    console.log(user);
    this.close();
    // ...
  }).then(() => {
    //create user for cometchat
    var cometuid = this.form.email;
    cometuid = cometuid.replace('@','');
    cometuid = cometuid.replace('.','');
    console.log(cometuid);
    var name = this.form.username;
    var cometuser = new CometChat.User(cometuid);
    cometuser.setName(name);
    CometChat.createUser(cometuser,authKey).then(
    user => {
        console.log("user created", user);
    },error => {
        console.log("error", error);
    }
    ).then(
      CometChat.login(cometuid, authKey).then(
    user => {
    console.log("Login Successful:", { user });    
    },
    error => {
    console.log("Login failed with exception:", { error });    
    })
    )
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
 
    },
    close()
    {
      this.$emit('close');
    }

  },

}
</script>

<style>

</style>