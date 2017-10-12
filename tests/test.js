/* @flow */

// =============================================================================
// Imports
// =============================================================================
import FS from 'fs';

import {
    ParseFlowConfigFromFile,
    ExtendFlowConfigFromFiles,
    PrintFlowConfigToFile,
    GenerateFlowConfigFromFiles,
} from '../dist';


// =============================================================================
// Constnts
// =============================================================================
const execDir = `${ __dirname }/exec`;
const dataDir = `${ __dirname }/data`;
const resultSamplesDir = `${ __dirname }/result-samples`;

const Paths = {
    getFlowConfig1: dir => `${ dir }/.flowconfig1`,
    getFlowConfig2: dir => `${ dir }/.flowconfig2`,
    getFlowConfigParsed: dir => `${ dir }/.flowconfig-parsed`,
    getFlowConfigExtended: dir => `${ dir }/.flowconfig-extended`,
    getFlowConfigPrinted: dir => `${ dir }/.flowconfig-printed`,
    getFlowConfigGenerated: dir => `${ dir }/.flowconfig-generated`,
    getFlowConfigGeneratedAsIs: dir => `${ dir }/.flowconfig-generated-as-is`,
};


// =============================================================================
// Parse
// =============================================================================
const parsed = ParseFlowConfigFromFile( Paths.getFlowConfig1( dataDir ) );

writeFlowconfigObjToFile( Paths.getFlowConfigParsed( execDir ), parsed );

filesAreEqual(
    Paths.getFlowConfigParsed( execDir ),
    Paths.getFlowConfigParsed( resultSamplesDir ),
    'Parse error'
);


// =============================================================================
// Extend
// =============================================================================
const extended =
        ExtendFlowConfigFromFiles(
            Paths.getFlowConfig1( dataDir ),
            Paths.getFlowConfig2( dataDir )
        );

writeFlowconfigObjToFile( Paths.getFlowConfigExtended( execDir ), extended );

filesAreEqual(
    Paths.getFlowConfigExtended( execDir ),
    Paths.getFlowConfigExtended( resultSamplesDir ),
    'Extend error'
);


// =============================================================================
// Print
// =============================================================================
PrintFlowConfigToFile( Paths.getFlowConfigPrinted( execDir ), extended );

filesAreEqual(
    Paths.getFlowConfigPrinted( execDir ),
    Paths.getFlowConfigPrinted( resultSamplesDir ),
    'Print error'
);


// =============================================================================
// Generate
// =============================================================================
GenerateFlowConfigFromFiles({
    targetPath: Paths.getFlowConfigGenerated( execDir ),
    configPaths: [
        Paths.getFlowConfigPrinted( execDir ),
        Paths.getFlowConfig2( dataDir ),
    ],
});

filesAreEqual(
    Paths.getFlowConfigGenerated( execDir ),
    Paths.getFlowConfigGenerated( resultSamplesDir ),
    'Generate error'
);


// =============================================================================
// Generate without paths rewrite
// =============================================================================
GenerateFlowConfigFromFiles({
    targetPath: Paths.getFlowConfigGeneratedAsIs( execDir ),
    configPaths: [
        Paths.getFlowConfigPrinted( execDir ),
        Paths.getFlowConfig2( dataDir ),
    ],
    replacePathsProjectRoot: false,
});

filesAreEqual(
    Paths.getFlowConfigGeneratedAsIs( execDir ),
    Paths.getFlowConfigGeneratedAsIs( resultSamplesDir ),
    'Generate error'
);


// =============================================================================
// End
// =============================================================================
console.log( 'All tests are OK!' );


// =============================================================================
// Helpers
// =============================================================================
function writeFlowconfigObjToFile( path, obj ) {
    FS.writeFileSync( path, JSON.stringify( obj, null, 2 ) );
}

function filesAreEqual( path1, path2, errMsg ) {
    const content1 = FS.readFileSync( path1 ).toString();
    const content2 = FS.readFileSync( path2 ).toString();

    if ( content1 !== content2 ) throw Error( errMsg );
}
