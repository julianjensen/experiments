/** ******************************************************************************************************************
 * @file Describe what types does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 15-Apr-2018
 *********************************************************************************************************************/
"use strict";

/** */
class InferenceError extends Error {}

/** */
class ParseError extends Error {}

/**
 * ## Type variable
 *
 * A type variable represents a parameter with an unknown type or any
 * polymorphic type. For example:
 *
 *     fun id x = x
 *
 * Here, `id` has the polymorphic type `'a -> 'a`.
 */
class TypeVariable
{
    /** */
    constructor( name = '<anon>' )
    {
        this.name = name;
        this.id = TypeVariable.nextId++;
        this.instance = null;
    }

    /**
     * Type variables should look like `'a`. If the variable has an instance, that
     * should be used for the string instead.
     *
     * @return {string}
     */
    toString()
    {
        return this.name + ' ::= ' + ( this.instance ? this.instance.toString() : "'" + String.fromCharCode( 0x61 + this.id ) );
    }
}

TypeVariable.nextId = 0;

/**
 * ## Type operator
 *
 * Base type for all specific types. Using this type as the prototype allows the
 * use of `instanceof` to detect a type variable or an actual type.
 */
class TypeOperator
{
    /**
     * @param {string} name
     * @param {Array<TypeOperator>} types
     */
    constructor( name, types )
    {
        this.name = name;
        this.types = types;
    }

    /**
     * @return {string}
     */
    toString()
    {
        return !this.types.length ? this.name :
               this.types.length === 2 ? `(${this.types[ 0 ]} ${this.name} ${this.types[ 1 ]})` :
               this.name + `(${this.types.map( type => '' + type )})`;
    }
}

/**
 * ## Specific types
 *
 * A `FunctionType` contains a `types` array. The last element represents the
 * return type. Each element before represents an argument type.
 */
class FunctionType extends TypeOperator
{
    /**
     * @param {Array<TypeVariable>} types
     * @param {string} [identifier]
     */
    constructor( types, identifier )
    {
        super( "->", types, identifier );
    }
}

/** */
class NumberType extends TypeOperator
{
    /**
     *
     */
    constructor( identifier )
    {
        super( "Number", [], identifier );
    }
}

/** */
class StringType extends TypeOperator
{
    /** */
    constructor()
    {
        super( "String", [] );
    }
}

/** */
class BoolType extends TypeOperator
{
    /** */
    constructor()
    {
        super( "Boolean", [] );
    }
}

/** */
class NullType extends TypeOperator
{
    /** */
    constructor()
    {
        super( "Null", [] );
    }
}

/** */
class UndefinedType extends TypeOperator
{
    /** */
    constructor()
    {
        super( "Undefined", [] );
    }
}

/** */
class VoidType extends TypeOperator
{
    /** */
    constructor()
    {
        super( "Void", [] );
    }
}


class Lambda
{
    constructor( v, body )
    {
        this.v = v;
        this.body = body;
    }

    toString()
    {
        return `(fn ${this.v} => ${this.body})`;
    }
}

class Identifier
{
    constructor( name )
    {
        this.name = name;
    }

    toString()
    {
        return this.name;
    }
}

class Apply
{
    constructor( fn, arg )
    {
        this.fn = fn;
        this.arg = arg;
    }

    toString()
    {
        return `(${this.fn} ${this.arg})`;
    }
}

class Let
{
    constructor( v, defn, body )
    {
        this.v = v;
        this.defn = defn;
        this.body = body;
    }

    toString()
    {
        return `(let ${this.v} = ${this.defn} in ${this.body})`;
    }
}

class Letrec
{
    constructor( v, defn, body )
    {
        this.v = v;
        this.defn = defn;
        this.body = body;
    }

    toString()
    {
        return `(letrec ${this.v} = ${this.defn} in ${this.body})`;
    }
}


module.exports = {
    TypeVariable,
    TypeOperator,
    FunctionType,
    NumberType,
    StringType,
    BoolType,
    NullType,
    UndefinedType,
    VoidType,

    Lambda,
    Identifier,
    Apply,
    Let,
    Letrec
};
