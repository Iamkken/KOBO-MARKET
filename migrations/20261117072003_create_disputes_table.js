/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('disputes', (table) => {

        table.uuid('id').primary();

        table.uuid('order_id')
            .notNullable()
            .references('id')
            .inTable('orders')
            .onDelete('RESTRICT');

        table.string('buyer_id', 24).notNullable();

        table.string('reason', 100).notNullable();

        table.text('description').notNullable();

        table.jsonb('evidence').nullable();

        table.string('status', 20).notNullable().defaultTo('open');

        table.string('resolved_by', 24).nullable();

        table.text('resolution_note').nullable();

        table.string('resolution', 30).nullable();

        table.timestamps(true, true);

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
  return knex.schema.dropTableIfExists('disputes');
};
