/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('ledger_transactions', (table) => {

        table.uuid('id').primary();

        table.string('transaction_type', 40).notNullable();

        table.string('reference', 100).nullable();

        table.string('idempotency_key', 100).nullable().unique();

        table.string('status', 20).notNullable().defaultTo('completed');

        table.text('description').nullable();

        table.timestamps(true, true);

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ledger_transactions');
};
