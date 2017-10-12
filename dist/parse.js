'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ParseFlowConfig = ParseFlowConfig;
exports.ParseFlowConfigFromFile = ParseFlowConfigFromFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// =============================================================================
// Constants
// =============================================================================


// =============================================================================
// Imports
// =============================================================================
var separator = '####################################';

var RegExps = {
    comments: /#[^\n]*/g,
    sections: /\[(include|ignore|libs|lints|options|version)\]/g,
    sectionLines: /[^\n]*/g
};

// =============================================================================
// ParseFlowConfig
// =============================================================================
function ParseFlowConfig(content) {
    var sectionNames = [];

    var sectionContents = content
    // remove comments
    .replace(RegExps.comments, function (match) {
        return '';
    })
    // find sections
    .replace(RegExps.sections, function (match, name) {
        sectionNames.push(name);

        return separator;
    })
    // split sections
    .split(separator);

    sectionContents.shift();

    var sections = _lodash2.default.zipObject(sectionNames, sectionContents);

    return _lodash2.default.mapValues(sections, parseSection);
}

// =============================================================================
// ParseFlowConfigFromFile
// =============================================================================
function ParseFlowConfigFromFile(filePath) {
    var content = _fs2.default.readFileSync(filePath).toString();

    return ParseFlowConfig(content);
}

// =============================================================================
// parseSection
// =============================================================================
function parseSection(content) {
    var lines = [];

    content.replace(RegExps.sectionLines, function (match) {
        match && lines.push(match.trim());

        return match;
    });

    return lines.map(parseLine);
}

// =============================================================================
// parseLine
// =============================================================================
function parseLine(content) {
    var option = content.split('=');

    option[1] = parseOption(option[1]);

    if (!option[1]) return option[0];

    return option;
}

// =============================================================================
// parseOption
// =============================================================================
function parseOption(content) {
    if (!content) return '';

    var optionValues = content.split('->').map(function (val) {
        return val.trim();
    });

    if (optionValues.length === 1) return optionValues[0];

    return optionValues;
}