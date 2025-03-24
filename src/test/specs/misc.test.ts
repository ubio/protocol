import assert from 'assert';

import { protocol } from '../protocol';

// tslint:disable

/**
 * Code below is intentionally left almost "as is", to avoid interfering with tests.
 * `any` annotations and `!`s were added to allow TypeScript to compile this.
 *
 * A brief summary of code issues follows.
 *
 * - There are 18 "if" statements in this file. By comparison, the entire test suite uses 24 "if" statements,
 *   so this is
 * - Type resolution hides more boolean logic in lines like
 *   `schema.oneOf.map(s => schemaType(s) || resolveType(s.$ref)).filter(x => x !== 'null')[0]`
 *   which indicates huge logical complexity.
 * - Helper functions implicitly return `undefined` if none of the branches match.
 *   This can't be translated to type-friendly code because either the function itself or all its
 *   call sites must be changed — which poses a risk of breaking the test itself
 *   (and who wants to debug 18 ifs, anyone?)
 * - The code leans to the right and breaks conventional 120 line length.
 * - The helper functions are implemented as nested functions. Nested functions (closures)
 *   are notorious for having access to the scope of their surroundings. This makes them dependent
 *   on lexical context they are defined in, which in turn makes them difficult to analyse
 *   (i.e. how many parameters does it really process?), extract from code, move to other place/module,
 *   re-use, etc. For that very reason use of named nested functions is discouraged, which
 *   a contributor can easily confirm just by looking around the codebase.
 *
 * It should be noted that test complexity is often an indicator of solution complexity itself
 * (i.e. we verify that it works according to rules we have in mind, and this test pretty much describes
 * these rules). Such design decisions should be re-assessed in an iterative way.
 */

describe('inputMethod', () => {
    it('should reference type definitions compatible with input method', () => {
        for (const domain of protocol.getDomains()) {
            for (const inputDef of domain.getInputs()) {
                const { sourceOutputKey, inputMethod } = inputDef.spec;
                if (sourceOutputKey) {
                    const outputDef = domain.getOutputDef(sourceOutputKey)!;
                    if (inputMethod === 'SelectOne' || inputMethod === 'SelectMany') {
                        const outputType = resolveType(outputDef.spec.typeRef);
                        assert.equal(outputType, 'array', `Output key ${sourceOutputKey} of ${domain.id} has inputMethod=SelectOne which expects output type to be array, but output type is ${outputType}.`);
                    }

                    if (inputMethod === 'SelectMany') {
                        const inputType = resolveType(inputDef.spec.typeRef);
                        assert.equal(inputType, 'array', `Output key ${sourceOutputKey} of ${domain.id} has inputMethod=SelectOne which expects input type to be array, but input type is ${inputType}.`);
                    }

                    if (inputMethod === 'SelectOne') {
                        const outputSchema = protocol.resolveTypeRef(outputDef.spec.typeRef)!.spec;
                        const outputType = resolveType(outputDef.spec.typeRef);
                        if (outputType === 'array') {
                            const outputItemType = resolveArrayItemType(outputSchema);
                            const inputType = resolveType(inputDef.spec.typeRef);
                            assert.equal(inputType, outputItemType, `Output key ${sourceOutputKey} of ${domain.id} has inputMethod=SelectOne which expects input type to be ${outputItemType}, but input type is ${inputType}.`);
                        }
                    }

                    if (inputMethod === 'Consent') {
                        const outputType = resolveType(outputDef.spec.typeRef);
                        const inputType = resolveType(inputDef.spec.typeRef);
                        assert.equal(inputType, outputType, `Output key ${sourceOutputKey} of ${domain.id} has inputMethod=Consent which expects input type to be ${outputType}, but input type is ${inputType}.`);
                    }
                }
            }
        }

        function resolveType(ref: any): any {
            const schema = protocol.resolveTypeRef(ref)!.spec;

            const type = schemaType(schema);
            if (type) {
                return type;
            }

            if (schema.oneOf) {
                return schema.oneOf.map((s: any) => schemaType(s) || resolveType(s.$ref)).filter((x: any) => x !== 'null')[0];
            }
        }

        function resolveArrayItemType(schema: any): any {
            if (schema.$ref) {
                schema = protocol.resolveTypeRef(schema.$ref)!.spec;
            }
            const type = schemaType(schema);
            if (type === 'array' && schema.items) {
                return schemaType(schema.items) || resolveType(schema.items.$ref);
            }

            if (schema.oneOf) {
                return schema.oneOf.filter((s: any) => schemaType(s) !== 'null').map((s: any) => resolveArrayItemType(s)).filter((x: any) => x !== 'null')[0];
            }

            throw new Error('Schema is not array');

        }

        function schemaType(schema: any): any {

            if (schema.$ref) {
                return resolveType(schema.$ref);
            }

            if (schema.type && typeof schema.type === 'string') {
                return schema.type;
            }

            if (schema.type && Array.isArray(schema.type)) {
                return schema.type.filter((x: any) => x !== 'null')[0];
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
            const dataExtractionDomain = protocol.getDomain(dataExtractionDomainId)!;
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
            const dataExtractionDomain = protocol.getDomain(dataExtractionDomainId)!;
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
