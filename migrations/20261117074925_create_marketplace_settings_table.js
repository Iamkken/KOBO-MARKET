/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('marketplace_settings', (table) => {
        table.increments('id').primary();

        table.decimal('commission_rate', 5, 2)
            .notNullable()
            .defaultTo(5.00);

        table.integer('escrow_release_hours')
            .notNullable()
            .defaultTo(72);

        table.bigInteger('minimum_payout_kobo')
            .notNullable()
            .defaultTo(100000);

        table.timestamps(true, true);

        table.check(
            'commission_rate >= 0 AND commission_rate <= 100'
        );

        table.check('escrow_release_hours > 0');
        table.check('minimum_payout_kobo > 0');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTableIfExists('marketplace_settings');
};
