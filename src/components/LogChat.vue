<template>
 <div id="chat" class="h-screen w-screen">
   <CometChatUI />
 </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import { CometChatUI } from "../cometchat-pro-vue-ui-kit/CometChatWorkspace/src";
const appID = "20697398880d4932";
const region = "us";
var authkey = "c1beda629d006b6ea69610b0e1b6ee6ec30fdc04";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
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
    return{
      email: '',
      cometuid: ''
    }
  },

  mounted(){
  //Get auth from firebase
  const auth = getAuth();
  //Once get auth then get the login status
  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    this.email = user.email;
    this.cometuid = this.email;
    this.cometuid = this.cometuid.replace('@','');
    this.cometuid = this.cometuid.replace('.','');
  }
  });
  const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
      CometChat.init(appID, appSetting)
  .then(() => {
    console.log("Initialization completed successfully");
    // You can now call login function.
    CometChat.login(this.cometuid, authkey).then(
  user => {
    console.log("Login Successful:", { user });    
  },
  error => {
    console.log("Login failed with exception:", { error });    
  }
);

  },
  error => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);
},
  name: "chat",
   components: {
     CometChatUI,
   }
}
</script>

<style>

</style>