/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payouts', (table) => {

        table.uuid('id').primary();

        table.string('vendor_id', 24).notNullable();

        table.bigInteger('amount_kobo').notNullable();

        table.string('bank_name', 100).notNullable();

        table.string('account_number', 20).notNullable();

        table.string('account_name', 150).notNullable();

        table.string('status', 20).notNullable().defaultTo('pending');

        table.string('provider_reference', 100).nullable().unique();

        table.text('failure_reason').nullable();

        table.timestamps(true, true);

        table.check('amount_kobo > 0');

        table.index('vendor_id');
        table.index('status');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('payouts');  
};
