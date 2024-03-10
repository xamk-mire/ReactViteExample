import { Contact } from "../../models/mongoDB/contact.js";

// Retrieve all Contact from the database.
export async function findByQuery(req, res) {
  try {
    const searchTerm = req.query.q ?? "";
    const contacts = await findContacts(searchTerm);
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Find a single Contact with an contactId
export async function findById(req, res) {
  if (req.params.contactId != null) {
    console.log("req.params.contactId", req.params.contactId);
    try {
      const contactId = String(req.params.contactId);
      if (!contactId.match(/^[0-9a-fA-F]{24}$/))
        throw new Error("Invalid contactId");
      const contact = await Contact.findById({ _id: contactId });
      res.json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400);
  }
}

// Create and Save a new Contact
export async function create(req, res) {
  // Validate request
  if (req.body) {
    const body = req.body;
    // Create contact object
    let contact = new Contact({
      firstName: body.firstName,
      lastName: body.lastName,
      twitter: body.twitter,
      avatar: body.avatar,
      notes: body.notes,
    });
    try {
      const newContact = await contact.save();
      res.status(201).json(newContact);
    } catch (error) {
      console.log("error", error.message);
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400);
  }
}

// Update a Contact by the contactId in the request
export async function update(req, res) {
  try {
    if (!req.body && !req.params.contactId) {
      res.status(400).send({
        message: "Query can not be empty!",
      });
      return;
    }
    const body = req.body;
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      res.status(400).send({
        message: "No contact found with id: " + contactId,
      });
    }

    contact.set({
      firstName: body.firstName,
      lastName: body.lastName,
      twitter: body.twitter,
      avatar: body.avatar,
      notes: body.notes,
      favorite: body.favorite,
    });

    await contact.save();
    const contacts = await findContacts();
    res.status(201).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete contact by contactId
export async function deleteById(req, res) {
  try {
    // Validate request
    if (!req.params?.contactId) {
      res.status(400).send({
        message: "Query can not be empty!",
      });
      return;
    }

    const contactId = req.params.contactId;

    await Contact.findByIdAndDelete(contactId);
    const contacts = await findContacts();
    res.status(201).json(contacts);
  } catch (error) {
    console.error("Error deleting contact by ID:", error);
    res.status(500).json({ message: error.message });
  }
}

/* Helper methods */

// Retrieve Contacts from the database.
async function findContacts(searchTerm = "") {
  const searchRegex = new RegExp(searchTerm, "i");
  const query = {
    $or: [
      { firstName: { $regex: searchRegex } },
      { lastName: { $regex: searchRegex } },
      { twitter: { $regex: searchRegex } },
    ],
  };

  return await Contact.find(query);
}
