// src/components/Contacts.js

import React, { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import { realtimeDB, auth } from "../firebaseConfig";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!auth.currentUser) {
      console.error("User is not logged in.");
      return;
    }

    const userId = auth.currentUser.uid;
    const contactsRef = ref(realtimeDB, `contacts/${userId}`);

    const unsubscribe = onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      const contactsArray = data
        ? Object.entries(data).map(([id, details]) => ({
            id,
            ...details,
          }))
        : [];
      setContacts(contactsArray);
    });

    return () => unsubscribe();
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

  return (
    <div>
      <h2>Your Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} ({contact.email})
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
