
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

/*

ESIMERKIT

PUT - http://127.0.0.1:3000/entries/:entry_id
{
  "user_id": "3",
  "entry_date": "2024-02-12",
  "mood": "put testing",
  "weight": "100",
  "sleep_hours": "8",
  "notes": "testing PUTING entry"
}

POST

http://127.0.0.1:3000/entries/
{
  "user_id": "4",
  "entry_date": "2024-02-12",
  "mood": "testing again",
  "weight": "200",
  "sleep_hours": "8",
  "notes": "testing posting entry again"
}

*/
