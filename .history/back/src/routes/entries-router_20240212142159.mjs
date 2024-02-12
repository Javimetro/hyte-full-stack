
import express from 'express';
import { listAllDiaryEntries, getEntryById, updateEntry, deleteEntry } from '../controllers/entries-controller.mjs';

const router = express.Router();

// List all diary entries
router.get('/entries', listAllDiaryEntries);

// Get diary entry by id
router.get('/entries/:id', getEntryById);

// Update a diary entry
router.put('/entries/:id', updateEntry);

// Delete entry
router.delete('/entries/:id', deleteEntry);

export default router;
