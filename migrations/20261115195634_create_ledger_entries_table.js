/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('ledger_entries', (table) => {

        table.uuid('id').primary();

        table.uuid('transaction_id')
            .notNullable()
            .references('id')
            .inTable('ledger_transactions')
            .onDelete('RESTRICT');

        table.uuid('account_id')
            .notNullable()
            .references('id')
            .inTable('accounts')
            .onDelete('RESTRICT');

        table.enu('entry_type', ['debit', 'credit']).notNullable();

        table.bigInteger('amount_kobo').notNullable();

        table.check('amount_kobo > 0', [], 'ledger_entries_amount_positive');

        table.timestamps(true, true);

        table.index('transaction_id');

        table.index('account_id');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ledger_entries');
};
