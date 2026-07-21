const mysql = require('mysql2');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Create connection pool
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

if (process.env.DB_SSL === 'true') {
    dbConfig.ssl = {
        ca: fs.readFileSync(path.join(__dirname, '../../aiven-ca.pem'))
    };
}

const pool = mysql.createPool(dbConfig);

// Promisify for async/await
const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log('✓ Database connected successfully');
    connection.release();
});

module.exports = promisePool;
