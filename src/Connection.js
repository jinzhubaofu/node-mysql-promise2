/**
* @file node-mysql-primise/Pool 数据库连接
* @author leon <ludafa@outlook.com>
*/

'use strict';

/* eslint-disable prefer-rest-params */

const promisify = require('./util/promisify.js');

/**
 * mysql 连接
 *
 * @class
 */
class Connection {

    /**
     * 构造函数
     *
     * @public
     * @param  {Connection} connection mysql 连接
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     * 执行 query
     *
     * @public
     * @param  {string}  sql    query
     * @param  {Array<*>} values 如果 sql 中使用了 placeholder，values 中可提供替换值
     * @return {Promise<*>}
     */
    query(sql, values) {
        const connection = this.connection;
        return promisify(connection.query, connection, arguments);
    }

    /**
     * 开启事务
     *
     * @public
     * @return {Promise}
     */
    beginTransaction() {
        const connection = this.connection;
        return promisify(connection.beginTransaction, connection, arguments);
    }

    /**
     * 提交事务
     *
     * @public
     * @return {Promise}
     */
    commit() {
        const connection = this.connection;
        return promisify(connection.commit, connection, arguments);
    }

    /**
     * 回滚事务
     *
     * @public
     * @return {Promise}
     */
    rollback() {
        const connection = this.connection;
        return promisify(connection.rollback, connection, arguments);
    }

    /**
     * 改变用户
     *
     * @public
     * @param {Object} data          配置
     * @param {string} data.user     用户名
     * @param {string} data.password 密码
     * @param {string} data.charset  字符集
     * @param {string} data.database 数据库名
     * @return {Promise}
     */
    changeUser(data) {
        const connection = this.connection;
        return promisify(connection.changeUser, connection, arguments);
    }

    /**
     * ping
     *
     * @public
     * @return {Promise}
     */
    ping() {
        const connection = this.connection;
        return promisify(connection.ping, connection, arguments);
    }

    /**
     * gracefully 关闭连接
     *
     * @public
     * @return {Promise}
     */
    end() {
        const connection = this.connection;
        return promisify(connection.end, connection, arguments);
    }

    /**
     * 立即终止连接
     *
     * @public
     */
    destroy() {
        this.connection.destroy();
    }

    /**
     * 暂停通过连接发送数据
     *
     * @public
     */
    pause() {
        this.connection.pause();
    }

    /**
     * 恢复
     *
     * @public
     */
    resume() {
        this.connection.resume();
    }

    /**
     * 转义字符串
     *
     * @public
     * @param  {string} value 值
     * @return {string}
     */
    escape(value) {
        return this.connection.escape(value);
    }

    /**
     * 转义标识
     *
     * @public
     * @param  {string} value 值
     * @return {string}
     */
    escapeId(value) {
        return this.connection.escapeId(value);
    }

    /**
     * 格式化字符串
     *
     * @public
     * @param  {string}   sql    sql
     * @param  {Array<*>} values 值
     * @return {string}
     */
    format(sql, values) {
        return this.connection.format(sql, values);
    }

    /**
     * 显式连接
     *
     * @public
     * @return {Promise}
     */
    connect() {
        const connection = this.connection;
        return promisify(connection.connect, connection, arguments);
    }

}

module.exports = Connection;
