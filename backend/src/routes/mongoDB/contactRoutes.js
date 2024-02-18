import express from 'express';
import {create, deleteById, findById, findByQuery, update} from '../../controllers/mongoDB/contact.controller.js';

export const router = express.Router();

// Get all contacts
router.get('/', findByQuery);

// Get contact by id
router.get('/:contactId', findById);

// Create new contact
router.post('/', create);

// Update existing contact
router.patch('/:contactId', update);

// Delete existing contact
router.delete('/:contactId', deleteById);
