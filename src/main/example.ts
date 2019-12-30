import { Protocol } from './protocol';

export function createExample(protocol: Protocol, spec: any, visitedRefs: string[] = []): any {
    if (spec.example) {
        return spec.example;
    }
    if (spec.$ref) {
        if (visitedRefs.includes(spec.$ref)) {
            return undefined;
        }
        const typeDef = protocol.resolveTypeRef(spec.$ref);
        return typeDef ? createExample(protocol, typeDef.spec, [spec.$ref].concat(visitedRefs)) : null;
    }
    if (spec.oneOf) {
        return createExample(protocol, spec.oneOf[0], visitedRefs);
    }
    const type = Array.isArray(spec.type) ? spec.type[0] : spec.type;
    switch (type) {
        case 'string':
            if (spec.enum) {
                return spec.enum[0];
            }
            return '';
        case 'boolean':
            return false;
        case 'integer':
        case 'number':
            if (spec.example) {
                return parseInt(spec.example, 10);
            }
            if (spec.minimum) {
                return spec.minimum;
            }
            return 0;
        case 'object':
            const obj: any = {};
            for (const key of Object.keys(spec.properties || {})) {
                obj[key] = createExample(protocol, spec.properties[key], visitedRefs);
            }
            return obj;
        case 'array':
            const arr = [];
            const items = Array.isArray(spec.items) ? spec.items : [spec.items];
            for (const item of items) {
                const ex = createExample(protocol, item, visitedRefs);
                if (ex != null) {
                    arr.push(ex);
                }
            }
            return arr;
        default:
            return null;
    }
}
