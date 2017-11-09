<template>
    <div class="def"
         :class="{ 'def--active': active }"
         :id="id">
        <div class="def__header">
            <span class="def__link"
                  @click="permalink">🔗</span>
            <span class="def__domain">{{ domain.id }}</span>
            <span class="def__dot">.</span>
            <span class="def__id">{{ def.id }}</span>
            <span class="def__type">
                {{ def.type || 'object' }}
            </span>
        </div>
        <div class="def__body">
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
                    :required="isPropRequired(id)"/>
            </template>
        </div>
    </div>
</template>

<script>
module.exports = {

    components: {
        prop: require('./prop.vue'),
    },

    props: {
        namespace: { type: String, required: true },
        domain: { type: Object, required: true },
        def: { type: Object, required: true },
    },

    computed: {

        id() {
            return `${this.namespace}-${this.def.id}`;
        },

        active() {
            return this.$route.hash === '#' + this.id;
        },

    },

    methods: {

        isPropRequired(id) {
            const required = this.def.required || [];
            return required.includes(id);
        },

        permalink() {
            this.$router.replace('#' + this.id);
        },

    },

};
</script>

<style>
.def {
    margin: 2em 0;
}

.def__header {
    margin: 1em 0 1em -1.5em;
    font-size: 20px;
    display: flex;
    flex-flow: row nowrap;
}

.def__link {
    flex: 0 0 1.5em;
    visibility: hidden;
    cursor: pointer;
}

.def__header:hover .def__link,
.def--active .def__link {
    visibility: visible;
}

.def__type {
    margin-left: .5em;
    color: var(--ui-muted);
}
</style>