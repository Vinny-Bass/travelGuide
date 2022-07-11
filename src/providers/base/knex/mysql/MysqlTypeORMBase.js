import 'dotenv/config'
import knex from "knex"
export default class MysqlKnexBase {
  async connect() {
    return knex({
      client: process.env.DATABASE_CLIENT,
      connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB
      }
    })
  }
}