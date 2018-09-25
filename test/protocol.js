const { Protocol } = require('../src');
const schema = require('../src/schema');

module.exports = new Protocol(schema);
