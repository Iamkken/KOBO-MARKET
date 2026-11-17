/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('accounts', (table) => {

        table.uuid('id').primary();

        table.string('owner_id', 24).nullable();

        table.string('account_type', 30).notNullable();

        table.string('currency', 3).notNullable().defaultTo('NGN');

        table.string('status', 20).notNullable().defaultTo('active');

        table.timestamps(true, true);

        table.check(
            "account_type IN ('USER_WALLET', 'PLATFORM_ESCROW', 'PLATFORM_REVENUE', 'PLATFORM_PAYOUT_CLEARING')",
            [],
            'accounts_account_type_check'
        );

        table.unique(
            ['owner_id', 'account_type'],
            { indexName: 'accounts_owner_type_unique' }
        );
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('accounts');
};
