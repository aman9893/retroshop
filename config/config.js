var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '3.147.85.152',
    user: 'debian-sys-maint',
    password: '7VsHRE7StDlcr3TP',
    database: 'restro',
    port: '3306',
    connectTimeout: 60000,
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
