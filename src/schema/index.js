'use strict';

module.exports = {
    $id: 'https://protocol.automationcloud.net/schema.json',
    domains: {
        Generic: require('./generic'),
        FlightBooking: require('./flight-booking'),
        VacationRental: require('./vacation-rental'),
        MotorInsurance: require('./motor-insurance'),
        Internal: require('./internal'),
    },
};
