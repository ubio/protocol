'use strict';

const { ProtocolProvider } = require('../src');

const provider = module.exports = new ProtocolProvider({
    url: 'https://protocol.automationcloud.net/schema.json',
    autoRefresh: true,
    ttl: 60000,
});

provider.startAutoRefresh();

module.exports = provider;
