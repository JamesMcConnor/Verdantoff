// src/App.js

import React, { useRef, useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Chat from './Chat';
import Contacts from './components/Contacts';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import { startScreenShare, stopScreenShare } from './screenShare';
import { generateRoomUrl } from './roomUrl';
import './App.css';
import Auth from './Auth';
import DatabaseTest from './components/DatabaseTest';

function MeetingRoom() {
  const { roomId } = useParams();
  console.log('Entered Room ID:', roomId);

  return (
    <div>
      <h2>Meeting Room: {roomId}</h2>
      <div className="video-container">
        <p>Video and chat for room: {roomId}</p>
        <Chat />
      </div>
    </div>
  );
}

function ChatPage() {
  const { contactId } = useParams();
  return (
    <div>
      <h2>Chat with Contact: {contactId}</h2>
      <Chat />
    </div>
  );
}

function CallPage() {
  const { contactId } = useParams();
  return (
    <div>
      <h2>Calling Contact: {contactId}</h2>
      <p>Video call functionality for {contactId} goes here.</p>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [isChatVisible, setIsChatVisible] = useState(false); // Chat visibility state
  const [roomUrl, setRoomUrl] = useState(''); // Meeting room URL
  const videoRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Router>
      <div>
        <h1>Live Video Streaming with Chat</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/contacts">Contacts</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <div className="container">
                  <div className="video-container">
                    <video ref={videoRef} autoPlay playsInline></video>
                    <div className="button-container">
                      <button onClick={() => startScreenShare(videoRef)}>Share Screen</button>
                      <button onClick={() => stopScreenShare(videoRef)}>Stop Sharing</button>
                      <button
                        onClick={() => {
                          const url = generateRoomUrl();
                          setRoomUrl(url);
                        }}
                      >
                        Generate Room URL
                      </button>
                    </div>
                  </div>
                  <div className="button-container">
                    <button onClick={() => setIsChatVisible(!isChatVisible)}>
                      {isChatVisible ? 'Close Chat' : 'Open Chat'}
                    </button>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </div>
                  {roomUrl && (
                    <div>
                      <p>
                        Meeting Room URL:{' '}
                        <a href={roomUrl} target="_blank" rel="noopener noreferrer">
                          {roomUrl}
                        </a>
                      </p>
                    </div>
                  )}
                  {isChatVisible && (
                    <div className="chat-container">
                      <Chat />
                    </div>
                  )}
                </div>
              ) : (
                <Auth />
              )
            }
          />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/room/:roomId" element={<MeetingRoom />} />
          <Route path="/chat/:contactId" element={<ChatPage />} />
          <Route path="/call/:contactId" element={<CallPage />} />
        </Routes>
        <DatabaseTest />
      </div>
    </Router>
  );
}

export default App;
