<template>
  Chat
  <div>
      <button class="rounded shadow bg-red-400" @click="GetOnce()" >Get Something</button>
  </div>
  
</template>

<script>
// import { onMounted } from '@vue/runtime-core'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
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
    methods:{
        GetOnce(){
        const dbRef = ref(getDatabase());
        //const userId = "chats"; 
        get(child(dbRef, `/chats/id`)).then((snapshot) => {
        if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
  console.error(error);
});
}    
    }

}
</script>

<style>

</style>