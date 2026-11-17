/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.raw(`
        ALTER TABLE accounts
        DROP CONSTRAINT accounts_account_type_check
    `).then(() => {
        return knex.raw(`
            ALTER TABLE accounts
            ADD CONSTRAINT accounts_account_type_check
            CHECK (
                account_type IN (
                    'USER_WALLET',
                    'PLATFORM_ESCROW',
                    'PLATFORM_REVENUE',
                    'PLATFORM_PAYOUT_CLEARING',
                    'PLATFORM_EXTERNAL_SETTLEMENT'
                )
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
        ALTER TABLE accounts
        DROP CONSTRAINT accounts_account_type_check
    `).then(() => {
        return knex.raw(`
            ALTER TABLE accounts
            ADD CONSTRAINT accounts_account_type_check
            CHECK (
                account_type IN (
                    'USER_WALLET',
                    'PLATFORM_ESCROW',
                    'PLATFORM_REVENUE',
                    'PLATFORM_PAYOUT_CLEARING'
                )
            )
        `);
    });
};
