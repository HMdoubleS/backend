const Pool  = require('pg').Pool;
const connectionString = require('../settings');

const pool = new Pool({
    connectionString
});


module.exports = pool;