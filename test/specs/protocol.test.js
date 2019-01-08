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

});
