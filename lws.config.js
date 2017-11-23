'use strict';

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
