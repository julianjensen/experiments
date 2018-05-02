/** ******************************************************************************************************************
 * @file Describe what collections does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 29-Apr-2018
 *********************************************************************************************************************/
"use strict";

import assert from "assert";
import { Comparison } from "../enums";

/**
 * @param iter
 * @param map
 * @return {Array}
 */
export function arrayFrom( iter, map = x => x )
{
    const tmp = [];

    for ( const value of iter ) tmp.push( map( value ) );

    return tmp;
}

/**
 * @param {Array<*>} array
 * @param {?function} [predicate]
 * @return {boolean}
 */
export function some( array, predicate )
{
    if ( array )
    {
        if ( predicate )
        {
            for ( const v of array )
                if ( predicate( v ) ) return true;
        }
        else
            return array.length > 0;
    }

    return false;
}

/**
 * @param {Array<*>} array1
 * @param {Array<*>} array2
 * @return {Array<*>}
 */
export function concatenate( array1, array2 )
{
    if ( !some( array2 ) ) return array1;
    if ( !some( array1 ) ) return array2;
    return array1.concat( array2 );
}

/**
 *
 * @param array
 * @param toAdd
 * @param equalityComparer
 * @return {boolean} Whether the value was added.
 */
export function pushIfUnique( array, toAdd, equalityComparer )
{
    if ( contains( array, toAdd, equalityComparer ) )
        return false;
    else
    {
        array.push( toAdd );
        return true;
    }
}

/**
 * @param array
 * @param value
 * @param equalityComparer
 * @return {boolean}
 */
export function contains( array, value, equalityComparer = ( a, b ) => a === b )
{
    if ( array )
    {
        for ( const v of array )
            if ( equalityComparer( v, value ) ) return true;
    }

    return false;
}

/**
 * Gets the actual offset into an array for a relative offset. Negative offsets indicate a
 * position offset from the end of the array.
 *
 * @param array
 * @param offset
 * @return {*}
 */
function toOffset( array, offset )
{
    return offset < 0 ? array.length + offset : offset;
}

/**
 * Appends a range of value to an array, returning the array.
 *
 * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
 * is created if `value` was appended.
 * @param from The values to append to the array. If `from` is `undefined`, nothing is
 * appended. If an element of `from` is `undefined`, that element is not appended.
 * @param start The offset in `from` at which to start copying values.
 * @param end The offset in `from` at which to stop copying values (non-inclusive).
 */
export function addRange( to, from, start, end )
{
    if ( from === void 0 || from.length === 0 ) return to;
    if ( to === void 0 ) return from.slice( start, end );

    start = start === void 0 ? 0 : toOffset( from, start );

    end = end === void 0 ? from.length : toOffset( from, end );

    for ( let i = start; i < end && i < from.length; i++ )
    {
        if ( from[ i ] !== void 0 )
            to.push( from[ i ] );
    }

    return to;
}

/**
 * Maps an array. If the mapped value is an array, it is spread into the result.
 *
 * @param array The array to map.
 * @param mapfn The callback used to map the result into one or more values.
 */
export function flatMap( array, mapfn )
{
    let result;

    if ( array )
    {
        result = [];
        for ( let i = 0; i < array.length; i++ )
            result = result.concat( mapfn( array[ i ], i ) | [] );
    }

    return result;
}

/**
 * @param {Array<*>} array
 * @param {function} predicate
 * @return {*}
 */
export function findLast( array, predicate )
{
    for ( let i = array.length - 1; i >= 0; i-- )
    {
        const value = array[ i ];
        if ( predicate( value, i ) ) return value;
    }

    return void 0;
}

/**
 * Returns the first truthy result of `callback`, or else fails.
 * This is like `forEach`, but never returns undefined.
 *
 * @param {Array<*>} array
 * @param {function} callback
 */
export function findMap( array, callback )
{
    for ( let i = 0; i < array.length; i++ )
    {
        const result = callback( array[ i ], i );
        if ( result ) return result;
    }

    assert( false );
}

/**
 * Iterates through 'array' by index and performs the callback on each element of array until the callback
 * returns a truthy value, then returns that value.
 * If no such value is found, the callback is applied to each element of array and undefined is returned.
 *
 * @param {ReadonlyArray<T> | undefined} array
 * @param {function(element: T, index?: number): U | undefined} callback
 * @template T, U
 */
export function forEach( array, callback )
{
    if ( array )
    {
        for ( let i = 0; i < array.length; i++ )
        {
            const result = callback( array[ i ], i );

            if ( result )
                return result;
        }
    }

    return void 0;
}

/**
 * @param {Array<ts.Node>} node
 * @param {function} callback
 * @return {?ts.Node}
 */
export function findAncestor( node, callback )
{
    while ( node )
    {
        const result = callback( node );

        if ( result === "quit" ) return void 0;
        else if ( result ) return node;

        node = node.parent;
    }

    return void 0;
}

/**
 * Returns the last element of an array if non-empty, `undefined` otherwise.
 */
export function lastOrUndefined( array )
{
    return array.length === 0 ? void 0 : array[ array.length - 1 ];
}

/**
 * @param {Array} array
 * @param {function} f
 * @return {Array}
 */
export function filter( array, f )
{
    if ( array )
    {
        const len = array.length;

        let i = 0;

        while ( i < len && f( array[ i ] ) ) i++;

        if ( i < len )
        {
            const result = array.slice( 0, i );
            i++;
            while ( i < len )
            {
                const item = array[ i ];
                if ( f( item ) )
                    result.push( item );

                i++;
            }

            return result;
        }
    }

    return array;
}

/**
 * Performs a binary search, finding the index at which `value` occurs in `array`.
 * If no such index is found, returns the 2's-complement of first index at which
 * `array[index]` exceeds `value`.
 *
 * @param array A sorted array whose first element must be no larger than number
 * @param value The value to be searched for in the array.
 * @param keySelector A callback used to select the search key from `value` and each element of `array`.
 * @param keyComparer A callback used to compare two keys in a sorted array.
 * @param [offset] An offset into `array` at which to start the search.
 */
export function binarySearch( array, value, keySelector, keyComparer, offset )
{
    if ( !array || array.length === 0 )
        return -1;

    let low  = offset || 0,
        high = array.length - 1;

    const key = keySelector( value );

    while ( low <= high )
    {
        const
            middle = low + ( ( high - low ) >> 1 ),
            midKey = keySelector( array[ middle ] );

        switch ( keyComparer( midKey, key ) )
        {
            case Comparison.LessThan:
                low = middle + 1;
                break;
            case Comparison.EqualTo:
                return middle;
            case Comparison.GreaterThan:
                high = middle - 1;
                break;
        }
    }

    return ~low;
}

/**
 * @param {string|number} a
 * @param {string|number} b
 * @return {*}
 */
function compareComparableValues( a, b )
{
    return a === b ? Comparison.EqualTo :
           a === void 0 ? Comparison.LessThan :
           b === void 0 ? Comparison.GreaterThan :
           a < b ? Comparison.LessThan :
           Comparison.GreaterThan;
}

/**
 * Compare two numeric values for their order relative to each other.
 * To compare strings, use any of the `compareStrings` functions.
 *
 * @param {number} a
 * @param {number} b
 */
export function compareValues( a, b )
{
    return compareComparableValues( a, b );
}

