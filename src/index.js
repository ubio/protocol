'use strict';

const schema = require('./schema');
const Protocol = require('./protocol');
const ProtocolProvider = require('./provider');
const Domain = require('./domain');

const protocol = new Protocol(schema);

module.exports = {
    schema,
    protocol,
    Protocol,
    ProtocolProvider,
    Domain,
};
