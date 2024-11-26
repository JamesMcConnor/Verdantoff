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
    // Reference to the messages collection in Firestore
    const messagesRef = collection(
      db,
      "rooms",
      "xyncRvVODCmac1p0un1B",
      "messages"
    );
    const q = query(messagesRef, orderBy("timestamp"));

    // Realtime listener for messages
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
    // Scroll to the most recent message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (newMessage.trim() !== "") {
      const message = newMessage; // Cache the current message
      setNewMessage(""); // Clear input immediately

      try {
        await addDoc(
          collection(db, "rooms", "xyncRvVODCmac1p0un1B", "messages"),
          {
            text: message, // Use cached message
            timestamp: serverTimestamp(),
            senderId: auth.currentUser?.uid || "Anonymous", // Fallback to 'Anonymous' if not logged in
          }
        );
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
            {message.text && (
              <>
                <strong>
                  {message.timestamp?.toDate().toLocaleString() || "Sending..."}
                  :
                </strong>{" "}
                {message.text}
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSendMessage}
        style={{ display: "flex", marginTop: "10px" }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          style={{ flex: 1, marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 15px" }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
