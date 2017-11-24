'use strict';

module.exports = {
    deepClone,
};

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}
