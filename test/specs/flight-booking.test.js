'use strict';

const protocol = require('../protocol');
const assert = require('assert');

describe('FlightBooking', () => {

    const FlightBooking = protocol.getDomain('FlightBooking');

    describe('Itinerary', () => {

        it('should accept valid flight', async () => {
            const { valid, errors } = await FlightBooking.validate('Search', {
                cabinClass: 'economy',
                outbound: {
                    origin: {
                        countryCode: 'us',
                        date: '2017-10-20',
                        airportCode: 'SFO',
                    },
                    destination: {
                        countryCode: 'us',
                        date: '2017-10-20',
                        airportCode: 'LGA',
                    },
                },
                inbound: {
                    origin: {
                        countryCode: 'us',
                        date: '2017-11-24',
                        airportCode: 'LGA',
                    },
                    destination: {
                        countryCode: 'us',
                        date: '2017-11-25',
                        airportCode: 'SFO',
                    },
                },
                passengerAges: [31, 32, 9],
            });
            assert.ok(valid);
            assert.equal(errors.length, 0);
        });

        it('should not accept invalid inbound flight', async () => {
            const { valid, errors } = await FlightBooking.validate('Search', {
                cabinClass: 'economy',
                outbound: {
                    origin: {
                        countryCode: 'us',
                        date: '2017-10-20',
                        airportCode: 'SFO',
                    },
                    destination: {
                        countryCode: 'us',
                        date: '2017-10-20',
                        airportCode: 'LGA',
                    },
                },
                inbound: 'smth',
                passengerAges: [31, 32, 9],
            });
            assert.equal(valid, false);
            assert.ok(errors.length > 0);
            assert.ok(errors.find(e => e.dataPath === '/inbound'));
        });

        it('should not require inbound flight', async () => {
            const { valid, errors } = await FlightBooking.validate('Search', {
                cabinClass: 'economy',
                outbound: {
                    origin: {
                        countryCode: 'us',
                        date: '2017-10-20',
                        airportCode: 'SFO',
                    },
                    destination: {
                        countryCode: 'us',
                        date: '2017-10-20',
                        airportCode: 'LGA',
                    },
                },
                passengerAges: [31, 32, 9],
            });
            assert.ok(valid);
            assert.equal(errors.length, 0);
        });

        it('should not allow incorrect destination/origin', async () => {
            const { valid, errors } = await FlightBooking.validate('Search', {
                cabinClass: 'economy',
                outbound: {
                    origin: {},
                    destination: {},
                },
                passengerAges: [31, 32, 9],
            });
            assert.equal(valid, false);
            assert.ok(errors.length > 0);
            assert.ok(errors.find(e => e.dataPath === '/outbound/destination'));
            assert.ok(errors.find(e => e.dataPath === '/outbound/origin'));
        });

    });

});
