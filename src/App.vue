<!--
  This is entry file for the whole app
-->
<template>
<!--- Send variables to appheader.vue --->
<AppHeader :isLoggedIn = "isLoggedIn" @open-login="isOpen = true" @open-sign="isSign = true" :email=email :userId=userId :verifiedMessage=verifiedMessage :verified=verified />
<div>
  <router-view></router-view>
</div>

<!--- Send variables to login and signup file --->
<Login v-if="isOpen" @close="isOpen = false"/>
<Signup v-if="isSign" @close = "isSign = false"/>

<!--- Put footer in so that it will show in all pages --->
<Footer :isLoggedIn = "isLoggedIn"></Footer>
</template>

<script>
//initialize firebase
import app from './utilities/firebase.js';
import AppHeader from "./components/AppHeader.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "./components/Footer.vue";

export default{
    data(){
    return {
      isOpen: false,
      isSign: false,
      isLoggedIn: false,
      userId: null,
      email: '',
      verified: false,
      verifiedMessage: ''
    };
  },

  mounted()
  {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    this.isLoggedIn = true;
    this.userId = user.uid;
    this.email = user.email;
    this.verified = user.emailVerified;
    if(this.verified == false)
    {
      this.verifiedMessage = " (This email is not verified!)";
    }else if(this.verified == true)
    {
      this.verifiedMessage = " (This email is verified!)";
    }
    // ...
  } else {
    // User is signed out
    // ...
    this.isLoggedIn = false
  }
});
  },

  components:{ AppHeader, Login, Signup, Footer }
}
</script>

<style></style>
