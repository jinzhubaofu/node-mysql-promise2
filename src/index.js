/**
 * @file node-mysql-primise
 * @author leon <lupengyu@baidu.com>
 */

'use strict';

const mysql = require('mysql');

const Pool = require('./Pool.js');
const Connection = require('./Connection.js');

exports.createConnection = function (conf) {

    return new Promise(function (resolve, reject) {

        const connection = mysql.createConnection(conf);

        connection.connect(function (error) {

            if (error) {
                return reject(error);
            }

            return resolve(new Connection(connection));

        });


    });

};


exports.createPool = function (config) {
    return new Pool(config);
};

exports.Types = mysql.Types;
exports.escape = mysql.escape;
exports.escapeId = mysql.escapeId;
exports.format = mysql.format;
