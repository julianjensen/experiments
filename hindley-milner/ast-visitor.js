/** ******************************************************************************************************************
 * @file Describe what ast-visitor does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 23-Apr-2018
 *********************************************************************************************************************/
"use strict";

const
    { Syntax1, VisitorKeys1 } = require( 'espree' ),
    { Syntax2, VisitorKeys2 } = require( 'estraverse' ),
    Syntax = { ...Syntax1, ...Syntax2 },
    VisitorKeys = { ...VisitorKeys1, ...VisitorKeys2 };

function to_target( node )
{
    return obj => {};
}

function infer( node, parent )
{
    return { type: 'any', value: void 0 };
}

function infer_param( node, parent )
{

}

function destructure( left, right )
{

}

function declaration( type, name, params, body )
{

}

function wrap_in_promise( type )
{

}

function apply( left, right )
{

}

function ensure( type, typeExpr )
{

}

function function_call( func, params )
{

}

class AstVisitor
{
    AssignmentExpression( node, parent )
    {
        if ( node.left.type === Syntax.ArrayPattern || node.left.type === Syntax.ObjectPattern )
            destructure( node.left, node.right );
        else
            to_target( node.left )( infer( node.right, node ) );
    }

    AssignmentPattern( node, parent )
    {
    }

    ArrayExpression( node, parent )
    {
    }

    /**
     * This should be handled by the `destructure()` function.
     */
    ArrayPattern()
    {
        throw new TypeError( `Unexpected ArrayPattern` );
    }


    ArrowFunctionExpression( node, parent )
    {
        declaration( 'arrow', void 0, node.params, node.body );
    }


    AwaitExpression( node, parent )
    {
        // Set current function to `async`
        return wrap_in_promise( infer( node.argument, node ) );
    }


    BinaryExpression( node, parent )
    {
        return apply( infer( node.left, node ), infer( node.right, node ) );
    }


    CallExpression( node, parent )
    {
        const withParent = n => infer( n, node );

        function_call( ensure( 'function', infer( node.callee, node ) ), node.params.map( withParent ) );
    }


    CatchClause( node, parent )
    {
        const syms = get_symbols( node );

        syms.add( infer( node.param, node ) );

    }


    ClassBody( node, parent )
    {
    }


    ClassDeclaration( node, parent )
    {
    }


    ClassExpression( node, parent )
    {
    }


    ConditionalExpression( node, parent )
    {
    }


    ContinueStatement( node, parent )
    {
    }


    DoWhileStatement( node, parent )
    {
    }


    DebuggerStatement( node, parent )
    {
    }


    EmptyStatement( node, parent )
    {
    }


    ExperimentalRestProperty( node, parent )
    {
    }


    ExperimentalSpreadProperty( node, parent )
    {
    }


    ExpressionStatement( node, parent )
    {
    }


    ForStatement( node, parent )
    {
    }


    ForInStatement( node, parent )
    {
    }


    ForOfStatement( node, parent )
    {
    }


    FunctionDeclaration( node, parent )
    {
    }


    FunctionExpression( node, parent )
    {
    }


    Identifier( node, parent )
    {
    }


    IfStatement( node, parent )
    {
    }


    Literal( node, parent )
    {
    }


    LabeledStatement( node, parent )
    {
    }


    LogicalExpression( node, parent )
    {
    }


    MemberExpression( node, parent )
    {
    }


    MetaProperty( node, parent )
    {
    }


    MethodDefinition( node, parent )
    {
    }


    NewExpression( node, parent )
    {
    }


    ObjectExpression( node, parent )
    {
    }


    ObjectPattern( node, parent )
    {
    }


    Program( node, parent )
    {
    }


    Property( node, parent )
    {
    }


    RestElement( node, parent )
    {
    }


    ReturnStatement( node, parent )
    {
    }


    SequenceExpression( node, parent )
    {
    }


    SpreadElement( node, parent )
    {
    }


    Super( node, parent )
    {
    }


    SwitchCase( node, parent )
    {
    }


    SwitchStatement( node, parent )
    {
    }


    TaggedTemplateExpression( node, parent )
    {
    }


    TemplateElement( node, parent )
    {
    }


    TemplateLiteral( node, parent )
    {
    }


    ThisExpression( node, parent )
    {
    }


    ThrowStatement( node, parent )
    {
    }


    TryStatement( node, parent )
    {
    }


    UnaryExpression( node, parent )
    {
    }


    UpdateExpression( node, parent )
    {
    }


    VariableDeclaration( node, parent )
    {
    }


    VariableDeclarator( node, parent )
    {
    }


    WhileStatement( node, parent )
    {
    }


    WithStatement( node, parent )
    {
    }


    YieldExpression( node, parent )
    {
    }


    JSXIdentifier( node, parent )
    {
    }


    JSXNamespacedName( node, parent )
    {
    }


    JSXMemberExpression( node, parent )
    {
    }


    JSXEmptyExpression( node, parent )
    {
    }


    JSXExpressionContainer( node, parent )
    {
    }


    JSXElement( node, parent )
    {
    }


    JSXClosingElement( node, parent )
    {
    }


    JSXOpeningElement( node, parent )
    {
    }


    JSXAttribute( node, parent )
    {
    }


    JSXSpreadAttribute( node, parent )
    {
    }


    JSXText( node, parent )
    {
    }


    ExportDefaultDeclaration( node, parent )
    {
    }


    ExportNamedDeclaration( node, parent )
    {
    }


    ExportAllDeclaration( node, parent )
    {
    }


    ExportSpecifier( node, parent )
    {
    }


    ImportDeclaration( node, parent )
    {
    }


    ImportSpecifier( node, parent )
    {
    }


    ImportDefaultSpecifier( node, parent )
    {
    }


    ImportNamespaceSpecifier( node, parent )
    {
    }
}
