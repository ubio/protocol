'use strict';

module.exports = {
    $id: 'https://protocol.automationcloud.net/schema.json',
    domains: {
        Generic: require('./generic'),
        FlightBooking: require('./flight-booking'),
        VacationRental: require('./vacation-rental'),
        AutomobileInsurance: require('./automobile-insurance'),
        Internal: require('./internal'),
    },
};
