'use strict';

/* eslint-disable no-console */
const protocol = require('./src');

main()
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

async function main() {
    await validate('FlightBooking.finalPrice', {
        price: {
            currencyCode: 'gbp',
            value: 1200,
        },
    });

    await validate('FlightBooking.availableSeats', [
        { seatId: '17A', price: { currencyCode: 'usd', value: 12345 } },
        { seatId: '17B', price: { currencyCode: 'usd', value: 12345 } },
        { seatId: '17C', price: { currencyCode: 'usd', value: 12345 } },
    ]);

    await validate('FlightBooking.selectedSeats', {
        seatIds: ['17B', '17C'],
    });
}

async function validate(defId, object) {
    console.log('\nValidating', defId);
    const { valid, errors } = await protocol.validate(defId, object);
    console.log('valid', valid);
    console.log('errors', errors);
}
