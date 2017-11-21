'use strict';

module.exports = {
    $id: 'https://ub.io/protocol/schema',
    domains: {
        Generic: require('./generic'),
        FlightBooking: require('./flight-booking'),
        Internal: require('./internal'),
    },
};
