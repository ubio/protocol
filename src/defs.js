'use strict';

const util = require('./util');
const createExample = require('./example');

class Def {

    constructor(domain, ns, key) {
        this.domain = domain;
        this.spec = domain.spec[ns][key];
        this.ns = ns;
        this.key = key;
        const id = `${domain.id}.${key}`;
        this.id = id;
    }

    getTypeRef() {
        return null;
    }

    getSchema() {
        return null;
    }

    hasDefault() {
        return typeof this.spec.default !== 'undefined';
    }

    applyDefault(object) {
        if (!this.hasDefault()) {
            return;
        }
        if (typeof object[this.key] !== 'undefined') {
            return;
        }
        object[this.key] = util.deepClone(this.spec.default);
    }

    async validate(data) {
        const ajvSchema = this.domain.protocol.validator.getSchema(this.id);
        if (ajvSchema) {
            const valid = ajvSchema(data);
            return {
                valid,
                errors: !valid ? ajvSchema.errors : [],
            };
        }
        return {
            valid: false,
            errors: [
                {
                    message: `Cannot resolve schema for definition: ${this.id}`,
                    domain: this.domain.id,
                    key: this.key,
                },
            ],
        };
    }

    createExample() {
        return createExample(this.domain.protocol, this.spec);
    }

}

class TypeDef extends Def {

    constructor(domain, key) {
        super(domain, 'types', key);
    }

    getTypeRef() {
        return `#/domains/${this.domain.id}/types/${this.key}`;
    }

    getTypeDef() {
        return this;
    }

}

class CustomDef extends Def {

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

}


class InputDef extends CustomDef {

    constructor(domain, key) {
        super(domain, 'inputs', key);
    }

}

class OutputDef extends CustomDef {

    constructor(domain, key) {
        super(domain, 'outputs', key);
    }

}

module.exports = {
    InputDef,
    OutputDef,
    TypeDef,
};
