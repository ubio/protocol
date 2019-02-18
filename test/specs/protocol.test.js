'use strict';

const protocol = require('../protocol');
const assert = require('assert');

describe('Protocol', () => {

    it('should not contain unresolved references', () => {
        const unresolvedRefs = protocol.getUnresolvedRefs();
        assert.equal(unresolvedRefs.length, 0, `Unresolved references are not allowed: ${unresolvedRefs}`);
    });

    describe('getDomain', () => {

        it('should return existing domain', () => {
            const genericDomain = protocol.getDomain('Generic');
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
            const priceDef = protocol.getDef('Generic', 'Price');
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

            const errors = domains
                .map(d => d.getErrors())
                .reduce((a, b) => a.concat(b), []); // TODO replace with .flat in 2020
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

    describe('inputMethod', () => {

        it('should reference type definitions compatible with input method', () => {
            for (const domain of protocol.getDomains()) {
                for (const inputDef of domain.getInputs()) {
                    const { sourceOutputKey, inputMethod } = inputDef.spec;
                    if (sourceOutputKey) {
                        const outputDef = domain.getOutputDef(sourceOutputKey);
                        if (inputMethod === 'SelectOne' || inputMethod === 'SelectMany') {
                            const outputType = resolveType(outputDef.spec.typeRef);
                            assert.equal(outputType, 'array', `Output key ${ sourceOutputKey } of ${ domain.id } has inputMethod=SelectOne which expects output type to be array, but output type is ${ outputType }.`);
                        }

                        if (inputMethod === 'SelectMany') {
                            const inputType = resolveType(inputDef.spec.typeRef);
                            assert.equal(inputType, 'array', `Output key ${ sourceOutputKey } of ${ domain.id } has inputMethod=SelectOne which expects input type to be array, but input type is ${ inputType }.`);
                        }

                        if (inputMethod === 'SelectOne') {
                            const outputSchema = protocol.resolveTypeRef(outputDef.spec.typeRef).spec;
                            const outputType = resolveType(outputDef.spec.typeRef);
                            if (outputType === 'array') {
                                const outputItemType = resolveArrayItemType(outputSchema);
                                const inputType = resolveType(inputDef.spec.typeRef);
                                assert.equal(inputType, outputItemType, `Output key ${ sourceOutputKey } of ${ domain.id } has inputMethod=SelectOne which expects input type to be ${ outputItemType }, but input type is ${ inputType }.`);
                            }
                        }

                        if (inputMethod === 'Consent') {
                            const outputType = resolveType(outputDef.spec.typeRef);
                            const inputType = resolveType(inputDef.spec.typeRef);
                            assert.equal(inputType, outputType, `Output key ${ sourceOutputKey } of ${ domain.id } has inputMethod=Consent which expects input type to be ${ outputType }, but input type is ${ inputType }.`);
                        }
                    }
                }
            }

            function resolveType(ref) {
                const schema = protocol.resolveTypeRef(ref).spec;

                const type = schemaType(schema);
                if (type) {
                    return type;
                }

                if (schema.oneOf) {
                    return schema.oneOf.map(s => schemaType(s) || resolveType(s.$ref)).filter(x => x !== 'null')[0];
                }
            }

            function resolveArrayItemType(schema) {
                if (schema.$ref) {
                    schema = protocol.resolveTypeRef(schema.$ref).spec;
                }
                const type = schemaType(schema);
                if (type === 'array' && schema.items) {
                    return schemaType(schema.items) || resolveType(schema.items.$ref);
                }

                if (schema.oneOf) {
                    return schema.oneOf.filter(s => schemaType(s) !== 'null').map(s => resolveArrayItemType(s)).filter(x => x !== 'null')[0];
                }

                throw new Error('Schema is not array');

            }

            function schemaType(schema) {

                if (schema.$ref) {
                    return resolveType(schema.$ref);
                }

                if (schema.type && typeof schema.type === 'string') {
                    return schema.type;
                }

                if (schema.type && Array.isArray(schema.type)) {
                    return schema.type.filter(x => x !== 'null')[0];
                }

            }
        });

    });

    describe('dataExtractionDomainId', () => {

        it('references existing domain', () => {
            for (const domain of protocol.getDomains()) {
                const { dataExtractionDomainId } = domain.spec;
                if (!dataExtractionDomainId) {
                    continue;
                }
                const dataExtractionDomain = protocol.getDomain(dataExtractionDomainId);
                assert.ok(dataExtractionDomain,
                    `dataExtractionDomainId property of ${domain.id} domain should reference existing domain`);
            }
        });

        it('requires at least one extraction output to match target input', () => {
            for (const domain of protocol.getDomains()) {
                const { dataExtractionDomainId } = domain.spec;
                if (!dataExtractionDomainId) {
                    continue;
                }
                const dataExtractionDomain = protocol.getDomain(dataExtractionDomainId);
                const numberOfExtractionOutputs = dataExtractionDomain.getOutputs()
                    .filter(dataExtractionOutput => domain.getInputDef(dataExtractionOutput.key))
                    .length;

                assert.ok(numberOfExtractionOutputs > 0,
                    `Data extraction domain ${dataExtractionDomain.id} should have at least one output matching target input`);
            }
        });

        it('enforces parity of typeRefs for outputs matching inputs by key', () => {
            for (const domain of protocol.getDomains()) {
                const { dataExtractionDomainId } = domain.spec;
                if (!dataExtractionDomainId) {
                    continue;
                }
                const dataExtractionDomain = protocol.getDomain(dataExtractionDomainId);
                for (const extractionOutput of dataExtractionDomain.getOutputs()) {
                    const targetInput = domain.getInputDef(extractionOutput.key);
                    if (targetInput) {
                        assert.equal(targetInput.spec.typeRef, extractionOutput.spec.typeRef,
                            `Type of ${dataExtractionDomain.id}/outputs/${extractionOutput.key} does not match type of ${domain.id}/inputs/${targetInput.key}`);
                    }
                }
            }
        });

    });

    describe('successCode', () => {

        it('extracts successConfirmationCode value from given input object', () => {
            for (const domain of protocol.getDomains()) {
                const outputKey = domain.getSuccessCodeOutputKey();
                if (outputKey == null) {
                    continue;
                }
                const outputDef = domain.getOutputDef(outputKey);
                assert(outputDef, `Success output ${outputKey} does not exists in domain ${domain.id}`);

                const example = outputDef.createExample();
                const value = domain.getSuccessCodeValue(example);
                assert.ok(value != null,
                    `Output ${outputDef.id} contains a null successCode value: ${JSON.stringify(example)}`);
            }
        });

    });
});
