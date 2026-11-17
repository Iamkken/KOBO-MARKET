/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('orders', (table) => {
        table.string('vendor_id', 24).nullable();
        table.index('vendor_id');
    }).then(() => {
        return knex.raw(`
            ALTER TABLE orders
            ADD CONSTRAINT orders_vendor_parent_check
            CHECK (
                (parent_order_id IS NULL AND vendor_id IS NULL)
                OR
                (parent_order_id IS NOT NULL AND vendor_id IS NOT NULL)
            )
        `);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw(`
        ALTER TABLE orders
        DROP CONSTRAINT IF EXISTS orders_vendor_parent_check
    `).then(() => {
        return knex.schema.alterTable('orders', (table) => {
            table.dropIndex('vendor_id');
            table.dropColumn('vendor_id');
        });
    });
};
