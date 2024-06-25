"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sqlite3_1 = require("sqlite3");
var app = (0, express_1.default)();
var port = 3000;
// SQLite database setup
var db = new sqlite3_1.default.Database(':memory:'); // Change to a file path for persistent storage
// Example API route
app.get('/api/data', function (req, res) {
    db.all('SELECT * FROM my_table', function (err, rows) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
        }
        else {
            res.json(rows);
        }
    });
});
// Start the server
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
