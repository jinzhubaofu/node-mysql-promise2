/**
 * @file node-mysql-primise/PoolConnection
 * @author leon <ludafa@outlook.com>
 */

'use strict';

const Connection = require('./Connection.js');

class PoolConnection extends Connection {

    release() {
        this.connection.release();
    }

    destory() {
        this.connection.destroy();
    }

}


module.exports = PoolConnection;
