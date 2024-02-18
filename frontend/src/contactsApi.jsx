import axios from 'axios';

/*
interface IContact {
  first: String;
  last: String;
  twitter: String;
  avatar: String;
  notes: String;
  createdAt: Date;
}*/

const API_URL = 'http://localhost:5000/api/contacts';

// Get contacts list based on search query
export async function getContactsDB(query) {
  const response = await axios.get(`${API_URL}/?q=${query}`);
  console.log(response);
  if(!response.data) return [];
  return response.data;
}

// Create new contact
export async function createContactDB() {
  const newContact = {
    firstName: "New",
    lastName: "Contact",
  }
  const response = await axios.post(API_URL, newContact);
  return response.data;
}

// Get contact by id
export async function getContactDB(contactId) {
  const response = await axios.get(`${API_URL}/${contactId}`);
  console.log(response);
  if(!response.data) return [];
  return response.data;
}

// Update existing contact if found
export async function updateContactDB(contactId, updates) {
  const response = await axios.patch(`${API_URL}/${contactId}`, updates);
  console.log(response);
  if(!response.data) return [];
  return response.data;
}

// Delete existing Contact
export async function deleteContactDB(contactId) {
  const response = await axios.delete(`${API_URL}/${contactId}`);
  console.log(response);
  if(!response.data) return [];
  return response.data;
}