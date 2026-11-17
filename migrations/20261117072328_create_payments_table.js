/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payments', (table) => {

        table.uuid('id').primary();

        table.string('user_id', 24).notNullable();

        table.bigInteger('amount_kobo').notNullable();

        table.string('provider', 20).notNullable();

        table.string('provider_reference', 100).nullable().unique();

        table.string('status', 20).notNullable().defaultTo('pending');

        table.jsonb('metadata').nullable();

        table.timestamps(true, true);

        table.check('amount_kobo > 0');

        table.index('user_id');
        table.index('status');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('payments');
};
