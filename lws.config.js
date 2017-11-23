'use strict';

/*
// Use following config for serving with prefix
module.exports = {
    rewrite: [
        {
            from: '/protocol/*',
            to: '/docs/$1',
        },
    ],
    directory: '.',
    spa: '/docs/index.html',
};
*/

module.exports = {
    directory: 'docs',
    spa: 'index.html',
};
