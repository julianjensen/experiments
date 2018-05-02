/** ******************************************************************************************************************
 * @file Describe what derived does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 29-Apr-2018
 *********************************************************************************************************************/
"use strict";

/**
 * @param {Type} type
 * @return {boolean}
 */
function is_union( type )
{
    return type instanceof UnionType;
}

/**
 * An object type S is considered to be derived from an object type T if
 * S is a union type and every constituent of S is derived from T,
 * T is a union type and S is derived from at least one constituent of T, or
 * S is a type variable with a base constraint that is derived from T,
 * T is one of the global types Object and Function and S is a subtype of T, or
 * T occurs directly or indirectly in an 'extends' clause of S.
 * Note that this check ignores type parameters and only considers the
 * inheritance hierarchy.
 *
 * @param {Type} source
 * @param {Type} target
 * @return {any}
 */
function isTypeDerivedFrom(source, target)
{
    return is_union( source ) ? source.types.every( t => isTypeDerivedFrom( t, target ) ) :
           is_union( target ) ? target.types.some( t => isTypeDerivedFrom( source, t ) ) :
           is_instantiable_non_primitive( source ) ? isTypeDerivedFrom( getBaseConstraintOfType( source ) || emptyObjectType, target ) :
           target === globalObjectType || target === globalFunctionType ? isTypeSubtypeOf( source, target ) :
           hasBaseType( source, getTargetType( target ) );
}
