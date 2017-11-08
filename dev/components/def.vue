<template>
    <div class="def"
         :class="{ 'def--active': active }"
         :id="id">
        <h3>
            <span class="def__domain">{{ domain.id }}</span>.<span class="def__id">{{ def.id }}</span>
            <span class="def__type"
                  v-if="def.type">{{ def.type }}</span>
        </h3>
        <div class="def__body">
            <p class="def__description">
                {{ def.description }}
            </p>
            <template v-if="def.enum">
                <h4>Allowed values</h4>
                <p>{{ def.enum.join(', ') }}</p>
            </template>
            <template v-if="def.properties">
                <h4>Properties</h4>
                <prop class="def__prop"
                        v-for="prop,id in def.properties"
                        :id="id"
                        :prop="prop"
                        :required="isPropRequired(id)">
                </prop>
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

    },

};
</script>

<style>
.def {
    margin: 1em 0;
    padding: 0 1em;
}

.def--active {
    border-left: 2px solid var(--ui-primary);
}

.def__type {
    color: var(--ui-muted);
}

.def__body {
    margin-left: 2em;
}
</style>