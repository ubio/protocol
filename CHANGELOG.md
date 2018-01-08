## [UNRELEASED]


## [1.6.0] - 2018-1-8

- Add `EventBooking` domain
- Add support for `oneOf` in docs and examples

## [1.5.0] - 2017-12-20

- Add `MotorInsurance` domain
- Remove `experimental` flags

## [1.4.0] - 2017-12-19

- Add `additionalProperties: false` to most definitions, except for Options

## [1.3.1] - 2017-12-19

- Make sure `private` exists in all domains :/

## [1.3.0] - 2017-12-18

- Add cache busting for static content
- Remove `Domain.prepareInputs` method

## [1.2.2] - 2017-12-18

- Add example of initial input
- Make examples deterministic (no random enum value)

## [1.2.1] - 2017-12-15

- Add `guestAges` to `VacationRental`

## [1.2.0] - 2017-12-15

- Add `VacationRental` domain

## [1.1.2] - 2017-12-15

- Add `initial` labels to inputs which are expected to be provided
  when the job is created

## [1.1.1] - 2017-12-14

- Add more defs to `Internal`
- Fix static website issues
- Fix `fetchLatest` when cached
- Fix autorefresh bug
- Change option names in `ProtocolProvider`

## [1.0.0] - 2017-12-14

- Implement `ProtocolProvider`
- Change exports of main module

## [0.17.0] - 2017-12-13

- `PassengerId` -> `PassengerDocument`, expand definitions

## [0.16.0] - 2017-12-12

- Change `SeatId` to `SeatNumber`, amend references

## [0.15.3] - 2017-12-7

- Add `SeatId` type
- Add data examples

## [0.15.0] - 2017-12-7

- Staged inputs/outputs are now objects, not arrays

## [0.14.0] - 2017-12-6

- PoC seat selection schema
- Introduced `staged` parameter to input/output definitions

## [0.13.2] - 2017-11-30

- Drop `/options/fareSelection` flag

## [0.13.0] - 2017-11-30

- `fareFamily` -> `fareName`

## [0.12.0] - 2017-11-29

- `/flight/from` -> `/itinerary/outbound/origin`
- `/flight/to` -> `/itinerary/outbound/destination`
- `/flight/return/from` -> `/itinerary/inbound/origin`
- `/flight/return/to` -> `/itinerary/inbound/destination`
- `/flight/cabinClass` -> `/itinerary/cabinClass`

## [0.11.0] - 2017-11-28

- `Seat.available` is mandatory
- `Seat.seatNumber` -> `Seat.seatId`
- `selectedSeats` -> `selectedSeatIds`

## [0.10.0] - 2017-11-28

- Add `/FlightBooking/options/fareSelection`
- Prototype schema for seat selection (unconfirmed)
- Prototype schema for fare selection (unconfirmed)

## [0.9.1] - 2017-11-24

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
