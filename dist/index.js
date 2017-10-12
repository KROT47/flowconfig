'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GenerateFlowConfigFromFiles = GenerateFlowConfigFromFiles;

var _parse = require('./parse');

Object.keys(_parse).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _parse[key];
        }
    });
});

var _extend = require('./extend');

Object.keys(_extend).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _extend[key];
        }
    });
});

var _print = require('./print');

Object.keys(_print).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _print[key];
        }
    });
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// =============================================================================
// Imports
// =============================================================================


// =============================================================================
// GenerateFlowConfigFromFiles
// =============================================================================
function GenerateFlowConfigFromFiles(_ref) {
    var targetPath = _ref.targetPath,
        configPaths = _ref.configPaths,
        _ref$replacePathsProj = _ref.replacePathsProjectRoot,
        replacePathsProjectRoot = _ref$replacePathsProj === undefined ? true : _ref$replacePathsProj;

    var config;

    if (replacePathsProjectRoot) {
        var configs = [];

        for (var i = 0; i < configPaths.length; ++i) {
            var configPath = _path2.default.resolve(targetPath, configPaths[i]);

            config = (0, _parse.ParseFlowConfigFromFile)(configPath);

            var targetDirName = _path2.default.dirname(targetPath);
            var configDirName = _path2.default.dirname(configPath);
            var configRelPath = _path2.default.relative(targetDirName, configDirName);

            if (configRelPath) {
                (0, _helpers.ReplaceEachValue)(config, /<PROJECT_ROOT>/g, '<PROJECT_ROOT>/' + configRelPath);
            }

            configs.push(config);
        }

        config = _extend.ExtendFlowConfig.apply(undefined, configs);
    } else {
        config = _extend.ExtendFlowConfigFromFiles.apply(undefined, _toConsumableArray(configPaths));
    }

    (0, _print.PrintFlowConfigToFile)(targetPath, config || {});
}

// =============================================================================
// Exports
// =============================================================================