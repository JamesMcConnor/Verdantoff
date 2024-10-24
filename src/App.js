import React, { useRef, useEffect, useState } from 'react'; // Ensure all necessary imports
import Chat from './Chat'; // Import the Chat component
import { startScreenShare, stopScreenShare } from './screenShare'; // Import screen sharing functions
import { generateRoomUrl } from './roomUrl'; // Import room URL generation function
import './App.css'; // Import the CSS file

function App() {
  const videoRef = useRef(null); // Reference for the video element
  const [roomUrl, setRoomUrl] = useState(''); // State for storing the generated room URL

  useEffect(() => {
    // Request access to the user's media devices (camera and microphone)
    async function getMediaStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); // Ensure audio is included
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Set the stream to the video element
        }
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    }

    getMediaStream(); // Call the function to request media access
  }, []);

  return (
    <div>
      <h1>Live Video Streaming with Chat</h1>
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
      </div>
    </div>
  );
}

export default App;
