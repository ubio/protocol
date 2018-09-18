'use strict';

const fs = require('fs');
const path = require('path');

const indexHtmlFile = path.join(__dirname, 'public', 'index.html');

const text = fs.readFileSync(indexHtmlFile, 'utf-8');
const patched = text.replace('?cache-buster', `?${Date.now()}`);

fs.writeFileSync(indexHtmlFile, patched, 'utf8');
