import assert from 'assert';

import { protocol } from '../protocol';

const HotelBooking = protocol.getDomain('HotelBooking')!;

describe('HotelBooking', () => {

    describe('Rooms', () => {

        it('should accept valid selectedRooms', async () => {
            const { valid, errors } = await HotelBooking.validate('Rooms', [{
                type: 'nhow room with river view',
                price: {
                    value: 57000,
                    currencyCode: 'eur'
                },
                cancellation: {
                    code: 'non-refundable',
                    details: {
                        type: 'Text',
                        text: 'Your reservation cannot be cancelled or modified free of charge.\n\nCancellation, modification or non-arrival fee is equal to 90.00% of your stay.'
                    }
                },
                valueAdditions: [
                    'free-internet'
                ]
            }]);
            assert.ok(valid);
            assert.equal(errors!.length, 0);
        });
    });
});
