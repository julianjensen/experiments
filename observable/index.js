/** ****************************************************************************************************
 * File: index (experiments)
 * @author julian on 4/5/18
 * @version 1.0.0
 *******************************************************************************************************/
/** ****************************************************************************************************
 * File: observable (permission)
 * @author jensju <julian.jensen@ny.gir.email.gs.com> on 4/5/18
 * @version 1.0.0
 *******************************************************************************************************/
"use strict";

const
    DEBUG              = true,
    log                = ( ...args ) => DEBUG && console.log( ...args ),

    _g                 = ( 1, eval )( 'this' ),
    { isArray: array } = Array,
    isFunc             = fn => typeof fn === 'function',
    isObj              = o => typeof o === 'object' && o !== null && !Array.isArray( o ),
    forceFunc          = fn => isFunc( fn ) ? fn : () => {},
    ccall              = fn => isFunc( fn ) && fn(),
    SUBSCRIBER         = Symbol( 'subscriber' ),
    asyncThrow         = err => setTimeout( () => { throw err; }, 0 ),
    tryCall            = ( ctx, fn, val, cb, final ) => {
        try
        {
            return fn.call( ctx, val );
        }
        catch ( err )
        {
            cb && cb();
            asyncThrow( err );
        }
        finally
        {
            final && final();
        }
    },
    empty              = {
        closed: true,
        next() {},
        error( err ) { throw err; },
        complete() {}
    },

    /**
     * @param {object|function|Subscriber} nextObj
     * @param {function} [err]
     * @param {function} [comp]
     * @return {Subscriber}
     */
    toSubscriber       = ( nextObj, err, comp ) => {
        if ( isObj( nextObj ) )
            [ 'next', 'error', 'complete' ].forEach( key => nextObj[ key ] = forceFunc( nextObj[ key ] ) );
        else
            nextObj = { next: forceFunc( nextObj ), error: forceFunc( err ), complete: forceFunc( comp ) };

        return new Subscriber( nextObj );
    };

/** *************************************************************************
 * @class
 ****************************************************************************/
class Observable
{
    /**
     * @param {function} [subscribe]
     */
    constructor( subscribe )
    {
        this._subscribe = subscribe;
        this.source     = this.operator = null;
    }

    as_operator( source, operator )
    {
        this.source   = source;
        this.operator = operator;

        return this;
    }

    /**
     * @param {object|function} observerOrNext
     * @param {function} [error]
     * @param {function} [complete]
     * @return {Subscriber}
     */
    subscribe( observerOrNext, error, complete )
    {
        const
            sink = toSubscriber( observerOrNext, error, complete );

        if ( this.operator )
            this.operator( sink, this.source );
        else
            sink.add( this.source || this._subscribe( sink ) );

        return sink;
    }

    // _subscribe( sub )
    // {
    //     const source = this.source;
    //
    //     return source && source.subscribe( sub );
    // }
}

/** *************************************************************************
 *
 * Observable interval
 *
 * @param {number} intervalTime     - In milliseconds
 * @returns {Observable}
 ****************************************************************************/
Observable.interval = function( intervalTime ) {

    let handle,
        cnt  = 0,
        wait = fn => handle = setTimeout( fn, intervalTime );

    return new Observable( function( observer ) {
        const
            expired = () => {
                handle = null;
                wait( expired );
                observer.next( cnt++ );
            };

        wait( expired );

        observer.add( () => handle && clearTimeout( handle ) );
    } );
};

/** *************************************************************************
 *
 * Observable event handler
 *
 * @param {HTMLElement} el
 * @param {string} type     - The event name, e.g. "keydown", "change", "click", &c.
 * @returns {Observable}
 ****************************************************************************/
Observable.fromEvent = function( el, type ) {

    return new Observable( function( observer ) {
        const handler = e => {
            observer.next( e );
            return false;
        };

        el.addEventListener( type, handler );

        observer.add( () => el.removeEventListener( type, handler ) );
    } );
};

/** *************************************************************************
 *
 * Promise processor handler
 *
 * @example
 * let handler;
 * Observable
 *      .promise( promiseHandler => handler = promiseHandler )
 *      .subscribe( {
 *          next( data ) {
 *              // do something with fetch return
 *          },
 *          error( err ) {
 *              // handle fetch error
 *          }
 *      } );
 * // ...
 * handler( fetch( "some/url" ) );
 *
 * @param {function} expose
 * @returns {Observable}
 ****************************************************************************/
Observable.promise = function( expose ) {
    return new Observable( observer => expose( promise => promise.then( observer.next, observer.error ) ) );
};

/** *************************************************************************
 * @class Subscription
 ****************************************************************************/
class Subscription
{
    /**
     * @param {function} [unsubFn]
     */
    constructor( unsubFn )
    {
        this._unsubscribe = unsubFn;
        /** @type {?Array<Subscription>} */
        this._subscriptions = null;
        /** @type {boolean} */
        this.closed = false;
        /** @type {?Subscription} */
        this._parent = null;
        /** @type {?Array<Subscription>} */
        this._parents = null;
    }

    /** */
    unsubscribe()
    {
        if ( this.closed ) return;

        let {
                _parent,
                _parents,
                _unsubscribe,
                _subscriptions
            }     = this,
            index = -1,
            len   = _parents ? _parents.length : 0;

        this.closed  = true;
        this._parent = this._parents = this._subscriptions = null;

        while ( _parent )
        {
            _parent.remove( this );
            _parent = ++index < len && _parents[ index ] || null;
        }

        ccall( _unsubscribe );

        if ( array( _subscriptions ) )
            _subscriptions.forEach( sub => isObj( sub ) && sub.unsubscribe() );
    }

    /**
     * @param {Subscription|function} sub
     * @returns {Subscription}
     */
    add( sub )
    {
        if ( !sub || sub === Subscription.EMPTY ) return Subscription.EMPTY;

        if ( sub === this ) return this;

        switch ( typeof sub )
        {
            case 'function':
                sub = new Subscription( sub );
            /* falls through */
            case 'object':
                if ( sub.closed || !isFunc( sub.unsubscribe ) )
                    return sub;
                else if ( this.closed )
                {
                    sub.unsubscribe();
                    return sub;
                }
                else if ( !isFunc( sub._addParent ) )
                {
                    const tmp          = sub;
                    sub                = new Subscription();
                    sub._subscriptions = [ tmp ];
                }
                break;

            default:
                throw new Error( `Unrecognized teardown added ${sub}` );
        }

        const _subs = this._subscriptions || ( this._subscriptions = [] );
        _subs.push( sub );
        sub._addParent( this );

        return sub;
    }

    /**
     * @param {Subscription} sub
     */
    remove( sub )
    {
        let i;

        if ( this._subscriptions && ( i = this._subscriptions.indexOf( sub ) ) !== -1 )
            this._subscriptions.splice( i, 1 );
    }

    /**
     * @param {Subscription} parent
     * @private
     */
    _addParent( parent )
    {
        let { _parent, _parents } = this;

        if ( !_parent || _parent === parent )
            this._parent = parent;
        else if ( !_parents )
            this._parents = [ parent ];
        else if ( !_parents.includes( parent ) )
            _parents.push( parent );
    }
}

/**
 * @name EMPTY
 * @memberof Subscription
 * @static
 * @type {Subscription}
 */
Subscription.EMPTY = ( empty => {
    empty.closed = true;
    return empty;
} )( new Subscription() );

/** *************************************************************************
 * @class Subscriber
 * @extends Subscription
 ****************************************************************************/
class Subscriber extends Subscription
{
    /**
     * @param {object|function|Subscriber} [destinationOrNext]
     * @param {function} [error]
     * @param {function} [complete]
     */
    constructor( destinationOrNext, error, complete )
    {
        super();
        this.syncErrorThrowable = false;

        switch ( arguments.length )
        {
            case 0:
                this.destination = empty;
                break;

            case 1:
                if ( !destinationOrNext )
                {
                    this.destination = empty;
                    break;
                }

                if ( typeof destinationOrNext === 'object' )
                {
                    if ( destinationOrNext instanceof Subscriber || ( 'syncErrorThrowable' in destinationOrNext && destinationOrNext[ SUBSCRIBER ] ) )
                    {
                        const trustedSubscriber = destinationOrNext[ SUBSCRIBER ]();
                        this.destination        = trustedSubscriber;
                        trustedSubscriber.add( this );
                    }
                    else
                        this.destination = new SafeSubscriber( this, destinationOrNext );
                }
                break;

            default:
                this.destination = new SafeSubscriber( this, destinationOrNext, error, complete );
                break;
        }
    }

    /**
     * @returns {Subscriber}
     */
    [ SUBSCRIBER ]()
    { return this; }

    /**
     * @param {any} v
     */
    next( v )
    {
        if ( this.isStopped ) return;

        try
        {
            if ( this.destination )
                this.destination.next( v );
        }
        catch ( err )
        {
            console.error( err );
            this.unsubscribe();
        }
    }

    /**
     * @param {Error} err
     */
    error( err )
    {
        if ( this.isStopped ) return;

        this.isStopped = true;
        this.destination.error( err );
        this.unsubscribe();
    }

    /** */
    complete()
    {
        if ( this.isStopped ) return;

        this.isStopped = true;
        this.destination.complete();
        this.unsubscribe();
    }

    /** */
    unsubscribe()
    {
        if ( this.closed ) return;
        this.isStopped = true;
        super.unsubscribe();
    }

    _unsubscribe()
    {
        this.unsubscribe();
    }
}

/** *************************************************************************
 * @class SafeSubscriber
 * @extends Subscriber
 ****************************************************************************/
class SafeSubscriber extends Subscriber
{
    /**
     * @param {Subscriber} _parentSubscriber
     * @param {object|function|Subscriber} observerOrNext
     * @param {function} [error]
     * @param {function} [complete]
     */
    constructor( _parentSubscriber, observerOrNext, error, complete )
    {
        super();

        let next,
            context = this;

        if ( isFunc( observerOrNext ) )
            next = observerOrNext;
        else if ( observerOrNext )
        {
            next     = observerOrNext.next;
            error    = observerOrNext.error;
            complete = observerOrNext.complete;

            if ( observerOrNext !== empty )
            {
                context = Object.create( observerOrNext );

                if ( isFunc( context.unsubscribe ) )
                    this.add( context.unsubscribe.bind( context ) );

                context.unsubscribe = this.unsubscribe.bind( this );
            }
        }

        this._context  = context;
        this._next     = forceFunc( next );
        this._error    = forceFunc( error );
        this._complete = forceFunc( complete );
    }

    /**
     * @param {any} value
     */
    next( value )
    {
        if ( !this.isStopped )
            tryCall( this._context, this._next, value, () => this.unsubscribe() );
    }

    /**
     * @param {Error} err
     */
    error( err )
    {
        if ( !this.isStopped )
            tryCall( this._context, this._error, err, () => this.unsubscribe(), () => this.unsubscribe() );
    }

    /** */
    complete()
    {
        if ( !this.isStopped )
            tryCall( this._context, this._complete, null, () => this.unsubscribe(), () => this.unsubscribe() );
    }
}

/** *************************************************************************
 * Filter operator
 *
 * @param {function(*, number=):boolean} predicate
 * @returns {Observable}
 ****************************************************************************/
Observable.prototype.filter = function( predicate ) {
    return new Observable().as_operator( this, ( sub, src ) => src.subscribe( new FilterSubscriber( sub, predicate ) ) );
};

/** */
class FilterSubscriber extends Subscriber
{
    /**
     * @param {Subscriber} destination
     * @param {function} predicate
     */
    constructor( destination, predicate )
    {
        super( destination );
        this.predicate = predicate;
        this.count     = 0;
    }

    /**
     * @param {any} value
     */
    next( value )
    {
        try
        {
            const result = this.predicate( value, this.count++ );

            if ( result ) this.destination.next( value );
        }
        catch ( err )
        {
            this.destination.error( err );
        }
    }
}

/** *************************************************************************
 * Debounce operator
 *
 * @param {Observable} intSrc
 * @returns {Observable}
 ****************************************************************************/
Observable.prototype.debounce = function( intSrc ) {
    return new Observable().as_operator( this, ( sub, src ) => src.subscribe( new DebounceSubscriber( sub, intSrc ) ) );
};

/** */
class DebounceSubscriber extends Subscriber
{
    /**
     * @param {Subscriber} destination
     * @param {Observable} intSrc
     */
    constructor( destination, intSrc )
    {
        super( destination );

        this.value  = void 0;
        this.intSub = intSrc.subscribe( {
            next: () => {
                if ( this.value !== void 0 )
                {
                    const _value = this.value;
                    this.value   = void 0;
                    this.destination.next( _value );
                }
            }
        } );

        this.add( this.intSub );
    }

    /**
     * @param {any} value
     */
    next( value )
    {
        this.value = value;
    }

    /**
     * @param {Error} e
     */
    error( e )
    {
        this.intSub.unsubscribe();
        this.destination.error( e );
    }

    /** */
    complete()
    {
        this.intSub.unsubscribe();
        this.destination.complete();
    }
}

/** *************************************************************************
 * Async generator operator
 *
 * @param {Observable} asyncIter
 * @returns {Observable}
 ****************************************************************************/
Observable.prototype.asyncIter = function( asyncIter ) {
    return new Observable().as_operator( this, ( sub, src ) => src.subscribe( new AsyncIterSubscriber( sub, asyncIter ) ) );
};

/** */
class AsyncIterSubscriber extends Subscriber
{
    /**
     * @param {Subscriber} destination
     * @param {Observable} asyncIter
     */
    constructor( destination, intSrc )
    {
        super( destination );

        this.value  = void 0;
        this.intSub = intSrc.subscribe( {
            next: () => {
                if ( this.value !== void 0 )
                {
                    const _value = this.value;
                    this.value   = void 0;
                    this.destination.next( _value );
                }
            }
        } );

        this.add( this.intSub );
    }

    /**
     * @param {any} value
     */
    next( value )
    {
        this.value = value;
    }

    /**
     * @param {Error} e
     */
    error( e )
    {
        this.intSub.unsubscribe();
        this.destination.error( e );
    }

    /** */
    complete()
    {
        this.intSub.unsubscribe();
        this.destination.complete();
    }
}

const
    ticker = Observable.interval( 100 ),
    long   = Observable.interval( 3000 );

let resolve;

const
    obs    = ticker.filter( v => v & 1 ).debounce( Observable.interval( 500 ) ),
    toExit = new Promise( r => resolve = r );

const subFilter = obs.subscribe( {
    next:     x => console.log( 'tick:', x ),
    error:    err => console.error( err ),
    complete: () => {
        resolve( 'okay' );
    }
} );

const subscript = long.subscribe( {
    next: () => {
        subscript.unsubscribe();
        subFilter.unsubscribe();
        setTimeout( () => resolve( 'okay' ), 1000 );
    }
} );

toExit.then( msg => console.log( 'exit:', msg ) );

