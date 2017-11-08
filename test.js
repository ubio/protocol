'use strict';

/* eslint-disable no-console */

const protocol = require('./protocol');

const Ajv = require('ajv');

const ajv = new Ajv({
    allErrors: true,
});

ajv.addSchema(protocol, 'ubio');
ajv.addSchema({ '$ref': 'ubio#/Flight/events/finalPrice' }, 'Flight.finalPrice');

const finalPrice = {
    price: {
        currencyCode: 'gbp',
        value: null,
    },
};

const valid = ajv.validate('Flight.finalPrice', finalPrice);

console.log(valid);
console.log(ajv.errors);

