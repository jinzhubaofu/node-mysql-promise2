/**
 * @file node-mysql-primise/Pool 数据库连接池
 * @author leon <ludafa@outlook.com>
 */

'use strict';

const mysql = require('mysql');
const promisify = require('./util/promisify.js');
const PoolConnection = require('./PoolConnection.js');

/* eslint-disable prefer-rest-params */

/**
 * mysql 连接池
 *
 * @class
 */
class Pool {

    /**
     * 构建函数
     *
     * @public
     * @param  {Object} conf 配置参数，与 mysql 的 pool 配置格式一致
     */
    constructor(conf) {
        this.pool = mysql.createPool(conf);
    }

    /**
     * 获取一个连接
     *
     * 此函数内部会按以下逻辑进行：
     *
     * 1. 如果连接池中有空闲连接，那么 mysql 会获取到这个空闲连接，并将其标示为`使用中`；
     * 2. 如果连接池中没有空闲连接，并且当前池中连接数未达到上限，那么会建立一个新的连接；
     * 3. 否则，此函数会 block，直到有一个使用中的连接被放回到池中或者超时；
     *
     * @public
     * @return {Promise<Connection>}
     */
    getConnection() {

        const pool = this.pool;

        return promisify(pool.getConnection, pool, arguments).then(function (connection) {
            return new PoolConnection(connection);
        });

    }

    /**
     * 将连接放回池中
     *
     * @public
     * @param  {Connection} connection 连接
     */
    releaseConnection(connection) {
        this.pool.releaseConnection(connection.connection);
    }

    /**
     * 查询
     *
     * @public
     * @param  {string}    sql    sql
     * @param  {?Array<*>} values 插值
     * @return {Promise<*>}
     */
    query(sql, values) {
        const pool = this.pool;
        return promisify(pool, pool.query, arguments);
    }

    /**
     * gracefully 关闭连接池
     *
     * @public
     * @return {Promise}
     */
    end() {
        const pool = this.pool;
        return promisify(pool, pool.end, arguments);
    }

    /**
     * 转义字符串
     *
     * @public
     * @param  {string} value 字符串
     * @return {string}
     */
    escape(value) {
        return this.pool.escape(value);
    }

    /**
     * 转义标识符
     *
     * @public
     * @param  {string} value 标识符
     * @return {string}
     */
    escapeId(value) {
        return this.pool.escapeId(value);
    }

    /**
     * 添加事件处理
     *
     * @public
     * @param  {string}   event 事件名
     * @param  {Function} fn    回调函数
     * @return {Function} 取消监听函数
     */
    on(event, fn) {

        const pool = this.pool;

        pool.on(event, fn);

        return function () {
            pool.removeListener(event, fn);
        };

    }

}



module.exports = Pool;
