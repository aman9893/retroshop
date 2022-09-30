var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'ec2-43-206-128-164.ap-northeast-1.compute.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'restro',
    port: '3306',
    connectTimeout: 60000,
});
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log(err);
        connection.end();
    }
});

module.exports = connection;
