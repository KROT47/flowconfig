/* @flow */

// =============================================================================
// ReplaceEachValue
// =============================================================================
export function ReplaceEachValue(
    config: Object,
    test: RegExp,
    replacement: string
) {
    for ( var i in config ) ReplaceValue( config[ i ], test, replacement );
}


// =============================================================================
// ReplaceValue
// =============================================================================
function ReplaceValue(
    option: Array<any> | string,
    test: RegExp,
    replacement: string | Function
): Array<any> | string {
    if ( typeof option === 'string' ) return option.replace( test, replacement );

    for ( var k = option.length; k--; ) {
        option[ k ] = ReplaceValue( option[ k ], test, replacement );
    }

    return option;
}
