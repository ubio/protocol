import { Domain, ErrorDescriptor } from './domain';
import { createValidator } from './validator';
import { Def } from './defs';
import { Ajv } from 'ajv';

export class Protocol {
    domains: Domain[];
    validator: Ajv;

    constructor(public schema: any) {
        this.domains = this._collectDomains();
        this.validator = createValidator(schema, this.getAllDefs());
    }

    _collectDomains(): Domain[] {
        return Object.keys(this.schema.domains).map(id => new Domain(this, id));
    }

    getDomains() {
        return this.domains;
    }

    getDomain(id: string) {
        return this.domains.find(domain => domain.id === id);
    }

    getAllDefs() {
        return [...this.allDefs()];
    }

    *allDefs(): Iterable<Def> {
        for (const domain of this.domains) {
            yield* domain.defs;
        }
    }

    resolveTypeRef($ref: string) {
        const m = /^#\/domains\/(.*?)\/types\/(.*?)$/.exec($ref);
        return m ? this.getDef(m[1], m[2]) : null;
    }

    getDef(domainId: string, key: string) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getDef(key) : null;
    }

    getInputDef(domainId: string, key: string) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getInputDef(key) : null;
    }

    getOutputDef(domainId: string, key: string) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getOutputDef(key) : null;
    }

    getError(domainId: string, code: string) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getError(code) : null;
    }

    getAllErrors(): ErrorDescriptor[] {
        return [...this.allErrors()];
    }

    *allErrors(): Iterable<ErrorDescriptor> {
        for (const domain of this.domains) {
            yield* domain.getErrors();
        }
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

    getSuccessCodeOutputKey(domainId: string) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getSuccessCodeOutputKey() : null;
    }

    getSuccessCodeValue(domainId: string, outputKey: string, outputData: string) {
        const domain = this.getDomain(domainId);
        return domain ? domain.getSuccessCodeValue(outputKey, outputData) : null;
    }
}
