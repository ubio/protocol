'use strict';

const Ajv = require('ajv');
const protocol = require('../protocol');
const assert = require('assert');
const meta = require('../../src/schema-meta.json');

describe('Schema', () => {

    it('should validate against meta-schema', () => {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(meta);
        const valid = validate(protocol.schema);
        if (validate.errors) {
            // eslint-disable-next-line no-console
            console.log('Validation errors:', validate.errors);
        }
        assert.ok(valid);
    });

});
