import express from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;

// SQLite database setup
const db = new sqlite3.Database(':memory:'); // Change to a file path for persistent storage

// Example API route
app.get('/api/data', (req, res) => {
  db.all('SELECT * FROM my_table', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
