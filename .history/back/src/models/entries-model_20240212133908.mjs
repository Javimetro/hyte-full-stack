import promisePool from '../utils/database.mjs';

const listAllEntries = async () => {
  try {
    const sql = 'SELECT entrie_id, entriename, entrie_level FROM Entries';
    const [rows] = await promisePool.query(sql);
    //console.log(rows);
    return rows;
  } catch (error) {
    console.error('listAllEntries', error);
    return {error: 500, message: 'db error'};
  }
};

const selectEntrieById = async (id) => {
  try {
    const sql = 'SELECT * FROM Entries WHERE entrie_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    //console.log(rows);
    // if nothing is found with the entrie id, result array is empty []
    if (rows.length === 0) {
      return {error: 404, message: 'entrie not found'};
    }
    // Remove password property from result
    delete rows[0].password;
    return rows[0];
  } catch (error) {
    console.error('selectEntrieById', error);
    return {error: 500, message: 'db error'};
  }
};

const insertEntrie = async (entrie) => {
  try {
    const sql = 'INSERT INTO Entries (entriename, password, email) VALUES (?, ?, ?)';
    const params = [entrie.entriename, entrie.password, entrie.email];
    const [result] = await promisePool.query(sql, params);
    //console.log(result);
    return {message: 'new entrie created', entrie_id: result.insertId};
  } catch (error) {
    // now duplicate entry error is generic 500 error, should be fixed to 400 ?
    console.error('insertentrie', error);
    return {error: 500, message: 'db error'};
  }
};

const updateEntrieById = async (entrie) => {
  try {
    const sql = 'UPDATE Entries SET entriename=?, password=?, email=? WHERE entrie_id=?';
    const params = [entrie.entriename, entrie.password, entrie.email, entrie.entrie_id];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    return {message: 'entrie data updated', entrie_id: entrie.entrie_id};
  } catch (error) {
    // fix error handling
    // now duplicate entry error is generic 500 error, should be fixed to 400 ?
    console.error('updateentrieById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteEntrieById = async (id) => {
  try {
    const sql = 'DELETE FROM Entries WHERE entrie_id=?';
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entrie not found'};
    }
    return {message: 'entrie deleted', entrie_id: id};
  } catch (error) {
    // note that Entries with other data (FK constraint) cant be deleted directly
    console.error('deleteEntrieById', error);
    return {error: 500, message: 'db error'};
  }
};

export {listAllEntries, selectEntrieById, insertEntrie, updateEntrieById, deleteEntrieById};
