<template>
    <div class="oneliner">
        <div class="oneliner__id">
            {{ def.key }}
        </div>
        <div class="oneliner__body">
            <schema-type :spec="def.spec"/>
            <div class="oneliner__description"
                 v-html="description">
            </div>
            <div
                class="oneliner__default"
                v-if="typeof def.spec.default !== 'undefined'">
                <strong>Default value:</strong> <val :value="def.spec.default"/>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {

    components: {
        'val': require('./val.vue'),
        'schema-type': require('./schema-type.vue'),
    },

    props: {
        def: { type: Object, required: true },
    },

    computed: {

        typeDef() {
            return this.def.getTypeDef();
        },

        description() {
            const { spec } = this.def;
            const { typeDef } = this;
            return spec.description ? spec.description :
                typeDef ? typeDef.spec.description : '';
        },

    },

};
</script>

<style>
.oneliner {
    display: flex;
    flex-flow: row nowrap;
    padding: .5em;
}

.oneliner + .oneliner {
    border-top: 1px solid var(--ui-default);
}

.oneliner__id {
    flex: 0 0 160px;
}
</style>