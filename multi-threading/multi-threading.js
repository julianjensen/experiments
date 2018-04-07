/** ****************************************************************************************************
 * File: multi-threading (jsdoc-tag-parser)
 * @author julian on 3/29/18
 * @version 1.0.0
 * @copyright Planet3, Inc.
 *******************************************************************************************************/
"use strict";
/* eslint-env browser */

let id = 0,
    qwId = 0;

/**
 * QueryableWorker instances methods:
 *
 * - sendQuery(queryable function name, argument to pass 1, argument to pass 2, etc. etc)
 *   calls a Worker's queryable function
 * - postMessage(string or JSON Data)
 *   see Worker.prototype.postMessage()
 * - terminate()
 *   terminates the Worker
 * - addListener(name, function)
 *   adds a listener
 * - removeListener(name)
 *   removes a listener
 *
 * QueryableWorker instances properties:
 *
 * - defaultListener
 *   the default listener executed only when the Worker calls the postMessage() function directly
 */
function QueryableWorker( worker, defaultListener = () => {}, onError = null )
{
    const
        instance  = this,
        listeners = {};

    worker.postMessage( { id: `qw${++qwId}` } );
    console.log( `query worker running...` );
    this.defaultListener = defaultListener;

    if ( onError ) worker.onerror = onError;

    this.postMessage = message => worker.postMessage( message );
    this.terminate   = () => worker.terminate();
    this.addListener = ( name, listener ) => listeners[ name ] = listener;
    this.removeListener = name => delete listeners[ name ];

    this.sendQuery = ( queryMethod, ...queryMethodArguments ) => {
        console.log( `sending query ${queryMethod}( ${queryMethodArguments.join( ', ' )} )` );
        if ( !queryMethod )
            throw new TypeError( 'QueryableWorker.sendQuery takes at least one argument' );

        worker.postMessage( { queryMethod, queryMethodArguments } );
    };

    worker.onmessage = ( { data = {} } ) => {
        const { queryMethodListener, queryMethodArguments } = data;

        if ( queryMethodListener && queryMethodArguments )
            listeners[ queryMethodListener ].call( instance, ...queryMethodArguments );
        else
            this.defaultListener.call( instance, data );
    };
}

const
    read_embedded = () => [].map.call( document.querySelectorAll( 'script[type="text/worker"]' ), scr => scr.textContent ),
    defer         = fn => setTimeout( fn, 0 ),
    once          = obj => new Promise( resolve => obj.onmessage = e => {
            obj.onmessage = () => {};
            resolve( e.data );
        }
    ),
    Semaphore      = max => {
        const tasks = [];

        let counter = max;

        const
            dispatch = () => {
                if ( counter > 0 && tasks.length > 0 )
                {
                    --counter;
                    tasks.shift()();
                }
            },
            release  = () => {
                ++counter;
                dispatch();
            },
            acquire  = () => new Promise( resolve => {
                tasks.push( resolve );
                defer( dispatch );
            } );

        return async fn => {
            await acquire();

            let result;

            try
            {
                result = await fn();
            }
            catch ( err )
            {
                throw err;
            }
            finally
            {
                release();
            }

            return result;
        };
    },
    limit          = ( max, fn ) => {
        const semaphore = Semaphore( max );

        return ( ...args ) => semaphore( () => fn( ...args ) );
    },
    maxWorkers     = navigator.hardwareConcurrency || 4,
    defaultHandler = async( worker, data ) => {
        worker.postMessage( data );
        return await once( worker );
    },
    Cluster        = ( path, handler = defaultHandler, max = maxWorkers ) => {
        const
            pool       = [],
            semaphore  = Semaphore( max ),
            use_worker = async fn => {
                const
                    sendId = !pool.length,
                    worker = pool.pop() || new Worker( path );

                if ( sendId )
                    worker.postMessage( { id: ++id } );

                let result;

                try
                {
                    result = await fn( worker );
                }
                catch ( err )
                {
                    throw err;
                }
                finally
                {
                    pool.push( worker );
                }

                return result;
            };

        return async data => await semaphore( () => use_worker( worker => handler( worker, data ) ) );
    },
    create_worker  = ( fns ) => {
        const blob = new Blob( fns.map( source => '(function() {\n' + source.toString() + '\n})()' ), { type: 'application/javascript' } );
        return new Worker( window.URL.createObjectURL( blob ) );
    };

console.log( `maxWorkers: ${maxWorkers}` );
console.log( 'nav:', navigator );
// module.exports = {
//     Semaphore,
//     Cluster,
//     limit,
//     create_worker
// };

// (async () => {
//     const
//         cluster = Cluster( create_worker( __worker ) ),
//         result  = await cluster( { hello: "world" } );
//
//     console.log( "result:", result );
// })();

let taeller = 0;
const
    wait    = time => new Promise( resolve => setTimeout( resolve, time ) ),
    slow    = async() => {
        await wait( 1200 );
        return ++taeller;
    };

const lowSlow = limit( 2, slow );

console.log( "adding 16 function calls" );
for ( let n = 0; n < 16; ++n )
    lowSlow().then( cnt => console.log( 'cnt:', cnt ) );
console.log( "added..." );

const multi = Cluster( 'workers.js' );
for ( let n = 0; n < 16; ++n )
    multi( { message: 'delay' } ).then( cnt => console.log( 'cnt:', cnt ) );

const qw      = new QueryableWorker( new Worker( 'workers.js' ), ( ...args ) => console.log( "response:", args ) );
qw.addListener( 'doAlert', ( ...args ) => console.log( 'doAlert called:', args ) );
qw.sendQuery( 'waitSomeTime' );
