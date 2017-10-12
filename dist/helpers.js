'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReplaceEachValue = ReplaceEachValue;


// =============================================================================
// ReplaceEachValue
// =============================================================================
function ReplaceEachValue(config, test, replacement) {
    for (var i in config) {
        ReplaceValue(config[i], test, replacement);
    }
}

// =============================================================================
// ReplaceValue
// =============================================================================
function ReplaceValue(option, test, replacement) {
    if (typeof option === 'string') return option.replace(test, replacement);

    for (var k = option.length; k--;) {
        option[k] = ReplaceValue(option[k], test, replacement);
    }

    return option;
}