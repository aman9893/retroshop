var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'restro',
    port: '3306',
    connectTimeout: 10000,
});
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected" +err);
    } else {
        console.log(err);
        connection.end();
    }
});

module.exports = connection;
