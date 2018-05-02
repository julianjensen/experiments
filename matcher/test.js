/** ******************************************************************************************************************
 * @file Describe what test does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 29-Apr-2018
 *********************************************************************************************************************/
"use strict";

import { matcher, REST, strictMatcher } from "./index";

const
    m1 = matcher()
        .on( 10, x => `It's the number 10: ${x}` )
        .on( "Hello", x => `Someone said 'Hello': ${x}` )
        .on( /^hell/i, x => `Or it's just hell: ${x}` )
        .otherwise( x => `Couldn't match input:` + require( 'util' ).inspect( x ) );


function matcher_test( fn )
{
    const errorType = matcher( x => typeof x === 'number' )     // Optional filter condition
        .on( x => x < 100, "Bad response less than 100" )       // Predicate and result if truthy
        .on( x => x > 100 && x < 200, x => `Informal response number ${x}` )
        .on( x => x >= 200 && x < 300 ).then( "Everything is just fine" )   // If only 1 argument to on() use then() for second argument
        .on( x => x >= 300 && x < 400 ).then( x => `We got bounced to ${x}, bastards` )
        .on( x => x >= 400 && x < 500, "Client messed up" )
        .on( x => x >= 500, x => `Server error ${x}` )
        .otherwise( x => `Bad input, dude, you sent me: ${x}` );    // All conditions fail or the optional filter fails

    const
        results = [
            "Bad response less than 100",
            "Informal response number 110",
            "Everything is just fine",
            "We got bounced to 308, bastards",
            "Client messed up",
            "Server error 500",
            "Server error 510",
            "Bad input, dude, you sent me: 'ola!",
            "Bad input, dude, you sent me: undefined",
            "Bad input, dude, you sent me: null",
            `Bad input, dude, you sent me: ${[]}`,
            `Bad input, dude, you sent me: ${{}}`,
            `Bad input, dude, you sent me: ${() => 'nope'}`
        ],
        passed = [ 10, 110, 203, 308, 409, 500, 510, "'ola!", void 0, null, [], {}, () => 'nope' ].map( errorType ).every( ( res, i ) => results[ i ] === res || console.error( `No match for ${results[ i ]}, received: ${res}` ) );

    if ( passed )
        console.log( `✔ ${fn.name} passes\n` );
    else
        console.error( `✘ ${fn.name} fails` );
}

export default function() {
    matcher_test( matcher );
    matcher_test( strictMatcher );

    console.log( '10 => ', m1( 10 ) );
    console.log( 'Hello => ', m1( 'Hello' ) );
    console.log( 'Helloooo => ', m1( 'Helloooo' ) );
    console.log( '[ 1, 2 ] => ', m1( [ 1, 2 ] ) );

    let m2 = m1.on( [ 1, 2 ], x => `We matched the array(2): ${x.map( y => y.toString() )}` );
    console.log( '[ 1, 2 ] => ', m2( [ 1, 2 ] ) );
    m2 = m2.on( [ 1, 2, REST ], x => `We matched the array( 2, ... ): ${x.map( y => y.toString() )}` );
    console.log( '[ 1, 2, 3, 4 ] => ', m2( [ 1, 2, 3, 4 ] ) );
    console.log( '[ 1, 2 ] => ', m2( [ 1, 2 ] ) );
    console.log( '[ 1, 2, 3, 4 ] => ', m2( [ 1, 2, 3, REST ] ) );
    m2 = m2.on( { a: 10, b: 'hi' }, x => `Matched an object: ` + require( 'util' ).inspect( x ) );
    console.log( `{ a: 10, b: 'hi' }`, m2( { a: 10, b: 'hi' } ) );
    console.log( `{ a: 10, b: 'hi', c: [ 1, 2 ] }`, m2( { a: 10, b: 'hi', c: [ 1, 2 ] } ) );
};


