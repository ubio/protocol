'use strict';

const protocol = require('../protocol');
const assert = require('assert');

describe('CoachBooking', () => {

    const CoachBooking = protocol.getDomain('CoachBooking');

    describe('Passengers', () => {

        it('should accept valid passengers', async () => {
            const { valid, errors } = await CoachBooking.validate('Passengers', [{
                title: 'mr',
                firstName: 'asd',
                middleName: '',
                lastName: 'asda',
                dateOfBirth: '1987-04-10',
                addAdditionalLuggage: 0,
                document: {
                    type: 'national-id',
                    number: 'abc123',
                    issueDate: '2016-01-02',
                    expirationDate: '2023-06-02',
                    issueCountryCode: 'es'
                }
            }, {
                title: 'mr',
                firstName: 'someone',
                middleName: '',
                lastName: 'else',
                dateOfBirth: '1988-03-03',
                addAdditionalLuggage: 0,
                document: {
                    type: 'passport',
                    number: '123456',
                    issueDate: '2016-03-03',
                    expirationDate: '2024-08-03',
                    issueCountryCode: 'es'
                }
            }]);
            assert.ok(valid);
            assert.equal(errors.length, 0);
        });

    });

});
