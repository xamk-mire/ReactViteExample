import express from 'express';
import {create, deleteById, findById, findByQuery, update} from '../../controllers/postgreSQL/contact.controller.js';

export const router = express.Router();

// Get contacts by query
router.get('/', findByQuery);

// Find contact by id
router.get('/:contactId', findById);

// Create new contact
router.post('/', create);

// Update existing contact
router.patch('/:contactId', update);

// Delete existing contact
router.delete('/:contactId', deleteById);

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