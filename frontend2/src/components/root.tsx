import {
  Outlet,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
// import {getContactsDB, createContactDB} from "../contactsApi"
import { useEffect, useState } from "react";
import { ContactModel } from "../models/dataModels";
import { createContactDB, getContactsDB } from "../services/contactsApi";

export default function Root() {
  const [contacts, setContacts] = useState<ContactModel[]>();
  const [loading, setLoading] = useState<boolean>(true);

  // Get and set url query parameters
  const [searchPrameters, setSearchParams] = useSearchParams();

  // Run at initalization and whenever query's value changes
  useEffect(() => {
    async function fetchData() {
      try {
        const contactsData = await getContactsDB(
          searchPrameters.get("q") || ""
        );
        setContacts(contactsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchPrameters]);

  // Use react-router-dom navigation for redirect
  const navigate = useNavigate();
  // Create new contact and navigate to edit page
  const newContact = () => {
    createContactDB().then((contact: ContactModel) => {
      navigate(`/contacts/${contact.contactId}/edit`);
    });
  };

  // Update searchParams => causes useEffect lifecycle
  const searchContacts = (searchTerm: string) => {
    setSearchParams({ q: searchTerm });
  };

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <input
            id="q"
            className={loading ? "loading" : ""}
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={searchPrameters.get("q") || ""}
            onChange={(event) => searchContacts(event.target.value)}
          />
          <button onClick={newContact}>New</button>
        </div>
        {loading ? (
          <p>
            <i>Loading</i>
          </p>
        ) : (
          <nav>
            {contacts && contacts.length ? (
              <ul>
                {contacts.map((contact: ContactModel) => (
                  <li key={contact.contactId}>
                    <NavLink
                      to={`/contacts/${contact.contactId}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      {contact.firstName || contact.lastName ? (
                        <>
                          {contact.firstName} {contact.lastName}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        )}
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
