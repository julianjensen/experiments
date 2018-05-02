/** ******************************************************************************************************************
 * @file Describe what shared does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 29-Apr-2018
 *********************************************************************************************************************/

"use strict";

import { Syntax1, VisitorKeys1 } from 'espree';
import { Syntax2, VisitorKeys2 } from 'estraverse';
import { TypeFlags, TypeSystemPropertyName } from "./enums";
import { concatenate, lastOrUndefined } from "./utils/collections";

export const
    Syntax = { ...Syntax1, ...Syntax2 },
    VisitorKeys = { ...VisitorKeys1, ...VisitorKeys2 };

let voidType, falseType, neverType;

/**
 * @param {Type[]} types
 * @return {string}
 */
function getTypeListId( types )
{
    let result = "";

    if (types)
    {
        const length = types.length;

        let i = 0;

        while (i < length)
        {
            const startId = types[ i ].id;

            let count = 1;

            while (i + count < length && types[i + count].id === startId + count)
                count++;

            if (result.length)
                result += ",";

            result += startId;

            if (count > 1)
                result += ":" + count;

            i += count;
        }
    }

    return result;
}


export class Type
{
    constructor()
    {
        this.flags = TypeFlags.Any;
    }

    getNonNullableType()
    {
        return this;
    }

    // Returns the String, Number, Boolean, StringLiteral, NumberLiteral, BooleanLiteral, Void, Undefined, or Null
    // flags for the string, number, boolean, "", 0, false, void, undefined, or null types respectively. Returns
    // no flags for all other types (including non-falsy literal types).
    getFalsyFlags()
    {
        return this.flags & TypeFlags.Union ? Type.getFalsyFlagsOfTypes( this.types ) :
        this.flags & TypeFlags.StringLiteral ? this.value === "" ? TypeFlags.StringLiteral : 0 :
        this.flags & TypeFlags.NumberLiteral ? this.value === 0 ? TypeFlags.NumberLiteral : 0 :
        this.flags & TypeFlags.BooleanLiteral ? this === falseType ? TypeFlags.BooleanLiteral : 0 :
        this.flags & TypeFlags.PossiblyFalsy;
    }


    /**
     * @param {Type[]} types
     * @return {TypeFlags}
     */
    static getFalsyFlagsOfTypes( types)
    {
        let result = TypeFlags.Any;

        for (const t of types)
            result |= t.getFalsyFlags();

        return result;
    }

    removeDefinitelyFalsyTypes()
    {
        if ( this.getFalsyFlags() & TypeFlags.DefinitelyFalsy )
           this.types.filter( t => !( t.getFalsyFlags() & TypeFlags.DefinitelyFalsy ) )
           type;
}

    extractDefinitelyFalsyTypes(type){
    return mapType(type, getDefinitelyFalsyPartOfType);
}

    getDefinitelyFalsyPartOfType(type){
    return type.flags & TypeFlags.String ? emptyStringType :
           type.flags & TypeFlags.Number ? zeroType :
           type.flags & TypeFlags.Boolean || type === falseType ? falseType :
           type.flags & (TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null) ||
           type.flags & TypeFlags.StringLiteral && type.value === "" ||
                                                                       type.flags & TypeFlags.NumberLiteral && type.value === 0 ? type :
                                                                                                                                   neverType;
}

    /**
     * Add undefined or null or both to a type if they are missing.
     * @param type - type to add undefined and/or null to if not present
     * @param flags - Either TypeFlags.Undefined or TypeFlags.Null, or both
     */
    getNullableType(type, flags){
    const missing = (flags & ~type.flags) & (TypeFlags.Undefined | TypeFlags.Null);
    return missing === 0 ? type :
           missing === TypeFlags.Undefined ? getUnionType([type, undefinedType]) :
           missing === TypeFlags.Null ? getUnionType([type, nullType]) :
           getUnionType([type, undefinedType, nullType]);
}

    getOptionalType(type){
    Debug.assert(strictNullChecks);
    return type.flags & TypeFlags.Undefined ? type : getUnionType([type, undefinedType]);
}

    getGlobalNonNullableTypeInstantiation(type) {
    if (!deferredGlobalNonNullableTypeAlias) {
        deferredGlobalNonNullableTypeAlias = getGlobalSymbol("NonNullable" as __String, SymbolFlags.TypeAlias, /*diagnostic*/ undefined) || unknownSymbol;
    }
    // Use NonNullable global type alias if available to improve quick info/declaration emit
    if (deferredGlobalNonNullableTypeAlias !== unknownSymbol) {
        return getTypeAliasInstantiation(deferredGlobalNonNullableTypeAlias, [type]);
    }
    return getTypeWithFacts(type, TypeFacts.NEUndefinedOrNull); // Type alias unavailable, fall back to non-higherorder behavior
}

    getNonNullableType(type)
    {
    return strictNullChecks ? getGlobalNonNullableTypeInstantiation(type) : type;
}
}

export class BooleanType extends Type
{

}

falseType = new BooleanType();

export class ObjectType extends Type
{
    constructor()
    {
        super();
    }

    resolveStructuredTypeMembers()
    {
        return {
            callSignatures: [],
            constructSignatures: [],
            properties: [],
            stringIndexInfo: null,
            numberIndexInfo: null
        };
    }

    getSingleCallSignature()
    {
        const resolved = this.resolveStructuredTypeMembers();

        if ( resolved.callSignatures.length === 1 &&
             resolved.constructSignatures.length === 0 &&
             resolved.properties.length === 0 &&
             !resolved.stringIndexInfo &&
             !resolved.numberIndexInfo
        )
            return resolved.callSignatures[0];

        return undefined;
    }
}

Array.prototype.until = function( fn ) {
    for ( const [ i, el ] of this.values() )
        if ( fn( el, i, this ) ) return el;

    return void 0;
};

/**
 * @class
 * @implements Constraints
 */
class UnionOrIntersectionType extends Type
{
    constructor( flags )
    {
        super( flags );
        /** @type {?Array<Type>} */
        this.types = null;                    // Constituent types
        this.propertyCache             = new Map();       // Cache of resolved properties
        this.resolvedProperties        = null;
        this.resolvedIndexType         = null;
        this.resolvedBaseConstraint    = null;
        this.couldContainTypeVariables = false;
    }

    getBaseConstraint()
    {
        const constraint = this.getResolvedBaseConstraint();

        if ( constraint !== noConstraintType && constraint !== circularConstraintType )
            return constraint;
    }

    isGenericObjectType()
    {
        return this.types.forEach( t => t.isGenericObjectType() );
    }

    isGenericIndexType()
    {
        forEach( this.types, t => t.isGenericIndexType() );
    }
}

implement( UnionOrIntersectionType, Constraints );


/**
 * @class
 */
class UnionType extends UnionOrIntersectionType
{
    constructor( typeFlags )
    {
        super( typeFlags );
    }


    /**
     * We sort and deduplicate the constituent types based on object identity. If the subtypeReduction
     * flag is specified we also reduce the constituent type set to only include types that aren't subtypes
     * of other types. Subtype reduction is expensive for large union types and is possible only when union
     * types are known not to circularly reference themselves (as is the case with union types created by
     * expression constructs such as array literals and the `||` and `?:` operators). Named types can
     * circularly reference themselves and therefore cannot be subtype reduced during their declaration.
     * For example, `type Item = string | (() => Item` is a named type that circularly references itself.
     *
     * @param {Type[]} types
     * @param {?UnionReduction} [unionReduction=UnionReduction.Literal]
     * @param {?Symbol} [aliasSymbol]
     * @param {?Type[]} [aliasTypeArguments]
     * @returns {Type}
     */
    static getUnionType( types, unionReduction = UnionReduction.Literal, aliasSymbol = null, aliasTypeArguments = null )
    {
        if ( types.length === 0 )
            return neverType;

        if ( types.length === 1 )
            return types[ 0 ];

        const typeSet = [];

        UnionType.addTypesToUnion( typeSet, types );

        if ( typeSet.containsAny )
            return anyType;

        switch ( unionReduction )
        {
            case UnionReduction.Literal:
                if ( typeSet.containsLiteralOrUniqueESSymbol )
                    UnionType.removeRedundantLiteralTypes( typeSet );
                break;

            case UnionReduction.Subtype:
                UnionType.removeSubtypes( typeSet );
                break;
        }
        if ( typeSet.length === 0 )
            return typeSet.containsNull
                   ? typeSet.containsNonWideningType
                     ? nullType : nullWideningType
                   : typeSet.containsUndefined
                     ? typeSet.containsNonWideningType
                       ? undefinedType
                       : undefinedWideningType
                     : neverType;

        return UnionType.getUnionTypeFromSortedList( typeSet, aliasSymbol, aliasTypeArguments );
    }

    static removeSubtypes( types )
    {
        if ( types.length === 0 || isSetOfLiteralsFromSameEnum( types ) )
            return;

        let i = types.length;

        while ( i > 0 )
        {
            i--;
            if ( types[ i ].isSubtypeOfAny( types ) )
                types.slice( i, 1 );
        }
    }

    static removeRedundantLiteralTypes( types )
    {
        let i = types.length;

        while ( i > 0 )
        {
            i--;
            const t      = types[ i ];
            const remove =
                      t.flags & TypeFlags.StringLiteral && types.containsString ||
                      t.flags & TypeFlags.NumberLiteral && types.containsNumber ||
                      t.flags & TypeFlags.UniqueESSymbol && types.containsESSymbol ||
                      t.flags & TypeFlags.StringOrNumberLiteral && t.flags & TypeFlags.FreshLiteral && containsType( types, t.regularType );

            if ( remove )
                types.splice( i, 1 );
        }
    }

    /**
     * This function assumes the constituent type list is sorted and deduplicated.
     * @param {Type[]} types
     * @param {?Symbol} aliasSymbol
     * @param {?Type[]} [aliasTypeArguments]
     */
    static getUnionTypeFromSortedList( types, aliasSymbol, aliasTypeArguments )
    {
        if ( types.length === 0 )
            return neverType;

        if ( types.length === 1 )
            return types[ 0 ];

        const id = getTypeListId( types );

        let type = unionTypes.get( id );

        if ( !type )
        {
            const propagatedFlags = getPropagatingFlagsOfTypes( types, /*excludeKinds*/ TypeFlags.Nullable );
            type                  = new UnionType( TypeFlags( TypeFlags.Union | propagatedFlags ) );
            unionTypes.set( id, type );
            type.types = types;

            /*
            Note: This is the alias symbol (or lack thereof) that we see when we first encounter this union type.
            For aliases of identical unions, eg `type T = A | B; type U = A | B`, the symbol of the first alias encountered is the aliasSymbol.
            (In the language service, the order may depend on the order in which a user takes actions, such as hovering over symbols.)
            It's important that we create equivalent union types only once, so that's an unfortunate side effect.
            */
            type.aliasSymbol        = aliasSymbol;
            type.aliasTypeArguments = aliasTypeArguments;
        }

        return type;
    }

    /**
     * Add the given types to the given type set. Order is preserved, duplicates are removed,
     * and nested types of the given kind are flattened into the set.
     *
     * @param typeSet
     * @param types
     */
    static addTypesToUnion( typeSet, types )
    {
        for ( const type of types )
        {
            UnionType.addTypeToUnion( typeSet, type );
        }
    }

    static addTypeToUnion( typeSet, type )
    {
        const flags = type.flags;

        if ( flags & TypeFlags.Union )
            UnionType.addTypesToUnion( typeSet, type.types );
        else if ( flags & TypeFlags.Any )
            typeSet.containsAny = true;
        else if ( flags & TypeFlags.Nullable )
        {
            if ( flags & TypeFlags.Undefined ) typeSet.containsUndefined = true;
            if ( flags & TypeFlags.Null ) typeSet.containsNull = true;
            if ( !( flags & TypeFlags.ContainsWideningType ) ) typeSet.containsNonWideningType = true;
        }
        else if ( !( flags & TypeFlags.Never || flags & TypeFlags.Intersection && type.isEmptyIntersectionType() ) )
        {
            // We ignore 'never' types in unions. Likewise, we ignore intersections of unit types as they are
            // another form of 'never' (in that they have an empty value domain). We could in theory turn
            // intersections of unit types into 'never' upon construction, but deferring the reduction makes it
            // easier to reason about their origin.
            if ( flags & TypeFlags.String ) typeSet.containsString = true;
            if ( flags & TypeFlags.Number ) typeSet.containsNumber = true;
            if ( flags & TypeFlags.ESSymbol ) typeSet.containsESSymbol = true;
            if ( flags & TypeFlags.StringOrNumberLiteralOrUnique ) typeSet.containsLiteralOrUniqueESSymbol = true;

            const len = typeSet.length;

            const index = len && type.id > typeSet[ len - 1 ].id ? ~len : binarySearch( typeSet, type );

            if ( index < 0 )
            {
                if ( !( flags & TypeFlags.Object && type.objectFlags & ObjectFlags.Anonymous &&
                        type.symbol && type.symbol.flags & ( SymbolFlags.Function | SymbolFlags.Method ) && containsIdenticalType( typeSet, type ) ) )
                    typeSet.splice( ~index, 0, type );
            }
        }
    }
}

set_ext_ref( 'UnionType', UnionType );

/**
 * @class
 */
class IntersectionType extends UnionOrIntersectionType
{
    constructor()
    {
        super();
        this.resolvedApparentType = null;
    }

    static addTypeToIntersection( typeSet: TypeSet, type: Type )
    {
        if ( type.flags & TypeFlags.Intersection )
            addTypesToIntersection( typeSet, type.types );
        else if ( type.flags & TypeFlags.Any )
            typeSet.containsAny = true;
        else if ( type.flags & TypeFlags.Never )
            typeSet.containsNever = true;
        else if ( type.getObjectFlags() & ObjectFlags.Anonymous && type.isEmptyObjectType() )
            typeSet.containsEmptyObject = true;
        else if ( ( !( type.flags & TypeFlags.Nullable ) ) && !contains( typeSet, type ) )
        {
            if ( type.flags & TypeFlags.Object )
                typeSet.containsObjectType = true;

            if ( type.flags & TypeFlags.Union && typeSet.unionIndex === undefined )
                typeSet.unionIndex = typeSet.length;

            if ( !( type.flags & TypeFlags.Object && type.objectFlags & ObjectFlags.Anonymous &&
                    type.symbol && type.symbol.flags & ( SymbolFlags.Function | SymbolFlags.Method ) && containsIdenticalType( typeSet, type ) ) )
                typeSet.push( type );
        }
    }

    /**
     * Add the given types to the given type set. Order is preserved, freshness is removed from literal
     * types, duplicates are removed, and nested types of the given kind are flattened into the set.
     *
     * @param typeSet
     * @param types
     */
    static addTypesToIntersection( typeSet, types )
    {
        for ( const type of types )
        {
            addTypeToIntersection( typeSet, type.getRegularTypeOfLiteralType() );
        }
    }


    /**
     * We normalize combinations of intersection and union types based on the distributive property of the '&'
     * operator. Specifically, because `X & (A | B)` is equivalent to `X & A | X & B`, we can transform intersection
     * types with union type constituents into equivalent union types with intersection type constituents and
     * effectively ensure that union types are always at the top level in type representations.
     *
     * We do not perform structural deduplication on intersection types. Intersection types are created only by the &
     * type operator and we can't reduce those because we want to support recursive intersection types. For example,
     * a type alias of the form `type List<T> = T & { next: List<T> }` cannot be reduced during its declaration.
     * Also, unlike union types, the order of the constituent types is preserved in order that overload resolution
     * for intersections of types with signatures can be deterministic.
     *
     * @param types
     * @param aliasSymbol
     * @param aliasTypeArguments
     * @return {*}
     */
    static getIntersectionType( types, aliasSymbol, aliasTypeArguments )
    {
        if ( types.length === 0 )
            return emptyObjectType;

        const typeSet = [];

        IntersectionType.addTypesToIntersection( typeSet, types );

        if ( typeSet.containsNever )
            return neverType;
        if ( typeSet.containsAny )
            return anyType;

        if ( typeSet.containsEmptyObject && !typeSet.containsObjectType )
            typeSet.push( emptyObjectType );

        if ( typeSet.length === 1 )
            return typeSet[ 0 ];

        const unionIndex = typeSet.unionIndex;

        if ( unionIndex !== undefined )
        {
            // We are attempting to construct a type of the form X & (A | B) & Y. Transform this into a type of
            // the form X & A & Y | X & B & Y and recursively reduce until no union type constituents remain.

            const unionType = typeSet[ unionIndex ];

            return getUnionType( unionType.types.map( t => getIntersectionType( replaceElement( typeSet, unionIndex, t ) ) ), UnionReduction.Literal, aliasSymbol, aliasTypeArguments );
        }

        const id = getTypeListId( typeSet );

        let type = intersectionTypes.get( id );

        if ( !type )
        {
            const propagatedFlags = getPropagatingFlagsOfTypes( typeSet, /*excludeKinds*/ TypeFlags.Nullable );

            type = new IntersectionType( TypeFlags.Intersection | propagatedFlags );

            intersectionTypes.set( id, type );
            type.types              = typeSet;
            type.aliasSymbol        = aliasSymbol; // See comment in `getUnionTypeFromSortedList`.
            type.aliasTypeArguments = aliasTypeArguments;
        }

        return type;
    }

    static getTypeFromIntersectionTypeNode( node )
    {
        const links = node.getNodeLinks();

        if ( !links.resolvedType )
        {
            links.resolvedType = getIntersectionType( node.types.map( getTypeFromTypeNode ), node.getAliasSymbolForTypeNode(), node.getAliasTypeArgumentsForTypeNode() );
        }
        return links.resolvedType;

    }

    getApparentType()
    {
        return this.resolvedApparentType || ( this.resolvedApparentType = this.getTypeWithThisArgument( this ) );
    }

    getTypeWithThisArgument( thisArgument )
    {
        return InterfaceType.getIntersectionType( this.types.map( t => t.getTypeWithThisArgument( thisArgument ) ) );
    }
}

export const
    Ternary = {
        False: 0,
        Maybe: 1,
        True: -1
    };

export class Signature extends Type
{
    constructor()
    {
        super();

        this.parameters = [];
        this.hasRestParameter = false;  // @todo
        this.minArgumentCount = this.parameters.length; // @todo
        this.typeParameters = [];

        this.declaration = { type: 'FunctionDeclaration' }; // @todo
    }

    getCanonicalSignature()
    {
        return '';
    }

    instantiateSignatureInContextOf( target, contextualMapper, compareTypes )
    {
        return '';
    }

    getThisTypeOfSignature()
    {

    }

    getNumNonRestParameters()
    {
        return this.parameters.length;
    }

    getNumParametersToCheckForSignatureRelatability( target )
    {

    }

    getTypeOfParameter( index )
    {
        return index < this.parameters.length ? this.parameters[ index ] : this.getRestTypeOfSignature();
    }

    getRestTypeOfSignature()
    {
        return this.hasRestParameter ? this.hasRestParameter : null;
    }

    getReturnTypeOfSignature()
    {
        if (!this.resolvedReturnType)
        {
            if (!signature.pushTypeResolution(TypeSystemPropertyName.ResolvedReturnType))
                return unknownType;

            let type;
            if (signature.target)
                type = instantiateType(getReturnTypeOfSignature(signature.target), signature.mapper);
            else if (signature.unionSignatures)
                type = getUnionType(map(signature.unionSignatures, getReturnTypeOfSignature), UnionReduction.Subtype);
            else
                type = getReturnTypeFromBody(<FunctionLikeDeclaration>signature.declaration);

            if (!popTypeResolution())
            {
                type = anyType;
                if (noImplicitAny) {
                    const declaration = <Declaration>signature.declaration;
                    const name = getNameOfDeclaration(declaration);
                    if (name) {
                        error(name, Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, declarationNameToString(name));
                    }
                    else {
                        error(declaration, Diagnostics.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions);
                    }
                }
            }
            signature.resolvedReturnType = type;
        }
        return signature.resolvedReturnType;
    }
}

export class VoidType extends Type
{
}

/**
 * Class and interface types (ObjectFlags.Class and ObjectFlags.Interface).
 * @class
 */
class InterfaceType extends ObjectType
{
    constructor( objectFlags, symbol )
    {
        super();

        this.flags       = TypeFlags.Object;
        this.objectFlags = objectFlags;
        this.symbol      = symbol;

        this.typeParameters              = void 0;           // Type parameters (undefined if non-generic)
        this.outerTypeParameters         = void 0;      // Outer type parameters (undefined if none)
        this.localTypeParameters         = void 0;      // Local type parameters (undefined if none)
        this.thisType                    = void 0;                   // The "this" type (undefined if none)
        this.resolvedBaseConstructorType = null;        // Resolved base constructor type of class
        this.resolvedBaseTypes           = null;             // Resolved base types
    }

    /**
     * @return {InterfaceTypeWithDeclaredMembers}
     */
    resolveDeclaredMembers()
    {
        const
            intr = new InterfaceTypeWithDeclaredMembers( this.flags, this.symbol );

        Object.assign( intr, this );
        Object.setPrototypeOf( intr, this );

        return intr.resolveMembers();
    }
}

class InterfaceTypeWithDeclaredMembers extends InterfaceType
{
    resolveMembers()
    {
        if ( !this.declaredProperties )
        {
            const symbol                     = this.symbol;
            const members                    = symbol.getMembers();
            this.declaredProperties          = getNamedMembers( members );
            this.declaredCallSignatures      = members.get( InternalSymbolName.Call ).getSignaturesOfSymbol();
            this.declaredConstructSignatures = members.get( InternalSymbolName.New ).getSignatures();
            this.declaredStringIndexInfo     = symbol.getIndexInfo( IndexKind.String );
            this.declaredNumberIndexInfo     = symbol.getIndexInfo( IndexKind.Number );
        }

        return this;
    }

    constructor( objectFlags, symbol )
    {
        super( objectFlags, symbol );

        /** @type {?Array<Symbol>} */
        this.declaredProperties = null;
        /** @type {?Array<Signature>} */
        this.declaredCallSignatures = null;
        /** @type {?Array<Signature>} */
        this.declaredConstructSignatures = null;
        /** @type {?IndexInfo} */
        this.declaredStringIndexInfo = null;
        /** @type {?IndexInfo} */
        this.declaredNumberIndexInfo = null;
    }
}

/**
 * Type references (ObjectFlags.Reference). When a class or interface has type parameters or
 * a "this" type, references to the class or interface are made using type references. The
 * typeArguments property specifies the types to substitute for the type parameters of the
 * class or interface and optionally includes an extra element that specifies the type to
 * substitute for "this" in the resulting instantiation. When no extra argument is present,
 * the type reference itself is substituted for "this". The typeArguments property is undefined
 * if the class or interface has no type parameters and the reference isn't specifying an
 * explicit "this" argument.
 *
 * @class
 */
class TypeReference extends ObjectType
{
    /**
     * @param {GenericType} target
     * @param {Type[]} typeArgs
     */
    constructor( target, typeArgs )
    {
        super( ObjectFlags.Reference, target.symbol );
        this.target        = target;    // Type reference target
        this.typeArguments = typeArgs;  // Type reference type arguments (undefined if none)
    }

    resolveMembers()
    {
        const
            source         = this.target.resolveDeclaredMembers(),
            typeParameters = concatenate( source.typeParameters, [ source.thisType ] );

        const typeArguments = this.typeArguments && this.typeArguments.length === typeParameters.length ?
                              this.typeArguments : concatenate( this.typeArguments, [ this ] );
        super.resolveMembers( source, typeParameters, typeArguments );
    }

    /**
     * @param thisArgument
     */
    getTypeWithThisArgument( thisArgument )
    {
        const
            target        = this.target,
            typeArguments = this.typeArguments;

        if ( length( target.typeParameters ) === length( typeArguments ) )
            return createTypeReference( target, concatenate( typeArguments, [ thisArgument || target.thisType ] ) );

        return this;
    }
}

/**
 * @param {GenericType} target
 * @param {Type[]} typeArguments
 * @return {TypeReference}
 */
function createTypeReference( target, typeArguments )
{
    const id = getTypeListId( typeArguments );

    let type = target.instantiations.get( id );

    if ( !type )
    {
        type = new TypeReference( target, typeArguments );
        target.instantiations.set( id, type );
        type.flags |= typeArguments ? getPropagatingFlagsOfTypes( typeArguments, /*excludeKinds*/ 0 ) : 0;
    }

    return type;
}


/**
 * Generic class and interface types
 * @class
 */
class GenericType extends ObjectType
{
    constructor()
    {
        super();
        this.instantiations = new Map();  // Generic instantiation cache
        this.variances      = null;  // Variance of each type parameter
    }
}

/**
 * @class
 */
class TypeParameter extends Type
{
    /**
     * @param {?Symbol} [symbol]
     * @param {?Symbol} [target]
     */
    constructor( symbol, target )
    {
        super( TypeFlags.TypeParameter );
        this.symbol = null;
        this.target = null;
    }
}

/**
 * Intrinsic types (TypeFlags.Intrinsic)
 *
 * @class
 */
class IntrinsicType extends Type
{
    constructor( typeFlags, name )
    {
        super( typeFlags );
        this.intrinsicName = name;
    }
}

/**
 * String literal types (TypeFlags.StringLiteral)
 * Numeric literal types (TypeFlags.NumberLiteral)
 * @class
 */
class LiteralType extends Type
{
    /**
     * @param {TypeFlags|number} flags
     * @param {string|number} value
     * @param {Symbol} symbol
     */
    constructor( flags, value, symbol )
    {
        super( flags );

        this.value       = value;     // Value of literal
        this.symbol      = symbol;
        this.freshType   = null;    // Fresh version of type
        this.regularType = null;  // Regular version of type
    }

    getFreshType()
    {
        if ( !( this.flags & TypeFlags.FreshLiteral ) )
        {
            if ( !this.freshType )
            {
                const freshType       = new LiteralType( this.flags | TypeFlags.FreshLiteral, this.value, this.symbol );
                freshType.regularType = this;
                this.freshType        = freshType;
            }

            return this.freshType;
        }

        return this;
    }

    getRegularType()
    {
        return this.regularType;
    }
}

/**
 * Unique symbol types (TypeFlags.UniqueESSymbol)
 * @class
 */
class UniqueESSymbolType extends Type
{
    constructor()
    {
        super();
        this.symbol = null;
    }
}

/**
 * @class
 */
class StringLiteralType extends LiteralType
{
    constructor()
    {
        super();
        this.value = null;
    }
}

/**
 * @class
 */
class NumberLiteralType extends LiteralType
{
    constructor()
    {
        super();
        this.value = null;
    }
}

/**
 * Object types (TypeFlags.ObjectType)
 * @class ObjectType
 * @extends Type
 */
class ObjectType extends Type
{
    /**
     * @param {ObjectFlags} flags
     * @param {Symbol} symbol
     */
    constructor( flags, symbol )
    {
        super( TypeFlags.Object );

        /** @type {ObjectFlags|number} */
        this.objectFlags = flags;
        this.symbol = symbol;

        // From ResolvedType
        this.members             = null;              // Properties by name
        this.properties          = null;              // Properties
        this.callSignatures      = null;       // Call signatures of type
        this.constructSignatures = null;  // Construct signatures of type
        this.stringIndexInfo     = null;       // String indexing info
        this.numberIndexInfo     = null;       // Numeric indexing info
    }

    isGenericObjectType()
    {
        return false;
    }

    isGenericIndexType()
    {
        return false;
    }

    /**
     * @return {ObjectFlags|number}
     */
    get objectFlags()
    {
        return this._objectFlags || ( this._objectFlags = ObjectFlags() );
    }

    /**
     * @param {ObjectFlags|number} v
     */
    set objectFlags( v )
    {
        this._objectFlags = ObjectFlags( v );
    }

    setStructuredTypeMembers( members, callSignatures, constructSignatures, stringIndexInfo, numberIndexInfo )
    {
        this.members             = members;
        this.callSignatures      = callSignatures;
        this.constructSignatures = constructSignatures;
        this.stringIndexInfo     = stringIndexInfo;
        this.numberIndexInfo     = numberIndexInfo;
    }

    getIndexInfoOfStructuredType( kind )
    {
        if ( this.flags & TypeFlags.StructuredType )
        {
            const resolved = this.resolveStructuredTypeMembers();

            return kind === IndexKind.String ? resolved.stringIndexInfo : resolved.numberIndexInfo;
        }
    }

    getIndexTypeOfStructuredType( kind )
    {
        const info = this.getIndexInfoOfStructuredType( kind );
        return info && info.type;
    }

    /**
     * @param {InterfaceTypeWithDeclaredMembers} source
     * @param {Array<TypeParameter>} typeParameters
     * @param {Type[]} typeArguments
     */
    resolveObjectTypeMembers( source, typeParameters, typeArguments )
    {
        let mapper,
            members, // SymbolTable;
            callSignatures, // Signature[];
            constructSignatures, // Signature[];
            stringIndexInfo, // IndexInfo;
            numberIndexInfo; // IndexInfo;

        if ( rangeEquals( typeParameters, typeArguments, 0, typeParameters.length ) )
        {
            mapper              = identityMapper;
            members             = source.symbol ? getMembersOfSymbol( source.symbol ) : createSymbolTable( source.declaredProperties );
            callSignatures      = source.declaredCallSignatures;
            constructSignatures = source.declaredConstructSignatures;
            stringIndexInfo     = source.declaredStringIndexInfo;
            numberIndexInfo     = source.declaredNumberIndexInfo;
        }
        else
        {
            mapper              = createTypeMapper( typeParameters, typeArguments );
            members             = createInstantiatedSymbolTable( source.declaredProperties, mapper, /*mappingThisOnly*/ typeParameters.length === 1 );
            callSignatures      = instantiateSignatures( source.declaredCallSignatures, mapper );
            constructSignatures = instantiateSignatures( source.declaredConstructSignatures, mapper );
            stringIndexInfo     = instantiateIndexInfo( source.declaredStringIndexInfo, mapper );
            numberIndexInfo     = instantiateIndexInfo( source.declaredNumberIndexInfo, mapper );
        }

        const baseTypes = getBaseTypes( source );

        if ( baseTypes.length )
        {
            if ( source.symbol && members === getMembersOfSymbol( source.symbol ) )
                members = createSymbolTable( source.declaredProperties );

            this.setStructuredTypeMembers( members, callSignatures, constructSignatures, stringIndexInfo, numberIndexInfo );

            const thisArgument = lastOrUndefined( typeArguments );

            for ( const baseType of baseTypes )
            {
                const instantiatedBaseType = thisArgument ? getTypeWithThisArgument( instantiateType( baseType, mapper ), thisArgument ) : baseType;
                addInheritedMembers( members, getPropertiesOfType( instantiatedBaseType ) );
                callSignatures      = concatenate( callSignatures, getSignaturesOfType( instantiatedBaseType, SignatureKind.Call ) );
                constructSignatures = concatenate( constructSignatures, getSignaturesOfType( instantiatedBaseType, SignatureKind.Construct ) );
                if ( !stringIndexInfo )
                    stringIndexInfo = instantiatedBaseType === anyType ?
                                      createIndexInfo( anyType, /*isReadonly*/ false ) :
                                      getIndexInfoOfType( instantiatedBaseType, IndexKind.String );

                numberIndexInfo = numberIndexInfo || getIndexInfoOfType( instantiatedBaseType, IndexKind.Number );
            }
        }
        this.setStructuredTypeMembers( members, callSignatures, constructSignatures, stringIndexInfo, numberIndexInfo );
    }
}

export function getType()
{
    return {
        Type,
        UnionType,
        IntersectionType,
        GenericType,
        TypeReference,
        InterfaceType,
        InterfaceTypeWithDeclaredMembers,
        Signature,
        TypeParameter,
        LiteralType,
        NumberLiteralType,
        StringLiteralType,
        UniqueESSymbolType,
        IntrinsicType,
        ObjectType,

        voidType,
        neverType,
        falseType
    };
}
