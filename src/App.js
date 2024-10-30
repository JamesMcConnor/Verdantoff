// src/App.js

import React, { useRef, useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Chat from './Chat'; // Import the Chat component
import { startScreenShare, stopScreenShare } from './screenShare'; // Import screen sharing functions
import { generateRoomUrl } from './roomUrl'; // Import room URL generation function
import './App.css'; // Import the CSS file
import Auth from './Auth';

function App() {
  const [user, setUser] = useState(null); // Track authenticated user state
  const videoRef = useRef(null); // Reference for the video element
  const [roomUrl, setRoomUrl] = useState(''); // State for storing the generated room URL

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Load video stream if authenticated
  useEffect(() => {
    if (user) {
      async function getMediaStream() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing media devices.', err);
        }
      }
      getMediaStream();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <h1>Live Video Streaming with Chat</h1>
      {user ? (
        <div className="container">
          <div className="video-container">
            <video ref={videoRef} autoPlay playsInline></video>
            <div className="button-container">
              <button onClick={() => startScreenShare(videoRef)}>Share Screen</button>
              <button onClick={() => stopScreenShare(videoRef)}>Stop Sharing</button>
              <button onClick={() => {
                const url = generateRoomUrl();
                setRoomUrl(url);
                alert(`Meeting Room URL: ${url}`);
              }}>
                Generate Room URL
              </button>
            </div>
          </div>
          <div className="chat-container">
            {roomUrl && <p>Meeting Room URL: {roomUrl}</p>}
            <Chat /> {/* Render the Chat component */}
          </div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
