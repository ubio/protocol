<template>
    <div class="domain">
        <div class="domain__intro">
            <h1>{{ domain.id }}</h1>
            <p>{{ domain.description }}</p>
        </div>

        <template v-if="hasEvents">
            <h2>Events</h2>
            <def v-for="def of domain.events"
                 namespace="events"
                 :def="def"
                 :domain="domain">
            </def>
        </template>

        <template v-if="hasTypes">
            <h2>Types</h2>
            <def v-for="def of domain.types"
                 namespace="types"
                 :def="def"
                 :domain="domain">
            </def>
        </template>
    </div>
</template>

<script>
const protocol = require('../../protocol');

module.exports = {

    components: {
        'def': require('../components/def.vue'),
    },

    props: {
        domainId: { type: String, required: true },
    },

    computed: {

        domain() {
            return protocol[this.domainId];
        },

        hasTypes() {
            return Object.keys(this.domain.types).length > 0;
        },

        hasEvents() {
            return Object.keys(this.domain.events).length > 0;
        },

    },

};
</script>

<style>
</style>
