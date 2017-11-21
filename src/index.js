'use strict';

const schema = require('./schema');
const Protocol = require('./protocol');

module.exports = new Protocol(schema);
