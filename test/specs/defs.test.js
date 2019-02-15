'use strict';

const protocol = require('../protocol');
const assert = require('assert');

const inputDefs = protocol.getDomains()
    .map(d => d.getInputs())
    .reduce((a, b) => a.concat(b), []); // TODO replace with .flat in 2020

const outputDefs = protocol.getDomains()
    .map(d => d.getOutputs())
    .reduce((a, b) => a.concat(b), []); // TODO replace with .flat in 2020

const typeDefs = protocol.getDomains()
    .map(d => d.getTypes())
    .reduce((a, b) => a.concat(b), []); // TODO replace with .flat in 2020


describe('InputDef', () => {

    describe('getCanonicalValues', () => {

        it('extracts canonical values from given input object', () => {
            for (const inputDef of inputDefs) {
                const example = inputDef.createExample();
                const pointers = inputDef.getCanonicalPointers();
                if (pointers == null) {
                    continue;
                }
                const values = inputDef.getCanonicalValues(example);
                assert.ok(Array.isArray(values));
                assert.ok(values.every(val => val != null),
                    `Input ${inputDef.id} contains a null canonical value: ${JSON.stringify(example)}`);
            }
        });

        it('returns null if no pointers specified', () => {
            for (const inputDef of inputDefs) {
                const example = inputDef.createExample();
                const pointers = inputDef.getCanonicalPointers();
                if (pointers == null) {
                    assert.equal(inputDef.getCanonicalValues(example), null);
                }
            }
        });

    });

});

describe('OutputDef', () => {

    describe('getSuccessConfirmationCodeValue', () => {

        it('extracts canonical values from given input object', () => {
            for (const outputDef of outputDefs) {
                const example = outputDef.createExample();
                const pointers = outputDef.getSuccessConfirmationCodePointer();
                if (pointers == null) {
                    continue;
                }
                const value = outputDef.getSuccessConfirmationCodeValue(example);
                assert.ok(value != null,
                    `Input ${outputDef.id} contains a null successConfirmationCode value: ${JSON.stringify(example)}`);
            }
        });

        it('returns null if no pointers specified', () => {
            for (const outputDef of outputDefs) {
                const example = outputDef.createExample();
                const pointer = outputDef.getSuccessConfirmationCodePointer();
                if (pointer == null) {
                    assert.equal(outputDef.getSuccessConfirmationCodeValue(example), null);
                }
            }
        });

    });

});

describe('TypeDef', () => {

    it('should not contain typeDef key', () => {
        // Reason: it's easy to confuse $ref from JSON schema with our custom
        // typeDef. Due to the way JSON Schema is designed, things like these
        // result in validation being silently bypassed, which is never a good thing.
        for (const typeDef of typeDefs) {
            const keys = new Set();
            JSON.stringify(typeDef.spec, (k, v) => {
                keys.add(k);
                return v;
            });
            assert.equal(keys.has('typeDef'), false,
                `Type def ${typeDef.id} contains forbidden typeDef key`);
            assert.equal(keys.has('$typeDef'), false,
                `Type def ${typeDef.id} contains forbidden $typeDef key`);
        }
    });

});
