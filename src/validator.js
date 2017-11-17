'use strict';

const Ajv = require('ajv');
const schema = require('./schema');

const DEFAULT_OPTIONS = {
    allErrors: true,
    useDefaults: true,
    jsonPointers: true,
    format: 'full',
};

const DEFAULT = create();

module.exports = {
    DEFAULT,
    DEFAULT_OPTIONS,
    create,
};

function create(options = DEFAULT_OPTIONS) {
    const ajv = new Ajv(options);
    ajv.addSchema(schema);
    return ajv;
}
