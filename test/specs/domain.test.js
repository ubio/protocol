'use strict';

const protocol = require('../protocol');
const expect = require('expect');
const Internal = protocol.getDomain('Internal');

describe('Domain', () => {

    describe('getDef', () => {

        it('should resolve input definition', () => {
            const def = Internal.getDef('url');
            expect(def).toExist();
        });

        it('should resolve output definition', () => {
            const def = Internal.getDef('object');
            expect(def).toExist();
        });

        it('should resolve type definition', () => {
            const def = Internal.getDef('Value');
            expect(def).toExist();
        });

    });

    describe('getInputDef', () => {

        it('should resolve input definition', () => {
            const def = Internal.getInputDef('url');
            expect(def).toExist();
        });

        it('should return null for unknown input definitions', () => {
            expect(Internal.getInputDef('object')).toNotExist();
            expect(Internal.getInputDef('Value')).toNotExist();
            expect(Internal.getInputDef('nonsense')).toNotExist();
        });

    });

    describe('getOutputDef', () => {

        it('should resolve output definition', () => {
            const def = Internal.getOutputDef('object');
            expect(def).toExist();
        });

        it('should return null for unknown input definitions', () => {
            expect(Internal.getOutputDef('url')).toNotExist();
            expect(Internal.getOutputDef('Value')).toNotExist();
            expect(Internal.getOutputDef('nonsense')).toNotExist();
        });

    });

    describe('getErrors', () => {

        it('should resolve error lists', () => {
            const errors = Internal.getErrors();
            expect(errors).toExist();
        });

    });

    describe('getError', () => {

        it('should resolve error', () => {
            const error = Internal.getError('InternalError');
            expect(error).toExist();
        });

        it('should return null for unknown error definitions', () => {
            expect(Internal.getError('none')).toNotExist();
            expect(Internal.getError('unknownError')).toNotExist();
        });

    });

    describe('validateInput', () => {

        it('should allow valid data', async () => {
            const { valid } = await Internal.validateInput('url', 'https://github.com');
            expect(valid).toBe(true);
        });

        it('should report errors for invalid data', async () => {
            const { valid, errors } = await Internal.validateInput('url', {});
            expect(valid).toBe(false);
            expect(errors).toBeAn(Array);
        });

        it('should report error for unknown input', async () => {
            const { valid, errors } = await Internal.validateInput('Value', {});
            expect(valid).toBe(false);
            expect(errors.length).toEqual(1);
        });

    });

    describe('validateOutput', () => {

        it('should allow valid data', async () => {
            const { valid } = await Internal.validateOutput('finalPrice', {
                price: { value: 0, currencyCode: 'usd' },
            });
            expect(valid).toBe(true);
        });

        it('should report errors for invalid data', async () => {
            const { valid, errors } = await Internal.validateOutput('finalPrice', { value: 0 });
            expect(valid).toBe(false);
            expect(errors).toBeAn(Array);
        });

        it('should report error for unknown input', async () => {
            const { valid, errors } = await Internal.validateOutput('url', 'https://github.com');
            expect(valid).toBe(false);
            expect(errors.length).toEqual(1);
        });

    });

});
