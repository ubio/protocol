'use strict';

const Domain = require('./domain');
const { createValidator } = require('./validator');

module.exports = class Protocol {

    constructor(schema) {
        this.schema = schema;
        this.domains = this._collectDomains();
        this.validator = createValidator(schema, this.getAllDefs());
    }

    _collectDomains() {
        return Object.keys(this.schema.domains).map(id => new Domain(this, id));
    }

    getDomains() {
        return this.domains;
    }

    getDomain(id) {
        return this.domains.find(domain => domain.id === id);
    }

    getAllDefs() {
        return this.domains.reduce((defs, domain) => defs.concat(domain.defs), []);
    }

    resolveTypeRef($ref) {
        const m = /^#\/domains\/(.*?)\/types\/(.*?)$/.exec($ref);
        return m ? this.getDef(m[1], m[2]) : null;
    }

    getDef(domainId, key) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getDef(key) : null;
    }

    getInputDef(domainId, key) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getInputDef(key) : null;
    }

    getOutputDef(domainId, key) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getOutputDef(key) : null;
    }

    getError(domainId, code) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getError(code) : null;
    }

    getAllErrors() {
        return this.domains.reduce((errors, domain) => errors.concat(domain.errors), []);
    }

    getUnresolvedRefs() {
        const unresolvedRefs = new Set();
        JSON.stringify(this.schema, (key, value) => {
            if (['typeRef', '$ref'].includes(key)) {
                const ref = this.resolveTypeRef(value);
                if (!ref) {
                    unresolvedRefs.add(value);
                }
            }
            return value;
        });
        return Array.from(unresolvedRefs);
    }

    getSuccessCodeOutputKey(domainId) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getSuccessCodeOutputKey() : null;
    }

    getSuccessCodeValue(domainId, outputKey, outputData) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getSuccessCodeValue(outputKey, outputData) : null;
    }
};
