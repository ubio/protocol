'use strict';

module.exports = function createExample(protocol, spec) {
    if (spec.$ref) {
        const typeDef = protocol.resolveTypeRef(spec.$ref);
        return typeDef ? createExample(protocol, typeDef.spec) : null;
    }
    if (spec.oneOf) {
        return createExample(protocol, spec.oneOf[0]);
    }
    switch (spec.type) {
        case 'string':
            if (spec.example) {
                return spec.example;
            }
            if (spec.enum) {
                return spec.enum[0];
            }
            return '';
        case 'boolean':
            return false;
        case 'integer':
        case 'number':
            if (spec.example) {
                return parseInt(spec.example);
            }
            if (spec.minimum) {
                return spec.minimum;
            }
            return 0;
        case 'object':
            const obj = {};
            for (const key of Object.keys(spec.properties)) {
                obj[key] = createExample(protocol, spec.properties[key]);
            }
            return obj;
        case 'array':
            const arr = [];
            const items = Array.isArray(spec.items) ? spec.items : [spec.items];
            for (const item of items) {
                arr.push(createExample(protocol, item));
            }
            return arr;
        default:
            return null;
    }
};
