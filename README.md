# ubio Automation Protocol

_Note: This repository is under active development. Please expect breaking changes in v0.x.x releases._

## Terminology

**Domain** is a colection of input, output and type definitions. Domains are uniquely identified by `id` which is a PascalCase string. Example: `FlightBooking`.

**Definition** is a JSON Schema object, uniquely identified by `id`, which consists of domain `id` and definition `key`, separated with dot. Example: `Generic.Price`.

Definitions also have `$id` attribute which is a fragment identifier used to uniquely reference definitions in JSON Schema validation. Example: `#Generic.Price`.

## Public API

### protocol.getDomains(): Array<Domain>

Returns an array of all `Domain` instances supported by protocol.

### protocol.getDomain(id: String): Domain?

Returns `Domain` instance with specified `id`, or `null` if no such domain exists.

### protocol.getDef(domainId: String, key: String): Def?

Returns `Def` instance by specified `domainId` and `key`, or `null` if no such definition exists.

### async protocol.validate(domainId: String, key: String, object: Any): { valid: Boolean, errors: Array? }

Validates specified `object` against definition JSON schema.

Definition is resolved by definition `domainId` and `key`.

If object is invalid, `errors` will contain an array of errors in AJV-compatible format.

### domain.getInputs(): Array<Def>

Returns all input definitions of domain.

### domain.getOutputs(): Array<Def>

Returns all output definitions of domain.

### domain.getTypes(): Array<Def>

Returns all type definitions of domain.

### domain.getDefs(): Array<Def>

Returns all definitions of domain.

### domain.getDef(key: String): Array<Def>

Returns `Def` instance belonging to this domain by `key`, or `null` if no such definition exists.

### async domain.validate(key: String, object: Any): { valid: Boolean, errors: Array? }

Validates specified `object` against definition JSON schema.

Definition is resolved by definition `key` within this domain.

If object is invalid, `errors` will contain an array of errors in AJV-compatible format.

### def.validate(object): { valid: Boolean, errors: Array? }

Validates specified `object` against definition JSON schema.

If object is invalid, `errors` will contain an array of errors in AJV-compatible format.
