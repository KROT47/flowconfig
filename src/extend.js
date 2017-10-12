/* @flow */

// =============================================================================
// Imports
// =============================================================================
import _ from 'lodash';

import { ParseFlowConfigFromFile } from './parse';


// =============================================================================
// ExtendFlowConfig
// =============================================================================
export function ExtendFlowConfig(
    target: Object,
    ...configs: Array<Object>
): Object {
    var i, k;

    for ( i = 0; i < configs.length; ++i ) {
        const config = configs[ i ];

        for ( k in config ) {
            if ( !target[ k ] ) {
                target[ k ] = _.merge( [], config[ k ] );
            } else {
                target[ k ] = extendOptions( target[ k ], config[ k ] );
            }
        }
    }

    return target;
}

// =============================================================================
// ExtendFlowConfigFromFiles
// =============================================================================
export function ExtendFlowConfigFromFiles(
    ...flowConfigPaths: Array<string>
): Object {
    const args = [];

    for ( var i = 0; i < flowConfigPaths.length; ++i ) {
        args.push( ParseFlowConfigFromFile( flowConfigPaths[ i ] ) );
    }

    return ExtendFlowConfig( {}, ...args );
}


// =============================================================================
// extendOptions
// =============================================================================
function extendOptions<T: Array<Array<any>>>( target: T, options: T ): T {
    var i, k;

    for ( i = 0; i < options.length; ++i ) {
        // if ( typeof target === 'string' ) {

        // } else {
// console.log(target, options, i);
            if ( !existsInTarget( target, options[ i ] ) ) {
                target.push( options[ i ] );
            }
        // }
    }

    return target;
}


// =============================================================================
// existsInTarget
// =============================================================================
function existsInTarget(
    target: Array<Array<any>>,
    option: Array<any>
): boolean {
    for ( var i = target.length; i--; ) {
        if ( _.isEqual( target[ i ], option ) ) return true;
    }

    return false;
}
