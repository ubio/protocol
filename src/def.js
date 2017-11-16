'use strict';

module.exports = class Def {

    constructor(domain, ns, key, spec) {
        this.domain = domain;
        this.key = key;
        this.ns = ns;
        this.id = `${domain.id}.${key}`;
        spec.$id = '#' + this.id;
        Object.assign(this, spec);
    }

};
