'use strict';

module.exports = {
    $id: 'https://ub.io/protocol/',
    domains: {
        Generic: require('./generic'),
        FlightBooking: require('./flight-booking'),
    },
};
