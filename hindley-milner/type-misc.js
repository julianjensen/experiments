/** ******************************************************************************************************************
 * @file Describe what type-misc does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 29-Apr-2018
 *********************************************************************************************************************/
"use strict";

import assert from 'assert';
import { TypeFlags, UnionReduction } from "./enums";
import { forEach, filter, binarySearch, compareValues } from "./utils/collections";

const
    resolutionTargets       = [],
    resolutionResults       = [],
    resolutionPropertyNames = [];

/**
 * @param {Type|UnionType|IntersectionType} source
 * @param {Type[]} types
 */
export function eachTypeContainedIn( source, types )
{
    return source.flags & TypeFlags.Union ? !forEach( source.types, t => !contains( types, t ) ) : contains( types, source );
}

/**
 * @param {Type} source
 * @param {Type} target
 * @return {boolean|number}
 */
export function isTypeSubsetOf( source, target )
{
    return source === target || target.flags & TypeFlags.Union && isTypeSubsetOfUnion( source, target );
}

/**
 * @param {Type} source
 * @param {UnionType} target
 * @return {*}
 */
export function isTypeSubsetOfUnion( source, target )
{
    if ( source.flags & TypeFlags.Union )
    {
        for ( const t of source.types )
            if ( !containsType( target.types, t ) ) return false;

        return true;
    }

    return containsType( target.types, source );
}

/**
 *
 * @param {Type} type
 * @param {function} f
 */
export function forEachType( type, f )
{
    return type.flags & TypeFlags.Union ? forEach( type.types, f ) : f( type );
}

/**
 * @param {Type} type
 * @param {function} f
 * @return {Type}
 */
export function filterType( type, f )
{
    if ( type.flags & TypeFlags.Union )
    {
        const
            types    = type.types,
            filtered = filter( types, f );

        return filtered === types ? type : UnionType.getUnionTypeFromSortedList( filtered );
    }
    return f( type ) ? type : neverType;
}

/**
 * Apply a mapping function to a type and return the resulting type. If the source type
 * is a union type, the mapping function is applied to each constituent type and a union
 * of the resulting types is returned.
 *
 * @param {Type} type
 * @param {function} mapper
 * @param {boolean} [noReductions]
 */
function mapType( type, mapper, noReductions )
{
    if ( !( type.flags & TypeFlags.Union ) )
        return mapper( type );

    const types = type.types;

    let mappedType,
        mappedTypes;

    for ( const current of types )
    {
        const t = mapper( current );

        if ( t )
        {
            if ( !mappedType )
                mappedType = t;
            else if ( !mappedTypes )
                mappedTypes = [ mappedType, t ];
            else
                mappedTypes.push( t );
        }
    }

    return mappedTypes ? UnionType.getUnionType( mappedTypes, noReductions ? UnionReduction.None : UnionReduction.Literal ) : mappedType;
}

/**
 * @param {Type} type
 * @param {TypeFlags} kind
 * @return {Type}
 */
function extractTypesOfKind( type, kind )
{
    return filterType( type, t => ( t.flags & kind ) !== 0 );
}

/**
 * @param {Array} array
 * @param {any} value
 * @param {function} equalityComparer
 * @return {boolean}
 */
export function contains( array, value, equalityComparer )
{
    if ( array )
    {
        for ( const v of array )
            if ( equalityComparer( v, value ) ) return true;
    }

    return false;
}

/**
 * @param {Type[]} types
 * @param {Type} type
 * @return {boolean}
 */
export function containsType( types, type )
{
    return binarySearch( types, type, type.id, compareValues ) >= 0;
}

/**
 * Push an entry on the type resolution stack. If an entry with the given target and the given property name
 * is already on the stack, and no entries in between already have a type, then a circularity has occurred.
 * In this case, the result values of the existing entry and all entries pushed after it are changed to false,
 * and the value false is returned. Otherwise, the new entry is just pushed onto the stack, and true is returned.
 * In order to see if the same query has already been done before, the target object and the propertyName both
 * must match the one passed in.
 *
 * @param target The symbol, type, or signature whose type is being queried
 * @param propertyName The property name that should be used to query the target for its type
 */
export function pushTypeResolution( target, propertyName )
{
    const resolutionCycleStartIndex = findResolutionCycleStartIndex( target, propertyName );

    if ( resolutionCycleStartIndex >= 0 )
    {
        // A cycle was found
        const { length } = resolutionTargets;

        for ( let i = resolutionCycleStartIndex; i < length; i++ )
            resolutionResults[ i ] = false;

        return false;
    }

    resolutionTargets.push( target );
    resolutionResults.push( true );
    resolutionPropertyNames.push( propertyName );

    return true;
}

function findResolutionCycleStartIndex( target, propertyName )
{
    for ( let i = resolutionTargets.length - 1; i >= 0; i-- )
    {
        if ( hasType( resolutionTargets[ i ], resolutionPropertyNames[ i ] ) )
            return -1;

        if ( resolutionTargets[ i ] === target && resolutionPropertyNames[ i ] === propertyName )
            return i;
    }

    return -1;
}

function hasType( target, propertyName )
{
    if ( propertyName === TypeSystemPropertyName.Type )
        return getSymbolLinks( target ).type;

    if ( propertyName === TypeSystemPropertyName.DeclaredType )
        return getSymbolLinks( target ).declaredType;

    if ( propertyName === TypeSystemPropertyName.ResolvedBaseConstructorType )
        return target.resolvedBaseConstructorType;

    if ( propertyName === TypeSystemPropertyName.ResolvedReturnType )
        return target.resolvedReturnType;

    if ( propertyName === TypeSystemPropertyName.ResolvedBaseConstraint )
    {
        const bc = target.resolvedBaseConstraint;
        return bc && bc !== circularConstraintType;
    }

    assert( false, "Unhandled TypeSystemPropertyName " + propertyName );
}

/**
 * Pop an entry from the type resolution stack and return its associated result value. The result value will
 * be true if no circularities were detected, or false if a circularity was found.
 *
 * @return {boolean}
 */
function popTypeResolution()
{
    resolutionTargets.pop();
    resolutionPropertyNames.pop();
    return resolutionResults.pop();
}
