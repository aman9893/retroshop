// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'restro',
//     port: '3306',
//     connectTimeout: 10000,
// });
// connection.connect(function(err) {
//     if (!err) {
//         console.log("Database is connected");
//     } else {
//         console.log(err);
//         connection.end();
//     }
// });

// module.exports = connection;

const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    Promise: Promise
});

pool.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = pool;
