import {
    deleteEntriById,
    insertEntri,
    listAllDiaryEntries,
    selectEntriById,
    updateEntriById,
  } from '../models/entries-model.mjs';

  // TODO: implement route handlers below for Entries (real data)

  const getEntries = async (req, res) => {
    const result = await listAllDiaryEntries();
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  };

  const getEntriById = async (req, res) => {
    const result = await selectEntriById(req.params.id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  };

  const postEntri = async (req, res) => {
    const {Entriname, password, email} = req.body;
    // check that all needed fields are included in request
    if (Entriname && password && email) {
      const result = await insertEntri(req.body);
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.status(201).json(result);
    } else {
      return res.status(400).json({error: 400, message: 'bad request'});
    }
  };

  const putEntri = async (req, res) => {
    const Entri_id = req.params.id;
    const {Entriname, password, email} = req.body;
    // check that all needed fields are included in request
    if (Entri_id && Entriname && password && email) {
      const result = await updateEntriById({Entri_id, ...req.body});
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.status(201).json(result);
    } else {
      return res.status(400).json({error: 400, message: 'bad request'});
    }
  };

  const deleteEntri = async (req, res) => {
    const result = await deleteEntriById(req.params.id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  };

  // Dummy login with mock data, returns Entri object if Entriname & password match
  const postLogin = (req, res) => {
    const EntriCreds = req.body;
    if (!EntriCreds.Entriname || !EntriCreds.password) {
      return res.sendStatus(400);
    }
    const EntriFound = Entries.find((Entri) => Entri.Entriname == EntriCreds.Entriname);
    // Entri not found
    if (!EntriFound) {
      return res.status(403).json({error: 'Entriname/password invalid'});
    }
    // check if posted password matches to Entri found password
    if (EntriFound.password === EntriCreds.password) {
      res.json({message: 'logged in successfully', Entri: EntriFound});
    } else {
      return res.status(403).json({error: 'Entriname/password invalid'});
    }
  };

  export {getEntries, getEntriById, postEntri, putEntri, postLogin, deleteEntri};
