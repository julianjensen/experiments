/** ****************************************************************************************************
 * File: wait-some-time (jsdoc-tag-parser)
 * @author julian on 3/29/18
 * @version 1.0.0
 *******************************************************************************************************/
"use strict";
/* eslint-env worker */

workers.waitSomeTime = function( reply ) {
    this.sys.defer( function() { reply( 'doAlert', 3, 'seconds' ); } );
};
