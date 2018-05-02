/* eslint-disable max-len,max-lines,operator-linebreak */
/** *********************************************************************************************************************
 * Enums extracted from /mnt/e/code/typescript/src/compiler/types.ts
 ************************************************************************************************************************/
"use strict";

import util from "util";

let tmp;

const
    isObject = o => typeof o === 'object' && !Array.isArray( o ) && o !== null,
    wrapped = ( lhs, rhs ) => ( { enumerable: true, writable: true, configurable: true, value: { toString: () => lhs, valueOf: () => rhs, [ Symbol.toPrimitive ]: hint => hint === 'string' ? lhs : rhs } } ),
    named = name => ( { enumerable: true, writable: true, configurable: true, value: name } ),
    VALUE = Symbol( 'value' ),
    asString = function( base ) {
        return function( _num = 0 ) {
            let i   = 1,
                s   = [],
                num = +_num;

                if ( typeof _num === 'string' ) return _num;

                while ( num )
                {
                    if ( num & 1 )
                        s.push( `${base[ i ]}` );

                    num >>>= 1;
                    i <<= 1;
                }

                return s.join( ' | ' );
            };
        },
    templ = () => ( {
        create( val )
        {
            const o = Object.create( Object.getPrototypeOf( this ) );
            o[ VALUE ] = +( isObject( val ) && Reflect.has( val, VALUE ) ? val[ VALUE ] : ( +val || 0 ) );
            return o;
        },
        get value() { return this[ VALUE ]; },
        set value( v ) { this[ VALUE ] = v; },
        asString,
        toString() { return this[ VALUE ] ? this.asString( this[ VALUE ] ) : '<no value>'; },
        valueOf() { return this[ VALUE ] || 0; },
        [ Symbol.toPrimitive ]( hint ) { return hint === 'string' ? this.toString() : this.valueOf(); },
        [ util.inspect.custom ]( depth, options ) { return this.toString(); }
    } );

/** *********************************************************************************************************************
 * @enum
 * @name Comparison
 ************************************************************************************************************************/
let Comparison = {};
Comparison.LessThan = wrapped( 'LessThan', -1 );
Comparison[ +Comparison.LessThan.value ] = typeof Comparison[ +Comparison.LessThan.value ] !== 'number' ? named( 'LessThan' ) : Comparison[ +Comparison.LessThan.value ];
Comparison.EqualTo = wrapped( 'EqualTo', 0 );
Comparison[ +Comparison.EqualTo.value ] = typeof Comparison[ +Comparison.EqualTo.value ] !== 'number' ? named( 'EqualTo' ) : Comparison[ +Comparison.EqualTo.value ];
Comparison.GreaterThan = wrapped( 'GreaterThan', 1 );
Comparison[ +Comparison.GreaterThan.value ] = typeof Comparison[ +Comparison.GreaterThan.value ] !== 'number' ? named( 'GreaterThan' ) : Comparison[ +Comparison.GreaterThan.value ];

Comparison = Object.create( tmp = templ(), Comparison );
tmp.asString = asString( Comparison );

/** *********************************************************************************************************************
 * @enum
 * @name NodeFlags
 ************************************************************************************************************************/
let NodeFlags = {};
NodeFlags.None = wrapped( 'None', 0 );
NodeFlags[ +NodeFlags.None.value ] = typeof NodeFlags[ +NodeFlags.None.value ] !== 'number' ? named( 'None' ) : NodeFlags[ +NodeFlags.None.value ];
NodeFlags.Let = wrapped( 'Let', 1 << 0 );
NodeFlags[ +NodeFlags.Let.value ] = typeof NodeFlags[ +NodeFlags.Let.value ] !== 'number' ? named( 'Let' ) : NodeFlags[ +NodeFlags.Let.value ];
NodeFlags.Const = wrapped( 'Const', 1 << 1 );
NodeFlags[ +NodeFlags.Const.value ] = typeof NodeFlags[ +NodeFlags.Const.value ] !== 'number' ? named( 'Const' ) : NodeFlags[ +NodeFlags.Const.value ];
NodeFlags.NestedNamespace = wrapped( 'NestedNamespace', 1 << 2 );
NodeFlags[ +NodeFlags.NestedNamespace.value ] = typeof NodeFlags[ +NodeFlags.NestedNamespace.value ] !== 'number' ? named( 'NestedNamespace' ) : NodeFlags[ +NodeFlags.NestedNamespace.value ];
NodeFlags.Synthesized = wrapped( 'Synthesized', 1 << 3 );
NodeFlags[ +NodeFlags.Synthesized.value ] = typeof NodeFlags[ +NodeFlags.Synthesized.value ] !== 'number' ? named( 'Synthesized' ) : NodeFlags[ +NodeFlags.Synthesized.value ];
NodeFlags.Namespace = wrapped( 'Namespace', 1 << 4 );
NodeFlags[ +NodeFlags.Namespace.value ] = typeof NodeFlags[ +NodeFlags.Namespace.value ] !== 'number' ? named( 'Namespace' ) : NodeFlags[ +NodeFlags.Namespace.value ];
NodeFlags.ExportContext = wrapped( 'ExportContext', 1 << 5 );
NodeFlags[ +NodeFlags.ExportContext.value ] = typeof NodeFlags[ +NodeFlags.ExportContext.value ] !== 'number' ? named( 'ExportContext' ) : NodeFlags[ +NodeFlags.ExportContext.value ];
NodeFlags.ContainsThis = wrapped( 'ContainsThis', 1 << 6 );
NodeFlags[ +NodeFlags.ContainsThis.value ] = typeof NodeFlags[ +NodeFlags.ContainsThis.value ] !== 'number' ? named( 'ContainsThis' ) : NodeFlags[ +NodeFlags.ContainsThis.value ];
NodeFlags.HasImplicitReturn = wrapped( 'HasImplicitReturn', 1 << 7 );
NodeFlags[ +NodeFlags.HasImplicitReturn.value ] = typeof NodeFlags[ +NodeFlags.HasImplicitReturn.value ] !== 'number' ? named( 'HasImplicitReturn' ) : NodeFlags[ +NodeFlags.HasImplicitReturn.value ];
NodeFlags.HasExplicitReturn = wrapped( 'HasExplicitReturn', 1 << 8 );
NodeFlags[ +NodeFlags.HasExplicitReturn.value ] = typeof NodeFlags[ +NodeFlags.HasExplicitReturn.value ] !== 'number' ? named( 'HasExplicitReturn' ) : NodeFlags[ +NodeFlags.HasExplicitReturn.value ];
NodeFlags.GlobalAugmentation = wrapped( 'GlobalAugmentation', 1 << 9 );
NodeFlags[ +NodeFlags.GlobalAugmentation.value ] = typeof NodeFlags[ +NodeFlags.GlobalAugmentation.value ] !== 'number' ? named( 'GlobalAugmentation' ) : NodeFlags[ +NodeFlags.GlobalAugmentation.value ];
NodeFlags.HasAsyncFunctions = wrapped( 'HasAsyncFunctions', 1 << 10 );
NodeFlags[ +NodeFlags.HasAsyncFunctions.value ] = typeof NodeFlags[ +NodeFlags.HasAsyncFunctions.value ] !== 'number' ? named( 'HasAsyncFunctions' ) : NodeFlags[ +NodeFlags.HasAsyncFunctions.value ];
NodeFlags.DisallowInContext = wrapped( 'DisallowInContext', 1 << 11 );
NodeFlags[ +NodeFlags.DisallowInContext.value ] = typeof NodeFlags[ +NodeFlags.DisallowInContext.value ] !== 'number' ? named( 'DisallowInContext' ) : NodeFlags[ +NodeFlags.DisallowInContext.value ];
NodeFlags.YieldContext = wrapped( 'YieldContext', 1 << 12 );
NodeFlags[ +NodeFlags.YieldContext.value ] = typeof NodeFlags[ +NodeFlags.YieldContext.value ] !== 'number' ? named( 'YieldContext' ) : NodeFlags[ +NodeFlags.YieldContext.value ];
NodeFlags.DecoratorContext = wrapped( 'DecoratorContext', 1 << 13 );
NodeFlags[ +NodeFlags.DecoratorContext.value ] = typeof NodeFlags[ +NodeFlags.DecoratorContext.value ] !== 'number' ? named( 'DecoratorContext' ) : NodeFlags[ +NodeFlags.DecoratorContext.value ];
NodeFlags.AwaitContext = wrapped( 'AwaitContext', 1 << 14 );
NodeFlags[ +NodeFlags.AwaitContext.value ] = typeof NodeFlags[ +NodeFlags.AwaitContext.value ] !== 'number' ? named( 'AwaitContext' ) : NodeFlags[ +NodeFlags.AwaitContext.value ];
NodeFlags.ThisNodeHasError = wrapped( 'ThisNodeHasError', 1 << 15 );
NodeFlags[ +NodeFlags.ThisNodeHasError.value ] = typeof NodeFlags[ +NodeFlags.ThisNodeHasError.value ] !== 'number' ? named( 'ThisNodeHasError' ) : NodeFlags[ +NodeFlags.ThisNodeHasError.value ];
NodeFlags.JavaScriptFile = wrapped( 'JavaScriptFile', 1 << 16 );
NodeFlags[ +NodeFlags.JavaScriptFile.value ] = typeof NodeFlags[ +NodeFlags.JavaScriptFile.value ] !== 'number' ? named( 'JavaScriptFile' ) : NodeFlags[ +NodeFlags.JavaScriptFile.value ];
NodeFlags.ThisNodeOrAnySubNodesHasError = wrapped( 'ThisNodeOrAnySubNodesHasError', 1 << 17 );
NodeFlags[ +NodeFlags.ThisNodeOrAnySubNodesHasError.value ] = typeof NodeFlags[ +NodeFlags.ThisNodeOrAnySubNodesHasError.value ] !== 'number' ? named( 'ThisNodeOrAnySubNodesHasError' ) : NodeFlags[ +NodeFlags.ThisNodeOrAnySubNodesHasError.value ];
NodeFlags.HasAggregatedChildData = wrapped( 'HasAggregatedChildData', 1 << 18 );
NodeFlags[ +NodeFlags.HasAggregatedChildData.value ] = typeof NodeFlags[ +NodeFlags.HasAggregatedChildData.value ] !== 'number' ? named( 'HasAggregatedChildData' ) : NodeFlags[ +NodeFlags.HasAggregatedChildData.value ];
NodeFlags.PossiblyContainsDynamicImport = wrapped( 'PossiblyContainsDynamicImport', 1 << 19 );
NodeFlags[ +NodeFlags.PossiblyContainsDynamicImport.value ] = typeof NodeFlags[ +NodeFlags.PossiblyContainsDynamicImport.value ] !== 'number' ? named( 'PossiblyContainsDynamicImport' ) : NodeFlags[ +NodeFlags.PossiblyContainsDynamicImport.value ];
NodeFlags.JSDoc = wrapped( 'JSDoc', 1 << 20 );
NodeFlags[ +NodeFlags.JSDoc.value ] = typeof NodeFlags[ +NodeFlags.JSDoc.value ] !== 'number' ? named( 'JSDoc' ) : NodeFlags[ +NodeFlags.JSDoc.value ];
NodeFlags.Ambient = wrapped( 'Ambient', 1 << 21 );
NodeFlags[ +NodeFlags.Ambient.value ] = typeof NodeFlags[ +NodeFlags.Ambient.value ] !== 'number' ? named( 'Ambient' ) : NodeFlags[ +NodeFlags.Ambient.value ];
NodeFlags.InWithStatement = wrapped( 'InWithStatement', 1 << 22 );
NodeFlags[ +NodeFlags.InWithStatement.value ] = typeof NodeFlags[ +NodeFlags.InWithStatement.value ] !== 'number' ? named( 'InWithStatement' ) : NodeFlags[ +NodeFlags.InWithStatement.value ];
NodeFlags.BlockScoped = wrapped( 'BlockScoped', NodeFlags.Let | NodeFlags.Const );
NodeFlags[ +NodeFlags.BlockScoped.value ] = typeof NodeFlags[ +NodeFlags.BlockScoped.value ] !== 'number' ? named( 'BlockScoped' ) : NodeFlags[ +NodeFlags.BlockScoped.value ];
NodeFlags.ReachabilityCheckFlags = wrapped( 'ReachabilityCheckFlags', NodeFlags.HasImplicitReturn | NodeFlags.HasExplicitReturn );
NodeFlags[ +NodeFlags.ReachabilityCheckFlags.value ] = typeof NodeFlags[ +NodeFlags.ReachabilityCheckFlags.value ] !== 'number' ? named( 'ReachabilityCheckFlags' ) : NodeFlags[ +NodeFlags.ReachabilityCheckFlags.value ];
NodeFlags.ReachabilityAndEmitFlags = wrapped( 'ReachabilityAndEmitFlags', NodeFlags.ReachabilityCheckFlags | NodeFlags.HasAsyncFunctions );
NodeFlags[ +NodeFlags.ReachabilityAndEmitFlags.value ] = typeof NodeFlags[ +NodeFlags.ReachabilityAndEmitFlags.value ] !== 'number' ? named( 'ReachabilityAndEmitFlags' ) : NodeFlags[ +NodeFlags.ReachabilityAndEmitFlags.value ];
NodeFlags.ContextFlags = wrapped( 'ContextFlags', NodeFlags.DisallowInContext | NodeFlags.YieldContext | NodeFlags.DecoratorContext | NodeFlags.AwaitContext | NodeFlags.JavaScriptFile | NodeFlags.InWithStatement | NodeFlags.Ambient );
NodeFlags[ +NodeFlags.ContextFlags.value ] = typeof NodeFlags[ +NodeFlags.ContextFlags.value ] !== 'number' ? named( 'ContextFlags' ) : NodeFlags[ +NodeFlags.ContextFlags.value ];
NodeFlags.TypeExcludesFlags = wrapped( 'TypeExcludesFlags', NodeFlags.YieldContext | NodeFlags.AwaitContext );
NodeFlags[ +NodeFlags.TypeExcludesFlags.value ] = typeof NodeFlags[ +NodeFlags.TypeExcludesFlags.value ] !== 'number' ? named( 'TypeExcludesFlags' ) : NodeFlags[ +NodeFlags.TypeExcludesFlags.value ];

NodeFlags = Object.create( tmp = templ(), NodeFlags );
tmp.asString = asString( NodeFlags );

/** *********************************************************************************************************************
 * @enum
 * @name ModifierFlags
 ************************************************************************************************************************/
let ModifierFlags = {};
ModifierFlags.None = wrapped( 'None', 0 );
ModifierFlags[ +ModifierFlags.None.value ] = typeof ModifierFlags[ +ModifierFlags.None.value ] !== 'number' ? named( 'None' ) : ModifierFlags[ +ModifierFlags.None.value ];
ModifierFlags.Export = wrapped( 'Export', 1 << 0 );
ModifierFlags[ +ModifierFlags.Export.value ] = typeof ModifierFlags[ +ModifierFlags.Export.value ] !== 'number' ? named( 'Export' ) : ModifierFlags[ +ModifierFlags.Export.value ];
ModifierFlags.Ambient = wrapped( 'Ambient', 1 << 1 );
ModifierFlags[ +ModifierFlags.Ambient.value ] = typeof ModifierFlags[ +ModifierFlags.Ambient.value ] !== 'number' ? named( 'Ambient' ) : ModifierFlags[ +ModifierFlags.Ambient.value ];
ModifierFlags.Public = wrapped( 'Public', 1 << 2 );
ModifierFlags[ +ModifierFlags.Public.value ] = typeof ModifierFlags[ +ModifierFlags.Public.value ] !== 'number' ? named( 'Public' ) : ModifierFlags[ +ModifierFlags.Public.value ];
ModifierFlags.Private = wrapped( 'Private', 1 << 3 );
ModifierFlags[ +ModifierFlags.Private.value ] = typeof ModifierFlags[ +ModifierFlags.Private.value ] !== 'number' ? named( 'Private' ) : ModifierFlags[ +ModifierFlags.Private.value ];
ModifierFlags.Protected = wrapped( 'Protected', 1 << 4 );
ModifierFlags[ +ModifierFlags.Protected.value ] = typeof ModifierFlags[ +ModifierFlags.Protected.value ] !== 'number' ? named( 'Protected' ) : ModifierFlags[ +ModifierFlags.Protected.value ];
ModifierFlags.Static = wrapped( 'Static', 1 << 5 );
ModifierFlags[ +ModifierFlags.Static.value ] = typeof ModifierFlags[ +ModifierFlags.Static.value ] !== 'number' ? named( 'Static' ) : ModifierFlags[ +ModifierFlags.Static.value ];
ModifierFlags.Readonly = wrapped( 'Readonly', 1 << 6 );
ModifierFlags[ +ModifierFlags.Readonly.value ] = typeof ModifierFlags[ +ModifierFlags.Readonly.value ] !== 'number' ? named( 'Readonly' ) : ModifierFlags[ +ModifierFlags.Readonly.value ];
ModifierFlags.Abstract = wrapped( 'Abstract', 1 << 7 );
ModifierFlags[ +ModifierFlags.Abstract.value ] = typeof ModifierFlags[ +ModifierFlags.Abstract.value ] !== 'number' ? named( 'Abstract' ) : ModifierFlags[ +ModifierFlags.Abstract.value ];
ModifierFlags.Async = wrapped( 'Async', 1 << 8 );
ModifierFlags[ +ModifierFlags.Async.value ] = typeof ModifierFlags[ +ModifierFlags.Async.value ] !== 'number' ? named( 'Async' ) : ModifierFlags[ +ModifierFlags.Async.value ];
ModifierFlags.Default = wrapped( 'Default', 1 << 9 );
ModifierFlags[ +ModifierFlags.Default.value ] = typeof ModifierFlags[ +ModifierFlags.Default.value ] !== 'number' ? named( 'Default' ) : ModifierFlags[ +ModifierFlags.Default.value ];
ModifierFlags.Const = wrapped( 'Const', 1 << 11 );
ModifierFlags[ +ModifierFlags.Const.value ] = typeof ModifierFlags[ +ModifierFlags.Const.value ] !== 'number' ? named( 'Const' ) : ModifierFlags[ +ModifierFlags.Const.value ];
ModifierFlags.HasComputedFlags = wrapped( 'HasComputedFlags', 1 << 29 );
ModifierFlags[ +ModifierFlags.HasComputedFlags.value ] = typeof ModifierFlags[ +ModifierFlags.HasComputedFlags.value ] !== 'number' ? named( 'HasComputedFlags' ) : ModifierFlags[ +ModifierFlags.HasComputedFlags.value ];
ModifierFlags.AccessibilityModifier = wrapped( 'AccessibilityModifier', ModifierFlags.Public | ModifierFlags.Private | ModifierFlags.Protected );
ModifierFlags[ +ModifierFlags.AccessibilityModifier.value ] = typeof ModifierFlags[ +ModifierFlags.AccessibilityModifier.value ] !== 'number' ? named( 'AccessibilityModifier' ) : ModifierFlags[ +ModifierFlags.AccessibilityModifier.value ];
ModifierFlags.ParameterPropertyModifier = wrapped( 'ParameterPropertyModifier', ModifierFlags.AccessibilityModifier | ModifierFlags.Readonly );
ModifierFlags[ +ModifierFlags.ParameterPropertyModifier.value ] = typeof ModifierFlags[ +ModifierFlags.ParameterPropertyModifier.value ] !== 'number' ? named( 'ParameterPropertyModifier' ) : ModifierFlags[ +ModifierFlags.ParameterPropertyModifier.value ];
ModifierFlags.NonPublicAccessibilityModifier = wrapped( 'NonPublicAccessibilityModifier', ModifierFlags.Private | ModifierFlags.Protected );
ModifierFlags[ +ModifierFlags.NonPublicAccessibilityModifier.value ] = typeof ModifierFlags[ +ModifierFlags.NonPublicAccessibilityModifier.value ] !== 'number' ? named( 'NonPublicAccessibilityModifier' ) : ModifierFlags[ +ModifierFlags.NonPublicAccessibilityModifier.value ];
ModifierFlags.TypeScriptModifier = wrapped( 'TypeScriptModifier', ModifierFlags.Ambient | ModifierFlags.Public | ModifierFlags.Private | ModifierFlags.Protected | ModifierFlags.Readonly | ModifierFlags.Abstract | ModifierFlags.Const );
ModifierFlags[ +ModifierFlags.TypeScriptModifier.value ] = typeof ModifierFlags[ +ModifierFlags.TypeScriptModifier.value ] !== 'number' ? named( 'TypeScriptModifier' ) : ModifierFlags[ +ModifierFlags.TypeScriptModifier.value ];
ModifierFlags.ExportDefault = wrapped( 'ExportDefault', ModifierFlags.Export | ModifierFlags.Default );
ModifierFlags[ +ModifierFlags.ExportDefault.value ] = typeof ModifierFlags[ +ModifierFlags.ExportDefault.value ] !== 'number' ? named( 'ExportDefault' ) : ModifierFlags[ +ModifierFlags.ExportDefault.value ];
ModifierFlags.All = wrapped( 'All', ModifierFlags.Export | ModifierFlags.Ambient | ModifierFlags.Public | ModifierFlags.Private | ModifierFlags.Protected | ModifierFlags.Static | ModifierFlags.Readonly | ModifierFlags.Abstract | ModifierFlags.Async | ModifierFlags.Default | ModifierFlags.Const );
ModifierFlags[ +ModifierFlags.All.value ] = typeof ModifierFlags[ +ModifierFlags.All.value ] !== 'number' ? named( 'All' ) : ModifierFlags[ +ModifierFlags.All.value ];

ModifierFlags = Object.create( tmp = templ(), ModifierFlags );
tmp.asString = asString( ModifierFlags );

/** *********************************************************************************************************************
 * @enum
 * @name JsxFlags
 ************************************************************************************************************************/
let JsxFlags = {};
JsxFlags.None = wrapped( 'None', 0 );
JsxFlags[ +JsxFlags.None.value ] = typeof JsxFlags[ +JsxFlags.None.value ] !== 'number' ? named( 'None' ) : JsxFlags[ +JsxFlags.None.value ];
JsxFlags.IntrinsicNamedElement = wrapped( 'IntrinsicNamedElement', 1 << 0 );
JsxFlags[ +JsxFlags.IntrinsicNamedElement.value ] = typeof JsxFlags[ +JsxFlags.IntrinsicNamedElement.value ] !== 'number' ? named( 'IntrinsicNamedElement' ) : JsxFlags[ +JsxFlags.IntrinsicNamedElement.value ];
JsxFlags.IntrinsicIndexedElement = wrapped( 'IntrinsicIndexedElement', 1 << 1 );
JsxFlags[ +JsxFlags.IntrinsicIndexedElement.value ] = typeof JsxFlags[ +JsxFlags.IntrinsicIndexedElement.value ] !== 'number' ? named( 'IntrinsicIndexedElement' ) : JsxFlags[ +JsxFlags.IntrinsicIndexedElement.value ];
JsxFlags.IntrinsicElement = wrapped( 'IntrinsicElement', JsxFlags.IntrinsicNamedElement | JsxFlags.IntrinsicIndexedElement );
JsxFlags[ +JsxFlags.IntrinsicElement.value ] = typeof JsxFlags[ +JsxFlags.IntrinsicElement.value ] !== 'number' ? named( 'IntrinsicElement' ) : JsxFlags[ +JsxFlags.IntrinsicElement.value ];

JsxFlags = Object.create( tmp = templ(), JsxFlags );
tmp.asString = asString( JsxFlags );

/** *********************************************************************************************************************
 * @enum
 * @name RelationComparisonResult
 ************************************************************************************************************************/
let RelationComparisonResult = {};
RelationComparisonResult.Succeeded = wrapped( 'Succeeded', 1 );
RelationComparisonResult[ +RelationComparisonResult.Succeeded.value ] = typeof RelationComparisonResult[ +RelationComparisonResult.Succeeded.value ] !== 'number' ? named( 'Succeeded' ) : RelationComparisonResult[ +RelationComparisonResult.Succeeded.value ];
RelationComparisonResult.Failed = wrapped( 'Failed', 2 );
RelationComparisonResult[ +RelationComparisonResult.Failed.value ] = typeof RelationComparisonResult[ +RelationComparisonResult.Failed.value ] !== 'number' ? named( 'Failed' ) : RelationComparisonResult[ +RelationComparisonResult.Failed.value ];
RelationComparisonResult.FailedAndReported = wrapped( 'FailedAndReported', 3 );
RelationComparisonResult[ +RelationComparisonResult.FailedAndReported.value ] = typeof RelationComparisonResult[ +RelationComparisonResult.FailedAndReported.value ] !== 'number' ? named( 'FailedAndReported' ) : RelationComparisonResult[ +RelationComparisonResult.FailedAndReported.value ];

RelationComparisonResult = Object.create( tmp = templ(), RelationComparisonResult );
tmp.asString = asString( RelationComparisonResult );

/** *********************************************************************************************************************
 * @enum
 * @name GeneratedIdentifierFlags
 ************************************************************************************************************************/
let GeneratedIdentifierFlags = {};
GeneratedIdentifierFlags.None = wrapped( 'None', 0 );
GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.None.value ] = typeof GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.None.value ] !== 'number' ? named( 'None' ) : GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.None.value ];
GeneratedIdentifierFlags.Auto = wrapped( 'Auto', 1 );
GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Auto.value ] = typeof GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Auto.value ] !== 'number' ? named( 'Auto' ) : GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Auto.value ];
GeneratedIdentifierFlags.Loop = wrapped( 'Loop', 2 );
GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Loop.value ] = typeof GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Loop.value ] !== 'number' ? named( 'Loop' ) : GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Loop.value ];
GeneratedIdentifierFlags.Unique = wrapped( 'Unique', 3 );
GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Unique.value ] = typeof GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Unique.value ] !== 'number' ? named( 'Unique' ) : GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Unique.value ];
GeneratedIdentifierFlags.Node = wrapped( 'Node', 4 );
GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Node.value ] = typeof GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Node.value ] !== 'number' ? named( 'Node' ) : GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.Node.value ];
GeneratedIdentifierFlags.OptimisticUnique = wrapped( 'OptimisticUnique', 5 );
GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.OptimisticUnique.value ] = typeof GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.OptimisticUnique.value ] !== 'number' ? named( 'OptimisticUnique' ) : GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.OptimisticUnique.value ];
GeneratedIdentifierFlags.KindMask = wrapped( 'KindMask', 7 );
GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.KindMask.value ] = typeof GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.KindMask.value ] !== 'number' ? named( 'KindMask' ) : GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.KindMask.value ];
GeneratedIdentifierFlags.SkipNameGenerationScope = wrapped( 'SkipNameGenerationScope', 1 << 3 );
GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.SkipNameGenerationScope.value ] = typeof GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.SkipNameGenerationScope.value ] !== 'number' ? named( 'SkipNameGenerationScope' ) : GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.SkipNameGenerationScope.value ];
GeneratedIdentifierFlags.ReservedInNestedScopes = wrapped( 'ReservedInNestedScopes', 1 << 4 );
GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.ReservedInNestedScopes.value ] = typeof GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.ReservedInNestedScopes.value ] !== 'number' ? named( 'ReservedInNestedScopes' ) : GeneratedIdentifierFlags[ +GeneratedIdentifierFlags.ReservedInNestedScopes.value ];

GeneratedIdentifierFlags = Object.create( tmp = templ(), GeneratedIdentifierFlags );
tmp.asString = asString( GeneratedIdentifierFlags );

/** *********************************************************************************************************************
 * @enum
 * @name TokenFlags
 ************************************************************************************************************************/
let TokenFlags = {};
TokenFlags.None = wrapped( 'None', 0 );
TokenFlags[ +TokenFlags.None.value ] = typeof TokenFlags[ +TokenFlags.None.value ] !== 'number' ? named( 'None' ) : TokenFlags[ +TokenFlags.None.value ];
TokenFlags.PrecedingLineBreak = wrapped( 'PrecedingLineBreak', 1 << 0 );
TokenFlags[ +TokenFlags.PrecedingLineBreak.value ] = typeof TokenFlags[ +TokenFlags.PrecedingLineBreak.value ] !== 'number' ? named( 'PrecedingLineBreak' ) : TokenFlags[ +TokenFlags.PrecedingLineBreak.value ];
TokenFlags.PrecedingJSDocComment = wrapped( 'PrecedingJSDocComment', 1 << 1 );
TokenFlags[ +TokenFlags.PrecedingJSDocComment.value ] = typeof TokenFlags[ +TokenFlags.PrecedingJSDocComment.value ] !== 'number' ? named( 'PrecedingJSDocComment' ) : TokenFlags[ +TokenFlags.PrecedingJSDocComment.value ];
TokenFlags.Unterminated = wrapped( 'Unterminated', 1 << 2 );
TokenFlags[ +TokenFlags.Unterminated.value ] = typeof TokenFlags[ +TokenFlags.Unterminated.value ] !== 'number' ? named( 'Unterminated' ) : TokenFlags[ +TokenFlags.Unterminated.value ];
TokenFlags.ExtendedUnicodeEscape = wrapped( 'ExtendedUnicodeEscape', 1 << 3 );
TokenFlags[ +TokenFlags.ExtendedUnicodeEscape.value ] = typeof TokenFlags[ +TokenFlags.ExtendedUnicodeEscape.value ] !== 'number' ? named( 'ExtendedUnicodeEscape' ) : TokenFlags[ +TokenFlags.ExtendedUnicodeEscape.value ];
TokenFlags.Scientific = wrapped( 'Scientific', 1 << 4 );
TokenFlags[ +TokenFlags.Scientific.value ] = typeof TokenFlags[ +TokenFlags.Scientific.value ] !== 'number' ? named( 'Scientific' ) : TokenFlags[ +TokenFlags.Scientific.value ];
TokenFlags.Octal = wrapped( 'Octal', 1 << 5 );
TokenFlags[ +TokenFlags.Octal.value ] = typeof TokenFlags[ +TokenFlags.Octal.value ] !== 'number' ? named( 'Octal' ) : TokenFlags[ +TokenFlags.Octal.value ];
TokenFlags.HexSpecifier = wrapped( 'HexSpecifier', 1 << 6 );
TokenFlags[ +TokenFlags.HexSpecifier.value ] = typeof TokenFlags[ +TokenFlags.HexSpecifier.value ] !== 'number' ? named( 'HexSpecifier' ) : TokenFlags[ +TokenFlags.HexSpecifier.value ];
TokenFlags.BinarySpecifier = wrapped( 'BinarySpecifier', 1 << 7 );
TokenFlags[ +TokenFlags.BinarySpecifier.value ] = typeof TokenFlags[ +TokenFlags.BinarySpecifier.value ] !== 'number' ? named( 'BinarySpecifier' ) : TokenFlags[ +TokenFlags.BinarySpecifier.value ];
TokenFlags.OctalSpecifier = wrapped( 'OctalSpecifier', 1 << 8 );
TokenFlags[ +TokenFlags.OctalSpecifier.value ] = typeof TokenFlags[ +TokenFlags.OctalSpecifier.value ] !== 'number' ? named( 'OctalSpecifier' ) : TokenFlags[ +TokenFlags.OctalSpecifier.value ];
TokenFlags.ContainsSeparator = wrapped( 'ContainsSeparator', 1 << 9 );
TokenFlags[ +TokenFlags.ContainsSeparator.value ] = typeof TokenFlags[ +TokenFlags.ContainsSeparator.value ] !== 'number' ? named( 'ContainsSeparator' ) : TokenFlags[ +TokenFlags.ContainsSeparator.value ];
TokenFlags.BinaryOrOctalSpecifier = wrapped( 'BinaryOrOctalSpecifier', TokenFlags.BinarySpecifier | TokenFlags.OctalSpecifier );
TokenFlags[ +TokenFlags.BinaryOrOctalSpecifier.value ] = typeof TokenFlags[ +TokenFlags.BinaryOrOctalSpecifier.value ] !== 'number' ? named( 'BinaryOrOctalSpecifier' ) : TokenFlags[ +TokenFlags.BinaryOrOctalSpecifier.value ];
TokenFlags.NumericLiteralFlags = wrapped( 'NumericLiteralFlags', TokenFlags.Scientific | TokenFlags.Octal | TokenFlags.HexSpecifier | TokenFlags.BinarySpecifier | TokenFlags.OctalSpecifier | TokenFlags.ContainsSeparator );
TokenFlags[ +TokenFlags.NumericLiteralFlags.value ] = typeof TokenFlags[ +TokenFlags.NumericLiteralFlags.value ] !== 'number' ? named( 'NumericLiteralFlags' ) : TokenFlags[ +TokenFlags.NumericLiteralFlags.value ];

TokenFlags = Object.create( tmp = templ(), TokenFlags );
tmp.asString = asString( TokenFlags );

/** *********************************************************************************************************************
 * @enum
 * @name FlowFlags
 ************************************************************************************************************************/
let FlowFlags = {};
FlowFlags.Unreachable = wrapped( 'Unreachable', 1 << 0 );
FlowFlags[ +FlowFlags.Unreachable.value ] = typeof FlowFlags[ +FlowFlags.Unreachable.value ] !== 'number' ? named( 'Unreachable' ) : FlowFlags[ +FlowFlags.Unreachable.value ];
FlowFlags.Start = wrapped( 'Start', 1 << 1 );
FlowFlags[ +FlowFlags.Start.value ] = typeof FlowFlags[ +FlowFlags.Start.value ] !== 'number' ? named( 'Start' ) : FlowFlags[ +FlowFlags.Start.value ];
FlowFlags.BranchLabel = wrapped( 'BranchLabel', 1 << 2 );
FlowFlags[ +FlowFlags.BranchLabel.value ] = typeof FlowFlags[ +FlowFlags.BranchLabel.value ] !== 'number' ? named( 'BranchLabel' ) : FlowFlags[ +FlowFlags.BranchLabel.value ];
FlowFlags.LoopLabel = wrapped( 'LoopLabel', 1 << 3 );
FlowFlags[ +FlowFlags.LoopLabel.value ] = typeof FlowFlags[ +FlowFlags.LoopLabel.value ] !== 'number' ? named( 'LoopLabel' ) : FlowFlags[ +FlowFlags.LoopLabel.value ];
FlowFlags.Assignment = wrapped( 'Assignment', 1 << 4 );
FlowFlags[ +FlowFlags.Assignment.value ] = typeof FlowFlags[ +FlowFlags.Assignment.value ] !== 'number' ? named( 'Assignment' ) : FlowFlags[ +FlowFlags.Assignment.value ];
FlowFlags.TrueCondition = wrapped( 'TrueCondition', 1 << 5 );
FlowFlags[ +FlowFlags.TrueCondition.value ] = typeof FlowFlags[ +FlowFlags.TrueCondition.value ] !== 'number' ? named( 'TrueCondition' ) : FlowFlags[ +FlowFlags.TrueCondition.value ];
FlowFlags.FalseCondition = wrapped( 'FalseCondition', 1 << 6 );
FlowFlags[ +FlowFlags.FalseCondition.value ] = typeof FlowFlags[ +FlowFlags.FalseCondition.value ] !== 'number' ? named( 'FalseCondition' ) : FlowFlags[ +FlowFlags.FalseCondition.value ];
FlowFlags.SwitchClause = wrapped( 'SwitchClause', 1 << 7 );
FlowFlags[ +FlowFlags.SwitchClause.value ] = typeof FlowFlags[ +FlowFlags.SwitchClause.value ] !== 'number' ? named( 'SwitchClause' ) : FlowFlags[ +FlowFlags.SwitchClause.value ];
FlowFlags.ArrayMutation = wrapped( 'ArrayMutation', 1 << 8 );
FlowFlags[ +FlowFlags.ArrayMutation.value ] = typeof FlowFlags[ +FlowFlags.ArrayMutation.value ] !== 'number' ? named( 'ArrayMutation' ) : FlowFlags[ +FlowFlags.ArrayMutation.value ];
FlowFlags.Referenced = wrapped( 'Referenced', 1 << 9 );
FlowFlags[ +FlowFlags.Referenced.value ] = typeof FlowFlags[ +FlowFlags.Referenced.value ] !== 'number' ? named( 'Referenced' ) : FlowFlags[ +FlowFlags.Referenced.value ];
FlowFlags.Shared = wrapped( 'Shared', 1 << 10 );
FlowFlags[ +FlowFlags.Shared.value ] = typeof FlowFlags[ +FlowFlags.Shared.value ] !== 'number' ? named( 'Shared' ) : FlowFlags[ +FlowFlags.Shared.value ];
FlowFlags.PreFinally = wrapped( 'PreFinally', 1 << 11 );
FlowFlags[ +FlowFlags.PreFinally.value ] = typeof FlowFlags[ +FlowFlags.PreFinally.value ] !== 'number' ? named( 'PreFinally' ) : FlowFlags[ +FlowFlags.PreFinally.value ];
FlowFlags.AfterFinally = wrapped( 'AfterFinally', 1 << 12 );
FlowFlags[ +FlowFlags.AfterFinally.value ] = typeof FlowFlags[ +FlowFlags.AfterFinally.value ] !== 'number' ? named( 'AfterFinally' ) : FlowFlags[ +FlowFlags.AfterFinally.value ];
FlowFlags.Label = wrapped( 'Label', FlowFlags.BranchLabel | FlowFlags.LoopLabel );
FlowFlags[ +FlowFlags.Label.value ] = typeof FlowFlags[ +FlowFlags.Label.value ] !== 'number' ? named( 'Label' ) : FlowFlags[ +FlowFlags.Label.value ];
FlowFlags.Condition = wrapped( 'Condition', FlowFlags.TrueCondition | FlowFlags.FalseCondition );
FlowFlags[ +FlowFlags.Condition.value ] = typeof FlowFlags[ +FlowFlags.Condition.value ] !== 'number' ? named( 'Condition' ) : FlowFlags[ +FlowFlags.Condition.value ];

FlowFlags = Object.create( tmp = templ(), FlowFlags );
tmp.asString = asString( FlowFlags );

/** *********************************************************************************************************************
 * @enum
 * @name StructureIsReused
 ************************************************************************************************************************/
let StructureIsReused = {};
StructureIsReused.Not = wrapped( 'Not', 0 );
StructureIsReused[ +StructureIsReused.Not.value ] = typeof StructureIsReused[ +StructureIsReused.Not.value ] !== 'number' ? named( 'Not' ) : StructureIsReused[ +StructureIsReused.Not.value ];
StructureIsReused.SafeModules = wrapped( 'SafeModules', 1 << 0 );
StructureIsReused[ +StructureIsReused.SafeModules.value ] = typeof StructureIsReused[ +StructureIsReused.SafeModules.value ] !== 'number' ? named( 'SafeModules' ) : StructureIsReused[ +StructureIsReused.SafeModules.value ];
StructureIsReused.Completely = wrapped( 'Completely', 1 << 1 );
StructureIsReused[ +StructureIsReused.Completely.value ] = typeof StructureIsReused[ +StructureIsReused.Completely.value ] !== 'number' ? named( 'Completely' ) : StructureIsReused[ +StructureIsReused.Completely.value ];

StructureIsReused = Object.create( tmp = templ(), StructureIsReused );
tmp.asString = asString( StructureIsReused );

/** *********************************************************************************************************************
 * @enum
 * @name UnionReduction
 ************************************************************************************************************************/
let UnionReduction = {};
UnionReduction.None = wrapped( 'None', 0 );
UnionReduction[ +UnionReduction.None.value ] = typeof UnionReduction[ +UnionReduction.None.value ] !== 'number' ? named( 'None' ) : UnionReduction[ +UnionReduction.None.value ];
UnionReduction.Literal = wrapped( 'Literal', 1 );
UnionReduction[ +UnionReduction.Literal.value ] = typeof UnionReduction[ +UnionReduction.Literal.value ] !== 'number' ? named( 'Literal' ) : UnionReduction[ +UnionReduction.Literal.value ];
UnionReduction.Subtype = wrapped( 'Subtype', 2 );
UnionReduction[ +UnionReduction.Subtype.value ] = typeof UnionReduction[ +UnionReduction.Subtype.value ] !== 'number' ? named( 'Subtype' ) : UnionReduction[ +UnionReduction.Subtype.value ];

UnionReduction = Object.create( tmp = templ(), UnionReduction );
tmp.asString = asString( UnionReduction );

/** *********************************************************************************************************************
 * @enum
 * @name NodeBuilderFlags
 ************************************************************************************************************************/
let NodeBuilderFlags = {};
NodeBuilderFlags.None = wrapped( 'None', 0 );
NodeBuilderFlags[ +NodeBuilderFlags.None.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.None.value ] !== 'number' ? named( 'None' ) : NodeBuilderFlags[ +NodeBuilderFlags.None.value ];
NodeBuilderFlags.NoTruncation = wrapped( 'NoTruncation', 1 << 0 );
NodeBuilderFlags[ +NodeBuilderFlags.NoTruncation.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.NoTruncation.value ] !== 'number' ? named( 'NoTruncation' ) : NodeBuilderFlags[ +NodeBuilderFlags.NoTruncation.value ];
NodeBuilderFlags.WriteArrayAsGenericType = wrapped( 'WriteArrayAsGenericType', 1 << 1 );
NodeBuilderFlags[ +NodeBuilderFlags.WriteArrayAsGenericType.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.WriteArrayAsGenericType.value ] !== 'number' ? named( 'WriteArrayAsGenericType' ) : NodeBuilderFlags[ +NodeBuilderFlags.WriteArrayAsGenericType.value ];
NodeBuilderFlags.UseStructuralFallback = wrapped( 'UseStructuralFallback', 1 << 3 );
NodeBuilderFlags[ +NodeBuilderFlags.UseStructuralFallback.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.UseStructuralFallback.value ] !== 'number' ? named( 'UseStructuralFallback' ) : NodeBuilderFlags[ +NodeBuilderFlags.UseStructuralFallback.value ];
NodeBuilderFlags.WriteTypeArgumentsOfSignature = wrapped( 'WriteTypeArgumentsOfSignature', 1 << 5 );
NodeBuilderFlags[ +NodeBuilderFlags.WriteTypeArgumentsOfSignature.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.WriteTypeArgumentsOfSignature.value ] !== 'number' ? named( 'WriteTypeArgumentsOfSignature' ) : NodeBuilderFlags[ +NodeBuilderFlags.WriteTypeArgumentsOfSignature.value ];
NodeBuilderFlags.UseFullyQualifiedType = wrapped( 'UseFullyQualifiedType', 1 << 6 );
NodeBuilderFlags[ +NodeBuilderFlags.UseFullyQualifiedType.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.UseFullyQualifiedType.value ] !== 'number' ? named( 'UseFullyQualifiedType' ) : NodeBuilderFlags[ +NodeBuilderFlags.UseFullyQualifiedType.value ];
NodeBuilderFlags.UseOnlyExternalAliasing = wrapped( 'UseOnlyExternalAliasing', 1 << 7 );
NodeBuilderFlags[ +NodeBuilderFlags.UseOnlyExternalAliasing.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.UseOnlyExternalAliasing.value ] !== 'number' ? named( 'UseOnlyExternalAliasing' ) : NodeBuilderFlags[ +NodeBuilderFlags.UseOnlyExternalAliasing.value ];
NodeBuilderFlags.SuppressAnyReturnType = wrapped( 'SuppressAnyReturnType', 1 << 8 );
NodeBuilderFlags[ +NodeBuilderFlags.SuppressAnyReturnType.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.SuppressAnyReturnType.value ] !== 'number' ? named( 'SuppressAnyReturnType' ) : NodeBuilderFlags[ +NodeBuilderFlags.SuppressAnyReturnType.value ];
NodeBuilderFlags.WriteTypeParametersInQualifiedName = wrapped( 'WriteTypeParametersInQualifiedName', 1 << 9 );
NodeBuilderFlags[ +NodeBuilderFlags.WriteTypeParametersInQualifiedName.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.WriteTypeParametersInQualifiedName.value ] !== 'number' ? named( 'WriteTypeParametersInQualifiedName' ) : NodeBuilderFlags[ +NodeBuilderFlags.WriteTypeParametersInQualifiedName.value ];
NodeBuilderFlags.MultilineObjectLiterals = wrapped( 'MultilineObjectLiterals', 1 << 10 );
NodeBuilderFlags[ +NodeBuilderFlags.MultilineObjectLiterals.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.MultilineObjectLiterals.value ] !== 'number' ? named( 'MultilineObjectLiterals' ) : NodeBuilderFlags[ +NodeBuilderFlags.MultilineObjectLiterals.value ];
NodeBuilderFlags.WriteClassExpressionAsTypeLiteral = wrapped( 'WriteClassExpressionAsTypeLiteral', 1 << 11 );
NodeBuilderFlags[ +NodeBuilderFlags.WriteClassExpressionAsTypeLiteral.value ] = typeof NodeBuilderFlags[ +NodeBuilderFlags.WriteClassExpressionAsTypeLiteral.value ] !== 'number' ? named( 'WriteClassExpressionAsTypeLiteral' ) : NodeBuilderFlags[ +NodeBuilderFlags.WriteClassExpressionAsTypeLiteral.value ];

NodeBuilderFlags = Object.create( tmp = templ(), NodeBuilderFlags );
tmp.asString = asString( NodeBuilderFlags );

/** *********************************************************************************************************************
 * @enum
 * @name TypeFormatFlags
 ************************************************************************************************************************/
let TypeFormatFlags = {};
TypeFormatFlags.None = wrapped( 'None', 0 );
TypeFormatFlags[ +TypeFormatFlags.None.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.None.value ] !== 'number' ? named( 'None' ) : TypeFormatFlags[ +TypeFormatFlags.None.value ];
TypeFormatFlags.NoTruncation = wrapped( 'NoTruncation', 1 << 0 );
TypeFormatFlags[ +TypeFormatFlags.NoTruncation.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.NoTruncation.value ] !== 'number' ? named( 'NoTruncation' ) : TypeFormatFlags[ +TypeFormatFlags.NoTruncation.value ];
TypeFormatFlags.WriteArrayAsGenericType = wrapped( 'WriteArrayAsGenericType', 1 << 1 );
TypeFormatFlags[ +TypeFormatFlags.WriteArrayAsGenericType.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.WriteArrayAsGenericType.value ] !== 'number' ? named( 'WriteArrayAsGenericType' ) : TypeFormatFlags[ +TypeFormatFlags.WriteArrayAsGenericType.value ];
TypeFormatFlags.UseStructuralFallback = wrapped( 'UseStructuralFallback', 1 << 3 );
TypeFormatFlags[ +TypeFormatFlags.UseStructuralFallback.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.UseStructuralFallback.value ] !== 'number' ? named( 'UseStructuralFallback' ) : TypeFormatFlags[ +TypeFormatFlags.UseStructuralFallback.value ];
TypeFormatFlags.WriteTypeArgumentsOfSignature = wrapped( 'WriteTypeArgumentsOfSignature', 1 << 5 );
TypeFormatFlags[ +TypeFormatFlags.WriteTypeArgumentsOfSignature.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.WriteTypeArgumentsOfSignature.value ] !== 'number' ? named( 'WriteTypeArgumentsOfSignature' ) : TypeFormatFlags[ +TypeFormatFlags.WriteTypeArgumentsOfSignature.value ];
TypeFormatFlags.UseFullyQualifiedType = wrapped( 'UseFullyQualifiedType', 1 << 6 );
TypeFormatFlags[ +TypeFormatFlags.UseFullyQualifiedType.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.UseFullyQualifiedType.value ] !== 'number' ? named( 'UseFullyQualifiedType' ) : TypeFormatFlags[ +TypeFormatFlags.UseFullyQualifiedType.value ];
TypeFormatFlags.SuppressAnyReturnType = wrapped( 'SuppressAnyReturnType', 1 << 8 );
TypeFormatFlags[ +TypeFormatFlags.SuppressAnyReturnType.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.SuppressAnyReturnType.value ] !== 'number' ? named( 'SuppressAnyReturnType' ) : TypeFormatFlags[ +TypeFormatFlags.SuppressAnyReturnType.value ];
TypeFormatFlags.MultilineObjectLiterals = wrapped( 'MultilineObjectLiterals', 1 << 10 );
TypeFormatFlags[ +TypeFormatFlags.MultilineObjectLiterals.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.MultilineObjectLiterals.value ] !== 'number' ? named( 'MultilineObjectLiterals' ) : TypeFormatFlags[ +TypeFormatFlags.MultilineObjectLiterals.value ];
TypeFormatFlags.WriteClassExpressionAsTypeLiteral = wrapped( 'WriteClassExpressionAsTypeLiteral', 1 << 11 );
TypeFormatFlags[ +TypeFormatFlags.WriteClassExpressionAsTypeLiteral.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.WriteClassExpressionAsTypeLiteral.value ] !== 'number' ? named( 'WriteClassExpressionAsTypeLiteral' ) : TypeFormatFlags[ +TypeFormatFlags.WriteClassExpressionAsTypeLiteral.value ];
TypeFormatFlags.UseTypeOfFunction = wrapped( 'UseTypeOfFunction', 1 << 12 );
TypeFormatFlags[ +TypeFormatFlags.UseTypeOfFunction.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.UseTypeOfFunction.value ] !== 'number' ? named( 'UseTypeOfFunction' ) : TypeFormatFlags[ +TypeFormatFlags.UseTypeOfFunction.value ];
TypeFormatFlags.OmitParameterModifiers = wrapped( 'OmitParameterModifiers', 1 << 13 );
TypeFormatFlags[ +TypeFormatFlags.OmitParameterModifiers.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.OmitParameterModifiers.value ] !== 'number' ? named( 'OmitParameterModifiers' ) : TypeFormatFlags[ +TypeFormatFlags.OmitParameterModifiers.value ];
TypeFormatFlags.UseAliasDefinedOutsideCurrentScope = wrapped( 'UseAliasDefinedOutsideCurrentScope', 1 << 14 );
TypeFormatFlags[ +TypeFormatFlags.UseAliasDefinedOutsideCurrentScope.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.UseAliasDefinedOutsideCurrentScope.value ] !== 'number' ? named( 'UseAliasDefinedOutsideCurrentScope' ) : TypeFormatFlags[ +TypeFormatFlags.UseAliasDefinedOutsideCurrentScope.value ];
TypeFormatFlags.AllowUniqueESSymbolType = wrapped( 'AllowUniqueESSymbolType', 1 << 20 );
TypeFormatFlags[ +TypeFormatFlags.AllowUniqueESSymbolType.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.AllowUniqueESSymbolType.value ] !== 'number' ? named( 'AllowUniqueESSymbolType' ) : TypeFormatFlags[ +TypeFormatFlags.AllowUniqueESSymbolType.value ];
TypeFormatFlags.AddUndefined = wrapped( 'AddUndefined', 1 << 17 );
TypeFormatFlags[ +TypeFormatFlags.AddUndefined.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.AddUndefined.value ] !== 'number' ? named( 'AddUndefined' ) : TypeFormatFlags[ +TypeFormatFlags.AddUndefined.value ];
TypeFormatFlags.WriteArrowStyleSignature = wrapped( 'WriteArrowStyleSignature', 1 << 18 );
TypeFormatFlags[ +TypeFormatFlags.WriteArrowStyleSignature.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.WriteArrowStyleSignature.value ] !== 'number' ? named( 'WriteArrowStyleSignature' ) : TypeFormatFlags[ +TypeFormatFlags.WriteArrowStyleSignature.value ];
TypeFormatFlags.InArrayType = wrapped( 'InArrayType', 1 << 19 );
TypeFormatFlags[ +TypeFormatFlags.InArrayType.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.InArrayType.value ] !== 'number' ? named( 'InArrayType' ) : TypeFormatFlags[ +TypeFormatFlags.InArrayType.value ];
TypeFormatFlags.InElementType = wrapped( 'InElementType', 1 << 21 );
TypeFormatFlags[ +TypeFormatFlags.InElementType.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.InElementType.value ] !== 'number' ? named( 'InElementType' ) : TypeFormatFlags[ +TypeFormatFlags.InElementType.value ];
TypeFormatFlags.InFirstTypeArgument = wrapped( 'InFirstTypeArgument', 1 << 22 );
TypeFormatFlags[ +TypeFormatFlags.InFirstTypeArgument.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.InFirstTypeArgument.value ] !== 'number' ? named( 'InFirstTypeArgument' ) : TypeFormatFlags[ +TypeFormatFlags.InFirstTypeArgument.value ];
TypeFormatFlags.InTypeAlias = wrapped( 'InTypeAlias', 1 << 23 );
TypeFormatFlags[ +TypeFormatFlags.InTypeAlias.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.InTypeAlias.value ] !== 'number' ? named( 'InTypeAlias' ) : TypeFormatFlags[ +TypeFormatFlags.InTypeAlias.value ];
TypeFormatFlags.WriteOwnNameForAnyLike = wrapped( 'WriteOwnNameForAnyLike', 0 );
TypeFormatFlags[ +TypeFormatFlags.WriteOwnNameForAnyLike.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.WriteOwnNameForAnyLike.value ] !== 'number' ? named( 'WriteOwnNameForAnyLike' ) : TypeFormatFlags[ +TypeFormatFlags.WriteOwnNameForAnyLike.value ];
TypeFormatFlags.NodeBuilderFlagsMask = wrapped( 'NodeBuilderFlagsMask', TypeFormatFlags.NoTruncation | TypeFormatFlags.WriteArrayAsGenericType | TypeFormatFlags.UseStructuralFallback | TypeFormatFlags.WriteTypeArgumentsOfSignature |
            TypeFormatFlags.UseFullyQualifiedType | TypeFormatFlags.SuppressAnyReturnType | TypeFormatFlags.MultilineObjectLiterals | TypeFormatFlags.WriteClassExpressionAsTypeLiteral |
            TypeFormatFlags.UseTypeOfFunction | TypeFormatFlags.OmitParameterModifiers | TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | TypeFormatFlags.AllowUniqueESSymbolType | TypeFormatFlags.InTypeAlias );
TypeFormatFlags[ +TypeFormatFlags.NodeBuilderFlagsMask.value ] = typeof TypeFormatFlags[ +TypeFormatFlags.NodeBuilderFlagsMask.value ] !== 'number' ? named( 'NodeBuilderFlagsMask' ) : TypeFormatFlags[ +TypeFormatFlags.NodeBuilderFlagsMask.value ];

TypeFormatFlags = Object.create( tmp = templ(), TypeFormatFlags );
tmp.asString = asString( TypeFormatFlags );

/** *********************************************************************************************************************
 * @enum
 * @name SymbolFormatFlags
 ************************************************************************************************************************/
let SymbolFormatFlags = {};
SymbolFormatFlags.None = wrapped( 'None', 0x00000000 );
SymbolFormatFlags[ +SymbolFormatFlags.None.value ] = typeof SymbolFormatFlags[ +SymbolFormatFlags.None.value ] !== 'number' ? named( 'None' ) : SymbolFormatFlags[ +SymbolFormatFlags.None.value ];

SymbolFormatFlags = Object.create( tmp = templ(), SymbolFormatFlags );
tmp.asString = asString( SymbolFormatFlags );

/** *********************************************************************************************************************
 * @enum
 * @name SymbolAccessibility
 ************************************************************************************************************************/
let SymbolAccessibility = {};
SymbolAccessibility.Accessible = wrapped( 'Accessible', 1 );
SymbolAccessibility[ +SymbolAccessibility.Accessible.value ] = typeof SymbolAccessibility[ +SymbolAccessibility.Accessible.value ] !== 'number' ? named( 'Accessible' ) : SymbolAccessibility[ +SymbolAccessibility.Accessible.value ];
SymbolAccessibility.NotAccessible = wrapped( 'NotAccessible', 2 );
SymbolAccessibility[ +SymbolAccessibility.NotAccessible.value ] = typeof SymbolAccessibility[ +SymbolAccessibility.NotAccessible.value ] !== 'number' ? named( 'NotAccessible' ) : SymbolAccessibility[ +SymbolAccessibility.NotAccessible.value ];
SymbolAccessibility.CannotBeNamed = wrapped( 'CannotBeNamed', 3 );
SymbolAccessibility[ +SymbolAccessibility.CannotBeNamed.value ] = typeof SymbolAccessibility[ +SymbolAccessibility.CannotBeNamed.value ] !== 'number' ? named( 'CannotBeNamed' ) : SymbolAccessibility[ +SymbolAccessibility.CannotBeNamed.value ];

SymbolAccessibility = Object.create( tmp = templ(), SymbolAccessibility );
tmp.asString = asString( SymbolAccessibility );

/** *********************************************************************************************************************
 * @enum
 * @name SyntheticSymbolKind
 ************************************************************************************************************************/
let SyntheticSymbolKind = {};
SyntheticSymbolKind.UnionOrIntersection = wrapped( 'UnionOrIntersection', 1 );
SyntheticSymbolKind[ +SyntheticSymbolKind.UnionOrIntersection.value ] = typeof SyntheticSymbolKind[ +SyntheticSymbolKind.UnionOrIntersection.value ] !== 'number' ? named( 'UnionOrIntersection' ) : SyntheticSymbolKind[ +SyntheticSymbolKind.UnionOrIntersection.value ];
SyntheticSymbolKind.Spread = wrapped( 'Spread', 2 );
SyntheticSymbolKind[ +SyntheticSymbolKind.Spread.value ] = typeof SyntheticSymbolKind[ +SyntheticSymbolKind.Spread.value ] !== 'number' ? named( 'Spread' ) : SyntheticSymbolKind[ +SyntheticSymbolKind.Spread.value ];

SyntheticSymbolKind = Object.create( tmp = templ(), SyntheticSymbolKind );
tmp.asString = asString( SyntheticSymbolKind );

/** *********************************************************************************************************************
 * @enum
 * @name TypePredicateKind
 ************************************************************************************************************************/
let TypePredicateKind = {};
TypePredicateKind.This = wrapped( 'This', 1 );
TypePredicateKind[ +TypePredicateKind.This.value ] = typeof TypePredicateKind[ +TypePredicateKind.This.value ] !== 'number' ? named( 'This' ) : TypePredicateKind[ +TypePredicateKind.This.value ];
TypePredicateKind.Identifier = wrapped( 'Identifier', 2 );
TypePredicateKind[ +TypePredicateKind.Identifier.value ] = typeof TypePredicateKind[ +TypePredicateKind.Identifier.value ] !== 'number' ? named( 'Identifier' ) : TypePredicateKind[ +TypePredicateKind.Identifier.value ];

TypePredicateKind = Object.create( tmp = templ(), TypePredicateKind );
tmp.asString = asString( TypePredicateKind );

/** *********************************************************************************************************************
 * @enum
 * @name SymbolFlags
 ************************************************************************************************************************/
let SymbolFlags = {};
SymbolFlags.None = wrapped( 'None', 0 );
SymbolFlags[ +SymbolFlags.None.value ] = typeof SymbolFlags[ +SymbolFlags.None.value ] !== 'number' ? named( 'None' ) : SymbolFlags[ +SymbolFlags.None.value ];
SymbolFlags.FunctionScopedVariable = wrapped( 'FunctionScopedVariable', 1 << 0 );
SymbolFlags[ +SymbolFlags.FunctionScopedVariable.value ] = typeof SymbolFlags[ +SymbolFlags.FunctionScopedVariable.value ] !== 'number' ? named( 'FunctionScopedVariable' ) : SymbolFlags[ +SymbolFlags.FunctionScopedVariable.value ];
SymbolFlags.BlockScopedVariable = wrapped( 'BlockScopedVariable', 1 << 1 );
SymbolFlags[ +SymbolFlags.BlockScopedVariable.value ] = typeof SymbolFlags[ +SymbolFlags.BlockScopedVariable.value ] !== 'number' ? named( 'BlockScopedVariable' ) : SymbolFlags[ +SymbolFlags.BlockScopedVariable.value ];
SymbolFlags.Property = wrapped( 'Property', 1 << 2 );
SymbolFlags[ +SymbolFlags.Property.value ] = typeof SymbolFlags[ +SymbolFlags.Property.value ] !== 'number' ? named( 'Property' ) : SymbolFlags[ +SymbolFlags.Property.value ];
SymbolFlags.EnumMember = wrapped( 'EnumMember', 1 << 3 );
SymbolFlags[ +SymbolFlags.EnumMember.value ] = typeof SymbolFlags[ +SymbolFlags.EnumMember.value ] !== 'number' ? named( 'EnumMember' ) : SymbolFlags[ +SymbolFlags.EnumMember.value ];
SymbolFlags.Function = wrapped( 'Function', 1 << 4 );
SymbolFlags[ +SymbolFlags.Function.value ] = typeof SymbolFlags[ +SymbolFlags.Function.value ] !== 'number' ? named( 'Function' ) : SymbolFlags[ +SymbolFlags.Function.value ];
SymbolFlags.Class = wrapped( 'Class', 1 << 5 );
SymbolFlags[ +SymbolFlags.Class.value ] = typeof SymbolFlags[ +SymbolFlags.Class.value ] !== 'number' ? named( 'Class' ) : SymbolFlags[ +SymbolFlags.Class.value ];
SymbolFlags.Interface = wrapped( 'Interface', 1 << 6 );
SymbolFlags[ +SymbolFlags.Interface.value ] = typeof SymbolFlags[ +SymbolFlags.Interface.value ] !== 'number' ? named( 'Interface' ) : SymbolFlags[ +SymbolFlags.Interface.value ];
SymbolFlags.ConstEnum = wrapped( 'ConstEnum', 1 << 7 );
SymbolFlags[ +SymbolFlags.ConstEnum.value ] = typeof SymbolFlags[ +SymbolFlags.ConstEnum.value ] !== 'number' ? named( 'ConstEnum' ) : SymbolFlags[ +SymbolFlags.ConstEnum.value ];
SymbolFlags.RegularEnum = wrapped( 'RegularEnum', 1 << 8 );
SymbolFlags[ +SymbolFlags.RegularEnum.value ] = typeof SymbolFlags[ +SymbolFlags.RegularEnum.value ] !== 'number' ? named( 'RegularEnum' ) : SymbolFlags[ +SymbolFlags.RegularEnum.value ];
SymbolFlags.ValueModule = wrapped( 'ValueModule', 1 << 9 );
SymbolFlags[ +SymbolFlags.ValueModule.value ] = typeof SymbolFlags[ +SymbolFlags.ValueModule.value ] !== 'number' ? named( 'ValueModule' ) : SymbolFlags[ +SymbolFlags.ValueModule.value ];
SymbolFlags.NamespaceModule = wrapped( 'NamespaceModule', 1 << 10 );
SymbolFlags[ +SymbolFlags.NamespaceModule.value ] = typeof SymbolFlags[ +SymbolFlags.NamespaceModule.value ] !== 'number' ? named( 'NamespaceModule' ) : SymbolFlags[ +SymbolFlags.NamespaceModule.value ];
SymbolFlags.TypeLiteral = wrapped( 'TypeLiteral', 1 << 11 );
SymbolFlags[ +SymbolFlags.TypeLiteral.value ] = typeof SymbolFlags[ +SymbolFlags.TypeLiteral.value ] !== 'number' ? named( 'TypeLiteral' ) : SymbolFlags[ +SymbolFlags.TypeLiteral.value ];
SymbolFlags.ObjectLiteral = wrapped( 'ObjectLiteral', 1 << 12 );
SymbolFlags[ +SymbolFlags.ObjectLiteral.value ] = typeof SymbolFlags[ +SymbolFlags.ObjectLiteral.value ] !== 'number' ? named( 'ObjectLiteral' ) : SymbolFlags[ +SymbolFlags.ObjectLiteral.value ];
SymbolFlags.Method = wrapped( 'Method', 1 << 13 );
SymbolFlags[ +SymbolFlags.Method.value ] = typeof SymbolFlags[ +SymbolFlags.Method.value ] !== 'number' ? named( 'Method' ) : SymbolFlags[ +SymbolFlags.Method.value ];
SymbolFlags.Constructor = wrapped( 'Constructor', 1 << 14 );
SymbolFlags[ +SymbolFlags.Constructor.value ] = typeof SymbolFlags[ +SymbolFlags.Constructor.value ] !== 'number' ? named( 'Constructor' ) : SymbolFlags[ +SymbolFlags.Constructor.value ];
SymbolFlags.GetAccessor = wrapped( 'GetAccessor', 1 << 15 );
SymbolFlags[ +SymbolFlags.GetAccessor.value ] = typeof SymbolFlags[ +SymbolFlags.GetAccessor.value ] !== 'number' ? named( 'GetAccessor' ) : SymbolFlags[ +SymbolFlags.GetAccessor.value ];
SymbolFlags.SetAccessor = wrapped( 'SetAccessor', 1 << 16 );
SymbolFlags[ +SymbolFlags.SetAccessor.value ] = typeof SymbolFlags[ +SymbolFlags.SetAccessor.value ] !== 'number' ? named( 'SetAccessor' ) : SymbolFlags[ +SymbolFlags.SetAccessor.value ];
SymbolFlags.Signature = wrapped( 'Signature', 1 << 17 );
SymbolFlags[ +SymbolFlags.Signature.value ] = typeof SymbolFlags[ +SymbolFlags.Signature.value ] !== 'number' ? named( 'Signature' ) : SymbolFlags[ +SymbolFlags.Signature.value ];
SymbolFlags.TypeParameter = wrapped( 'TypeParameter', 1 << 18 );
SymbolFlags[ +SymbolFlags.TypeParameter.value ] = typeof SymbolFlags[ +SymbolFlags.TypeParameter.value ] !== 'number' ? named( 'TypeParameter' ) : SymbolFlags[ +SymbolFlags.TypeParameter.value ];
SymbolFlags.TypeAlias = wrapped( 'TypeAlias', 1 << 19 );
SymbolFlags[ +SymbolFlags.TypeAlias.value ] = typeof SymbolFlags[ +SymbolFlags.TypeAlias.value ] !== 'number' ? named( 'TypeAlias' ) : SymbolFlags[ +SymbolFlags.TypeAlias.value ];
SymbolFlags.ExportValue = wrapped( 'ExportValue', 1 << 20 );
SymbolFlags[ +SymbolFlags.ExportValue.value ] = typeof SymbolFlags[ +SymbolFlags.ExportValue.value ] !== 'number' ? named( 'ExportValue' ) : SymbolFlags[ +SymbolFlags.ExportValue.value ];
SymbolFlags.Alias = wrapped( 'Alias', 1 << 21 );
SymbolFlags[ +SymbolFlags.Alias.value ] = typeof SymbolFlags[ +SymbolFlags.Alias.value ] !== 'number' ? named( 'Alias' ) : SymbolFlags[ +SymbolFlags.Alias.value ];
SymbolFlags.Prototype = wrapped( 'Prototype', 1 << 22 );
SymbolFlags[ +SymbolFlags.Prototype.value ] = typeof SymbolFlags[ +SymbolFlags.Prototype.value ] !== 'number' ? named( 'Prototype' ) : SymbolFlags[ +SymbolFlags.Prototype.value ];
SymbolFlags.ExportStar = wrapped( 'ExportStar', 1 << 23 );
SymbolFlags[ +SymbolFlags.ExportStar.value ] = typeof SymbolFlags[ +SymbolFlags.ExportStar.value ] !== 'number' ? named( 'ExportStar' ) : SymbolFlags[ +SymbolFlags.ExportStar.value ];
SymbolFlags.Optional = wrapped( 'Optional', 1 << 24 );
SymbolFlags[ +SymbolFlags.Optional.value ] = typeof SymbolFlags[ +SymbolFlags.Optional.value ] !== 'number' ? named( 'Optional' ) : SymbolFlags[ +SymbolFlags.Optional.value ];
SymbolFlags.Transient = wrapped( 'Transient', 1 << 25 );
SymbolFlags[ +SymbolFlags.Transient.value ] = typeof SymbolFlags[ +SymbolFlags.Transient.value ] !== 'number' ? named( 'Transient' ) : SymbolFlags[ +SymbolFlags.Transient.value ];
SymbolFlags.JSContainer = wrapped( 'JSContainer', 1 << 26 );
SymbolFlags[ +SymbolFlags.JSContainer.value ] = typeof SymbolFlags[ +SymbolFlags.JSContainer.value ] !== 'number' ? named( 'JSContainer' ) : SymbolFlags[ +SymbolFlags.JSContainer.value ];
SymbolFlags.All = wrapped( 'All', SymbolFlags.FunctionScopedVariable | SymbolFlags.BlockScopedVariable | SymbolFlags.Property | SymbolFlags.EnumMember | SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.ConstEnum | SymbolFlags.RegularEnum | SymbolFlags.ValueModule | SymbolFlags.NamespaceModule | SymbolFlags.TypeLiteral
            | SymbolFlags.ObjectLiteral | SymbolFlags.Method | SymbolFlags.Constructor | SymbolFlags.GetAccessor | SymbolFlags.SetAccessor | SymbolFlags.Signature | SymbolFlags.TypeParameter | SymbolFlags.TypeAlias | SymbolFlags.ExportValue | SymbolFlags.Alias | SymbolFlags.Prototype | SymbolFlags.ExportStar | SymbolFlags.Optional | SymbolFlags.Transient );
SymbolFlags[ +SymbolFlags.All.value ] = typeof SymbolFlags[ +SymbolFlags.All.value ] !== 'number' ? named( 'All' ) : SymbolFlags[ +SymbolFlags.All.value ];
SymbolFlags.Enum = wrapped( 'Enum', SymbolFlags.RegularEnum | SymbolFlags.ConstEnum );
SymbolFlags[ +SymbolFlags.Enum.value ] = typeof SymbolFlags[ +SymbolFlags.Enum.value ] !== 'number' ? named( 'Enum' ) : SymbolFlags[ +SymbolFlags.Enum.value ];
SymbolFlags.Variable = wrapped( 'Variable', SymbolFlags.FunctionScopedVariable | SymbolFlags.BlockScopedVariable );
SymbolFlags[ +SymbolFlags.Variable.value ] = typeof SymbolFlags[ +SymbolFlags.Variable.value ] !== 'number' ? named( 'Variable' ) : SymbolFlags[ +SymbolFlags.Variable.value ];
SymbolFlags.Value = wrapped( 'Value', SymbolFlags.Variable | SymbolFlags.Property | SymbolFlags.EnumMember | SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule | SymbolFlags.Method | SymbolFlags.GetAccessor | SymbolFlags.SetAccessor | SymbolFlags.JSContainer );
SymbolFlags[ +SymbolFlags.Value.value ] = typeof SymbolFlags[ +SymbolFlags.Value.value ] !== 'number' ? named( 'Value' ) : SymbolFlags[ +SymbolFlags.Value.value ];
SymbolFlags.Type = wrapped( 'Type', SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.Enum | SymbolFlags.EnumMember | SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral | SymbolFlags.TypeParameter | SymbolFlags.TypeAlias | SymbolFlags.JSContainer );
SymbolFlags[ +SymbolFlags.Type.value ] = typeof SymbolFlags[ +SymbolFlags.Type.value ] !== 'number' ? named( 'Type' ) : SymbolFlags[ +SymbolFlags.Type.value ];
SymbolFlags.Namespace = wrapped( 'Namespace', SymbolFlags.ValueModule | SymbolFlags.NamespaceModule | SymbolFlags.Enum );
SymbolFlags[ +SymbolFlags.Namespace.value ] = typeof SymbolFlags[ +SymbolFlags.Namespace.value ] !== 'number' ? named( 'Namespace' ) : SymbolFlags[ +SymbolFlags.Namespace.value ];
SymbolFlags.Module = wrapped( 'Module', SymbolFlags.ValueModule | SymbolFlags.NamespaceModule );
SymbolFlags[ +SymbolFlags.Module.value ] = typeof SymbolFlags[ +SymbolFlags.Module.value ] !== 'number' ? named( 'Module' ) : SymbolFlags[ +SymbolFlags.Module.value ];
SymbolFlags.Accessor = wrapped( 'Accessor', SymbolFlags.GetAccessor | SymbolFlags.SetAccessor );
SymbolFlags[ +SymbolFlags.Accessor.value ] = typeof SymbolFlags[ +SymbolFlags.Accessor.value ] !== 'number' ? named( 'Accessor' ) : SymbolFlags[ +SymbolFlags.Accessor.value ];
SymbolFlags.FunctionScopedVariableExcludes = wrapped( 'FunctionScopedVariableExcludes', SymbolFlags.Value & ~SymbolFlags.FunctionScopedVariable );
SymbolFlags[ +SymbolFlags.FunctionScopedVariableExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.FunctionScopedVariableExcludes.value ] !== 'number' ? named( 'FunctionScopedVariableExcludes' ) : SymbolFlags[ +SymbolFlags.FunctionScopedVariableExcludes.value ];
SymbolFlags.BlockScopedVariableExcludes = wrapped( 'BlockScopedVariableExcludes', +SymbolFlags.Value );
SymbolFlags[ +SymbolFlags.BlockScopedVariableExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.BlockScopedVariableExcludes.value ] !== 'number' ? named( 'BlockScopedVariableExcludes' ) : SymbolFlags[ +SymbolFlags.BlockScopedVariableExcludes.value ];
SymbolFlags.ParameterExcludes = wrapped( 'ParameterExcludes', +SymbolFlags.Value );
SymbolFlags[ +SymbolFlags.ParameterExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.ParameterExcludes.value ] !== 'number' ? named( 'ParameterExcludes' ) : SymbolFlags[ +SymbolFlags.ParameterExcludes.value ];
SymbolFlags.PropertyExcludes = wrapped( 'PropertyExcludes', +SymbolFlags.None );
SymbolFlags[ +SymbolFlags.PropertyExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.PropertyExcludes.value ] !== 'number' ? named( 'PropertyExcludes' ) : SymbolFlags[ +SymbolFlags.PropertyExcludes.value ];
SymbolFlags.EnumMemberExcludes = wrapped( 'EnumMemberExcludes', SymbolFlags.Value | SymbolFlags.Type );
SymbolFlags[ +SymbolFlags.EnumMemberExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.EnumMemberExcludes.value ] !== 'number' ? named( 'EnumMemberExcludes' ) : SymbolFlags[ +SymbolFlags.EnumMemberExcludes.value ];
SymbolFlags.FunctionExcludes = wrapped( 'FunctionExcludes', SymbolFlags.Value & ~( SymbolFlags.Function | SymbolFlags.ValueModule ) );
SymbolFlags[ +SymbolFlags.FunctionExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.FunctionExcludes.value ] !== 'number' ? named( 'FunctionExcludes' ) : SymbolFlags[ +SymbolFlags.FunctionExcludes.value ];
SymbolFlags.ClassExcludes = wrapped( 'ClassExcludes', ( SymbolFlags.Value | SymbolFlags.Type ) & ~( SymbolFlags.ValueModule | SymbolFlags.Interface ) );
SymbolFlags[ +SymbolFlags.ClassExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.ClassExcludes.value ] !== 'number' ? named( 'ClassExcludes' ) : SymbolFlags[ +SymbolFlags.ClassExcludes.value ];
SymbolFlags.InterfaceExcludes = wrapped( 'InterfaceExcludes', SymbolFlags.Type & ~( SymbolFlags.Interface | SymbolFlags.Class ) );
SymbolFlags[ +SymbolFlags.InterfaceExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.InterfaceExcludes.value ] !== 'number' ? named( 'InterfaceExcludes' ) : SymbolFlags[ +SymbolFlags.InterfaceExcludes.value ];
SymbolFlags.RegularEnumExcludes = wrapped( 'RegularEnumExcludes', ( SymbolFlags.Value | SymbolFlags.Type ) & ~( SymbolFlags.RegularEnum | SymbolFlags.ValueModule ) );
SymbolFlags[ +SymbolFlags.RegularEnumExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.RegularEnumExcludes.value ] !== 'number' ? named( 'RegularEnumExcludes' ) : SymbolFlags[ +SymbolFlags.RegularEnumExcludes.value ];
SymbolFlags.ConstEnumExcludes = wrapped( 'ConstEnumExcludes', ( SymbolFlags.Value | SymbolFlags.Type ) & ~SymbolFlags.ConstEnum );
SymbolFlags[ +SymbolFlags.ConstEnumExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.ConstEnumExcludes.value ] !== 'number' ? named( 'ConstEnumExcludes' ) : SymbolFlags[ +SymbolFlags.ConstEnumExcludes.value ];
SymbolFlags.ValueModuleExcludes = wrapped( 'ValueModuleExcludes', SymbolFlags.Value & ~( SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.RegularEnum | SymbolFlags.ValueModule ) );
SymbolFlags[ +SymbolFlags.ValueModuleExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.ValueModuleExcludes.value ] !== 'number' ? named( 'ValueModuleExcludes' ) : SymbolFlags[ +SymbolFlags.ValueModuleExcludes.value ];
SymbolFlags.NamespaceModuleExcludes = wrapped( 'NamespaceModuleExcludes', 0 );
SymbolFlags[ +SymbolFlags.NamespaceModuleExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.NamespaceModuleExcludes.value ] !== 'number' ? named( 'NamespaceModuleExcludes' ) : SymbolFlags[ +SymbolFlags.NamespaceModuleExcludes.value ];
SymbolFlags.MethodExcludes = wrapped( 'MethodExcludes', SymbolFlags.Value & ~SymbolFlags.Method );
SymbolFlags[ +SymbolFlags.MethodExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.MethodExcludes.value ] !== 'number' ? named( 'MethodExcludes' ) : SymbolFlags[ +SymbolFlags.MethodExcludes.value ];
SymbolFlags.GetAccessorExcludes = wrapped( 'GetAccessorExcludes', SymbolFlags.Value & ~SymbolFlags.SetAccessor );
SymbolFlags[ +SymbolFlags.GetAccessorExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.GetAccessorExcludes.value ] !== 'number' ? named( 'GetAccessorExcludes' ) : SymbolFlags[ +SymbolFlags.GetAccessorExcludes.value ];
SymbolFlags.SetAccessorExcludes = wrapped( 'SetAccessorExcludes', SymbolFlags.Value & ~SymbolFlags.GetAccessor );
SymbolFlags[ +SymbolFlags.SetAccessorExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.SetAccessorExcludes.value ] !== 'number' ? named( 'SetAccessorExcludes' ) : SymbolFlags[ +SymbolFlags.SetAccessorExcludes.value ];
SymbolFlags.TypeParameterExcludes = wrapped( 'TypeParameterExcludes', SymbolFlags.Type & ~SymbolFlags.TypeParameter );
SymbolFlags[ +SymbolFlags.TypeParameterExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.TypeParameterExcludes.value ] !== 'number' ? named( 'TypeParameterExcludes' ) : SymbolFlags[ +SymbolFlags.TypeParameterExcludes.value ];
SymbolFlags.TypeAliasExcludes = wrapped( 'TypeAliasExcludes', +SymbolFlags.Type );
SymbolFlags[ +SymbolFlags.TypeAliasExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.TypeAliasExcludes.value ] !== 'number' ? named( 'TypeAliasExcludes' ) : SymbolFlags[ +SymbolFlags.TypeAliasExcludes.value ];
SymbolFlags.AliasExcludes = wrapped( 'AliasExcludes', +SymbolFlags.Alias );
SymbolFlags[ +SymbolFlags.AliasExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.AliasExcludes.value ] !== 'number' ? named( 'AliasExcludes' ) : SymbolFlags[ +SymbolFlags.AliasExcludes.value ];
SymbolFlags.ModuleMember = wrapped( 'ModuleMember', SymbolFlags.Variable | SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.Enum | SymbolFlags.Module | SymbolFlags.TypeAlias | SymbolFlags.Alias );
SymbolFlags[ +SymbolFlags.ModuleMember.value ] = typeof SymbolFlags[ +SymbolFlags.ModuleMember.value ] !== 'number' ? named( 'ModuleMember' ) : SymbolFlags[ +SymbolFlags.ModuleMember.value ];
SymbolFlags.ExportHasLocal = wrapped( 'ExportHasLocal', SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule );
SymbolFlags[ +SymbolFlags.ExportHasLocal.value ] = typeof SymbolFlags[ +SymbolFlags.ExportHasLocal.value ] !== 'number' ? named( 'ExportHasLocal' ) : SymbolFlags[ +SymbolFlags.ExportHasLocal.value ];
SymbolFlags.HasExports = wrapped( 'HasExports', SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.Module );
SymbolFlags[ +SymbolFlags.HasExports.value ] = typeof SymbolFlags[ +SymbolFlags.HasExports.value ] !== 'number' ? named( 'HasExports' ) : SymbolFlags[ +SymbolFlags.HasExports.value ];
SymbolFlags.HasMembers = wrapped( 'HasMembers', SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral );
SymbolFlags[ +SymbolFlags.HasMembers.value ] = typeof SymbolFlags[ +SymbolFlags.HasMembers.value ] !== 'number' ? named( 'HasMembers' ) : SymbolFlags[ +SymbolFlags.HasMembers.value ];
SymbolFlags.BlockScoped = wrapped( 'BlockScoped', SymbolFlags.BlockScopedVariable | SymbolFlags.Class | SymbolFlags.Enum );
SymbolFlags[ +SymbolFlags.BlockScoped.value ] = typeof SymbolFlags[ +SymbolFlags.BlockScoped.value ] !== 'number' ? named( 'BlockScoped' ) : SymbolFlags[ +SymbolFlags.BlockScoped.value ];
SymbolFlags.PropertyOrAccessor = wrapped( 'PropertyOrAccessor', SymbolFlags.Property | SymbolFlags.Accessor );
SymbolFlags[ +SymbolFlags.PropertyOrAccessor.value ] = typeof SymbolFlags[ +SymbolFlags.PropertyOrAccessor.value ] !== 'number' ? named( 'PropertyOrAccessor' ) : SymbolFlags[ +SymbolFlags.PropertyOrAccessor.value ];
SymbolFlags.ClassMember = wrapped( 'ClassMember', SymbolFlags.Method | SymbolFlags.Accessor | SymbolFlags.Property );
SymbolFlags[ +SymbolFlags.ClassMember.value ] = typeof SymbolFlags[ +SymbolFlags.ClassMember.value ] !== 'number' ? named( 'ClassMember' ) : SymbolFlags[ +SymbolFlags.ClassMember.value ];
SymbolFlags.Classifiable = wrapped( 'Classifiable', SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.TypeAlias | SymbolFlags.Interface | SymbolFlags.TypeParameter | SymbolFlags.Module | SymbolFlags.Alias );
SymbolFlags[ +SymbolFlags.Classifiable.value ] = typeof SymbolFlags[ +SymbolFlags.Classifiable.value ] !== 'number' ? named( 'Classifiable' ) : SymbolFlags[ +SymbolFlags.Classifiable.value ];
SymbolFlags.LateBindingContainer = wrapped( 'LateBindingContainer', SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral );
SymbolFlags[ +SymbolFlags.LateBindingContainer.value ] = typeof SymbolFlags[ +SymbolFlags.LateBindingContainer.value ] !== 'number' ? named( 'LateBindingContainer' ) : SymbolFlags[ +SymbolFlags.LateBindingContainer.value ];

SymbolFlags = Object.create( tmp = templ(), SymbolFlags );
tmp.asString = asString( SymbolFlags );

/** *********************************************************************************************************************
 * @enum
 * @name EnumKind
 ************************************************************************************************************************/
let EnumKind = {};
EnumKind.Numeric = wrapped( 'Numeric', 1 );
EnumKind[ +EnumKind.Numeric.value ] = typeof EnumKind[ +EnumKind.Numeric.value ] !== 'number' ? named( 'Numeric' ) : EnumKind[ +EnumKind.Numeric.value ];

EnumKind = Object.create( tmp = templ(), EnumKind );
tmp.asString = asString( EnumKind );

/** *********************************************************************************************************************
 * @enum
 * @name CheckFlags
 ************************************************************************************************************************/
let CheckFlags = {};
CheckFlags.Instantiated = wrapped( 'Instantiated', 1 << 0 );
CheckFlags[ +CheckFlags.Instantiated.value ] = typeof CheckFlags[ +CheckFlags.Instantiated.value ] !== 'number' ? named( 'Instantiated' ) : CheckFlags[ +CheckFlags.Instantiated.value ];
CheckFlags.SyntheticProperty = wrapped( 'SyntheticProperty', 1 << 1 );
CheckFlags[ +CheckFlags.SyntheticProperty.value ] = typeof CheckFlags[ +CheckFlags.SyntheticProperty.value ] !== 'number' ? named( 'SyntheticProperty' ) : CheckFlags[ +CheckFlags.SyntheticProperty.value ];
CheckFlags.SyntheticMethod = wrapped( 'SyntheticMethod', 1 << 2 );
CheckFlags[ +CheckFlags.SyntheticMethod.value ] = typeof CheckFlags[ +CheckFlags.SyntheticMethod.value ] !== 'number' ? named( 'SyntheticMethod' ) : CheckFlags[ +CheckFlags.SyntheticMethod.value ];
CheckFlags.Readonly = wrapped( 'Readonly', 1 << 3 );
CheckFlags[ +CheckFlags.Readonly.value ] = typeof CheckFlags[ +CheckFlags.Readonly.value ] !== 'number' ? named( 'Readonly' ) : CheckFlags[ +CheckFlags.Readonly.value ];
CheckFlags.Partial = wrapped( 'Partial', 1 << 4 );
CheckFlags[ +CheckFlags.Partial.value ] = typeof CheckFlags[ +CheckFlags.Partial.value ] !== 'number' ? named( 'Partial' ) : CheckFlags[ +CheckFlags.Partial.value ];
CheckFlags.HasNonUniformType = wrapped( 'HasNonUniformType', 1 << 5 );
CheckFlags[ +CheckFlags.HasNonUniformType.value ] = typeof CheckFlags[ +CheckFlags.HasNonUniformType.value ] !== 'number' ? named( 'HasNonUniformType' ) : CheckFlags[ +CheckFlags.HasNonUniformType.value ];
CheckFlags.ContainsPublic = wrapped( 'ContainsPublic', 1 << 6 );
CheckFlags[ +CheckFlags.ContainsPublic.value ] = typeof CheckFlags[ +CheckFlags.ContainsPublic.value ] !== 'number' ? named( 'ContainsPublic' ) : CheckFlags[ +CheckFlags.ContainsPublic.value ];
CheckFlags.ContainsProtected = wrapped( 'ContainsProtected', 1 << 7 );
CheckFlags[ +CheckFlags.ContainsProtected.value ] = typeof CheckFlags[ +CheckFlags.ContainsProtected.value ] !== 'number' ? named( 'ContainsProtected' ) : CheckFlags[ +CheckFlags.ContainsProtected.value ];
CheckFlags.ContainsPrivate = wrapped( 'ContainsPrivate', 1 << 8 );
CheckFlags[ +CheckFlags.ContainsPrivate.value ] = typeof CheckFlags[ +CheckFlags.ContainsPrivate.value ] !== 'number' ? named( 'ContainsPrivate' ) : CheckFlags[ +CheckFlags.ContainsPrivate.value ];
CheckFlags.ContainsStatic = wrapped( 'ContainsStatic', 1 << 9 );
CheckFlags[ +CheckFlags.ContainsStatic.value ] = typeof CheckFlags[ +CheckFlags.ContainsStatic.value ] !== 'number' ? named( 'ContainsStatic' ) : CheckFlags[ +CheckFlags.ContainsStatic.value ];
CheckFlags.Late = wrapped( 'Late', 1 << 10 );
CheckFlags[ +CheckFlags.Late.value ] = typeof CheckFlags[ +CheckFlags.Late.value ] !== 'number' ? named( 'Late' ) : CheckFlags[ +CheckFlags.Late.value ];
CheckFlags.ReverseMapped = wrapped( 'ReverseMapped', 1 << 11 );
CheckFlags[ +CheckFlags.ReverseMapped.value ] = typeof CheckFlags[ +CheckFlags.ReverseMapped.value ] !== 'number' ? named( 'ReverseMapped' ) : CheckFlags[ +CheckFlags.ReverseMapped.value ];
CheckFlags.Synthetic = wrapped( 'Synthetic', CheckFlags.SyntheticProperty | CheckFlags.SyntheticMethod );
CheckFlags[ +CheckFlags.Synthetic.value ] = typeof CheckFlags[ +CheckFlags.Synthetic.value ] !== 'number' ? named( 'Synthetic' ) : CheckFlags[ +CheckFlags.Synthetic.value ];

CheckFlags = Object.create( tmp = templ(), CheckFlags );
tmp.asString = asString( CheckFlags );

/** *********************************************************************************************************************
 * @enum
 * @name InternalSymbolName
 ************************************************************************************************************************/
let InternalSymbolName = {};
InternalSymbolName.Call = wrapped( 'Call', "__call" );
InternalSymbolName[ +InternalSymbolName.Call.value ] = typeof InternalSymbolName[ +InternalSymbolName.Call.value ] !== 'number' ? named( 'Call' ) : InternalSymbolName[ +InternalSymbolName.Call.value ];
InternalSymbolName.Constructor = wrapped( 'Constructor', "__constructor" );
InternalSymbolName[ +InternalSymbolName.Constructor.value ] = typeof InternalSymbolName[ +InternalSymbolName.Constructor.value ] !== 'number' ? named( 'Constructor' ) : InternalSymbolName[ +InternalSymbolName.Constructor.value ];
InternalSymbolName.New = wrapped( 'New', "__new" );
InternalSymbolName[ +InternalSymbolName.New.value ] = typeof InternalSymbolName[ +InternalSymbolName.New.value ] !== 'number' ? named( 'New' ) : InternalSymbolName[ +InternalSymbolName.New.value ];
InternalSymbolName.Index = wrapped( 'Index', "__index" );
InternalSymbolName[ +InternalSymbolName.Index.value ] = typeof InternalSymbolName[ +InternalSymbolName.Index.value ] !== 'number' ? named( 'Index' ) : InternalSymbolName[ +InternalSymbolName.Index.value ];
InternalSymbolName.ExportStar = wrapped( 'ExportStar', "__export" );
InternalSymbolName[ +InternalSymbolName.ExportStar.value ] = typeof InternalSymbolName[ +InternalSymbolName.ExportStar.value ] !== 'number' ? named( 'ExportStar' ) : InternalSymbolName[ +InternalSymbolName.ExportStar.value ];
InternalSymbolName.Global = wrapped( 'Global', "__global" );
InternalSymbolName[ +InternalSymbolName.Global.value ] = typeof InternalSymbolName[ +InternalSymbolName.Global.value ] !== 'number' ? named( 'Global' ) : InternalSymbolName[ +InternalSymbolName.Global.value ];
InternalSymbolName.Missing = wrapped( 'Missing', "__missing" );
InternalSymbolName[ +InternalSymbolName.Missing.value ] = typeof InternalSymbolName[ +InternalSymbolName.Missing.value ] !== 'number' ? named( 'Missing' ) : InternalSymbolName[ +InternalSymbolName.Missing.value ];
InternalSymbolName.Type = wrapped( 'Type', "__type" );
InternalSymbolName[ +InternalSymbolName.Type.value ] = typeof InternalSymbolName[ +InternalSymbolName.Type.value ] !== 'number' ? named( 'Type' ) : InternalSymbolName[ +InternalSymbolName.Type.value ];
InternalSymbolName.Object = wrapped( 'Object', "__object" );
InternalSymbolName[ +InternalSymbolName.Object.value ] = typeof InternalSymbolName[ +InternalSymbolName.Object.value ] !== 'number' ? named( 'Object' ) : InternalSymbolName[ +InternalSymbolName.Object.value ];
InternalSymbolName.JSXAttributes = wrapped( 'JSXAttributes', "__jsxInternalSymbolName.Attributes" );
InternalSymbolName[ +InternalSymbolName.JSXAttributes.value ] = typeof InternalSymbolName[ +InternalSymbolName.JSXAttributes.value ] !== 'number' ? named( 'JSXAttributes' ) : InternalSymbolName[ +InternalSymbolName.JSXAttributes.value ];
InternalSymbolName.Class = wrapped( 'Class', "__class" );
InternalSymbolName[ +InternalSymbolName.Class.value ] = typeof InternalSymbolName[ +InternalSymbolName.Class.value ] !== 'number' ? named( 'Class' ) : InternalSymbolName[ +InternalSymbolName.Class.value ];
InternalSymbolName.Function = wrapped( 'Function', "__function" );
InternalSymbolName[ +InternalSymbolName.Function.value ] = typeof InternalSymbolName[ +InternalSymbolName.Function.value ] !== 'number' ? named( 'Function' ) : InternalSymbolName[ +InternalSymbolName.Function.value ];
InternalSymbolName.Computed = wrapped( 'Computed', "__computed" );
InternalSymbolName[ +InternalSymbolName.Computed.value ] = typeof InternalSymbolName[ +InternalSymbolName.Computed.value ] !== 'number' ? named( 'Computed' ) : InternalSymbolName[ +InternalSymbolName.Computed.value ];
InternalSymbolName.Resolving = wrapped( 'Resolving', "__resolving__" );
InternalSymbolName[ +InternalSymbolName.Resolving.value ] = typeof InternalSymbolName[ +InternalSymbolName.Resolving.value ] !== 'number' ? named( 'Resolving' ) : InternalSymbolName[ +InternalSymbolName.Resolving.value ];
InternalSymbolName.ExportEquals = wrapped( 'ExportEquals', "export=" );
InternalSymbolName[ +InternalSymbolName.ExportEquals.value ] = typeof InternalSymbolName[ +InternalSymbolName.ExportEquals.value ] !== 'number' ? named( 'ExportEquals' ) : InternalSymbolName[ +InternalSymbolName.ExportEquals.value ];
InternalSymbolName.Default = wrapped( 'Default', "default" );
InternalSymbolName[ +InternalSymbolName.Default.value ] = typeof InternalSymbolName[ +InternalSymbolName.Default.value ] !== 'number' ? named( 'Default' ) : InternalSymbolName[ +InternalSymbolName.Default.value ];

InternalSymbolName = Object.create( tmp = templ(), InternalSymbolName );
tmp.asString = asString( InternalSymbolName );

/** *********************************************************************************************************************
 * @enum
 * @name NodeCheckFlags
 ************************************************************************************************************************/
let NodeCheckFlags = {};
NodeCheckFlags.TypeChecked = wrapped( 'TypeChecked', 0x00000001 );
NodeCheckFlags[ +NodeCheckFlags.TypeChecked.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.TypeChecked.value ] !== 'number' ? named( 'TypeChecked' ) : NodeCheckFlags[ +NodeCheckFlags.TypeChecked.value ];
NodeCheckFlags.LexicalThis = wrapped( 'LexicalThis', 0x00000002 );
NodeCheckFlags[ +NodeCheckFlags.LexicalThis.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.LexicalThis.value ] !== 'number' ? named( 'LexicalThis' ) : NodeCheckFlags[ +NodeCheckFlags.LexicalThis.value ];
NodeCheckFlags.CaptureThis = wrapped( 'CaptureThis', 0x00000004 );
NodeCheckFlags[ +NodeCheckFlags.CaptureThis.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.CaptureThis.value ] !== 'number' ? named( 'CaptureThis' ) : NodeCheckFlags[ +NodeCheckFlags.CaptureThis.value ];
NodeCheckFlags.CaptureNewTarget = wrapped( 'CaptureNewTarget', 0x00000008 );
NodeCheckFlags[ +NodeCheckFlags.CaptureNewTarget.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.CaptureNewTarget.value ] !== 'number' ? named( 'CaptureNewTarget' ) : NodeCheckFlags[ +NodeCheckFlags.CaptureNewTarget.value ];
NodeCheckFlags.SuperInstance = wrapped( 'SuperInstance', 0x00000100 );
NodeCheckFlags[ +NodeCheckFlags.SuperInstance.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.SuperInstance.value ] !== 'number' ? named( 'SuperInstance' ) : NodeCheckFlags[ +NodeCheckFlags.SuperInstance.value ];
NodeCheckFlags.SuperStatic = wrapped( 'SuperStatic', 0x00000200 );
NodeCheckFlags[ +NodeCheckFlags.SuperStatic.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.SuperStatic.value ] !== 'number' ? named( 'SuperStatic' ) : NodeCheckFlags[ +NodeCheckFlags.SuperStatic.value ];
NodeCheckFlags.ContextChecked = wrapped( 'ContextChecked', 0x00000400 );
NodeCheckFlags[ +NodeCheckFlags.ContextChecked.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.ContextChecked.value ] !== 'number' ? named( 'ContextChecked' ) : NodeCheckFlags[ +NodeCheckFlags.ContextChecked.value ];
NodeCheckFlags.AsyncMethodWithSuper = wrapped( 'AsyncMethodWithSuper', 0x00000800 );
NodeCheckFlags[ +NodeCheckFlags.AsyncMethodWithSuper.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.AsyncMethodWithSuper.value ] !== 'number' ? named( 'AsyncMethodWithSuper' ) : NodeCheckFlags[ +NodeCheckFlags.AsyncMethodWithSuper.value ];
NodeCheckFlags.AsyncMethodWithSuperBinding = wrapped( 'AsyncMethodWithSuperBinding', 0x00001000 );
NodeCheckFlags[ +NodeCheckFlags.AsyncMethodWithSuperBinding.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.AsyncMethodWithSuperBinding.value ] !== 'number' ? named( 'AsyncMethodWithSuperBinding' ) : NodeCheckFlags[ +NodeCheckFlags.AsyncMethodWithSuperBinding.value ];
NodeCheckFlags.CaptureArguments = wrapped( 'CaptureArguments', 0x00002000 );
NodeCheckFlags[ +NodeCheckFlags.CaptureArguments.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.CaptureArguments.value ] !== 'number' ? named( 'CaptureArguments' ) : NodeCheckFlags[ +NodeCheckFlags.CaptureArguments.value ];
NodeCheckFlags.EnumValuesComputed = wrapped( 'EnumValuesComputed', 0x00004000 );
NodeCheckFlags[ +NodeCheckFlags.EnumValuesComputed.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.EnumValuesComputed.value ] !== 'number' ? named( 'EnumValuesComputed' ) : NodeCheckFlags[ +NodeCheckFlags.EnumValuesComputed.value ];
NodeCheckFlags.LexicalModuleMergesWithClass = wrapped( 'LexicalModuleMergesWithClass', 0x00008000 );
NodeCheckFlags[ +NodeCheckFlags.LexicalModuleMergesWithClass.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.LexicalModuleMergesWithClass.value ] !== 'number' ? named( 'LexicalModuleMergesWithClass' ) : NodeCheckFlags[ +NodeCheckFlags.LexicalModuleMergesWithClass.value ];
NodeCheckFlags.LoopWithCapturedBlockScopedBinding = wrapped( 'LoopWithCapturedBlockScopedBinding', 0x00010000 );
NodeCheckFlags[ +NodeCheckFlags.LoopWithCapturedBlockScopedBinding.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.LoopWithCapturedBlockScopedBinding.value ] !== 'number' ? named( 'LoopWithCapturedBlockScopedBinding' ) : NodeCheckFlags[ +NodeCheckFlags.LoopWithCapturedBlockScopedBinding.value ];
NodeCheckFlags.CapturedBlockScopedBinding = wrapped( 'CapturedBlockScopedBinding', 0x00020000 );
NodeCheckFlags[ +NodeCheckFlags.CapturedBlockScopedBinding.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.CapturedBlockScopedBinding.value ] !== 'number' ? named( 'CapturedBlockScopedBinding' ) : NodeCheckFlags[ +NodeCheckFlags.CapturedBlockScopedBinding.value ];
NodeCheckFlags.BlockScopedBindingInLoop = wrapped( 'BlockScopedBindingInLoop', 0x00040000 );
NodeCheckFlags[ +NodeCheckFlags.BlockScopedBindingInLoop.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.BlockScopedBindingInLoop.value ] !== 'number' ? named( 'BlockScopedBindingInLoop' ) : NodeCheckFlags[ +NodeCheckFlags.BlockScopedBindingInLoop.value ];
NodeCheckFlags.ClassWithBodyScopedClassBinding = wrapped( 'ClassWithBodyScopedClassBinding', 0x00080000 );
NodeCheckFlags[ +NodeCheckFlags.ClassWithBodyScopedClassBinding.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.ClassWithBodyScopedClassBinding.value ] !== 'number' ? named( 'ClassWithBodyScopedClassBinding' ) : NodeCheckFlags[ +NodeCheckFlags.ClassWithBodyScopedClassBinding.value ];
NodeCheckFlags.BodyScopedClassBinding = wrapped( 'BodyScopedClassBinding', 0x00100000 );
NodeCheckFlags[ +NodeCheckFlags.BodyScopedClassBinding.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.BodyScopedClassBinding.value ] !== 'number' ? named( 'BodyScopedClassBinding' ) : NodeCheckFlags[ +NodeCheckFlags.BodyScopedClassBinding.value ];
NodeCheckFlags.NeedsLoopOutParameter = wrapped( 'NeedsLoopOutParameter', 0x00200000 );
NodeCheckFlags[ +NodeCheckFlags.NeedsLoopOutParameter.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.NeedsLoopOutParameter.value ] !== 'number' ? named( 'NeedsLoopOutParameter' ) : NodeCheckFlags[ +NodeCheckFlags.NeedsLoopOutParameter.value ];
NodeCheckFlags.AssignmentsMarked = wrapped( 'AssignmentsMarked', 0x00400000 );
NodeCheckFlags[ +NodeCheckFlags.AssignmentsMarked.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.AssignmentsMarked.value ] !== 'number' ? named( 'AssignmentsMarked' ) : NodeCheckFlags[ +NodeCheckFlags.AssignmentsMarked.value ];
NodeCheckFlags.ClassWithConstructorReference = wrapped( 'ClassWithConstructorReference', 0x00800000 );
NodeCheckFlags[ +NodeCheckFlags.ClassWithConstructorReference.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.ClassWithConstructorReference.value ] !== 'number' ? named( 'ClassWithConstructorReference' ) : NodeCheckFlags[ +NodeCheckFlags.ClassWithConstructorReference.value ];
NodeCheckFlags.ConstructorReferenceInClass = wrapped( 'ConstructorReferenceInClass', 0x01000000 );
NodeCheckFlags[ +NodeCheckFlags.ConstructorReferenceInClass.value ] = typeof NodeCheckFlags[ +NodeCheckFlags.ConstructorReferenceInClass.value ] !== 'number' ? named( 'ConstructorReferenceInClass' ) : NodeCheckFlags[ +NodeCheckFlags.ConstructorReferenceInClass.value ];

NodeCheckFlags = Object.create( tmp = templ(), NodeCheckFlags );
tmp.asString = asString( NodeCheckFlags );

/** *********************************************************************************************************************
 * @enum
 * @name TypeFlags
 ************************************************************************************************************************/
let TypeFlags = {};
TypeFlags.Any = wrapped( 'Any', 1 << 0 );
TypeFlags[ +TypeFlags.Any.value ] = typeof TypeFlags[ +TypeFlags.Any.value ] !== 'number' ? named( 'Any' ) : TypeFlags[ +TypeFlags.Any.value ];
TypeFlags.String = wrapped( 'String', 1 << 1 );
TypeFlags[ +TypeFlags.String.value ] = typeof TypeFlags[ +TypeFlags.String.value ] !== 'number' ? named( 'String' ) : TypeFlags[ +TypeFlags.String.value ];
TypeFlags.Number = wrapped( 'Number', 1 << 2 );
TypeFlags[ +TypeFlags.Number.value ] = typeof TypeFlags[ +TypeFlags.Number.value ] !== 'number' ? named( 'Number' ) : TypeFlags[ +TypeFlags.Number.value ];
TypeFlags.Boolean = wrapped( 'Boolean', 1 << 3 );
TypeFlags[ +TypeFlags.Boolean.value ] = typeof TypeFlags[ +TypeFlags.Boolean.value ] !== 'number' ? named( 'Boolean' ) : TypeFlags[ +TypeFlags.Boolean.value ];
TypeFlags.Enum = wrapped( 'Enum', 1 << 4 );
TypeFlags[ +TypeFlags.Enum.value ] = typeof TypeFlags[ +TypeFlags.Enum.value ] !== 'number' ? named( 'Enum' ) : TypeFlags[ +TypeFlags.Enum.value ];
TypeFlags.StringLiteral = wrapped( 'StringLiteral', 1 << 5 );
TypeFlags[ +TypeFlags.StringLiteral.value ] = typeof TypeFlags[ +TypeFlags.StringLiteral.value ] !== 'number' ? named( 'StringLiteral' ) : TypeFlags[ +TypeFlags.StringLiteral.value ];
TypeFlags.NumberLiteral = wrapped( 'NumberLiteral', 1 << 6 );
TypeFlags[ +TypeFlags.NumberLiteral.value ] = typeof TypeFlags[ +TypeFlags.NumberLiteral.value ] !== 'number' ? named( 'NumberLiteral' ) : TypeFlags[ +TypeFlags.NumberLiteral.value ];
TypeFlags.BooleanLiteral = wrapped( 'BooleanLiteral', 1 << 7 );
TypeFlags[ +TypeFlags.BooleanLiteral.value ] = typeof TypeFlags[ +TypeFlags.BooleanLiteral.value ] !== 'number' ? named( 'BooleanLiteral' ) : TypeFlags[ +TypeFlags.BooleanLiteral.value ];
TypeFlags.EnumLiteral = wrapped( 'EnumLiteral', 1 << 8 );
TypeFlags[ +TypeFlags.EnumLiteral.value ] = typeof TypeFlags[ +TypeFlags.EnumLiteral.value ] !== 'number' ? named( 'EnumLiteral' ) : TypeFlags[ +TypeFlags.EnumLiteral.value ];
TypeFlags.ESSymbol = wrapped( 'ESSymbol', 1 << 9 );
TypeFlags[ +TypeFlags.ESSymbol.value ] = typeof TypeFlags[ +TypeFlags.ESSymbol.value ] !== 'number' ? named( 'ESSymbol' ) : TypeFlags[ +TypeFlags.ESSymbol.value ];
TypeFlags.UniqueESSymbol = wrapped( 'UniqueESSymbol', 1 << 10 );
TypeFlags[ +TypeFlags.UniqueESSymbol.value ] = typeof TypeFlags[ +TypeFlags.UniqueESSymbol.value ] !== 'number' ? named( 'UniqueESSymbol' ) : TypeFlags[ +TypeFlags.UniqueESSymbol.value ];
TypeFlags.Void = wrapped( 'Void', 1 << 11 );
TypeFlags[ +TypeFlags.Void.value ] = typeof TypeFlags[ +TypeFlags.Void.value ] !== 'number' ? named( 'Void' ) : TypeFlags[ +TypeFlags.Void.value ];
TypeFlags.Undefined = wrapped( 'Undefined', 1 << 12 );
TypeFlags[ +TypeFlags.Undefined.value ] = typeof TypeFlags[ +TypeFlags.Undefined.value ] !== 'number' ? named( 'Undefined' ) : TypeFlags[ +TypeFlags.Undefined.value ];
TypeFlags.Null = wrapped( 'Null', 1 << 13 );
TypeFlags[ +TypeFlags.Null.value ] = typeof TypeFlags[ +TypeFlags.Null.value ] !== 'number' ? named( 'Null' ) : TypeFlags[ +TypeFlags.Null.value ];
TypeFlags.Never = wrapped( 'Never', 1 << 14 );
TypeFlags[ +TypeFlags.Never.value ] = typeof TypeFlags[ +TypeFlags.Never.value ] !== 'number' ? named( 'Never' ) : TypeFlags[ +TypeFlags.Never.value ];
TypeFlags.TypeParameter = wrapped( 'TypeParameter', 1 << 15 );
TypeFlags[ +TypeFlags.TypeParameter.value ] = typeof TypeFlags[ +TypeFlags.TypeParameter.value ] !== 'number' ? named( 'TypeParameter' ) : TypeFlags[ +TypeFlags.TypeParameter.value ];
TypeFlags.Object = wrapped( 'Object', 1 << 16 );
TypeFlags[ +TypeFlags.Object.value ] = typeof TypeFlags[ +TypeFlags.Object.value ] !== 'number' ? named( 'Object' ) : TypeFlags[ +TypeFlags.Object.value ];
TypeFlags.Union = wrapped( 'Union', 1 << 17 );
TypeFlags[ +TypeFlags.Union.value ] = typeof TypeFlags[ +TypeFlags.Union.value ] !== 'number' ? named( 'Union' ) : TypeFlags[ +TypeFlags.Union.value ];
TypeFlags.Intersection = wrapped( 'Intersection', 1 << 18 );
TypeFlags[ +TypeFlags.Intersection.value ] = typeof TypeFlags[ +TypeFlags.Intersection.value ] !== 'number' ? named( 'Intersection' ) : TypeFlags[ +TypeFlags.Intersection.value ];
TypeFlags.Index = wrapped( 'Index', 1 << 19 );
TypeFlags[ +TypeFlags.Index.value ] = typeof TypeFlags[ +TypeFlags.Index.value ] !== 'number' ? named( 'Index' ) : TypeFlags[ +TypeFlags.Index.value ];
TypeFlags.IndexedAccess = wrapped( 'IndexedAccess', 1 << 20 );
TypeFlags[ +TypeFlags.IndexedAccess.value ] = typeof TypeFlags[ +TypeFlags.IndexedAccess.value ] !== 'number' ? named( 'IndexedAccess' ) : TypeFlags[ +TypeFlags.IndexedAccess.value ];
TypeFlags.Conditional = wrapped( 'Conditional', 1 << 21 );
TypeFlags[ +TypeFlags.Conditional.value ] = typeof TypeFlags[ +TypeFlags.Conditional.value ] !== 'number' ? named( 'Conditional' ) : TypeFlags[ +TypeFlags.Conditional.value ];
TypeFlags.Substitution = wrapped( 'Substitution', 1 << 22 );
TypeFlags[ +TypeFlags.Substitution.value ] = typeof TypeFlags[ +TypeFlags.Substitution.value ] !== 'number' ? named( 'Substitution' ) : TypeFlags[ +TypeFlags.Substitution.value ];
TypeFlags.FreshLiteral = wrapped( 'FreshLiteral', 1 << 23 );
TypeFlags[ +TypeFlags.FreshLiteral.value ] = typeof TypeFlags[ +TypeFlags.FreshLiteral.value ] !== 'number' ? named( 'FreshLiteral' ) : TypeFlags[ +TypeFlags.FreshLiteral.value ];
TypeFlags.ContainsWideningType = wrapped( 'ContainsWideningType', 1 << 24 );
TypeFlags[ +TypeFlags.ContainsWideningType.value ] = typeof TypeFlags[ +TypeFlags.ContainsWideningType.value ] !== 'number' ? named( 'ContainsWideningType' ) : TypeFlags[ +TypeFlags.ContainsWideningType.value ];
TypeFlags.ContainsObjectLiteral = wrapped( 'ContainsObjectLiteral', 1 << 25 );
TypeFlags[ +TypeFlags.ContainsObjectLiteral.value ] = typeof TypeFlags[ +TypeFlags.ContainsObjectLiteral.value ] !== 'number' ? named( 'ContainsObjectLiteral' ) : TypeFlags[ +TypeFlags.ContainsObjectLiteral.value ];
TypeFlags.ContainsAnyFunctionType = wrapped( 'ContainsAnyFunctionType', 1 << 26 );
TypeFlags[ +TypeFlags.ContainsAnyFunctionType.value ] = typeof TypeFlags[ +TypeFlags.ContainsAnyFunctionType.value ] !== 'number' ? named( 'ContainsAnyFunctionType' ) : TypeFlags[ +TypeFlags.ContainsAnyFunctionType.value ];
TypeFlags.NonPrimitive = wrapped( 'NonPrimitive', 1 << 27 );
TypeFlags[ +TypeFlags.NonPrimitive.value ] = typeof TypeFlags[ +TypeFlags.NonPrimitive.value ] !== 'number' ? named( 'NonPrimitive' ) : TypeFlags[ +TypeFlags.NonPrimitive.value ];
TypeFlags.GenericMappedType = wrapped( 'GenericMappedType', 1 << 29 );
TypeFlags[ +TypeFlags.GenericMappedType.value ] = typeof TypeFlags[ +TypeFlags.GenericMappedType.value ] !== 'number' ? named( 'GenericMappedType' ) : TypeFlags[ +TypeFlags.GenericMappedType.value ];
TypeFlags.Nullable = wrapped( 'Nullable', TypeFlags.Undefined | TypeFlags.Null );
TypeFlags[ +TypeFlags.Nullable.value ] = typeof TypeFlags[ +TypeFlags.Nullable.value ] !== 'number' ? named( 'Nullable' ) : TypeFlags[ +TypeFlags.Nullable.value ];
TypeFlags.Literal = wrapped( 'Literal', TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.BooleanLiteral );
TypeFlags[ +TypeFlags.Literal.value ] = typeof TypeFlags[ +TypeFlags.Literal.value ] !== 'number' ? named( 'Literal' ) : TypeFlags[ +TypeFlags.Literal.value ];
TypeFlags.Unit = wrapped( 'Unit', TypeFlags.Literal | TypeFlags.UniqueESSymbol | TypeFlags.Nullable );
TypeFlags[ +TypeFlags.Unit.value ] = typeof TypeFlags[ +TypeFlags.Unit.value ] !== 'number' ? named( 'Unit' ) : TypeFlags[ +TypeFlags.Unit.value ];
TypeFlags.StringOrNumberLiteral = wrapped( 'StringOrNumberLiteral', TypeFlags.StringLiteral | TypeFlags.NumberLiteral );
TypeFlags[ +TypeFlags.StringOrNumberLiteral.value ] = typeof TypeFlags[ +TypeFlags.StringOrNumberLiteral.value ] !== 'number' ? named( 'StringOrNumberLiteral' ) : TypeFlags[ +TypeFlags.StringOrNumberLiteral.value ];
TypeFlags.StringOrNumberLiteralOrUnique = wrapped( 'StringOrNumberLiteralOrUnique', TypeFlags.StringOrNumberLiteral | TypeFlags.UniqueESSymbol );
TypeFlags[ +TypeFlags.StringOrNumberLiteralOrUnique.value ] = typeof TypeFlags[ +TypeFlags.StringOrNumberLiteralOrUnique.value ] !== 'number' ? named( 'StringOrNumberLiteralOrUnique' ) : TypeFlags[ +TypeFlags.StringOrNumberLiteralOrUnique.value ];
TypeFlags.DefinitelyFalsy = wrapped( 'DefinitelyFalsy', TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.BooleanLiteral | TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null );
TypeFlags[ +TypeFlags.DefinitelyFalsy.value ] = typeof TypeFlags[ +TypeFlags.DefinitelyFalsy.value ] !== 'number' ? named( 'DefinitelyFalsy' ) : TypeFlags[ +TypeFlags.DefinitelyFalsy.value ];
TypeFlags.PossiblyFalsy = wrapped( 'PossiblyFalsy', TypeFlags.DefinitelyFalsy | TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean );
TypeFlags[ +TypeFlags.PossiblyFalsy.value ] = typeof TypeFlags[ +TypeFlags.PossiblyFalsy.value ] !== 'number' ? named( 'PossiblyFalsy' ) : TypeFlags[ +TypeFlags.PossiblyFalsy.value ];
TypeFlags.Intrinsic = wrapped( 'Intrinsic', TypeFlags.Any | TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean | TypeFlags.BooleanLiteral | TypeFlags.ESSymbol | TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null | TypeFlags.Never | TypeFlags.NonPrimitive );
TypeFlags[ +TypeFlags.Intrinsic.value ] = typeof TypeFlags[ +TypeFlags.Intrinsic.value ] !== 'number' ? named( 'Intrinsic' ) : TypeFlags[ +TypeFlags.Intrinsic.value ];
TypeFlags.Primitive = wrapped( 'Primitive', TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean | TypeFlags.Enum | TypeFlags.EnumLiteral | TypeFlags.ESSymbol | TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null | TypeFlags.Literal | TypeFlags.UniqueESSymbol );
TypeFlags[ +TypeFlags.Primitive.value ] = typeof TypeFlags[ +TypeFlags.Primitive.value ] !== 'number' ? named( 'Primitive' ) : TypeFlags[ +TypeFlags.Primitive.value ];
TypeFlags.StringLike = wrapped( 'StringLike', TypeFlags.String | TypeFlags.StringLiteral | TypeFlags.Index );
TypeFlags[ +TypeFlags.StringLike.value ] = typeof TypeFlags[ +TypeFlags.StringLike.value ] !== 'number' ? named( 'StringLike' ) : TypeFlags[ +TypeFlags.StringLike.value ];
TypeFlags.NumberLike = wrapped( 'NumberLike', TypeFlags.Number | TypeFlags.NumberLiteral | TypeFlags.Enum );
TypeFlags[ +TypeFlags.NumberLike.value ] = typeof TypeFlags[ +TypeFlags.NumberLike.value ] !== 'number' ? named( 'NumberLike' ) : TypeFlags[ +TypeFlags.NumberLike.value ];
TypeFlags.BooleanLike = wrapped( 'BooleanLike', TypeFlags.Boolean | TypeFlags.BooleanLiteral );
TypeFlags[ +TypeFlags.BooleanLike.value ] = typeof TypeFlags[ +TypeFlags.BooleanLike.value ] !== 'number' ? named( 'BooleanLike' ) : TypeFlags[ +TypeFlags.BooleanLike.value ];
TypeFlags.EnumLike = wrapped( 'EnumLike', TypeFlags.Enum | TypeFlags.EnumLiteral );
TypeFlags[ +TypeFlags.EnumLike.value ] = typeof TypeFlags[ +TypeFlags.EnumLike.value ] !== 'number' ? named( 'EnumLike' ) : TypeFlags[ +TypeFlags.EnumLike.value ];
TypeFlags.ESSymbolLike = wrapped( 'ESSymbolLike', TypeFlags.ESSymbol | TypeFlags.UniqueESSymbol );
TypeFlags[ +TypeFlags.ESSymbolLike.value ] = typeof TypeFlags[ +TypeFlags.ESSymbolLike.value ] !== 'number' ? named( 'ESSymbolLike' ) : TypeFlags[ +TypeFlags.ESSymbolLike.value ];
TypeFlags.UnionOrIntersection = wrapped( 'UnionOrIntersection', TypeFlags.Union | TypeFlags.Intersection );
TypeFlags[ +TypeFlags.UnionOrIntersection.value ] = typeof TypeFlags[ +TypeFlags.UnionOrIntersection.value ] !== 'number' ? named( 'UnionOrIntersection' ) : TypeFlags[ +TypeFlags.UnionOrIntersection.value ];
TypeFlags.StructuredType = wrapped( 'StructuredType', TypeFlags.Object | TypeFlags.Union | TypeFlags.Intersection );
TypeFlags[ +TypeFlags.StructuredType.value ] = typeof TypeFlags[ +TypeFlags.StructuredType.value ] !== 'number' ? named( 'StructuredType' ) : TypeFlags[ +TypeFlags.StructuredType.value ];
TypeFlags.TypeVariable = wrapped( 'TypeVariable', TypeFlags.TypeParameter | TypeFlags.IndexedAccess );
TypeFlags[ +TypeFlags.TypeVariable.value ] = typeof TypeFlags[ +TypeFlags.TypeVariable.value ] !== 'number' ? named( 'TypeVariable' ) : TypeFlags[ +TypeFlags.TypeVariable.value ];
TypeFlags.InstantiableNonPrimitive = wrapped( 'InstantiableNonPrimitive', TypeFlags.TypeVariable | TypeFlags.Conditional | TypeFlags.Substitution );
TypeFlags[ +TypeFlags.InstantiableNonPrimitive.value ] = typeof TypeFlags[ +TypeFlags.InstantiableNonPrimitive.value ] !== 'number' ? named( 'InstantiableNonPrimitive' ) : TypeFlags[ +TypeFlags.InstantiableNonPrimitive.value ];
TypeFlags.InstantiablePrimitive = wrapped( 'InstantiablePrimitive', +TypeFlags.Index );
TypeFlags[ +TypeFlags.InstantiablePrimitive.value ] = typeof TypeFlags[ +TypeFlags.InstantiablePrimitive.value ] !== 'number' ? named( 'InstantiablePrimitive' ) : TypeFlags[ +TypeFlags.InstantiablePrimitive.value ];
TypeFlags.Instantiable = wrapped( 'Instantiable', TypeFlags.InstantiableNonPrimitive | TypeFlags.InstantiablePrimitive );
TypeFlags[ +TypeFlags.Instantiable.value ] = typeof TypeFlags[ +TypeFlags.Instantiable.value ] !== 'number' ? named( 'Instantiable' ) : TypeFlags[ +TypeFlags.Instantiable.value ];
TypeFlags.StructuredOrInstantiable = wrapped( 'StructuredOrInstantiable', TypeFlags.StructuredType | TypeFlags.Instantiable );
TypeFlags[ +TypeFlags.StructuredOrInstantiable.value ] = typeof TypeFlags[ +TypeFlags.StructuredOrInstantiable.value ] !== 'number' ? named( 'StructuredOrInstantiable' ) : TypeFlags[ +TypeFlags.StructuredOrInstantiable.value ];
TypeFlags.Narrowable = wrapped( 'Narrowable', TypeFlags.Any | TypeFlags.StructuredOrInstantiable | TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.BooleanLike | TypeFlags.ESSymbol | TypeFlags.UniqueESSymbol | TypeFlags.NonPrimitive );
TypeFlags[ +TypeFlags.Narrowable.value ] = typeof TypeFlags[ +TypeFlags.Narrowable.value ] !== 'number' ? named( 'Narrowable' ) : TypeFlags[ +TypeFlags.Narrowable.value ];
TypeFlags.NotUnionOrUnit = wrapped( 'NotUnionOrUnit', TypeFlags.Any | TypeFlags.ESSymbol | TypeFlags.Object | TypeFlags.NonPrimitive );
TypeFlags[ +TypeFlags.NotUnionOrUnit.value ] = typeof TypeFlags[ +TypeFlags.NotUnionOrUnit.value ] !== 'number' ? named( 'NotUnionOrUnit' ) : TypeFlags[ +TypeFlags.NotUnionOrUnit.value ];
TypeFlags.RequiresWidening = wrapped( 'RequiresWidening', TypeFlags.ContainsWideningType | TypeFlags.ContainsObjectLiteral );
TypeFlags[ +TypeFlags.RequiresWidening.value ] = typeof TypeFlags[ +TypeFlags.RequiresWidening.value ] !== 'number' ? named( 'RequiresWidening' ) : TypeFlags[ +TypeFlags.RequiresWidening.value ];
TypeFlags.PropagatingFlags = wrapped( 'PropagatingFlags', TypeFlags.ContainsWideningType | TypeFlags.ContainsObjectLiteral | TypeFlags.ContainsAnyFunctionType );
TypeFlags[ +TypeFlags.PropagatingFlags.value ] = typeof TypeFlags[ +TypeFlags.PropagatingFlags.value ] !== 'number' ? named( 'PropagatingFlags' ) : TypeFlags[ +TypeFlags.PropagatingFlags.value ];

TypeFlags = Object.create( tmp = templ(), TypeFlags );
tmp.asString = asString( TypeFlags );

/** *********************************************************************************************************************
 * @enum
 * @name ObjectFlags
 ************************************************************************************************************************/
let ObjectFlags = {};
ObjectFlags.Class = wrapped( 'Class', 1 << 0 );
ObjectFlags[ +ObjectFlags.Class.value ] = typeof ObjectFlags[ +ObjectFlags.Class.value ] !== 'number' ? named( 'Class' ) : ObjectFlags[ +ObjectFlags.Class.value ];
ObjectFlags.Interface = wrapped( 'Interface', 1 << 1 );
ObjectFlags[ +ObjectFlags.Interface.value ] = typeof ObjectFlags[ +ObjectFlags.Interface.value ] !== 'number' ? named( 'Interface' ) : ObjectFlags[ +ObjectFlags.Interface.value ];
ObjectFlags.Reference = wrapped( 'Reference', 1 << 2 );
ObjectFlags[ +ObjectFlags.Reference.value ] = typeof ObjectFlags[ +ObjectFlags.Reference.value ] !== 'number' ? named( 'Reference' ) : ObjectFlags[ +ObjectFlags.Reference.value ];
ObjectFlags.Tuple = wrapped( 'Tuple', 1 << 3 );
ObjectFlags[ +ObjectFlags.Tuple.value ] = typeof ObjectFlags[ +ObjectFlags.Tuple.value ] !== 'number' ? named( 'Tuple' ) : ObjectFlags[ +ObjectFlags.Tuple.value ];
ObjectFlags.Anonymous = wrapped( 'Anonymous', 1 << 4 );
ObjectFlags[ +ObjectFlags.Anonymous.value ] = typeof ObjectFlags[ +ObjectFlags.Anonymous.value ] !== 'number' ? named( 'Anonymous' ) : ObjectFlags[ +ObjectFlags.Anonymous.value ];
ObjectFlags.Mapped = wrapped( 'Mapped', 1 << 5 );
ObjectFlags[ +ObjectFlags.Mapped.value ] = typeof ObjectFlags[ +ObjectFlags.Mapped.value ] !== 'number' ? named( 'Mapped' ) : ObjectFlags[ +ObjectFlags.Mapped.value ];
ObjectFlags.Instantiated = wrapped( 'Instantiated', 1 << 6 );
ObjectFlags[ +ObjectFlags.Instantiated.value ] = typeof ObjectFlags[ +ObjectFlags.Instantiated.value ] !== 'number' ? named( 'Instantiated' ) : ObjectFlags[ +ObjectFlags.Instantiated.value ];
ObjectFlags.ObjectLiteral = wrapped( 'ObjectLiteral', 1 << 7 );
ObjectFlags[ +ObjectFlags.ObjectLiteral.value ] = typeof ObjectFlags[ +ObjectFlags.ObjectLiteral.value ] !== 'number' ? named( 'ObjectLiteral' ) : ObjectFlags[ +ObjectFlags.ObjectLiteral.value ];
ObjectFlags.EvolvingArray = wrapped( 'EvolvingArray', 1 << 8 );
ObjectFlags[ +ObjectFlags.EvolvingArray.value ] = typeof ObjectFlags[ +ObjectFlags.EvolvingArray.value ] !== 'number' ? named( 'EvolvingArray' ) : ObjectFlags[ +ObjectFlags.EvolvingArray.value ];
ObjectFlags.ObjectLiteralPatternWithComputedProperties = wrapped( 'ObjectLiteralPatternWithComputedProperties', 1 << 9 );
ObjectFlags[ +ObjectFlags.ObjectLiteralPatternWithComputedProperties.value ] = typeof ObjectFlags[ +ObjectFlags.ObjectLiteralPatternWithComputedProperties.value ] !== 'number' ? named( 'ObjectLiteralPatternWithComputedProperties' ) : ObjectFlags[ +ObjectFlags.ObjectLiteralPatternWithComputedProperties.value ];
ObjectFlags.ContainsSpread = wrapped( 'ContainsSpread', 1 << 10 );
ObjectFlags[ +ObjectFlags.ContainsSpread.value ] = typeof ObjectFlags[ +ObjectFlags.ContainsSpread.value ] !== 'number' ? named( 'ContainsSpread' ) : ObjectFlags[ +ObjectFlags.ContainsSpread.value ];
ObjectFlags.ReverseMapped = wrapped( 'ReverseMapped', 1 << 11 );
ObjectFlags[ +ObjectFlags.ReverseMapped.value ] = typeof ObjectFlags[ +ObjectFlags.ReverseMapped.value ] !== 'number' ? named( 'ReverseMapped' ) : ObjectFlags[ +ObjectFlags.ReverseMapped.value ];
ObjectFlags.JsxAttributes = wrapped( 'JsxAttributes', 1 << 12 );
ObjectFlags[ +ObjectFlags.JsxAttributes.value ] = typeof ObjectFlags[ +ObjectFlags.JsxAttributes.value ] !== 'number' ? named( 'JsxAttributes' ) : ObjectFlags[ +ObjectFlags.JsxAttributes.value ];
ObjectFlags.MarkerType = wrapped( 'MarkerType', 1 << 13 );
ObjectFlags[ +ObjectFlags.MarkerType.value ] = typeof ObjectFlags[ +ObjectFlags.MarkerType.value ] !== 'number' ? named( 'MarkerType' ) : ObjectFlags[ +ObjectFlags.MarkerType.value ];
ObjectFlags.ClassOrInterface = wrapped( 'ClassOrInterface', ObjectFlags.Class | ObjectFlags.Interface );
ObjectFlags[ +ObjectFlags.ClassOrInterface.value ] = typeof ObjectFlags[ +ObjectFlags.ClassOrInterface.value ] !== 'number' ? named( 'ClassOrInterface' ) : ObjectFlags[ +ObjectFlags.ClassOrInterface.value ];

ObjectFlags = Object.create( tmp = templ(), ObjectFlags );
tmp.asString = asString( ObjectFlags );

/** *********************************************************************************************************************
 * @enum
 * @name Variance
 ************************************************************************************************************************/
let Variance = {};
Variance.Invariant = wrapped( 'Invariant', 0 );
Variance[ +Variance.Invariant.value ] = typeof Variance[ +Variance.Invariant.value ] !== 'number' ? named( 'Invariant' ) : Variance[ +Variance.Invariant.value ];
Variance.Covariant = wrapped( 'Covariant', 1 );
Variance[ +Variance.Covariant.value ] = typeof Variance[ +Variance.Covariant.value ] !== 'number' ? named( 'Covariant' ) : Variance[ +Variance.Covariant.value ];
Variance.Contravariant = wrapped( 'Contravariant', 2 );
Variance[ +Variance.Contravariant.value ] = typeof Variance[ +Variance.Contravariant.value ] !== 'number' ? named( 'Contravariant' ) : Variance[ +Variance.Contravariant.value ];
Variance.Bivariant = wrapped( 'Bivariant', 3 );
Variance[ +Variance.Bivariant.value ] = typeof Variance[ +Variance.Bivariant.value ] !== 'number' ? named( 'Bivariant' ) : Variance[ +Variance.Bivariant.value ];
Variance.Independent = wrapped( 'Independent', 4 );
Variance[ +Variance.Independent.value ] = typeof Variance[ +Variance.Independent.value ] !== 'number' ? named( 'Independent' ) : Variance[ +Variance.Independent.value ];

Variance = Object.create( tmp = templ(), Variance );
tmp.asString = asString( Variance );

/** *********************************************************************************************************************
 * @enum
 * @name SignatureKind
 ************************************************************************************************************************/
let SignatureKind = {};
SignatureKind.Call = wrapped( 'Call', 1 );
SignatureKind[ +SignatureKind.Call.value ] = typeof SignatureKind[ +SignatureKind.Call.value ] !== 'number' ? named( 'Call' ) : SignatureKind[ +SignatureKind.Call.value ];
SignatureKind.Construct = wrapped( 'Construct', 2 );
SignatureKind[ +SignatureKind.Construct.value ] = typeof SignatureKind[ +SignatureKind.Construct.value ] !== 'number' ? named( 'Construct' ) : SignatureKind[ +SignatureKind.Construct.value ];

SignatureKind = Object.create( tmp = templ(), SignatureKind );
tmp.asString = asString( SignatureKind );

/** *********************************************************************************************************************
 * @enum
 * @name IndexKind
 ************************************************************************************************************************/
let IndexKind = {};
IndexKind.String = wrapped( 'String', 1 );
IndexKind[ +IndexKind.String.value ] = typeof IndexKind[ +IndexKind.String.value ] !== 'number' ? named( 'String' ) : IndexKind[ +IndexKind.String.value ];
IndexKind.Number = wrapped( 'Number', 2 );
IndexKind[ +IndexKind.Number.value ] = typeof IndexKind[ +IndexKind.Number.value ] !== 'number' ? named( 'Number' ) : IndexKind[ +IndexKind.Number.value ];

IndexKind = Object.create( tmp = templ(), IndexKind );
tmp.asString = asString( IndexKind );

/** *********************************************************************************************************************
 * @enum
 * @name InferencePriority
 ************************************************************************************************************************/
let InferencePriority = {};
InferencePriority.NakedTypeVariable = wrapped( 'NakedTypeVariable', 1 << 0 );
InferencePriority[ +InferencePriority.NakedTypeVariable.value ] = typeof InferencePriority[ +InferencePriority.NakedTypeVariable.value ] !== 'number' ? named( 'NakedTypeVariable' ) : InferencePriority[ +InferencePriority.NakedTypeVariable.value ];
InferencePriority.HomomorphicMappedType = wrapped( 'HomomorphicMappedType', 1 << 1 );
InferencePriority[ +InferencePriority.HomomorphicMappedType.value ] = typeof InferencePriority[ +InferencePriority.HomomorphicMappedType.value ] !== 'number' ? named( 'HomomorphicMappedType' ) : InferencePriority[ +InferencePriority.HomomorphicMappedType.value ];
InferencePriority.MappedTypeConstraint = wrapped( 'MappedTypeConstraint', 1 << 2 );
InferencePriority[ +InferencePriority.MappedTypeConstraint.value ] = typeof InferencePriority[ +InferencePriority.MappedTypeConstraint.value ] !== 'number' ? named( 'MappedTypeConstraint' ) : InferencePriority[ +InferencePriority.MappedTypeConstraint.value ];
InferencePriority.ReturnType = wrapped( 'ReturnType', 1 << 3 );
InferencePriority[ +InferencePriority.ReturnType.value ] = typeof InferencePriority[ +InferencePriority.ReturnType.value ] !== 'number' ? named( 'ReturnType' ) : InferencePriority[ +InferencePriority.ReturnType.value ];
InferencePriority.NoConstraints = wrapped( 'NoConstraints', 1 << 4 );
InferencePriority[ +InferencePriority.NoConstraints.value ] = typeof InferencePriority[ +InferencePriority.NoConstraints.value ] !== 'number' ? named( 'NoConstraints' ) : InferencePriority[ +InferencePriority.NoConstraints.value ];
InferencePriority.AlwaysStrict = wrapped( 'AlwaysStrict', 1 << 5 );
InferencePriority[ +InferencePriority.AlwaysStrict.value ] = typeof InferencePriority[ +InferencePriority.AlwaysStrict.value ] !== 'number' ? named( 'AlwaysStrict' ) : InferencePriority[ +InferencePriority.AlwaysStrict.value ];
InferencePriority.PriorityImpliesUnion = wrapped( 'PriorityImpliesUnion', InferencePriority.ReturnType | InferencePriority.MappedTypeConstraint );
InferencePriority[ +InferencePriority.PriorityImpliesUnion.value ] = typeof InferencePriority[ +InferencePriority.PriorityImpliesUnion.value ] !== 'number' ? named( 'PriorityImpliesUnion' ) : InferencePriority[ +InferencePriority.PriorityImpliesUnion.value ];

InferencePriority = Object.create( tmp = templ(), InferencePriority );
tmp.asString = asString( InferencePriority );

/** *********************************************************************************************************************
 * @enum
 * @name InferenceFlags
 ************************************************************************************************************************/
let InferenceFlags = {};
InferenceFlags.None = wrapped( 'None', 0 );
InferenceFlags[ +InferenceFlags.None.value ] = typeof InferenceFlags[ +InferenceFlags.None.value ] !== 'number' ? named( 'None' ) : InferenceFlags[ +InferenceFlags.None.value ];
InferenceFlags.InferUnionTypes = wrapped( 'InferUnionTypes', 1 << 0 );
InferenceFlags[ +InferenceFlags.InferUnionTypes.value ] = typeof InferenceFlags[ +InferenceFlags.InferUnionTypes.value ] !== 'number' ? named( 'InferUnionTypes' ) : InferenceFlags[ +InferenceFlags.InferUnionTypes.value ];
InferenceFlags.NoDefault = wrapped( 'NoDefault', 1 << 1 );
InferenceFlags[ +InferenceFlags.NoDefault.value ] = typeof InferenceFlags[ +InferenceFlags.NoDefault.value ] !== 'number' ? named( 'NoDefault' ) : InferenceFlags[ +InferenceFlags.NoDefault.value ];
InferenceFlags.AnyDefault = wrapped( 'AnyDefault', 1 << 2 );
InferenceFlags[ +InferenceFlags.AnyDefault.value ] = typeof InferenceFlags[ +InferenceFlags.AnyDefault.value ] !== 'number' ? named( 'AnyDefault' ) : InferenceFlags[ +InferenceFlags.AnyDefault.value ];

InferenceFlags = Object.create( tmp = templ(), InferenceFlags );
tmp.asString = asString( InferenceFlags );

/** *********************************************************************************************************************
 * @enum
 * @name Ternary
 ************************************************************************************************************************/
let Ternary = {};
Ternary.False = wrapped( 'False', 0 );
Ternary[ +Ternary.False.value ] = typeof Ternary[ +Ternary.False.value ] !== 'number' ? named( 'False' ) : Ternary[ +Ternary.False.value ];
Ternary.Maybe = wrapped( 'Maybe', 1 );
Ternary[ +Ternary.Maybe.value ] = typeof Ternary[ +Ternary.Maybe.value ] !== 'number' ? named( 'Maybe' ) : Ternary[ +Ternary.Maybe.value ];
Ternary.True = wrapped( 'True', -1 );
Ternary[ +Ternary.True.value ] = typeof Ternary[ +Ternary.True.value ] !== 'number' ? named( 'True' ) : Ternary[ +Ternary.True.value ];

Ternary = Object.create( tmp = templ(), Ternary );
tmp.asString = asString( Ternary );

/** *********************************************************************************************************************
 * @enum
 * @name SpecialPropertyAssignmentKind
 ************************************************************************************************************************/
let SpecialPropertyAssignmentKind = {};
SpecialPropertyAssignmentKind.None = wrapped( 'None', 1 );
SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.None.value ] = typeof SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.None.value ] !== 'number' ? named( 'None' ) : SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.None.value ];
SpecialPropertyAssignmentKind.ExportsProperty = wrapped( 'ExportsProperty', 2 );
SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.ExportsProperty.value ] = typeof SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.ExportsProperty.value ] !== 'number' ? named( 'ExportsProperty' ) : SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.ExportsProperty.value ];
SpecialPropertyAssignmentKind.ModuleExports = wrapped( 'ModuleExports', 3 );
SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.ModuleExports.value ] = typeof SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.ModuleExports.value ] !== 'number' ? named( 'ModuleExports' ) : SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.ModuleExports.value ];
SpecialPropertyAssignmentKind.PrototypeProperty = wrapped( 'PrototypeProperty', 4 );
SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.PrototypeProperty.value ] = typeof SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.PrototypeProperty.value ] !== 'number' ? named( 'PrototypeProperty' ) : SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.PrototypeProperty.value ];
SpecialPropertyAssignmentKind.ThisProperty = wrapped( 'ThisProperty', 5 );
SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.ThisProperty.value ] = typeof SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.ThisProperty.value ] !== 'number' ? named( 'ThisProperty' ) : SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.ThisProperty.value ];
SpecialPropertyAssignmentKind.Property = wrapped( 'Property', 6 );
SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.Property.value ] = typeof SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.Property.value ] !== 'number' ? named( 'Property' ) : SpecialPropertyAssignmentKind[ +SpecialPropertyAssignmentKind.Property.value ];

SpecialPropertyAssignmentKind = Object.create( tmp = templ(), SpecialPropertyAssignmentKind );
tmp.asString = asString( SpecialPropertyAssignmentKind );

/** *********************************************************************************************************************
 * @enum
 * @name JsxEmit
 ************************************************************************************************************************/
let JsxEmit = {};
JsxEmit.None = wrapped( 'None', 0 );
JsxEmit[ +JsxEmit.None.value ] = typeof JsxEmit[ +JsxEmit.None.value ] !== 'number' ? named( 'None' ) : JsxEmit[ +JsxEmit.None.value ];
JsxEmit.Preserve = wrapped( 'Preserve', 1 );
JsxEmit[ +JsxEmit.Preserve.value ] = typeof JsxEmit[ +JsxEmit.Preserve.value ] !== 'number' ? named( 'Preserve' ) : JsxEmit[ +JsxEmit.Preserve.value ];
JsxEmit.React = wrapped( 'React', 2 );
JsxEmit[ +JsxEmit.React.value ] = typeof JsxEmit[ +JsxEmit.React.value ] !== 'number' ? named( 'React' ) : JsxEmit[ +JsxEmit.React.value ];
JsxEmit.ReactNative = wrapped( 'ReactNative', 3 );
JsxEmit[ +JsxEmit.ReactNative.value ] = typeof JsxEmit[ +JsxEmit.ReactNative.value ] !== 'number' ? named( 'ReactNative' ) : JsxEmit[ +JsxEmit.ReactNative.value ];

JsxEmit = Object.create( tmp = templ(), JsxEmit );
tmp.asString = asString( JsxEmit );

/** *********************************************************************************************************************
 * @enum
 * @name NewLineKind
 ************************************************************************************************************************/
let NewLineKind = {};
NewLineKind.CarriageReturnLineFeed = wrapped( 'CarriageReturnLineFeed', 0 );
NewLineKind[ +NewLineKind.CarriageReturnLineFeed.value ] = typeof NewLineKind[ +NewLineKind.CarriageReturnLineFeed.value ] !== 'number' ? named( 'CarriageReturnLineFeed' ) : NewLineKind[ +NewLineKind.CarriageReturnLineFeed.value ];
NewLineKind.LineFeed = wrapped( 'LineFeed', 1 );
NewLineKind[ +NewLineKind.LineFeed.value ] = typeof NewLineKind[ +NewLineKind.LineFeed.value ] !== 'number' ? named( 'LineFeed' ) : NewLineKind[ +NewLineKind.LineFeed.value ];

NewLineKind = Object.create( tmp = templ(), NewLineKind );
tmp.asString = asString( NewLineKind );

/** *********************************************************************************************************************
 * @enum
 * @name ScriptKind
 ************************************************************************************************************************/
let ScriptKind = {};
ScriptKind.Unknown = wrapped( 'Unknown', 0 );
ScriptKind[ +ScriptKind.Unknown.value ] = typeof ScriptKind[ +ScriptKind.Unknown.value ] !== 'number' ? named( 'Unknown' ) : ScriptKind[ +ScriptKind.Unknown.value ];
ScriptKind.JS = wrapped( 'JS', 1 );
ScriptKind[ +ScriptKind.JS.value ] = typeof ScriptKind[ +ScriptKind.JS.value ] !== 'number' ? named( 'JS' ) : ScriptKind[ +ScriptKind.JS.value ];
ScriptKind.JSX = wrapped( 'JSX', 2 );
ScriptKind[ +ScriptKind.JSX.value ] = typeof ScriptKind[ +ScriptKind.JSX.value ] !== 'number' ? named( 'JSX' ) : ScriptKind[ +ScriptKind.JSX.value ];
ScriptKind.TS = wrapped( 'TS', 3 );
ScriptKind[ +ScriptKind.TS.value ] = typeof ScriptKind[ +ScriptKind.TS.value ] !== 'number' ? named( 'TS' ) : ScriptKind[ +ScriptKind.TS.value ];
ScriptKind.TSX = wrapped( 'TSX', 4 );
ScriptKind[ +ScriptKind.TSX.value ] = typeof ScriptKind[ +ScriptKind.TSX.value ] !== 'number' ? named( 'TSX' ) : ScriptKind[ +ScriptKind.TSX.value ];
ScriptKind.External = wrapped( 'External', 5 );
ScriptKind[ +ScriptKind.External.value ] = typeof ScriptKind[ +ScriptKind.External.value ] !== 'number' ? named( 'External' ) : ScriptKind[ +ScriptKind.External.value ];
ScriptKind.JSON = wrapped( 'JSON', 6 );
ScriptKind[ +ScriptKind.JSON.value ] = typeof ScriptKind[ +ScriptKind.JSON.value ] !== 'number' ? named( 'JSON' ) : ScriptKind[ +ScriptKind.JSON.value ];

ScriptKind = Object.create( tmp = templ(), ScriptKind );
tmp.asString = asString( ScriptKind );

/** *********************************************************************************************************************
 * @enum
 * @name ScriptTarget
 ************************************************************************************************************************/
let ScriptTarget = {};
ScriptTarget.ES3 = wrapped( 'ES3', 0 );
ScriptTarget[ +ScriptTarget.ES3.value ] = typeof ScriptTarget[ +ScriptTarget.ES3.value ] !== 'number' ? named( 'ES3' ) : ScriptTarget[ +ScriptTarget.ES3.value ];
ScriptTarget.ES5 = wrapped( 'ES5', 1 );
ScriptTarget[ +ScriptTarget.ES5.value ] = typeof ScriptTarget[ +ScriptTarget.ES5.value ] !== 'number' ? named( 'ES5' ) : ScriptTarget[ +ScriptTarget.ES5.value ];
ScriptTarget.ES2015 = wrapped( 'ES2015', 2 );
ScriptTarget[ +ScriptTarget.ES2015.value ] = typeof ScriptTarget[ +ScriptTarget.ES2015.value ] !== 'number' ? named( 'ES2015' ) : ScriptTarget[ +ScriptTarget.ES2015.value ];
ScriptTarget.ES2016 = wrapped( 'ES2016', 3 );
ScriptTarget[ +ScriptTarget.ES2016.value ] = typeof ScriptTarget[ +ScriptTarget.ES2016.value ] !== 'number' ? named( 'ES2016' ) : ScriptTarget[ +ScriptTarget.ES2016.value ];
ScriptTarget.ES2017 = wrapped( 'ES2017', 4 );
ScriptTarget[ +ScriptTarget.ES2017.value ] = typeof ScriptTarget[ +ScriptTarget.ES2017.value ] !== 'number' ? named( 'ES2017' ) : ScriptTarget[ +ScriptTarget.ES2017.value ];
ScriptTarget.ES2018 = wrapped( 'ES2018', 5 );
ScriptTarget[ +ScriptTarget.ES2018.value ] = typeof ScriptTarget[ +ScriptTarget.ES2018.value ] !== 'number' ? named( 'ES2018' ) : ScriptTarget[ +ScriptTarget.ES2018.value ];
ScriptTarget.ESNext = wrapped( 'ESNext', 6 );
ScriptTarget[ +ScriptTarget.ESNext.value ] = typeof ScriptTarget[ +ScriptTarget.ESNext.value ] !== 'number' ? named( 'ESNext' ) : ScriptTarget[ +ScriptTarget.ESNext.value ];
ScriptTarget.Latest = wrapped( 'Latest', +ScriptTarget.ESNext );
ScriptTarget[ +ScriptTarget.Latest.value ] = typeof ScriptTarget[ +ScriptTarget.Latest.value ] !== 'number' ? named( 'Latest' ) : ScriptTarget[ +ScriptTarget.Latest.value ];

ScriptTarget = Object.create( tmp = templ(), ScriptTarget );
tmp.asString = asString( ScriptTarget );

/** *********************************************************************************************************************
 * @enum
 * @name LanguageVariant
 ************************************************************************************************************************/
let LanguageVariant = {};
LanguageVariant.Standard = wrapped( 'Standard', 1 );
LanguageVariant[ +LanguageVariant.Standard.value ] = typeof LanguageVariant[ +LanguageVariant.Standard.value ] !== 'number' ? named( 'Standard' ) : LanguageVariant[ +LanguageVariant.Standard.value ];
LanguageVariant.JSX = wrapped( 'JSX', 2 );
LanguageVariant[ +LanguageVariant.JSX.value ] = typeof LanguageVariant[ +LanguageVariant.JSX.value ] !== 'number' ? named( 'JSX' ) : LanguageVariant[ +LanguageVariant.JSX.value ];

LanguageVariant = Object.create( tmp = templ(), LanguageVariant );
tmp.asString = asString( LanguageVariant );

/** *********************************************************************************************************************
 * @enum
 * @name DiagnosticStyle
 ************************************************************************************************************************/
let DiagnosticStyle = {};
DiagnosticStyle.Simple = wrapped( 'Simple', 1 );
DiagnosticStyle[ +DiagnosticStyle.Simple.value ] = typeof DiagnosticStyle[ +DiagnosticStyle.Simple.value ] !== 'number' ? named( 'Simple' ) : DiagnosticStyle[ +DiagnosticStyle.Simple.value ];
DiagnosticStyle.Pretty = wrapped( 'Pretty', 2 );
DiagnosticStyle[ +DiagnosticStyle.Pretty.value ] = typeof DiagnosticStyle[ +DiagnosticStyle.Pretty.value ] !== 'number' ? named( 'Pretty' ) : DiagnosticStyle[ +DiagnosticStyle.Pretty.value ];

DiagnosticStyle = Object.create( tmp = templ(), DiagnosticStyle );
tmp.asString = asString( DiagnosticStyle );

/** *********************************************************************************************************************
 * @enum
 * @name WatchDirectoryFlags
 ************************************************************************************************************************/
let WatchDirectoryFlags = {};
WatchDirectoryFlags.None = wrapped( 'None', 0 );
WatchDirectoryFlags[ +WatchDirectoryFlags.None.value ] = typeof WatchDirectoryFlags[ +WatchDirectoryFlags.None.value ] !== 'number' ? named( 'None' ) : WatchDirectoryFlags[ +WatchDirectoryFlags.None.value ];
WatchDirectoryFlags.Recursive = wrapped( 'Recursive', 1 << 0 );
WatchDirectoryFlags[ +WatchDirectoryFlags.Recursive.value ] = typeof WatchDirectoryFlags[ +WatchDirectoryFlags.Recursive.value ] !== 'number' ? named( 'Recursive' ) : WatchDirectoryFlags[ +WatchDirectoryFlags.Recursive.value ];

WatchDirectoryFlags = Object.create( tmp = templ(), WatchDirectoryFlags );
tmp.asString = asString( WatchDirectoryFlags );

/** *********************************************************************************************************************
 * @enum
 * @name Extension
 ************************************************************************************************************************/
let Extension = {};
Extension.Ts = wrapped( 'Ts', ".ts" );
Extension[ +Extension.Ts.value ] = typeof Extension[ +Extension.Ts.value ] !== 'number' ? named( 'Ts' ) : Extension[ +Extension.Ts.value ];
Extension.Tsx = wrapped( 'Tsx', ".tsx" );
Extension[ +Extension.Tsx.value ] = typeof Extension[ +Extension.Tsx.value ] !== 'number' ? named( 'Tsx' ) : Extension[ +Extension.Tsx.value ];
Extension.Dts = wrapped( 'Dts', ".d.ts" );
Extension[ +Extension.Dts.value ] = typeof Extension[ +Extension.Dts.value ] !== 'number' ? named( 'Dts' ) : Extension[ +Extension.Dts.value ];
Extension.Js = wrapped( 'Js', ".js" );
Extension[ +Extension.Js.value ] = typeof Extension[ +Extension.Js.value ] !== 'number' ? named( 'Js' ) : Extension[ +Extension.Js.value ];
Extension.Jsx = wrapped( 'Jsx', ".jsx" );
Extension[ +Extension.Jsx.value ] = typeof Extension[ +Extension.Jsx.value ] !== 'number' ? named( 'Jsx' ) : Extension[ +Extension.Jsx.value ];
Extension.Json = wrapped( 'Json', ".json" );
Extension[ +Extension.Json.value ] = typeof Extension[ +Extension.Json.value ] !== 'number' ? named( 'Json' ) : Extension[ +Extension.Json.value ];

Extension = Object.create( tmp = templ(), Extension );
tmp.asString = asString( Extension );

/** *********************************************************************************************************************
 * @enum
 * @name TransformFlags
 ************************************************************************************************************************/
let TransformFlags = {};
TransformFlags.None = wrapped( 'None', 0 );
TransformFlags[ +TransformFlags.None.value ] = typeof TransformFlags[ +TransformFlags.None.value ] !== 'number' ? named( 'None' ) : TransformFlags[ +TransformFlags.None.value ];
TransformFlags.TypeScript = wrapped( 'TypeScript', 1 << 0 );
TransformFlags[ +TransformFlags.TypeScript.value ] = typeof TransformFlags[ +TransformFlags.TypeScript.value ] !== 'number' ? named( 'TypeScript' ) : TransformFlags[ +TransformFlags.TypeScript.value ];
TransformFlags.ContainsTypeScript = wrapped( 'ContainsTypeScript', 1 << 1 );
TransformFlags[ +TransformFlags.ContainsTypeScript.value ] = typeof TransformFlags[ +TransformFlags.ContainsTypeScript.value ] !== 'number' ? named( 'ContainsTypeScript' ) : TransformFlags[ +TransformFlags.ContainsTypeScript.value ];
TransformFlags.ContainsJsx = wrapped( 'ContainsJsx', 1 << 2 );
TransformFlags[ +TransformFlags.ContainsJsx.value ] = typeof TransformFlags[ +TransformFlags.ContainsJsx.value ] !== 'number' ? named( 'ContainsJsx' ) : TransformFlags[ +TransformFlags.ContainsJsx.value ];
TransformFlags.ContainsESNext = wrapped( 'ContainsESNext', 1 << 3 );
TransformFlags[ +TransformFlags.ContainsESNext.value ] = typeof TransformFlags[ +TransformFlags.ContainsESNext.value ] !== 'number' ? named( 'ContainsESNext' ) : TransformFlags[ +TransformFlags.ContainsESNext.value ];
TransformFlags.ContainsES2017 = wrapped( 'ContainsES2017', 1 << 4 );
TransformFlags[ +TransformFlags.ContainsES2017.value ] = typeof TransformFlags[ +TransformFlags.ContainsES2017.value ] !== 'number' ? named( 'ContainsES2017' ) : TransformFlags[ +TransformFlags.ContainsES2017.value ];
TransformFlags.ContainsES2016 = wrapped( 'ContainsES2016', 1 << 5 );
TransformFlags[ +TransformFlags.ContainsES2016.value ] = typeof TransformFlags[ +TransformFlags.ContainsES2016.value ] !== 'number' ? named( 'ContainsES2016' ) : TransformFlags[ +TransformFlags.ContainsES2016.value ];
TransformFlags.ES2015 = wrapped( 'ES2015', 1 << 6 );
TransformFlags[ +TransformFlags.ES2015.value ] = typeof TransformFlags[ +TransformFlags.ES2015.value ] !== 'number' ? named( 'ES2015' ) : TransformFlags[ +TransformFlags.ES2015.value ];
TransformFlags.ContainsES2015 = wrapped( 'ContainsES2015', 1 << 7 );
TransformFlags[ +TransformFlags.ContainsES2015.value ] = typeof TransformFlags[ +TransformFlags.ContainsES2015.value ] !== 'number' ? named( 'ContainsES2015' ) : TransformFlags[ +TransformFlags.ContainsES2015.value ];
TransformFlags.Generator = wrapped( 'Generator', 1 << 8 );
TransformFlags[ +TransformFlags.Generator.value ] = typeof TransformFlags[ +TransformFlags.Generator.value ] !== 'number' ? named( 'Generator' ) : TransformFlags[ +TransformFlags.Generator.value ];
TransformFlags.ContainsGenerator = wrapped( 'ContainsGenerator', 1 << 9 );
TransformFlags[ +TransformFlags.ContainsGenerator.value ] = typeof TransformFlags[ +TransformFlags.ContainsGenerator.value ] !== 'number' ? named( 'ContainsGenerator' ) : TransformFlags[ +TransformFlags.ContainsGenerator.value ];
TransformFlags.DestructuringAssignment = wrapped( 'DestructuringAssignment', 1 << 10 );
TransformFlags[ +TransformFlags.DestructuringAssignment.value ] = typeof TransformFlags[ +TransformFlags.DestructuringAssignment.value ] !== 'number' ? named( 'DestructuringAssignment' ) : TransformFlags[ +TransformFlags.DestructuringAssignment.value ];
TransformFlags.ContainsDestructuringAssignment = wrapped( 'ContainsDestructuringAssignment', 1 << 11 );
TransformFlags[ +TransformFlags.ContainsDestructuringAssignment.value ] = typeof TransformFlags[ +TransformFlags.ContainsDestructuringAssignment.value ] !== 'number' ? named( 'ContainsDestructuringAssignment' ) : TransformFlags[ +TransformFlags.ContainsDestructuringAssignment.value ];
TransformFlags.ContainsDecorators = wrapped( 'ContainsDecorators', 1 << 12 );
TransformFlags[ +TransformFlags.ContainsDecorators.value ] = typeof TransformFlags[ +TransformFlags.ContainsDecorators.value ] !== 'number' ? named( 'ContainsDecorators' ) : TransformFlags[ +TransformFlags.ContainsDecorators.value ];
TransformFlags.ContainsPropertyInitializer = wrapped( 'ContainsPropertyInitializer', 1 << 13 );
TransformFlags[ +TransformFlags.ContainsPropertyInitializer.value ] = typeof TransformFlags[ +TransformFlags.ContainsPropertyInitializer.value ] !== 'number' ? named( 'ContainsPropertyInitializer' ) : TransformFlags[ +TransformFlags.ContainsPropertyInitializer.value ];
TransformFlags.ContainsLexicalThis = wrapped( 'ContainsLexicalThis', 1 << 14 );
TransformFlags[ +TransformFlags.ContainsLexicalThis.value ] = typeof TransformFlags[ +TransformFlags.ContainsLexicalThis.value ] !== 'number' ? named( 'ContainsLexicalThis' ) : TransformFlags[ +TransformFlags.ContainsLexicalThis.value ];
TransformFlags.ContainsCapturedLexicalThis = wrapped( 'ContainsCapturedLexicalThis', 1 << 15 );
TransformFlags[ +TransformFlags.ContainsCapturedLexicalThis.value ] = typeof TransformFlags[ +TransformFlags.ContainsCapturedLexicalThis.value ] !== 'number' ? named( 'ContainsCapturedLexicalThis' ) : TransformFlags[ +TransformFlags.ContainsCapturedLexicalThis.value ];
TransformFlags.ContainsLexicalThisInComputedPropertyName = wrapped( 'ContainsLexicalThisInComputedPropertyName', 1 << 16 );
TransformFlags[ +TransformFlags.ContainsLexicalThisInComputedPropertyName.value ] = typeof TransformFlags[ +TransformFlags.ContainsLexicalThisInComputedPropertyName.value ] !== 'number' ? named( 'ContainsLexicalThisInComputedPropertyName' ) : TransformFlags[ +TransformFlags.ContainsLexicalThisInComputedPropertyName.value ];
TransformFlags.ContainsDefaultValueAssignments = wrapped( 'ContainsDefaultValueAssignments', 1 << 17 );
TransformFlags[ +TransformFlags.ContainsDefaultValueAssignments.value ] = typeof TransformFlags[ +TransformFlags.ContainsDefaultValueAssignments.value ] !== 'number' ? named( 'ContainsDefaultValueAssignments' ) : TransformFlags[ +TransformFlags.ContainsDefaultValueAssignments.value ];
TransformFlags.ContainsParameterPropertyAssignments = wrapped( 'ContainsParameterPropertyAssignments', 1 << 18 );
TransformFlags[ +TransformFlags.ContainsParameterPropertyAssignments.value ] = typeof TransformFlags[ +TransformFlags.ContainsParameterPropertyAssignments.value ] !== 'number' ? named( 'ContainsParameterPropertyAssignments' ) : TransformFlags[ +TransformFlags.ContainsParameterPropertyAssignments.value ];
TransformFlags.ContainsSpread = wrapped( 'ContainsSpread', 1 << 19 );
TransformFlags[ +TransformFlags.ContainsSpread.value ] = typeof TransformFlags[ +TransformFlags.ContainsSpread.value ] !== 'number' ? named( 'ContainsSpread' ) : TransformFlags[ +TransformFlags.ContainsSpread.value ];
TransformFlags.ContainsObjectSpread = wrapped( 'ContainsObjectSpread', 1 << 20 );
TransformFlags[ +TransformFlags.ContainsObjectSpread.value ] = typeof TransformFlags[ +TransformFlags.ContainsObjectSpread.value ] !== 'number' ? named( 'ContainsObjectSpread' ) : TransformFlags[ +TransformFlags.ContainsObjectSpread.value ];
TransformFlags.ContainsRest = wrapped( 'ContainsRest', +TransformFlags.ContainsSpread );
TransformFlags[ +TransformFlags.ContainsRest.value ] = typeof TransformFlags[ +TransformFlags.ContainsRest.value ] !== 'number' ? named( 'ContainsRest' ) : TransformFlags[ +TransformFlags.ContainsRest.value ];
TransformFlags.ContainsObjectRest = wrapped( 'ContainsObjectRest', +TransformFlags.ContainsObjectSpread );
TransformFlags[ +TransformFlags.ContainsObjectRest.value ] = typeof TransformFlags[ +TransformFlags.ContainsObjectRest.value ] !== 'number' ? named( 'ContainsObjectRest' ) : TransformFlags[ +TransformFlags.ContainsObjectRest.value ];
TransformFlags.ContainsComputedPropertyName = wrapped( 'ContainsComputedPropertyName', 1 << 21 );
TransformFlags[ +TransformFlags.ContainsComputedPropertyName.value ] = typeof TransformFlags[ +TransformFlags.ContainsComputedPropertyName.value ] !== 'number' ? named( 'ContainsComputedPropertyName' ) : TransformFlags[ +TransformFlags.ContainsComputedPropertyName.value ];
TransformFlags.ContainsBlockScopedBinding = wrapped( 'ContainsBlockScopedBinding', 1 << 22 );
TransformFlags[ +TransformFlags.ContainsBlockScopedBinding.value ] = typeof TransformFlags[ +TransformFlags.ContainsBlockScopedBinding.value ] !== 'number' ? named( 'ContainsBlockScopedBinding' ) : TransformFlags[ +TransformFlags.ContainsBlockScopedBinding.value ];
TransformFlags.ContainsBindingPattern = wrapped( 'ContainsBindingPattern', 1 << 23 );
TransformFlags[ +TransformFlags.ContainsBindingPattern.value ] = typeof TransformFlags[ +TransformFlags.ContainsBindingPattern.value ] !== 'number' ? named( 'ContainsBindingPattern' ) : TransformFlags[ +TransformFlags.ContainsBindingPattern.value ];
TransformFlags.ContainsYield = wrapped( 'ContainsYield', 1 << 24 );
TransformFlags[ +TransformFlags.ContainsYield.value ] = typeof TransformFlags[ +TransformFlags.ContainsYield.value ] !== 'number' ? named( 'ContainsYield' ) : TransformFlags[ +TransformFlags.ContainsYield.value ];
TransformFlags.ContainsHoistedDeclarationOrCompletion = wrapped( 'ContainsHoistedDeclarationOrCompletion', 1 << 25 );
TransformFlags[ +TransformFlags.ContainsHoistedDeclarationOrCompletion.value ] = typeof TransformFlags[ +TransformFlags.ContainsHoistedDeclarationOrCompletion.value ] !== 'number' ? named( 'ContainsHoistedDeclarationOrCompletion' ) : TransformFlags[ +TransformFlags.ContainsHoistedDeclarationOrCompletion.value ];
TransformFlags.ContainsDynamicImport = wrapped( 'ContainsDynamicImport', 1 << 26 );
TransformFlags[ +TransformFlags.ContainsDynamicImport.value ] = typeof TransformFlags[ +TransformFlags.ContainsDynamicImport.value ] !== 'number' ? named( 'ContainsDynamicImport' ) : TransformFlags[ +TransformFlags.ContainsDynamicImport.value ];
TransformFlags.Super = wrapped( 'Super', 1 << 27 );
TransformFlags[ +TransformFlags.Super.value ] = typeof TransformFlags[ +TransformFlags.Super.value ] !== 'number' ? named( 'Super' ) : TransformFlags[ +TransformFlags.Super.value ];
TransformFlags.ContainsSuper = wrapped( 'ContainsSuper', 1 << 28 );
TransformFlags[ +TransformFlags.ContainsSuper.value ] = typeof TransformFlags[ +TransformFlags.ContainsSuper.value ] !== 'number' ? named( 'ContainsSuper' ) : TransformFlags[ +TransformFlags.ContainsSuper.value ];
TransformFlags.HasComputedFlags = wrapped( 'HasComputedFlags', 1 << 29 );
TransformFlags[ +TransformFlags.HasComputedFlags.value ] = typeof TransformFlags[ +TransformFlags.HasComputedFlags.value ] !== 'number' ? named( 'HasComputedFlags' ) : TransformFlags[ +TransformFlags.HasComputedFlags.value ];
TransformFlags.AssertTypeScript = wrapped( 'AssertTypeScript', TransformFlags.TypeScript | TransformFlags.ContainsTypeScript );
TransformFlags[ +TransformFlags.AssertTypeScript.value ] = typeof TransformFlags[ +TransformFlags.AssertTypeScript.value ] !== 'number' ? named( 'AssertTypeScript' ) : TransformFlags[ +TransformFlags.AssertTypeScript.value ];
TransformFlags.AssertJsx = wrapped( 'AssertJsx', +TransformFlags.ContainsJsx );
TransformFlags[ +TransformFlags.AssertJsx.value ] = typeof TransformFlags[ +TransformFlags.AssertJsx.value ] !== 'number' ? named( 'AssertJsx' ) : TransformFlags[ +TransformFlags.AssertJsx.value ];
TransformFlags.AssertESNext = wrapped( 'AssertESNext', +TransformFlags.ContainsESNext );
TransformFlags[ +TransformFlags.AssertESNext.value ] = typeof TransformFlags[ +TransformFlags.AssertESNext.value ] !== 'number' ? named( 'AssertESNext' ) : TransformFlags[ +TransformFlags.AssertESNext.value ];
TransformFlags.AssertES2017 = wrapped( 'AssertES2017', +TransformFlags.ContainsES2017 );
TransformFlags[ +TransformFlags.AssertES2017.value ] = typeof TransformFlags[ +TransformFlags.AssertES2017.value ] !== 'number' ? named( 'AssertES2017' ) : TransformFlags[ +TransformFlags.AssertES2017.value ];
TransformFlags.AssertES2016 = wrapped( 'AssertES2016', +TransformFlags.ContainsES2016 );
TransformFlags[ +TransformFlags.AssertES2016.value ] = typeof TransformFlags[ +TransformFlags.AssertES2016.value ] !== 'number' ? named( 'AssertES2016' ) : TransformFlags[ +TransformFlags.AssertES2016.value ];
TransformFlags.AssertES2015 = wrapped( 'AssertES2015', TransformFlags.ES2015 | TransformFlags.ContainsES2015 );
TransformFlags[ +TransformFlags.AssertES2015.value ] = typeof TransformFlags[ +TransformFlags.AssertES2015.value ] !== 'number' ? named( 'AssertES2015' ) : TransformFlags[ +TransformFlags.AssertES2015.value ];
TransformFlags.AssertGenerator = wrapped( 'AssertGenerator', TransformFlags.Generator | TransformFlags.ContainsGenerator );
TransformFlags[ +TransformFlags.AssertGenerator.value ] = typeof TransformFlags[ +TransformFlags.AssertGenerator.value ] !== 'number' ? named( 'AssertGenerator' ) : TransformFlags[ +TransformFlags.AssertGenerator.value ];
TransformFlags.AssertDestructuringAssignment = wrapped( 'AssertDestructuringAssignment', TransformFlags.DestructuringAssignment | TransformFlags.ContainsDestructuringAssignment );
TransformFlags[ +TransformFlags.AssertDestructuringAssignment.value ] = typeof TransformFlags[ +TransformFlags.AssertDestructuringAssignment.value ] !== 'number' ? named( 'AssertDestructuringAssignment' ) : TransformFlags[ +TransformFlags.AssertDestructuringAssignment.value ];
TransformFlags.OuterExpressionExcludes = wrapped( 'OuterExpressionExcludes', TransformFlags.TypeScript | TransformFlags.ES2015 | TransformFlags.DestructuringAssignment | TransformFlags.Generator | TransformFlags.HasComputedFlags );
TransformFlags[ +TransformFlags.OuterExpressionExcludes.value ] = typeof TransformFlags[ +TransformFlags.OuterExpressionExcludes.value ] !== 'number' ? named( 'OuterExpressionExcludes' ) : TransformFlags[ +TransformFlags.OuterExpressionExcludes.value ];
TransformFlags.PropertyAccessExcludes = wrapped( 'PropertyAccessExcludes', TransformFlags.OuterExpressionExcludes | TransformFlags.Super );
TransformFlags[ +TransformFlags.PropertyAccessExcludes.value ] = typeof TransformFlags[ +TransformFlags.PropertyAccessExcludes.value ] !== 'number' ? named( 'PropertyAccessExcludes' ) : TransformFlags[ +TransformFlags.PropertyAccessExcludes.value ];
TransformFlags.NodeExcludes = wrapped( 'NodeExcludes', TransformFlags.PropertyAccessExcludes | TransformFlags.ContainsSuper );
TransformFlags[ +TransformFlags.NodeExcludes.value ] = typeof TransformFlags[ +TransformFlags.NodeExcludes.value ] !== 'number' ? named( 'NodeExcludes' ) : TransformFlags[ +TransformFlags.NodeExcludes.value ];
TransformFlags.ArrowFunctionExcludes = wrapped( 'ArrowFunctionExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsDecorators | TransformFlags.ContainsDefaultValueAssignments | TransformFlags.ContainsLexicalThis | TransformFlags.ContainsParameterPropertyAssignments | TransformFlags.ContainsBlockScopedBinding | TransformFlags.ContainsYield | TransformFlags.ContainsHoistedDeclarationOrCompletion | TransformFlags.ContainsBindingPattern | TransformFlags.ContainsObjectRest );
TransformFlags[ +TransformFlags.ArrowFunctionExcludes.value ] = typeof TransformFlags[ +TransformFlags.ArrowFunctionExcludes.value ] !== 'number' ? named( 'ArrowFunctionExcludes' ) : TransformFlags[ +TransformFlags.ArrowFunctionExcludes.value ];
TransformFlags.FunctionExcludes = wrapped( 'FunctionExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsDecorators | TransformFlags.ContainsDefaultValueAssignments | TransformFlags.ContainsCapturedLexicalThis | TransformFlags.ContainsLexicalThis | TransformFlags.ContainsParameterPropertyAssignments | TransformFlags.ContainsBlockScopedBinding | TransformFlags.ContainsYield | TransformFlags.ContainsHoistedDeclarationOrCompletion | TransformFlags.ContainsBindingPattern | TransformFlags.ContainsObjectRest );
TransformFlags[ +TransformFlags.FunctionExcludes.value ] = typeof TransformFlags[ +TransformFlags.FunctionExcludes.value ] !== 'number' ? named( 'FunctionExcludes' ) : TransformFlags[ +TransformFlags.FunctionExcludes.value ];
TransformFlags.ConstructorExcludes = wrapped( 'ConstructorExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsDefaultValueAssignments | TransformFlags.ContainsLexicalThis | TransformFlags.ContainsCapturedLexicalThis | TransformFlags.ContainsBlockScopedBinding | TransformFlags.ContainsYield | TransformFlags.ContainsHoistedDeclarationOrCompletion | TransformFlags.ContainsBindingPattern | TransformFlags.ContainsObjectRest );
TransformFlags[ +TransformFlags.ConstructorExcludes.value ] = typeof TransformFlags[ +TransformFlags.ConstructorExcludes.value ] !== 'number' ? named( 'ConstructorExcludes' ) : TransformFlags[ +TransformFlags.ConstructorExcludes.value ];
TransformFlags.MethodOrAccessorExcludes = wrapped( 'MethodOrAccessorExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsDefaultValueAssignments | TransformFlags.ContainsLexicalThis | TransformFlags.ContainsCapturedLexicalThis | TransformFlags.ContainsBlockScopedBinding | TransformFlags.ContainsYield | TransformFlags.ContainsHoistedDeclarationOrCompletion | TransformFlags.ContainsBindingPattern | TransformFlags.ContainsObjectRest );
TransformFlags[ +TransformFlags.MethodOrAccessorExcludes.value ] = typeof TransformFlags[ +TransformFlags.MethodOrAccessorExcludes.value ] !== 'number' ? named( 'MethodOrAccessorExcludes' ) : TransformFlags[ +TransformFlags.MethodOrAccessorExcludes.value ];
TransformFlags.ClassExcludes = wrapped( 'ClassExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsDecorators | TransformFlags.ContainsPropertyInitializer | TransformFlags.ContainsLexicalThis | TransformFlags.ContainsCapturedLexicalThis | TransformFlags.ContainsComputedPropertyName | TransformFlags.ContainsParameterPropertyAssignments | TransformFlags.ContainsLexicalThisInComputedPropertyName );
TransformFlags[ +TransformFlags.ClassExcludes.value ] = typeof TransformFlags[ +TransformFlags.ClassExcludes.value ] !== 'number' ? named( 'ClassExcludes' ) : TransformFlags[ +TransformFlags.ClassExcludes.value ];
TransformFlags.ModuleExcludes = wrapped( 'ModuleExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsDecorators | TransformFlags.ContainsLexicalThis | TransformFlags.ContainsCapturedLexicalThis | TransformFlags.ContainsBlockScopedBinding | TransformFlags.ContainsHoistedDeclarationOrCompletion );
TransformFlags[ +TransformFlags.ModuleExcludes.value ] = typeof TransformFlags[ +TransformFlags.ModuleExcludes.value ] !== 'number' ? named( 'ModuleExcludes' ) : TransformFlags[ +TransformFlags.ModuleExcludes.value ];
TransformFlags.TypeExcludes = wrapped( 'TypeExcludes', ~TransformFlags.ContainsTypeScript );
TransformFlags[ +TransformFlags.TypeExcludes.value ] = typeof TransformFlags[ +TransformFlags.TypeExcludes.value ] !== 'number' ? named( 'TypeExcludes' ) : TransformFlags[ +TransformFlags.TypeExcludes.value ];
TransformFlags.ObjectLiteralExcludes = wrapped( 'ObjectLiteralExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsDecorators | TransformFlags.ContainsComputedPropertyName | TransformFlags.ContainsLexicalThisInComputedPropertyName | TransformFlags.ContainsObjectSpread );
TransformFlags[ +TransformFlags.ObjectLiteralExcludes.value ] = typeof TransformFlags[ +TransformFlags.ObjectLiteralExcludes.value ] !== 'number' ? named( 'ObjectLiteralExcludes' ) : TransformFlags[ +TransformFlags.ObjectLiteralExcludes.value ];
TransformFlags.ArrayLiteralOrCallOrNewExcludes = wrapped( 'ArrayLiteralOrCallOrNewExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsSpread );
TransformFlags[ +TransformFlags.ArrayLiteralOrCallOrNewExcludes.value ] = typeof TransformFlags[ +TransformFlags.ArrayLiteralOrCallOrNewExcludes.value ] !== 'number' ? named( 'ArrayLiteralOrCallOrNewExcludes' ) : TransformFlags[ +TransformFlags.ArrayLiteralOrCallOrNewExcludes.value ];
TransformFlags.VariableDeclarationListExcludes = wrapped( 'VariableDeclarationListExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsBindingPattern | TransformFlags.ContainsObjectRest );
TransformFlags[ +TransformFlags.VariableDeclarationListExcludes.value ] = typeof TransformFlags[ +TransformFlags.VariableDeclarationListExcludes.value ] !== 'number' ? named( 'VariableDeclarationListExcludes' ) : TransformFlags[ +TransformFlags.VariableDeclarationListExcludes.value ];
TransformFlags.ParameterExcludes = wrapped( 'ParameterExcludes', +TransformFlags.NodeExcludes );
TransformFlags[ +TransformFlags.ParameterExcludes.value ] = typeof TransformFlags[ +TransformFlags.ParameterExcludes.value ] !== 'number' ? named( 'ParameterExcludes' ) : TransformFlags[ +TransformFlags.ParameterExcludes.value ];
TransformFlags.CatchClauseExcludes = wrapped( 'CatchClauseExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsObjectRest );
TransformFlags[ +TransformFlags.CatchClauseExcludes.value ] = typeof TransformFlags[ +TransformFlags.CatchClauseExcludes.value ] !== 'number' ? named( 'CatchClauseExcludes' ) : TransformFlags[ +TransformFlags.CatchClauseExcludes.value ];
TransformFlags.BindingPatternExcludes = wrapped( 'BindingPatternExcludes', TransformFlags.NodeExcludes | TransformFlags.ContainsRest );
TransformFlags[ +TransformFlags.BindingPatternExcludes.value ] = typeof TransformFlags[ +TransformFlags.BindingPatternExcludes.value ] !== 'number' ? named( 'BindingPatternExcludes' ) : TransformFlags[ +TransformFlags.BindingPatternExcludes.value ];
TransformFlags.TypeScriptClassSyntaxMask = wrapped( 'TypeScriptClassSyntaxMask', TransformFlags.ContainsParameterPropertyAssignments | TransformFlags.ContainsPropertyInitializer | TransformFlags.ContainsDecorators );
TransformFlags[ +TransformFlags.TypeScriptClassSyntaxMask.value ] = typeof TransformFlags[ +TransformFlags.TypeScriptClassSyntaxMask.value ] !== 'number' ? named( 'TypeScriptClassSyntaxMask' ) : TransformFlags[ +TransformFlags.TypeScriptClassSyntaxMask.value ];
TransformFlags.ES2015FunctionSyntaxMask = wrapped( 'ES2015FunctionSyntaxMask', TransformFlags.ContainsCapturedLexicalThis | TransformFlags.ContainsDefaultValueAssignments );
TransformFlags[ +TransformFlags.ES2015FunctionSyntaxMask.value ] = typeof TransformFlags[ +TransformFlags.ES2015FunctionSyntaxMask.value ] !== 'number' ? named( 'ES2015FunctionSyntaxMask' ) : TransformFlags[ +TransformFlags.ES2015FunctionSyntaxMask.value ];

TransformFlags = Object.create( tmp = templ(), TransformFlags );
tmp.asString = asString( TransformFlags );

/** *********************************************************************************************************************
 * @enum
 * @name EmitFlags
 ************************************************************************************************************************/
let EmitFlags = {};
EmitFlags.SingleLine = wrapped( 'SingleLine', 1 << 0 );
EmitFlags[ +EmitFlags.SingleLine.value ] = typeof EmitFlags[ +EmitFlags.SingleLine.value ] !== 'number' ? named( 'SingleLine' ) : EmitFlags[ +EmitFlags.SingleLine.value ];
EmitFlags.AdviseOnEmitNode = wrapped( 'AdviseOnEmitNode', 1 << 1 );
EmitFlags[ +EmitFlags.AdviseOnEmitNode.value ] = typeof EmitFlags[ +EmitFlags.AdviseOnEmitNode.value ] !== 'number' ? named( 'AdviseOnEmitNode' ) : EmitFlags[ +EmitFlags.AdviseOnEmitNode.value ];
EmitFlags.NoSubstitution = wrapped( 'NoSubstitution', 1 << 2 );
EmitFlags[ +EmitFlags.NoSubstitution.value ] = typeof EmitFlags[ +EmitFlags.NoSubstitution.value ] !== 'number' ? named( 'NoSubstitution' ) : EmitFlags[ +EmitFlags.NoSubstitution.value ];
EmitFlags.CapturesThis = wrapped( 'CapturesThis', 1 << 3 );
EmitFlags[ +EmitFlags.CapturesThis.value ] = typeof EmitFlags[ +EmitFlags.CapturesThis.value ] !== 'number' ? named( 'CapturesThis' ) : EmitFlags[ +EmitFlags.CapturesThis.value ];
EmitFlags.NoLeadingSourceMap = wrapped( 'NoLeadingSourceMap', 1 << 4 );
EmitFlags[ +EmitFlags.NoLeadingSourceMap.value ] = typeof EmitFlags[ +EmitFlags.NoLeadingSourceMap.value ] !== 'number' ? named( 'NoLeadingSourceMap' ) : EmitFlags[ +EmitFlags.NoLeadingSourceMap.value ];
EmitFlags.NoTrailingSourceMap = wrapped( 'NoTrailingSourceMap', 1 << 5 );
EmitFlags[ +EmitFlags.NoTrailingSourceMap.value ] = typeof EmitFlags[ +EmitFlags.NoTrailingSourceMap.value ] !== 'number' ? named( 'NoTrailingSourceMap' ) : EmitFlags[ +EmitFlags.NoTrailingSourceMap.value ];
EmitFlags.NoSourceMap = wrapped( 'NoSourceMap', EmitFlags.NoLeadingSourceMap | EmitFlags.NoTrailingSourceMap );
EmitFlags[ +EmitFlags.NoSourceMap.value ] = typeof EmitFlags[ +EmitFlags.NoSourceMap.value ] !== 'number' ? named( 'NoSourceMap' ) : EmitFlags[ +EmitFlags.NoSourceMap.value ];
EmitFlags.NoNestedSourceMaps = wrapped( 'NoNestedSourceMaps', 1 << 6 );
EmitFlags[ +EmitFlags.NoNestedSourceMaps.value ] = typeof EmitFlags[ +EmitFlags.NoNestedSourceMaps.value ] !== 'number' ? named( 'NoNestedSourceMaps' ) : EmitFlags[ +EmitFlags.NoNestedSourceMaps.value ];
EmitFlags.NoTokenLeadingSourceMaps = wrapped( 'NoTokenLeadingSourceMaps', 1 << 7 );
EmitFlags[ +EmitFlags.NoTokenLeadingSourceMaps.value ] = typeof EmitFlags[ +EmitFlags.NoTokenLeadingSourceMaps.value ] !== 'number' ? named( 'NoTokenLeadingSourceMaps' ) : EmitFlags[ +EmitFlags.NoTokenLeadingSourceMaps.value ];
EmitFlags.NoTokenTrailingSourceMaps = wrapped( 'NoTokenTrailingSourceMaps', 1 << 8 );
EmitFlags[ +EmitFlags.NoTokenTrailingSourceMaps.value ] = typeof EmitFlags[ +EmitFlags.NoTokenTrailingSourceMaps.value ] !== 'number' ? named( 'NoTokenTrailingSourceMaps' ) : EmitFlags[ +EmitFlags.NoTokenTrailingSourceMaps.value ];
EmitFlags.NoTokenSourceMaps = wrapped( 'NoTokenSourceMaps', EmitFlags.NoTokenLeadingSourceMaps | EmitFlags.NoTokenTrailingSourceMaps );
EmitFlags[ +EmitFlags.NoTokenSourceMaps.value ] = typeof EmitFlags[ +EmitFlags.NoTokenSourceMaps.value ] !== 'number' ? named( 'NoTokenSourceMaps' ) : EmitFlags[ +EmitFlags.NoTokenSourceMaps.value ];
EmitFlags.NoLeadingComments = wrapped( 'NoLeadingComments', 1 << 9 );
EmitFlags[ +EmitFlags.NoLeadingComments.value ] = typeof EmitFlags[ +EmitFlags.NoLeadingComments.value ] !== 'number' ? named( 'NoLeadingComments' ) : EmitFlags[ +EmitFlags.NoLeadingComments.value ];
EmitFlags.NoTrailingComments = wrapped( 'NoTrailingComments', 1 << 10 );
EmitFlags[ +EmitFlags.NoTrailingComments.value ] = typeof EmitFlags[ +EmitFlags.NoTrailingComments.value ] !== 'number' ? named( 'NoTrailingComments' ) : EmitFlags[ +EmitFlags.NoTrailingComments.value ];
EmitFlags.NoComments = wrapped( 'NoComments', EmitFlags.NoLeadingComments | EmitFlags.NoTrailingComments );
EmitFlags[ +EmitFlags.NoComments.value ] = typeof EmitFlags[ +EmitFlags.NoComments.value ] !== 'number' ? named( 'NoComments' ) : EmitFlags[ +EmitFlags.NoComments.value ];
EmitFlags.NoNestedComments = wrapped( 'NoNestedComments', 1 << 11 );
EmitFlags[ +EmitFlags.NoNestedComments.value ] = typeof EmitFlags[ +EmitFlags.NoNestedComments.value ] !== 'number' ? named( 'NoNestedComments' ) : EmitFlags[ +EmitFlags.NoNestedComments.value ];
EmitFlags.HelperName = wrapped( 'HelperName', 1 << 12 );
EmitFlags[ +EmitFlags.HelperName.value ] = typeof EmitFlags[ +EmitFlags.HelperName.value ] !== 'number' ? named( 'HelperName' ) : EmitFlags[ +EmitFlags.HelperName.value ];
EmitFlags.ExportName = wrapped( 'ExportName', 1 << 13 );
EmitFlags[ +EmitFlags.ExportName.value ] = typeof EmitFlags[ +EmitFlags.ExportName.value ] !== 'number' ? named( 'ExportName' ) : EmitFlags[ +EmitFlags.ExportName.value ];
EmitFlags.LocalName = wrapped( 'LocalName', 1 << 14 );
EmitFlags[ +EmitFlags.LocalName.value ] = typeof EmitFlags[ +EmitFlags.LocalName.value ] !== 'number' ? named( 'LocalName' ) : EmitFlags[ +EmitFlags.LocalName.value ];
EmitFlags.InternalName = wrapped( 'InternalName', 1 << 15 );
EmitFlags[ +EmitFlags.InternalName.value ] = typeof EmitFlags[ +EmitFlags.InternalName.value ] !== 'number' ? named( 'InternalName' ) : EmitFlags[ +EmitFlags.InternalName.value ];
EmitFlags.Indented = wrapped( 'Indented', 1 << 16 );
EmitFlags[ +EmitFlags.Indented.value ] = typeof EmitFlags[ +EmitFlags.Indented.value ] !== 'number' ? named( 'Indented' ) : EmitFlags[ +EmitFlags.Indented.value ];
EmitFlags.NoIndentation = wrapped( 'NoIndentation', 1 << 17 );
EmitFlags[ +EmitFlags.NoIndentation.value ] = typeof EmitFlags[ +EmitFlags.NoIndentation.value ] !== 'number' ? named( 'NoIndentation' ) : EmitFlags[ +EmitFlags.NoIndentation.value ];
EmitFlags.AsyncFunctionBody = wrapped( 'AsyncFunctionBody', 1 << 18 );
EmitFlags[ +EmitFlags.AsyncFunctionBody.value ] = typeof EmitFlags[ +EmitFlags.AsyncFunctionBody.value ] !== 'number' ? named( 'AsyncFunctionBody' ) : EmitFlags[ +EmitFlags.AsyncFunctionBody.value ];
EmitFlags.ReuseTempVariableScope = wrapped( 'ReuseTempVariableScope', 1 << 19 );
EmitFlags[ +EmitFlags.ReuseTempVariableScope.value ] = typeof EmitFlags[ +EmitFlags.ReuseTempVariableScope.value ] !== 'number' ? named( 'ReuseTempVariableScope' ) : EmitFlags[ +EmitFlags.ReuseTempVariableScope.value ];
EmitFlags.CustomPrologue = wrapped( 'CustomPrologue', 1 << 20 );
EmitFlags[ +EmitFlags.CustomPrologue.value ] = typeof EmitFlags[ +EmitFlags.CustomPrologue.value ] !== 'number' ? named( 'CustomPrologue' ) : EmitFlags[ +EmitFlags.CustomPrologue.value ];
EmitFlags.NoHoisting = wrapped( 'NoHoisting', 1 << 21 );
EmitFlags[ +EmitFlags.NoHoisting.value ] = typeof EmitFlags[ +EmitFlags.NoHoisting.value ] !== 'number' ? named( 'NoHoisting' ) : EmitFlags[ +EmitFlags.NoHoisting.value ];
EmitFlags.HasEndOfDeclarationMarker = wrapped( 'HasEndOfDeclarationMarker', 1 << 22 );
EmitFlags[ +EmitFlags.HasEndOfDeclarationMarker.value ] = typeof EmitFlags[ +EmitFlags.HasEndOfDeclarationMarker.value ] !== 'number' ? named( 'HasEndOfDeclarationMarker' ) : EmitFlags[ +EmitFlags.HasEndOfDeclarationMarker.value ];
EmitFlags.Iterator = wrapped( 'Iterator', 1 << 23 );
EmitFlags[ +EmitFlags.Iterator.value ] = typeof EmitFlags[ +EmitFlags.Iterator.value ] !== 'number' ? named( 'Iterator' ) : EmitFlags[ +EmitFlags.Iterator.value ];
EmitFlags.NoAsciiEscaping = wrapped( 'NoAsciiEscaping', 1 << 24 );
EmitFlags[ +EmitFlags.NoAsciiEscaping.value ] = typeof EmitFlags[ +EmitFlags.NoAsciiEscaping.value ] !== 'number' ? named( 'NoAsciiEscaping' ) : EmitFlags[ +EmitFlags.NoAsciiEscaping.value ];
EmitFlags.TypeScriptClassWrapper = wrapped( 'TypeScriptClassWrapper', 1 << 25 );
EmitFlags[ +EmitFlags.TypeScriptClassWrapper.value ] = typeof EmitFlags[ +EmitFlags.TypeScriptClassWrapper.value ] !== 'number' ? named( 'TypeScriptClassWrapper' ) : EmitFlags[ +EmitFlags.TypeScriptClassWrapper.value ];
EmitFlags.NeverApplyImportHelper = wrapped( 'NeverApplyImportHelper', 1 << 26 );
EmitFlags[ +EmitFlags.NeverApplyImportHelper.value ] = typeof EmitFlags[ +EmitFlags.NeverApplyImportHelper.value ] !== 'number' ? named( 'NeverApplyImportHelper' ) : EmitFlags[ +EmitFlags.NeverApplyImportHelper.value ];

EmitFlags = Object.create( tmp = templ(), EmitFlags );
tmp.asString = asString( EmitFlags );

/** *********************************************************************************************************************
 * @enum
 * @name ExternalEmitHelpers
 ************************************************************************************************************************/
let ExternalEmitHelpers = {};
ExternalEmitHelpers.Extends = wrapped( 'Extends', 1 << 0 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Extends.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Extends.value ] !== 'number' ? named( 'Extends' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Extends.value ];
ExternalEmitHelpers.Assign = wrapped( 'Assign', 1 << 1 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Assign.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Assign.value ] !== 'number' ? named( 'Assign' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Assign.value ];
ExternalEmitHelpers.Rest = wrapped( 'Rest', 1 << 2 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Rest.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Rest.value ] !== 'number' ? named( 'Rest' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Rest.value ];
ExternalEmitHelpers.Decorate = wrapped( 'Decorate', 1 << 3 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Decorate.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Decorate.value ] !== 'number' ? named( 'Decorate' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Decorate.value ];
ExternalEmitHelpers.Metadata = wrapped( 'Metadata', 1 << 4 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Metadata.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Metadata.value ] !== 'number' ? named( 'Metadata' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Metadata.value ];
ExternalEmitHelpers.Param = wrapped( 'Param', 1 << 5 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Param.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Param.value ] !== 'number' ? named( 'Param' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Param.value ];
ExternalEmitHelpers.Awaiter = wrapped( 'Awaiter', 1 << 6 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Awaiter.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Awaiter.value ] !== 'number' ? named( 'Awaiter' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Awaiter.value ];
ExternalEmitHelpers.Generator = wrapped( 'Generator', 1 << 7 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Generator.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Generator.value ] !== 'number' ? named( 'Generator' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Generator.value ];
ExternalEmitHelpers.Values = wrapped( 'Values', 1 << 8 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Values.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Values.value ] !== 'number' ? named( 'Values' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Values.value ];
ExternalEmitHelpers.Read = wrapped( 'Read', 1 << 9 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Read.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Read.value ] !== 'number' ? named( 'Read' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Read.value ];
ExternalEmitHelpers.Spread = wrapped( 'Spread', 1 << 10 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Spread.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Spread.value ] !== 'number' ? named( 'Spread' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Spread.value ];
ExternalEmitHelpers.Await = wrapped( 'Await', 1 << 11 );
ExternalEmitHelpers[ +ExternalEmitHelpers.Await.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.Await.value ] !== 'number' ? named( 'Await' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.Await.value ];
ExternalEmitHelpers.AsyncGenerator = wrapped( 'AsyncGenerator', 1 << 12 );
ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncGenerator.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncGenerator.value ] !== 'number' ? named( 'AsyncGenerator' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncGenerator.value ];
ExternalEmitHelpers.AsyncDelegator = wrapped( 'AsyncDelegator', 1 << 13 );
ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncDelegator.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncDelegator.value ] !== 'number' ? named( 'AsyncDelegator' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncDelegator.value ];
ExternalEmitHelpers.AsyncValues = wrapped( 'AsyncValues', 1 << 14 );
ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncValues.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncValues.value ] !== 'number' ? named( 'AsyncValues' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncValues.value ];
ExternalEmitHelpers.ExportStar = wrapped( 'ExportStar', 1 << 15 );
ExternalEmitHelpers[ +ExternalEmitHelpers.ExportStar.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.ExportStar.value ] !== 'number' ? named( 'ExportStar' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.ExportStar.value ];
ExternalEmitHelpers.MakeTemplateObject = wrapped( 'MakeTemplateObject', 1 << 16 );
ExternalEmitHelpers[ +ExternalEmitHelpers.MakeTemplateObject.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.MakeTemplateObject.value ] !== 'number' ? named( 'MakeTemplateObject' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.MakeTemplateObject.value ];
ExternalEmitHelpers.FirstEmitHelper = wrapped( 'FirstEmitHelper', +ExternalEmitHelpers.Extends );
ExternalEmitHelpers[ +ExternalEmitHelpers.FirstEmitHelper.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.FirstEmitHelper.value ] !== 'number' ? named( 'FirstEmitHelper' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.FirstEmitHelper.value ];
ExternalEmitHelpers.LastEmitHelper = wrapped( 'LastEmitHelper', +ExternalEmitHelpers.MakeTemplateObject );
ExternalEmitHelpers[ +ExternalEmitHelpers.LastEmitHelper.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.LastEmitHelper.value ] !== 'number' ? named( 'LastEmitHelper' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.LastEmitHelper.value ];
ExternalEmitHelpers.ForOfIncludes = wrapped( 'ForOfIncludes', +ExternalEmitHelpers.Values );
ExternalEmitHelpers[ +ExternalEmitHelpers.ForOfIncludes.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.ForOfIncludes.value ] !== 'number' ? named( 'ForOfIncludes' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.ForOfIncludes.value ];
ExternalEmitHelpers.ForAwaitOfIncludes = wrapped( 'ForAwaitOfIncludes', +ExternalEmitHelpers.AsyncValues );
ExternalEmitHelpers[ +ExternalEmitHelpers.ForAwaitOfIncludes.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.ForAwaitOfIncludes.value ] !== 'number' ? named( 'ForAwaitOfIncludes' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.ForAwaitOfIncludes.value ];
ExternalEmitHelpers.AsyncGeneratorIncludes = wrapped( 'AsyncGeneratorIncludes', ExternalEmitHelpers.Await | ExternalEmitHelpers.AsyncGenerator );
ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncGeneratorIncludes.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncGeneratorIncludes.value ] !== 'number' ? named( 'AsyncGeneratorIncludes' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncGeneratorIncludes.value ];
ExternalEmitHelpers.AsyncDelegatorIncludes = wrapped( 'AsyncDelegatorIncludes', ExternalEmitHelpers.Await | ExternalEmitHelpers.AsyncDelegator | ExternalEmitHelpers.AsyncValues );
ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncDelegatorIncludes.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncDelegatorIncludes.value ] !== 'number' ? named( 'AsyncDelegatorIncludes' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.AsyncDelegatorIncludes.value ];
ExternalEmitHelpers.SpreadIncludes = wrapped( 'SpreadIncludes', ExternalEmitHelpers.Read | ExternalEmitHelpers.Spread );
ExternalEmitHelpers[ +ExternalEmitHelpers.SpreadIncludes.value ] = typeof ExternalEmitHelpers[ +ExternalEmitHelpers.SpreadIncludes.value ] !== 'number' ? named( 'SpreadIncludes' ) : ExternalEmitHelpers[ +ExternalEmitHelpers.SpreadIncludes.value ];

ExternalEmitHelpers = Object.create( tmp = templ(), ExternalEmitHelpers );
tmp.asString = asString( ExternalEmitHelpers );

/** *********************************************************************************************************************
 * @enum
 * @name EmitHint
 ************************************************************************************************************************/
let EmitHint = {};
EmitHint.SourceFile = wrapped( 'SourceFile', 1 );
EmitHint[ +EmitHint.SourceFile.value ] = typeof EmitHint[ +EmitHint.SourceFile.value ] !== 'number' ? named( 'SourceFile' ) : EmitHint[ +EmitHint.SourceFile.value ];
EmitHint.Expression = wrapped( 'Expression', 2 );
EmitHint[ +EmitHint.Expression.value ] = typeof EmitHint[ +EmitHint.Expression.value ] !== 'number' ? named( 'Expression' ) : EmitHint[ +EmitHint.Expression.value ];
EmitHint.IdentifierName = wrapped( 'IdentifierName', 3 );
EmitHint[ +EmitHint.IdentifierName.value ] = typeof EmitHint[ +EmitHint.IdentifierName.value ] !== 'number' ? named( 'IdentifierName' ) : EmitHint[ +EmitHint.IdentifierName.value ];
EmitHint.MappedTypeParameter = wrapped( 'MappedTypeParameter', 4 );
EmitHint[ +EmitHint.MappedTypeParameter.value ] = typeof EmitHint[ +EmitHint.MappedTypeParameter.value ] !== 'number' ? named( 'MappedTypeParameter' ) : EmitHint[ +EmitHint.MappedTypeParameter.value ];
EmitHint.Unspecified = wrapped( 'Unspecified', 5 );
EmitHint[ +EmitHint.Unspecified.value ] = typeof EmitHint[ +EmitHint.Unspecified.value ] !== 'number' ? named( 'Unspecified' ) : EmitHint[ +EmitHint.Unspecified.value ];

EmitHint = Object.create( tmp = templ(), EmitHint );
tmp.asString = asString( EmitHint );

/** *********************************************************************************************************************
 * @enum
 * @name ListFormat
 ************************************************************************************************************************/
let ListFormat = {};
ListFormat.None = wrapped( 'None', 0 );
ListFormat[ +ListFormat.None.value ] = typeof ListFormat[ +ListFormat.None.value ] !== 'number' ? named( 'None' ) : ListFormat[ +ListFormat.None.value ];
ListFormat.SingleLine = wrapped( 'SingleLine', 0 );
ListFormat[ +ListFormat.SingleLine.value ] = typeof ListFormat[ +ListFormat.SingleLine.value ] !== 'number' ? named( 'SingleLine' ) : ListFormat[ +ListFormat.SingleLine.value ];
ListFormat.MultiLine = wrapped( 'MultiLine', 1 << 0 );
ListFormat[ +ListFormat.MultiLine.value ] = typeof ListFormat[ +ListFormat.MultiLine.value ] !== 'number' ? named( 'MultiLine' ) : ListFormat[ +ListFormat.MultiLine.value ];
ListFormat.PreserveLines = wrapped( 'PreserveLines', 1 << 1 );
ListFormat[ +ListFormat.PreserveLines.value ] = typeof ListFormat[ +ListFormat.PreserveLines.value ] !== 'number' ? named( 'PreserveLines' ) : ListFormat[ +ListFormat.PreserveLines.value ];
ListFormat.LinesMask = wrapped( 'LinesMask', ListFormat.SingleLine | ListFormat.MultiLine | ListFormat.PreserveLines );
ListFormat[ +ListFormat.LinesMask.value ] = typeof ListFormat[ +ListFormat.LinesMask.value ] !== 'number' ? named( 'LinesMask' ) : ListFormat[ +ListFormat.LinesMask.value ];
ListFormat.NotDelimited = wrapped( 'NotDelimited', 0 );
ListFormat[ +ListFormat.NotDelimited.value ] = typeof ListFormat[ +ListFormat.NotDelimited.value ] !== 'number' ? named( 'NotDelimited' ) : ListFormat[ +ListFormat.NotDelimited.value ];
ListFormat.BarDelimited = wrapped( 'BarDelimited', 1 << 2 );
ListFormat[ +ListFormat.BarDelimited.value ] = typeof ListFormat[ +ListFormat.BarDelimited.value ] !== 'number' ? named( 'BarDelimited' ) : ListFormat[ +ListFormat.BarDelimited.value ];
ListFormat.AmpersandDelimited = wrapped( 'AmpersandDelimited', 1 << 3 );
ListFormat[ +ListFormat.AmpersandDelimited.value ] = typeof ListFormat[ +ListFormat.AmpersandDelimited.value ] !== 'number' ? named( 'AmpersandDelimited' ) : ListFormat[ +ListFormat.AmpersandDelimited.value ];
ListFormat.CommaDelimited = wrapped( 'CommaDelimited', 1 << 4 );
ListFormat[ +ListFormat.CommaDelimited.value ] = typeof ListFormat[ +ListFormat.CommaDelimited.value ] !== 'number' ? named( 'CommaDelimited' ) : ListFormat[ +ListFormat.CommaDelimited.value ];
ListFormat.DelimitersMask = wrapped( 'DelimitersMask', ListFormat.BarDelimited | ListFormat.AmpersandDelimited | ListFormat.CommaDelimited );
ListFormat[ +ListFormat.DelimitersMask.value ] = typeof ListFormat[ +ListFormat.DelimitersMask.value ] !== 'number' ? named( 'DelimitersMask' ) : ListFormat[ +ListFormat.DelimitersMask.value ];
ListFormat.AllowTrailingComma = wrapped( 'AllowTrailingComma', 1 << 5 );
ListFormat[ +ListFormat.AllowTrailingComma.value ] = typeof ListFormat[ +ListFormat.AllowTrailingComma.value ] !== 'number' ? named( 'AllowTrailingComma' ) : ListFormat[ +ListFormat.AllowTrailingComma.value ];
ListFormat.Indented = wrapped( 'Indented', 1 << 6 );
ListFormat[ +ListFormat.Indented.value ] = typeof ListFormat[ +ListFormat.Indented.value ] !== 'number' ? named( 'Indented' ) : ListFormat[ +ListFormat.Indented.value ];
ListFormat.SpaceBetweenBraces = wrapped( 'SpaceBetweenBraces', 1 << 7 );
ListFormat[ +ListFormat.SpaceBetweenBraces.value ] = typeof ListFormat[ +ListFormat.SpaceBetweenBraces.value ] !== 'number' ? named( 'SpaceBetweenBraces' ) : ListFormat[ +ListFormat.SpaceBetweenBraces.value ];
ListFormat.SpaceBetweenSiblings = wrapped( 'SpaceBetweenSiblings', 1 << 8 );
ListFormat[ +ListFormat.SpaceBetweenSiblings.value ] = typeof ListFormat[ +ListFormat.SpaceBetweenSiblings.value ] !== 'number' ? named( 'SpaceBetweenSiblings' ) : ListFormat[ +ListFormat.SpaceBetweenSiblings.value ];
ListFormat.Braces = wrapped( 'Braces', 1 << 9 );
ListFormat[ +ListFormat.Braces.value ] = typeof ListFormat[ +ListFormat.Braces.value ] !== 'number' ? named( 'Braces' ) : ListFormat[ +ListFormat.Braces.value ];

ListFormat = Object.create( tmp = templ(), ListFormat );
tmp.asString = asString( ListFormat );

/** *********************************************************************************************************************
 * @enum
 * @name PragmaKindFlags
 ************************************************************************************************************************/
let PragmaKindFlags = {};
PragmaKindFlags.None = wrapped( 'None', 0 );
PragmaKindFlags[ +PragmaKindFlags.None.value ] = typeof PragmaKindFlags[ +PragmaKindFlags.None.value ] !== 'number' ? named( 'None' ) : PragmaKindFlags[ +PragmaKindFlags.None.value ];
PragmaKindFlags.TripleSlashXML = wrapped( 'TripleSlashXML', 1 << 0 );
PragmaKindFlags[ +PragmaKindFlags.TripleSlashXML.value ] = typeof PragmaKindFlags[ +PragmaKindFlags.TripleSlashXML.value ] !== 'number' ? named( 'TripleSlashXML' ) : PragmaKindFlags[ +PragmaKindFlags.TripleSlashXML.value ];
PragmaKindFlags.SingleLine = wrapped( 'SingleLine', 1 << 1 );
PragmaKindFlags[ +PragmaKindFlags.SingleLine.value ] = typeof PragmaKindFlags[ +PragmaKindFlags.SingleLine.value ] !== 'number' ? named( 'SingleLine' ) : PragmaKindFlags[ +PragmaKindFlags.SingleLine.value ];
PragmaKindFlags.MultiLine = wrapped( 'MultiLine', 1 << 2 );
PragmaKindFlags[ +PragmaKindFlags.MultiLine.value ] = typeof PragmaKindFlags[ +PragmaKindFlags.MultiLine.value ] !== 'number' ? named( 'MultiLine' ) : PragmaKindFlags[ +PragmaKindFlags.MultiLine.value ];
PragmaKindFlags.All = wrapped( 'All', PragmaKindFlags.TripleSlashXML | PragmaKindFlags.SingleLine | PragmaKindFlags.MultiLine );
PragmaKindFlags[ +PragmaKindFlags.All.value ] = typeof PragmaKindFlags[ +PragmaKindFlags.All.value ] !== 'number' ? named( 'All' ) : PragmaKindFlags[ +PragmaKindFlags.All.value ];
PragmaKindFlags.Default = wrapped( 'Default', +PragmaKindFlags.All );
PragmaKindFlags[ +PragmaKindFlags.Default.value ] = typeof PragmaKindFlags[ +PragmaKindFlags.Default.value ] !== 'number' ? named( 'Default' ) : PragmaKindFlags[ +PragmaKindFlags.Default.value ];

PragmaKindFlags = Object.create( tmp = templ(), PragmaKindFlags );
tmp.asString = asString( PragmaKindFlags );

/** *********************************************************************************************************************
 * Enums extracted from /mnt/e/code/typescript/src/compiler/checker.ts
 ************************************************************************************************************************/

/** *********************************************************************************************************************
 * @enum
 * @name TypeFacts
 ************************************************************************************************************************/
let TypeFacts = {};
TypeFacts.None = wrapped( 'None', 0 );
TypeFacts[ +TypeFacts.None.value ] = typeof TypeFacts[ +TypeFacts.None.value ] !== 'number' ? named( 'None' ) : TypeFacts[ +TypeFacts.None.value ];
TypeFacts.TypeofEQString = wrapped( 'TypeofEQString', 1 << 0 );
TypeFacts[ +TypeFacts.TypeofEQString.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQString.value ] !== 'number' ? named( 'TypeofEQString' ) : TypeFacts[ +TypeFacts.TypeofEQString.value ];
TypeFacts.TypeofEQNumber = wrapped( 'TypeofEQNumber', 1 << 1 );
TypeFacts[ +TypeFacts.TypeofEQNumber.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQNumber.value ] !== 'number' ? named( 'TypeofEQNumber' ) : TypeFacts[ +TypeFacts.TypeofEQNumber.value ];
TypeFacts.TypeofEQBoolean = wrapped( 'TypeofEQBoolean', 1 << 2 );
TypeFacts[ +TypeFacts.TypeofEQBoolean.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQBoolean.value ] !== 'number' ? named( 'TypeofEQBoolean' ) : TypeFacts[ +TypeFacts.TypeofEQBoolean.value ];
TypeFacts.TypeofEQSymbol = wrapped( 'TypeofEQSymbol', 1 << 3 );
TypeFacts[ +TypeFacts.TypeofEQSymbol.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQSymbol.value ] !== 'number' ? named( 'TypeofEQSymbol' ) : TypeFacts[ +TypeFacts.TypeofEQSymbol.value ];
TypeFacts.TypeofEQObject = wrapped( 'TypeofEQObject', 1 << 4 );
TypeFacts[ +TypeFacts.TypeofEQObject.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQObject.value ] !== 'number' ? named( 'TypeofEQObject' ) : TypeFacts[ +TypeFacts.TypeofEQObject.value ];
TypeFacts.TypeofEQFunction = wrapped( 'TypeofEQFunction', 1 << 5 );
TypeFacts[ +TypeFacts.TypeofEQFunction.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQFunction.value ] !== 'number' ? named( 'TypeofEQFunction' ) : TypeFacts[ +TypeFacts.TypeofEQFunction.value ];
TypeFacts.TypeofEQHostObject = wrapped( 'TypeofEQHostObject', 1 << 6 );
TypeFacts[ +TypeFacts.TypeofEQHostObject.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQHostObject.value ] !== 'number' ? named( 'TypeofEQHostObject' ) : TypeFacts[ +TypeFacts.TypeofEQHostObject.value ];
TypeFacts.TypeofNEString = wrapped( 'TypeofNEString', 1 << 7 );
TypeFacts[ +TypeFacts.TypeofNEString.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEString.value ] !== 'number' ? named( 'TypeofNEString' ) : TypeFacts[ +TypeFacts.TypeofNEString.value ];
TypeFacts.TypeofNENumber = wrapped( 'TypeofNENumber', 1 << 8 );
TypeFacts[ +TypeFacts.TypeofNENumber.value ] = typeof TypeFacts[ +TypeFacts.TypeofNENumber.value ] !== 'number' ? named( 'TypeofNENumber' ) : TypeFacts[ +TypeFacts.TypeofNENumber.value ];
TypeFacts.TypeofNEBoolean = wrapped( 'TypeofNEBoolean', 1 << 9 );
TypeFacts[ +TypeFacts.TypeofNEBoolean.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEBoolean.value ] !== 'number' ? named( 'TypeofNEBoolean' ) : TypeFacts[ +TypeFacts.TypeofNEBoolean.value ];
TypeFacts.TypeofNESymbol = wrapped( 'TypeofNESymbol', 1 << 10 );
TypeFacts[ +TypeFacts.TypeofNESymbol.value ] = typeof TypeFacts[ +TypeFacts.TypeofNESymbol.value ] !== 'number' ? named( 'TypeofNESymbol' ) : TypeFacts[ +TypeFacts.TypeofNESymbol.value ];
TypeFacts.TypeofNEObject = wrapped( 'TypeofNEObject', 1 << 11 );
TypeFacts[ +TypeFacts.TypeofNEObject.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEObject.value ] !== 'number' ? named( 'TypeofNEObject' ) : TypeFacts[ +TypeFacts.TypeofNEObject.value ];
TypeFacts.TypeofNEFunction = wrapped( 'TypeofNEFunction', 1 << 12 );
TypeFacts[ +TypeFacts.TypeofNEFunction.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEFunction.value ] !== 'number' ? named( 'TypeofNEFunction' ) : TypeFacts[ +TypeFacts.TypeofNEFunction.value ];
TypeFacts.TypeofNEHostObject = wrapped( 'TypeofNEHostObject', 1 << 13 );
TypeFacts[ +TypeFacts.TypeofNEHostObject.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEHostObject.value ] !== 'number' ? named( 'TypeofNEHostObject' ) : TypeFacts[ +TypeFacts.TypeofNEHostObject.value ];
TypeFacts.EQUndefined = wrapped( 'EQUndefined', 1 << 14 );
TypeFacts[ +TypeFacts.EQUndefined.value ] = typeof TypeFacts[ +TypeFacts.EQUndefined.value ] !== 'number' ? named( 'EQUndefined' ) : TypeFacts[ +TypeFacts.EQUndefined.value ];
TypeFacts.EQNull = wrapped( 'EQNull', 1 << 15 );
TypeFacts[ +TypeFacts.EQNull.value ] = typeof TypeFacts[ +TypeFacts.EQNull.value ] !== 'number' ? named( 'EQNull' ) : TypeFacts[ +TypeFacts.EQNull.value ];
TypeFacts.EQUndefinedOrNull = wrapped( 'EQUndefinedOrNull', 1 << 16 );
TypeFacts[ +TypeFacts.EQUndefinedOrNull.value ] = typeof TypeFacts[ +TypeFacts.EQUndefinedOrNull.value ] !== 'number' ? named( 'EQUndefinedOrNull' ) : TypeFacts[ +TypeFacts.EQUndefinedOrNull.value ];
TypeFacts.NEUndefined = wrapped( 'NEUndefined', 1 << 17 );
TypeFacts[ +TypeFacts.NEUndefined.value ] = typeof TypeFacts[ +TypeFacts.NEUndefined.value ] !== 'number' ? named( 'NEUndefined' ) : TypeFacts[ +TypeFacts.NEUndefined.value ];
TypeFacts.NENull = wrapped( 'NENull', 1 << 18 );
TypeFacts[ +TypeFacts.NENull.value ] = typeof TypeFacts[ +TypeFacts.NENull.value ] !== 'number' ? named( 'NENull' ) : TypeFacts[ +TypeFacts.NENull.value ];
TypeFacts.NEUndefinedOrNull = wrapped( 'NEUndefinedOrNull', 1 << 19 );
TypeFacts[ +TypeFacts.NEUndefinedOrNull.value ] = typeof TypeFacts[ +TypeFacts.NEUndefinedOrNull.value ] !== 'number' ? named( 'NEUndefinedOrNull' ) : TypeFacts[ +TypeFacts.NEUndefinedOrNull.value ];
TypeFacts.Truthy = wrapped( 'Truthy', 1 << 20 );
TypeFacts[ +TypeFacts.Truthy.value ] = typeof TypeFacts[ +TypeFacts.Truthy.value ] !== 'number' ? named( 'Truthy' ) : TypeFacts[ +TypeFacts.Truthy.value ];
TypeFacts.Falsy = wrapped( 'Falsy', 1 << 21 );
TypeFacts[ +TypeFacts.Falsy.value ] = typeof TypeFacts[ +TypeFacts.Falsy.value ] !== 'number' ? named( 'Falsy' ) : TypeFacts[ +TypeFacts.Falsy.value ];
TypeFacts.All = wrapped( 'All', ( 1 << 22 ) - 1 );
TypeFacts[ +TypeFacts.All.value ] = typeof TypeFacts[ +TypeFacts.All.value ] !== 'number' ? named( 'All' ) : TypeFacts[ +TypeFacts.All.value ];
TypeFacts.BaseStringStrictFacts = wrapped( 'BaseStringStrictFacts', TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull );
TypeFacts[ +TypeFacts.BaseStringStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseStringStrictFacts.value ] !== 'number' ? named( 'BaseStringStrictFacts' ) : TypeFacts[ +TypeFacts.BaseStringStrictFacts.value ];
TypeFacts.BaseStringFacts = wrapped( 'BaseStringFacts', TypeFacts.BaseStringStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.BaseStringFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseStringFacts.value ] !== 'number' ? named( 'BaseStringFacts' ) : TypeFacts[ +TypeFacts.BaseStringFacts.value ];
TypeFacts.StringStrictFacts = wrapped( 'StringStrictFacts', TypeFacts.BaseStringStrictFacts | TypeFacts.Truthy | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.StringStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.StringStrictFacts.value ] !== 'number' ? named( 'StringStrictFacts' ) : TypeFacts[ +TypeFacts.StringStrictFacts.value ];
TypeFacts.StringFacts = wrapped( 'StringFacts', TypeFacts.BaseStringFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.StringFacts.value ] = typeof TypeFacts[ +TypeFacts.StringFacts.value ] !== 'number' ? named( 'StringFacts' ) : TypeFacts[ +TypeFacts.StringFacts.value ];
TypeFacts.EmptyStringStrictFacts = wrapped( 'EmptyStringStrictFacts', TypeFacts.BaseStringStrictFacts | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.EmptyStringStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.EmptyStringStrictFacts.value ] !== 'number' ? named( 'EmptyStringStrictFacts' ) : TypeFacts[ +TypeFacts.EmptyStringStrictFacts.value ];
TypeFacts.EmptyStringFacts = wrapped( 'EmptyStringFacts', +TypeFacts.BaseStringFacts );
TypeFacts[ +TypeFacts.EmptyStringFacts.value ] = typeof TypeFacts[ +TypeFacts.EmptyStringFacts.value ] !== 'number' ? named( 'EmptyStringFacts' ) : TypeFacts[ +TypeFacts.EmptyStringFacts.value ];
TypeFacts.NonEmptyStringStrictFacts = wrapped( 'NonEmptyStringStrictFacts', TypeFacts.BaseStringStrictFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NonEmptyStringStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.NonEmptyStringStrictFacts.value ] !== 'number' ? named( 'NonEmptyStringStrictFacts' ) : TypeFacts[ +TypeFacts.NonEmptyStringStrictFacts.value ];
TypeFacts.NonEmptyStringFacts = wrapped( 'NonEmptyStringFacts', TypeFacts.BaseStringFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NonEmptyStringFacts.value ] = typeof TypeFacts[ +TypeFacts.NonEmptyStringFacts.value ] !== 'number' ? named( 'NonEmptyStringFacts' ) : TypeFacts[ +TypeFacts.NonEmptyStringFacts.value ];
TypeFacts.BaseNumberStrictFacts = wrapped( 'BaseNumberStrictFacts', TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull );
TypeFacts[ +TypeFacts.BaseNumberStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseNumberStrictFacts.value ] !== 'number' ? named( 'BaseNumberStrictFacts' ) : TypeFacts[ +TypeFacts.BaseNumberStrictFacts.value ];
TypeFacts.BaseNumberFacts = wrapped( 'BaseNumberFacts', TypeFacts.BaseNumberStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.BaseNumberFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseNumberFacts.value ] !== 'number' ? named( 'BaseNumberFacts' ) : TypeFacts[ +TypeFacts.BaseNumberFacts.value ];
TypeFacts.NumberStrictFacts = wrapped( 'NumberStrictFacts', TypeFacts.BaseNumberStrictFacts | TypeFacts.Truthy | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.NumberStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.NumberStrictFacts.value ] !== 'number' ? named( 'NumberStrictFacts' ) : TypeFacts[ +TypeFacts.NumberStrictFacts.value ];
TypeFacts.NumberFacts = wrapped( 'NumberFacts', TypeFacts.BaseNumberFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NumberFacts.value ] = typeof TypeFacts[ +TypeFacts.NumberFacts.value ] !== 'number' ? named( 'NumberFacts' ) : TypeFacts[ +TypeFacts.NumberFacts.value ];
TypeFacts.ZeroStrictFacts = wrapped( 'ZeroStrictFacts', TypeFacts.BaseNumberStrictFacts | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.ZeroStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.ZeroStrictFacts.value ] !== 'number' ? named( 'ZeroStrictFacts' ) : TypeFacts[ +TypeFacts.ZeroStrictFacts.value ];
TypeFacts.ZeroFacts = wrapped( 'ZeroFacts', +TypeFacts.BaseNumberFacts );
TypeFacts[ +TypeFacts.ZeroFacts.value ] = typeof TypeFacts[ +TypeFacts.ZeroFacts.value ] !== 'number' ? named( 'ZeroFacts' ) : TypeFacts[ +TypeFacts.ZeroFacts.value ];
TypeFacts.NonZeroStrictFacts = wrapped( 'NonZeroStrictFacts', TypeFacts.BaseNumberStrictFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NonZeroStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.NonZeroStrictFacts.value ] !== 'number' ? named( 'NonZeroStrictFacts' ) : TypeFacts[ +TypeFacts.NonZeroStrictFacts.value ];
TypeFacts.NonZeroFacts = wrapped( 'NonZeroFacts', TypeFacts.BaseNumberFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NonZeroFacts.value ] = typeof TypeFacts[ +TypeFacts.NonZeroFacts.value ] !== 'number' ? named( 'NonZeroFacts' ) : TypeFacts[ +TypeFacts.NonZeroFacts.value ];
TypeFacts.BaseBooleanStrictFacts = wrapped( 'BaseBooleanStrictFacts', TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull );
TypeFacts[ +TypeFacts.BaseBooleanStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseBooleanStrictFacts.value ] !== 'number' ? named( 'BaseBooleanStrictFacts' ) : TypeFacts[ +TypeFacts.BaseBooleanStrictFacts.value ];
TypeFacts.BaseBooleanFacts = wrapped( 'BaseBooleanFacts', TypeFacts.BaseBooleanStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.BaseBooleanFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseBooleanFacts.value ] !== 'number' ? named( 'BaseBooleanFacts' ) : TypeFacts[ +TypeFacts.BaseBooleanFacts.value ];
TypeFacts.BooleanStrictFacts = wrapped( 'BooleanStrictFacts', TypeFacts.BaseBooleanStrictFacts | TypeFacts.Truthy | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.BooleanStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.BooleanStrictFacts.value ] !== 'number' ? named( 'BooleanStrictFacts' ) : TypeFacts[ +TypeFacts.BooleanStrictFacts.value ];
TypeFacts.BooleanFacts = wrapped( 'BooleanFacts', TypeFacts.BaseBooleanFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.BooleanFacts.value ] = typeof TypeFacts[ +TypeFacts.BooleanFacts.value ] !== 'number' ? named( 'BooleanFacts' ) : TypeFacts[ +TypeFacts.BooleanFacts.value ];
TypeFacts.FalseStrictFacts = wrapped( 'FalseStrictFacts', TypeFacts.BaseBooleanStrictFacts | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.FalseStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.FalseStrictFacts.value ] !== 'number' ? named( 'FalseStrictFacts' ) : TypeFacts[ +TypeFacts.FalseStrictFacts.value ];
TypeFacts.FalseFacts = wrapped( 'FalseFacts', +TypeFacts.BaseBooleanFacts );
TypeFacts[ +TypeFacts.FalseFacts.value ] = typeof TypeFacts[ +TypeFacts.FalseFacts.value ] !== 'number' ? named( 'FalseFacts' ) : TypeFacts[ +TypeFacts.FalseFacts.value ];
TypeFacts.TrueStrictFacts = wrapped( 'TrueStrictFacts', TypeFacts.BaseBooleanStrictFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.TrueStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.TrueStrictFacts.value ] !== 'number' ? named( 'TrueStrictFacts' ) : TypeFacts[ +TypeFacts.TrueStrictFacts.value ];
TypeFacts.TrueFacts = wrapped( 'TrueFacts', TypeFacts.BaseBooleanFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.TrueFacts.value ] = typeof TypeFacts[ +TypeFacts.TrueFacts.value ] !== 'number' ? named( 'TrueFacts' ) : TypeFacts[ +TypeFacts.TrueFacts.value ];
TypeFacts.SymbolStrictFacts = wrapped( 'SymbolStrictFacts', TypeFacts.TypeofEQSymbol | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.SymbolStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.SymbolStrictFacts.value ] !== 'number' ? named( 'SymbolStrictFacts' ) : TypeFacts[ +TypeFacts.SymbolStrictFacts.value ];
TypeFacts.SymbolFacts = wrapped( 'SymbolFacts', TypeFacts.SymbolStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.SymbolFacts.value ] = typeof TypeFacts[ +TypeFacts.SymbolFacts.value ] !== 'number' ? named( 'SymbolFacts' ) : TypeFacts[ +TypeFacts.SymbolFacts.value ];
TypeFacts.ObjectStrictFacts = wrapped( 'ObjectStrictFacts', TypeFacts.TypeofEQObject | TypeFacts.TypeofEQHostObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEFunction | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.ObjectStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.ObjectStrictFacts.value ] !== 'number' ? named( 'ObjectStrictFacts' ) : TypeFacts[ +TypeFacts.ObjectStrictFacts.value ];
TypeFacts.ObjectFacts = wrapped( 'ObjectFacts', TypeFacts.ObjectStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.ObjectFacts.value ] = typeof TypeFacts[ +TypeFacts.ObjectFacts.value ] !== 'number' ? named( 'ObjectFacts' ) : TypeFacts[ +TypeFacts.ObjectFacts.value ];
TypeFacts.FunctionStrictFacts = wrapped( 'FunctionStrictFacts', TypeFacts.TypeofEQFunction | TypeFacts.TypeofEQHostObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.FunctionStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.FunctionStrictFacts.value ] !== 'number' ? named( 'FunctionStrictFacts' ) : TypeFacts[ +TypeFacts.FunctionStrictFacts.value ];
TypeFacts.FunctionFacts = wrapped( 'FunctionFacts', TypeFacts.FunctionStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.FunctionFacts.value ] = typeof TypeFacts[ +TypeFacts.FunctionFacts.value ] !== 'number' ? named( 'FunctionFacts' ) : TypeFacts[ +TypeFacts.FunctionFacts.value ];
TypeFacts.UndefinedFacts = wrapped( 'UndefinedFacts', TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.EQUndefined | TypeFacts.EQUndefinedOrNull | TypeFacts.NENull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.UndefinedFacts.value ] = typeof TypeFacts[ +TypeFacts.UndefinedFacts.value ] !== 'number' ? named( 'UndefinedFacts' ) : TypeFacts[ +TypeFacts.UndefinedFacts.value ];
TypeFacts.NullFacts = wrapped( 'NullFacts', TypeFacts.TypeofEQObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.NEUndefined | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.NullFacts.value ] = typeof TypeFacts[ +TypeFacts.NullFacts.value ] !== 'number' ? named( 'NullFacts' ) : TypeFacts[ +TypeFacts.NullFacts.value ];

TypeFacts = Object.create( tmp = templ(), TypeFacts );
tmp.asString = asString( TypeFacts );

/** *********************************************************************************************************************
 * @enum
 * @name TypeSystemPropertyName
 ************************************************************************************************************************/
let TypeSystemPropertyName = {};
TypeSystemPropertyName.Type = wrapped( 'Type', 1 );
TypeSystemPropertyName[ +TypeSystemPropertyName.Type.value ] = typeof TypeSystemPropertyName[ +TypeSystemPropertyName.Type.value ] !== 'number' ? named( 'Type' ) : TypeSystemPropertyName[ +TypeSystemPropertyName.Type.value ];
TypeSystemPropertyName.ResolvedBaseConstructorType = wrapped( 'ResolvedBaseConstructorType', 2 );
TypeSystemPropertyName[ +TypeSystemPropertyName.ResolvedBaseConstructorType.value ] = typeof TypeSystemPropertyName[ +TypeSystemPropertyName.ResolvedBaseConstructorType.value ] !== 'number' ? named( 'ResolvedBaseConstructorType' ) : TypeSystemPropertyName[ +TypeSystemPropertyName.ResolvedBaseConstructorType.value ];
TypeSystemPropertyName.DeclaredType = wrapped( 'DeclaredType', 3 );
TypeSystemPropertyName[ +TypeSystemPropertyName.DeclaredType.value ] = typeof TypeSystemPropertyName[ +TypeSystemPropertyName.DeclaredType.value ] !== 'number' ? named( 'DeclaredType' ) : TypeSystemPropertyName[ +TypeSystemPropertyName.DeclaredType.value ];
TypeSystemPropertyName.ResolvedReturnType = wrapped( 'ResolvedReturnType', 4 );
TypeSystemPropertyName[ +TypeSystemPropertyName.ResolvedReturnType.value ] = typeof TypeSystemPropertyName[ +TypeSystemPropertyName.ResolvedReturnType.value ] !== 'number' ? named( 'ResolvedReturnType' ) : TypeSystemPropertyName[ +TypeSystemPropertyName.ResolvedReturnType.value ];
TypeSystemPropertyName.ResolvedBaseConstraint = wrapped( 'ResolvedBaseConstraint', 5 );
TypeSystemPropertyName[ +TypeSystemPropertyName.ResolvedBaseConstraint.value ] = typeof TypeSystemPropertyName[ +TypeSystemPropertyName.ResolvedBaseConstraint.value ] !== 'number' ? named( 'ResolvedBaseConstraint' ) : TypeSystemPropertyName[ +TypeSystemPropertyName.ResolvedBaseConstraint.value ];

TypeSystemPropertyName = Object.create( tmp = templ(), TypeSystemPropertyName );
tmp.asString = asString( TypeSystemPropertyName );

/** *********************************************************************************************************************
 * @enum
 * @name CheckMode
 ************************************************************************************************************************/
let CheckMode = {};
CheckMode.Normal = wrapped( 'Normal', 0 );
CheckMode[ +CheckMode.Normal.value ] = typeof CheckMode[ +CheckMode.Normal.value ] !== 'number' ? named( 'Normal' ) : CheckMode[ +CheckMode.Normal.value ];
CheckMode.SkipContextSensitive = wrapped( 'SkipContextSensitive', 1 );
CheckMode[ +CheckMode.SkipContextSensitive.value ] = typeof CheckMode[ +CheckMode.SkipContextSensitive.value ] !== 'number' ? named( 'SkipContextSensitive' ) : CheckMode[ +CheckMode.SkipContextSensitive.value ];
CheckMode.Inferential = wrapped( 'Inferential', 2 );
CheckMode[ +CheckMode.Inferential.value ] = typeof CheckMode[ +CheckMode.Inferential.value ] !== 'number' ? named( 'Inferential' ) : CheckMode[ +CheckMode.Inferential.value ];
CheckMode.Contextual = wrapped( 'Contextual', 3 );
CheckMode[ +CheckMode.Contextual.value ] = typeof CheckMode[ +CheckMode.Contextual.value ] !== 'number' ? named( 'Contextual' ) : CheckMode[ +CheckMode.Contextual.value ];

CheckMode = Object.create( tmp = templ(), CheckMode );
tmp.asString = asString( CheckMode );

/** *********************************************************************************************************************
 * @enum
 * @name CallbackCheck
 ************************************************************************************************************************/
let CallbackCheck = {};
CallbackCheck.None = wrapped( 'None', 1 );
CallbackCheck[ +CallbackCheck.None.value ] = typeof CallbackCheck[ +CallbackCheck.None.value ] !== 'number' ? named( 'None' ) : CallbackCheck[ +CallbackCheck.None.value ];
CallbackCheck.Bivariant = wrapped( 'Bivariant', 2 );
CallbackCheck[ +CallbackCheck.Bivariant.value ] = typeof CallbackCheck[ +CallbackCheck.Bivariant.value ] !== 'number' ? named( 'Bivariant' ) : CallbackCheck[ +CallbackCheck.Bivariant.value ];
CallbackCheck.Strict = wrapped( 'Strict', 3 );
CallbackCheck[ +CallbackCheck.Strict.value ] = typeof CallbackCheck[ +CallbackCheck.Strict.value ] !== 'number' ? named( 'Strict' ) : CallbackCheck[ +CallbackCheck.Strict.value ];

CallbackCheck = Object.create( tmp = templ(), CallbackCheck );
tmp.asString = asString( CallbackCheck );

/** *********************************************************************************************************************
 * @enum
 * @name MappedTypeModifiers
 ************************************************************************************************************************/
let MappedTypeModifiers = {};
MappedTypeModifiers.IncludeReadonly = wrapped( 'IncludeReadonly', 1 << 0 );
MappedTypeModifiers[ +MappedTypeModifiers.IncludeReadonly.value ] = typeof MappedTypeModifiers[ +MappedTypeModifiers.IncludeReadonly.value ] !== 'number' ? named( 'IncludeReadonly' ) : MappedTypeModifiers[ +MappedTypeModifiers.IncludeReadonly.value ];
MappedTypeModifiers.ExcludeReadonly = wrapped( 'ExcludeReadonly', 1 << 1 );
MappedTypeModifiers[ +MappedTypeModifiers.ExcludeReadonly.value ] = typeof MappedTypeModifiers[ +MappedTypeModifiers.ExcludeReadonly.value ] !== 'number' ? named( 'ExcludeReadonly' ) : MappedTypeModifiers[ +MappedTypeModifiers.ExcludeReadonly.value ];
MappedTypeModifiers.IncludeOptional = wrapped( 'IncludeOptional', 1 << 2 );
MappedTypeModifiers[ +MappedTypeModifiers.IncludeOptional.value ] = typeof MappedTypeModifiers[ +MappedTypeModifiers.IncludeOptional.value ] !== 'number' ? named( 'IncludeOptional' ) : MappedTypeModifiers[ +MappedTypeModifiers.IncludeOptional.value ];
MappedTypeModifiers.ExcludeOptional = wrapped( 'ExcludeOptional', 1 << 3 );
MappedTypeModifiers[ +MappedTypeModifiers.ExcludeOptional.value ] = typeof MappedTypeModifiers[ +MappedTypeModifiers.ExcludeOptional.value ] !== 'number' ? named( 'ExcludeOptional' ) : MappedTypeModifiers[ +MappedTypeModifiers.ExcludeOptional.value ];

MappedTypeModifiers = Object.create( tmp = templ(), MappedTypeModifiers );
tmp.asString = asString( MappedTypeModifiers );

/** *********************************************************************************************************************
 * @enum
 * @name ExpandingFlags
 ************************************************************************************************************************/
let ExpandingFlags = {};
ExpandingFlags.None = wrapped( 'None', 0 );
ExpandingFlags[ +ExpandingFlags.None.value ] = typeof ExpandingFlags[ +ExpandingFlags.None.value ] !== 'number' ? named( 'None' ) : ExpandingFlags[ +ExpandingFlags.None.value ];
ExpandingFlags.Source = wrapped( 'Source', 1 );
ExpandingFlags[ +ExpandingFlags.Source.value ] = typeof ExpandingFlags[ +ExpandingFlags.Source.value ] !== 'number' ? named( 'Source' ) : ExpandingFlags[ +ExpandingFlags.Source.value ];
ExpandingFlags.Target = wrapped( 'Target', 1 << 1 );
ExpandingFlags[ +ExpandingFlags.Target.value ] = typeof ExpandingFlags[ +ExpandingFlags.Target.value ] !== 'number' ? named( 'Target' ) : ExpandingFlags[ +ExpandingFlags.Target.value ];
ExpandingFlags.Both = wrapped( 'Both', ExpandingFlags.Source | ExpandingFlags.Target );
ExpandingFlags[ +ExpandingFlags.Both.value ] = typeof ExpandingFlags[ +ExpandingFlags.Both.value ] !== 'number' ? named( 'Both' ) : ExpandingFlags[ +ExpandingFlags.Both.value ];

ExpandingFlags = Object.create( tmp = templ(), ExpandingFlags );
tmp.asString = asString( ExpandingFlags );

/** *********************************************************************************************************************
 * @enum
 * @name TypeIncludes
 ************************************************************************************************************************/
let TypeIncludes = {};
TypeIncludes.Any = wrapped( 'Any', 1 << 0 );
TypeIncludes[ +TypeIncludes.Any.value ] = typeof TypeIncludes[ +TypeIncludes.Any.value ] !== 'number' ? named( 'Any' ) : TypeIncludes[ +TypeIncludes.Any.value ];
TypeIncludes.Undefined = wrapped( 'Undefined', 1 << 1 );
TypeIncludes[ +TypeIncludes.Undefined.value ] = typeof TypeIncludes[ +TypeIncludes.Undefined.value ] !== 'number' ? named( 'Undefined' ) : TypeIncludes[ +TypeIncludes.Undefined.value ];
TypeIncludes.Null = wrapped( 'Null', 1 << 2 );
TypeIncludes[ +TypeIncludes.Null.value ] = typeof TypeIncludes[ +TypeIncludes.Null.value ] !== 'number' ? named( 'Null' ) : TypeIncludes[ +TypeIncludes.Null.value ];
TypeIncludes.Never = wrapped( 'Never', 1 << 3 );
TypeIncludes[ +TypeIncludes.Never.value ] = typeof TypeIncludes[ +TypeIncludes.Never.value ] !== 'number' ? named( 'Never' ) : TypeIncludes[ +TypeIncludes.Never.value ];
TypeIncludes.NonWideningType = wrapped( 'NonWideningType', 1 << 4 );
TypeIncludes[ +TypeIncludes.NonWideningType.value ] = typeof TypeIncludes[ +TypeIncludes.NonWideningType.value ] !== 'number' ? named( 'NonWideningType' ) : TypeIncludes[ +TypeIncludes.NonWideningType.value ];
TypeIncludes.String = wrapped( 'String', 1 << 5 );
TypeIncludes[ +TypeIncludes.String.value ] = typeof TypeIncludes[ +TypeIncludes.String.value ] !== 'number' ? named( 'String' ) : TypeIncludes[ +TypeIncludes.String.value ];
TypeIncludes.Number = wrapped( 'Number', 1 << 6 );
TypeIncludes[ +TypeIncludes.Number.value ] = typeof TypeIncludes[ +TypeIncludes.Number.value ] !== 'number' ? named( 'Number' ) : TypeIncludes[ +TypeIncludes.Number.value ];
TypeIncludes.ESSymbol = wrapped( 'ESSymbol', 1 << 7 );
TypeIncludes[ +TypeIncludes.ESSymbol.value ] = typeof TypeIncludes[ +TypeIncludes.ESSymbol.value ] !== 'number' ? named( 'ESSymbol' ) : TypeIncludes[ +TypeIncludes.ESSymbol.value ];
TypeIncludes.LiteralOrUniqueESSymbol = wrapped( 'LiteralOrUniqueESSymbol', 1 << 8 );
TypeIncludes[ +TypeIncludes.LiteralOrUniqueESSymbol.value ] = typeof TypeIncludes[ +TypeIncludes.LiteralOrUniqueESSymbol.value ] !== 'number' ? named( 'LiteralOrUniqueESSymbol' ) : TypeIncludes[ +TypeIncludes.LiteralOrUniqueESSymbol.value ];
TypeIncludes.ObjectType = wrapped( 'ObjectType', 1 << 9 );
TypeIncludes[ +TypeIncludes.ObjectType.value ] = typeof TypeIncludes[ +TypeIncludes.ObjectType.value ] !== 'number' ? named( 'ObjectType' ) : TypeIncludes[ +TypeIncludes.ObjectType.value ];
TypeIncludes.EmptyObject = wrapped( 'EmptyObject', 1 << 10 );
TypeIncludes[ +TypeIncludes.EmptyObject.value ] = typeof TypeIncludes[ +TypeIncludes.EmptyObject.value ] !== 'number' ? named( 'EmptyObject' ) : TypeIncludes[ +TypeIncludes.EmptyObject.value ];
TypeIncludes.Union = wrapped( 'Union', 1 << 11 );
TypeIncludes[ +TypeIncludes.Union.value ] = typeof TypeIncludes[ +TypeIncludes.Union.value ] !== 'number' ? named( 'Union' ) : TypeIncludes[ +TypeIncludes.Union.value ];
TypeIncludes.Wildcard = wrapped( 'Wildcard', 1 << 12 );
TypeIncludes[ +TypeIncludes.Wildcard.value ] = typeof TypeIncludes[ +TypeIncludes.Wildcard.value ] !== 'number' ? named( 'Wildcard' ) : TypeIncludes[ +TypeIncludes.Wildcard.value ];

TypeIncludes = Object.create( tmp = templ(), TypeIncludes );
tmp.asString = asString( TypeIncludes );

/** *********************************************************************************************************************
 * @enum
 * @name MembersOrExportsResolutionKind
 ************************************************************************************************************************/
let MembersOrExportsResolutionKind = {};
MembersOrExportsResolutionKind.resolvedExports = wrapped( 'resolvedExports', "resolvedMembersOrExportsResolutionKind.Exports" );
MembersOrExportsResolutionKind[ +MembersOrExportsResolutionKind.resolvedExports.value ] = typeof MembersOrExportsResolutionKind[ +MembersOrExportsResolutionKind.resolvedExports.value ] !== 'number' ? named( 'resolvedExports' ) : MembersOrExportsResolutionKind[ +MembersOrExportsResolutionKind.resolvedExports.value ];
MembersOrExportsResolutionKind.resolvedMembers = wrapped( 'resolvedMembers', "resolvedMembersOrExportsResolutionKind.Members" );
MembersOrExportsResolutionKind[ +MembersOrExportsResolutionKind.resolvedMembers.value ] = typeof MembersOrExportsResolutionKind[ +MembersOrExportsResolutionKind.resolvedMembers.value ] !== 'number' ? named( 'resolvedMembers' ) : MembersOrExportsResolutionKind[ +MembersOrExportsResolutionKind.resolvedMembers.value ];

MembersOrExportsResolutionKind = Object.create( tmp = templ(), MembersOrExportsResolutionKind );
tmp.asString = asString( MembersOrExportsResolutionKind );

/** *********************************************************************************************************************
 * @enum
 * @name Declaration
 ************************************************************************************************************************/
let Declaration = {};
Declaration.Getter = wrapped( 'Getter', 1 );
Declaration[ +Declaration.Getter.value ] = typeof Declaration[ +Declaration.Getter.value ] !== 'number' ? named( 'Getter' ) : Declaration[ +Declaration.Getter.value ];
Declaration.Setter = wrapped( 'Setter', 2 );
Declaration[ +Declaration.Setter.value ] = typeof Declaration[ +Declaration.Setter.value ] !== 'number' ? named( 'Setter' ) : Declaration[ +Declaration.Setter.value ];
Declaration.Method = wrapped( 'Method', 4 );
Declaration[ +Declaration.Method.value ] = typeof Declaration[ +Declaration.Method.value ] !== 'number' ? named( 'Method' ) : Declaration[ +Declaration.Method.value ];
Declaration.Property = wrapped( 'Property', Declaration.Getter | Declaration.Setter );
Declaration[ +Declaration.Property.value ] = typeof Declaration[ +Declaration.Property.value ] !== 'number' ? named( 'Property' ) : Declaration[ +Declaration.Property.value ];

Declaration = Object.create( tmp = templ(), Declaration );
tmp.asString = asString( Declaration );

/** *********************************************************************************************************************
 * @enum
 * @name DeclarationSpaces
 ************************************************************************************************************************/
let DeclarationSpaces = {};
DeclarationSpaces.None = wrapped( 'None', 0 );
DeclarationSpaces[ +DeclarationSpaces.None.value ] = typeof DeclarationSpaces[ +DeclarationSpaces.None.value ] !== 'number' ? named( 'None' ) : DeclarationSpaces[ +DeclarationSpaces.None.value ];
DeclarationSpaces.ExportValue = wrapped( 'ExportValue', 1 << 0 );
DeclarationSpaces[ +DeclarationSpaces.ExportValue.value ] = typeof DeclarationSpaces[ +DeclarationSpaces.ExportValue.value ] !== 'number' ? named( 'ExportValue' ) : DeclarationSpaces[ +DeclarationSpaces.ExportValue.value ];
DeclarationSpaces.ExportType = wrapped( 'ExportType', 1 << 1 );
DeclarationSpaces[ +DeclarationSpaces.ExportType.value ] = typeof DeclarationSpaces[ +DeclarationSpaces.ExportType.value ] !== 'number' ? named( 'ExportType' ) : DeclarationSpaces[ +DeclarationSpaces.ExportType.value ];
DeclarationSpaces.ExportNamespace = wrapped( 'ExportNamespace', 1 << 2 );
DeclarationSpaces[ +DeclarationSpaces.ExportNamespace.value ] = typeof DeclarationSpaces[ +DeclarationSpaces.ExportNamespace.value ] !== 'number' ? named( 'ExportNamespace' ) : DeclarationSpaces[ +DeclarationSpaces.ExportNamespace.value ];

DeclarationSpaces = Object.create( tmp = templ(), DeclarationSpaces );
tmp.asString = asString( DeclarationSpaces );

/** *********************************************************************************************************************
 * @enum
 * @name Flags
 ************************************************************************************************************************/
let Flags = {};
Flags.Property = wrapped( 'Property', 1 );
Flags[ +Flags.Property.value ] = typeof Flags[ +Flags.Property.value ] !== 'number' ? named( 'Property' ) : Flags[ +Flags.Property.value ];
Flags.GetAccessor = wrapped( 'GetAccessor', 2 );
Flags[ +Flags.GetAccessor.value ] = typeof Flags[ +Flags.GetAccessor.value ] !== 'number' ? named( 'GetAccessor' ) : Flags[ +Flags.GetAccessor.value ];
Flags.SetAccessor = wrapped( 'SetAccessor', 4 );
Flags[ +Flags.SetAccessor.value ] = typeof Flags[ +Flags.SetAccessor.value ] !== 'number' ? named( 'SetAccessor' ) : Flags[ +Flags.SetAccessor.value ];
Flags.GetOrSetAccessor = wrapped( 'GetOrSetAccessor', Flags.GetAccessor | Flags.SetAccessor );
Flags[ +Flags.GetOrSetAccessor.value ] = typeof Flags[ +Flags.GetOrSetAccessor.value ] !== 'number' ? named( 'GetOrSetAccessor' ) : Flags[ +Flags.GetOrSetAccessor.value ];

Flags = Object.create( tmp = templ(), Flags );
tmp.asString = asString( Flags );

/** *********************************************************************************************************************
 * Enums extracted from /mnt/e/code/typescript/src/compiler/binder.ts
 ************************************************************************************************************************/

/** *********************************************************************************************************************
 * @enum
 * @name ModuleInstanceState
 ************************************************************************************************************************/
let ModuleInstanceState = {};
ModuleInstanceState.NonInstantiated = wrapped( 'NonInstantiated', 0 );
ModuleInstanceState[ +ModuleInstanceState.NonInstantiated.value ] = typeof ModuleInstanceState[ +ModuleInstanceState.NonInstantiated.value ] !== 'number' ? named( 'NonInstantiated' ) : ModuleInstanceState[ +ModuleInstanceState.NonInstantiated.value ];
ModuleInstanceState.Instantiated = wrapped( 'Instantiated', 1 );
ModuleInstanceState[ +ModuleInstanceState.Instantiated.value ] = typeof ModuleInstanceState[ +ModuleInstanceState.Instantiated.value ] !== 'number' ? named( 'Instantiated' ) : ModuleInstanceState[ +ModuleInstanceState.Instantiated.value ];
ModuleInstanceState.ConstEnumOnly = wrapped( 'ConstEnumOnly', 2 );
ModuleInstanceState[ +ModuleInstanceState.ConstEnumOnly.value ] = typeof ModuleInstanceState[ +ModuleInstanceState.ConstEnumOnly.value ] !== 'number' ? named( 'ConstEnumOnly' ) : ModuleInstanceState[ +ModuleInstanceState.ConstEnumOnly.value ];

ModuleInstanceState = Object.create( tmp = templ(), ModuleInstanceState );
tmp.asString = asString( ModuleInstanceState );

/** *********************************************************************************************************************
 * @enum
 * @name ContainerFlags
 ************************************************************************************************************************/
let ContainerFlags = {};
ContainerFlags.None = wrapped( 'None', 0 );
ContainerFlags[ +ContainerFlags.None.value ] = typeof ContainerFlags[ +ContainerFlags.None.value ] !== 'number' ? named( 'None' ) : ContainerFlags[ +ContainerFlags.None.value ];
ContainerFlags.IsContainer = wrapped( 'IsContainer', 1 << 0 );
ContainerFlags[ +ContainerFlags.IsContainer.value ] = typeof ContainerFlags[ +ContainerFlags.IsContainer.value ] !== 'number' ? named( 'IsContainer' ) : ContainerFlags[ +ContainerFlags.IsContainer.value ];
ContainerFlags.IsBlockScopedContainer = wrapped( 'IsBlockScopedContainer', 1 << 1 );
ContainerFlags[ +ContainerFlags.IsBlockScopedContainer.value ] = typeof ContainerFlags[ +ContainerFlags.IsBlockScopedContainer.value ] !== 'number' ? named( 'IsBlockScopedContainer' ) : ContainerFlags[ +ContainerFlags.IsBlockScopedContainer.value ];
ContainerFlags.IsControlFlowContainer = wrapped( 'IsControlFlowContainer', 1 << 2 );
ContainerFlags[ +ContainerFlags.IsControlFlowContainer.value ] = typeof ContainerFlags[ +ContainerFlags.IsControlFlowContainer.value ] !== 'number' ? named( 'IsControlFlowContainer' ) : ContainerFlags[ +ContainerFlags.IsControlFlowContainer.value ];
ContainerFlags.IsFunctionLike = wrapped( 'IsFunctionLike', 1 << 3 );
ContainerFlags[ +ContainerFlags.IsFunctionLike.value ] = typeof ContainerFlags[ +ContainerFlags.IsFunctionLike.value ] !== 'number' ? named( 'IsFunctionLike' ) : ContainerFlags[ +ContainerFlags.IsFunctionLike.value ];
ContainerFlags.IsFunctionExpression = wrapped( 'IsFunctionExpression', 1 << 4 );
ContainerFlags[ +ContainerFlags.IsFunctionExpression.value ] = typeof ContainerFlags[ +ContainerFlags.IsFunctionExpression.value ] !== 'number' ? named( 'IsFunctionExpression' ) : ContainerFlags[ +ContainerFlags.IsFunctionExpression.value ];
ContainerFlags.HasLocals = wrapped( 'HasLocals', 1 << 5 );
ContainerFlags[ +ContainerFlags.HasLocals.value ] = typeof ContainerFlags[ +ContainerFlags.HasLocals.value ] !== 'number' ? named( 'HasLocals' ) : ContainerFlags[ +ContainerFlags.HasLocals.value ];
ContainerFlags.IsInterface = wrapped( 'IsInterface', 1 << 6 );
ContainerFlags[ +ContainerFlags.IsInterface.value ] = typeof ContainerFlags[ +ContainerFlags.IsInterface.value ] !== 'number' ? named( 'IsInterface' ) : ContainerFlags[ +ContainerFlags.IsInterface.value ];
ContainerFlags.IsObjectLiteralOrClassExpressionMethod = wrapped( 'IsObjectLiteralOrClassExpressionMethod', 1 << 7 );
ContainerFlags[ +ContainerFlags.IsObjectLiteralOrClassExpressionMethod.value ] = typeof ContainerFlags[ +ContainerFlags.IsObjectLiteralOrClassExpressionMethod.value ] !== 'number' ? named( 'IsObjectLiteralOrClassExpressionMethod' ) : ContainerFlags[ +ContainerFlags.IsObjectLiteralOrClassExpressionMethod.value ];
ContainerFlags.IsInferenceContainer = wrapped( 'IsInferenceContainer', 1 << 8 );
ContainerFlags[ +ContainerFlags.IsInferenceContainer.value ] = typeof ContainerFlags[ +ContainerFlags.IsInferenceContainer.value ] !== 'number' ? named( 'IsInferenceContainer' ) : ContainerFlags[ +ContainerFlags.IsInferenceContainer.value ];

ContainerFlags = Object.create( tmp = templ(), ContainerFlags );
tmp.asString = asString( ContainerFlags );

/** *********************************************************************************************************************
 * @enum
 * @name ElementKind
 ************************************************************************************************************************/
let ElementKind = {};
ElementKind.Property = wrapped( 'Property', 1 );
ElementKind[ +ElementKind.Property.value ] = typeof ElementKind[ +ElementKind.Property.value ] !== 'number' ? named( 'Property' ) : ElementKind[ +ElementKind.Property.value ];
ElementKind.Accessor = wrapped( 'Accessor', 2 );
ElementKind[ +ElementKind.Accessor.value ] = typeof ElementKind[ +ElementKind.Accessor.value ] !== 'number' ? named( 'Accessor' ) : ElementKind[ +ElementKind.Accessor.value ];

ElementKind = Object.create( tmp = templ(), ElementKind );
tmp.asString = asString( ElementKind );

/** *********************************************************************************************************************
 * Enums extracted from /mnt/e/code/typescript/src/compiler/parser.ts
 ************************************************************************************************************************/

/** *********************************************************************************************************************
 * @enum
 * @name SignatureFlags
 ************************************************************************************************************************/
let SignatureFlags = {};
SignatureFlags.None = wrapped( 'None', 0 );
SignatureFlags[ +SignatureFlags.None.value ] = typeof SignatureFlags[ +SignatureFlags.None.value ] !== 'number' ? named( 'None' ) : SignatureFlags[ +SignatureFlags.None.value ];
SignatureFlags.Yield = wrapped( 'Yield', 1 << 0 );
SignatureFlags[ +SignatureFlags.Yield.value ] = typeof SignatureFlags[ +SignatureFlags.Yield.value ] !== 'number' ? named( 'Yield' ) : SignatureFlags[ +SignatureFlags.Yield.value ];
SignatureFlags.Await = wrapped( 'Await', 1 << 1 );
SignatureFlags[ +SignatureFlags.Await.value ] = typeof SignatureFlags[ +SignatureFlags.Await.value ] !== 'number' ? named( 'Await' ) : SignatureFlags[ +SignatureFlags.Await.value ];
SignatureFlags.Type = wrapped( 'Type', 1 << 2 );
SignatureFlags[ +SignatureFlags.Type.value ] = typeof SignatureFlags[ +SignatureFlags.Type.value ] !== 'number' ? named( 'Type' ) : SignatureFlags[ +SignatureFlags.Type.value ];
SignatureFlags.RequireCompleteParameterList = wrapped( 'RequireCompleteParameterList', 1 << 3 );
SignatureFlags[ +SignatureFlags.RequireCompleteParameterList.value ] = typeof SignatureFlags[ +SignatureFlags.RequireCompleteParameterList.value ] !== 'number' ? named( 'RequireCompleteParameterList' ) : SignatureFlags[ +SignatureFlags.RequireCompleteParameterList.value ];
SignatureFlags.IgnoreMissingOpenBrace = wrapped( 'IgnoreMissingOpenBrace', 1 << 4 );
SignatureFlags[ +SignatureFlags.IgnoreMissingOpenBrace.value ] = typeof SignatureFlags[ +SignatureFlags.IgnoreMissingOpenBrace.value ] !== 'number' ? named( 'IgnoreMissingOpenBrace' ) : SignatureFlags[ +SignatureFlags.IgnoreMissingOpenBrace.value ];
SignatureFlags.JSDoc = wrapped( 'JSDoc', 1 << 5 );
SignatureFlags[ +SignatureFlags.JSDoc.value ] = typeof SignatureFlags[ +SignatureFlags.JSDoc.value ] !== 'number' ? named( 'JSDoc' ) : SignatureFlags[ +SignatureFlags.JSDoc.value ];

SignatureFlags = Object.create( tmp = templ(), SignatureFlags );
tmp.asString = asString( SignatureFlags );

/** *********************************************************************************************************************
 * @enum
 * @name ParsingContext
 ************************************************************************************************************************/
let ParsingContext = {};
ParsingContext.SourceElements = wrapped( 'SourceElements', 1 );
ParsingContext[ +ParsingContext.SourceElements.value ] = typeof ParsingContext[ +ParsingContext.SourceElements.value ] !== 'number' ? named( 'SourceElements' ) : ParsingContext[ +ParsingContext.SourceElements.value ];
ParsingContext.BlockStatements = wrapped( 'BlockStatements', 2 );
ParsingContext[ +ParsingContext.BlockStatements.value ] = typeof ParsingContext[ +ParsingContext.BlockStatements.value ] !== 'number' ? named( 'BlockStatements' ) : ParsingContext[ +ParsingContext.BlockStatements.value ];
ParsingContext.SwitchClauses = wrapped( 'SwitchClauses', 3 );
ParsingContext[ +ParsingContext.SwitchClauses.value ] = typeof ParsingContext[ +ParsingContext.SwitchClauses.value ] !== 'number' ? named( 'SwitchClauses' ) : ParsingContext[ +ParsingContext.SwitchClauses.value ];
ParsingContext.SwitchClauseStatements = wrapped( 'SwitchClauseStatements', 4 );
ParsingContext[ +ParsingContext.SwitchClauseStatements.value ] = typeof ParsingContext[ +ParsingContext.SwitchClauseStatements.value ] !== 'number' ? named( 'SwitchClauseStatements' ) : ParsingContext[ +ParsingContext.SwitchClauseStatements.value ];
ParsingContext.TypeMembers = wrapped( 'TypeMembers', 5 );
ParsingContext[ +ParsingContext.TypeMembers.value ] = typeof ParsingContext[ +ParsingContext.TypeMembers.value ] !== 'number' ? named( 'TypeMembers' ) : ParsingContext[ +ParsingContext.TypeMembers.value ];
ParsingContext.ClassMembers = wrapped( 'ClassMembers', 6 );
ParsingContext[ +ParsingContext.ClassMembers.value ] = typeof ParsingContext[ +ParsingContext.ClassMembers.value ] !== 'number' ? named( 'ClassMembers' ) : ParsingContext[ +ParsingContext.ClassMembers.value ];
ParsingContext.EnumMembers = wrapped( 'EnumMembers', 7 );
ParsingContext[ +ParsingContext.EnumMembers.value ] = typeof ParsingContext[ +ParsingContext.EnumMembers.value ] !== 'number' ? named( 'EnumMembers' ) : ParsingContext[ +ParsingContext.EnumMembers.value ];
ParsingContext.HeritageClauseElement = wrapped( 'HeritageClauseElement', 8 );
ParsingContext[ +ParsingContext.HeritageClauseElement.value ] = typeof ParsingContext[ +ParsingContext.HeritageClauseElement.value ] !== 'number' ? named( 'HeritageClauseElement' ) : ParsingContext[ +ParsingContext.HeritageClauseElement.value ];
ParsingContext.VariableDeclarations = wrapped( 'VariableDeclarations', 9 );
ParsingContext[ +ParsingContext.VariableDeclarations.value ] = typeof ParsingContext[ +ParsingContext.VariableDeclarations.value ] !== 'number' ? named( 'VariableDeclarations' ) : ParsingContext[ +ParsingContext.VariableDeclarations.value ];
ParsingContext.ObjectBindingElements = wrapped( 'ObjectBindingElements', 10 );
ParsingContext[ +ParsingContext.ObjectBindingElements.value ] = typeof ParsingContext[ +ParsingContext.ObjectBindingElements.value ] !== 'number' ? named( 'ObjectBindingElements' ) : ParsingContext[ +ParsingContext.ObjectBindingElements.value ];
ParsingContext.ArrayBindingElements = wrapped( 'ArrayBindingElements', 11 );
ParsingContext[ +ParsingContext.ArrayBindingElements.value ] = typeof ParsingContext[ +ParsingContext.ArrayBindingElements.value ] !== 'number' ? named( 'ArrayBindingElements' ) : ParsingContext[ +ParsingContext.ArrayBindingElements.value ];
ParsingContext.ArgumentExpressions = wrapped( 'ArgumentExpressions', 12 );
ParsingContext[ +ParsingContext.ArgumentExpressions.value ] = typeof ParsingContext[ +ParsingContext.ArgumentExpressions.value ] !== 'number' ? named( 'ArgumentExpressions' ) : ParsingContext[ +ParsingContext.ArgumentExpressions.value ];
ParsingContext.ObjectLiteralMembers = wrapped( 'ObjectLiteralMembers', 13 );
ParsingContext[ +ParsingContext.ObjectLiteralMembers.value ] = typeof ParsingContext[ +ParsingContext.ObjectLiteralMembers.value ] !== 'number' ? named( 'ObjectLiteralMembers' ) : ParsingContext[ +ParsingContext.ObjectLiteralMembers.value ];
ParsingContext.JsxAttributes = wrapped( 'JsxAttributes', 14 );
ParsingContext[ +ParsingContext.JsxAttributes.value ] = typeof ParsingContext[ +ParsingContext.JsxAttributes.value ] !== 'number' ? named( 'JsxAttributes' ) : ParsingContext[ +ParsingContext.JsxAttributes.value ];
ParsingContext.JsxChildren = wrapped( 'JsxChildren', 15 );
ParsingContext[ +ParsingContext.JsxChildren.value ] = typeof ParsingContext[ +ParsingContext.JsxChildren.value ] !== 'number' ? named( 'JsxChildren' ) : ParsingContext[ +ParsingContext.JsxChildren.value ];
ParsingContext.ArrayLiteralMembers = wrapped( 'ArrayLiteralMembers', 16 );
ParsingContext[ +ParsingContext.ArrayLiteralMembers.value ] = typeof ParsingContext[ +ParsingContext.ArrayLiteralMembers.value ] !== 'number' ? named( 'ArrayLiteralMembers' ) : ParsingContext[ +ParsingContext.ArrayLiteralMembers.value ];
ParsingContext.Parameters = wrapped( 'Parameters', 17 );
ParsingContext[ +ParsingContext.Parameters.value ] = typeof ParsingContext[ +ParsingContext.Parameters.value ] !== 'number' ? named( 'Parameters' ) : ParsingContext[ +ParsingContext.Parameters.value ];
ParsingContext.RestProperties = wrapped( 'RestProperties', 18 );
ParsingContext[ +ParsingContext.RestProperties.value ] = typeof ParsingContext[ +ParsingContext.RestProperties.value ] !== 'number' ? named( 'RestProperties' ) : ParsingContext[ +ParsingContext.RestProperties.value ];
ParsingContext.TypeParameters = wrapped( 'TypeParameters', 19 );
ParsingContext[ +ParsingContext.TypeParameters.value ] = typeof ParsingContext[ +ParsingContext.TypeParameters.value ] !== 'number' ? named( 'TypeParameters' ) : ParsingContext[ +ParsingContext.TypeParameters.value ];
ParsingContext.TypeArguments = wrapped( 'TypeArguments', 20 );
ParsingContext[ +ParsingContext.TypeArguments.value ] = typeof ParsingContext[ +ParsingContext.TypeArguments.value ] !== 'number' ? named( 'TypeArguments' ) : ParsingContext[ +ParsingContext.TypeArguments.value ];
ParsingContext.TupleElementTypes = wrapped( 'TupleElementTypes', 21 );
ParsingContext[ +ParsingContext.TupleElementTypes.value ] = typeof ParsingContext[ +ParsingContext.TupleElementTypes.value ] !== 'number' ? named( 'TupleElementTypes' ) : ParsingContext[ +ParsingContext.TupleElementTypes.value ];
ParsingContext.HeritageClauses = wrapped( 'HeritageClauses', 22 );
ParsingContext[ +ParsingContext.HeritageClauses.value ] = typeof ParsingContext[ +ParsingContext.HeritageClauses.value ] !== 'number' ? named( 'HeritageClauses' ) : ParsingContext[ +ParsingContext.HeritageClauses.value ];
ParsingContext.ImportOrExportSpecifiers = wrapped( 'ImportOrExportSpecifiers', 23 );
ParsingContext[ +ParsingContext.ImportOrExportSpecifiers.value ] = typeof ParsingContext[ +ParsingContext.ImportOrExportSpecifiers.value ] !== 'number' ? named( 'ImportOrExportSpecifiers' ) : ParsingContext[ +ParsingContext.ImportOrExportSpecifiers.value ];

ParsingContext = Object.create( tmp = templ(), ParsingContext );
tmp.asString = asString( ParsingContext );

/** *********************************************************************************************************************
 * @enum
 * @name Tristate
 ************************************************************************************************************************/
let Tristate = {};
Tristate.False = wrapped( 'False', 1 );
Tristate[ +Tristate.False.value ] = typeof Tristate[ +Tristate.False.value ] !== 'number' ? named( 'False' ) : Tristate[ +Tristate.False.value ];
Tristate.True = wrapped( 'True', 2 );
Tristate[ +Tristate.True.value ] = typeof Tristate[ +Tristate.True.value ] !== 'number' ? named( 'True' ) : Tristate[ +Tristate.True.value ];
Tristate.Unknown = wrapped( 'Unknown', 3 );
Tristate[ +Tristate.Unknown.value ] = typeof Tristate[ +Tristate.Unknown.value ] !== 'number' ? named( 'Unknown' ) : Tristate[ +Tristate.Unknown.value ];

Tristate = Object.create( tmp = templ(), Tristate );
tmp.asString = asString( Tristate );

/** *********************************************************************************************************************
 * @enum
 * @name JSDocState
 ************************************************************************************************************************/
let JSDocState = {};
JSDocState.BeginningOfLine = wrapped( 'BeginningOfLine', 1 );
JSDocState[ +JSDocState.BeginningOfLine.value ] = typeof JSDocState[ +JSDocState.BeginningOfLine.value ] !== 'number' ? named( 'BeginningOfLine' ) : JSDocState[ +JSDocState.BeginningOfLine.value ];
JSDocState.SawAsterisk = wrapped( 'SawAsterisk', 2 );
JSDocState[ +JSDocState.SawAsterisk.value ] = typeof JSDocState[ +JSDocState.SawAsterisk.value ] !== 'number' ? named( 'SawAsterisk' ) : JSDocState[ +JSDocState.SawAsterisk.value ];
JSDocState.SavingComments = wrapped( 'SavingComments', 3 );
JSDocState[ +JSDocState.SavingComments.value ] = typeof JSDocState[ +JSDocState.SavingComments.value ] !== 'number' ? named( 'SavingComments' ) : JSDocState[ +JSDocState.SavingComments.value ];

JSDocState = Object.create( tmp = templ(), JSDocState );
tmp.asString = asString( JSDocState );

/** *********************************************************************************************************************
 * @enum
 * @name PropertyLikeParse
 ************************************************************************************************************************/
let PropertyLikeParse = {};
PropertyLikeParse.Property = wrapped( 'Property', 1 );
PropertyLikeParse[ +PropertyLikeParse.Property.value ] = typeof PropertyLikeParse[ +PropertyLikeParse.Property.value ] !== 'number' ? named( 'Property' ) : PropertyLikeParse[ +PropertyLikeParse.Property.value ];
PropertyLikeParse.Parameter = wrapped( 'Parameter', 2 );
PropertyLikeParse[ +PropertyLikeParse.Parameter.value ] = typeof PropertyLikeParse[ +PropertyLikeParse.Parameter.value ] !== 'number' ? named( 'Parameter' ) : PropertyLikeParse[ +PropertyLikeParse.Parameter.value ];

PropertyLikeParse = Object.create( tmp = templ(), PropertyLikeParse );
tmp.asString = asString( PropertyLikeParse );

/** *********************************************************************************************************************
 * @enum
 * @name InvalidPosition
 ************************************************************************************************************************/
let InvalidPosition = {};
InvalidPosition.Value = wrapped( 'Value', -1 );
InvalidPosition[ +InvalidPosition.Value.value ] = typeof InvalidPosition[ +InvalidPosition.Value.value ] !== 'number' ? named( 'Value' ) : InvalidPosition[ +InvalidPosition.Value.value ];

InvalidPosition = Object.create( tmp = templ(), InvalidPosition );
tmp.asString = asString( InvalidPosition );

/** *********************************************************************************************************************
 * Enums extracted from /mnt/e/code/typescript/src/compiler/sys.ts
 ************************************************************************************************************************/

/** *********************************************************************************************************************
 * @enum
 * @name FileSystemEntryKind
 ************************************************************************************************************************/
let FileSystemEntryKind = {};
FileSystemEntryKind.File = wrapped( 'File', 1 );
FileSystemEntryKind[ +FileSystemEntryKind.File.value ] = typeof FileSystemEntryKind[ +FileSystemEntryKind.File.value ] !== 'number' ? named( 'File' ) : FileSystemEntryKind[ +FileSystemEntryKind.File.value ];
FileSystemEntryKind.Directory = wrapped( 'Directory', 2 );
FileSystemEntryKind[ +FileSystemEntryKind.Directory.value ] = typeof FileSystemEntryKind[ +FileSystemEntryKind.Directory.value ] !== 'number' ? named( 'Directory' ) : FileSystemEntryKind[ +FileSystemEntryKind.Directory.value ];

FileSystemEntryKind = Object.create( tmp = templ(), FileSystemEntryKind );
tmp.asString = asString( FileSystemEntryKind );

export {
    Comparison,
    NodeFlags,
    ModifierFlags,
    JsxFlags,
    RelationComparisonResult,
    GeneratedIdentifierFlags,
    TokenFlags,
    FlowFlags,
    StructureIsReused,
    UnionReduction,
    NodeBuilderFlags,
    TypeFormatFlags,
    SymbolFormatFlags,
    SymbolAccessibility,
    SyntheticSymbolKind,
    TypePredicateKind,
    SymbolFlags,
    EnumKind,
    CheckFlags,
    InternalSymbolName,
    NodeCheckFlags,
    TypeFlags,
    ObjectFlags,
    Variance,
    SignatureKind,
    IndexKind,
    InferencePriority,
    InferenceFlags,
    Ternary,
    SpecialPropertyAssignmentKind,
    JsxEmit,
    NewLineKind,
    ScriptKind,
    ScriptTarget,
    LanguageVariant,
    DiagnosticStyle,
    WatchDirectoryFlags,
    Extension,
    TransformFlags,
    EmitFlags,
    ExternalEmitHelpers,
    EmitHint,
    ListFormat,
    PragmaKindFlags,
    TypeFacts,
    TypeSystemPropertyName,
    CheckMode,
    CallbackCheck,
    MappedTypeModifiers,
    ExpandingFlags,
    TypeIncludes,
    MembersOrExportsResolutionKind,
    Declaration,
    DeclarationSpaces,
    Flags,
    ModuleInstanceState,
    ContainerFlags,
    ElementKind,
    SignatureFlags,
    ParsingContext,
    Tristate,
    JSDocState,
    PropertyLikeParse,
    InvalidPosition,
    FileSystemEntryKind
};
