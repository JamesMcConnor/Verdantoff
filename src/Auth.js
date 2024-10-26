// src/Auth.js

import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Signed in with Google");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered with Email/Password");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in with Email/Password");
      }
    } catch (error) {
      console.error("Error with email/password authentication:", error);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? "Register" : "Sign In"}</button>
      </form>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Sign In" : "Create an account"}
      </button>
    </div>
  );
}

export default Auth;
