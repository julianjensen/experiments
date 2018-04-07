/** ****************************************************************************************************
 * File: get-diff (jsdoc-tag-parser)
 * @author julian on 3/29/18
 * @version 1.0.0
 *******************************************************************************************************/
"use strict";
/* eslint-env worker */

workers.getDifference = function( reply, data ) {
    const { nMinuend, nSubtrahend } = data;

    reply( 'result', nMinuend - nSubtrahend );
};
