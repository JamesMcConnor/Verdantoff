export const startScreenShare = async (videoRef) => {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });
    videoRef.current.srcObject = screenStream;
  } catch (err) {
    console.error("Error sharing the screen:", err);
  }
};

export const stopScreenShare = (videoRef) => {
  if (videoRef.current && videoRef.current.srcObject) {
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null; // Reset the video element
  }
};
