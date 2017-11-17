'use strict';

const schema = require('./schema');
const Domain = require('./domain');

const domainsCache = new Map();

module.exports = {
    schema,
    getAllDomains,
    getDomain,
    getDef,
    validate,
};

function getAllDomains() {
    return Object.keys(schema.domains).map(id => getDomain(id));
}

function getDomain(id) {
    let cached = domainsCache.get(id);
    if (typeof cached === 'undefined') {
        const spec = schema.domains[id];
        cached = spec ? new Domain(id, spec) : null;
        domainsCache.set(id, cached);
    }
    return cached;
}

function getDef(domainId, key) {
    if (typeof key === 'undefined') {
        const [a,b] = domainId.split('.');
        domainId = a;
        key = b;
    }
    const domain = getDomain(domainId);
    return domain ? domain.getDef(key) : null;
}

async function validate(domainId, key, data) {
    if (typeof object === 'undefined') {
        data = key;
        const [a,b] = domainId.split('.');
        domainId = a;
        key = b;
    }
    const domain = getDomain(domainId);
    if (!domain) {
        return {
            valid: false,
            errors: [
                { message: `Unsupported domain: ${domainId}`, domainId, key },
            ],
        };
    }
    return await domain.validate(key, data);
}
