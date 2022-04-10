import { initializeApp } from "firebase/app";
import {} from "firebase/auth";
import {} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1YI91Om_clqONTREybAWTppUV-Ick41M",
  authDomain: "vuetest-b2bcc.firebaseapp.com",
  projectId: "vuetest-b2bcc",
  storageBucket: "vuetest-b2bcc.appspot.com",
  messagingSenderId: "617902258261",
  appId: "1:617902258261:web:a8993773f8ea9ebc3cbcdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app);
// var database = firebase.database();

export default app;

