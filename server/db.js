const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "25002500",
    host: "localhost",
    port: 5432,
    database: "perntodo"
})

module.exports = pool; //exporting pool to be used in index.js