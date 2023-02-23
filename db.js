// Database Connection

const Pool = require('pg').Pool;

// Same thing would be: const { Pool } = require('pg');

const { DB } = require('./config')

const pool = new Pool({
    user: DB.PGUSER,
    host: DB.PGHOST,
    database: DB.PGDATABASE,
    password: DB.PGPASSWORD,
    port: DB.PGPORT
})

module.exports = pool;