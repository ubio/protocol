'use strict';

const Ajv = require('ajv');
const schema = require('./schema');
const metaSchema = require('./meta.json');
const Domain = require('./domain');
const Def = require('./def');

const DEFAULT_AJV_OPTIONS = {
    allErrors: true,
    useDefaults: true,
    jsonPointers: true,
    format: 'full',
};
const NAMESPACES = ['inputs', 'outputs', 'types'];

const domainsById = new Map();
const defsById = new Map();

for (const domainId of Object.keys(schema.domains)) {
    const domain = new Domain(domainId, schema.domains[domainId]);
    domainsById.set(domainId, domain);
    for (const ns of NAMESPACES) {
        const defs = domain[ns];
        for (const key of Object.keys(defs)) {
            const def = new Def(domain, ns, key, defs[key]);
            defsById.set(def.id, def);
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
    getDefByDomainKey,
    createValidator,
};

function getDomain(id) {
    return domainsById.get(id);
}

function getDef(id) {
    return defsById.get(id);
}

function getDefByDomainKey(domainId, key) {
    return getDef(domainId + '.' + key);
}

function createValidator(options = DEFAULT_AJV_OPTIONS) {
    const ajv = new Ajv(options);
    ajv.addSchema(schema);
    for (const def of defs) {
        ajv.addSchema({ $ref: schema.$id + def.$id }, def.id);
    }
    return ajv;
}
