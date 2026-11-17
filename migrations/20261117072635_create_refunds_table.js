/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('refunds', (table) => {

        table.uuid('id').primary();

        table.uuid('order_id')
            .notNullable()
            .references('id')
            .inTable('orders')
            .onDelete('RESTRICT');

        table.string('buyer_id', 24).notNullable();

        table.bigInteger('amount_kobo').notNullable();

        table.string('reason', 150).notNullable();

        table.string('status', 20).notNullable().defaultTo('pending');

        table.uuid('ledger_transaction_id')
            .nullable()
            .references('id')
            .inTable('ledger_transactions')
            .onDelete('RESTRICT');

        table.timestamps(true, true);

        table.check('amount_kobo > 0');

        table.index('order_id');
        table.index('buyer_id');
        table.index('status');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('refunds');
};
