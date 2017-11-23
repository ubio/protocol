<template>
    <div class="layout">
        <div class="layout__header">
            <div class="layout__header-container container">
                <router-link
                    class="layout__logo"
                    :to="{ name: 'home' }"
                    title="ubio Automation Protocol Reference"
                    exact>
                    <img
                        src="/protocol/img/ubio-logo.png"
                        height="40"/>
                </router-link>
                <div class="layout__header-links">
                    <a target="_blank"
                        class="layout__header-link"
                        href="https://docs.automationcloud.net">
                        Documentation
                    </a>
                </div>
            </div>
        </div>
        <div class="layout__content">
            <div class="layout__content-container container">
                <sidebar/>
                <div class="layout__main">
                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {

    components: {
        sidebar: require('./sidebar.vue'),
    },

};
</script>

<style>
.layout {
    display: flex;
    flex-flow: column nowrap;
}

.layout__header {
    flex: 0 0 auto;
    border-bottom: 5px solid var(--ui-primary);
}

.layout__header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
}

.layout__header-link {
    color: var(--ui-muted);
}

.layout__content {
    flex: 1;
    display: flex;
}

.layout__content-container {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
}

.layout__main {
    flex: 1;
    padding: 1em 4em;
}

</style>
