'use strict';

const Ajv = require('ajv');
const protocol = require('../src');
const expect = require('expect');

describe('Protocol', () => {

    it('should validate against meta-schema', () => {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(protocol.metaSchema);
        const valid = validate(protocol.schema);
        if (validate.errors) {
            // eslint-disable-next-line no-console
            console.log('Validation errors:', validate.errors);
        }
        expect(valid).toEqual(true);
    });

    describe('domains', () => {

        it('returns list of domains', () => {
            expect(Array.isArray(protocol.domains)).toEqual(true);
            expect(protocol.domains.length).toEqual(2);
        });

    });

    describe('domain', () => {

        it('should contain $id', () => {
            const genericDomain = protocol.getDomain('Generic');
            expect(genericDomain).toBeTruthy();
            expect(genericDomain.$id).toEqual('Generic');
        });

    });

    describe('defs', () => {

        it('should return list of all definitions', () => {
            expect(Array.isArray(protocol.defs)).toEqual(true);
        });

    });

    describe('getDef', () => {

        it('should contain identifier fields', () => {
            const priceDef = protocol.getDef('Generic.Price');
            expect(priceDef).toBeTruthy();
            expect(priceDef.defId).toEqual('Generic.Price');
            expect(priceDef.domainId).toEqual('Generic');
            expect(priceDef.relativeId).toEqual('Price');
            expect(priceDef.ns).toEqual('types');
            expect(priceDef.relativeRef).toEqual('Generic#/types/Price');
            expect(priceDef.absoluteRef).toEqual('https://ub.io/protocol/Generic#/types/Price');
        });

    });

});
