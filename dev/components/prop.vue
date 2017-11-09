<template>
    <div class="prop">
        <div class="prop__id">
            {{ id }}
        </div>
        <div class="prop__body">
            <div class="prop__type"
                 v-if="prop.type">
                {{ prop.type }}
                <span class="prop__array"
                      v-if="isArray">
                    of
                    <template v-if="itemsRef">
                        <router-link :to="{
                            name: 'domain',
                            params: {
                                domainId: itemsRef.domainId,
                            },
                            hash: itemsRef.hash,
                        }">
                            {{ itemsRef.domainId }}.{{ itemsRef.id }}
                        </router-link>
                    </template>
                    <template v-else>
                        {{ prop.items.type }}
                    </template>
                </span>
            </div>
            <template v-if="ref">
                <router-link :to="{
                    name: 'domain',
                    params: {
                        domainId: ref.domainId,
                    },
                    hash: ref.hash,
                }">
                    {{ ref.domainId }}.{{ ref.id }}
                </router-link>
            </template>
            <div class="prop__optional"
                 v-if="!required">
                optional
            </div>
            <div class="prop__description"
                 v-if="prop.description"
                 v-html="prop.description">
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {

    props: {
        id: { type: String },
        prop: { type: Object, required: true },
        required: { type: Boolean, required: true },
    },

    computed: {

        ref() {
            const { $ref } = this.prop;
            return $ref ? this.parseRef($ref) : null;
        },

        isArray() {
            return this.prop.type === 'array';
        },

        itemsRef() {
            const { $ref } = this.prop.items || {};
            return $ref ? this.parseRef($ref) : null;
        },

    },

    methods: {

        parseRef($ref) {
            const [domainId, pointer] = $ref.split('#');
            const [,namespace, id] = pointer.split('/');
            return {
                domainId,
                namespace,
                id,
                pointer,
                hash: `#${namespace}-${id}`,
            };
        },

    },

};
</script>

<style>
.prop {
    margin: 1em 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
}

.prop__id {
    flex: 0 0 160px;
    margin-right: 1em;
    text-align: right;
}

.prop__body {
    flex: 1;
}

.prop__type {
    font-weight: bold;
}

.prop__optional {
    color: var(--ui-muted);
}
</style>