#!/usr/bin/env node
import { promises as fs } from 'fs';
import glob from 'glob';
import path from 'path';
import { promisify } from 'util';

import { schema } from '../schema/index.js';

const globAsync = promisify(glob);

const publicDir = path.join(process.cwd(), './public');
const filesToCopy = [
    ['./src/misc', 'data-generation.json'],
    ['./docs', '**'],
];

main().catch(err => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});

async function main() {
    await fs.mkdir(publicDir, { recursive: true });
    await writeSchemaJson();
    await copyStaticFiles();
    await bustIndexHtmlCache();
}

async function writeSchemaJson() {
    const schemaJson = JSON.stringify(schema, (key, value) => key.startsWith('_') ? undefined : value, 2);
    await fs.writeFile(path.join(publicDir, 'schema.json'), schemaJson, 'utf-8');
}

async function copyStaticFiles() {
    for (const [baseDir, pattern] of filesToCopy) {
        const files = await globAsync(pattern, {
            cwd: path.join(process.cwd(), baseDir),
            nodir: true,
        });
        for (const file of files) {
            const src = path.join(process.cwd(), baseDir, file);
            const dst = path.join(publicDir, file);
            await fs.mkdir(path.dirname(dst), { recursive: true });
            await fs.copyFile(src, dst);
        }
    }
}

async function bustIndexHtmlCache() {
    const indexHtmlFile = path.join(publicDir, 'index.html');
    const text = await fs.readFile(indexHtmlFile, 'utf-8');
    const patched = text.replace('?cache-buster', `?${Date.now()}`);
    await fs.writeFile(indexHtmlFile, patched, 'utf8');
}
