import db from "../../models/postgreSQL/index.js";
const Contact = db.contact;
const Op = db.Sequelize.Op;

// Retrieve Contacts from the database with searchTerm.
export async function findByQuery(req, res) {
  const searchTerm = req.query.q ?? "";
  await findContacts(searchTerm)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts.",
      });
    });
}

// Find a single Contact with an id
export async function findById(req, res) {
  // Validate request
  if (!req.body || !req.params?.contactId) {
    res.status(400).send({
      message: "Query can not be empty!",
    });
    return;
  }

  const contactId = req.params.contactId;

  await Contact.findByPk(contactId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while trying to find the Contact.",
      });
    });
}

// Create and Save a new Contact
export async function create(req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    // Create a Contact
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      twitter: req.body.twitter,
      avatar: req.body.avatar,
      notes: req.body.notes,
    };

    // Save Contact in the database
    const newContact = await Contact.create(contact).catch((err) => {
      throw new Error(
        err.message || "Some error occurred while creating the Contact."
      );
    });

    //const contacts = await findContacts();
    res.send(newContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update a Tutorial by the id in the request
export async function update(req, res) {
  // Validate request
  if (!req.body || !req.params?.contactId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    const contactId = req.params.contactId;

    // Create update model
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      twitter: req.body.twitter,
      avatar: req.body.avatar,
      notes: req.body.notes,
      favorite: req.body.favorite
    };

    await Contact.update(updateData, {
      where: {
        contactId: contactId,
      },
    }).catch((err) => {
      throw new Error(
        err.message || "Some error occurred while updating the Contact."
      );
    });

    const contacts = await findContacts();
    res.send(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete contact by id
export async function deleteById(req, res) {
  // Validate request
  if (!req.params?.contactId) {
    res.status(400).send({
      message: "Query can not be empty!",
    });
    return;
  }

  try {
    const contactId = req.params.contactId;

    await Contact.destroy({
      where: {
        contactId: contactId,
      },
    }).catch((err) => {
      throw new Error(
        err.message || "Some error occurred while deleting the Contact."
      );
    });

    const contacts = await findContacts();
    res.send(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* Helper methods */

// Retrieve Contacts from the database.
async function findContacts(searchTerm = "") {
  return await Contact.findAll({
    where: {
      [Op.or]: [
        {
          firstName: {
            [Op.iLike]: `%${searchTerm}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${searchTerm}%`,
          },
        },
        {
          twitter: {
            [Op.iLike]: `%${searchTerm}%`,
          },
        },
      ],
    },
  });
}
