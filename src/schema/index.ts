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
import BroadbandSignupUS from './broadband-signup-us.json';
import BroadbandSignupES from './broadband-signup-es.json';
import HotelBooking from './hotel-booking.json';
import TestHotelBooking from './test-hotel-booking.json';
import HotelPriceCrawling from './hotel-price-crawling.json';
import PropertyBooking from './property-booking.json';
import HolidayBooking from './holiday-booking.json';
import ElectronicTravelAuthorisation from './electronic-travel-authorisation.json';
import FlightBookingExtraction from './flight-booking-extraction.json';
import HotelBookingExtraction from './hotel-booking-extraction.json';
import MotorInsuranceExtraction from './motor-insurance-extraction.json';
import PetInsurance from './pet-insurance.json';
import MobileSignup from './mobile-signup.json';
import TrainBooking from './train-booking.json';
import TravelTicketRetrieval from './travel-ticket-retrieval.json';
import FlightBookingStatus from './flight-booking-status.json';
import FlightBookingRefund from './flight-booking-refund.json';
import FlightBookingManagement from './flight-booking-management.json';
import ContestSignup from './contest-signup.json';

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
        BroadbandSignupUS,
        BroadbandSignupES,
        HotelBooking,
        TestHotelBooking,
        HotelPriceCrawling,
        PropertyBooking,
        HolidayBooking,
        ElectronicTravelAuthorisation,
        Internal,
        FlightBookingExtraction,
        HotelBookingExtraction,
        MotorInsuranceExtraction,
        PetInsurance,
        MobileSignup,
        TrainBooking,
        TravelTicketRetrieval,
        FlightBookingStatus,
        FlightBookingRefund,
        FlightBookingManagement,
        ContestSignup,
    }
};
