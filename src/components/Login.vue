<template>
<div>
<section 
  @click="close"
  class="z-20 h-screen w-screen bg-gray-200 fixed top-0 opacity-50"></section>
  <!-- Use Z-Axis to make the button higher than others -->
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
        <h1 class="text-xl text-center">Login</h1>
        <form class="p-2 my-4 border" @submit.prevent="submit">
          <div class="my-2">
           <label>Email or Username</label>
          <input v-model="form.email" class="rounded shadow p-2 w-full" type="email"> 
          </div>
          <div class="my-2">
           <label>Password</label>
          <input v-model="form.password" class="rounded shadow p-2 w-full" type="password"> 
          </div>
          <div class="my-2">
           <button type="submit" class="p-2 w-full rounded shadow bg-red-400 text-white">
             <span v-if="!isLoading">Submit</span>
             <span v-else>Processing</span>
          </button>
          <span v-if="isError" class="my-2 text-red-400">The email or password you entered is wrong</span>
          </div>
        </form>
        <div class="my-2">
            <button @click="reset" class = "p-2 w-1/3 rounded shadow bg-green-400 text-white">Forget Password?</button>
            <span v-if="isSend" class="my-2 p-2 text-red-400" >Please check your email for reset password</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>



<script>
import { getAuth, signInWithEmailAndPassword ,sendPasswordResetEmail} from "firebase/auth";
import { initializeApp } from "firebase/app";
//import { CometChat } from "@cometchat-pro/chat";
/*let authKey = "c1beda629d006b6ea69610b0e1b6ee6ec30fdc04";
const appID = "20697398880d4932";
const region = "us";
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting);*/

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
      isLoading: false,
      isError: false,
      isSend: false,
      }
    }
  },

  methods :{
    submit(){
      this.isLoading = true;
      this.form;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.form.email, this.form.password)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
    /*var cometuid = this.form.email;
    cometuid = cometuid.replace('@','');
    cometuid = cometuid.replace('.','');
    console.log(cometuid); console.log(authKey);
    CometChat.login(cometuid, authKey).then(
    user => {
    console.log("Login Successful:", { user });    
    },
    error => {
    console.log("Login failed with exception:", { error });    
    });*/
    this.isLoading = false;
    this.email = '';
    this.password = '';
    this.isError = false;
    this.$forceUpdate();
    this.close();
    // ...
    })
    .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    this.isLoading = false;
    this.isError = true;
    this.$forceUpdate();
    console.log(errorMessage);
  });
  },
    close()
    {
      this.$emit('close');
    },
    reset()
    {
    const auth = getAuth();
    this.isSend = true;
    this.$forceUpdate();
    sendPasswordResetEmail(auth, this.form.email)
    
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
    }
  },
}
</script>

<style>

</style>