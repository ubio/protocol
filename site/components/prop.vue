<template>
    <div class="prop">
        <div class="prop__id">
            {{ id }}
        </div>
        <div class="prop__body">
            <div class="prop__type">
                <schema-type :spec="prop"/>
            </div>
            <div class="prop__optional"
                v-if="!required">
                optional
            </div>
            <div
                class="prop__description"
                v-if="prop.description"
                v-html="prop.description">
            </div>
            <div
                class="prop__default"
                v-if="prop.default !== undefined">
                <strong>Default value:</strong> <val :value="prop.default"/>
            </div>
            <div
                class="prop__example"
                v-if="prop.example !== undefined">
                <strong>Example:</strong> <code>{{ prop.example }}</code>
            </div>
            <div class="prop__enum"
                 v-if="prop.enum">
                Allowed values:
                {{ prop.enum.join(', ') }}
            </div>
        </div>
    </div>
</template>

<script>
import Val from './val.vue';
import SchemaType from './schema-type.vue';

export default {

    components: {
        Val,
        SchemaType,
    },

    props: {
        id: { type: String, required: true },
        prop: { type: Object, required: true },
        parent: { type: Object, required: true }
    },

    computed: {

        required() {
            const required = this.parent.spec.required || [];
            return required.includes(this.id);
        }

    }

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
    flex: 0 0 var(--column__width);
}

.prop__body {
    flex: 1;
}

.prop__optional {
    color: var(--ui-muted);
}
</style>
