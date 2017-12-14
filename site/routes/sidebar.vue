<template>
    <div class="sidebar">
        <div class="sidebar__sticky">
            <sidebar__domain v-for="domain in domains"
                             :domain="domain"/>
        </div>
    </div>
</template>

<script>
const { protocol } = require('../../src');

module.exports = {

    components: {
        'sidebar__domain': require('./sidebar__domain.vue'),
    },

    data() {
        return {
            domains: protocol.getDomains()
                .filter(d => !d.spec.private),
        };
    },

};
</script>

<style>
.sidebar {
    flex: 200px 0 0;
    padding: 1em 0;
}

.sidebar__sticky {
    position: sticky;
    top: 20px;
    overflow-y: auto;
}
</style>