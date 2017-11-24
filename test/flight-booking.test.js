'use strict';

const protocol = require('../src');
const expect = require('expect');

describe('FlightBooking', () => {

    const FlightBooking = protocol.getDomain('FlightBooking');

    describe('Flight', () => {

        it('should accept valid flight', async () => {
            const { valid, errors } = await FlightBooking.validate('Flight', {
                cabinClass: 'Economy',
                price: {
                    currencyCode: 'usd',
                    value: 40840,
                },
                from: {
                    countryCode: 'us',
                    dateTime: '2017-10-20 00:55',
                    airportCode: 'SFO',
                },
                to: {
                    countryCode: 'us',
                    dateTime: '2017-10-20 17:14',
                    airportCode: 'LGA',
                },
                return: {
                    from: {
                        countryCode: 'us',
                        dateTime: '2017-11-24 17:59',
                        airportCode: 'LGA',
                    },
                    to: {
                        countryCode: 'us',
                        dateTime: '2017-11-25 10:59',
                        airportCode: 'SFO',
                    },
                },
            });
            expect(valid).toEqual(true);
            expect(errors.length).toEqual(0);
        });

        it('should not accept invalid return flight', async () => {
            const { valid, errors } = await FlightBooking.validate('Flight', {
                cabinClass: 'Economy',
                price: {
                    currencyCode: 'usd',
                    value: 40840,
                },
                from: {
                    countryCode: 'us',
                    dateTime: '2017-10-20 00:55',
                    airportCode: 'SFO',
                },
                to: {
                    countryCode: 'us',
                    dateTime: '2017-10-20 17:14',
                    airportCode: 'LGA',
                },
                return: 'smth',
            });
            expect(valid).toEqual(false);
            expect(errors.length).toBeGreaterThan(0);
            expect(errors.find(e => e.dataPath === '/return')).toExist();
        });

        it('should not require return flight', async () => {
            const { valid, errors } = await FlightBooking.validate('Flight', {
                cabinClass: 'Economy',
                price: {
                    currencyCode: 'usd',
                    value: 40840,
                },
                from: {
                    countryCode: 'us',
                    dateTime: '2017-10-20 00:55',
                    airportCode: 'SFO',
                },
                to: {
                    countryCode: 'us',
                    dateTime: '2017-10-20 17:14',
                    airportCode: 'LGA',
                },
            });
            expect(valid).toEqual(true);
            expect(errors.length).toEqual(0);
        });

        it('should not allow incorrect to/from', async () => {
            const { valid, errors } = await FlightBooking.validate('Flight', {
                cabinClass: 'Economy',
                price: {
                    currencyCode: 'usd',
                    value: 40840,
                },
                from: {},
                to: {},
            });
            expect(valid).toEqual(false);
            expect(errors.length).toBeGreaterThan(0);
            expect(errors.find(e => e.dataPath === '/to')).toExist();
            expect(errors.find(e => e.dataPath === '/from')).toExist();
        });

    });

});
