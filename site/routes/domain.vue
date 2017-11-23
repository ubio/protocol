<template>
    <div class="domain">
        <div class="domain__intro">
            <h1>{{ domain.id }}</h1>
            <div class="domain__description"
                 v-html="domain.spec.description">
            </div>
        </div>

        <template v-if="inputs.length">
            <h2>Inputs</h2>
            <oneliner
                v-for="def of inputs"
                :def="def"/>
        </template>

        <template v-if="outputs.length">
            <h2>Outputs</h2>
            <oneliner
                v-for="def of outputs"
                :def="def"/>
        </template>

        <template v-if="types.length">
            <h2>Types</h2>
            <def
                v-for="def of types"
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

        inputs() {
            return this.domain.getInputs();
        },

        outputs() {
            return this.domain.getOutputs();
        },

        types() {
            const types = this.domain.getTypes();
            return [].concat(types).sort((a, b) => a.key > b.key ? 1 : -1);
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
                    el.scrollIntoView();
                }
            } catch (err) {}
        },

    },

};
</script>

<style>
</style>
