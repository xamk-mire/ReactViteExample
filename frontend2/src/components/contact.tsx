//import { Form } from "react-router-dom";
// import { getContact, updateContact } from "../contacts"; // Old implementation using localforage
import { deleteContactDB, getContactDB } from "../services/contactsApi";

import { useEffect, useState } from "react";
import { ContactModel } from "../models/dataModels";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "./modal";

export default function Contact() {
  const { contactId } = useParams();
  const [contact, setContact] = useState<ContactModel>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      if (contactId != undefined) {
        try {
          const contactData = await getContactDB(contactId);
          setContact(contactData);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [contactId]);

  // Handle contact deletion using confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Use react-router-dom navigation for redirect
  const navigate = useNavigate();

  // Handle confirmation action
  const handleConfirmAction = async () => {
    setIsModalOpen(false);
    // Add any other logic for when confirmation is successful
    if (await deleteContactDB(contact!.contactId.toString())) {
      navigate("/");
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {contact ? (
            <div id="contact">
              <div>
                <img key={contact.avatar} src={contact.avatar} />
              </div>

              <div>
                <h1>
                  {contact.firstName || contact.lastName ? (
                    <>
                      {contact.firstName} {contact.lastName}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}{" "}
                  <span className="favorite">
                    {contact.favorite ? "★" : "☆"}
                  </span>
                </h1>

                {contact.twitter && (
                  <p>
                    <a
                      target="_blank"
                      href={`https://twitter.com/${contact.twitter}`}
                      rel="noreferrer"
                    >
                      {contact.twitter}
                    </a>
                  </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                  <button className="navigation-button" type="button">
                    <NavLink to={`/contacts/${contact.contactId}/edit`}>
                      Edit
                    </NavLink>
                  </button>
                  <button type="button" onClick={handleOpenModal}>
                    Delete
                  </button>
                  <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmAction}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>No contact found</div>
          )}
        </>
      )}
    </>
  );
}
