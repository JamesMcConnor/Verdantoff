import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const contactsRef = ref(db, 'contacts');

    // Fetch contacts from Firebase Realtime Database
    onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setContacts(contactList);
      }
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contacts</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          >
            <span
              style={{
                height: '10px',
                width: '10px',
                borderRadius: '50%',
                backgroundColor: contact.isOnline ? 'green' : 'red',
                marginRight: '10px',
              }}
            ></span>
            <span style={{ flexGrow: 1 }}>{contact.name}</span>
            <button
              style={{
                marginRight: '10px',
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Start Chat
            </button>
            <button
              style={{
                padding: '5px 10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Initiate Call
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
