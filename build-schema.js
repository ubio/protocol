'use strict';

const fs = require('fs');
const path = require('path');
const schema = require('./schema');

const schemaJson = JSON.stringify(schema, filterPrivateKeys, 2);

function filterPrivateKeys(key, value) {
    return key.indexOf('_') === 0 ? undefined : value;
}

fs.writeFileSync(path.join(__dirname, 'public', 'schema.json'), schemaJson, 'utf8');
