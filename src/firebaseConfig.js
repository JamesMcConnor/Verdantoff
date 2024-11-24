// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1YI91Om_clqONTREybAWTppUV-Ick41M",
  authDomain: "vuetest-b2bcc.firebaseapp.com",
  databaseURL: "https://vuetest-b2bcc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vuetest-b2bcc",
  storageBucket: "vuetest-b2bcc.firebasestorage.app",
  messagingSenderId: "617902258261",
  appId: "1:617902258261:web:a8993773f8ea9ebc3cbcdc",
  measurementId: "G-V9W98G5TX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const realtimeDB = getDatabase(app);
