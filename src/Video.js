// src/Video.js
import React, { useEffect, useRef } from 'react';

function Video() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    }
    getMedia();
  }, []);

  return (
    <div>
      <h2>Live Video</h2>
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxHeight: "400px" }} />
    </div>
  );
}

export default Video;
