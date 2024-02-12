
import express from 'express';
import { getEntries, getEntryById, postEntry, putEntry, deleteEntry } from '../controllers/entries-controller.mjs';

const entryRouter = express.Router();

entryRouter.route('/')
  // list entrys
  .get(getEntries)
  // entry registration
  .post(postEntry);

// /entry/:id endpoint
entryRouter.route('/:id')
  // get info of a entry
  .get(getEntryById)
  // update entry
  .put(putEntry)
  // delete entry based on id
  .delete(deleteEntry);



export default entryRouter;
