'use strict';

const protocol = require('../src');
const expect = require('expect');

const Internal = protocol.getDomain('Internal');

describe('Domain', () => {

    describe('createInputsFromObject', () => {

        it('parses and validate object', async () => {
            const inputs = await Internal.createInputsFromObject({
                url: 'http://example.com',
                foo: 42,
                options: {},
            });
            expect(inputs.length).toEqual(3);
            const url = inputs.find(i => i.key === 'url');
            expect(url).toExist();
            expect(url.key).toEqual('url');
            expect(url.data).toEqual('http://example.com');
            expect(url.valid).toEqual(true);
            expect(url.errors).toEqual(null);
            const options = inputs.find(i => i.key === 'options');
            expect(options).toExist();
            expect(options.key).toEqual('options');
            expect(options.data).toEqual({ flag: false });
            expect(options.valid).toEqual(true);
            expect(options.errors).toEqual(null);
            const foo = inputs.find(i => i.key === 'foo');
            expect(foo).toExist();
            expect(foo.key).toEqual('foo');
            expect(foo.data).toEqual(42);
            expect(foo.valid).toEqual(false);
            expect(foo.errors).toExist();
        });

        it('applies default inputs', async () => {
            const inputs = await Internal.createInputsFromObject({
                url: 'http://example.com',
            });
            expect(inputs.length).toEqual(2);
            const options = inputs.find(i => i.key === 'options');
            expect(options).toExist();
            expect(options.key).toEqual('options');
            expect(options.data).toEqual({ flag: false });
            expect(options.valid).toEqual(true);
            expect(options.errors).toEqual(null);
        });

    });

});
