<!---
This is the login page. 
 --->


<template>
<div>
<section 
  @click="close"
  class="z-20 h-screen w-screen bg-white gold-text fixed top-0 opacity-50"></section>
  <!-- Use Z-Axis to make the button higher than others -->
  <div class="absolute inset-0">
    <div class="flex h-full">
      <!---Login window--->
      <div class="z-30 m-auto bg-black gold-text p-2 rounded shadow w-1/3">
        <h1 class="text-xl text-center">Login</h1>
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
           <button type="submit" class="p-2 w-full rounded shadow bg-red-400 text-white">
             <span v-if="!isLoading">Submit</span>
             <span v-else>Processing</span>
          </button>
          <!---Shows if user enter a wrong password or email--->
          <span v-if="isError" class="my-2 text-red-400">The email or password you entered is wrong</span>
          </div>
        </form>
        <div class="my-2">
          <!--- Button for reset password --->
            <button @click="reset" class = "p-2 w-1/3 rounded shadow bg-green-400 text-white">Forget Password?</button>
            <span v-if="isSend" class="my-2 p-2 text-red-400" >Please check your email for reset password</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>



<script>
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import app from '../utilities/firebase.js';
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      isError: false,
      isLoading: false,
      isSend: false,
    }
  },

  methods: {
    submit(event) {
      this.isLoading = true;
      // Prevent the default form submission
      event.preventDefault();

      // Check if the fields are empty
      if (this.form.email.trim() === '' || this.form.password.trim() === '') {
        toast.error("Email and password are required fields.");
        this.isLoading = false;
      } else {

        //Get status of authentication
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, this.form.email, this.form.password)
          .then(() => {
            // Signed in
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
            const errorMessage = error.message || "The email or password you entered is wrong";
            this.isLoading = false;
            // this.isError = true;
            this.$forceUpdate();
            toast.error(errorMessage)
          });
      }
    },
    close() {
      this.$emit('close');
    },
    //function for sending reset password email
    reset() {
      if (this.form.email.trim() === '') {
        toast.error('Email is required.');
      } else {
        const auth = getAuth(app);
        this.isSend = true;
        this.$forceUpdate();
        sendPasswordResetEmail(auth, this.form.email)
          .then(() => {
            toast.success("Password reset email sent!")
          })
          .catch((error) => {
            const errorMessage = error.message || "Something went wrong";
            toast.error(errorMessage);
          });
      }
    },
  },
}
</script>

<style>

</style>