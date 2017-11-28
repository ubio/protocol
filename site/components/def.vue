<template>
    <div class="def"
         :class="{ 'def--active': active }"
         :id="def.key">

        <h3 class="def__header">
            <span class="def__id">{{ def.id }}</span>
            <span class="def__link" @click="permalink">🔗</span>
        </h3>
        <div class="def__type">
            <schema-type :spec="def.spec"/>
            <div
                class="def__experimental"
                v-if="def.spec.experimental">
                experimental
            </div>
        </div>

        <div class="def__description"
                v-html="def.spec.description">
        </div>

        <template v-if="def.spec.enum">
            <h4>Allowed values</h4>
            <div class="def__enum">
                {{ def.spec.enum.join(', ') }}
            </div>
        </template>

        <template v-if="def.spec.properties">
            <h4>Properties</h4>
            <prop
                class="def__prop"
                v-for="prop,id in def.spec.properties"
                :id="id"
                :prop="prop"
                :parent="def"/>
        </template>
    </div>
</template>

<script>
module.exports = {

    components: {
        'schema-type': require('./schema-type.vue'),
        prop: require('./prop.vue'),
    },

    props: {
        def: { type: Object, required: true },
    },

    computed: {

        active() {
            return this.$route.hash === '#' + this.def.key;
        },

    },

    methods: {

        permalink() {
            this.$router.replace('#' + this.def.key);
        },

    },

};
</script>

<style>
.def {
    position: relative;
}

.def--active::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -16px;
    width: 4px;
    background: var(--ui-highlight);
}

.def__header {
    position: relative;
    margin: 2em 0 0;
    font-size: 20px;
    color: var(--heading__color);
}

.def__link {
    display: inline-block;
    visibility: hidden;
    cursor: pointer;
    z-index: 1;
}

.def:hover .def__link,
.def--active .def__link {
    visibility: visible;
}

.def__type {
    margin: 0 0 2em 2em;
}

.def__experimental {
    display: inline-block;
    margin-left: .5em;
    padding: 0 4px;
    border-radius: var(--border-radius);
    background: var(--ui-failure);
    color: var(--ui-failure--inverse);

    display: none;
}
</style>