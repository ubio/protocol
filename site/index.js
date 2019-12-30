import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import { router } from './router';
import { provider } from './provider';

Vue.use(VueRouter);

Vue.mixin({
    computed: {
        $protocol() {
            return provider.latest;
        }
    }
});

const AppComponent = Vue.component('app', App);

const app = new AppComponent({
    router,
    data() {
        return {
            $provider: provider,
        };
    },
});

app.$mount('#app');
