const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;

module.exports = connectionString;