const Ajv = require('ajv');
const dataGeneration = require('../../src/data-generation.json');
const assert = require('assert');
const meta = require('../../src/data-generation-meta.json');
const protocol = require('../protocol.js');

describe('Data Generation', () => {

    it('validates agains data generation meta schema', () => {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(meta);
        const valid = validate(dataGeneration);
        if (validate.errors) {
            // eslint-disable-next-line no-console
            console.log('Validation errors:', validate.errors);
        }
        assert.ok(valid);
    });

    it('references existing type definitions', () => {
        dataGeneration.forEach(dataGen => {
            assert.ok(protocol.resolveTypeRef(dataGen.typeRef));
        });
    });


});
