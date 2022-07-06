/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('user', (table) => {
    table.increments('id')
    table.integer('authId').unsigned()
    table.string('firstName', 50).notNullable()
    table.string('lastName', 16).notNullable()
    table.integer('age').notNullable()
  })

  return knex.schema.table('user', table => {
    table.foreign('authId').references('id').inTable('auth')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user')
};
