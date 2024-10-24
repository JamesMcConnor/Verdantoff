export const generateRoomUrl = () => {
  const roomId = Math.random().toString(36).substring(2, 10); // Generate a random room ID
  const roomUrl = `http://localhost:3000/room/${roomId}`; // Adjust based on your routing setup
  return roomUrl;
};
