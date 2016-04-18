/**
* @file node-mysql-primise/Pool 数据库连接
* @author leon <ludafa@outlook.com>
*/

'use strict';

/* eslint-disable fecs-no-arguments */

const mysql = require('mysql');
const promisify = require('./util/promisify.js');

class Connection {

    constructor(connection) {
        this.connection = connection;
    }

    query(sql, values) {
        const connection = this.connection;
        return promisify(connection.query, connection, arguments);
    }

    beginTransaction() {
        const connection = this.connection;
        return promisify(connection.beginTransaction, connection, arguments);
    }

    commit() {
        const connection = this.connection;
        return promisify(connection.commit, connection, arguments);
    }

    rollback() {
        const connection = this.connection;
        return promisify(connection.rollback, connection, arguments);
    }

    changeUser(data) {
        const connection = this.connection;
        return promisify(connection.changeUser, connection, arguments);
    }

    ping(data) {
        const connection = this.connection;
        return promisify(connection.ping, connection, arguments);
    }

    statistics(data) {
        const connection = this.connection;
        return promisify(connection.statistics, connection, arguments);
    }

    end(data) {
        const connection = this.connection;
        return promisify(connection.end, connection, arguments);
    }

    destroy() {
        this.connection.destroy();
    }

    pause() {
        this.connection.pause();
    }

    resume() {
        this.connection.resume();
    }

    escape(value) {
        return this.connection.escape(value);
    }

    escapeId(value) {
        return this.connection.escapeId(value);
    }

    format(sql, values) {
        return this.connection.format(sql, values);
    }

}

Connection.getConnection = function (conf) {

    return new Promise(function (resolve, reject) {

        mysql.getConnection(conf, function (error, connection) {

            if (error) {
                return reject(error);
            }

            return resolve(new Connection(connection));

        });

    });

};

module.exports = Connection;
