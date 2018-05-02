/** ******************************************************************************************************************
 * @file Describe what index does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 29-Apr-2018
 *********************************************************************************************************************/
"use strict";

const
    isFunc = x => typeof x === 'function',
    MATCH  = Symbol( 'patternMatch' ),
    VALUE  = Symbol( 'patternValue' ),
    REST   = Symbol( 'patternRest' );

/**
 * @param {[]} against
 * @return {{}}
 */
function array_matcher( against )
{
    const
        restIndex    = against.indexOf( REST ),
        strictLength = restIndex === -1,
        minLength    = !strictLength && restIndex,
        subs         = against.map( _matcher ),
        arr          = [];

    return {
        [ MATCH ]: val => {
            if ( !val ||
                 val.length === undefined ||
                 ( strictLength && val.length !== against.length ) ||
                 ( !strictLength && val.length < minLength )
            )
                return false;

            let gotRest = false;

            for ( let i = 0; i < val.length; i++ )
            {
                if ( gotRest )
                    arr[ i ] = val[ i ];
                else if ( subs[ i ] === REST )
                {
                    gotRest = true;
                    arr[ i ] = val[ i ];
                }
                else if ( !subs[ i ] )
                    arr[ i ] = val[ i ];
                else if ( isFunc( subs[ i ][ MATCH ] ) )
                {
                    const match = subs[ i ][ MATCH ]( val[ i ] );

                    if ( !match )
                        return false;
                    else if ( match.hasOwnProperty( VALUE ) )
                        arr[ i ] = match[ VALUE ];
                    else
                        arr[ i ] = val[ i ];
                }
                else if ( subs[ i ].hasOwnProperty( VALUE ) )
                    arr[ i ] = subs[ i ][ VALUE ];
            }

            return { [ VALUE ]: arr };
        }
    };
}

/**
 * @param {object} against
 * @return {{}}
 */
function object_matcher( against )
{
    const
        subs = {};

    Object.keys( against ).forEach( k => subs[ k ] = _matcher( against[ k ] ) );

    return {
        [ MATCH ]: val => {
            if ( !val ) return false;

            const ret = {};

            return Array.from( new Set( Object.keys( subs ).concat( Object.keys( val ) ) ) )
                       .every( k => {
                           if ( val[ k ] === undefined )
                               return false;
                           else if ( !subs[ k ] )
                           {
                               ret[ k ] = val[ k ];
                               return true;
                           }
                           else if ( isFunc( subs[ k ][ MATCH ] ) )
                           {
                               const matched = subs[ k ][ MATCH ]( val[ k ] );

                               if ( !matched ) return false;

                               if ( matched.hasOwnProperty( VALUE ) )
                                   ret[ k ] = matched[ VALUE ];
                               else
                                   ret[ k ] = val[ k ];

                               return true;
                           }
                           else
                               return false;

                       } ) && { [ VALUE ]: ret };
        }
    };
}

/**
 * @param {RegExp} against
 * @return {{}}
 */
function rx_matcher( against )
{
    return {
        [ MATCH ]: val => ( val = against.exec( val ) ) && { [ VALUE ]: val }
    };
}

/**
 * @param {*} matcher
 * @return {*}
 * @private
 */
function _matcher( matcher )
{
    if ( isFunc( matcher ) )
        return matcher;
    else if ( matcher === undefined )
        return { [ VALUE ]: matcher };
    else if ( matcher === REST )
        return REST;
    else if ( typeof matcher === 'number' || typeof matcher === 'string' || typeof matcher === 'boolean' || matcher === null )
        return { [ MATCH ]: x => x === matcher, [ VALUE ]: matcher };
    else if ( Array.isArray( matcher ) )
        return array_matcher( matcher );
    else if ( {}.toString.call( matcher ) === '[object RegExp]' )
        return rx_matcher( matcher );
    else if ( typeof matcher === 'object' )
        return object_matcher( matcher );
    else
        throw new Error( 'Invalid matcher: ' + require( 'util' ).inspect( matcher ) );
}

/**
 * @param {function|*} cond
 * @param {*} expr
 * @return {*}
 */
function execute_match( cond, expr )
{
    let ret = cond || { [ VALUE ]: expr };

    if ( isFunc( cond ) )
    {
        if ( !cond( expr ) ) return false;
        ret = { [ VALUE ]: expr };
    }
    else if ( cond.hasOwnProperty( MATCH ) )
        ret = cond[ MATCH ]( expr );

    if ( ret === void 0 || ret === null )
        return ret;

    if ( ret.hasOwnProperty( VALUE ) )
        return isFunc( ret[ VALUE ] ) ? ret[ VALUE ]( expr ) : ret[ VALUE ];

    return ret;
}

/**
 * @param {function} [v]
 * @return {function}
 */
export function strictMatcher( v )
{
    return matcher( v, true );
}

/**
 * @param {function} [validate]
 * @param {boolean} [strictComp=false]
 * @return {function}
 */
export function matcher( validate = () => true, strictComp = false )
{
    let hasDefault = false, def = x => x;

    const
        res       = ( fn, xpr ) => isFunc( fn ) ? fn( xpr ) : fn,
        collect   = [],
        then      = res => {
            collect[ collect.length - 1 ][ 1 ] = res;
            return make_r();
        },
        otherwise = x => {
            def = x;
            hasDefault = true;
            return make_r();
        },
        on        = ( cond, result ) => {
            collect.push( [ _matcher( cond ), result ] );
            return make_r( arguments.length < 2 );
        };


    /**
     * @param {boolean} addThen
     * @return {Function}
     */
    function make_r( addThen = false )
    {
        const r = { on };

        if ( !hasDefault ) r.otherwise = otherwise;
        if ( addThen ) r.then = then;

        return wrap( r );
    }

    /**
     * @param {*} expr
     * @return {*}
     */
    function match( expr )
    {
        const
            len     = collect.length,
            compare = strictComp ? x => x === true : x => !!x;

        let i = 0, post;

        if ( !validate( expr ) ) return res( def, expr );

        while ( i < len )
        {
            if ( compare( post = execute_match( collect[ i ][ 0 ], expr ) ) )
            {
                if ( i )
                {
                    const tmp = collect[ 0 ];
                    collect[ 0 ] = collect[ i ];
                    collect[ i ] = tmp;
                }

                return res( collect[ 0 ][ 1 ], post[ VALUE ] || expr );
            }
            ++i;
        }

        return res( def, expr );
    }

    /**
     * @param obj
     * @return {function}
     */
    function wrap( obj )
    {
        const fn = expr => match( expr );

        return Object.assign( fn, obj );
    }

    return wrap( { on, otherwise } );
}

export { REST };
