<template>
 <div id="chat" class="h-screen w-screen">
   <CometChatUI />
 </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
const appID = "205678e972415906";
const region = "us";
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
let authKey = "bf8447c73c31952053f0e141c700723b0ead2c1b";
var uid = "";
import { CometChatUI } from "../cometchat-pro-vue-ui-kit/CometChatWorkspace/src";

CometChat.init(appID, appSetting).then(() => {
    console.log("Initialization completed successfully");
    //login
    CometChat.login(uid, authKey).then(
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

export default {
   name: "chat",
   components: {
     CometChatUI,
   }
}
</script>

<style>

</style>