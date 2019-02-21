<template>
    <div class="sidebar">
        <div class="sidebar__sticky">
            <sidebar__domain
                v-for="domain in domains"
                :domain="domain"/>
        </div>
    </div>
</template>

<script>
module.exports = {

    components: {
        'sidebar__domain': require('./sidebar__domain.vue'),
    },

    computed: {

        domains() {
            return this.$protocol.getDomains().filter(d => !d.spec.private);
        },

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
    max-height: calc(100vh - 20px);
    overflow-y: auto;
}
</style>