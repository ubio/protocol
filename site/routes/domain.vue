<template>
    <div class="domain">
        <div class="domain__intro">
            <h1>{{ domain.id }}</h1>
            <span class="tag tag--warning"
                v-if="domain.spec.experimental">
                experimental
            </span>
            <div class="domain__description"
                 v-html="domain.spec.description">
            </div>
        </div>

        <template v-if="inputs.length">
            <h2 id="inputs">Inputs</h2>

            <div class="block"
                v-if="exampleInput">
                <template v-if="!showExamples">
                    <a @click="showExamples = true">
                        Show example of initial input
                    </a>
                </template>
                <template v-if="showExamples">
                    <a @click="showExamples = false">
                        Hide example
                    </a>
                    <pre v-text="JSON.stringify(exampleInput, null, 4)"></pre>
                    <a @click="showExamples = false">
                        Hide example
                    </a>
                </template>
            </div>

            <oneliner
                v-for="def of inputs"
                :def="def"/>
        </template>

        <template v-if="outputs.length">
            <h2 id="outputs">Outputs</h2>
            <oneliner
                v-for="def of outputs"
                :def="def"/>
        </template>

        <template v-if="types.length">
            <h2 id="types">Types</h2>
            <def
                v-for="def of types"
                :def="def"/>
        </template>

    </div>
</template>

<script>
const util = require('../util');
const { protocol } = require('../../src');

module.exports = {

    components: {
        'def': require('../components/def.vue'),
        'oneliner': require('../components/oneliner.vue'),
    },

    props: {
        domainId: { type: String, required: true },
    },

    data() {
        return {
            showExamples: false,
        };
    },

    mounted() {
        util.scrollToHash(this.$route.hash);
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

        exampleInput() {
            if (!this.inputs.length) {
                return null;
            }
            const obj = {};
            for (const input of this.inputs) {
                if (input.spec.initial) {
                    obj[input.key] = input.createExample();
                }
            }
            return obj;
        },

    },

};
</script>

<style>
</style>
