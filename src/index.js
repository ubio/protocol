'use strict';

const Ajv = require('ajv');
const protocol = require('./protocol');

const namespaces = ['inputs', 'outputs', 'types'];
const domainsById = new Map();
const defsById = new Map();
const defsByRef = new Map();

for (const domainId of Object.keys(protocol)) {
    const domain = protocol[domainId];
    domain._id = domainId;
    domainsById.set(domainId, domain);
    for (const ns of namespaces) {
        const defs = domain[ns];
        for (const relativeId of Object.keys(defs)) {
            const def = defs[relativeId];
            def._id = `${domainId}.${relativeId}`;
            def._ns = ns;
            def._relativeId = relativeId;
            def._domainId = domainId;
            def._selfRef = `#/${domainId}/${ns}/${relativeId}`;
            defsById.set(def._id, def);
            defsByRef.set(def._selfRef, def);
        }
    }
}

const domains = Array.from(domainsById.values());
const defs = Array.from(defsById.values());

module.exports = {
    protocol,
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
    ajv.addSchema(protocol, 'ubio');
    for (const def of defs) {
        ajv.addSchema({ $ref: 'ubio' + def._selfRef }, def._id);
    }
    return ajv;
}
