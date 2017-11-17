'use strict';

const schema = module.exports = {
    $id: 'https://ub.io/protocol/',
    domains: {
        Generic: require('./generic'),
        FlightBooking: require('./flight-booking'),
        Test: require('./test'),
    },
};

// Generate $id on domains and defs
for (const domainId of Object.keys(schema.domains)) {
    const domain = schema.domains[domainId];
    domain.$id = '#' + domainId;

    for (const ns of ['inputs', 'outputs', 'types']) {
        for (const key of Object.keys(domain[ns])) {
            const def = domain[ns][key];
            def.$id = '#' + domainId + '.' + key;
        }
    }
}
