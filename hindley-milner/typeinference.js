/** ******************************************************************************************************************
 * @description
 * ## Algorithm W (Damas-Hindley-Milner)
 *
 * This is based on Robert Smallshire's [Python code](http:*bit.ly/bbVmmX).
 * Which is based on Andrew's [Scala code](http:*bit.ly/aztXwD). Which is based
 * on Nikita Borisov's [Perl code](http:*bit.ly/myq3uA). Which is based on Luca
 * Cardelli's [Modula-2 code](http:*bit.ly/Hjpvb). Wow.
 *
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 15-Apr-2018
 *********************************************************************************************************************/
"use strict";


// Type variable and built-in types are defined in the `types` module.
const
    {
        TypeVariable,
        TypeOperator,
        FunctionType,
        NumberType,
        StringType,
        BoolType,
        NullType,
        UndefinedType,
        VoidType,

        Identifier,
        Apply,
        Lambda,
        Let,
        Letrec,

        ParseError,
        InferenceError
    } = require( './types' );

/**
 * ### Unification
 *
 * This is the process of finding a type that satisfies some given constraints.
 * In this system, unification will try to satisfy that either:
 *
 * 1. `t1` and `t2` are equal type variables
 * 2. `t1` and `t2` are equal types
 *
 * In case #1, if `t1` is a type variable and `t2` is not currently equal,
 * unification will set `t1` to have an instance of `t2`. When `t1` is pruned,
 * it will unchain to a type without an instance.
 *
 * In case #2, do a deep unification on the type, using recursion.
 *
 * If neither constraint can be met, the process will throw an error message.
 *
 * @param t1
 * @param t2
 */
function unify( t1, t2 )
{
    t1 = prune( t1 );
    t2 = prune( t2 );

    if ( t1 instanceof TypeVariable )
    {
        if ( t1 !== t2 )
        {
            if ( occursInType( t1, t2 ) )
                throw new TypeError( "Recursive unification" );

            t1.instance = t2;
        }
    }
    else if ( t1 instanceof TypeOperator && t2 instanceof TypeVariable )
        unify( t2, t1 );
    else if ( t1 instanceof TypeOperator && t2 instanceof TypeOperator )
    {
        if ( t1.name !== t2.name || t1.types.length !== t2.types.length )
            throw new TypeError( "Type error: " + t1 + " is not " + t2 );

        t1.types.forEach( ( at, i ) => unify( at, t2.types[ i ] ) );
    }
    else
        throw new TypeError( "Not unified" );
}

/**
 * ### Prune
 *
 * This will unchain variables until it gets to a type or variable without an
 * instance. See `unify` for some details about type variable instances.
 *
 * @param type
 * @return {*}
 */
function prune( type )
{
    if ( type instanceof TypeVariable && type.instance )
        return type.instance = prune( type.instance );

    return type;
}

/**
 * ### Fresh type
 *
 * Getting a "fresh" type will create a recursive copy. When a generic type
 * variable is encountered, a new variable is generated and substituted in.
 *
 * *Note*: Copied types are instantiated through the `TypeOperator` constructor, this
 * means `instanceof` can't be used for determining a subtype.
 *
 * A fresh type is only returned when an identifier is found during analysis.
 * See `analyse` for some context.
 *
 * @param type
 * @param nonGeneric
 * @param mappings
 * @return {*}
 */
function fresh( type, nonGeneric, mappings = {} )
{
    type = prune( type );

    if ( type instanceof TypeVariable )
    {
        if ( occursInTypeArray( type, nonGeneric ) )
            return type;
        else
        {
            if ( !mappings[ type.id ] )
                mappings[ type.id ] = new TypeVariable();

            return mappings[ type.id ];
        }
    }

    return new TypeOperator( type.name, type.types.map( type => fresh( type, nonGeneric, mappings ) ) );
}

/**
 * ### Occurs check
 *
 * These functions check whether the type `t2` is equal to or contained within
 * the type `t1`. Used for checking recursive definitions in `unify` and
 * checking if a variable is non-generic in `fresh`.
 *
 * @param t1
 * @param t2
 * @return {boolean}
 */
function occursInType( t1, t2 )
{
    t2 = prune( t2 );

    if ( t2 === t1 )
        return true;
    else if ( t2 instanceof TypeOperator )
        return occursInTypeArray( t1, t2.types );

    return false;
}

/**
 * @param t1
 * @param types
 * @return {boolean}
 */
function occursInTypeArray( t1, types )
{
    return types.some( t2 => occursInType( t1, t2 ) );
}

/**
 * ### Type analysis
 *
 * `analyse` is the core inference function. It takes an AST node and returns
 * the infered type.
 *
 * @param node
 * @param env
 * @param {Array} nonGeneric
 * @return {*}
 */
function analyse( node, env, nonGeneric = [] )
{
    return node.accept( {
        /**
         * #### Function definition
         *
         * Assigns a type variable to each typeless argument and return type.
         *
         * Each typeless argument also gets added to the non-generic scope
         * array. The `fresh` function can then return the existing type from
         * the scope.
         *
         * Assigns the function's type in the environment and returns it.
         *
         * @return {FunctionType}
         */
        visitFunction() {
            let types = [],
                newNonGeneric = nonGeneric.slice();

            node.args.forEach( arg => {
                let argType;

                if ( arg.type )
                    argType = nodeToType( arg.type );
                else
                {
                    argType = new TypeVariable( arg.name );
                    newNonGeneric.push( argType );
                }

                env[ arg.name ] = argType;
                types.push( argType );
            } );

            let resultType = analyse( node.value, env, newNonGeneric );
            types.push( resultType );

            let annotationType;

            if ( node.type )
            {
                annotationType = nodeToType( node.type );
                unify( resultType, annotationType );
            }

            return env[ node.name ] = new FunctionType( types );
        },

        /**
         * #### Function call
         *
         * Ensures that all argument types `unify` with the defined function and
         * returns the function's result type.
         *
         * @return {TypeVariable}
         */
        visitCall()
        {
            const types = [];

            node.args.forEach( arg => types.push( analyse( arg, env, nonGeneric ) ) );

            const resultType = new TypeVariable();
            types.push( resultType );

            unify( new FunctionType( types ), analyse( node.name, env, nonGeneric ) );

            return resultType;
        },

        /**
         * #### Let binding
         *
         * Infer the value's type, assigns it in the environment and returns it.
         *
         * @return {*}
         */
        visitLet()
        {
            const valueType = analyse( node.value, env, nonGeneric );

            if ( node.type )
                unify( valueType, nodeToType( node.type ) );

            return env[ node.name ] = valueType;
        },

        /**
         * #### Identifier
         *
         * Creates a `fresh` copy of a type if the name is found in an
         * enviroment, otherwise throws an error.
         *
         * @return {*}
         */
        visitIdentifier()
        {
            const name = node.value;

            if ( !env[ name ] )
                throw new TypeError( JSON.stringify( name ) + " is not defined" );

            return fresh( env[ name ], nonGeneric );
        },
        /**
         * #### Primitive type
         *
         * @return {NumberType|*}
         */
        visitNumber()
        {
            return new NumberType();
        },
        visitString()
        {
            return new StringType();
        }
    } );
}

/**
 * ### Type analysis
 *
 * `analyse` is the core inference function. It takes an AST node and returns
 * the infered type.
 *
 * @param node
 * @param env
 * @param {Array} nonGeneric
 * @return {*}
 */
function analyse2( node, env, nonGeneric = [] )
{
    let types = [],
        resultType;

    switch ( node.type )
    {
        case 'FunctionDeclaration':
            let newNonGeneric = nonGeneric.slice();

            node.params.forEach( arg => {
                let argType = is_literal( arg );

                if ( !argType )
                {
                    argType = new TypeVariable();
                    newNonGeneric.push( argType );
                }

                // env[ arg.name ] = argType;
                types.push( argType );
            } );

            resultType = node.returns ? analyse2( node.returns, env, newNonGeneric ) : new VoidType();
            types.push( resultType );

            let annotationType;

            if ( node.typed )
            {
                annotationType = is_literal( node.typed );
                unify( resultType, annotationType );
            }

            return env[ node.name ] = new FunctionType( types );
        case 'CallExpression':
            types = [];

            node.arguments.forEach( arg => types.push( analyse( arg, env, nonGeneric ) ) );

            resultType = new TypeVariable();
            types.push( resultType );

            unify( new FunctionType( types ), analyse2( node.name, env, nonGeneric ) );

            return resultType;
        case 'VariableDeclarator':
            const valueType = analyse2( node.init, env, nonGeneric );

            if ( node.typed )
                unify( valueType, is_literal( node.typed ) );

            return env[ node.id ] = valueType;

        case 'Identifier':
            const name = node.name;

            if ( !env[ name ] )
                throw new TypeError( JSON.stringify( name ) + " is not defined" );

            return fresh( env[ name ], nonGeneric );

        case 'Literal':
            return is_literal( node );
    }
}


/**
 * Converts an AST node to type system type.
 *
 * @param type
 * @return {*}
 */
function nodeToType( type )
{
    switch ( type.value )
    {
        case 'Number':
            return new NumberType();
        case 'String':
            return new StringType();
    }
}

/**
 * @param {string} name
 * @param {object} env
 * @param {Array} nonGeneric
 * @return {*}
 */
function get_type( name, env, nonGeneric )
{

    if ( env[ name ] )
        return fresh( env[ name ], nonGeneric );

    const t = is_literal( name );

    if ( !t )
        throw new ParseError( `Undefined symbol ${name}` );

    return t;
}


function is_literal( node )
{
    if ( node.type !== 'Literal' ) return null;

    switch ( typeof node.value )
    {
        case 'string':  return new StringType();
        case 'number':  return new NumberType();
        case 'boolean': return new BoolType();
        case 'null':    return new NullType();
        case 'undefined': return new UndefinedType();
        case 'void': return new VoidType();
    }
}

/**
 * Run inference on an array of AST nodes.
 *
 * @param ast
 * @param builtins
 * @return {*}
 */
function typecheck( ast, builtins = {} )
{
    return ast.map( node => analyse( node, builtins ) );
}

/**
 * Run inference on an array of AST nodes.
 *
 * @param ast
 * @param builtins
 * @return {*}
 */
function typecheck2( ast, builtins = {} )
{
    return ast.map( node => analyse2( node, builtins ) );
}

module.exports = typecheck;

// ## Examples
if ( !module.parent )
{
    const
        env = {},
        types2 = typecheck2( [
                                 {
                                     type: 'VariableDeclarator',
                                     id: 'strVar',
                                     init: {
                                         type: 'Literal',
                                         value: 'string'
                                     }
                                 },
                                 {
                                     type: 'FunctionDeclaration',
                                     name: 'funky',
                                     params: [ { type: 'Literal', value: 'number' } ],
                                     returns: { type: 'Literal', value: 'string' }
                                 },
                                 {

                                 }
                             ], env ),
        types = typecheck( [
                               // let a = "hello"
                               //
                               // Result: String
                               {
                                   accept: a => a.visitLet(),
                                   value:  {
                                       accept: a => a.visitString(),
                                       value:  "hello"
                                   }
                               },
                               // let a = 10
                               //
                               // Result: Number
                               {
                                   accept: a => a.visitLet(),
                                   value:  {
                                       accept: a => a.visitNumber(),
                                       value:  10
                                   }
                               },
        // fun id x = x
        //
        // Result: Function('a,'a)
        {
            accept: a => a.visitFunction(),
            name:   "id",
            args:   [ { name: "x" } ],
            value:  {
                accept: a => a.visitIdentifier(),
                value:  "x"
            }
        },
        // fun explicitNumber (x : Number) = x
        //
        // Result: Function(Number,Number)
        {
            accept: a => a.visitFunction(),
            name:   "explicitNumber",
            args:   [
                {
                    name: "x",
                    type: {
                        value: 'Number'
                    }
                }
            ],
            value:  {
                accept: a => a.visitIdentifier(),
                value:  "x"
            }
        },
        // fun ignoreArg a = 100
        //
        // Result: Function('b, Number)
        {
            accept: a => a.visitFunction(),
            name:   "ignoreArg",
            args:   [ { name: "a" } ],
            value:  {
                accept: a => a.visitNumber(),
                value:  100
            }
        },
        // id 200
        //
        // Result: Number
        {
            accept: a => a.visitCall(),
            name:   {
                accept: a => a.visitIdentifier(),
                value:  "id"
            },
            args:   [
                {
                    accept: a => a.visitNumber(),
                    value:  100
                }
            ]
        }
    ] );

    console.log( types.toString() );
    console.log( types2.toString() );
    console.log( JSON.stringify( env, null, 4 ) );
}
