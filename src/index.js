'use strict';

const Ajv = require('ajv');
const schema = require('./schema');
const metaSchema = require('./meta.json');

const DEFAULT_AJV_OPTIONS = {
    allErrors: true,
    useDefaults: true,
    jsonPointers: true,
    format: 'full',
};
const NAMESPACES = ['inputs', 'outputs', 'types'];

const domainsById = new Map();
const defsById = new Map();
const defsByRef = new Map();

for (const domainId of Object.keys(schema.domains)) {
    const domain = schema.domains[domainId];
    domain.$id = domainId;
    domain.domainId = domainId;
    domainsById.set(domainId, domain);
    for (const ns of NAMESPACES) {
        const defs = domain[ns];
        for (const relativeId of Object.keys(defs)) {
            const def = defs[relativeId];
            const id = `${domainId}.${relativeId}`;
            const relativeRef = `${domainId}#/${ns}/${relativeId}`;
            def.defId = id;
            def.ns = ns;
            def.relativeId = relativeId;
            def.domainId = domainId;
            def.relativeRef = relativeRef;
            def.absoluteRef = `https://ub.io/protocol/${relativeRef}`;
            defsById.set(id, def);
            defsByRef.set(relativeRef, def);
        }
    }
}

const domains = Array.from(domainsById.values());
const defs = Array.from(defsById.values());

module.exports = {
    DEFAULT_AJV_OPTIONS,
    NAMESPACES,
    schema,
    metaSchema,
    domains,
    defs,
    getDomain,
    getDef,
    resolveRef,
    createValidator,
};

function getDomain(id) {
    return domainsById.get(id);
}

function getDef(domainOrDefId, key) {
    const id = typeof key === 'string' ?
        domainOrDefId + '.' + key :
        domainOrDefId;
    return defsById.get(id);
}

function resolveRef($ref) {
    return defsByRef.get($ref);
}

function createValidator(options = DEFAULT_AJV_OPTIONS) {
    const ajv = new Ajv(options);
    ajv.addSchema(schema);
    for (const def of defs) {
        ajv.addSchema({ $ref: def.absoluteRef }, def.defId);
    }
    return ajv;
}
