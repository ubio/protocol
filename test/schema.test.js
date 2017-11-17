'use strict';

const Ajv = require('ajv');
const protocol = require('../src');
const expect = require('expect');
const meta = require('../src/meta.json');

describe('Schema', () => {

    it('should validate against meta-schema', () => {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(meta);
        const valid = validate(protocol.schema);
        if (validate.errors) {
            // eslint-disable-next-line no-console
            console.log('Validation errors:', validate.errors);
        }
        expect(valid).toEqual(true);
    });

});
