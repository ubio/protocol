import Ajv from 'ajv';
import { Def } from './defs';

export const DEFAULT_OPTIONS: Ajv.Options = {
    allErrors: true,
    useDefaults: true,
    jsonPointers: true,
    format: 'full'
};

export function createValidator(schema: any, defs: Def[], options: Ajv.Options = DEFAULT_OPTIONS) {
    const ajv = new Ajv(options);
    const schemaId = schema.$id || 'untitled';
    ajv.addSchema(schema, schemaId);
    for (const def of defs) {
        const typeRef = def.getTypeRef();
        if (typeRef) {
            ajv.addSchema({ $ref: schemaId + typeRef }, def.id);
        }
    }
    return ajv;
}

export interface ValidationResult {
    valid: boolean;
    errors: Ajv.ErrorObject[] | null;
}
