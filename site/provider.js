'use strict';

const { ProtocolProvider } = require('../src');

const provider = module.exports = new ProtocolProvider({
    autoRefresh: true,
    ttl: 60000,
});

provider.startAutoRefresh();

module.exports = provider;
