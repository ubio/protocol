<template>
    <div class="domain">
        <div class="domain__intro">
            <h1>{{ domain.id }}</h1>
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

        <template v-if="errorsByCategory">
            <h2 id="errors">Errors</h2>
            <div
                v-for="category of Object.keys(errorsByCategory)"
                class="domain__errors">
                <h3 class="domain__errors__subheader"> {{ category }} </h3>
                <oneliner
                    v-for="def of errorsByCategory[category]"
                    :def="def"/>
            </div>
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

        errorsByCategory() {
            const errors = this.domain.getErrors();
            const errorsByCategory = {};
            for (const obj of errors) {
                const { category } = obj.spec;
                const list = errorsByCategory[category] || [];
                list.push(obj);
                errorsByCategory[category] = list;
            }

            return errorsByCategory;
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
.domain__errors__subheader {
    margin: 2em 0 1em;
    font-size: 20px;
    color: var(--heading__color);
}
</style>
