'use strict';

const fs = require('fs');
const path = require('path');
const protocol = require('./src');

const schemaJson = JSON.stringify(protocol.schema, filterPrivateKeys, 2);

function filterPrivateKeys(key, value) {
    return key.indexOf('_') === 0 ? undefined : value;
}

fs.writeFileSync(path.join(__dirname, 'public', 'schema.json'), schemaJson, 'utf8');
