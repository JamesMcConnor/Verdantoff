// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyChG7vuZkr32hSr2qFQ3pdjx-GUgsG7KU8",
  authDomain: "verdantoff-v2.firebaseapp.com",
  databaseURL: "https://verdantoff-v2-default-rtdb.firebaseio.com",
  projectId: "verdantoff-v2",
  storageBucket: "verdantoff-v2.appspot.com",
  messagingSenderId: "916040065604",
  appId: "1:916040065604:web:80987789fa293135fb5211",
  measurementId: "G-WWZF16B9WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
