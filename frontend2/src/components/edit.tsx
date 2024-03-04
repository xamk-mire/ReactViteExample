import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactModel } from "../models/dataModels";
import { getContactDB, updateContactDB } from "../services/contactsApi";

const getContact = async (contactId: string) => {
  return await getContactDB(contactId);
};

export default function EditContact() {
  const { contactId } = useParams();
  const [contact, setContact] = useState<ContactModel>({} as ContactModel);
  const [loading, setLoading] = useState<boolean>(true);

  if (contactId != undefined && !contact.firstName) {
    getContact(contactId).then((data: ContactModel) => {
      setContact(data);
      setLoading(false);
    });
  }

  // Handle form input/textare changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setContact((prevState: ContactModel) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (name: string, value: boolean) => {
    setContact((prevState: ContactModel) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Use react-router-dom navigation for redirect
  const navigate = useNavigate();

  // Try to update the contact
  const updateContact = async (e: FormEvent) => {
    e.preventDefault();
    if (await updateContactDB(contact)) {
      navigate(`/contacts/${contact.contactId}`);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {contact ? (
            <form onSubmit={updateContact} id="contact-form">
              <p>
                <span>Name</span>
                <input
                  placeholder="First name"
                  aria-label="First name"
                  type="text"
                  name="firstName"
                  defaultValue={contact.firstName}
                  onChange={handleChange}
                />
                <input
                  placeholder="Last name"
                  aria-label="Last name"
                  type="text"
                  name="lastName"
                  defaultValue={contact.lastName}
                  onChange={handleChange}
                />
              </p>
              <label>
                <span>Twitter</span>
                <input
                  type="text"
                  name="twitter"
                  placeholder="@jack"
                  defaultValue={contact.twitter}
                  onChange={handleChange}
                />
              </label>
              <label>
                <span>Avatar URL</span>
                <input
                  placeholder="https://example.com/avatar.jpg"
                  aria-label="Avatar URL"
                  type="text"
                  name="avatar"
                  defaultValue={contact.avatar}
                  onChange={handleChange}
                />
              </label>
              <label>
                <span>Notes</span>
                <textarea
                  name="notes"
                  defaultValue={contact.notes}
                  rows={6}
                  onChange={handleChange}
                />
              </label>
              {/* Custom checkbox */}
              <label className="checkbox">
                <span>Favorite</span>
                <div>
                  <div
                    className="custom-checkbox-container"
                    onClick={() =>
                      handleCheckboxChange("favorite", !contact.favorite)
                    }
                  >
                    <div
                      className={`custom-checkbox ${
                        contact.favorite ? "checked" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </label>
              <p>
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </button>
              </p>
            </form>
          ) : (
            <div>No contact found</div>
          )}
        </>
      )}
    </>
  );
}
