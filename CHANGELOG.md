## [UNRELEASED]

- API change: `createInputsFromObject` -> `prepareInputs`, accept `applyDefaults` param.

## [0.9.0] - 2017-11-24

- Add `default` to input defintion
- Add `Domain.createInputsFromObject`

## [0.8.0] - 2017-11-23

- Branding for static site
- Add `private` flag to `Internal` domain

## [0.7.1] - 2017-11-21

- Fix `hasHoldLuggage` requirement

## [0.7.0] - 2017-11-21

- Massive change APIs to full OOP
- Schema excerpts are moved to `def.spec`
- Internal Def fields like `id`, `key` are made public
- Allow for arbitrary metadata on `inputs` and `outputs`, because they are no longer JSON Schema definitions

## [0.6.1] - 2017-11-20

- Enforce `type` keyword on all type definitions

## [0.6.0] - 2017-11-20

- Extract `panToken` from `Payment`
- Add price consent and `panToken` to `Internal` domain

## [0.5.0] - 2017-11-17

- Add `domain.validate` to public API

## [0.4.1] - 2017-11-17

- Fix broken ref in `Internal`

## [0.4.0] - 2017-11-17

- `Test` -> `Internal`

## [0.3.0] - 2017-11-17

- Added draft-06 to meta schema

## [0.2.3] - 2017-11-17

- Separate `Payment.address` into `Payment.address` and `Payment.person`

## [0.2.2] - 2017-11-17

- FlightBooking: hasHoldLuggage -> addAdditionalLuggage
- Some unit tests

## [0.2.1] - 2017-11-17

- Finished initial FlightBooking domain

## [0.2.0] - 2017-11-17

- Draft class-based API, including consumer-friendly validation

## [0.1.0] - 2017-11-17

- Implement proper class-based API (essentials only)

## [0.0.1] - 2017-11-16

- Publish `schema.json` to GH pages
- Amend `getDef` to accept `domain` and `key` separately

## 0.0.1

- Initial release (warning: has some broken refs, doesn't really intended to work yet)
