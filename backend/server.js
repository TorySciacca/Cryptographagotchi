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

// GET single creature by creaturename and username
app.get('/api/creatures/:creature/:name', (req, res) => {
    const creature = req.params.creature;
    const username = req.params.name;
    
    db.get('SELECT * FROM creatures WHERE cryptoname = ? AND owner = ?', [creature, username], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Creature not found' });
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

// POST a new creature
app.post('/api/creatures', (req, res) => {
    const { name, owner } = req.body;

    // Validate input
    if (!name || !owner) {
        res.status(400).json({ message: 'Creature name and owner are required' });
        return;
    }

    // Insert into database
    db.run('INSERT INTO creatures (cryptoname, owner) VALUES (?, ?)', [name, owner], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Return success message or inserted data
        res.json({ message: 'Creature added successfully', name, owner });
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

// PUT update creature data (done every tick)

app.put('/api/creatures/:creatureName/:username', (req, res) => {
    const creatureName = req.params.creatureName;
    const username = req.params.username;
    const creatureData = req.body;

    // Update creature data in database

    db.run('UPDATE creatures SET mass = ?, health = ?, hunger = ?, fatigue = ? WHERE cryptoname = ? AND owner = ?', [creatureData.mass, creatureData.health, creatureData.hunger, creatureData.fatigue, creatureName, username], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Creature not found' });
            return;
        }
        // Return success message
        res.sendStatus(200);
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
app.use(express.static('frontend'));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});