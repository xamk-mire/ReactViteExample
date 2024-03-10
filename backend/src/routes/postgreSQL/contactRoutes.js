import express from "express";
import {
  create,
  deleteById,
  findById,
  findByQuery,
  update,
} from "../../controllers/postgreSQL/contact.controller.js";

export const router = express.Router();

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Retrieve a list of contacts based on query
 *     responses:
 *       200:
 *         description: A list of contacts.
 */
router.get("/", findByQuery);

/**
 * @swagger
 * /api/contacts/{contactId}:
 *   get:
 *     summary: Retrieve a contact based on contact Id
 *     parameters:
 *      -   in: path
 *          name: contactId
 *          schema:
 *              type: string
 *          required: true
 *          description: String ID of the contact
 *     responses:
 *       200:
 *         description: A contact found by Id
 */
router.get("/:contactId", findById);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *      summary: Create new contact
 *      requestBody:
 *          description: Updated contact model
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      requried:
 *                          -   firstName
 *                          -   lastName
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          twitter:
 *                              type: string
 *                          avatar:
 *                              type: string
 *                          notes:
 *                              type: string
 *      responses:
 *       200:
 *         description: New created contact.
 */
router.post("/", create);

/**
 * @swagger
 * /api/contacts/{contactId}:
 *   patch:
 *      summary: Update existing contact
 *      parameters:
 *      -   in: path
 *          name: contactId
 *          schema:
 *              type: string
 *          required: true
 *          description: String ID of the contact
 *
 *      requestBody:
 *          description: Updated contact model
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      requried:
 *                          -   firstName
 *                          -   lastName
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          twitter:
 *                              type: string
 *                          avatar:
 *                              type: string
 *                          notes:
 *                              type: string
 *      responses:
 *       200:
 *         description: A list of updated contacts.
 */
router.patch("/:contactId", update);

/**
 * @swagger
 * /api/contacts/{contactId}:
 *   delete:
 *      summary: Delete contact by contact Id
 *      parameters:
 *      -   in: path
 *          name: contactId
 *          schema:
 *              type: string
 *          required: true
 *          description: String ID of the contact
 *      responses:
 *       200:
 *         description: A list of updated contacts.
 */
router.delete("/:contactId", deleteById);

// Example api where we do not use sequelize
/*
app.post('/api/contacts/', async (req, res) => {
  console.log('test', req.body);
  try {
    const created = Date.now();
    const body = req.body;
    const newContact = await pool.query(
      `INSERT INTO contact (firstname, lastname, twitter, avatar, notes, createdat) VALUES($1, $2, $3, $4, $5, to_timestamp(${created} / 1000.0))`,
      [body.first, body.last, body.twitter, body.avatar, body.notes]
    );
    res.status(200).json();
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
})*/
