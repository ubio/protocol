'use strict';

/* eslint-disable no-console */

const protocol = require('./src/protocol');

const Ajv = require('ajv');

const ajv = new Ajv({
    allErrors: true,
});

ajv.addSchema(protocol, 'ubio');
ajv.addSchema({ '$ref': 'ubio#/Core/events/finalPrice' }, 'Core.finalPrice');
ajv.addSchema({ '$ref': 'ubio#/Flight/events/requestSeatSelection' }, 'Flight.requestSeatSelection');
ajv.addSchema({ '$ref': 'ubio#/Flight/inputs/selectedSeats' }, 'Flight.selectedSeats');

validate('Core.finalPrice', {
    price: {
        currencyCode: 'gbp',
        value: 120000,
    },
});

validate('Flight.requestSeatSelection', {
    availableSeats: [
        { seatId: '17A', price: { currencyCode: 'usd', value: 12345 } },
        { seatId: '17B', price: { currencyCode: 'usd', value: 12345 } },
        { seatId: '17C', price: { currencyCode: 'usd', value: 12345 } },
    ],
});

validate('Flight.selectedSeats', {
    seatIds: ['17B', '17C'],
});

function validate(schemaRef, object) {
    console.log('\nValidating', schemaRef);
    const valid = ajv.validate(schemaRef, object);
    console.log('valid', valid);
    console.log('errors', ajv.errors);
}

