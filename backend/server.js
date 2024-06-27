const express = require('express');
const sqlite3 = require('sqlite3').verbose();

// Create Express server
const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('database.db');

// Middleware to parse JSON request body
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// API Endpoints

// GET all users
app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// GET single user by username
app.get('/api/users/:name', (req, res) => {
    const username = req.params.name;
    db.get('SELECT * FROM users WHERE name = ?', [username], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(row);
    });
});

// POST a new user
app.post('/api/users', (req, res) => {
    
    const {name} = req.body;
    if (!name) {
        res.status(400).json({ message: 'Username is required' });
        return;
    }
    db.run('INSERT INTO users (name) VALUES (?)', [name], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ name }); 
    });
});

// PUT update user by ID
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    if (!name || !email) {
        res.status(400).json({ message: 'Name and email are required' });
        return;
    }
    db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ id: userId, name, email });
    });
});

// DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// Serve static files from 'frontend' directory
app.use(express.static('../frontend'));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});