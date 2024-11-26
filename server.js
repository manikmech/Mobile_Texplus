const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysqlPool = require('./db/mysql');
const { connectMSSQL } = require('./db/mssql');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test MySQL Connection
app.get('/mysql', async (req, res) => {
    try {
        // Query MySQL Database
        const [rows] = await mysqlPool.query('SELECT * FROM users'); // Ensure 'users' table exists in your DB
        res.json({ message: 'MySQL connected', data: rows });
    } catch (error) {
        console.error('MySQL error:', error.message);
        res.status(500).json({ error: 'Failed to connect to MySQL', details: error.message });
    }
});

// Test MSSQL Connection
app.get('/mssql', async (req, res) => {
    try {
        const pool = await connectMSSQL();
        const result = await pool.request().query('SELECT  * from ordmaster');
        res.json({ message: 'MSSQL connected', data: result.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to connect to MSSQL' });
    }
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
