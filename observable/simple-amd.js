/** ****************************************************************************************************
 * File: simple-amd (experiments)
 * @author julian on 4/6/18
 * @version 1.0.0
 *******************************************************************************************************/
"use strict";

const
    moduleTable = new Map();

function define( name, ...reqs )
{
    const
        dependencies = reqs,
        mod = dependencies.pop();

    moduleTable.set( name, { module: mod, dependencies, loaded: false } );

    if ( check_dependencies( ...dependencies ) )
        run_module( name );
}

function check_dependencies( ...deps )
{
    return deps.every( name => {
        const mod = moduleTable.get( name );

        return !!mod && mod.loaded;
    } );
}

function get_dependencies( ...deps )
{
    return deps.map( name => moduleTable.get( name ).code );
}

function run_module( name )
{
    const
        mod = moduleTable.get( name ),
        mods = get_dependencies( mod.dependencies );

    mod.code = mod.module( ...mods );
    mod.loaded = true;
}

function load_module( name )
{
    let resolve,
        loader,
        p = new Promise( r => resolve = r );

    const scr = new HTMLScriptElement();
    scr.onload = e => {
        resolve( e );
        document.body.removeChild( loader );
    };

    scr.src = name;

    loader = add_tag( scr );
}

function add_tag( tag )
{
    return document.body.appendChild( tag );
}

