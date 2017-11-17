'use strict';

const Def = require('./def');

module.exports = class Domain {

    constructor(id, spec) {
        this._id = id;
        Object.assign(this, spec);

        this._inputs = this._collectDefs('inputs');
        this._outputs = this._collectDefs('outputs');
        this._types = this._collectDefs('types');
        this._defs = []
            .concat(this._inputs)
            .concat(this._outputs)
            .concat(this._types);
    }

    getInputs() {
        return this._inputs;
    }

    getOutputs() {
        return this._outputs;
    }

    getTypes() {
        return this._types;
    }

    getDefs() {
        return this._defs;
    }

    getDef(key) {
        return this.getDefs().find(def => def._key === key);
    }

    _collectDefs(ns) {
        return Object.keys(this[ns]).map(key => new Def(this, ns, key, this[ns][key]));
    }

};
