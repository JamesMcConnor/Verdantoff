// src/App.js

import React, { useEffect, useState } from 'react';
import './App.css';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import Auth from './Auth';
import Chat from './Chat';

console.log("App component loaded");

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Setting up auth state observer...");
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is signed in:", currentUser.email);
      } else {
        console.log("No user is signed in.");
      }
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Verdantoff-V2 Communication Platform</h1>
        {user ? (
          <>
            <p>Welcome, {user.email}</p>
            <Chat />
          </>
        ) : (
          <Auth />
        )}
      </header>
    </div>
  );
}

export default App;
