<template>
 <div id="chat" class="h-screen w-screen">
   <CometChatUI />
 </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import { CometChatUI } from "../cometchat-pro-vue-ui-kit/CometChatWorkspace/src";
const cometAppId = process.env.VUE_APP_COMETCHAT_appID;
const region = process.env.VUE_APP_COMETCHAT_region;
var authkey = process.env.VUE_APP_COMETCHAT_authKey;

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
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
    return{
      email: '',
      cometuid: '',
    }
  },

  created(){
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
    this.cometuid = this.cometuid.replaceAll('.','');
  }
  });
  const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
      CometChat.init(cometAppId, appSetting)
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