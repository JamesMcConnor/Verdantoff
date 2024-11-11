<!---
  This is the cometchat page, loding the cometchat UI component
 --->

<template>
  <div id="chat" class="h-screen w-screen">
    <CometChatUI />
  </div>
</template>

<script>
//import components from cometchat and firebase and then initialize them
import { CometChat } from "@cometchat-pro/chat";
import { CometChatUI } from "../cometchat-pro-vue-ui-kit/CometChatWorkspace/src";
const cometAppId = process.env.VUE_APP_COMETCHAT_appID;
const region = process.env.VUE_APP_COMETCHAT_region;
var authkey = process.env.VUE_APP_COMETCHAT_authKey;
import app from './../utilities/firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      email: '',
      cometuid: '',
    }
  },
 
  //mounted method will run before the page is rendered
  mounted() {
    //Get auth from firebase, and get current user
    const auth = getAuth(app);
    //Once get auth then get the login status
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //Convert user's email in to cometchat id, because cometchat dont allow email as id
        this.email = user.email;
        this.cometuid = user.email.replace('@', '').replaceAll('.', '');
      }
    });

  },
  watch: {
    cometuid() {
      this.initCometChatLogin();
    }
  },
  methods: {
    initCometChatLogin() {
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
    }
  },
  name: "chat",
  components: {
    CometChatUI,
  }
}
</script>

<style></style>