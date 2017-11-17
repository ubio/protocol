'use strict';

const schema = require('./schema');
const validator = require('./validator');

module.exports = class Def {

    constructor(domain, ns, key, spec) {
        const id = `${domain._id}.${key}`;
        this._domain = domain;
        this._key = key;
        this._ns = ns;
        this._id = id;
        Object.assign(this, spec);
    }

    async validate(object, ajv = validator.DEFAULT) {
        const ajvSchema = ajv.getSchema(schema.$id + this.$id);
        const valid = await ajvSchema(object);
        return {
            valid,
            errors: ajvSchema.errors,
        };
    }

};
