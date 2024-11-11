export const generateRoomUrl = () => {
  const roomId = Math.random().toString(36).substring(2, 10); // Generate a random room ID
  const roomUrl = `${window.location.origin}/room/${roomId}`; // Adjust the URL dynamically
  return roomUrl;
};
