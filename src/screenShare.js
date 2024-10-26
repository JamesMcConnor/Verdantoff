export const startScreenShare = async (videoRef) => {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true // Include audio if needed
    });
    videoRef.current.srcObject = screenStream; // Set the screen stream to the video element
  } catch (err) {
    console.error("Error sharing the screen:", err);
  }
};

export const stopScreenShare = (videoRef) => {
  if (videoRef.current && videoRef.current.srcObject) {
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach(track => track.stop()); // Stop all tracks to end the screen share
    videoRef.current.srcObject = null; // Clear the video source
  }
};
