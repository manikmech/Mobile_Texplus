const mysql = require('mysql2/promise'); // Use the promise version of mysql2
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306, // Default MySQL port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool; // Export the pool
