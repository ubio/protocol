'use strict';

const protocol = require('../protocol');
const assert = require('assert');

describe('Generic', () => {

    const Generic = protocol.getDomain('Generic');

    describe('Address', () => {

        it('should accept valid inlined address', async () => {
            const { valid, errors } = await Generic.validate('Address', {
                line1: '27-31 Clerkenwell Close',
                line2: 'Unit G.03',
                city: 'London',
                postcode: 'EC1R 0AT',
                countryCode: 'gb',
                countrySubdivision: 'London',
            });
            assert.ok(valid);
            assert.equal(errors.length, 0);
        });

        it('should accept valid explicit address', async () => {
            const { valid, errors } = await Generic.validate('Address', {
                streetName: 'Unit G.03',
                line2: 'Unit G.03',
                city: 'London',
                postcode: 'EC1R 0AT',
                countryCode: 'gb',
                countrySubdivision: 'London',
            });
            assert.ok(valid);
            assert.equal(errors.length, 0);
        });

        it('should not accept common address components only', async () => {
            const { valid, errors } = await Generic.validate('Address', {
                line2: 'Unit G.03',
                city: 'London',
                postcode: 'EC1R 0AT',
                countryCode: 'gb',
                countrySubdivision: 'London',
            });
            assert.equal(valid, false);
            assert.notEqual(errors.length, 0);
        });
    });
});
