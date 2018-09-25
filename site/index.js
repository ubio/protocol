'use strict';

const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

const App = Vue.component('app', require('./app.vue'));

const $provider = require('./provider');

Vue.mixin({
    computed: {
        $protocol() {
            return $provider.latest;
        },
    },
});

new App({
    router: require('./router'),
    el: '#app',
    data() {
        return {
            $provider,
        };
    },
});
