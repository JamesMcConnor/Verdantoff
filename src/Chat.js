import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "./firebaseConfig"; // Assuming firebaseConfig.js exports db and auth
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(
      db,
      "rooms",
      "xyncRvVODCmac1p0un1B",
      "messages"
    );
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== "") {
      try {
        await addDoc(collection(db, "messages"), {
          text: newMessage,
          timestamp: serverTimestamp(),
          senderId: auth.currentUser.uid, // Assuming you have auth set up
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error adding message: ", error);
      }
    }
  };

  return (
    <div>
      <h2>Live Chat</h2>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          height: "200px",
          overflowY: "scroll",
        }}
      >
        {messages.map((message) => (
          <div key={message.id}>
            {/* Display message text only if it exists */}
            {message.text && (
              <>
                <strong>
                  {message.timestamp?.toDate().toLocaleString() ||
                    "Sending..."}
                  :
                </strong>{" "}
                {message.text}
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
