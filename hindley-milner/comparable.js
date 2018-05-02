/** ******************************************************************************************************************
 * @file Describe what comparable does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 29-Apr-2018
 *********************************************************************************************************************/
"use strict";

import { Ternary, Syntax, VoidType } from "./shared";
import { TypeFlags, CallbackCheck } from "./enums";

/**
 * This is *not* a bi-directional relationship.
 * If one needs to check both directions for comparability, use a second call to this function or 'checkTypeComparableTo'.
 *
 * A type S is comparable to a type T if some (but not necessarily all) of the possible values of S are also possible values of T.
 * It is used to check following cases:
 *   - the types of the left and right sides of equality/inequality operators (`===`, `!==`, `==`, `!=`).
 *   - the types of `case` clause expressions and their respective `switch` expressions.
 *   - the type of an expression in a type assertion with the type being asserted.
 */
export function isTypeComparableTo( source, target )
{
    return isTypeRelatedTo( source, target );
}

export function areTypesComparable( type1, type2 )
{
    return isTypeComparableTo( type1, type2 ) || isTypeComparableTo( type2, type1 );
}

/**
 * This is *not* a bi-directional relationship.
 * If one needs to check both directions for comparability, use a second call to this function or 'isTypeComparableTo'.
 */
function checkTypeComparableTo( source, target )
{
    return checkTypeRelatedTo( source, target );
}

/**
 * See signatureRelatedTo, compareSignaturesIdentical
 */
function compareSignaturesRelated( source, target, callbackCheck, ignoreReturnTypes, compareTypes )
{
    // TODO (drosen): De-duplicate code between related functions.
    if ( source === target )
        return Ternary.True;

    if ( !target.hasRestParameter && source.minArgumentCount > target.parameters.length )
        return Ternary.False;

    if ( source.typeParameters && source.typeParameters !== target.typeParameters )
    {
        target = target.getCanonicalSignature();
        source = source.instantiateSignatureInContextOf( target, /* contextualMapper */ undefined, compareTypes );
    }

    const kind = target.declaration ? target.declaration.kind : null;

    const strictVariance = !callbackCheck && kind !== Syntax.MethodDeclaration && kind !== Syntax.ClassDeclaration;

    let result = Ternary.True;

    const sourceThisType = source.getThisTypeOfSignature();

    if ( sourceThisType && sourceThisType !== VoidType )
    {
        const targetThisType = target.getThisTypeOfSignature();

        if ( targetThisType )
        {
            // void sources are assignable to anything.
            const related = !strictVariance && compareTypes( sourceThisType, targetThisType ) || compareTypes( targetThisType, sourceThisType );

            if ( !related )
                return Ternary.False;

            result &= related;
        }
    }

    const sourceMax = source.getNumNonRestParameters();
    const targetMax = target.getNumNonRestParameters();

    const checkCount = source.getNumParametersToCheckForSignatureRelatability( target );

    const sourceParams = source.parameters;
    const targetParams = target.parameters;

    for ( let i = 0; i < checkCount; i++ )
    {
        const sourceType = source.getTypeOfParameter( i );
        const targetType = target.getTypeOfParameter( i );

        // In order to ensure that any generic type Foo<T> is at least co-variant with respect to T no matter
        // how Foo uses T, we need to relate parameters bi-variantly (given that parameters are input positions,
        // they naturally relate only contra-variantly). However, if the source and target parameters both have
        // function types with a single call signature, we know we are relating two callback parameters. In
        // that case it is sufficient to only relate the parameters of the signatures co-variantly because,
        // similar to return values, callback parameters are output positions. This means that a Promise<T>,
        // where T is used only in callback parameter positions, will be co-variant (as opposed to bi-variant)
        // with respect to T.
        const sourceSig = callbackCheck ? void 0 : source.getNonNullableType().getSingleCallSignature();
        const targetSig = callbackCheck ? void 0 : target.getNonNullableType().getSingleCallSignature();

        const callbacks = sourceSig && targetSig && ( sourceType.getFalsyFlags() & TypeFlags.Nullable ) === ( targetType.getFalsyFlags() & TypeFlags.Nullable );
        const related = callbacks ?
                        compareSignaturesRelated( targetSig, sourceSig, strictVariance ? CallbackCheck.Strict : CallbackCheck.Bivariant, /* ignoreReturnTypes */ false ) :
                        !callbackCheck && !strictVariance && compareTypes(sourceType, targetType, /* reportErrors */ false) || compareTypes( targetType, sourceType );

        if (!related)
            return Ternary.False;

        result &= related;
    }

    if ( !ignoreReturnTypes )
    {
        const targetReturnType = target.getReturnTypeOfSignature();

        if (targetReturnType === voidType) {
            return result;
        }
        const sourceReturnType = getReturnTypeOfSignature(source);

        // The following block preserves behavior forbidding boolean returning functions from being assignable to type guard returning functions
        const targetTypePredicate = getTypePredicateOfSignature(target);
        if (targetTypePredicate) {
            const sourceTypePredicate = getTypePredicateOfSignature(source);
            if (sourceTypePredicate) {
                result &= compareTypePredicateRelatedTo(sourceTypePredicate, targetTypePredicate, source.declaration, target.declaration, reportErrors, errorReporter, compareTypes);
            }
            else if (isIdentifierTypePredicate(targetTypePredicate)) {
                if (reportErrors) {
                    errorReporter(Diagnostics.Signature_0_must_be_a_type_predicate, signatureToString(source));
                }
                return Ternary.False;
            }
        }
        else {
            // When relating callback signatures, we still need to relate return types bi-variantly as otherwise
            // the containing type wouldn't be co-variant. For example, interface Foo<T> { add(cb: () => T): void }
            // wouldn't be co-variant for T without this rule.
            result &= callbackCheck === CallbackCheck.Bivariant && compareTypes(targetReturnType, sourceReturnType, /*reportErrors*/ false) ||
                      compareTypes(sourceReturnType, targetReturnType, reportErrors);
        }

    }

    return result;
}
