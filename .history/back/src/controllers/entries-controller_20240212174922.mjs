import {
    deleteEntryById,
    insertEntry,
    listAllDiaryEntries,
    selectEntryById,
    updateEntryById,
  } from '../models/entries-model.mjs';

  // TODO: implement route handlers below for Entryes (real data)




  const getEntries = async (req, res) => {
    const result = await listAllDiaryEntries();
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



  export { getEntries, getEntryById, postEntry, putEntry, deleteEntry};
