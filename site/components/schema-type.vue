<template>
    <span class="schema-type">
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
    </span>
</template>

<script>
const protocol = require('../../src');

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