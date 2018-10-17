'use strict';

const { join } = require('path');
const { promises: { copyFile, readdir, mkdir } } = require('fs');

async function lazyMkdir(path) {
    try {
        await mkdir(path);
    } catch (e) {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    }
}

async function copyFiles(src, dest) {
    await lazyMkdir(dest);

    const dirents = await readdir(src, { withFileTypes: true });

    await dirents.map(async dirent => {
        if (dirent.isFile()) {
            return await copyFile(join(src, dirent.name), join(dest, dirent.name));
        }

        if (dirent.isDirectory()) {
            const nextSrc = join(src, dirent.name);
            const nextDest = join(dest, dirent.name);

            return await copyFiles(nextSrc, nextDest);
        }
    });
}

copyFiles(join(__dirname, 'docs'), join(__dirname, 'public'))
    .then(() => copyFile(
        join(__dirname, 'src', 'data-generation.json'),
        join(__dirname, 'public', 'data-generation.json')
    ))
    .catch(error => {
        console.error(error); // eslint-disable-line no-console
        process.exit(1);
    });
