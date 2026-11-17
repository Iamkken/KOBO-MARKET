/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_items', (table) => {

        table.uuid('id').primary();

        table.uuid('order_id')
            .notNullable()
            .references('id')
            .inTable('orders')
            .onDelete('RESTRICT');

        table.string('product_id', 24).notNullable();

        table.string('product_name', 150).notNullable();

        table.integer('quantity').notNullable();

        table.bigInteger('unit_price_kobo').notNullable();
    
        table.bigInteger('subtotal_kobo').notNullable();

        table.timestamps(true, true);

        table.check('quantity > 0');
        table.check('unit_price_kobo > 0');
        table.check('subtotal_kobo > 0');

        table.index('order_id');
        table.index('product_id');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('order_items');
};
