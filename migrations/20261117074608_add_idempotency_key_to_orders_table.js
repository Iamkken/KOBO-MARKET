/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('orders', (table) => {
        table.string('idempotency_key', 100).nullable().unique();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('orders', (table) => {
        table.dropUnique(['idempotency_key']);
        table.dropColumn('idempotency_key');
    });
};
