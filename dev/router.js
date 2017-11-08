'use strict';

const VueRouter = require('vue-router');

module.exports = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '',
            component: require('./routes/layout.vue'),
            children: [
                {
                    name: 'home',
                    path: '/',
                    component: require('./routes/home.vue'),
                },
                {
                    name: 'domain',
                    path: '/:domainId',
                    component: require('./routes/domain.vue'),
                    props: true,
                },
            ],
        },
    ],
});
