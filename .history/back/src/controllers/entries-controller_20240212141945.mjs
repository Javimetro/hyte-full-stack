import {
    deleteEntryById,
    insertEntry,
    listAllDiaryEntryes,
    selectEntryById,
    updateEntryById,
  } from '../models/Entryes-model.mjs';

  // TODO: implement route handlers below for Entryes (real data)

  const getEntries = async (req, res) => {
    const result = await listAllDiaryEntryes();
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  };

  const getEntryById = async (req, res) => {
    const result = await selectEntryById(req.params.id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  };

  const postEntry = async (req, res) => {
    const {Entryname, password, email} = req.body;
    // check that all needed fields are included in request
    if (Entryname && password && email) {
      const result = await insertEntry(req.body);
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.status(201).json(result);
    } else {
      return res.status(400).json({error: 400, message: 'bad request'});
    }
  };

  const putEntry = async (req, res) => {
    const Entry_id = req.params.id;
    const {Entryname, password, email} = req.body;
    // check that all needed fields are included in request
    if (Entry_id && Entryname && password && email) {
      const result = await updateEntryById({Entry_id, ...req.body});
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.status(201).json(result);
    } else {
      return res.status(400).json({error: 400, message: 'bad request'});
    }
  };

  const deleteEntry = async (req, res) => {
    const result = await deleteEntryById(req.params.id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  };

  // Dummy login with mock data, returns Entry object if Entryname & password match
  const postLogin = (req, res) => {
    const EntryCreds = req.body;
    if (!EntryCreds.Entryname || !EntryCreds.password) {
      return res.sendStatus(400);
    }
    const EntryFound = Entryes.find((Entry) => Entry.Entryname == EntryCreds.Entryname);
    // Entry not found
    if (!EntryFound) {
      return res.status(403).json({error: 'Entryname/password invalid'});
    }
    // check if posted password matches to Entry found password
    if (EntryFound.password === EntryCreds.password) {
      res.json({message: 'logged in successfully', Entry: EntryFound});
    } else {
      return res.status(403).json({error: 'Entryname/password invalid'});
    }
  };

  export {getEntries, getEntryById, postEntry, putEntry, postLogin, deleteEntry};
