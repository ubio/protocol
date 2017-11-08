'use strict';

const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

const App = Vue.component('app', require('./app.vue'));

new App({
    router: require('./router'),
    el: '#app',
});
