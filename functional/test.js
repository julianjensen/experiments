/** ******************************************************************************************************************
 * @file Describe what test does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 29-Apr-2018
 *********************************************************************************************************************/
"use strict";

import assert from 'assert';
import { curry } from './index';

export default function() {
    curry_test( curry );
};

/**
 * @param {function} fn
 */
function curry_test( fn )
{
    const
        sum = ( a, b ) => a + b,
        currySum = fn( sum ),
        add1 = currySum( 1 );

    [ 1, 2, 3, 4 ].forEach( num => {
        assert( 1 + num === add1( num ) );
        console.log( `1 + ${num} = ${add1( num )}` );
    } );

    const add3 = currySum( 3 );

    [ 1, 2, 3, 4 ].forEach( num => {
        assert( 3 + num === add3( num ) );
        console.log( `3 + ${num} = ${add3( num )}` );
    } );

    console.log( `✔ ${fn.name} passes\n` );
}
