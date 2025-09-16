// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const path = require("path");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "todo",
      user: "elenapavlucuk",
      password: "040824",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
      tableName: "knex_migrations",
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
  },
};
