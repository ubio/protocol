#!/usr/bin/env node
'use strict';

const fs = require('fs');
const protocol = require('./src');

fs.writeFileSync('schema.json', JSON.stringify(protocol.schema, null, 2), 'utf-8');
