import Ajv from 'ajv';
import assert from 'assert';

import dataGeneration from '../../misc/data-generation.json';
import meta from '../../misc/data-generation-meta.json';
import { protocol } from '../protocol';

describe('Data Generation', () => {

    it('validates agains data generation meta schema', () => {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(meta);
        const valid = validate(dataGeneration);
        if (validate.errors) {
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
