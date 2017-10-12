'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Levels;

exports.PrintFlowConfigToFile = PrintFlowConfigToFile;
exports.PrintFlowConfig = PrintFlowConfig;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// =============================================================================
// Imports
// =============================================================================


// =============================================================================
// Constants
// =============================================================================
var Levels = (_Levels = {}, _defineProperty(_Levels, 0, '\n'), _defineProperty(_Levels, 1, '='), _defineProperty(_Levels, 2, ' -> '), _Levels);

// =============================================================================
// PrintFlowConfigToFile
// =============================================================================
function PrintFlowConfigToFile(filePath, config) {
    _fs2.default.writeFileSync(filePath, PrintFlowConfig(config));
}

// =============================================================================
// PrintFlowConfig
// =============================================================================
function PrintFlowConfig(config) {
    var content = [];

    for (var i in config) {
        content.push('[' + i + ']');

        content.push(printOption(config[i]));
    }

    return content.join('\n');
}

function printOption(option) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (typeof option === 'string') {
        return option;
    } else if (Array.isArray(option)) {
        var content = [];

        for (var i = 0; i < option.length; ++i) {
            content.push(printOption(option[i], level + 1));
        }

        return content.join(Levels[level]);
    } else {
        throw Error('Expected array or string but got: ' + (typeof option === 'undefined' ? 'undefined' : _typeof(option)));
    }
}