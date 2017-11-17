'use strict';

module.exports = class Def {

    constructor(domain, ns, key, spec) {
        this._domain = domain;
        this._key = key;
        this._ns = ns;
        this._id = `${domain._id}.${key}`;
        spec.$id = '#' + this._id;
        Object.assign(this, spec);
    }

};
