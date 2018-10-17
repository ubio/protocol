const Ajv = require('ajv');
const dataGeneration = require('../../src/data-generation.json');
const expect = require('expect');
const meta = require('../../src/data-generation-meta.json');
const protocol = require('../protocol.js');

describe.only('Data Generation', () => {

    it('validates agains data generation meta schema', () => {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(meta);
        const valid = validate(dataGeneration);
        if (validate.errors) {
            // eslint-disable-next-line no-console
            console.log('Validation errors:', validate.errors);
        }
        expect(valid).toEqual(true);
    });

    it('references existing type definitions', () => {
        dataGeneration.forEach(({ typeRef }) =>
            expect(protocol.resolveTypeRef(typeRef)).toExist()
        );
    });


});
