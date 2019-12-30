import { Protocol } from './protocol';

import jsonPointer from 'jsonpointer';
import { InputDef, OutputDef, TypeDef, Def } from './defs';
import { ValidationResult } from './validator';

export class Domain {
    spec: any;
    inputs: InputDef[];
    outputs: OutputDef[];
    types: TypeDef[];
    errors: ErrorDescriptor[];
    defs: Def[];

    constructor(
        public protocol: Protocol,
        public id: string,
    ) {
        this.spec = protocol.schema.domains[id];

        this.inputs = this._collectInputs();
        this.outputs = this._collectOutputs();
        this.types = this._collectTypes();
        this.errors = this._collectErrors() || [];
        this.defs = ([] as Def[])
            .concat(this.inputs)
            .concat(this.outputs)
            .concat(this.types);
    }

    getInputs() {
        return this.inputs;
    }

    getOutputs() {
        return this.outputs;
    }

    getTypes() {
        return this.types;
    }

    getErrors() {
        return this.errors;
    }

    getDefs() {
        return this.defs;
    }

    getDef(key: string) {
        return this.defs.find(def => def.key === key);
    }

    getInputDef(key: string) {
        return this.inputs.find(def => def.key === key);
    }

    getOutputDef(key: string) {
        return this.outputs.find(def => def.key === key);
    }

    getError(code: string) {
        return this.errors.find(error => error.code === code);
    }

    protected _collectInputs() {
        return Object.keys(this.spec.inputs).map(key => new InputDef(this, key));
    }

    protected _collectOutputs() {
        return Object.keys(this.spec.outputs).map(key => new OutputDef(this, key));
    }

    protected _collectTypes() {
        return Object.keys(this.spec.types).map(key => new TypeDef(this, key));
    }

    protected _collectErrors(): ErrorDescriptor[] {
        const errors = this.spec.errors || [];
        return errors.map((error: any) => {
            return {
                domainId: this.id,
                code: error.code,
                category: error.category,
                description: error.description,
            };
        });
    }

    async validate(key: string, data: any): Promise<ValidationResult> {
        const def = this.getDef(key);
        if (!def) {
            return {
                valid: false,
                errors: [
                    {
                        message: `Cannot resolve schema for definition: ${key}`,
                        keyword: '',
                        dataPath: '',
                        schemaPath: `#/domains/${this.id}`,
                        params: {
                            domainId: this.id,
                            key,
                        }
                    }
                ]
            };
        }
        return await def.validate(data);
    }

    async validateInput(key: string, data: any) {
        const def = this.getInputDef(key);
        if (!def) {
            return {
                valid: false,
                errors: [
                    {
                        message: `Unexpected input: ${this.id}.${key}`,
                        domain: this.id,
                        key
                    }
                ]
            };
        }
        return await def.validate(data);
    }

    async validateOutput(key: string, data: any) {
        const def = this.getOutputDef(key);
        if (!def) {
            return {
                valid: false,
                errors: [
                    {
                        message: `Unexpected output: ${this.id}.${key}`,
                        domain: this.id,
                        key
                    }
                ]
            };
        }
        return await def.validate(data);
    }

    getSuccessCodeOutputKey() {
        return this.spec.successCode ? this.spec.successCode.outputKey : null;
    }

    getSuccessCodeValue(outputKey: string, outputData: any = {}) {
        if (!this.spec.successCode || this.spec.successCode.outputKey !== outputKey) {
            return null;
        }

        const pointer = this.spec.successCode.valuePath;
        return jsonPointer.get(outputData, pointer) || null;
    }

}

export interface ErrorDescriptor {
    domainId: string;
    code: string;
    category: string;
    description: string;
}
