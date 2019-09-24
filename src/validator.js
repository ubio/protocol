'use strict';

const Ajv = require('ajv');

const DEFAULT_OPTIONS = {
    allErrors: true,
    useDefaults: true,
    jsonPointers: true,
    format: 'full'
};

module.exports = {
    DEFAULT_OPTIONS,
    createValidator
};

function createValidator(schema, defs, options = DEFAULT_OPTIONS) {
    const ajv = new Ajv(options);
    const schemaId = schema.$id || 'untitled';
    ajv.addSchema(schema, schemaId);
    for (const def of defs) {
        const typeRef = def.getTypeRef();
        if (typeRef) {
            ajv.addSchema({ $ref: schemaId + typeRef }, def.id);
        }
    }
    return ajv;
}
