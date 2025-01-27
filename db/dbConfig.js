const pgp = require('pg-promise')(); //npm i pg-promise, connects you to psql
require('dotenv').config(); //access to vars from .env file

const connect = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
};

const db = pgp(connect);

module.exports = db;