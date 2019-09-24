<template>
    <div class="error-oneliner"
         :class="{
             'error-oneliner--active': active,
         }"
         :id="error.code">
        <div class="error-oneliner__term">
            <span class="error-oneliner__code">{{ error.code }}</span>
            <img
                src="/img/link.svg"
                class="error-oneliner__link"
                @click="permalink"/>
        </div>
        <div class="error-oneliner__body">
            <div class="error-oneliner__description"
                 v-html="error.description">
            </div>
            <div
                class="error-oneliner__example"
                v-if="error.example !== undefined">
                <strong>Example:</strong> <code>{{ error.example }}</code>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {

    props: {
        error: { type: Object, required: true }
    },

    computed: {

        active() {
            return this.$route.hash === ('#' + this.error.code);
        }

    },

    methods: {

        permalink() {
            this.$router.replace('#' + this.error.code);
        }

    }

};
</script>

<style>
.error-oneliner {
    display: flex;
    flex-flow: row nowrap;
    padding: .5em;
}

.error-oneliner--active {
    background: var(--ui-highlight);
}

.error-oneliner + .error-oneliner {
    border-top: 1px solid var(--ui-default);
}

.error-oneliner__term {
    flex: 0 0 var(--column__width);
}

.error-oneliner__link {
    display: inline-block;
    visibility: hidden;
    cursor: pointer;
    z-index: 1;
    width: 16px;
    height: 16px;
    opacity: .5;
    vertical-align: middle;
}

.error-oneliner:hover .error-oneliner__link,
.error-oneliner--active .error-oneliner__link {
    visibility: visible;
}

</style>
