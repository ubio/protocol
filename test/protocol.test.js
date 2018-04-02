'use strict';

const { protocol } = require('../src');
const expect = require('expect');

describe('Protocol', () => {

    it('should not contain unresolved references', () => {
        const unresolvedRefs = protocol.getUnresolvedRefs();
        expect(unresolvedRefs.length).toEqual(0,
            `Unresolved references are not allowed: ${unresolvedRefs}`);
    });

    describe('getDomain', () => {

        it('should return existing domain', () => {
            const genericDomain = protocol.getDomain('Generic');
            expect(genericDomain).toBeTruthy();
            expect(genericDomain.id).toEqual('Generic');
        });

        it('should return null for unknown domains', () => {
            const unknown = protocol.getDomain('Unknown');
            expect(unknown).toNotExist();
        });

    });

    describe('getDef', () => {

        it('should return null if not found', () => {
            const unknown = protocol.getDef('Unknown', 'def');
            expect(unknown).toNotExist();
        });

        it('should contain identifier fields', () => {
            const priceDef = protocol.getDef('Generic', 'Price');
            expect(priceDef).toExist();
            expect(priceDef.id).toEqual('Generic.Price');
            expect(priceDef.key).toEqual('Price');
            expect(priceDef.ns).toEqual('types');
        });

    });

    describe('getAllErrors', () => {

        it('should return all errors', () => {
            const allErrors = protocol.getAllErrors();

            const domains = protocol.getDomains();

            let errors = [];
            domains.forEach(domain => {
                errors = errors.concat(domain.getErrors());
            });

            expect(allErrors.length).toBe(errors.length);

        });

    });
});
