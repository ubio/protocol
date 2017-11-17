'use strict';

const protocol = require('../src');
const expect = require('expect');

describe('Protocol', () => {

    describe('getDomain', () => {

        it('should contain $id', () => {
            const genericDomain = protocol.getDomain('Generic');
            expect(genericDomain).toBeTruthy();
            expect(genericDomain.$id).toEqual('#Generic');
        });

    });

    describe('getDef', () => {

        it('should return null if not found', () => {
            const unknown = protocol.getDef('Unknown.def');
            expect(unknown).toNotExist();
        });

        it('should contain identifier fields', () => {
            const priceDef = protocol.getDef('Generic.Price');
            expect(priceDef).toBeTruthy();
            expect(priceDef.$id).toEqual('#Generic.Price');
            expect(priceDef._id).toEqual('Generic.Price');
            expect(priceDef._key).toEqual('Price');
            expect(priceDef._ns).toEqual('types');
        });

    });

    describe('validate', () => {

        it('returns error if domain not found', async () => {
            const { valid, errors } = await protocol.validate('Unknown.smth', {});
            expect(valid).toEqual(false);
            expect(errors).toExist();
            expect(errors.length).toEqual(1);
        });

        it('returns error if def not found', async () => {
            const { valid, errors } = await protocol.validate('Generic.smth', {});
            expect(valid).toEqual(false);
            expect(errors).toExist();
            expect(errors.length).toEqual(1);
        });

        it('returns validation errors if object is invalid', async () => {
            const { valid, errors } = await protocol.validate('Generic.Price', {
                value: '1200',
                currencyCode: 'gbp',
            });
            expect(valid).toEqual(false);
            expect(errors).toExist();
            expect(errors.length).toEqual(1);
            expect(errors[0].keyword).toEqual('type');
            expect(errors[0].dataPath).toEqual('/value');
        });

        it('returns no errors for valid objects', async () => {
            const { valid, errors } = await protocol.validate('Generic.Price', {
                value: 1200,
                currencyCode: 'gbp',
            });
            expect(valid).toEqual(true);
            expect(errors).toNotExist();
        });

    });

});
