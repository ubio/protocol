<template>
    <span class="schema-type">
        <span class="schema-type__literal"
              if="def.type">
            {{ def.type }}
        </span>
        <span class="schema-type__array"
              v-if="isArray">
            of
            <schema-type :def="def.items"/>
        </span>
        <span class="schema-type__ref"
              v-if="def.$ref">
            <router-link
                v-if="ref"
                :to="{
                    name: 'domain',
                    params: {
                        domainId: ref._domain._id,
                    },
                    hash: '#' + ref._key,
                }">
                {{ ref._id }}
            </router-link>
            <span class="schema-type__broken-ref"
                  v-else>
                {{ def.$ref }}
            </span>
        </span>
    </span>
</template>

<script>
const protocol = require('../../src');

module.exports = {

    name: 'schema-type',

    props: {
        def: { type: Object, required: true },
    },

    computed: {

        isArray() {
            return this.def.type === 'array';
        },

        ref() {
            return protocol.getDef(this.def.$ref.replace('#', ''));
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