'use strict';

const { protocol } = require('../src');
const expect = require('expect');

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
            expect(valid).toEqual(true);
            expect(errors.length).toEqual(0);
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
            expect(valid).toEqual(false);
            expect(errors.length).toBeGreaterThan(0);
            expect(errors.find(e => e.dataPath === '/inbound')).toExist();
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
            expect(valid).toEqual(true);
            expect(errors.length).toEqual(0);
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
            expect(valid).toEqual(false);
            expect(errors.length).toBeGreaterThan(0);
            expect(errors.find(e => e.dataPath === '/outbound/destination')).toExist();
            expect(errors.find(e => e.dataPath === '/outbound/origin')).toExist();
        });

    });

});
