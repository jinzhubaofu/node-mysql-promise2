# node-mysql-promise2

[node-mysql](https://github.com/felixge/node-mysql) API wrapper with Promise

** No extra depedencies except `node-mysql` **

## Requirements

Node >= 4.0 is required

## Install

```
npm install --save node-mysql-promise2
```

## Samples

### Connnection

connect to a database and execute a query;

```js
const mysql = require('node-mysql-promise2');

// get a connection
mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helloworld',
    database: 'sample'
}).then(function (connection) {
    // Execute a query
    return connection.query(`SELECT * FROM user`);
}).then(function (users) {
    console.log(users);
}).catch(function (error) {
    console.error(error);
});
```

### Pool

```js

const mysql = require('node-mysql-promise2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'helloworld',
    database: 'sample',
    connectionLimit: 10
});

pool.getConnection().then(function (connection) {
    // Execute a query
    return connection.query(`SELECT * FROM user`);
}).then(function (users) {
    console.log(users);
}).catch(function (error) {
    console.error(error);
});

```

### Others

We also export the following API & Constants from `node-mysql`:

+ `Types`
+ `escape`
+ `escapeId`
+ `format`

So you can do this:

```js
const mysql = require('node-mysql-promise2');
var userId = 'some user provided value';
var sql    = 'SELECT * FROM users WHERE id = ' + mysql.escape(userId);
connection.query(sql).then(function () {
    // ...
});
```
