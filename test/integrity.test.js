'use strict';

const { protocol } = require('../src');
const expect = require('expect');

describe('Integrity checks', () => {

    describe('refs', () => {

        it('should not contain unresolved references', () => {
            const unresolvedRefs = protocol.getUnresolvedRefs();
            expect(unresolvedRefs.length).toEqual(0,
                `Unresolved references are not allowed: ${unresolvedRefs}`);
        });

    });

    describe('flows', () => {

        it('selectOne.outputKey reference should exist', () => {
            for (const domain of protocol.getDomains()) {
                for (const inputDef of domain.inputs) {
                    if (inputDef.flow.type === 'selectOne') {
                        const outputDef = domain.getOutputDef(inputDef.flow.outputKey);
                        expect(outputDef).toExist(`output "${inputDef.flow.outputKey}" not found`);
                    }
                }
            }
        });

        it('multiStage.outputKey reference should exist', () => {
            for (const domain of protocol.getDomains()) {
                for (const inputDef of domain.inputs) {
                    if (inputDef.flow.type === 'multiStage') {
                        const outputDef = domain.getOutputDef(inputDef.flow.outputKey);
                        expect(outputDef).toExist(`output "${inputDef.flow.outputKey}" not found`);
                    }
                }
            }
        });

        it('consent.outputKey reference should exist', () => {
            for (const domain of protocol.getDomains()) {
                for (const inputDef of domain.inputs) {
                    if (inputDef.flow.type === 'consent') {
                        const outputDef = domain.getOutputDef(inputDef.flow.outputKey);
                        expect(outputDef).toExist(`output "${inputDef.flow.outputKey}" not found`);
                    }
                }
            }
        });

    });

});
