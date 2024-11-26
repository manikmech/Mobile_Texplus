const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.MSSQL_HOST.split('\\')[0],
    database: process.env.MSSQL_DATABASE,
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    port: parseInt(process.env.MSSQL_PORT, 10) || 1433,
    options: {
        encrypt: false, // Disable SSL
        trustServerCertificate: true, // For self-signed certificates
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

async function connectMSSQL() {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to MSSQL database!');
        return pool;
    } catch (error) {
        console.error('MSSQL Connection Error:', error.message);
        throw error;
    }
}

module.exports = { connectMSSQL };
