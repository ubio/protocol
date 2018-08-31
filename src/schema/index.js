'use strict';

module.exports = {
    $id: 'https://protocol.automationcloud.net/schema.json',
    domains: {
        Generic: require('./generic'),
        FlightBooking: require('./flight-booking'),
        CoachBooking: require('./coach-booking'),
        VacationRental: require('./vacation-rental'),
        MotorInsurance: require('./motor-insurance'),
        LoanApplication: require('./loan-application'),
        EventBooking: require('./event-booking'),
        BroadbandSignup: require('./broadband-signup'),
        Internal: require('./internal'),
        FlightBookingExtraction: require('./flight-booking-extraction.json'),
    },
};
