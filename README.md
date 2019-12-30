# ubio Automation Protocol

## Terminology

**Domain** is a collection of input, output and type definitions. Domains are uniquely identified by `id` which is a PascalCase string. Example: `FlightBooking`.

**Definition** is a JSON Schema object, uniquely identified by `id`, which consists of domain `id` and definition `key`, separated with dot. Example: `Generic.Price`.

Definitions also have `$id` attribute which is a fragment identifier used to uniquely reference definitions in JSON Schema validation. Example: `#Generic.Price`.
