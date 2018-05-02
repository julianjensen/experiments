/** ******************************************************************************************************************
 * @file Describe what quora-01 does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 23-Apr-2018
 *********************************************************************************************************************/
"use strict";

const connPool = require( "./pool.js" );

/**
 * @param {string} query
 * @return {Promise<boolean>}
 */
function requestData( { query } )
{
    let connection;

    return connPool.getConnection()
        .then( conn => ( connection = conn ).query( query ) )
        .then( ( [ row ] ) => row[ "COUNT(1)" ] === 1 )
        .catch( err => console.log( err ) )
        .finally( () => connection.release() );
}

module.exports = requestData;



// requestData.js
module.exports = function requestData(values) {
    const connPool = require("./pool.js");

    connPool.getConnection().then(function(conn) {

        conn.query(values.query).then(function(rows) {

            if (rows[0]["COUNT(1)"] == 0) {
                return false;
            } else if (rows[0]["COUNT(1)"] == 1) {
                return true;
            }

            conn.release();
        });
    }).catch(function(err) {
        console.log(err);
    });
}


async function reqData( { query } )
{
    let conn;

    try {
        conn = await connPool.getConnection();

        const [ { userOk = 0 } ] = await conn.query( query );
        return userOk === 1;
    }
    catch ( err ) {
        console.error( err );
        throw err;
    }
    finally {
        if ( conn ) conn.release();
    }

}
