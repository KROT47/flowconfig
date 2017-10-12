/* @flow */

// =============================================================================
// Imports
// =============================================================================
import FS from 'fs';
import _ from 'lodash';


// =============================================================================
// Constants
// =============================================================================
const separator = '####################################';

const RegExps = {
    comments: /#[^\n]*/g,
    sections: /\[(include|ignore|libs|lints|options|version)\]/g,
    sectionLines: /[^\n]*/g,
};


// =============================================================================
// ParseFlowConfig
// =============================================================================
export function ParseFlowConfig( content: string ): Object {
    const sectionNames = [];

    const sectionContents =
        content
            // remove comments
            .replace( RegExps.comments, match => '' )
            // find sections
            .replace( RegExps.sections, ( match, name ) => {
                sectionNames.push( name );

                return separator;
            })
            // split sections
            .split( separator );

    sectionContents.shift();

    const sections = _.zipObject( sectionNames, sectionContents );

    return _.mapValues( sections, parseSection );
}

// =============================================================================
// ParseFlowConfigFromFile
// =============================================================================
export function ParseFlowConfigFromFile( filePath: string ): Object {
    const content = FS.readFileSync( filePath ).toString();

    return ParseFlowConfig( content );
}


// =============================================================================
// parseSection
// =============================================================================
function parseSection( content: string ): Array<any> {
    const lines = [];

    content.replace( RegExps.sectionLines, match => {
        match && lines.push( match.trim() );

        return match;
    });

    return lines.map( parseLine );
}


// =============================================================================
// parseLine
// =============================================================================
function parseLine( content: string ): Array<any> {
    const option: Array<any> = content.split( '=' );

    option[ 1 ] = parseOption( option[ 1 ] );

    if ( !option[ 1 ] ) return option[ 0 ];

    return option;
}


// =============================================================================
// parseOption
// =============================================================================
function parseOption( content: ?string ): Array<any> | string {
    if ( !content ) return '';

    const optionValues = content.split( '->' ).map( val => val.trim() );

    if ( optionValues.length === 1 ) return optionValues[ 0 ];

    return optionValues;
}
