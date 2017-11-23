<template>
    <div class="layout">
        <div class="layout__header">

        </div>
        <div class="layout__content">
            <div class="layout__sidebar">
                <router-link
                    class="layout__sidebar-link"
                    :to="{ name: 'home' }"
                    exact>
                    Home
                </router-link>
                <router-link
                    class="layout__sidebar-link"
                    v-for="domain in domains"
                    :to="{
                        name: 'domain',
                        params: { domainId: domain.id }
                    }">
                    {{ domain.id }}
                </router-link>
            </div>
            <div class="layout__main">
                <router-view>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
const protocol = require('../../src');

module.exports = {

    data() {
        return {
            domains: protocol.getDomains()
                .filter(d => !d.spec.private),
        };
    },

};
</script>

<style>
.layout__content {
    display: flex;
    flex-flow: row no-wrap;
}

.layout__sidebar {
    flex: 0 0 160px;
    background: var(--ui-default);
    overflow-y: auto;
}

.layout__main {
    flex: 1;
    padding: 1em 4em;
    overflow: auto;
}

.layout__sidebar-link {
    display: block;
    padding: .5em;
    color: var(--ui-primary);
}

.layout__sidebar-link.router-link-active {
    color: var(--ui-primary--inverse);
    background: var(--ui-primary);
}
</style>
