/**
 * @file node-mysql-primise/Pool 数据库连接池
 * @author leon <ludafa@outlook.com>
 */

'use strict';

const mysql = require('mysql');
const promisify = require('./util/promisify.js');
const PoolConnection = require('./PoolConnection.js');

/* eslint-disable fecs-no-arguments */

class Pool {

    constructor(conf) {
        this.pool = mysql.createPool(conf);
    }

    getConnection() {

        const pool = this.pool;

        return promisify(pool.getConnection, pool, arguments).then(function (connection) {
            return new PoolConnection(connection);
        });

    }

    releaseConnection(connection) {
        return this.pool.releaseConnection(connection.connection);
    }

    query(sql, values) {
        const pool = this.pool;
        return promisify(pool, pool.query, arguments);
    }

    end(data) {
        const pool = this.pool;
        return promisify(pool, pool.end, arguments);
    }

    escape(value) {
        return this.pool.escape(value);
    }

    escapeId(value) {
        return this.pool.escapeId(value);
    }

    on(event, fn) {
        this.pool.on(event, fn);
    }

}



module.exports = Pool;
