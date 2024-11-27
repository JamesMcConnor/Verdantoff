// src/components/Contacts.js

import React, { useState, useEffect } from "react";
import { ref, push, onValue, onDisconnect, set, remove } from "firebase/database";
import { auth, realtimeDB } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });
  const [onlineStatus, setOnlineStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      console.error("User is not logged in.");
      return;
    }

    const userId = auth.currentUser.uid;
    const contactsRef = ref(realtimeDB, `contacts/${userId}`);
    const presenceRef = ref(realtimeDB, `presence/${userId}`);
    const globalPresenceRef = ref(realtimeDB, "presence/");

    // Mark user online and handle disconnects
    onDisconnect(presenceRef).remove(); // Ensure presence is cleared on abrupt disconnect
    set(presenceRef, { status: "online", lastSeen: Date.now() })
      .catch((error) => console.error("Error setting presence:", error));

    // Fetch contacts
    const unsubscribeContacts = onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      const contactsArray = data
        ? Object.entries(data).map(([id, details]) => ({
            id,
            ...details,
          }))
        : [];
      setContacts(contactsArray);
    });

    // Track online status for all users
    const unsubscribePresence = onValue(globalPresenceRef, (snapshot) => {
      setOnlineStatus(snapshot.val() || {});
    });

    // Cleanup on logout and component unmount
    const handleLogout = async () => {
      try {
        await remove(presenceRef);
      } catch (error) {
        console.error("Error removing presence:", error);
      }
    };

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        handleLogout();
      }
    });

    return () => {
      unsubscribeContacts();
      unsubscribePresence();
      unsubscribeAuth();
      set(presenceRef, null).catch((error) =>
        console.error("Error removing presence on unmount:", error)
      );
    };
  }, []);

  const handleAddContact = () => {
    if (!auth.currentUser) {
      console.error("User is not logged in.");
      return;
    }

    const userId = auth.currentUser.uid;
    const contactsRef = ref(realtimeDB, `contacts/${userId}`);

    if (newContact.name.trim() && newContact.email.trim()) {
      push(contactsRef, newContact);
      setNewContact({ name: "", email: "" });
    }
  };

  const handleStartChat = (contactId) => {
    navigate(`/chat/${contactId}`);
  };

  const handleInitiateCall = (contactId) => {
    navigate(`/call/${contactId}`);
  };

  return (
    <div>
      <h2>Your Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} ({contact.email})
            {onlineStatus[contact.id]?.status === "online" ? (
              <span style={{ color: "green", marginLeft: "10px" }}>● Online</span>
            ) : (
              <span style={{ color: "gray", marginLeft: "10px" }}>● Offline</span>
            )}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleStartChat(contact.id)}
            >
              Start Chat
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleInitiateCall(contact.id)}
            >
              Initiate Call
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
    </div>
  );
}

export default Contacts;
