'use strict';

const protocol = require('../protocol');
const assert = require('assert');

const inputDefs = protocol.getDomains()
    .map(d => d.getInputs())
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
