import { getDatabase, ref, get, child } from 'firebase/database';

/**
 * Fetches contact details by ID from the Realtime Database.
 * @param {string} contactId - The unique ID of the contact.
 * @returns {Promise<Object>} - A promise that resolves to the contact's details (e.g., name, isOnline).
 */
export const fetchContactDetails = async (contactId) => {
  const db = getDatabase();
  const contactRef = ref(db, `presence/${contactId}`);

  try {
    const snapshot = await get(contactRef);
    if (snapshot.exists()) {
      return {
        id: contactId,
        ...snapshot.val(),
      };
    } else {
      console.error(`Contact with ID ${contactId} not found.`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching contact details:', error);
    return null;
  }
};

/**
 * Fetches all contacts from the Realtime Database.
 * @returns {Promise<Array>} - A promise that resolves to an array of all contact details.
 */
export const fetchAllContacts = async () => {
  const db = getDatabase();
  const contactsRef = ref(db, 'presence');

  try {
    const snapshot = await get(contactsRef);
    if (snapshot.exists()) {
      const contacts = [];
      snapshot.forEach((childSnapshot) => {
        contacts.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      return contacts;
    } else {
      console.error('No contacts found in the database.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    return [];
  }
};
