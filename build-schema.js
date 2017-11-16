#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const protocol = require('./src');

const schemaJson = JSON.stringify(protocol.schema, null, 2);
const files = [
    path.join(__dirname, 'schema.json'),
    path.join(__dirname, 'docs', 'schema.json'),
];

for (const file of files) {
    fs.writeFileSync(file, schemaJson, 'utf-8');
}
