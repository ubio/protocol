#!/usr/bin/env node
'use strict';

const fs = require('fs');

const newVersion = process.env.npm_package_version;

if (!newVersion) {
    throw new Error('This should be run during "version" script.');
}

const changelog = fs.readFileSync('./CHANGELOG.md', 'utf-8');

// Validate unreleased content
const m = /(?:## \[UNRELEASED\].*\n)([\s\S]*?)(?=\n\s*## |$)/.exec(changelog);
if (!m) {
    throw new Error('Changelog format is broken, please fix');
}

const unreleasedContent = m[1].trim();
if (!unreleasedContent) {
    throw new Error('Please fill in changelog');
}

// Update and save

const now = new Date();
const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
const updated = changelog.replace(/^(## \[UNRELEASED\].*\n)/, `$1\n\n## [${newVersion}] - ${date}\n`);

fs.writeFileSync('./CHANGELOG.md', updated);
