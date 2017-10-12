/* @flow */

// =============================================================================
// Imports
// =============================================================================
import FS from 'fs';
import _ from 'lodash';


// =============================================================================
// Constants
// =============================================================================
const Levels = {
    [ 0 ]: '\n',
    [ 1 ]: '=',
    [ 2 ]: ' -> ',
};

// =============================================================================
// PrintFlowConfigToFile
// =============================================================================
export function PrintFlowConfigToFile(
    filePath: string,
    config: Object
): void {
    FS.writeFileSync( filePath, PrintFlowConfig( config ) );
}


// =============================================================================
// PrintFlowConfig
// =============================================================================
export function PrintFlowConfig( config: Object ): string {
    const content = [];

    for ( var i in config ) {
        content.push( `[${ i }]` );

        content.push( printOption( config[ i ] ) );
    }

    return content.join( '\n' );
}


function printOption(
    option: any,
    level: number = 0
): string {
    if ( typeof option === 'string' ) {
        return option;
    } else if ( Array.isArray( option ) ) {
        const content = [];

        for ( var i = 0; i < option.length; ++i ) {
            content.push( printOption( option[ i ], level + 1 ) );
        }

        return content.join( Levels[ level ] );
    } else {
        throw Error( `Expected array or string but got: ${ typeof option }` );
    }
}
