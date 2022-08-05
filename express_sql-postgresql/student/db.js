const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "student",
    password: "nikuze",
    port: 12345,
});


module.exports = pool;