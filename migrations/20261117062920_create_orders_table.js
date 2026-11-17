/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('orders', (table) => {

        table.uuid('id').primary();

        table.string('buyer_id', 24).notNullable();

        table.uuid('parent_order_id')
            .nullable()
            .references('id')
            .inTable('orders')
            .onDelete('RESTRICT');

        table.string('status', 30).notNullable().defaultTo('PENDING_PAYMENT');

        table.bigInteger('total_amount_kobo').notNullable();

        table.timestamps(true, true);

        table.check('total_amount_kobo >= 0');

        table.index('buyer_id');
        table.index('parent_order_id');
        table.index('status');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders');
};
