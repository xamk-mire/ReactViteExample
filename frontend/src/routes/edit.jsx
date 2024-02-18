import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
// import { updateContact } from "../contacts"; // Old implementation using localforage
import { updateContactDB } from "../contactsApi";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  updates.favorite = updates.favorite === 'on';
  await updateContactDB(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First name"
          aria-label="First name"
          type="text"
          name="firstName"
          defaultValue={contact.firstName}
        />
        <input
          placeholder="Last name"
          aria-label="Last name"
          type="text"
          name="lastName"
          defaultValue={contact.lastName}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
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
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <label className="checkbox">
        <span>Favorite</span>
        <div>
        <input
          type="checkbox"
          name="favorite"
          defaultChecked={contact.favorite || false}
        />
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
    </Form>
  );
}
