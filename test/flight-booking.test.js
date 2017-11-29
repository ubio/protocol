'use strict';

const protocol = require('../src');
const expect = require('expect');

describe('FlightBooking', () => {

    const FlightBooking = protocol.getDomain('FlightBooking');

    describe('Itinerary', () => {

        it('should accept valid flight', async () => {
            const { valid, errors } = await FlightBooking.validate('Itinerary', {
                cabinClass: 'economy',
                outbound: {
                    origin: {
                        countryCode: 'us',
                        dateTime: '2017-10-20 00:55',
                        airportCode: 'SFO',
                    },
                    destination: {
                        countryCode: 'us',
                        dateTime: '2017-10-20 17:14',
                        airportCode: 'LGA',
                    },
                },
                inbound: {
                    origin: {
                        countryCode: 'us',
                        dateTime: '2017-11-24 17:59',
                        airportCode: 'LGA',
                    },
                    destination: {
                        countryCode: 'us',
                        dateTime: '2017-11-25 10:59',
                        airportCode: 'SFO',
                    },
                },
            });
            expect(valid).toEqual(true);
            expect(errors.length).toEqual(0);
        });

        it('should not accept invalid inbound flight', async () => {
            const { valid, errors } = await FlightBooking.validate('Itinerary', {
                cabinClass: 'economy',
                outbound: {
                    origin: {
                        countryCode: 'us',
                        dateTime: '2017-10-20 00:55',
                        airportCode: 'SFO',
                    },
                    destination: {
                        countryCode: 'us',
                        dateTime: '2017-10-20 17:14',
                        airportCode: 'LGA',
                    },
                },
                inbound: 'smth',
            });
            expect(valid).toEqual(false);
            expect(errors.length).toBeGreaterThan(0);
            expect(errors.find(e => e.dataPath === '/inbound')).toExist();
        });

        it('should not require inbound flight', async () => {
            const { valid, errors } = await FlightBooking.validate('Itinerary', {
                cabinClass: 'economy',
                outbound: {
                    origin: {
                        countryCode: 'us',
                        dateTime: '2017-10-20 00:55',
                        airportCode: 'SFO',
                    },
                    destination: {
                        countryCode: 'us',
                        dateTime: '2017-10-20 17:14',
                        airportCode: 'LGA',
                    },
                },
            });
            expect(valid).toEqual(true);
            expect(errors.length).toEqual(0);
        });

        it('should not allow incorrect destination/origin', async () => {
            const { valid, errors } = await FlightBooking.validate('Itinerary', {
                cabinClass: 'economy',
                outbound: {
                    origin: {},
                    destination: {},
                },
            });
            expect(valid).toEqual(false);
            expect(errors.length).toBeGreaterThan(0);
            expect(errors.find(e => e.dataPath === '/outbound/destination')).toExist();
            expect(errors.find(e => e.dataPath === '/outbound/origin')).toExist();
        });

    });

});
