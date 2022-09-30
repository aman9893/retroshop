var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'Aman12345@',
    database: "restro",
    multipleStatements: true
    // reconnect:true,
});
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log(err);
    }
});

module.exports = connection;
