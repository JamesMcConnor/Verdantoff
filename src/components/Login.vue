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