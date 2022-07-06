// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {

  development: {
    client: 'mysql2',
    connection: {
      host: "database-travelGuide",
      port: 3306,
      user: "root",
      password: "secret",
      database: "travelGuide"
    },
    migrations: {
      directory: './src/providers/knex/migrations'
    }
  },

};

export default config