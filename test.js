'use strict';

/* eslint-disable no-console */

const protocol = require('./src');

validate('FlightBooking.finalPrice', {
    price: {
        currencyCode: 'gbp',
        value: 1200,
    },
});

validate('FlightBooking.availableSeats', [
    { seatId: '17A', price: { currencyCode: 'usd', value: 12345 } },
    { seatId: '17B', price: { currencyCode: 'usd', value: 12345 } },
    { seatId: '17C', price: { currencyCode: 'usd', value: 12345 } },
]);

validate('FlightBooking.selectedSeats', {
    seatIds: ['17B', '17C'],
});

function validate(schemaRef, object) {
    console.log('\nValidating', schemaRef);
    const ajv = protocol.createValidator();
    const valid = ajv.validate(schemaRef, object);
    console.log('valid', valid);
    console.log('errors', ajv.errors);
}

