/* @flow */

// =============================================================================
// Imports
// =============================================================================
import Path from 'path';

import { ParseFlowConfigFromFile } from './parse';
import { ExtendFlowConfig, ExtendFlowConfigFromFiles } from './extend';
import { PrintFlowConfigToFile } from './print';
import { ReplaceEachValue } from './helpers';


// =============================================================================
// GenerateFlowConfigFromFiles
// =============================================================================
export function GenerateFlowConfigFromFiles({
    targetPath,
    configPaths,
    // if true all '<PROJECT_ROOT>' will be replaced
    // with relative paths to targetPath's <PROJECT_ROOT>
    replacePathsProjectRoot = true,
}: {
    targetPath: string,
    configPaths: Array<string>,
    replacePathsProjectRoot: boolean,
}) {
    var config;

    if ( replacePathsProjectRoot ) {
        const configs: Array<Object> = [];

        for ( var i = 0; i < configPaths.length; ++i ) {
            const configPath = Path.resolve( targetPath, configPaths[ i ] );

            config = ParseFlowConfigFromFile( configPath );

            const targetDirName = Path.dirname( targetPath );
            const configDirName = Path.dirname( configPath );
            const configRelPath = Path.relative( targetDirName, configDirName );

            if ( configRelPath ) {
                ReplaceEachValue(
                    config,
                    /<PROJECT_ROOT>/g,
                    `<PROJECT_ROOT>/${ configRelPath }`
                );
            }

            configs.push( config );
        }

        config = ExtendFlowConfig( ...configs );
    } else {
        config = ExtendFlowConfigFromFiles( ...configPaths );
    }

    PrintFlowConfigToFile( targetPath, config || {} );
}


// =============================================================================
// Exports
// =============================================================================
export * from './parse';
export * from './extend';
export * from './print';
