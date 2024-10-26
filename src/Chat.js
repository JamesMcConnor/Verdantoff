// src/Chat.js

import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

console.log("Chat component loaded");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Reference to the "messages" subcollection inside the "rooms" collection
    const messagesRef = collection(db, 'rooms', 'xyncRvVODCmac1p0un1B', 'messages');

    // Query to get messages ordered by timestamp
    const q = query(messagesRef, orderBy('timestamp'));

    // Listen for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      // Reference to the "messages" subcollection
      const messagesRef = collection(db, 'rooms', 'xyncRvVODCmac1p0un1B', 'messages');

      // Add new message with timestamp
      await addDoc(messagesRef, {
        text: newMessage,
        timestamp: serverTimestamp()
      });

      setNewMessage(''); // Clear input field
    }
  };

  return (
    <div>
      <h2>Live Chat</h2>
      <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.timestamp?.toDate().toLocaleString() || 'Sending...'}:</strong> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
