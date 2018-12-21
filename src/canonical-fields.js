'use strict';

module.exports = function getCanonicalFields(typeDef) {
    if (typeDef && typeDef.spec) {
        if (typeDef.spec.type === 'array' && typeDef.spec.items['$ref']) {
            const childTypeDef = typeDef.domain.protocol.resolveTypeRef(typeDef.spec.items['$ref']);

            return getCanonicalFields(childTypeDef);
        }
        return typeDef.spec.canonicalFields;
    }
};
