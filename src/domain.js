'use strict';

const { InputDef, OutputDef, TypeDef } = require('./defs');

module.exports = class Domain {

    constructor(protocol, id) {
        this.id = id;
        this.protocol = protocol;
        this.spec = protocol.schema.domains[id];

        this.inputs = this._collectInputs();
        this.outputs = this._collectOutputs();
        this.types = this._collectTypes();
        this.errors = this._collectErrors() || [];
        this.defs = []
            .concat(this.inputs)
            .concat(this.outputs)
            .concat(this.types);
    }

    getInputs() {
        return this.inputs;
    }

    getOutputs() {
        return this.outputs;
    }

    getTypes() {
        return this.types;
    }

    getErrors() {
        return this.errors;
    }

    getDefs() {
        return this.defs;
    }

    getDef(key) {
        return this.defs.find(def => def.key === key);
    }

    getInputDef(key) {
        return this.inputs.find(def => def.key === key);
    }

    getOutputDef(key) {
        return this.outputs.find(def => def.key === key);
    }

    getError(code) {
        return this.errors.find(error => error.code === code);
    }

    _collectInputs() {
        return Object.keys(this.spec.inputs).map(key => new InputDef(this, key));
    }

    _collectOutputs() {
        return Object.keys(this.spec.outputs).map(key => new OutputDef(this, key));
    }

    _collectTypes() {
        return Object.keys(this.spec.types).map(key => new TypeDef(this, key));
    }

    _collectErrors() {
        return this.spec.errors;
    }

    async validate(key, data) {
        const def = this.getDef(key);
        if (!def) {
            return {
                valid: false,
                errors: [
                    {
                        message: `Unexpected data: ${this.id}.${key}`,
                        domain: this.id,
                        key,
                    },
                ],
            };
        }
        return await def.validate(data);
    }

    async validateInput(key, data) {
        const def = this.getInputDef(key);
        if (!def) {
            return {
                valid: false,
                errors: [
                    {
                        message: `Unexpected input: ${this.id}.${key}`,
                        domain: this.id,
                        key,
                    },
                ],
            };
        }
        return await def.validate(data);
    }

    async validateOutput(key, data) {
        const def = this.getOutputDef(key);
        if (!def) {
            return {
                valid: false,
                errors: [
                    {
                        message: `Unexpected output: ${this.id}.${key}`,
                        domain: this.id,
                        key,
                    },
                ],
            };
        }
        return await def.validate(data);
    }

};
