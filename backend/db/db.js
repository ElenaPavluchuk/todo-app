require("dotenv").config();

// const pg = require("pg");
// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// module.exports = pool;

const environment = "development";
const config = require("./knexfile.js")[environment];

const knex = require("knex")(config);

module.exports = knex;
