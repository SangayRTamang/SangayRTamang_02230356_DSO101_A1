const mysql = require('mysql2');
require('dontev').config();

const pool = mysql.createPool({
    host: process.env.DB.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,  
}).promise();

module.exports = pool;