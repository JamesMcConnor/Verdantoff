import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Adjust the path if needed

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) {
      console.error("User is not logged in.");
      return;
    }

    const contactsRef = collection(db, "users", auth.currentUser.uid, "contacts");

    const unsubscribe = onSnapshot(contactsRef, (snapshot) => {
      const contactsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactsData);
    });

    return () => unsubscribe();
  }, []);

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
    </div>
  );
}

export default Contacts;
