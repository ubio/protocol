'use strict';

const Def = require('./def');

module.exports = class Domain {

    constructor(id, spec) {
        this.$spec = spec;
        this._id = id;
        spec.$id = '#' + id;
        Object.assign(this, spec);
    }

    getInputs() {
        return Object.keys(this.inputs).map(key => {
            return new Def(this, 'inputs', key, this.inputs[key]);
        });
    }

    getOutputs() {
        return Object.keys(this.outputs).map(key => {
            return new Def(this, 'outputs', key, this.outputs[key]);
        });
    }

    getTypes() {
        return Object.keys(this.types).map(key => {
            return new Def(this, 'types', key, this.types[key]);
        });
    }

};
