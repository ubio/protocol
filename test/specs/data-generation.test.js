const Ajv = require('ajv');
const schema = require('../../src/data-generation.json');
const expect = require('expect');
const meta = require('../../src/data-generation-meta.json');

describe('Data Generation', () => {
    it('validates agains data generation meta schema', () => {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(meta);
        const valid = validate(schema);
        if (validate.errors) {
            // eslint-disable-next-line no-console
            console.log('Validation errors:', validate.errors);
        }
        expect(valid).toEqual(true);
    });

});
