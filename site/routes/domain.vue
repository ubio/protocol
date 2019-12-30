<template>
    <div class="domain"
        v-if="domain">
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
                :key="def.id"
                :def="def"/>
        </template>

        <template v-if="outputs.length">
            <h2 id="outputs">Outputs</h2>
            <oneliner
                v-for="def of outputs"
                :key="def.id"
                :def="def"/>
        </template>

        <template v-if="types.length">
            <h2 id="types">Types</h2>
            <def
                v-for="def of types"
                :key="def.id"
                :def="def"/>
        </template>

        <template v-if="errorsByCategory">
            <h2 id="errors">Errors</h2>
            <div
                v-for="category of Object.keys(errorsByCategory)"
                class="domain__errors">
                <h3 class="domain__errors-subheader"> {{ category }} </h3>
                <error-oneliner
                    v-for="error of errorsByCategory[category]"
                    :key="error.code"
                    :error="error"/>
            </div>
        </template>

    </div>
</template>

<script>
import { scrollToHash } from '../util';
import Def from '../components/def.vue';
import Oneliner from '../components/oneliner.vue';
import ErrorOneliner from '../components/error-oneliner.vue';

export default {

    components: {
        Def,
        Oneliner,
        ErrorOneliner,
    },

    props: {
        domainId: { type: String, required: true }
    },

    data() {
        return {
            showExamples: false
        };
    },

    mounted() {
        scrollToHash(this.$route.hash);
    },

    computed: {

        domain() {
            return this.$protocol.getDomain(this.domainId);
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

            errors.forEach(error => {
                const { category } = error;
                const list = errorsByCategory[category] || [];
                list.push(error);
                errorsByCategory[category] = list;
            });
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
        }

    }

};
</script>

<style>
.domain__errors-subheader {
    margin: 2em 0 1em;
    font-size: 20px;
    color: var(--heading__color);
}
</style>
