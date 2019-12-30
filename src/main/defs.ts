import { Domain } from './domain';
import { deepClone } from './util';
import jsonPointer from 'jsonpointer';
import { createExample } from './example';
import { ValidationResult } from './validator';

export class Def {
    spec: any;
    id: string;

    constructor(
        public domain: Domain,
        public ns: string,
        public key: string
    ) {
        this.domain = domain;
        this.spec = domain.spec[ns][key];
        this.ns = ns;
        this.key = key;
        this.id = `${domain.id}.${key}`;
    }

    /**
     * Returns a reference to JSON schema type definition designated by this Def.
     * E.g. for InputDef, the type ref should return a reference to type defintion from `types`,
     * specified by `typeRef` field.
     * For TypeDef this is the same as self ref.
     */
    getTypeRef(): string {
        return this.getSelfRef();
    }

    /**
     * Returns a reference to "self", e.g. for input defs it's a reference to the input def itself.
     */
    getSelfRef(): string {
        return `#/domains/${this.domain.id}/${this.ns}/${this.key}`;
    }

    hasDefault(): boolean {
        return typeof this.spec.default !== 'undefined';
    }

    applyDefault(data: any) {
        if (!this.hasDefault()) {
            return;
        }
        if (typeof data[this.key] !== 'undefined') {
            return;
        }
        data[this.key] = deepClone(this.spec.default);
    }

    async validate(data: any): Promise<ValidationResult> {
        const ajvSchema = this.domain.protocol.validator.getSchema(this.id);
        if (ajvSchema) {
            const valid = ajvSchema(data) as boolean;
            return {
                valid,
                errors: !valid ? ajvSchema.errors! : []
            };
        }
        return {
            valid: false,
            errors: [
                {
                    message: `Cannot resolve schema for definition: ${this.id}`,
                    keyword: '',
                    dataPath: '',
                    schemaPath: this.getSelfRef(),
                    params: {
                        domainId: this.domain.id,
                        key: this.key,
                    }
                }
            ]
        };
    }

    createExample() {
        return createExample(this.domain.protocol, this.spec);
    }

}

export class TypeDef extends Def {

    constructor(domain: Domain, key: string) {
        super(domain, 'types', key);
    }

    getTypeDef() {
        return this;
    }

}

export class CustomDef extends Def {

    getTypeRef() {
        return this.spec.typeRef;
    }

    getTypeDef() {
        return this.domain.protocol.resolveTypeRef(this.getTypeRef());
    }

    isStaged() {
        return this.spec.staged || false;
    }

    isPii() {
        const typeDef = this.getTypeDef();
        return typeDef && typeDef.spec && typeDef.spec.pii || false;
    }

    createExample() {
        const typeDef = this.getTypeDef();
        return typeDef ? typeDef.createExample() : null;
    }

    getCanonicalPointers(): string[] | null {
        return this.spec.canonical || null;
    }

    getCanonicalValues(data: any): any[] | null {
        const pointers = this.getCanonicalPointers();
        return pointers ? pointers.map(ptr => jsonPointer.get(data, ptr)) : null;
    }

}

export class InputDef extends CustomDef {

    constructor(domain: Domain, key: string) {
        super(domain, 'inputs', key);
    }
}

export class OutputDef extends CustomDef {

    constructor(domain: Domain, key: string) {
        super(domain, 'outputs', key);
    }

}
