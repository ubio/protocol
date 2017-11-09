<template>
    <div class="domain">
        <div class="domain__intro">
            <h1>{{ domain.id }}</h1>
            <div class="domain__description">{{ domain.description }}</div>
        </div>

        <template v-if="hasInputs">
            <h2>Inputs</h2>
            <def
                v-for="def of domain.inputs"
                namespace="inputs"
                :def="def"
                :domain="domain"/>
        </template>

        <template v-if="hasEvents">
            <h2>Events</h2>
            <def
                v-for="def of domain.events"
                namespace="events"
                :def="def"
                :domain="domain"/>
        </template>

        <template v-if="hasTypes">
            <h2>Types</h2>
            <def
                v-for="def of domain.types"
                namespace="types"
                :def="def"
                :domain="domain"/>
        </template>
    </div>
</template>

<script>
const protocol = require('../../src/protocol');

module.exports = {

    components: {
        'def': require('../components/def.vue'),
    },

    props: {
        domainId: { type: String, required: true },
    },

    watch: {

        $route({ hash }) {
            if (hash) {
                this.scrollToActive();
            }
        },

    },

    computed: {

        domain() {
            return protocol[this.domainId];
        },

        hasInputs() {
            return Object.keys(this.domain.inputs).length > 0;
        },

        hasEvents() {
            return Object.keys(this.domain.events).length > 0;
        },

        hasTypes() {
            return Object.keys(this.domain.types).length > 0;
        },

    },

    methods: {

        scrollToActive() {
            if (!this.$route.hash) {
                return;
            }
            try {
                const el = this.$el.querySelector(this.$route.hash);
                if (el) {
                    el.scrollIntoViewIfNeeded();
                }
            } catch (err) {}
        },

    },

};
</script>

<style>
</style>
