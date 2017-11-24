'use strict';

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

    async validate(data) {
        const ajvSchema = this.domain.protocol.validator.getSchema(this.id);
        if (ajvSchema) {
            const valid = await ajvSchema(data);
            return {
                valid,
                errors: ajvSchema.errors,
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
