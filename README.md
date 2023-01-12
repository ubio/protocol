# ubio Automation Protocol

## Terminology

**Domain** is a collection of input, output and type definitions. Domains are uniquely identified by `id` which is a PascalCase string. Example: `FlightBooking`.

**Definition** is a JSON Schema object, uniquely identified by `id`, which consists of domain `id` and definition `key`, separated with dot. Example: `Generic.Price`.

Definitions also have `$id` attribute which is a fragment identifier used to uniquely reference definitions in JSON Schema validation. Example: `#Generic.Price`.

## Quick Start

To make changes to protocol `src/schema/` files need to be updated and `schema.json` regenerated.

Since current codebase may be not compatible with the recent version of nodejs, you may need `docker-compose.yml` to test changes locally.

Build `./public` static files:

    $ docker-compose run build

Run `nginx` and open browser to test it:

    $ docker-compose up nginx -d
    $ open 'http://localhost:8080/'

Shut down and cleanup when done:

    $ docker-compose down

Good luck!
