import axios, { AxiosResponse } from "axios";
import { ContactModel } from "../models/dataModels";

const API_URL = "http://localhost:5000/api/contacts";

// Get contacts list based on search query
export async function getContactsDB(query: string = "") {
  const response: AxiosResponse = await axios.get(`${API_URL}/?q=${query}`);
  console.log(response);
  if (!response.data) return [];
  const data: ContactModel[] = response.data;
  return data;
}

// Get contact by id
export async function getContactDB(contactId: string) {
  const response: AxiosResponse = await axios.get(`${API_URL}/${contactId}`);
  console.log(response);
  if (!response.data) throw Error("No contact found");
  return response.data as ContactModel;
}

// Create new contact
export async function createContactDB() {
  const newContact = {
    firstName: "New",
    lastName: "Contact",
  };
  const response: AxiosResponse = await axios.post(API_URL, newContact);
  return response.data as ContactModel;
}

// Update existing contact if found
export async function updateContactDB(updateModel: ContactModel) {
  const response: AxiosResponse = await axios.patch(
    `${API_URL}/${updateModel.contactId}`,
    updateModel
  );
  console.log(response);
  if (!response.data) return [];
  return response.data as ContactModel[];
}

// Delete existing Contact
export async function deleteContactDB(contactId: string) {
  const response: AxiosResponse = await axios.delete(`${API_URL}/${contactId}`);
  console.log(response);
  if (!response.data) return false;
  return true;
}
