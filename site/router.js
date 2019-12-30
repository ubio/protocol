import { scrollToHash } from './util';
import VueRouter from 'vue-router';

import ViewLayout from './routes/layout.vue';
import ViewHome from './routes/home.vue';
import ViewDomain from './routes/domain.vue';

export const router = new VueRouter({
    mode: 'history',
    scrollBehavior(route) {
        const { hash } = route;
        if (hash) {
            scrollToHash(hash);
        } else {
            return { x: 0, y: 0 };
        }
    },
    routes: [
        {
            path: '',
            component: ViewLayout,
            children: [
                {
                    name: 'home',
                    path: '/',
                    component: ViewHome,
                },
                {
                    name: 'domain',
                    path: '/:domainId',
                    component: ViewDomain,
                    props: true
                }
            ]
        }
    ]
});
