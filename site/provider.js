'use strict';

const { ProtocolProvider, protocol } = require('../src');

const provider = module.exports = new ProtocolProvider({
    ttl: 5 * 60000,
    autoRefresh: true,
});

module.exports = {
    install,
};

function install(Vue) {
    Vue.mixin({
        beforeCreate() {
            this._provider = provider;
        },
    });
    Object.defineProperty(Vue.prototype, '$protocol', {
        get() {
            return this._provider.latest;
        },
    });
}

provider.latest = protocol;
