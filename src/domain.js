'use strict';

const util = require('./util');
const { InputDef, OutputDef, TypeDef } = require('./defs');

module.exports = class Domain {

    constructor(protocol, id) {
        this.id = id;
        this.protocol = protocol;
        this.spec = protocol.schema.domains[id];

        this.inputs = this._collectInputs();
        this.outputs = this._collectOutputs();
        this.types = this._collectTypes();
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

    getDefs() {
        return this.defs;
    }

    getDef(key) {
        return this.defs.find(def => def.key === key);
    }

    async prepareInputs({
        inputObject,
        applyDefaults = false,
    }) {
        const clone = util.deepClone(inputObject);
        const results = [];
        // Apply defaults
        if (applyDefaults) {
            for (const inputDef of this.getInputs()) {
                inputDef.applyDefault(clone);
            }
        }
        for (const key of Object.keys(clone)) {
            const data = clone[key];
            const { valid, errors } = await this.validate(key, data);
            const fields = {
                key,
                data,
                valid,
                errors,
            };
            results.push(fields);
        }
        return results;
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

};
