
import express from 'express';
import { getEntryById, updateEntry, deleteEntry } from '../controllers/entries-controller.mjs';

const entryRouter = express.Router();

// List all diary entries
router.get('/entries', listAllDiaryEntries);

// Get diary entry by id
router.get('/entries/:id', getEntryById);

// Update a diary entry
router.put('/entries/:id', updateEntry);

// Delete entry
router.delete('/entries/:id', deleteEntry);

export default entryRouter;
