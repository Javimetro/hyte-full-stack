import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'public' directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// mock data for simple API
const items = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 3, name: 'Item kolme'},
  {id: 4, name: 'Item neljä'},
];

// GET http://127.0.0.1:3000/items
app.get('/items', (req, res) => {
  res.json(items);
});


// GET http://127.0.0.1:3000/items/<ID>
app.get('/items/:id', (req, res) => {
  // Extract the id from the request parameters as a string
  const requestedId = req.params.id;

  // Initialize the item variable
  let item;
  // Loop through the items array
  for (let i = 0; i < items.length; i++) {
    if (String(items[i].id) === requestedId) {
      item = items[i];
      break; // Stop the loop if the item is found
    }
  }

  // If the item was found, return it, otherwise return 404 not found
  if (item) {
    console.log('Item found:', item); // Log the item details to the console
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});


// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
