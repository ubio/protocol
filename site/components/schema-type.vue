<template>
    <span class="schema-type">
        <template v-if="spec.oneOf">
            <template v-for="(subSpec, i) in spec.oneOf">
                <schema-type :spec="subSpec"/>
                <span v-if="i < spec.oneOf.length - 1">OR</span>
            </template>
        </template>
        <template v-else>
            <span class="schema-type__literal"
                if="spec.type">
                {{ spec.type }}
            </span>
            <span class="schema-type__array"
                v-if="isArray">
                of
                <schema-type :spec="spec.items"/>
            </span>
            <span class="schema-type__ref"
                v-if="$ref">
                <router-link
                    v-if="ref"
                    :to="{
                        name: 'domain',
                        params: {
                            domainId: ref.domain.id,
                        },
                        hash: '#' + ref.key,
                    }">
                    {{ ref.id }}
                </router-link>
                <span class="schema-type__broken-ref"
                    v-else>
                    {{ $ref }}
                </span>
            </span>
            <span class="tag tag--primary"
                title="Personally identifiable information"
                v-if="pii">
                PII
            </span>
        </template>
    </span>
</template>

<script>
const { protocol } = require('../../src');

module.exports = {

    name: 'schema-type',

    props: {
        spec: { type: Object, required: true },
    },

    computed: {

        isArray() {
            return this.spec.type === 'array';
        },

        $ref() {
            return this.spec.$ref || this.spec.typeRef;
        },

        ref() {
            return protocol.resolveTypeRef(this.$ref);
        },

        pii() {
            return !!this.ref.spec.pii;
        },

    },

};
</script>

<style>
.schema-type {
    font-weight: bold;
}

.schema-type__broken-ref {
    color: var(--ui-failure);
}
</style>
