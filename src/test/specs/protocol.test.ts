import assert from 'assert';
import { protocol } from '../protocol';

describe('Protocol', () => {

    it('should not contain unresolved references', () => {
        const unresolvedRefs = protocol.getUnresolvedRefs();
        assert.equal(unresolvedRefs.length, 0, `Unresolved references are not allowed: ${unresolvedRefs}`);
    });

    describe('getDomain', () => {

        it('should return existing domain', () => {
            const genericDomain = protocol.getDomain('Generic')!;
            assert.ok(genericDomain);
            assert.equal(genericDomain.id, 'Generic');
        });

        it('should return null for unknown domains', () => {
            const unknown = protocol.getDomain('Unknown');
            assert.equal(unknown, null);
        });

    });

    describe('getDef', () => {

        it('should return null if not found', () => {
            const unknown = protocol.getDef('Unknown', 'def');
            assert.equal(unknown, null);
        });

        it('should contain identifier fields', () => {
            const priceDef = protocol.getDef('Generic', 'Price')!;
            assert.ok(priceDef);
            assert.equal(priceDef.id, 'Generic.Price');
            assert.equal(priceDef.key, 'Price');
            assert.equal(priceDef.ns, 'types');
        });

    });

    describe('getAllErrors', () => {

        it('should return all errors', () => {
            const allErrors = protocol.getAllErrors();
            const domains = protocol.getDomains();
            const errors = domains.flatMap(d => d.getErrors());
            assert.equal(allErrors.length, errors.length);
        });

    });

    describe('sourceOutputKey', () => {

        it('should not contain unresolved output keys', () => {
            for (const domain of protocol.getDomains()) {
                for (const inputDef of domain.getInputs()) {
                    const { sourceOutputKey } = inputDef.spec;
                    if (sourceOutputKey) {
                        const output = domain.getOutputDef(sourceOutputKey);
                        assert.ok(output,
                            `Cannot resolve sourceOutputKey="${sourceOutputKey}" of input ${inputDef.id}`);
                    }
                }
            }
        });

    });

    describe('successCode', () => {

        it('extracts successConfirmationCode value from given input object', () => {
            for (const domain of protocol.getDomains()) {
                const outputKey = protocol.getSuccessCodeOutputKey(domain.id);
                if (outputKey == null) {
                    continue;
                }
                const outputDef = domain.getOutputDef(outputKey)!;
                assert(outputDef, `Success output ${outputKey} does not exists in domain ${domain.id}`);

                const example = outputDef.createExample();
                const value = protocol.getSuccessCodeValue(domain.id, outputKey, example);

                assert.ok(value != null,
                    `Output ${outputDef.id} contains a null successCode value: ${JSON.stringify(example)}`);
            }
        });

    });

});
