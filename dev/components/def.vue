<template>
    <div class="def"
         :class="{ 'def--active': active }"
         :id="def._key">
        <div class="def__header">
            <span class="def__link"
                  @click="permalink">🔗</span>
            <span class="def__id">{{ def._id }}</span>
        </div>
        <div class="def__type">
            <schema-type :def="def"/>
        </div>

        <div class="def__description"
             v-html="def.description">
        </div>

        <template v-if="def.enum">
            <h4>Allowed values</h4>
            <div class="def__enum">
                {{ def.enum.join(', ') }}
            </div>
        </template>

        <template v-if="def.properties">
            <h4>Properties</h4>
            <prop
                class="def__prop"
                v-for="prop,id in def.properties"
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
            return this.$route.hash === '#' + this.def._key;
        },

    },

    methods: {

        permalink() {
            this.$router.replace('#' + this.def._key);
        },

    },

};
</script>

<style>
.def__header {
    margin: 2em 0 0 -1.5em;
    font-size: 20px;
    display: flex;
    flex-flow: row nowrap;
}

.def__link {
    display: inline-block;
    flex: 0 0 1.5em;
    visibility: hidden;
    cursor: pointer;
}

.def__header:hover .def__link,
.def--active .def__link {
    visibility: visible;
}

.def__type {
    margin: 0 0 2em 2em;
}
</style>