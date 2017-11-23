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
            <div class="sidebar__types">
                <div
                    class="sidebar__type"
                    v-for="def of sortedTypes">
                    <router-link
                        class="sidebar__sublink"
                        :to="{
                            name: 'domain',
                            params: { domainId: domain.id },
                            hash: '#' + def.key,
                        }">
                        {{ def.key }}
                    </router-link>
                </div>
            </div>
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
    padding: .25em .5em;
    color: var(--ui-primary);
    border-radius: var(--border-radius);
}

.sidebar__link.router-link-active {
    color: var(--ui-primary--inverse);
    background: var(--ui-primary);
}

.sidebar__sublink {
    display: block;
    margin-left: 1em;
    color: var(--ui-muted);
    font-size: 12px;
}

.sidebar__sublink.router-link-active {
    color: var(--heading-color);
}
</style>