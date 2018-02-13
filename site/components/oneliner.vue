<template>
    <div class="oneliner"
         :class="{
             'oneliner--active': active,
         }"
         :id="def.key">
        <div class="oneliner__term">
            <span class="oneliner__key">{{ def.key }}</span>
            <img
                src="/img/link.svg"
                class="oneliner__link"
                @click="permalink"/>
            <div class="oneliner__details">
                <span class="tag tag--success"
                    v-if="def.spec.initial">
                    initial
                </span>
                <span class="tag tag--primary"
                    v-if="def.spec.staged">
                    staged
                </span>
                <span class="tag tag--warning"
                    v-if="def.spec.deprecated">
                    deprecated
                </span>
            </div>
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

        active() {
            return this.$route.hash === ('#' + this.def.key);
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
.oneliner {
    display: flex;
    flex-flow: row nowrap;
    padding: .5em;
}

.oneliner--active {
    background: var(--ui-highlight);
}

.oneliner + .oneliner {
    border-top: 1px solid var(--ui-default);
}

.oneliner__term {
    flex: 0 0 var(--column__width);
}

.oneliner__link {
    display: inline-block;
    visibility: hidden;
    cursor: pointer;
    z-index: 1;
    width: 16px;
    height: 16px;
    opacity: .5;
    vertical-align: middle;
}

.oneliner:hover .oneliner__link,
.oneliner--active .oneliner__link {
    visibility: visible;
}

</style>
