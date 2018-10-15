'use strict';

const protocol = require('../protocol');
const expect = require('expect');

describe('Protocol', () => {

    it('should not contain unresolved references', () => {
        const unresolvedRefs = protocol.getUnresolvedRefs();
        expect(unresolvedRefs.length).toEqual(0,
            `Unresolved references are not allowed: ${unresolvedRefs}`);
    });

    describe('getDomain', () => {

        it('should return existing domain', () => {
            const genericDomain = protocol.getDomain('Generic');
            expect(genericDomain).toBeTruthy();
            expect(genericDomain.id).toEqual('Generic');
        });

        it('should return null for unknown domains', () => {
            const unknown = protocol.getDomain('Unknown');
            expect(unknown).toNotExist();
        });

    });

    describe('getDef', () => {

        it('should return null if not found', () => {
            const unknown = protocol.getDef('Unknown', 'def');
            expect(unknown).toNotExist();
        });

        it('should contain identifier fields', () => {
            const priceDef = protocol.getDef('Generic', 'Price');
            expect(priceDef).toExist();
            expect(priceDef.id).toEqual('Generic.Price');
            expect(priceDef.key).toEqual('Price');
            expect(priceDef.ns).toEqual('types');
        });

    });

    describe('getAllErrors', () => {

        it('should return all errors', () => {
            const allErrors = protocol.getAllErrors();

            const domains = protocol.getDomains();

            let errors = [];
            domains.forEach(domain => {
                errors = errors.concat(domain.getErrors());
            });

            expect(allErrors.length).toBe(errors.length);

        });

    });

    describe('sourceOutputKey', () => {

        it('should not contain unresolved output keys', () => {
            for (const domain of protocol.getDomains()) {
                for (const inputDef of domain.getInputs()) {
                    const { sourceOutputKey } = inputDef.spec;
                    if (sourceOutputKey) {
                        const output = domain.getOutputDef(sourceOutputKey);
                        expect(output).toExist(`Cannot resource sourceOutputKey="${sourceOutputKey}" of input ${inputDef.id}`);
                    }
                }
            }
        });

    });

    describe('dataExtractionDomainId', () => {

        it('references existing domain', () => {
            protocol.getDomains()
                .filter(targetDomain => targetDomain.spec.dataExtractionDomainId)
                .forEach(targetDomain => {
                    const dataExtractionDomain = protocol.getDomain(targetDomain.spec.dataExtractionDomainId);
                    expect(dataExtractionDomain).toExist(
                        `dataExtractionDomainId property of ${targetDomain.id} domain should reference existing domain`
                    );
                });
        });

        it('requires at least one extraction output to match target input', () => {
            protocol.getDomains()
                .filter(targetDomain => targetDomain.spec.dataExtractionDomainId)
                .forEach(targetDomain => {
                    const dataExtractionDomain = protocol.getDomain(targetDomain.spec.dataExtractionDomainId);
                    const numberOfExtractionOutputs = dataExtractionDomain.getOutputs()
                        .filter(dataExtractionOutput => targetDomain.getInputDef(dataExtractionOutput.key))
                        .length;

                    expect(numberOfExtractionOutputs).toBeMoreThan(0,
                        `Data extraction domain ${dataExtractionDomain.id} should have at least one output matching target input by name`);
                });
        });

        it('enforces parity of typeRefs for outputs matching inputs by key', () => {
            protocol.getDomains()
                .filter(targetDomain => targetDomain.spec.dataExtractionDomainId)
                .forEach(targetDomain => {
                    const dataExtractionDomain = protocol.getDomain(targetDomain.spec.dataExtractionDomainId);
                    dataExtractionDomain.getOutputs()
                        .forEach(dataExtractionOutput => {
                            const targetInput = targetDomain.getInputDef(dataExtractionOutput.key);
                            if (targetInput) {
                                expect(targetInput.spec.typeRef)
                                    .toEqual(dataExtractionOutput.spec.typeRef,
                                        `Type of ${dataExtractionDomain.id}/outputs/${dataExtractionOutput.key} do not match type of ${targetDomain.id}/inputs/${targetInput.key}`);
                            }
                        });
                });
        });


    });

});
