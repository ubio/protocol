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
        HotelBooking: require('./hotel-booking'),
        TestHotelBooking: require('./test-hotel-booking'),
        HolidayBooking: require('./holiday-booking.json'),
        ElectronicTravelAuthorisation: require('./electronic-travel-authorisation.json'),
        Internal: require('./internal'),
        FlightBookingExtraction: require('./flight-booking-extraction.json'),
        HotelBookingExtraction: require('./hotel-booking-extraction.json'),
        MotorInsuranceExtraction: require('./motor-insurance-extraction.json'),
        PetInsurance: require('./pet-insurance.json'),
        MobileSignup: require('./mobile-signup.json'),
        FlightBookingManagement: require('./flight-booking-management.json')
    }
};
