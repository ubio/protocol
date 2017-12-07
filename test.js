'use strict';

/* eslint-disable no-console */
const protocol = require('./src');

main()
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

async function main() {

    await validate('Generic', 'Price', {
        currencyCode: 'gbp',
        value: 1200,
    });

    await validate('FlightBooking', 'finalPrice', {
        price: {
            currencyCode: 'gbp',
            value: 1200,
        },
    });

}

async function validate(domain, key, object) {
    console.log('\nValidating', domain, key);
    const { valid, errors } = await protocol.validate(domain, key, object);
    console.log('valid', valid);
    console.log('errors', errors);
}

