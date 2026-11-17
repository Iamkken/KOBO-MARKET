
const { randomUUID } = require('crypto');

exports.seed = async function (knex) {

    const accountTypes = [
        'PLATFORM_ESCROW',
        'PLATFORM_REVENUE',
        'PLATFORM_PAYOUT_CLEARING',
        'PLATFORM_EXTERNAL_SETTLEMENT'
    ];

    // Create platform accounts if they don't already exist.
    for (const accountType of accountTypes) {
        const existingAccount = await knex('accounts')
            .where({ account_type: accountType })
            .first();

        if (!existingAccount) {
            await knex('accounts').insert({
                id: randomUUID(),
                account_type: accountType,
                owner_id: null,
                currency: 'NGN',
                status: 'active'
            });
        }
    }

    // Create default marketplace settings.
    const settings = await knex('marketplace_settings').first();

    if (!settings) {
        await knex('marketplace_settings').insert({
            commission_rate: 5.00,
            escrow_release_hours: 72,
            minimum_payout_kobo: 100000
        });
    }
};
