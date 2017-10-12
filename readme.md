# Flowconfig


```js
import {
    ParseFlowConfig,
    ParseFlowConfigFromFile,
    ExtendFlowConfig,
    ExtendFlowConfigFromFiles,
    PrintFlowConfig,
    PrintFlowConfigToFile,
    GenerateFlowConfigFromFiles,
} from 'flowconfig';

// Constants
// --------------------------------------------------------
const FlowConfigContent1 = `
[options]
esproposal.class_static_fields=enable
esproposal.class_instance_fields=enable
`;

const FlowConfigContent2 = `
[options]
esproposal.export_star_as=enable
`;


// Returns flowconfig object
// --------------------------------------------------------
var config = ParseFlowConfig( FlowConfigContent1 );
// or
var config = ParseFlowConfigFromFile( '/path/to/.flowconfig' );


// Extend target config with other configs
// --------------------------------------------------------
var extendedConfig =
        ExtendFlowConfig(
            FlowConfigContent1,
            FlowConfigContent2,
            ...
        );
// or
var extendedConfig =
        ExtendFlowConfigFromFiles(
            '/path/to/.flowconfig1',
            '/path/to/.flowconfig2',
            ...
        );


// Prints config
// --------------------------------------------------------
const configContent = PrintFlowConfig( config );
// or
PrintFlowConfigToFile( '/path/to/.flowconfig', config );


// Generates new flowconfig from others
// --------------------------------------------------------

// with relative paths to targetPath
GenerateFlowConfigFromFiles({
    targetPath: '/path/to/.flowconfig',
    configPaths: [
        '/path/to/some/.flowconfig',
        '/path/to/some/other/.flowconfig',
        ...
    ]
});

// generate as is
GenerateFlowConfigFromFiles({
    targetPath: '/path/to/.flowconfig',
    configPaths: [
        '/path/to/some/.flowconfig',
        '/path/to/some/other/.flowconfig',
        ...
    ],
    replacePathsProjectRoot: false
});
```
