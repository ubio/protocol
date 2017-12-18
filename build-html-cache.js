#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const indexHtmlFile = path.join(__dirname, 'docs', 'index.html');

const text = fs.readFileSync(indexHtmlFile, 'utf-8');
const patched = text
    .replace(/"\/build\/app\.js\?.*?"/g, `"/build/app.js?${Date.now()}"`);

fs.writeFileSync(indexHtmlFile, patched, 'utf-8');
