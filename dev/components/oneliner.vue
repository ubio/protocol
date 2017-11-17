<template>
    <div class="oneliner">
        <div class="oneliner__id">
            {{ def._key }}
        </div>
        <div class="oneliner__body">
            <schema-type :def="def"/>
        </div>
    </div>
</template>

<script>
module.exports = {

    components: {
        'schema-type': require('./schema-type.vue'),
    },

    props: {
        def: { type: Object, required: true },
    },

};
</script>

<style>
.oneliner {
    display: flex;
    flex-flow: row nowrap;
    padding: .5em;
    border-bottom: 1px solid var(--ui-default);
}

.oneliner__id {
    flex: 0 0 160px;
}
</style>