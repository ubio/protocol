import Ajv from 'ajv';
import assert from 'assert';
import { protocol } from '../protocol';
import meta from '../../schema/meta.json';

describe('Schema', () => {

    it('should validate against meta-schema', () => {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(meta);
        const valid = validate(protocol.schema);
        if (validate.errors) {
            // tslint:disable-next-line no-console
            console.log('Validation errors:', validate.errors);
        }
        assert.ok(valid);
    });

});
