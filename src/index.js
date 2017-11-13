'use strict';

const Ajv = require('ajv');
const schema = require('./schema');
const metaSchema = require('./meta.json');

const namespaces = ['inputs', 'outputs', 'types'];
const domainsById = new Map();
const defsById = new Map();
const defsByRef = new Map();

for (const domainId of Object.keys(schema.domains)) {
    const domain = schema.domains[domainId];
    domain.$id = domainId;
    domainsById.set(domainId, domain);
    for (const ns of namespaces) {
        const defs = domain[ns];
        for (const relativeId of Object.keys(defs)) {
            const def = defs[relativeId];
            const id = `${domainId}.${relativeId}`;
            const relativeRef = `${domainId}#/${ns}/${relativeId}`;
            def._id = id;
            def._ns = ns;
            def._relativeId = relativeId;
            def._domainId = domainId;
            def._relativeRef = relativeRef;
            def._absoluteRef = `https://ub.io/protocol/${relativeRef}`;
            defsById.set(id, def);
            defsByRef.set(relativeRef, def);
        }
    }
}

const domains = Array.from(domainsById.values());
const defs = Array.from(defsById.values());

module.exports = {
    schema,
    metaSchema,
    namespaces,
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

function getDef(id) {
    return defsById.get(id);
}

function resolveRef($ref) {
    return defsByRef.get($ref);
}

function createValidator(options) {
    const ajv = new Ajv(options);
    ajv.addSchema(schema);
    for (const def of defs) {
        ajv.addSchema({ $ref: def._absoluteRef }, def._id);
    }
    return ajv;
}
