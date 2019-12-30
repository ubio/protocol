import assert from 'assert';
import { protocol } from '../protocol';

describe('Generic', () => {

    const Generic = protocol.getDomain('Generic')!;

    describe('Address', () => {

        it('should accept valid inlined address', async () => {
            const { valid, errors } = await Generic.validate('Address', {
                line1: '27-31 Clerkenwell Close',
                line2: 'Unit G.03',
                city: 'London',
                postcode: 'EC1R 0AT',
                countryCode: 'gb',
                countrySubdivision: 'London'
            });
            assert.ok(valid);
            assert.equal(errors!.length, 0);
        });

        it('should accept valid explicit address', async () => {
            const { valid, errors } = await Generic.validate('Address', {
                streetName: 'Unit G.03',
                line2: 'Unit G.03',
                city: 'London',
                postcode: 'EC1R 0AT',
                countryCode: 'gb',
                countrySubdivision: 'London'
            });
            assert.ok(valid);
            assert.equal(errors!.length, 0);
        });

        it('should not accept incomplete addresses', async () => {
            const { valid, errors } = await Generic.validate('Address', {
                line2: 'Unit G.03',
                city: 'London',
                postcode: 'EC1R 0AT',
                countryCode: 'gb',
                countrySubdivision: 'London'
            });
            assert.equal(valid, false);
            assert.notEqual(errors!.length, 0);
        });

        it('should not accept additional properties', async () => {
            const { valid, errors } = await Generic.validate('Address', {
                asd: 'qq',
                streetName: 'Unit G.03',
                line2: 'Unit G.03',
                city: 'London',
                postcode: 'EC1R 0AT',
                countryCode: 'gb',
                countrySubdivision: 'London'
            });
            assert.equal(valid, false);
            assert.notEqual(errors!.length, 0);
        });
    });
});
