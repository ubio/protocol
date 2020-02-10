import Generic from './generic.json';
import Internal from './internal.json';
import FlightBooking from './flight-booking.json';
import CoachBooking from './coach-booking.json';
import VacationRental from './vacation-rental.json';
import MotorInsurance from './motor-insurance.json';
import LoanApplication from './loan-application.json';
import EventBooking from './event-booking.json';
import BroadbandSignup from './broadband-signup.json';
import BroadbandSignupAU from './broadband-signup-au.json';
import HotelBooking from './hotel-booking.json';
import TestHotelBooking from './test-hotel-booking.json';
import HolidayBooking from './holiday-booking.json';
import ElectronicTravelAuthorisation from './electronic-travel-authorisation.json';
import FlightBookingExtraction from './flight-booking-extraction.json';
import HotelBookingExtraction from './hotel-booking-extraction.json';
import MotorInsuranceExtraction from './motor-insurance-extraction.json';
import PetInsurance from './pet-insurance.json';
import MobileSignup from './mobile-signup.json';
import FlightBookingManagement from './flight-booking-management.json';

export const schema = {
    $id: 'https://protocol.automationcloud.net/schema.json',
    domains: {
        Generic,
        FlightBooking,
        CoachBooking,
        VacationRental,
        MotorInsurance,
        LoanApplication,
        EventBooking,
        BroadbandSignup,
        BroadbandSignupAU,
        HotelBooking,
        TestHotelBooking,
        HolidayBooking,
        ElectronicTravelAuthorisation,
        Internal,
        FlightBookingExtraction,
        HotelBookingExtraction,
        MotorInsuranceExtraction,
        PetInsurance,
        MobileSignup,
        FlightBookingManagement,
    }
};