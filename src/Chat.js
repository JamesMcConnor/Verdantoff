import React, { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage(''); // Clear the input after sending
    }
  };

  return (
    <div>
      <h2>Live Chat</h2>
      <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%' }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chat;
