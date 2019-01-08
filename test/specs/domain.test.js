'use strict';

const protocol = require('../protocol');
const assert = require('assert');
const Internal = protocol.getDomain('Internal');

describe('Domain', () => {

    describe('getDef', () => {

        it('should resolve input definition', () => {
            const def = Internal.getDef('url');
            assert.ok(def);
        });

        it('should resolve output definition', () => {
            const def = Internal.getDef('object');
            assert.ok(def);
        });

        it('should resolve type definition', () => {
            const def = Internal.getDef('Value');
            assert.ok(def);
        });

    });

    describe('getInputDef', () => {

        it('should resolve input definition', () => {
            const def = Internal.getInputDef('url');
            assert.ok(def);
        });

        it('should return null for unknown input definitions', () => {
            assert.equal(Internal.getInputDef('object'), null);
            assert.equal(Internal.getInputDef('Value'), null);
            assert.equal(Internal.getInputDef('nonsense'), null);
        });

    });

    describe('getOutputDef', () => {

        it('should resolve output definition', () => {
            const def = Internal.getOutputDef('object');
            assert.ok(def);
        });

        it('should return null for unknown input definitions', () => {
            assert.equal(Internal.getOutputDef('url'), null);
            assert.equal(Internal.getOutputDef('Value'), null);
            assert.equal(Internal.getOutputDef('nonsense'), null);
        });

    });

    describe('getErrors', () => {

        it('should resolve error lists', () => {
            const errors = Internal.getErrors();
            assert.ok(errors);
        });

    });

    describe('getError', () => {

        it('should resolve error', () => {
            const error = Internal.getError('InternalError');
            assert.ok(error);
        });

        it('should return null for unknown error definitions', () => {
            assert.equal(Internal.getError('none'), null);
            assert.equal(Internal.getError('unknownError'), null);
        });

    });

    describe('validateInput', () => {

        it('should allow valid data', async () => {
            const { valid } = await Internal.validateInput('url', 'https://github.com');
            assert.ok(valid);
        });

        it('should report errors for invalid data', async () => {
            const { valid, errors } = await Internal.validateInput('url', {});
            assert.equal(valid, false);
            assert.ok(Array.isArray(errors));
        });

        it('should report error for unknown input', async () => {
            const { valid, errors } = await Internal.validateInput('Value', {});
            assert.equal(valid, false);
            assert.ok(Array.isArray(errors));
            assert.equal(errors.length, 1);
        });

    });

    describe('validateOutput', () => {

        it('should allow valid data', async () => {
            const { valid } = await Internal.validateOutput('finalPrice', {
                price: { value: 0, currencyCode: 'usd' },
            });
            assert.ok(valid);
        });

        it('should report errors for invalid data', async () => {
            const { valid, errors } = await Internal.validateOutput('finalPrice', { value: 0 });
            assert.equal(valid, false);
            assert.ok(Array.isArray(errors));
        });

        it('should report error for unknown input', async () => {
            const { valid, errors } = await Internal.validateOutput('url', 'https://github.com');
            assert.equal(valid, false);
            assert.ok(Array.isArray(errors));
            assert.equal(errors.length, 1);
        });

    });

});
