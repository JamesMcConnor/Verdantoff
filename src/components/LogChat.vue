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



export default {

    mounted(){
  const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
      CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    // You can now call login function.
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