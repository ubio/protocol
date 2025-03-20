import Ajv from 'ajv';
import assert from 'assert';

import meta from '../../schema/meta.json';
import { protocol } from '../protocol';

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
