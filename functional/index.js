/** ******************************************************************************************************************
 * @file Describe what index does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 29-Apr-2018
 *********************************************************************************************************************/
"use strict";

const
    /**
     * Started with
     * ```
     *  curry = fn => {
     *      const inner =
     *         ( p = [] ) =>
     *             ( ...c ) => c.length + p.length >= fn.length ? fn( ...p.concat( c ) ) : inner( p.concat( c ) );
     *
     *      return inner();
     * }
     * ```
     * then it became
     * ```
     * curry = f => ( s => s( s ) )( ( s, p = [] ) => ( ...c ) => c.length + p.length >= f.length ? f( ...p.concat( c ) ) : s( s, p.concat( c ) ) );
     * ```
     *
     * @param {function} f
     * @param {...*} i
     * @return {function|*}
     */
    curry  = ( f, ...i ) => ( s => s( s )( i ) )( s => p => ( ...c ) => c.length + p.length >= f.length ? f( ...p.concat( c ) ) : s( s )( p.concat( c ) ) ),

    $_1    = ( fn, ...args ) => args.length === 0 ? ( ...args ) => $_1( fn, ...args ) : fn( args[ 0 ] ),
    curry1 = fn => $_1( fn ),
    $_2    = ( fn, ...args ) => args.length === 0 ? $_2 : args.length === 1 ? $_1( b => fn( args[ 0 ], b ) ) : fn( args[ 0 ], args[ 1 ] ),
    curry2 = fn => $_2( fn ),

    arity  = ( n, fn ) => ( ...args ) => {
        args.length = n;
        return fn( ...args );
    },

    max    = ( a, b ) => a > b ? a : b;

export {
    curry,
    max,
    arity,
    curry1,
    curry2
};

