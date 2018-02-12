<template>
    <div
        class="sidebar__domain">
        <router-link
            class="sidebar__link"
            :to="{
                name: 'domain',
                params: { domainId: domain.id }
            }">
            {{ domain.id }}
        </router-link>
        <template v-if="active">
            <router-link
                v-if="domain.getInputs().length"
                class="sidebar__section"
                :to="{
                    name: 'domain',
                    params: { domainId: domain.id },
                    hash: '#inputs',
                }">
                Inputs
            </router-link>
            <router-link
                v-if="domain.getOutputs().length"
                class="sidebar__section"
                :to="{
                    name: 'domain',
                    params: { domainId: domain.id },
                    hash: '#outputs',
                }">
                Outputs
            </router-link>
            <router-link
                class="sidebar__section"
                :to="{
                    name: 'domain',
                    params: { domainId: domain.id },
                    hash: '#types',
                }">
                Types
            </router-link>
            <router-link
                v-for="def of sortedTypes"
                class="sidebar__sublink"
                :to="{
                    name: 'domain',
                    params: { domainId: domain.id },
                    hash: '#' + def.key,
                }">
                {{ def.key }}
            </router-link>
            <router-link
                v-if="domain.getErrors().length"
                class="sidebar__section"
                :to="{
                    name: 'domain',
                    params: { domainId: domain.id },
                    hash: '#errors',
                }">
                Errors
            </router-link>
        </template>
    </div>
</template>

<script>
module.exports = {

    props: {
        domain: { type: Object, required: true },
    },

    data() {
        return {
            showTypes: false,
        };
    },

    computed: {

        active() {
            return this.$route.params.domainId === this.domain.id;
        },

        sortedTypes() {
            const types = this.domain.getTypes();
            return [].concat(types).sort((a, b) => a.key > b.key ? 1 : -1);
        },

    },

};
</script>

<style>
.sidebar__link {
    display: block;
    padding: .25em 1rem;
    color: var(--ui-primary);
    border-radius: var(--border-radius);
}

.sidebar__link.router-link-active {
    color: var(--ui-primary--inverse);
    background: var(--ui-primary);
}

.sidebar__section {
    display: block;
    margin-left: 2rem;

    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
}

.sidebar__sublink {
    display: block;
    margin-left: 2rem;
    color: var(--ui-muted);
    font-size: 12px;
}

.sidebar__sublink.router-link-active {
    color: var(--heading-color);
}
</style>