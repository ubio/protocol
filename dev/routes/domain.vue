<template>
    <div class="domain">
        <div class="domain__intro">
            <h1>{{ domain.$id }}</h1>
            <div class="domain__description"
                 v-html="domain.description">
            </div>
        </div>

        <template v-if="hasInputs">
            <h2>Inputs</h2>
            <oneliner
                v-for="def of domain.inputs"
                :def="def"/>
        </template>

        <template v-if="hasOutputs">
            <h2>Outputs</h2>
            <oneliner
                v-for="def of domain.outputs"
                :def="def"/>
        </template>

        <template v-if="hasTypes">
            <h2>Types</h2>
            <def
                v-for="def of domain.types"
                :def="def"/>
        </template>

    </div>
</template>

<script>
const protocol = require('../../src');

module.exports = {

    components: {
        'def': require('../components/def.vue'),
        'oneliner': require('../components/oneliner.vue'),
    },

    props: {
        domainId: { type: String, required: true },
    },

    mounted() {
        this.scrollToActive();
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
            return protocol.getDomain(this.domainId);
        },

        hasInputs() {
            return Object.keys(this.domain.inputs).length > 0;
        },

        hasOutputs() {
            return Object.keys(this.domain.outputs).length > 0;
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
