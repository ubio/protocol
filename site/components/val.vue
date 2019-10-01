<template>
    <code>{{ valueToString }}</code>
</template>

<script>
module.exports = {

    props: {
        value: {}
    },

    computed: {

        valueToString() {
            const { value } = this;
            if (typeof value === 'undefined') {
                return null;
            }
            if (value === null) {
                return 'null';
            }
            if (value === '') {
                return '(empty string)';
            }
            if (typeof value === 'object') {
                return JSON.stringify(value);
            }
            return String(value);
        }

    }

};
</script>

<style>
</style>
