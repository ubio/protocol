'use strict';

module.exports = function createExample(protocol, spec, visitedRefs = new Set()) {
    if (spec.$ref) {
        if (visitedRefs.has(spec.$ref)) {
            return undefined;
        }
        visitedRefs.add(spec.$ref);
        const typeDef = protocol.resolveTypeRef(spec.$ref);
        return typeDef ? createExample(protocol, typeDef.spec, visitedRefs) : null;
    }
    if (spec.oneOf) {
        return createExample(protocol, spec.oneOf[0], visitedRefs);
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
            for (const key of Object.keys(spec.properties || {})) {
                obj[key] = createExample(protocol, spec.properties[key], visitedRefs);
            }
            return obj;
        case 'array':
            const arr = [];
            const items = Array.isArray(spec.items) ? spec.items : [spec.items];
            for (const item of items) {
                arr.push(createExample(protocol, item, visitedRefs));
            }
            return arr;
        default:
            return null;
    }
};
