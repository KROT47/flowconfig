'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExtendFlowConfig = ExtendFlowConfig;
exports.ExtendFlowConfigFromFiles = ExtendFlowConfigFromFiles;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _parse = require('./parse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// =============================================================================
// ExtendFlowConfig
// =============================================================================


// =============================================================================
// Imports
// =============================================================================
function ExtendFlowConfig(target) {
    var i, k;

    for (var _len = arguments.length, configs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        configs[_key - 1] = arguments[_key];
    }

    for (i = 0; i < configs.length; ++i) {
        var config = configs[i];

        for (k in config) {
            if (!target[k]) {
                target[k] = _lodash2.default.cloneDeep(config[k]);
            } else {
                target[k] = extendOptions(target[k], config[k]);
            }
        }
    }

    return target;
}

// =============================================================================
// ExtendFlowConfigFromFiles
// =============================================================================
function ExtendFlowConfigFromFiles() {
    var args = [];

    for (var _len2 = arguments.length, flowConfigPaths = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        flowConfigPaths[_key2] = arguments[_key2];
    }

    for (var i = 0; i < flowConfigPaths.length; ++i) {
        args.push((0, _parse.ParseFlowConfigFromFile)(flowConfigPaths[i]));
    }

    return ExtendFlowConfig.apply(undefined, [{}].concat(args));
}

// =============================================================================
// extendOptions
// =============================================================================
function extendOptions(target, options) {
    var i, k;

    for (i = 0; i < options.length; ++i) {
        // if ( typeof target === 'string' ) {

        // } else {
        // console.log(target, options, i);
        if (!existsInTarget(target, options[i])) {
            target.push(options[i]);
        }
        // }
    }

    return target;
}

// =============================================================================
// existsInTarget
// =============================================================================
function existsInTarget(target, option) {
    for (var i = target.length; i--;) {
        if (_lodash2.default.isEqual(target[i], option)) return true;
    }

    return false;
}